// Shared site content. Offices are used by BOTH the Contact section and the
// Footer — edit once here and both update (a key win of the componentised setup).

export const offices = [
  {
    name: "Nairobi Office", short: "Nairobi", address: "Vision Plaza, Mombasa Road",
    phones: [{ tel: "+254705697163", label: "+254 705 697 163" }, { tel: "+254731760545", label: "+254 731 760 545" }],
    // Only an office carrying `map` renders one; the others omit the field.
    // The image is composed from OpenStreetMap tiles and committed to the repo,
    // so no tile server is contacted at runtime. Regenerating it means
    // re-rendering at -1.32707, 36.85275 — and the attribution below the image
    // is a licence condition, not decoration.
    map: {
      // Google's documented URL format. A share.google shortlink would rot.
      url: "https://www.google.com/maps/search/?api=1&query=Vision+Plaza+Mombasa+Road+Nairobi",
      image: "/assets/contact/nairobi-office-map.webp",
      width: 800,
      height: 400,
    },
  },
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
      { label: "A-Frame Structures", href: "/products/a-frame-structures" },
      { label: "Re-roofing & Cleaning", href: "/products/reroofing-cleaning" },
    ],
  },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
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
  "A-Frame Structures", "Re-roofing & Roof Cleaning", "General Enquiry",
];

// Photos live in public/assets/, like every other image on the site. These
// three previously pointed at /wp-content/uploads/ on the old WordPress install
// — files the Astro build does not produce and the deploy does not manage.
export const projects = [
  {
    img: "/assets/project-showcase/showcase-01.jpeg",
    alt: "Two-storey stone commercial building under construction, with light gauge steel roof trusses being lifted into place",
    category: "Commercial",
    title: "Premium Office Complex",
    desc: "State-of-the-art commercial development featuring advanced LGS technology and sustainable design practices.",
  },
  {
    img: "/assets/project-showcase/showcase-07.jpeg",
    alt: "Completed two-storey private home at dusk, finished in white render with a dark tiled roof",
    category: "Residential",
    title: "Luxury Residential Estate",
    desc: "Elegant residential community with premium finishes, Decra roofing systems, and modern architectural design.",
  },
  {
    img: "/assets/project-showcase/showcase-08.jpeg",
    alt: "Broad micro-cement entrance steps leading to a timber front door, finished as one seamless surface",
    category: "Finishes",
    title: "Seamless Micro-Cement Entrance",
    desc: "Entrance steps and landing finished in Mixx micro-cement — one continuous surface with no tiles, joints or grout lines to weather.",
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
