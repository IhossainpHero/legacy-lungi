export const products = [
  {
    // Product 1: Enayetpur Premium Cotton Lungi
    id: "EPCL", // Unique ID added
    name: "এনায়েতপুর প্রিমিয়াম কটন লুঙ্গি", // Renamed 'name' to 'name_bn'
    slug: "enayetpur-premium-cotton",
    category: "কটন লুঙ্গি", // Category adjusted to Bengali
    regular_price: 550, // 'price' renamed to 'regular_price'
    sale_price: 499, // Sale price added for discount logic
    discount_percent: 9,
    is_sold_out: false,
    image: "/images/DL-1.jpg",
    description: "Soft, breathable handloom cotton lungi from Enayetpur.",
  },
  {
    // Product 2: Classic Checked Lungi
    id: "CCL",
    name: "ক্লাসিক চেকার্ড লুঙ্গি",
    slug: "classic-checked",
    category: "প্রিমিয়াম কালেকশন",
    regular_price: 620,
    sale_price: 550,
    discount_percent: 11,
    is_sold_out: false,
    image: "/images/DL-2.jpg",
    description: "Traditional checked design with superior dye quality.",
  },
  {
    // Product 3: Striped Summer Lungi
    id: "SSL",
    name: "স্ট্রাইপড সামার লুঙ্গি",
    slug: "striped-summer",
    category: "কটন লুঙ্গি",
    regular_price: 480,
    sale_price: 450,
    discount_percent: 6,
    is_sold_out: false,
    image: "/images/DL-3.jpg",
    description: "Lightweight, comfortable, and perfect for everyday use.",
  },
  {
    // Product 4: One Part Summer Lungi
    id: "OPL",
    name: "ওয়ান পার্ট সামার লুঙ্গি",
    slug: "one-part-summer-opl", // !!! DUPLICATE SLUG FIXED: unique kora holo
    category: "ওয়ান পার্ট",
    regular_price: 480,
    sale_price: 420,
    discount_percent: 12,
    is_sold_out: false,
    image: "/images/DL-7.jpg",
    description: "Lightweight, comfortable, and perfect for everyday use.",
  },
  // Previous Products (Image path updated to existing path)
  {
    id: "LW4",
    name: "প্রিমিয়াম এক্সট্রা লার্জ লুঙ্গি LW 4",
    slug: "extra-large-lungi-lw4",
    image: "/images/DL-1.jpg", // <--- FIXED: Using an existing image path
    regular_price: 1450,
    sale_price: 950,
    discount_percent: 34,
    is_sold_out: false,
    category: "এক্সট্রা লার্জ লুঙ্গি",
  },
  {
    id: "KC9",
    name: "প্রিমিয়াম সফট লুঙ্গি (অফার) KC 9",
    slug: "premium-soft-lungi-kc9",
    image: "/images/DL-7.jpg", // <--- FIXED: Using an existing image path
    regular_price: 1200,
    sale_price: 850,
    discount_percent: 29,
    is_sold_out: false,
    category: "সফট লুঙ্গি",
  },
];
