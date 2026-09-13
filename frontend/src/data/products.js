// Motorsport and Racing Components Catalog
// Categories: IC Powertrain, Chassis, Steering & Suspension, Braking System, Wheels & Controls

export const categories = [
  'All Parts',
  'IC Powertrain',
  'Chassis & Suspension',
  'Braking System',
  'Wheels & Controls'
];

export const products = [
  // ==========================================
  // 1) IC Powertrain Components
  // ==========================================
  {
    id: 'engine-honda',
    name: 'Engine – Honda GX390 Race Spec',
    category: 'IC Powertrain',
    price: 849,
    originalPrice: 949,
    badge: 'Race Ready',
    sku: 'PS-ENG-GX390',
    inStock: true,
    stockCount: 6,
    shortDesc: 'Factory blueprinted 389cc single-cylinder OHV race engine with tuned carburetion.',
    fullDesc: 'The Honda GX390 is the benchmark powerplant for competitive all-terrain BAJA, karting, and collegiate motorsport. Delivers relentless low-end torque, cast iron cylinder sleeve durability, and dual-bearing forged crankshaft balance calibrated for long endurance runs.',
    specs: {
      Displacement: '389 cc (Single Cylinder, 4-Stroke, OHV)',
      Power: '13.0 HP (9.7 kW) @ 3,600 RPM',
      Torque: '26.4 Nm @ 2,500 RPM',
      Cooling: 'Forced Air with Heavy-Duty Recoil Shroud',
      Ignition: 'Digital CDI with Variable Advance',
      BoreStroke: '88 x 64 mm',
      Weight: '31.7 kg (Dry Weight)'
    },
    features: [
      'Precision balanced forged crankshaft for minimal high-RPM vibration',
      'Dual oil drain ports for fast paddock pitstop oil changes',
      'SAE BAJA competition rulebook legal displacement & air restriction certified',
      'Cast iron cylinder liner for extended endurance lifespan'
    ],
    compatible: 'Baja SAE, Formula Kart, Off-Road Trophy Buggies',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'cvt-and-belt',
    name: 'CVT & High-Torque Kevlar Belt',
    category: 'IC Powertrain',
    price: 489,
    originalPrice: 539,
    badge: 'Best Seller',
    sku: 'PS-CVT-K750',
    inStock: true,
    stockCount: 12,
    options: {
      label: 'Belt Compound',
      values: ['Kevlar Reinforced', 'Carbon Tensile Cord', 'Standard Aramid']
    },
    shortDesc: 'Continuously Variable Transmission primary/secondary clutch package with aramid race belt.',
    fullDesc: 'Engineered for seamless ratio shifts under extreme torque loads. Features CNC machined billet aluminum sheaves, customizable flyweight tuning ramps, and a reinforced kevlar cogged belt rated to withstand over 14,000 RPM surface speeds without slip.',
    specs: {
      EngagementRPM: '2,200 - 3,400 RPM (Adjustable Springs)',
      SheaveMaterial: '6061-T6 Billet Hard-Anodized Aluminum',
      RatioRange: '3.8:1 (Low) to 0.85:1 (Overdrive)',
      BeltMaterial: 'Kevlar Cord Reinforced Chloroprene Rubber',
      ShaftFitment: '1-inch Bore with 1/4-inch Keyway',
      Weight: '7.2 kg complete system'
    },
    features: [
      'Smooth automatic ratio transition from hill climb to high-speed straightaways',
      'Dual cooling fin profile on secondary sheave to prevent thermal glaze',
      'Fast-swap spring and flyweight system for quick trackside paddock tuning',
      'Includes high-tensile Kevlar reinforced cogged drive belt'
    ],
    compatible: 'Honda GX390, Briggs & Stratton 10HP, 1-inch shaft racing setups',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'fuel-tank',
    name: 'Fuel Tank – FIA Spec Aluminum Cell',
    category: 'IC Powertrain',
    price: 185,
    originalPrice: 210,
    badge: 'FIA Compliant',
    sku: 'PS-FT-AL10L',
    inStock: true,
    stockCount: 9,
    shortDesc: 'TIG-welded 5052 aluminum racing tank with anti-slosh baffles and rollover safety valve.',
    fullDesc: 'Designed to comply with international collegiate and off-road safety standards. Features internal reticulated foam baffles to eliminate fuel slosh during violent cornering, aircraft-style screw cap, and an integrated gravity rollover check valve.',
    specs: {
      Capacity: '10 Litres (2.64 Gallons)',
      Material: '5052-H32 Marine-Grade Aluminum (2.5mm wall)',
      Baffle: 'Mil-Spec Anti-Slosh Reticulated Polyurethane Foam',
      Fitting: '-6 AN Flare Outlet & Vent Return',
      SafetyValve: 'Spring-Loaded Ball Check Rollover Vent',
      Weight: '2.1 kg (Empty)'
    },
    features: [
      'Full internal foam baffling eliminates fuel surge and air pockets',
      'Precision laser-cut mounting tabs with vibration dampening grommets',
      'SAE BAJA rulebook compliant 1/4-turn locking filler neck',
      'Pressure tested to 25 PSI prior to dispatch'
    ],
    compatible: 'Baja SAE chassis, Kart endurance setups, Formula Student fuel systems',
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'gearbox-front-gear',
    name: 'Gearbox / Front Gear Reduction Box',
    category: 'IC Powertrain',
    price: 520,
    originalPrice: 580,
    badge: 'Precision CNC',
    sku: 'PS-GB-FRT10',
    inStock: true,
    stockCount: 5,
    options: {
      label: 'Gear Ratio',
      values: ['8.5:1 High Torque', '10.2:1 Standard Baja', '12.0:1 Extreme Climb']
    },
    shortDesc: 'Hardened spur-gear reduction box with forward and reverse dog-clutch shift mechanism.',
    fullDesc: 'High-strength aluminum gearbox casing housing EN353 case-hardened spur and helical gear pairs. Engineered to step down CVT output to axle drive shafts while offering crisp manual forward/neutral/reverse mechanical engagement.',
    specs: {
      Casing: 'A356 Cast Aluminum with CNC Precision Bore Machining',
      GearMaterial: 'EN353 Alloy Steel (Case Hardened 58-62 HRC)',
      ReductionRatio: '10.2:1 (Customizable options)',
      Lubrication: 'Splash Lube with Magnetic Drain Plug',
      MaxTorque: '340 Nm Continuous Axle Torque',
      Weight: '9.8 kg'
    },
    features: [
      'Case-hardened teeth ground to DIN Class 6 tolerance for quiet operation',
      'Double-lip Viton seals provide zero oil leakage in muddy terrain',
      'Positive mechanical detent lockout prevents accidental reverse engagement',
      'Direct bolt pattern for tubular chassis motor plates'
    ],
    compatible: 'All Baja SAE 2WD/4WD drivetrains, Custom off-road buggies',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'accelerator-cable',
    name: 'Accelerator Cable / Acc Cable Pro',
    category: 'IC Powertrain',
    price: 34,
    originalPrice: 42,
    badge: 'Track Tested',
    sku: 'PS-CBL-ACC78',
    inStock: true,
    stockCount: 28,
    shortDesc: 'Low-friction Teflon-lined stainless steel braided throttle pull cable (78-inch length).',
    fullDesc: 'Engineered for instant throttle response and zero slop. Features a 1.5mm stainless steel multi-strand core gliding inside a smooth PTFE liner with outer stainless mesh armor that resists heat, grit, and chassis flex.',
    specs: {
      Length: '78 inches (198 cm) with field trim adapter',
      InnerCore: '19-strand 316 Stainless Steel (1.5mm)',
      Liner: 'Virgin PTFE (Teflon) low friction sleeve',
      OuterArmor: 'Braided Stainless Steel with UV-resistant Clear Coating',
      EndFittings: 'Barrel Nipple + M6 Threaded Adjuster with Lock Nuts'
    },
    features: [
      'Zero stick-slip operation even with tight radius routing bends',
      'High-temp armor withstands proximity to exhaust headers up to 350°C',
      'Universal end-lug fits both Honda butterfly throttle and pedal linkages',
      'Dual locking knurled barrel adjusters for easy paddock slack tuning'
    ],
    compatible: 'Honda GX series, Mikuni carbs, standard racing pedals',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'differential',
    name: 'Differential – Lightweight Torsen Racing LSD',
    category: 'IC Powertrain',
    price: 640,
    originalPrice: 710,
    badge: 'Paddock Spec',
    sku: 'PS-DIF-TOR30',
    inStock: true,
    stockCount: 4,
    shortDesc: 'Limited slip helical differential for balanced cornering traction without wheel hop.',
    fullDesc: 'The Pitstop Torsen-style limited slip differential automatically biases drive torque to the wheel with highest traction. Eliminates the understeer of locked spools while maintaining aggressive drive through tight hairpins and off-camber dirt ruts.',
    specs: {
      Type: 'Helical Gear Torque-Biasing Limited Slip (T-1)',
      BiasRatio: '3.0:1 (Dynamic Torque Transfer)',
      SplineCount: '24-Tooth Involute Axle Spline',
      Casing: '7075-T6 CNC Machined Hard-Anodized Aluminum',
      InternalGears: '8620 Nickel-Chromium Case-Hardened Steel',
      Weight: '4.85 kg'
    },
    features: [
      'Seamless torque transfer without friction clutches that wear out',
      'Significantly tighter turning radius compared to solid spool axles',
      'Pre-drilled mounting flange for lightweight sprocket or brake disc',
      'Sealed cartridge high-capacity angular contact bearings included'
    ],
    compatible: 'Baja SAE rear and 4WD front drive units, Formula Student drive axle',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'kill-switch',
    name: 'Kill Switch – Master Emergency Cutoff',
    category: 'IC Powertrain',
    price: 38,
    originalPrice: 48,
    badge: 'Rulebook Mandated',
    sku: 'PS-IGN-KILL01',
    inStock: true,
    stockCount: 35,
    shortDesc: 'High-visibility mushroom push-pull master kill switch with quick-release safety lanyard.',
    fullDesc: 'Direct rulebook compliant ignition and battery master cutoff. Featuring a bold red tactile mushroom button that locks instantly on impact or depression, and an elastic coiled tether lanyard for driver-ejection emergency cutoff.',
    specs: {
      Rating: '12V / 50A Continuous, 250A Surge',
      SwitchType: 'SPST Normally Closed / Ground-to-Kill Dual Circuit',
      Waterproofing: 'IP67 Sealed Housing with Rubber O-ring Gasket',
      MountingHole: '22mm (7/8-inch) Dash / Cockpit Tube Mount',
      Lanyard: 'UV-Stabilized Polyurethane Coiled Core with Wrist Strap'
    },
    features: [
      'Dual-contact allows cutting battery 12V while simultaneously grounding magneto',
      'Bright safety-red mushroom cap easy to trigger with heavy driving gloves',
      'Meets all SAE BAJA and SFI emergency master kill regulations',
      'Gold-plated brass contacts ensure corrosion resistance in wet track conditions'
    ],
    compatible: 'All combustion racing engines, karts, formula cars, off-road rigs',
    images: [
      'https://images.unsplash.com/photo-1558980664-10ea1a37d7b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },

  // ==========================================
  // 2) Chassis, Steering, & Suspension Components
  // ==========================================
  {
    id: 'aisi-tubing',
    name: 'AISI 4130 Chromoly Chassis Tubing',
    category: 'Chassis & Suspension',
    price: 110,
    originalPrice: 130,
    badge: 'SAE Certified',
    sku: 'PS-TUB-4130',
    inStock: true,
    stockCount: 18,
    options: {
      label: 'Outer Diameter (OD)',
      values: ['25.4 mm (1.00 in) x 1.65mm', '29.4 mm (1.16 in) x 2.10mm', '31.8 mm (1.25 in) x 2.40mm']
    },
    shortDesc: 'Seamless cold-drawn AISI 4130 aircraft-grade alloy steel roll cage and frame tubing.',
    fullDesc: 'Certified seamless cold-drawn AISI 4130 condition N chromoly tubing. Manufactured to stringent aerospace AMS-T-6736 specifications with guaranteed high yield strength and optimal weldability with ER70S-6 and ER80S-D2 TIG filler rod.',
    specs: {
      Material: 'AISI 4130 Normalized Seamless Alloy Steel',
      TensileStrength: '670 MPa (97,000 PSI) Minimum',
      YieldStrength: '435 MPa (63,000 PSI) Minimum',
      Elongation: '25.5% in 2 inches',
      AvailableOD: '25.0 mm, 29.4 mm, 31.8 mm (Selectable)',
      StandardLength: '20-foot (6.1m) stick or custom cut paddock bundle'
    },
    features: [
      'Strict wall thickness tolerance (+/- 0.05mm) verified with ultrasonic gauge',
      'Excellent ductility for mandrel benders without wrinkling or cross-section ovality',
      'Full mill test report (MTR) documentation provided for competition technical inspection',
      'Phosphate coated for oxidation resistance during storage and layout fabrication'
    ],
    compatible: 'Baja SAE Primary Roll Hoop, Roll Cage Bracing, Suspension A-Arms',
    images: [
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'rack-and-pinion',
    name: 'Rack & Pinion – Quick-Ratio Steering Unit',
    category: 'Chassis & Suspension',
    price: 245,
    originalPrice: 285,
    badge: 'Precision CNC',
    sku: 'PS-STR-RK12',
    inStock: true,
    stockCount: 8,
    shortDesc: 'Aircraft 6061 aluminum bodied steering rack with induction-hardened rack teeth.',
    fullDesc: 'Lightweight steering rack delivering high-fidelity feedback and razor-sharp front wheel turn-in. Built with precision ground helical pinion teeth, Delrin wear guides, and dual spherical rod end tie-rod linkages for minimal bump-steer geometry.',
    specs: {
      Ratio: '14:1 Quick Ratio (1.25 turns lock-to-lock)',
      TotalTravel: '115 mm (4.5 inches)',
      Housing: 'Extruded & CNC Machined 6061-T6 Aluminum',
      PinionSpline: '3/4-36 or 5/8-36 Spline Fitment',
      TieRodThreads: 'M10 x 1.25 Left & Right Hand Female',
      Weight: '1.65 kg'
    },
    features: [
      'Integrated Delrin tension damper prevents high-speed wheel kickback on rough rock trails',
      'Modular center-takeoff and end-takeoff mounting points for custom suspension designs',
      'Neoprene accordion dust boots keep out track debris, sand, and mud slurry',
      'Low backlash (< 0.05 mm) ensures instant apex positioning'
    ],
    compatible: 'Formula Student, Baja SAE, Cross-Kart, Mini Trophy Trucks',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'universal-joint-shaft',
    name: 'Universal Joint & Splined Steering Shaft',
    category: 'Chassis & Suspension',
    price: 88,
    originalPrice: 105,
    badge: 'Heavy Duty',
    sku: 'PS-STR-UJ04',
    inStock: true,
    stockCount: 22,
    shortDesc: 'Needle-bearing high-angle chromoly universal steering joint with collapsible shaft.',
    fullDesc: 'Heavy-duty chromoly U-joint designed for steering column angular transitions up to 35 degrees. Contains precision-sealed needle bearings that eliminate steering slop and resist high cyclical torsion forces over endurance courses.',
    specs: {
      MaxAngle: '35 Degrees Continuous Working Angle',
      JointMaterial: '4140 Chromoly Steel Forged Yoke',
      Bearings: 'Sealed High-Load Needle Roller Bearings',
      Splines: '3/4-36 Spline on one end, 3/4-DD on opposite end',
      ShaftLength: '18 inches (Collapsible safety sleeve included)'
    },
    features: [
      'Collapsible safety steering shaft sleeve absorbs frontal impacts to protect driver',
      'Zero rotational play needle bearing trunnions for instant road feel',
      'Black oxide anti-corrosion finish resists mud and wash-down chemicals',
      'Includes stainless pinch bolts and nylon locking hardware'
    ],
    compatible: 'All racing steering columns, racks, and quick-disconnect hubs',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'suspension-fox-afco',
    name: 'Suspension – Fox & AFCO Racing Coilovers',
    category: 'Chassis & Suspension',
    price: 795,
    originalPrice: 890,
    badge: 'Track Proven',
    sku: 'PS-SUS-FOX30',
    inStock: true,
    stockCount: 7,
    options: {
      label: 'Brand / Damper Series',
      values: ['Fox Float 3 EVOL RC2', 'AFCO Racing MT1 Mono-Tube', 'Rambal Custom Valved Coilover']
    },
    shortDesc: 'High-performance nitrogen charged coilover dampers with high/low speed compression tuning.',
    fullDesc: 'Championship-winning suspension dampers crafted for harsh off-road jumps and rutted tracks. Equipped with hard-anodized 6061-T6 aluminum bodies, chrome-plated micro-finished shafts, and dual-speed external compression & rebound damping clickers.',
    specs: {
      Travel: '8.5 to 11.2 inches depending on stroke length',
      BodyDiameter: '2.0-inch (50.8 mm) Seamless Aluminum Cylinder',
      Reservoir: 'Piggyback Nitrogen Gas Reservoir (200 PSI factory charge)',
      ShaftDiameter: '5/8-inch Hard-Chromed 4130 Micro-Finished',
      Valving: 'External 24-click Rebound, 20-click Dual Speed Compression'
    },
    features: [
      'Dual chamber air spring / high-rate Eibach coilover spring configurations',
      'Bottom-out cup technology prevents jarring mechanical stops on hard landings',
      'Spherical Teflon-lined spherical bearings in both mounting eyelets',
      'Dyno tested with matching individual damping calibration sheets'
    ],
    compatible: 'Baja SAE double A-arm front & trailing arm rear suspension setups',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'steering-knuckle',
    name: 'Steering Knuckle / Front Upright (Pair)',
    category: 'Chassis & Suspension',
    price: 310,
    originalPrice: 350,
    badge: 'Billet CNC',
    sku: 'PS-SUS-KNK02',
    inStock: true,
    stockCount: 10,
    shortDesc: '5-axis CNC machined 7075-T6 aluminum front knuckles with optimized KPI and kingpin trail.',
    fullDesc: 'Engineered using topology optimization to deliver maximum torsional stiffness under high braking loads while shedding critical unsprung mass. Accommodates standard taper ball joints or spherical bearings and integrates direct brake caliper mounts.',
    specs: {
      Material: '7075-T6 Aerospace Aluminum (Solid Billet)',
      Manufacturing: '5-Axis High-Speed CNC Mill with Anodized Coating',
      BrakeMount: 'Radial Mount for Pitstop Twin-Piston Caliper (84mm spacing)',
      SpindleCompatibility: 'Accepts 25mm and 28mm Stub Axle Hubs',
      Weight: '1.15 kg per side'
    },
    features: [
      'Built-in steering arm optimized for 100% Ackermann or parallel racing geometry',
      'Double shear ball-joint pickup points ensure zero failure during obstacle strikes',
      'Heat-treated hard anodized layer protects against gravel blast and corrosion',
      'Sold as a matched pair (Left and Right front uprights)'
    ],
    compatible: 'Baja SAE, Formula Student, Custom Kart Front Geometry',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },

  // ==========================================
  // 3) Braking System
  // ==========================================
  {
    id: 'tandem-master-cylinder',
    name: 'Tandem Master Cylinder (TMC) & Bias Bar',
    category: 'Braking System',
    price: 195,
    originalPrice: 230,
    badge: 'Safety First',
    sku: 'PS-BRK-TMC01',
    inStock: true,
    stockCount: 14,
    options: {
      label: 'Bore Size Combination',
      values: ['0.625 Front / 0.700 Rear', '0.700 Front / 0.750 Rear', '0.750 Front / 0.750 Rear']
    },
    shortDesc: 'Dual-circuit tandem hydraulic master cylinder with remote reservoir and front-to-rear bias bar.',
    fullDesc: 'Independent dual-circuit master cylinder assembly allowing legal front/rear hydraulic isolation. Includes a spherical balance bias bar and spherical rod end linkage to adjust brake balance on the fly from the cockpit.',
    specs: {
      BoreDiameters: '5/8" (15.8mm) and 3/4" (19.0mm) options',
      BodyMaterial: 'Cast Aluminum Body with Micro-Honed Cylinder Bore',
      Reservoir: 'Dual Remote Polyethylene Reservoir Cups (200ml each)',
      PortThread: '3/8-24 UNF Inverted Flare / -3 AN Adaptable',
      BiasBar: 'Spherical Bearing Pivot Bar with 5/16-24 Threaded Pushrods'
    },
    features: [
      'Complies with SAE rule requiring dual completely independent hydraulic brake circuits',
      'Low friction EPDM primary and secondary cup seals rated for DOT 4 and DOT 5.1 fluids',
      'Hard chrome finished pushrods prevent seal galling',
      'Includes remote mounting brackets and braided fluid feed hoses'
    ],
    compatible: 'Baja SAE, Formula Student, Go-Kart, Lightweight Race Buggies',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'brake-disc',
    name: 'Brake Disc – Laser Ventilated Floating Rotor',
    category: 'Braking System',
    price: 78,
    originalPrice: 95,
    badge: 'Track Tested',
    sku: 'PS-BRK-DSC180',
    inStock: true,
    stockCount: 25,
    options: {
      label: 'Rotor Diameter',
      values: ['160 mm Ultra-Lightweight', '180 mm Standard Paddock', '200 mm High Endurance']
    },
    shortDesc: '420 stainless steel cross-drilled and wavy-edge floating brake rotor for heat dissipation.',
    fullDesc: 'Laser-cut from premium 420 high-carbon martensitic stainless steel and double-disc ground to ensure flat pad contact. Features radial cooling slots and lightweight drilled wave profiles that sweep away water, mud, and pad glaze.',
    specs: {
      RotorDiameter: '180 mm (7.08 in)',
      Thickness: '3.5 mm (Minimum discard 2.8 mm)',
      RotorMaterial: 'SUS 420 High Carbon Stainless Steel (Heat Treated)',
      CarrierMaterial: '6061-T6 Aluminum Hard-Anodized Center Hat',
      MountingPattern: '6-Bolt 44mm PCD or 4-Bolt 68mm PCD',
      Weight: '480 grams'
    },
    features: [
      'Floating bobbin design permits thermal expansion without disc warping or coning',
      'Wavy outer circumference accelerates heat shedding and cleans pad face',
      'Resists fade even during emergency lockup deceleration tests from 60 km/h',
      'Electrostatic black inner coating inhibits track-mud corrosion'
    ],
    compatible: 'Pitstop Brake Caliper, Baja wheel hubs, Kart axle adapters',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'brake-caliper',
    name: 'Brake Caliper – Twin-Piston Hydraulic Unit',
    category: 'Braking System',
    price: 115,
    originalPrice: 135,
    badge: 'Best Seller',
    sku: 'PS-BRK-CAL02',
    inStock: true,
    stockCount: 16,
    shortDesc: 'Forged aluminum opposed twin-piston hydraulic caliper with sintered metallic pads.',
    fullDesc: 'Delivers high hydraulic clamping force with minimal caliper bridge deflection. Houses dual hard-anodized aluminum pistons with internal dust wipers to prevent mud and grit ingress on off-road racing courses.',
    specs: {
      PistonConfig: '2 x 32mm Opposed Stainless/Aluminum Pistons',
      BodyMaterial: 'Forged 6061 Billet Aluminum Monobloc Architecture',
      FluidCompatibility: 'DOT 3, DOT 4, DOT 5.1 Racing Brake Fluid',
      BleedPort: 'M10 x 1.0 Micro-Bleeder Screw with Protective Cap',
      PadCompound: 'Semi-Metallic Sintered Friction Compound Included',
      Weight: '620 grams'
    },
    features: [
      'Opposed piston design ensures balanced pad wear and instant release without drag',
      'Direct radial mount tabs allow simple shim adjustment for rotor centering',
      'Quick-change pad retention clip for 60-second paddock pad swaps',
      'Handles extreme rotor temperatures up to 600°C without brake fluid boiling'
    ],
    compatible: 'Pitstop 160-200mm brake discs, front steering knuckles, rear swingarms',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'brake-pedal',
    name: 'Brake Pedal – Ergonomic Billet 6061 Assembly',
    category: 'Braking System',
    price: 72,
    originalPrice: 85,
    badge: 'Ergonomic Spec',
    sku: 'PS-BRK-PED01',
    inStock: true,
    stockCount: 19,
    shortDesc: 'CNC machined 6061 billet aluminum brake pedal with knurled non-slip foot pad.',
    fullDesc: 'Engineered for optimal leverage ratio and zero flex under panicking braking situations. Features adjustable pedal pad height, dual sealed bronze pivot bushings, and an integrated return spring with adjustable positive mechanical stop.',
    specs: {
      LeverageRatio: '4.8:1 to 5.5:1 (Adjustable pivot pin positions)',
      Material: '6061-T6 Billet Aluminum (CNC Machined)',
      PivotBearing: 'Dual Press-Fit Oil-Impregnated Bronze Bushings',
      FootPad: 'High-Traction Knurled Texture with Grip Serrations',
      Mounting: 'Chassis Floor / Cockpit Tab Pivot Bolt (10mm grade 10.9)'
    },
    features: [
      'Aggressive diamond knurl pattern keeps driver boot planted even in wet mud',
      'Adjustable mechanical stop bolt prevents master cylinder internal over-stroke',
      'Ultra-rigid truss design eliminates compliance for firm pedal feel',
      'Pre-drilled clevis holes for direct attachment to TMC balance bar'
    ],
    compatible: 'All tubular chassis footboxes, Baja SAE, Formula Student',
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558980664-10ea1a37d7b8?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'hose-pipe',
    name: 'Hose Pipe – Stainless Steel Braided Brake Lines',
    category: 'Braking System',
    price: 49,
    originalPrice: 60,
    badge: 'High Pressure',
    sku: 'PS-BRK-HOS03',
    inStock: true,
    stockCount: 32,
    options: {
      label: 'Hose Kit Length',
      values: ['Front Kit (2 x 36")', 'Rear Kit (1 x 72")', 'Full Vehicle 3-Line Set']
    },
    shortDesc: 'PTFE inner core shielded with high-tensile 304 stainless steel outer braid and PVC jacket.',
    fullDesc: 'Eliminates squishy pedal feel caused by factory rubber hose volumetric expansion under high pressure. Delivers crisp, rock-solid hydraulic transmission directly from master cylinder to caliper pistons.',
    specs: {
      InnerCore: 'Virgin Extruded PTFE (Smooth Bore)',
      Braid: '304 High-Tensile Stainless Steel Wire Braid',
      BurstPressure: '12,000 PSI (Operating rating 3,500 PSI)',
      EndFittings: 'Straight M10 Banjo and 90-degree -3 AN Female Swivels',
      OuterJacket: 'Abrasion-Resistant Clear PVC Protective Sleeve'
    },
    features: [
      'Zero volumetric expansion delivers immediate hydraulic brake bite',
      'Tough stainless armor defends against track rocks, tire roost, and sharp suspension pinch',
      'Factory crimped and pressure tested to 4,000 PSI before shipping',
      'Includes copper crush washers and Grade 8.8 banjo bolts'
    ],
    compatible: 'TMC master cylinder, twin-piston calipers, standard M10 banjo systems',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },

  // ==========================================
  // 4) Wheels & Controls
  // ==========================================
  {
    id: 'wheel-hub',
    name: 'Wheel Hub – 4-Bolt Precision Billet Hub (Pair)',
    category: 'Wheels & Controls',
    price: 145,
    originalPrice: 170,
    badge: 'Billet CNC',
    sku: 'PS-WHL-HUB04',
    inStock: true,
    stockCount: 15,
    options: {
      label: 'Bolt Pattern (PCD)',
      values: ['4 x 110 mm ATV Standard', '4 x 100 mm Track Compact', '4 x 115 mm Heavy Duty']
    },
    shortDesc: '7075-T6 aluminum CNC machined wheel hubs with Grade 10.9 press-in studs.',
    fullDesc: 'Lightweight, ultra-strong wheel hubs engineered to survive severe rock impacts and hard flat landings. Precision machined bearing journals accept double-row angular contact sealed wheel bearings or keyed drive shafts.',
    specs: {
      Material: '7075-T6 Aircraft Aluminum Alloy',
      Studs: '4 x M10 x 1.25 Grade 10.9 Zinc Plated Press-In Wheel Studs',
      AxleFitment: '25mm or 30mm Spindle Bearings / 24-Tooth Involute Spline',
      Finish: 'Hard Anodized Paddock Grey with Laser Etched Logo',
      Weight: '780 grams per hub'
    },
    features: [
      'Scalloped lightweight pocketing reduces unsprung rotational mass by 22%',
      'Tapered press-in wheel studs with zinc coating resist corrosion and stripping',
      'Integrated rear bolt circle for direct mounting of brake rotor carrier',
      'Precision machined runout within 0.02mm eliminates high-speed steering vibration'
    ],
    compatible: 'Baja SAE front/rear axles, ATV rims, Track Kart hubs',
    images: [
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'tyres-and-rims',
    name: 'Tyres & Rims – All-Terrain Beadlock Wheel Set',
    category: 'Wheels & Controls',
    price: 360,
    originalPrice: 420,
    badge: 'All-Terrain',
    sku: 'PS-WHL-SET02',
    inStock: true,
    stockCount: 8,
    options: {
      label: 'Wheel Configuration',
      values: ['Front Pair 23x7-10', 'Rear Pair 23x8-10', 'Full 4-Wheel Paddock Set (+$340)']
    },
    shortDesc: '6-ply puncture-resistant knobby off-road tyres mounted on aluminum true beadlock rims.',
    fullDesc: 'Extreme grip off-road tyre package designed to pull hard through deep sand, mud, and jagged gravel. The spun aluminum beadlock clamp rings mechanically lock the tyre bead, allowing drivers to run ultra-low air pressures down to 4 PSI without de-beading.',
    specs: {
      TyreDimensions: '23 x 7-10 (Front) / 23 x 8-10 (Rear)',
      PlyRating: '6-Ply Heavy Duty Radial Compound with Sidewall Bite',
      RimMaterial: '6061 Spun Aluminum with Billet Beadlock Ring',
      PCD: '4 x 110 mm or 4 x 100 mm',
      RecommendedPressure: '4 to 8 PSI for maximum traction'
    },
    features: [
      'True mechanical beadlock ring prevents tyre detachment during hard side-loads',
      'Aggressive chevron tread pattern rapidly evacuates mud and loose sand',
      'Puncture-resistant carcass prevents DNF from sharp shale or track debris',
      'Pre-mounted and balanced ready to bolt onto paddock wheel hubs'
    ],
    compatible: 'Baja SAE competitions, Off-road buggies, Utility ATVs',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517846693594-ea5f7d83e371?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'accelerator-pedal',
    name: 'Accelerator Pedal / Acc Paddle Pro',
    category: 'Wheels & Controls',
    price: 65,
    originalPrice: 78,
    badge: 'Ergonomic Spec',
    sku: 'PS-CTR-THR01',
    inStock: true,
    stockCount: 20,
    shortDesc: 'Progressive return throttle pedal with adjustable throw stops and cable clevis.',
    fullDesc: 'Billet aluminum floor-mount throttle pedal delivering linear throttle control without driver leg fatigue. Includes dual high-rate stainless return springs to guarantee automatic throttle return in event of cable damage, satisfying all technical inspections.',
    specs: {
      Material: '6061-T6 Billet Aluminum with Hard Anodize',
      ThrowTravel: '45 mm to 70 mm (Adjustable with rear stop bolt)',
      Springs: 'Dual Independent Torsion Springs (Redundant Safety)',
      CableConnection: 'Multi-hole progressive leverage quadrant arm',
      Weight: '410 grams'
    },
    features: [
      'Rulebook mandatory dual redundant throttle return springs included',
      'Adjustable foot pad angle allows customized heel-toe ergonomics',
      'Smooth roller bearing pivot eliminates side play and sticking',
      'Lightweight skeletonized arm with chamfered edges'
    ],
    compatible: 'Pitstop Accelerator Cable, Honda GX carbs, standard footboxes',
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1558980664-10ea1a37d7b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'harness',
    name: 'Harness – 5-Point Camlock FIA & SFI Spec',
    category: 'Wheels & Controls',
    price: 165,
    originalPrice: 195,
    badge: 'FIA / SFI Certified',
    sku: 'PS-SAF-HAR05',
    inStock: true,
    stockCount: 17,
    options: {
      label: 'Harness Style',
      values: ['5-Point Sub-Strap Standard', '6-Point Dual Sub-Strap (+ $20)', '2-inch HANS Device Spec']
    },
    shortDesc: 'Quick-release rotary camlock 3-inch polyester webbing 5-point driver restraint harness.',
    fullDesc: 'Homologated driver restraint harness featuring a lightweight alloy rotary camlock mechanism that releases instantly with a 1/4-turn of the wrist. 3-inch premium polyester webbing absorbs impact shocks without stretching excessively or digging into driver shoulders.',
    specs: {
      Certification: 'FIA 8853-2016 and SFI 16.1 Certified',
      WebbingWidth: '3-inch Shoulder & Lap Belts, 2-inch Submarine Strap',
      BuckleMechanism: 'Aircraft Alloy Rotary Camlock with Positive Detent',
      MountingHardware: 'Forged Eyebolts and Snap-Hook Ends Included',
      Adjustment: 'Quick-Pull Down Shoulder & Lap Adjusters with Pull Tabs'
    },
    features: [
      'Single-lever rotary camlock ejects all tongue latches instantaneously in emergencies',
      'UV-resistant polyester webbing retains 98% tensile strength over outdoor seasons',
      'Wrap-around roll bar mounting capability on shoulder straps',
      'Meets all SAE BAJA, Formula Student, and SCCA club racing tech regulations'
    ],
    compatible: 'All racing seats, roll cage harness cross-bars, cockpit tubs',
    images: [
      'https://images.unsplash.com/photo-1558980664-10ea1a37d7b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=85'
    ]
  }
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(currentId, category, limit = 4) {
  const sameCategory = products.filter(
    (p) => p.category === category && p.id !== currentId
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = products.filter(
    (p) => p.category !== category && p.id !== currentId
  );
  return [...sameCategory, ...others].slice(0, limit);
}
