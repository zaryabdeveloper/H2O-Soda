const base = import.meta.env.BASE_URL || './';
const cleanBase = base.endsWith('/') ? base : base + '/';

export const menuItems = [
  {
    id: 'electric-blue',
    name: 'Electric Blue Citrus',
    tag: 'Signature Star',
    price: 'Rs. 350',
    description: 'Our signature cold pour. Natural blue spirulina botanical extract, fresh Eureka lemon wheels, diamond ice, and crisp micro-carbonation served at 34°F.',
    image: `${cleanBase}images/drinks/electric-blue-soda.jpg`,
    colorAccent: '#00A3E0'
  },
  {
    id: 'arctic-lemon',
    name: 'Arctic Lemon & Lime',
    tag: 'Crisp & Zesty',
    price: 'Rs. 280',
    description: 'Frosty, sharp sparkling citrus soda crafted with cold-pressed lemon oils, crushed ice, and needle-fine effervescence for an instant refreshing kick.',
    image: `${cleanBase}images/drinks/arctic-lemon-soda.jpg`,
    colorAccent: '#0284C7'
  },
  {
    id: 'midnight-currant',
    name: 'Midnight Currant Sparkler',
    tag: 'Soda Cocktail',
    price: 'Rs. 380',
    description: 'Deep wild blackberry reduction infused with macerated blackcurrants, gentle mountain herbs, and smooth champagne-style bubbles.',
    image: `${cleanBase}images/drinks/midnight-berry-soda.jpg`,
    colorAccent: '#4F46E5'
  },
  {
    id: 'glacial-mint',
    name: 'Glacial Mint Vanilla Fizz',
    tag: 'Velvet Fizz',
    price: 'Rs. 350',
    description: 'Fresh mountain peppermint steeped with cold Madagascar bourbon vanilla bean extract, crowned with silky micro-foam over ice.',
    image: `${cleanBase}images/drinks/glacial-mint-cream.jpg`,
    colorAccent: '#059669'
  },
  {
    id: 'blood-orange',
    name: 'Sicilian Blood Orange Fizz',
    tag: 'Citrus Craft',
    price: 'Rs. 320',
    description: 'Sun-ripened blood orange extract paired with gentle aromatic gentian botanicals and ice-cold sparkling mineral water.',
    image: `${cleanBase}images/drinks/blood-orange-soda.jpg`,
    colorAccent: '#EA580C'
  },
  {
    id: 'ginger-brew',
    name: 'Smoked Ginger Brew',
    tag: 'Spicy Snap',
    price: 'Rs. 300',
    description: 'Slow-steeped ginger root with aromatic lime zest, warming spices, and an intense carbonation snap that lingers refreshingly.',
    image: `${cleanBase}images/drinks/ginger-brew-soda.jpg`,
    colorAccent: '#D97706'
  }
];
