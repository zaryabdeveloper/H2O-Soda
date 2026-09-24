/**
 * FrameEngine - High Performance Frame Preloader & Canvas Renderer
 * 
 * Features:
 * 1. Critical-first initial frame loading & instant render
 * 2. Keyframe distributed loading (fast scrub responsiveness)
 * 3. Priority queue with controlled concurrency (prevents browser request stalls)
 * 4. Scroll-aware lookahead priority
 * 5. Nearest-loaded frame fallback (zero blank canvas or flicker)
 * 6. High-DPI adaptive scaling with memory cap
 */

import { FRAME_LIST, FRAME_COUNT, getFrameUrl } from '../data/framesManifest.js';

export class FrameEngine {
  constructor(options = {}) {
    this.totalFrames = FRAME_COUNT;
    this.frames = new Array(this.totalFrames).fill(null);
    this.loadState = new Array(this.totalFrames).fill('idle'); // 'idle' | 'loading' | 'loaded' | 'error'
    this.loadedCount = 0;
    
    this.maxConcurrent = options.maxConcurrent || 3;
    this.activeRequests = 0;
    this.queue = [];
    
    this.onProgress = options.onProgress || (() => {});
    this.onInitialReady = options.onInitialReady || (() => {});
    this.onAllLoaded = options.onAllLoaded || (() => {});
    
    this.isInitialReady = false;
    this.currentRenderedIndex = -1;
    
    // Canvas bindings
    this.canvas = options.canvas || null;
    this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: true }) : null;
    
    this.init();
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.resizeCanvas();
  }

  init() {
    if (this.totalFrames === 0) return;

    // Phase 1: Immediately request frame 0 (critical initial frame)
    this.loadFrame(0, 'high').then((img) => {
      this.isInitialReady = true;
      this.onInitialReady(img);
      if (this.canvas && this.ctx) {
        this.render(0);
      }
      // Once frame 0 is decoded and shown, launch Phase 2 & 3
      this.scheduleKeyframes();
    });
  }

  scheduleKeyframes() {
    // Phase 2: Load keyframes spaced across the sequence (~every 8th frame and the last frame)
    const step = 8;
    const keyframes = [];
    for (let i = step; i < this.totalFrames; i += step) {
      keyframes.push(i);
    }
    if (!keyframes.includes(this.totalFrames - 1)) {
      keyframes.push(this.totalFrames - 1);
    }

    for (const kf of keyframes) {
      this.enqueue(kf, 'medium');
    }

    // Phase 3: Fill in remaining frames sequentially
    for (let i = 1; i < this.totalFrames; i++) {
      if (!keyframes.includes(i)) {
        this.enqueue(i, 'low');
      }
    }

    this.processQueue();
  }

  enqueue(index, priority = 'low') {
    if (this.loadState[index] !== 'idle') return;
    
    // Check if already in queue
    const existingIndex = this.queue.findIndex(item => item.index === index);
    if (existingIndex !== -1) {
      if (priority === 'urgent' || priority === 'high') {
        this.queue[existingIndex].priority = priority;
        this.sortQueue();
      }
      return;
    }

    this.queue.push({ index, priority });
    this.sortQueue();
    this.processQueue();
  }

  sortQueue() {
    const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
    this.queue.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  }

  // Prioritize frames around current scrub index
  prioritizeWindow(centerIndex, radius = 5) {
    const start = Math.max(0, centerIndex - radius);
    const end = Math.min(this.totalFrames - 1, centerIndex + radius);
    
    for (let i = start; i <= end; i++) {
      if (this.loadState[i] === 'idle') {
        this.enqueue(i, 'urgent');
      } else if (this.loadState[i] === 'loading') {
        // already downloading
      }
    }
    this.sortQueue();
    this.processQueue();
  }

  processQueue() {
    if (this.activeRequests >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    while (this.activeRequests < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift();
      if (this.loadState[item.index] === 'idle') {
        this.activeRequests++;
        this.loadFrame(item.index, item.priority)
          .finally(() => {
            this.activeRequests--;
            // Use requestIdleCallback or setTimeout to maintain UI fluidity
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
              window.requestIdleCallback(() => this.processQueue(), { timeout: 100 });
            } else {
              setTimeout(() => this.processQueue(), 16);
            }
          });
      }
    }
  }

  loadFrame(index, priority = 'low') {
    return new Promise((resolve, reject) => {
      this.loadState[index] = 'loading';
      const img = new Image();
      img.src = getFrameUrl(index);
      
      img.onload = () => {
        // Asynchronously decode if browser supports it
        if ('decode' in img) {
          img.decode().then(() => {
            this.handleFrameSuccess(index, img, resolve);
          }).catch(() => {
            // fallback if decode rejects (e.g. detached)
            this.handleFrameSuccess(index, img, resolve);
          });
        } else {
          this.handleFrameSuccess(index, img, resolve);
        }
      };

      img.onerror = (err) => {
        this.loadState[index] = 'error';
        console.warn(`[FrameEngine] Failed to load frame ${index}:`, err);
        reject(err);
      };
    });
  }

  handleFrameSuccess(index, img, resolve) {
    this.frames[index] = img;
    this.loadState[index] = 'loaded';
    this.loadedCount++;
    
    const progress = this.loadedCount / this.totalFrames;
    this.onProgress(progress, this.loadedCount, this.totalFrames);
    
    // If the currently desired render index is this frame, re-render immediately
    if (this.currentRenderedIndex === index && this.canvas && this.ctx) {
      this.render(index);
    }

    if (this.loadedCount === this.totalFrames) {
      this.onAllLoaded();
    }
    
    resolve(img);
  }

  getNearestLoadedFrame(targetIndex) {
    const clamped = Math.max(0, Math.min(targetIndex, this.totalFrames - 1));
    if (this.frames[clamped]) {
      return { frame: this.frames[clamped], index: clamped, isExact: true };
    }

    // Search outwards from targetIndex
    let distance = 1;
    while (distance < this.totalFrames) {
      const prev = clamped - distance;
      if (prev >= 0 && this.frames[prev]) {
        return { frame: this.frames[prev], index: prev, isExact: false };
      }
      const next = clamped + distance;
      if (next < this.totalFrames && this.frames[next]) {
        return { frame: this.frames[next], index: next, isExact: false };
      }
      distance++;
    }

    return null;
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for memory safety
    
    const displayWidth = Math.round(rect.width * dpr);
    const displayHeight = Math.round(rect.height * dpr);

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }

    if (this.currentRenderedIndex >= 0) {
      this.render(this.currentRenderedIndex);
    }
  }

  render(targetIndex) {
    if (!this.canvas || !this.ctx) return;
    this.currentRenderedIndex = targetIndex;

    const result = this.getNearestLoadedFrame(targetIndex);
    if (!result || !result.frame) return;

    const img = result.frame;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    // Calculate aspect ratio containment
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Canvas is taller than image
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // If frame was not exact, prioritize loading the exact target frame
    if (!result.isExact) {
      this.prioritizeWindow(targetIndex, 3);
    }
  }

  destroy() {
    this.queue = [];
    this.frames = [];
    this.canvas = null;
    this.ctx = null;
  }
}
