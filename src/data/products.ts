import mango from "@/assets/product-mango.jpg";
import gongura from "@/assets/product-gongura.jpg";
import lemon from "@/assets/product-lemon.jpg";
import garlic from "@/assets/product-garlic.jpg";
import tomato from "@/assets/product-tomato.jpg";
import chicken from "@/assets/product-chicken.jpg";
import mutton from "@/assets/product-mutton.jpg";
import prawns from "@/assets/product-prawns.jpg";
import fish from "@/assets/product-fish.jpg";
import gonguramutton from "@/assets/mutton pickle.jpg";
import gongurachicken from "@/assets/gongura-chiken.jpg"; 
import bonechiken from "@/assets/chiken-withbone.jpg";


export type Category = "veg" | "non-veg";

export interface ProductSize {
  label: "250g" | "500g" | "1 Kg";
  price: number;
}

export interface Product {
  id: string;
  name: string;
  telugu?: string;
  category: Category;
  image: string;
  description: string;
  sizes: ProductSize[];
  badge?: string;
}

const VEG_SIZES: ProductSize[] = [
  { label: "250g", price: 180 },
  { label: "500g", price: 320 },
  { label: "1 Kg", price: 600 },
];

export const products: Product[] = [
  {
    id: "mango-avakaya",
    name: "Mango Avakaya",
    telugu: "మామిడి ఆవకాయ",
    category: "veg",
    image: mango,
    description: "Classic Andhra raw mango pickle with fiery red chili and cold-pressed sesame oil.",
    sizes: VEG_SIZES,
    badge: "Bestseller",
  },
  {
    id: "gongura-pachadi",
    name: "Gongura Pachadi",
    telugu: "గోంగూర పచ్చడి",
    category: "veg",
    image: gongura,
    description: "Tangy sorrel leaves slow-cooked with red chilies and garlic — pure Andhra soul.",
    sizes: VEG_SIZES,
  },
  {
    id: "lemon-pickle",
    name: "Lemon Pickle",
    telugu: "నిమ్మకాయ ఊరగాయ",
    category: "veg",
    image: lemon,
    description: "Sun-cured lemons with green chili, mustard and turmeric. Bright and zesty.",
    sizes: VEG_SIZES,
  },
  {
    id: "garlic-pickle",
    name: "Garlic Pickle",
    telugu: "వెల్లుల్లి ఊరగాయ",
    category: "veg",
    image: garlic,
    description: "Whole garlic cloves marinated in spiced oil — bold, aromatic, irresistible.",
    sizes: VEG_SIZES,
  },
  {
    id: "tomato-pickle",
    name: "Tomato Pickle",
    telugu: "టమాట పచ్చడి",
    category: "veg",
    image: tomato,
    description: "Sun-ripened tomatoes simmered with mustard, fenugreek and curry leaves.",
    sizes: VEG_SIZES,
  },
  {
    id: "chicken-bone",
    name: "Chicken Pickle (with bone)",
    telugu: "చికెన్ ఊరగాయ",
    category: "non-veg",
    image: bonechiken,
    description: "Tender bone-in chicken slow-cooked in fiery Andhra masala. Long-shelf homemade.",
    sizes: [
      { label: "250g", price: 300 },
      { label: "500g", price: 580 },
      { label: "1 Kg", price: 1100 },
    ],
    badge: "Hot",
  },
  {
    id: "chicken-boneless",
    name: "Chicken Pickle (boneless)",
    category: "non-veg",
    image: chicken,
    description: "Premium boneless chicken in spiced sesame oil — perfectly tender, deeply flavored.",
    sizes: [
      { label: "250g", price: 350 },
      { label: "500g", price: 680 },
      { label: "1 Kg", price: 1300 },
    ],
  },
  {
    id: "mutton",
    name: "Mutton Pickle",
    telugu: "మటన్ ఊరగాయ",
    category: "non-veg",
    image: gonguramutton,
    description: "Slow-cooked mutton in robust Telangana-style spices. A festive favorite.",
    sizes: [
      { label: "250g", price: 480 },
      { label: "500g", price: 920 },
      { label: "1 Kg", price: 1800 },
    ],
  },
  {
    id: "prawns",
    name: "Prawns Pickle",
    telugu: "రొయ్యల ఊరగాయ",
    category: "non-veg",
    image: prawns,
    description: "Coastal Andhra prawns pickled with curry leaves, tamarind and red chili.",
    sizes: [
      { label: "250g", price: 480 },
      { label: "500g", price: 920 },
      { label: "1 Kg", price: 1800 },
    ],
  },
  {
    id: "fish",
    name: "Fish Pickle",
    telugu: "చేప ఊరగాయ",
    category: "non-veg",
    image: fish,
    description: "Boneless fish chunks in tangy, spicy gravy — a coastal delicacy at home.",
    sizes: [
      { label: "250g", price: 480 },
      { label: "500g", price: 920 },
      { label: "1 Kg", price: 1800 },
    ],
  },
  {
    id: "gongura-chicken",
    name: "Gongura Chicken Pickle",
    telugu: "గోంగూర చికెన్",
    category: "non-veg",
    image: gongurachicken,
    description: "Two legends in one jar — gongura tang meets fiery Andhra chicken.",
    sizes: [
      { label: "250g", price: 380 },
      { label: "500g", price: 720 },
      { label: "1 Kg", price: 1400 },
    ],
    badge: "Signature",
  },
  {
    id: "gongura-mutton",
    name: "Gongura Mutton Pickle",
    telugu: "గోంగూర మటన్",
    category: "non-veg",
    image: mutton,
    description: "Premium mutton with tangy gongura — our most-loved festive jar.",
    sizes: [
      { label: "250g", price: 500 },
      { label: "500g", price: 960 },
      { label: "1 Kg", price: 1900 },
    ],
  },
];