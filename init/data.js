const sampleListings = [
  {
    title: 'Cozy Beachfront Cottage',
    description:
      'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
    image: {
      url:
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_1',
    },
    price: 1500,
    location: 'Malibu',
    country: 'United States',
  },
  {
    title: 'Modern Loft in Downtown',
    description:
      'Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!',
    image: {
      url:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_2',
    },
    price: 1200,
    location: 'New York City',
    country: 'United States',
  },
  {
    title: 'Mountain Retreat',
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_3',
    },
    price: 1000,
    location: 'Aspen',
    country: 'United States',
  },
  {
    title: 'Historic Villa in Tuscany',
    description:
      'Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.',
    image: {
      url:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_4',
    },
    price: 2500,
    location: 'Florence',
    country: 'Italy',
  },
  {
    title: 'Secluded Treehouse Getaway',
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_5',
    },
    price: 800,
    location: 'Portland',
    country: 'United States',
  },
  {
    title: 'Beachfront Paradise',
    description:
      'Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.',
    image: {
      url:
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_6',
    },
    price: 2000,
    location: 'Cancun',
    country: 'Mexico',
  },
  {
    title: 'Rustic Cabin by the Lake',
    description:
      'Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.',
    image: {
      url:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_7',
    },
    price: 900,
    location: 'Lake Tahoe',
    country: 'United States',
  },
  {
    title: 'Luxury Penthouse with City Views',
    description:
      'Indulge in luxury living with panoramic city views from this stunning penthouse apartment.',
    image: {
      url:
        'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_8',
    },
    price: 3500,
    location: 'Los Angeles',
    country: 'United States',
  },
  {
    title: 'Ski-In/Ski-Out Chalet',
    description:
      'Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.',
    image: {
      url:
        'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_9',
    },
    price: 3000,
    location: 'Verbier',
    country: 'Switzerland',
  },
  {
    title: 'Safari Lodge in the Serengeti',
    description:
      'Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.',
    image: {
      url:
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_10',
    },
    price: 4000,
    location: 'Serengeti National Park',
    country: 'Tanzania',
  },
  {
    title: 'Historic Canal House',
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      url:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_11',
    },
    price: 1800,
    location: 'Amsterdam',
    country: 'Netherlands',
  },
  {
    title: 'Private Island Retreat',
    description:
      'Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.',
    image: {
      url:
        'https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_12',
    },
    price: 10000,
    location: 'Fiji',
    country: 'Fiji',
  },
  {
    title: 'Charming Cottage in the Cotswolds',
    description:
      'Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.',
    image: {
      url:
        'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_13',
    },
    price: 1200,
    location: 'Cotswolds',
    country: 'United Kingdom',
  },
  {
    title: 'Historic Brownstone in Boston',
    description:
      "Step back in time in this beautifully restored brownstone in Boston's historic district.",
    image: {
      url:
        'https://images.unsplash.com/photo-1602189405697-1fdacbcf1961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_14',
    },
    price: 1300,
    location: 'Boston',
    country: 'United States',
  },
  {
    title: 'Countryside Farmhouse',
    description:
      'Get away from it all and enjoy a peaceful stay in this charming countryside farmhouse surrounded by rolling hills.',
    image: {
      url:
        'https://images.unsplash.com/photo-1526404748454-7d58c75b6446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_15',
    },
    price: 1100,
    location: 'Tuscany',
    country: 'Italy',
  },
  {
    title: 'Urban Apartment with Skyline View',
    description:
      'Stay in this modern urban apartment with breathtaking views of the city skyline. Perfect for business travelers.',
    image: {
      url:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2t5bGluZSUyMHZpZXd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      filename: 'sample_image_16',
    },
    price: 1700,
    location: 'Chicago',
    country: 'United States',
  },
];

module.exports = { data: sampleListings };
