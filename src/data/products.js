export const categories = [
  { id: "all", label: "All" },
  { id: "true-wireless", label: "True Wireless" },
  { id: "noise-cancelling", label: "Noise Cancelling" },
  { id: "sport", label: "Sport" },
  { id: "studio", label: "Studio" },
];

export const priceFilters = [
  { id: "all", label: "Any price" },
  { id: "under-100", label: "Under $100" },
  { id: "100-200", label: "$100 – $200" },
  { id: "over-200", label: "Over $200" },
];

export function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function matchesPrice(product, filterId) {
  if (filterId === "under-100") return product.price < 100;
  if (filterId === "100-200") return product.price >= 100 && product.price <= 200;
  if (filterId === "over-200") return product.price > 200;
  return true;
}

const sharedShipping = [
  "Free shipping over $150",
  "30-day home trial",
  "Two-year warranty on drivers and battery",
  "Three tip sizes in the box",
];

export const products = [
  {
    id: "noir-anc",
    name: "Noir ANC",
    tagline: "Flagship silence",
    category: "noise-cancelling",
    price: 249,
    compareAt: 299,
    rating: 4.8,
    reviewCount: 1864,
    badge: "Bestseller",
    featured: false,
    spotlight: true,
    compact: false,
    variant: "stem",
    palette: "obsidian",
    colors: [
      { name: "Obsidian", hex: "#1c1c1c", palette: "obsidian" },
      { name: "Ivory", hex: "#f4efe8", palette: "ivory" },
      { name: "Copper", hex: "#9c5b38", palette: "clay" },
    ],
    description:
      "Noir ANC is the pair we voice last, in a quiet room after midnight. Adaptive cancellation takes the edge off cabins and open offices without hollowing out voices.",
    highlights: [
      "Up to 42 dB adaptive noise cancelling",
      "36 hours with the case, 8 hours in the buds",
      "Multipoint Bluetooth 5.4",
    ],
    specs: [
      { label: "Drivers", value: "11 mm beryllium-coated" },
      { label: "Battery", value: "8 h buds · 36 h with case" },
      { label: "ANC", value: "Adaptive, up to 42 dB" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.4, multipoint" },
      { label: "Weight", value: "4.8 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "n1",
        name: "Maya Chen",
        rating: 5,
        title: "The office finally goes quiet",
        body: "I take calls on a noisy floor and Noir keeps the room out without making my own voice sound distant. Fit is secure for a full day.",
        date: "March 2026",
      },
      {
        id: "n2",
        name: "Jonah Ellis",
        rating: 4,
        title: "Worth the sale price",
        body: "Bass is taut rather than boomy. Transparency mode is the one I leave on while walking. Case is a little taller than I expected.",
        date: "January 2026",
      },
    ],
  },
  {
    id: "air-one",
    name: "Air One",
    tagline: "Everyday, carried lightly",
    category: "true-wireless",
    price: 159,
    compareAt: 189,
    rating: 4.7,
    reviewCount: 2420,
    badge: "New",
    featured: true,
    spotlight: false,
    compact: false,
    variant: "stem",
    palette: "ivory",
    colors: [
      { name: "Ivory", hex: "#f4efe8", palette: "ivory" },
      { name: "Sand", hex: "#d9cbb8", palette: "sand" },
      { name: "Graphite", hex: "#3a3937", palette: "graphite" },
    ],
    description:
      "Air One is the pair that disappears into a coat pocket and a long Tuesday. A warm, even tune with enough clarity for podcasts and enough body for a walk home.",
    highlights: [
      "32 hours total with the charging case",
      "Transparency mode for streets and counters",
      "Wireless charging on the case",
    ],
    specs: [
      { label: "Drivers", value: "10 mm dynamic" },
      { label: "Battery", value: "7 h buds · 32 h with case" },
      { label: "ANC", value: "Feed-forward, light" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Weight", value: "4.2 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "a1",
        name: "Priya Nair",
        rating: 5,
        title: "The pair I actually reach for",
        body: "Comfort is the story. I forget they are in during a three-hour train ride. The ivory finish hides pocket scuffs better than I expected.",
        date: "February 2026",
      },
      {
        id: "a2",
        name: "Leo Martins",
        rating: 4,
        title: "Clean and simple",
        body: "Setup took a minute. Sound is polite — not a bass monster — which is what I wanted for calls and playlists.",
        date: "December 2025",
      },
    ],
  },
  {
    id: "pulse-fit",
    name: "Pulse Fit",
    tagline: "Locked in for the long run",
    category: "sport",
    price: 129,
    compareAt: null,
    rating: 4.6,
    reviewCount: 980,
    badge: null,
    featured: true,
    spotlight: false,
    compact: false,
    variant: "bean",
    palette: "signal",
    colors: [
      { name: "Signal", hex: "#d6e36a", palette: "signal" },
      { name: "Ink", hex: "#1c1c1c", palette: "obsidian" },
      { name: "Sand", hex: "#d9cbb8", palette: "sand" },
    ],
    description:
      "Pulse Fit uses a short wing and a sticky tip so the seal survives intervals. The tune is a little forward, built for tempo rather than critical listening.",
    highlights: [
      "IP57 for sweat and sudden rain",
      "Secure wing tips in three sizes",
      "28 hours with the case",
    ],
    specs: [
      { label: "Drivers", value: "10 mm dynamic" },
      { label: "Battery", value: "7 h buds · 28 h with case" },
      { label: "ANC", value: "None — open awareness mode" },
      { label: "Resistance", value: "IP57" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Weight", value: "5.1 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "p1",
        name: "Chris Adeyemi",
        rating: 5,
        title: "Stayed in through mile 11",
        body: "Every other bud I own gives up around the cooling-down jog. These did not. Rain on Tuesday was a non-event.",
        date: "April 2026",
      },
      {
        id: "p2",
        name: "Elena Voss",
        rating: 4,
        title: "Sport first, hi-fi second",
        body: "They are tuned loud and a bit bright, which works in a gym. I would not mix on them. Fit is the reason to buy.",
        date: "November 2025",
      },
    ],
  },
  {
    id: "studio-reference",
    name: "Studio Reference",
    tagline: "An honest second opinion",
    category: "studio",
    price: 329,
    compareAt: null,
    rating: 4.9,
    reviewCount: 640,
    badge: "Editors' pick",
    featured: true,
    spotlight: false,
    compact: false,
    variant: "stem",
    palette: "graphite",
    colors: [
      { name: "Graphite", hex: "#3a3937", palette: "graphite" },
      { name: "Copper", hex: "#9c5b38", palette: "clay" },
    ],
    description:
      "Studio Reference is voiced flat enough to trust while you edit, with a low-latency dongle for picture. Wireless when you leave the desk, wired when timing matters.",
    highlights: [
      "Low-latency USB-C dongle included",
      "Detachable short cable for desk work",
      "Neutral tune checked against piano and voice",
    ],
    specs: [
      { label: "Drivers", value: "12 mm dual-magnet" },
      { label: "Battery", value: "6 h buds · 24 h with case" },
      { label: "ANC", value: "Mild isolation, not cancelling" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.4 + USB-C dongle" },
      { label: "Weight", value: "5.4 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "s1",
        name: "Noah Feldman",
        rating: 5,
        title: "I check mixes on these now",
        body: "They do not flatter. A muddy low-mid shows up immediately, which is the point. The dongle latency is low enough for a rough cut.",
        date: "May 2026",
      },
      {
        id: "s2",
        name: "Amelia Rossi",
        rating: 5,
        title: "Desk to train without a second pair",
        body: "I was skeptical of earbuds for editing. These are close enough that I stopped carrying the closed-back headphones on short trips.",
        date: "August 2025",
      },
    ],
  },
  {
    id: "mini-bud",
    name: "Mini Bud",
    tagline: "Small case, full day",
    category: "true-wireless",
    price: 79,
    compareAt: 99,
    rating: 4.4,
    reviewCount: 3102,
    badge: "Offer",
    featured: false,
    spotlight: false,
    compact: true,
    variant: "bean",
    palette: "sand",
    colors: [
      { name: "Sand", hex: "#d9cbb8", palette: "sand" },
      { name: "Ink", hex: "#1c1c1c", palette: "obsidian" },
    ],
    description:
      "Mini Bud is the spare pair that becomes the main pair. A compact case, a friendly tune, and a price that makes a second color easy to justify.",
    highlights: [
      "Pocket case about the size of a key fob",
      "24 hours of playback with the case",
      "One-tap pairing",
    ],
    specs: [
      { label: "Drivers", value: "8 mm dynamic" },
      { label: "Battery", value: "5.5 h buds · 24 h with case" },
      { label: "ANC", value: "None" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Weight", value: "3.6 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "m1",
        name: "Samira Haddad",
        rating: 4,
        title: "Gift that got stolen by the giver",
        body: "Bought a pair for my brother and ordered another the same week. They are not luxurious, they are just always with me.",
        date: "June 2026",
      },
      {
        id: "m2",
        name: "Owen Blake",
        rating: 4,
        title: "Honest for the price",
        body: "Bass rolls off early and ANC is not here. Calls are clear and the case vanishes in a jeans pocket. That was the brief.",
        date: "October 2025",
      },
    ],
  },
  {
    id: "drift-day",
    name: "Drift Day",
    tagline: "Soft seal, long wear",
    category: "true-wireless",
    price: 189,
    compareAt: null,
    rating: 4.7,
    reviewCount: 1211,
    badge: null,
    featured: true,
    spotlight: false,
    compact: false,
    variant: "stem",
    palette: "taupe",
    colors: [
      { name: "Taupe", hex: "#b7a394", palette: "taupe" },
      { name: "Ivory", hex: "#f4efe8", palette: "ivory" },
      { name: "Ink", hex: "#1c1c1c", palette: "obsidian" },
    ],
    description:
      "Drift Day is built around the hours you forget to take them out. Memory-foam tips and a slightly larger nozzle keep the seal gentle instead of tight.",
    highlights: [
      "Memory-foam tips for long sessions",
      "40 hours with the case",
      "Warm mids for voices and acoustic sets",
    ],
    specs: [
      { label: "Drivers", value: "11 mm dynamic" },
      { label: "Battery", value: "9 h buds · 40 h with case" },
      { label: "ANC", value: "Hybrid, moderate" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.4, multipoint" },
      { label: "Weight", value: "4.9 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "d1",
        name: "Helen Cho",
        rating: 5,
        title: "No afternoon ache",
        body: "Other buds press after lunch. Drift is the first pair I can wear from the morning stand-up through the commute home.",
        date: "March 2026",
      },
      {
        id: "d2",
        name: "Marcus Hale",
        rating: 4,
        title: "Voices sound close",
        body: "Podcasts are the surprise win. Music is warm, almost soft, which I like on acoustic records and less on electronic ones.",
        date: "July 2025",
      },
    ],
  },
  {
    id: "apex-max",
    name: "Apex Max",
    tagline: "Our quietest room",
    category: "noise-cancelling",
    price: 379,
    compareAt: 429,
    rating: 4.8,
    reviewCount: 870,
    badge: "Limited",
    featured: false,
    spotlight: false,
    compact: false,
    variant: "stem",
    palette: "silver",
    colors: [
      { name: "Silver", hex: "#d5d5d2", palette: "silver" },
      { name: "Obsidian", hex: "#1c1c1c", palette: "obsidian" },
    ],
    description:
      "Apex Max is the pair for cabins, open offices, and anyone who wants the room to step back. Spatial processing is optional and easy to leave off.",
    highlights: [
      "Strongest cancellation in the collection",
      "Wireless charging and a fast 10-minute top-up",
      "Spatial mode you can ignore",
    ],
    specs: [
      { label: "Drivers", value: "12 mm dual-magnet" },
      { label: "Battery", value: "8 h ANC · 34 h with case" },
      { label: "ANC", value: "Adaptive, flagship" },
      { label: "Resistance", value: "IPX4" },
      { label: "Bluetooth", value: "5.4, LE Audio" },
      { label: "Weight", value: "5.2 g per bud" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "x1",
        name: "Ibrahim Shah",
        rating: 5,
        title: "Red-eye approved",
        body: "Used them Lisbon to New York. Engine hum dropped enough that I slept, which has not happened with buds before.",
        date: "January 2026",
      },
      {
        id: "x2",
        name: "Claire Dumont",
        rating: 4,
        title: "Excellent, and priced like it",
        body: "Cancellation is the best I have owned in this size. I turned spatial off immediately. The silver finish marks if you toss the case in a bag.",
        date: "September 2025",
      },
    ],
  },
  {
    id: "halo-open",
    name: "Halo Open",
    tagline: "Hear the street, hear the song",
    category: "sport",
    price: 149,
    compareAt: null,
    rating: 4.5,
    reviewCount: 540,
    badge: "New",
    featured: false,
    spotlight: false,
    compact: false,
    variant: "open",
    palette: "clay",
    colors: [
      { name: "Clay", hex: "#c4622d", palette: "clay" },
      { name: "Sand", hex: "#d9cbb8", palette: "sand" },
      { name: "Ink", hex: "#1c1c1c", palette: "obsidian" },
    ],
    description:
      "Halo Open rests outside the ear canal so traffic, cafés, and someone saying your name still get through. It is for walks and desks, not for flights.",
    highlights: [
      "Open-ear clip, nothing in the canal",
      "18 hours on a charge",
      "Awareness is the design, not a mode",
    ],
    specs: [
      { label: "Drivers", value: "16 mm air-conduction" },
      { label: "Battery", value: "8 h · 18 h with case" },
      { label: "ANC", value: "Open by design" },
      { label: "Resistance", value: "IP55" },
      { label: "Bluetooth", value: "5.4" },
      { label: "Weight", value: "8.4 g per clip" },
    ],
    shipping: sharedShipping,
    reviews: [
      {
        id: "h1",
        name: "Ruth Keller",
        rating: 5,
        title: "I can hear the doorbell",
        body: "Working from the kitchen, I wanted music without missing the delivery. Halo is the first design that actually does that.",
        date: "April 2026",
      },
      {
        id: "h2",
        name: "Diego Alvarez",
        rating: 4,
        title: "Not for the subway",
        body: "On a quiet street they sound open and pleasant. On the train they lose the fight, which the product page told me. I still wear them outside.",
        date: "February 2026",
      },
    ],
  },
];

export const stories = [
  {
    id: "st1",
    quote: "Noir is the first pair that makes my open office feel like a room with a door.",
    name: "Maya Chen",
    detail: "Noir ANC · Copenhagen",
  },
  {
    id: "st2",
    quote: "I stopped packing a second pair for runs. Pulse stays in, even when the weather does not.",
    name: "Chris Adeyemi",
    detail: "Pulse Fit · Portland",
  },
  {
    id: "st3",
    quote: "Drift is the only bud I can wear through an edit day without taking a break for my ears.",
    name: "Helen Cho",
    detail: "Drift Day · Seoul",
  },
];

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function relatedProducts(product, count = 3) {
  const same = products.filter((item) => item.category === product.category && item.id !== product.id);
  const rest = products.filter((item) => item.id !== product.id && !same.includes(item));
  return [...same, ...rest].slice(0, count);
}
