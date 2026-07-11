// Shared site content. Offices are used by BOTH the Contact section and the
// Footer — edit once here and both update (a key win of the componentised setup).

export const offices = [
  { name: "Nairobi Office", short: "Nairobi", address: "Vision Plaza, Mombasa Road", phones: [{ tel: "+254705697163", label: "+254 705 697 163" }, { tel: "+254731760545", label: "+254 731 760 545" }] },
  { name: "Kisumu Office", short: "Kisumu", address: "Swan Center", phones: [{ tel: "+254781668675", label: "+254 781 668 675" }] },
  { name: "Eldoret Office", short: "Eldoret", address: "Rupa's Business Park", phones: [{ tel: "+254781771665", label: "+254 781 771 665" }] },
];

export const email = "info@pavilionmasterbuilders.com";

// WhatsApp deep link (primary Nairobi line)
export const whatsapp = "https://wa.me/254705697163?text=Hello%20Pavilion%20Master%20Builders%2C%20I%27d%20like%20to%20ask%20about%20your%20construction%20services.";

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Solutions", href: "/#products", dropdown: [
      { label: "Decra Roofing", href: "/products/decra-roofing" },
      { label: "Light Gauge Steel", href: "/products/light-gauge-steel" },
      { label: "Mixx Cement", href: "/products/mixx-cement" },
      { label: "Fiber Cement", href: "/products/fiber-cement" },
      { label: "UPVC Gutters", href: "/products/upvc-gutters" },
      { label: "Rust Converter", href: "/products/rust-converter" },
      { label: "Alternative Building", href: "/products/alternative-building" },
      { label: "Re-roofing & Cleaning", href: "/products/reroofing-cleaning" },
    ],
  },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const stats = [
  { number: "20+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "1000+", label: "Satisfied Clients" },
  { number: "100%", label: "Quality Assured" },
];

export const services = [
  "Decra Roofing", "Light Gauge Steel", "Mixx Cement", "Fiber Cement Boards",
  "UPVC Gutters", "Rust Converter (Neutrarust)", "Alternative Building",
  "Re-roofing & Roof Cleaning", "General Enquiry",
];

export const projects = [
  {
    img: "https://www.pavilionmasterbuilders.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-05-at-06.25.15_43a2c6a3-edited.jpg",
    alt: "Modern Commercial Building",
    category: "Commercial",
    title: "Premium Office Complex",
    desc: "State-of-the-art commercial development featuring advanced LGS technology and sustainable design practices.",
  },
  {
    img: "https://www.pavilionmasterbuilders.com/wp-content/uploads/2025/10/IMG-20251011-WA0035.jpg",
    alt: "Residential Development",
    category: "Residential",
    title: "Luxury Residential Estate",
    desc: "Elegant residential community with premium finishes, Decra roofing systems, and modern architectural design.",
  },
  {
    img: "https://www.pavilionmasterbuilders.com/wp-content/uploads/2025/11/pexels-kindelmedia-8488008-scaled.jpg",
    alt: "Industrial Project",
    category: "Industrial",
    title: "Manufacturing Facility",
    desc: "Large-scale industrial complex built with precision engineering and advanced construction technology.",
  },
];

export const testimonials = [
  { initials: "SK", name: "Sarah Kimani", role: "Residential - Karen", text: "Pavilion Master Builders transformed our vision into reality. Their professionalism, attention to detail, and timeline management were impeccable. The quality of work exceeded our expectations!" },
  { initials: "DO", name: "David Omondi", role: "Commercial Director", text: "As a property developer, we needed partners we could trust. PMB's LGS technology cut our construction timeline by 40% while maintaining premium quality standards. Outstanding partnership!" },
  { initials: "GM", name: "Grace Mwangi", role: "Architect", text: "The fibre cement solutions provided perfect aesthetics and durability for our office renovation. Eight months later, everything still looks flawless. Highly recommended for quality construction!" },
];

export const whyChoose = [
  { icon: "\uD83C\uDFC6", title: "20+ Years Expertise", desc: "Over two decades of proven excellence delivering exceptional construction solutions across East Africa." },
  { icon: "\u2699\uFE0F", title: "Quality Assured", desc: "Licensed, insured, and guaranteed work. Premium materials and certified professionals on every project." },
  { icon: "\u26A1", title: "Fast & Reliable", desc: "Same-day consultations and efficient project completion without compromising quality standards." },
  { icon: "\uD83D\uDCA1", title: "Modern Technology", desc: "Cutting-edge building technologies and sustainable materials for durable, eco-friendly structures." },
];
