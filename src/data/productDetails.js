// ============================================================================
// Product detail content. One entry per product, keyed by slug.
// Each page is generated from this file by src/pages/products/[slug].astro,
// so all product pages share one template and stay visually consistent.
//
// A product has: slug, title, tag, tagline, heroImage, intro, highlights[],
// and an ordered `sections` array. Supported section `type`s:
//   feature-grid : heading, intro?, items:[{img?|icon?, title, desc?, spec?}]
//   spec-table   : heading, intro?, columns:[], rows:[[]]
//   colour       : heading, intro?, images:[{src, caption?}]
//   benefits     : heading, intro?, columns?:1|2, items:[]
//   gallery      : heading?, intro?, images:[]   (src strings or {src,label})
// Add/emove sections freely — the template renders whatever is present.
// ============================================================================

export const productDetails = {
  'decra-roofing': {
    slug: 'decra-roofing',
    title: 'Decra Roofing',
    tag: 'Stone-Coated Roofing',
    tagline: 'Genuine DECRA\u00ae stone-coated steel roofing \u2014 lightweight, elegant, and built to last 50+ years.',
    metaDescription: 'Genuine DECRA\u00ae stone-coated steel roofing in Kenya \u2014 50+ year lifespan, lightweight and weatherproof. Request a free quote from Pavilion Master Builders.',
    heroImage: '/assets/roofing-decra/decra-roof-example-01.jpeg',
    intro: 'Decra roofing tiles are lightweight metal roofing systems coated with natural stone chips for durability and timeless style. First developed in New Zealand in the 1950s as a stronger roofing solution, Decra combines the elegance of classic tiles with modern performance. As a Pavilion Master Builders supply, every tile is #GenuineDecra \u2014 the world\u2019s No.1 stone-coated metal roof tile.',
    highlights: [
      { icon: '\uD83D\uDEE1\uFE0F', title: '50+ Year Lifespan', desc: 'Long life with very low maintenance.' },
      { icon: '\uD83E\uDEB6', title: 'Lightweight & Strong', desc: 'Reduces structural load without losing strength.' },
      { icon: '\u2600\uFE0F', title: 'Weatherproof', desc: 'Resists rust, corrosion and UV rays.' },
      { icon: '\uD83C\uDFA8', title: 'Style Options', desc: 'Six profiles and a wide range of colours.' },
    ],
    sections: [
      {
        type: 'spec-table',
        heading: 'Six Genuine Profiles',
        intro: 'Choose the profile that suits your architecture \u2014 every one carries the genuine Decra guarantee.',
        columns: ['Profile', 'Overall Length', 'Length of Cover', 'Cover Width', 'Weight / m\u00b2', 'Min. Pitch'],
        rows: [
          ['Heritage', '1320mm', '1260mm', '370mm', '6.4kg', '12\u00b0'],
          ['Shingle', '1310mm', '1250mm', '370mm', '6.6kg', '15\u00b0'],
          ['Milano', '1320mm', '1260mm', '370mm', '6.4kg', '15\u00b0'],
          ['Shake', '1320mm', '1260mm', '370mm', '6.6kg', '15\u00b0'],
          ['Fortiza Tile', '1335mm', '1250mm', '400mm', '5.8kg', '15\u00b0'],
          ['Fortiza Shingle', '1330mm', '1245mm', '400mm', '5.8kg', '15\u00b0'],
        ],
      },
      {
        type: 'colour',
        heading: 'Colour Range',
        intro: 'Genuine Decra colours across every profile \u2014 from Heritage and Shingle to the Fortiza range.',
        images: [{ src: '/assets/roofing-decra/decra-colour-guide.jpeg', caption: 'The Pavilion Master Builders guide to genuine Decra colours' }],
      },
      {
        type: 'benefits',
        heading: 'Why Decra',
        columns: 2,
        items: [
          'Lightweight yet strong \u2014 reduces structural load',
          'Resistant to rust, corrosion and UV rays',
          'Long 50+ year lifespan with very low maintenance',
          'Eco-friendly stone-coated steel',
          'Wide variety of colours and styles',
          'Genuine #GenuineDecra quality and warranty',
        ],
      },
      {
        type: 'benefits',
        heading: 'Complete the System',
        intro: 'Remember to order your trim and accessories \u2014 all supplied in your tile colour.',
        columns: 2,
        items: [
          'Decra Foil & Nails (required for warranty)',
          'Barrel Trim & Barrel End',
          'Box Barge & Ridge Hip',
          'Side Flashing & Valley',
          'Flat Sheet & Touch-up Kit',
          'Rainwater Gutter System',
        ],
      },
      {
        type: 'gallery',
        heading: 'In the Field',
        images: [
          '/assets/roofing-decra/decra-roof-example-01.jpeg',
          '/assets/roofing-decra/decra-roof-example-02.jpeg',
          '/assets/roofing-decra/decra-roof-example-03.jpeg',
          '/assets/roofing-decra/decra-roof-example-04.jpeg',
        ],
      },
    ],
  },

  'light-gauge-steel': {
    slug: 'light-gauge-steel',
    title: 'Light Gauge Steel',
    tag: 'Alternative Build',
    tagline: 'FRAMECAD\u00ae light gauge steel \u2014 intelligent, automated framing for speed, precision and sustainability.',
    metaDescription: 'FRAMECAD\u00ae light gauge steel framing in Kenya \u2014 faster, precise and sustainable construction. Get a free LGS project quote from Pavilion Master Builders.',
    heroImage: '/assets/light-gauge-steel/lgs-04.jpeg',
    intro: 'Pavilion Master Builders has partnered with FRAMECAD\u00ae to provide light gauge steel (LGS) \u2014 an innovative building solution that meets the growing demand for alternative construction. We leverage world-class technology for intelligent, automated steel-frame design and manufacturing that delivers unparalleled project efficiency. Our automated production and pre-assembled panels significantly reduce on-site labour and construction time, while software-driven precision eliminates human error and material waste, delivering frames with superior strength and durability.',
    highlights: [
      { icon: '\u26A1', title: 'Up to 40% Faster', desc: 'Pre-assembled panels cut on-site time.' },
      { icon: '\uD83C\uDFAF', title: 'Precision', desc: 'Software-driven, near-zero material waste.' },
      { icon: '\u267B\uFE0F', title: 'Sustainable', desc: 'Energy-efficient, low-waste production.' },
      { icon: '\uD83C\uDFD7\uFE0F', title: 'Versatile', desc: 'Commercial, residential, modular & industrial.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'Structural Systems',
        intro: 'Automated, software-driven steel frames engineered for contemporary projects.',
        items: [
          { img: '/assets/light-gauge-steel/lgs-05.jpeg', title: 'Trussing', desc: 'Light gauge steel trusses redefine modern construction with exceptional durability, precision, faster assembly and design flexibility \u2014 all with cost efficiency.' },
          { img: '/assets/light-gauge-steel/lgs-06.jpeg', title: 'Wall Panels', desc: 'World-class technology delivers versatile wall panels that minimise environmental impact, use energy-efficient production, and enable faster assembly.' },
          { img: '/assets/light-gauge-steel/lgs-07.jpeg', title: 'Floor Panels & Joists', desc: 'Superior load-bearing capacity and exceptional durability, with adaptable solutions that facilitate faster assembly times.' },
        ],
      },
      {
        type: 'feature-grid',
        heading: 'Built for Every Vision',
        items: [
          { icon: '\uD83C\uDFE2', title: 'Commercial Structures', desc: 'High-performing office blocks, retail spaces and warehouses that combine speed with superior strength.' },
          { icon: '\uD83C\uDFE1', title: 'Residential Buildings', desc: 'Sleek, long-lasting homes that stand strong against time and the elements.' },
          { icon: '\uD83E\uDDF1', title: 'Modular Construction', desc: 'Prefabricated with precision for quick installs and minimal on-site disruption.' },
          { icon: '\uD83C\uDFED', title: 'Industrial Builds', desc: 'Heavy-duty performance with lightweight versatility \u2014 perfect for factories and storage units.' },
        ],
      },
      {
        type: 'benefits',
        heading: 'Why Light Gauge Steel',
        columns: 2,
        items: [
          'Up to 40% faster construction',
          'Software-driven precision, minimal waste',
          'Sustainable, energy-efficient production',
          'Superior strength and durability',
          'Design flexibility for any project',
          'Reduced on-site labour and delays',
        ],
      },
      {
        type: 'gallery',
        heading: 'Projects in Steel',
        images: [
          '/assets/light-gauge-steel/lgs-01.jpeg',
          '/assets/light-gauge-steel/lgs-02.jpeg',
          '/assets/light-gauge-steel/lgs-03.jpeg',
          '/assets/light-gauge-steel/lgs-08.jpeg',
        ],
      },
    ],
  },

  'mixx-cement': {
    slug: 'mixx-cement',
    title: 'Mixx Cement',
    tag: 'Decorative Finish',
    tagline: 'Cement with Style \u2014 decorative micro-cement with the look of Venetian plaster, at a fraction of the cost.',
    metaDescription: 'Mixx decorative micro-cement in Kenya \u2014 Venetian plaster looks for walls and floors at a fraction of the cost. Request a free quote today.',
    heroImage: '/assets/mixx-cement/finishes/designer-wall-bedroom.jpeg',
    intro: 'Mixx delivers the effect of Venetian plaster \u2014 a complicated, expensive, high-skill finish \u2014 with a low-cost, easy-to-apply product. While competitor products need many components, Mixx is simply one bag of cement powder and one bottle of binder, mixed 1:1, followed by a sealer. It can be applied to walls, floors, worktops and even over existing tiles, indoors or out, in wet or dry areas. Designed for Africa, water-based and classed as non-hazardous.',
    highlights: [
      { icon: '\uD83C\uDFA8', title: '24 Designer Colours', desc: 'Across three finish ranges.' },
      { icon: '\uD83D\uDCA7', title: 'Wet & Dry', desc: 'Indoor, outdoor, showers, worktops.' },
      { icon: '\uD83E\uDDF1', title: 'Over Existing Tiles', desc: 'Applies over most surfaces.' },
      { icon: '\u2705', title: 'Non-Hazardous', desc: 'Water-based and easy to apply.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'The Finishes',
        items: [
          { img: '/assets/mixx-cement/finishes/designer-wall.jpeg', title: 'Designer Wall', desc: 'For interior walls, countertops and ceilings \u2014 even wet areas. Film thickness 1.4\u20131.6mm.', spec: '12.5kg + 5L Binder = 35 sqm \u00b7 Seal with Silly Seal' },
          { img: '/assets/mixx-cement/finishes/easy-floor.jpeg', title: 'Easy Floor', desc: 'For tiled floors, new screed or previously coated floors. Film thickness 1.4\u20131.8mm.', spec: '12.5kg + 5L Binder = 35 sqm \u00b7 Seal with Serious Seal' },
          { img: '/assets/mixx-cement/finishes/outdoor-plaster.jpeg', title: 'Outdoor Plaster', desc: 'A durable external coat with a beautiful mottled appearance.', spec: '25kg + 9L Water, no binder \u00b7 Seal with Silly Seal' },
        ],
      },
      {
        type: 'colour',
        heading: 'Designer Colour Range',
        intro: '24 curated colours across the three finishes \u2014 from Wish List and Cutting Edge to Wet Cement and Bone.',
        images: [
          { src: '/assets/mixx-cement/colour-charts/designer-wall-colours.jpeg', caption: 'Designer Wall' },
          { src: '/assets/mixx-cement/colour-charts/easy-floor-colours.jpeg', caption: 'Easy Floor' },
          { src: '/assets/mixx-cement/colour-charts/outdoor-plaster-colours.jpeg', caption: 'Outdoor Plaster' },
        ],
      },
      {
        type: 'feature-grid',
        heading: 'The Sealers',
        items: [
          { img: '/assets/mixx-cement/products/silly-seal.jpeg', title: 'Silly Seal', desc: 'For \u201cDesigner Wall\u201d finishes.' },
          { img: '/assets/mixx-cement/products/serious-seal.jpeg', title: 'Serious Seal', desc: 'For \u201cEasy Floor\u201d finishes.' },
          { img: '/assets/mixx-cement/products/supreme-seal.jpeg', title: 'Supreme Seal', desc: 'For wet areas such as showers.' },
        ],
      },
      {
        type: 'spec-table',
        heading: 'Application Guide',
        columns: ['Application', 'Plaster', 'Coats', 'Sealer'],
        rows: [
          ['Internal Wall', '12.5kg + 5L Neutral Binder', '2 coats = 17.5 sqm', '2 coats Silly Seal'],
          ['Internal Wall \u2013 Wet Area', '12.5kg + 5L Binder', '2 coats = 17.5 sqm', '2 Silly Seal + 1 Supreme Seal'],
          ['Internal Floor', '12.5kg + 5L Binder', '2 coats = 17.5 sqm', '2 coats Serious Seal'],
          ['Internal Floor \u2013 Wet Area', '12.5kg + 5L Binder', '2 coats = 17.5 sqm', '2 Serious Seal + 1 Supreme Seal'],
          ['External Wall', '25kg + 9L Water', '2 coats = 17.5 sqm', '2 Silly Seal (optional Serious)'],
          ['External Floor', '12.5kg + 5L Binder', '2 coats = 17.5 sqm', '2 Serious Seal + 1 Supreme Seal'],
        ],
      },
      {
        type: 'gallery',
        heading: 'Applications',
        images: [
          '/assets/mixx-cement/finishes/easy-floor-bathroom.jpeg',
          '/assets/mixx-cement/finishes/outdoor-plaster-aerial.jpeg',
          '/assets/mixx-cement/applications/application-01.jpeg',
          '/assets/mixx-cement/applications/application-05.jpeg',
        ],
      },
    ],
  },

  'fiber-cement': {
    slug: 'fiber-cement',
    title: 'Fiber Cement',
    tag: 'Boards & Cladding',
    tagline: 'Fire-, termite- and weather-resistant fiber cement boards for ceilings, cladding and flooring.',
    metaDescription: 'Fire-, termite- and weather-resistant fibre cement boards in Kenya for ceilings, cladding and flooring. Request a free quote from Pavilion Master Builders.',
    heroImage: '/assets/fiber-cement/fiber-cement-09.jpeg',
    intro: 'Fiber cement boards are a transformative solution for modern construction, offering a perfect blend of superior durability, low maintenance and design flexibility. They are resistant to fire, termites and weathering, and transform both interiors and exteriors \u2014 making them ideal for ceilings, wall cladding and flooring. With easy installation and minimal environmental impact, fiber cement boards enhance the quality and safety of any space while being kind to the environment.',
    highlights: [
      { icon: '\uD83D\uDD25', title: 'Fire Resistant', desc: 'Non-combustible protection.' },
      { icon: '\uD83D\uDC1C', title: 'Pest & Termite Proof', desc: 'Impervious to infestation.' },
      { icon: '\uD83D\uDCA7', title: 'Water Resistant', desc: 'For wet and exterior areas.' },
      { icon: '\uD83C\uDF3F', title: 'Asbestos-Free', desc: 'Safe and eco-friendly.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'Board Types',
        items: [
          { img: '/assets/fiber-cement/fiber-cement-01.jpeg', title: 'Vented Ceiling Board', desc: 'Perforated fiber cement ceiling board for ventilation and clean lines.' },
          { img: '/assets/fiber-cement/fiber-cement-02.jpeg', title: 'Painted V-Groove Board', desc: 'Decorative V-groove board for elegant soffits and ceilings.' },
          { img: '/assets/fiber-cement/fiber-cement-08.jpeg', title: 'Walling Board', desc: 'Durable walling board for interior and exterior partitions.' },
          { img: '/assets/fiber-cement/fiber-cement-09.jpeg', title: 'Cladding Plank', desc: 'Wood-look cladding plank that transforms any facade.' },
        ],
      },
      {
        type: 'benefits',
        heading: 'Benefits',
        columns: 2,
        items: [
          'Used both indoors & outdoors',
          'Water resistant',
          'Fire resistant',
          'Heat and sound insulation',
          'Shatter resistant',
          'Environment friendly',
          'Weather resistant',
          'Asbestos free',
          'Pest resistant',
          'Shrink proof',
        ],
      },
      {
        type: 'gallery',
        heading: 'Applications',
        images: [
          '/assets/fiber-cement/fiber-cement-03.jpeg',
          '/assets/fiber-cement/fiber-cement-04.jpeg',
          '/assets/fiber-cement/fiber-cement-06.jpeg',
          '/assets/fiber-cement/fiber-cement-07.jpeg',
        ],
      },
    ],
  },

  'upvc-gutters': {
    slug: 'upvc-gutters',
    title: 'UPVC Gutters',
    tag: 'Rainwater Management',
    tagline: 'Durable, lightweight UPVC gutter systems for efficient, worry-free rainwater management.',
    metaDescription: 'Durable UPVC gutter systems in Kenya for efficient rainwater management \u2014 lightweight, rust-free and long lasting. Request a free quote today.',
    heroImage: '/assets/upvc-gutters/gutters-01.jpeg',
    intro: 'Our UPVC gutters offer a durable, lightweight and cost-effective solution for effective rainwater management, featuring resistance to rust and corrosion, low maintenance requirements, and versatile designs that complement any building. Engineered for optimal performance, they ensure efficient drainage while preventing leaks and water damage. Their eco-friendly materials contribute to sustainable building practices \u2014 a smart choice for environmentally conscious projects.',
    highlights: [
      { icon: '\uD83D\uDEE1\uFE0F', title: 'Rust-Proof', desc: 'Resistant to rust and corrosion.' },
      { icon: '\uD83E\uDEB6', title: 'Lightweight', desc: 'Easy to handle and install.' },
      { icon: '\uD83D\uDD27', title: 'Low Maintenance', desc: 'Fit and forget for years.' },
      { icon: '\uD83C\uDF3F', title: 'Eco-Friendly', desc: 'Sustainable materials.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'Complete Gutter System',
        intro: 'Everything you need for a clean, reliable rainwater run \u2014 all in matching UPVC.',
        items: [
          { icon: '\uD83D\uDCCF', title: 'Gutter & Joint Bracket', desc: 'The main channel with secure jointing brackets.' },
          { icon: '\uD83D\uDD3D', title: 'Running Outlet', desc: 'Directs collected water into the downpipe.' },
          { icon: '\uD83D\uDCE5', title: 'Downpipe & Clips', desc: 'Carries water down, held firm with clips.' },
          { icon: '\uD83D\uDD00', title: 'Branch & Connector', desc: 'Joins and redirects runs around the building.' },
          { icon: '\uD83D\uDC5F', title: 'Downpipe Shoe', desc: 'Discharges water cleanly at ground level.' },
          { icon: '\uD83E\uDDF0', title: 'Full Fittings Range', desc: 'All components available in matching finish.' },
        ],
      },
      {
        type: 'benefits',
        heading: 'Why UPVC',
        columns: 2,
        items: [
          'Rust and corrosion resistant',
          'Low maintenance requirements',
          'Efficient drainage performance',
          'Prevents leaks and water damage',
          'Versatile designs for any building',
          'Eco-friendly, sustainable materials',
        ],
      },
      {
        type: 'gallery',
        heading: 'Installed',
        images: [
          '/assets/upvc-gutters/gutters-01.jpeg',
          '/assets/upvc-gutters/gutters-02.jpeg',
          '/assets/upvc-gutters/gutters-03.jpeg',
        ],
      },
    ],
  },

  'rust-converter': {
    slug: 'rust-converter',
    title: 'Rust Converter',
    tag: 'Metal Protection',
    tagline: 'Neutrarust 661 \u2014 advanced rust converter and preventer that protects and extends the life of all metal.',
    metaDescription: 'Neutrarust 661 rust converter in Kenya \u2014 neutralises rust and protects metal for longer life. Order or request a quote from Pavilion Master Builders.',
    heroImage: '/assets/rust-converter/neutrarust-01.jpeg',
    intro: 'Neutrarust 661 is our advanced rust-prevention system, designed to protect and extend the life of all metal surfaces. Its innovative formula creates a powerful barrier against moisture, corrosion and environmental damage, keeping assets in pristine condition. Easy to apply and suitable for a wide variety of applications, Neutrarust 661 is the ideal choice for both industrial and residential needs \u2014 safeguarding investments and prolonging their integrity for years to come.',
    highlights: [
      { icon: '\uD83D\uDEE1\uFE0F', title: 'Stops & Converts Rust', desc: 'Neutralises existing corrosion.' },
      { icon: '\uD83C\uDFAF', title: 'Easy to Apply', desc: 'Straightforward on most metals.' },
      { icon: '\uD83C\uDF0A', title: 'Marine-Grade', desc: 'Suited to harsh, wet environments.' },
      { icon: '\uD83C\uDFED', title: 'Industrial & Residential', desc: 'One solution, many uses.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'Where to Use It',
        intro: 'A powerful barrier for almost any metal surface exposed to the elements.',
        items: [
          { icon: '\uD83D\uDEA2', title: 'Ships & Marine', desc: 'Hulls, decks and marine equipment.' },
          { icon: '\u26FD', title: 'Oil & Gas', desc: 'Installations and pipework.' },
          { icon: '\uD83C\uDF09', title: 'Bridges', desc: 'Structural steel and railings.' },
          { icon: '\uD83D\uDE97', title: 'Vehicles', desc: 'Chassis, bodywork and trailers.' },
          { icon: '\uD83E\uDE91', title: 'Outdoor Furniture', desc: 'Gates, railings and fittings.' },
          { icon: '\uD83C\uDFE0', title: 'Roofs', desc: 'Metal roof sheets and ridges.' },
        ],
      },
      {
        type: 'gallery',
        heading: 'Before & After',
        images: [
          '/assets/rust-converter/neutrarust-01.jpeg',
          '/assets/rust-converter/neutrarust-05.jpeg',
          '/assets/rust-converter/neutrarust-06.jpeg',
          '/assets/rust-converter/neutrarust-03.jpeg',
        ],
      },
      {
        type: 'benefits',
        heading: 'Why Neutrarust 661',
        columns: 2,
        items: [
          'Creates a barrier against moisture & corrosion',
          'Converts and prevents rust',
          'Easy to apply on most surfaces',
          'Suitable for industrial and residential use',
          'Protects ships, vehicles, bridges and more',
          'Prolongs asset life for years to come',
        ],
      },
    ],
  },

  'alternative-building': {
    slug: 'alternative-building',
    title: 'Alternative Building',
    tag: 'Eco Build',
    tagline: 'Affordable, sustainable eco-builds delivered in record time \u2014 homes, schools, hotels and hospitals.',
    metaDescription: 'Affordable, sustainable alternative building in Kenya \u2014 homes, schools, hotels and hospitals delivered fast. Request a free quote today.',
    heroImage: '/assets/alternative-building/alt-building-toa-blue-roof.jpeg',
    intro: 'At Pavilion Master Builders, we offer affordable and sustainable eco-friendly housing solutions that prioritise quality while ensuring a rapid construction turnaround. Our innovative approach combines advanced building technologies and sustainable materials to deliver durable structures that are both environmentally friendly and cost-effective. We understand the urgency of construction needs \u2014 our solutions quickly deliver essential buildings, all in record time, built to withstand the test of time and adverse weather.',
    highlights: [
      { icon: '\u26A1', title: 'Record Time', desc: 'Rapid construction turnaround.' },
      { icon: '\u267B\uFE0F', title: 'Eco-Friendly', desc: 'Sustainable materials throughout.' },
      { icon: '\uD83D\uDCA1', title: 'Energy Efficient', desc: 'Lower utility costs by design.' },
      { icon: '\uD83C\uDFDB\uFE0F', title: 'Built to Last', desc: 'Durable in adverse weather.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'What We Build',
        intro: 'A full range of essential buildings, delivered quickly without compromising quality.',
        items: [
          { icon: '\uD83C\uDFE1', title: 'Homes', desc: 'Comfortable, durable, energy-efficient housing.' },
          { icon: '\uD83C\uDFEB', title: 'Schools', desc: 'Safe, fast-to-build learning spaces.' },
          { icon: '\u26EA', title: 'Churches', desc: 'Community buildings of any scale.' },
          { icon: '\uD83C\uDFD5\uFE0F', title: 'Cabins', desc: 'Getaway and hospitality units.' },
          { icon: '\uD83C\uDFE8', title: 'Hotels', desc: 'Guest accommodation at speed.' },
          { icon: '\uD83C\uDFE5', title: 'Hospitals', desc: 'Essential healthcare facilities in record time.' },
        ],
      },
      {
        type: 'benefits',
        heading: 'The Pavilion Advantage',
        columns: 2,
        items: [
          'Rapid construction turnaround',
          'Reduced on-site labour and delays',
          'Durable, weather-resistant materials',
          'Energy-efficient designs',
          'Lower utility costs',
          'Environmentally friendly and cost-effective',
        ],
      },
      {
        type: 'gallery',
        heading: 'Recent Builds',
        images: [
          '/assets/alternative-building/alt-building-toa-coastal.jpeg',
          '/assets/alternative-building/alt-building-toa-frame.jpeg',
          '/assets/alternative-building/alt-building-a-frame.jpeg',
          '/assets/alternative-building/alt-building-02.jpeg',
          '/assets/alternative-building/alt-building-03.jpeg',
          '/assets/alternative-building/alt-building-04.jpeg',
          '/assets/alternative-building/alt-building-05.jpeg',
        ],
      },
    ],
  },

  'reroofing-cleaning': {
    slug: 'reroofing-cleaning',
    title: 'Re-roofing & Roof Cleaning',
    tag: 'Roofing Services',
    tagline: 'Professional re-roofing, roof cleaning and restoration \u2014 renew, protect and beautify your roof.',
    metaDescription: 'Professional re-roofing, roof cleaning and restoration in Kenya \u2014 renew, protect and beautify your roof. Book a free site visit today.',
    heroImage: '/assets/reroofing-cleaning/reroof-clean-01.jpeg',
    intro: 'Your roof is not just a protective barrier \u2014 it\u2019s a vital component of your home\u2019s structure and aesthetic appeal. Whether you\u2019re dealing with wear and tear, leaks, or simply looking to upgrade, our re-roofing services are designed to enhance the safety, efficiency and beauty of your property. And because a clean roof is vital for longevity, our professional roof-cleaning service removes debris, moss and algae using eco-friendly solutions \u2014 keeping your roof in excellent condition and preventing deterioration.',
    highlights: [
      { icon: '\uD83D\uDD04', title: 'Re-roofing', desc: 'Upgrades and full replacements.' },
      { icon: '\uD83E\uDDFC', title: 'Roof Cleaning', desc: 'Eco-friendly deep cleaning.' },
      { icon: '\uD83C\uDF3F', title: 'Eco-Friendly', desc: 'Safe, non-toxic solutions.' },
      { icon: '\uD83D\uDEE0\uFE0F', title: 'Leak Repair', desc: 'Fix wear before it spreads.' },
    ],
    sections: [
      {
        type: 'feature-grid',
        heading: 'Our Services',
        items: [
          { icon: '\uD83D\uDD04', title: 'Re-roofing & Upgrades', desc: 'Replace worn or dated roofs with modern, durable systems.' },
          { icon: '\uD83E\uDDFC', title: 'Roof Cleaning', desc: 'Remove debris, moss and algae that damage your roof over time.' },
          { icon: '\uD83D\uDCA7', title: 'Moss & Algae Removal', desc: 'Eco-friendly treatment that restores curb appeal.' },
          { icon: '\uD83D\uDEE0\uFE0F', title: 'Leak & Wear Repair', desc: 'Targeted repairs that protect your home\u2019s structure.' },
        ],
      },
      {
        type: 'gallery',
        heading: 'Before & After',
        images: [
          '/assets/reroofing-cleaning/reroof-clean-01.jpeg',
          '/assets/reroofing-cleaning/reroof-clean-02.jpeg',
          '/assets/reroofing-cleaning/reroof-clean-03.jpeg',
          '/assets/reroofing-cleaning/reroof-clean-04.jpeg',
        ],
      },
      {
        type: 'benefits',
        heading: 'Why Pavilion',
        columns: 2,
        items: [
          'Eco-friendly cleaning solutions',
          'Experienced, professional team',
          'Enhances curb appeal',
          'Prevents deterioration and costly repairs',
          'Improves safety and efficiency',
          'Extends the life of your roof',
        ],
      },
    ],
  },
};

// Order for "explore other solutions" and static path generation
export const productOrder = [
  'decra-roofing', 'light-gauge-steel', 'mixx-cement', 'fiber-cement',
  'upvc-gutters', 'rust-converter', 'alternative-building', 'reroofing-cleaning',
];
