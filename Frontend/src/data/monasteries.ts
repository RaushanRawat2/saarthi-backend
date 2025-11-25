export interface Monastery {
  id: string;
  name: string;
  location: string;
  established: string;
  description: string;
  wikipediaUrl: string;
  tourUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  significance: string;
  architecture: string;
  festivals: string[];
  travelInfo: {
    byCar: string;
    byBus: string;
    nearestAirport: string;
    distanceFromGangtok: string;
    bestTimeToVisit: string;
    entryFee: string;
    photography: string;
    visitingHours: string;
    altitude: string;
  };
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  facilities: string[];
  nearbyAttractions: string[];
}

export const monasteries: Monastery[] = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, East Sikkim",
    established: "1966",
    description: "The largest monastery in Sikkim and the main seat of the Karma Kagyu lineage. Known as the 'Dharmachakra Centre', it houses some of the most sacred Buddhist relics including the Black Crown of the Karmapa.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Rumtek_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260138974!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRFptcjdvSlE.!2m2!1d27.28848553899807!2d88.56190567068603!3f0!4f0!5f0.7820865974627469",
    coordinates: { lat: 27.3041, lng: 88.5641 },
    images: ["/monastery-images/rumtek.jpg"],
    significance: "Main seat of the 16th Karmapa",
    architecture: "Traditional Tibetan architecture with golden roofs",
    festivals: ["Losar", "Saga Dawa", "Drukpa Kunley"],
    travelInfo: {
      byCar: "24 km from Gangtok (45 minutes)",
      byBus: "Regular shared taxis from Gangtok",
      nearestAirport: "Bagdogra Airport (124 km)",
      distanceFromGangtok: "24 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,550 meters"
    },
    contactInfo: {
      phone: "+91-3592-202-052"
    },
    facilities: ["Parking", "Restrooms", "Gift Shop", "Cafeteria"],
    nearbyAttractions: ["Gangtok", "Tsomgo Lake", "Nathula Pass"]
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim", 
    established: "1909",
    description: "A 200-year-old monastery belonging to the Nyingma order. Built on the site blessed by Lama Druptob Karpo, it offers panoramic views of Kanchenjunga and is known for its annual Chaam dance festival.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Enchey_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260509458!6m8!1m7!1sCAoSHENJQUJJaEFHYnlmUVF3WEFFMmVudUt3QUNhTTA.!2m2!1d27.33593677395685!2d88.61916587167339!3f120!4f0!5f0.7820865974627469",
    coordinates: { lat: 27.3389, lng: 88.6065 },
    images: ["/monastery-images/enchey.jpg"],
    significance: "Blessed by Lama Druptob Karpo",
    architecture: "Traditional Sikkimese style with colorful prayer flags",
    festivals: ["Chaam Dance", "Pang Lhabsol"],
    travelInfo: {
      byCar: "3 km from Gangtok city center (10 minutes)",
      byBus: "Local buses and shared taxis available",
      nearestAirport: "Bagdogra Airport (124 km)",
      distanceFromGangtok: "3 km",
      bestTimeToVisit: "Year-round, best views in winter",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,650 meters"
    },
    contactInfo: {
      phone: "+91-3592-202-317"
    },
    facilities: ["Parking", "Prayer Wheel", "Viewing Deck"],
    nearbyAttractions: ["Gangtok", "Namgyal Institute of Tibetology", "Do Drul Chorten"]
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "West Sikkim",
    established: "1641",
    description: "One of the most sacred monasteries in Sikkim, located on a hilltop between Rathong and Rangeet rivers. Known for its holy water source and the sacred Bumchu festival where water levels predict the year's fortune.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Tashiding_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260418519!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0V6djM1LUFF!2m2!1d27.307710898809!2d88.2976437708665!3f20!4f0!5f0.7820865974627469",
    coordinates: { lat: 27.1833, lng: 88.2667 },
    images: ["/monastery-images/tashiding.jpg"],
    significance: "Most sacred monastery in Sikkim",
    architecture: "Nyingmapa tradition with ancient stupas",
    festivals: ["Bumchu Festival", "Bhumchu"],
    travelInfo: {
      byCar: "40 km from Pelling (1.5 hours)",
      byBus: "Shared taxis from Pelling and Yuksom",
      nearestAirport: "Bagdogra Airport (140 km)",
      distanceFromGangtok: "120 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,400 meters"
    },
    contactInfo: {},
    facilities: ["Parking", "Holy Water Source", "Prayer Wheels"],
    nearbyAttractions: ["Pelling", "Yuksom", "Khecheopalri Lake"]
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    established: "1705",
    description: "A premier monastery of Sikkim belonging to the Nyingma order. Only monks of pure Tibetan lineage are admitted here. The monastery houses a seven-tiered wooden model of Zangdog Palri, the celestial abode of Guru Padmasambhava.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Pemayangtse_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260163654!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREVoSlhucEFF!2m2!1d27.30518919282202!2d88.25156580066201!3f168.86412609084311!4f22.95035250781183!5f0.7820865974627469",
    coordinates: { lat: 27.2167, lng: 88.2167 },
    images: ["/monastery-images/pemayangtse.jpg"],
    significance: "Premier monastery of the Nyingma order",
    architecture: "Three-story structure with intricate wood carvings",
    festivals: ["Chaam Festival", "Losar"],
    travelInfo: {
      byCar: "2 km from Pelling town (5 minutes)",
      byBus: "Local transport from Pelling",
      nearestAirport: "Bagdogra Airport (135 km)",
      distanceFromGangtok: "110 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "₹25 per person",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "2,085 meters"
    },
    contactInfo: {
      phone: "+91-3595-258-132"
    },
    facilities: ["Parking", "Museum", "Gift Shop"],
    nearbyAttractions: ["Pelling", "Sangachoeling Monastery", "Khecheopalri Lake"]
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    established: "1701",
    description: "The oldest monastery in Sikkim, also known as the Hermit's Cell. Built by Lhatsun Chempo, one of the three lamas who consecrated the first Chogyal. Requires a 30-minute uphill trek through dense forest.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Dubdi_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260188903!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0V6djI5NUFF!2m2!1d27.36632594282752!2d88.22961482878193!3f80.47419967126908!4f8.618492608353876!5f0.7820865974627469",
    coordinates: { lat: 27.2089, lng: 88.2142 },
    images: ["/monastery-images/dubdi.jpg"],
    significance: "Oldest monastery in Sikkim",
    architecture: "Simple hermitage-style structure",
    festivals: ["Losar", "Traditional prayer ceremonies"],
    travelInfo: {
      byCar: "2 km from Yuksom (then 30-min trek)",
      byBus: "Shared taxis to Yuksom from Pelling",
      nearestAirport: "Bagdogra Airport (130 km)",
      distanceFromGangtok: "120 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 5:00 PM",
      altitude: "2,100 meters"
    },
    contactInfo: {},
    facilities: ["Trekking Trail", "Prayer Wheels"],
    nearbyAttractions: ["Yuksom", "Norbugang Coronation Throne", "Khecheopalri Lake"]
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    location: "North Sikkim",
    established: "1740",
    description: "A significant monastery in North Sikkim belonging to the Karma Kagyu sect. Known for its beautiful murals and traditional architecture, it serves as an important religious center for the local community.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Phodong_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260843967!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREUtSTJBbXdF!2m2!1d27.41250043052966!2d88.58361050014649!3f6.386978322071343!4f8.467270462469543!5f0.7820865974627469",
    coordinates: { lat: 27.4500, lng: 88.5500 },
    images: ["/monastery-images/phodong.jpg"],
    significance: "Important Karma Kagyu center in North Sikkim",
    architecture: "Traditional Tibetan style with colorful murals",
    festivals: ["Losar", "Saga Dawa"],
    travelInfo: {
      byCar: "35 km from Gangtok (1.5 hours)",
      byBus: "Shared taxis from Gangtok",
      nearestAirport: "Bagdogra Airport (150 km)",
      distanceFromGangtok: "35 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,800 meters"
    },
    contactInfo: {},
    facilities: ["Parking", "Prayer Wheels"],
    nearbyAttractions: ["Lachung", "Lachen", "Yumthang Valley"]
  },
  {
    id: "kartok",
    name: "Kartok Monastery",
    location: "Pelling, West Sikkim",
    established: "1700",
    description: "A beautiful monastery near Pelling known for its stunning architecture and peaceful surroundings. It offers breathtaking views of the Kanchenjunga range and is a perfect place for meditation and spiritual reflection.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Kartok_Monastery",
    coordinates: { lat: 27.2200, lng: 88.2200 },
    images: ["/monastery-images/kartok.jpg"],
    significance: "Beautiful monastery with Kanchenjunga views",
    architecture: "Traditional Sikkimese architecture with prayer flags",
    festivals: ["Losar", "Saga Dawa", "Chaam Dance"],
    travelInfo: {
      byCar: "3 km from Pelling (10 minutes)",
      byBus: "Local transport from Pelling",
      nearestAirport: "Bagdogra Airport (135 km)",
      distanceFromGangtok: "110 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "2,100 meters"
    },
    contactInfo: {},
    facilities: ["Parking", "Viewing Deck", "Prayer Wheels"],
    nearbyAttractions: ["Pelling", "Pemayangtse Monastery", "Sangachoeling Monastery"]
  },
  {
    id: "lingdum",
    name: "Lingdum (Ranka) Monastery",
    location: "Ranka, East Sikkim",
    established: "1990",
    description: "A modern monastery built in traditional Tibetan style, also known as Ranka Monastery. It serves as an important educational and spiritual center, housing a large community of monks and offering various Buddhist teachings.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Lingdum_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757261109049!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0UtS0hEZGc.!2m2!1d27.33085143080232!2d88.57926047040057!3f34.99898283097841!4f29.125006372890127!5f0.7820865974627469",
    coordinates: { lat: 27.3500, lng: 88.6500 },
    images: ["/monastery-images/lingdum.jpg"],
    significance: "Modern educational and spiritual center",
    architecture: "Traditional Tibetan architecture with modern facilities",
    festivals: ["Losar", "Saga Dawa", "Monlam Chenmo"],
    travelInfo: {
      byCar: "15 km from Gangtok (30 minutes)",
      byBus: "Shared taxis from Gangtok",
      nearestAirport: "Bagdogra Airport (130 km)",
      distanceFromGangtok: "15 km",
      bestTimeToVisit: "Year-round",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,700 meters"
    },
    contactInfo: {
      phone: "+91-3592-202-500"
    },
    facilities: ["Parking", "Library", "Guest House", "Cafeteria"],
    nearbyAttractions: ["Gangtok", "Rumtek Monastery", "Tsomgo Lake"]
  },
  {
    id: "ralang",
    name: "Ralang Monastery",
    location: "Ravangla, South Sikkim",
    established: "1995",
    description: "A magnificent monastery in South Sikkim known for its serene environment and beautiful architecture. It's an ideal place for meditation and offers stunning views of the surrounding mountains and valleys.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Ralang_Monastery",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260750011!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzR1cGlsdVFF!2m2!1d27.32849642917133!2d88.33524783237412!3f273.8700505775563!4f20.207837566366365!5f0.7820865974627469",
    coordinates: { lat: 27.3167, lng: 88.3500 },
    images: ["/monastery-images/ralang.jpg"],
    significance: "Serene meditation center in South Sikkim",
    architecture: "Traditional Tibetan architecture with modern amenities",
    festivals: ["Losar", "Saga Dawa", "Tsechu"],
    travelInfo: {
      byCar: "65 km from Gangtok (2 hours)",
      byBus: "Shared taxis from Gangtok and Namchi",
      nearestAirport: "Bagdogra Airport (100 km)",
      distanceFromGangtok: "65 km",
      bestTimeToVisit: "March to May, September to November",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,400 meters"
    },
    contactInfo: {},
    facilities: ["Parking", "Meditation Hall", "Guest House"],
    nearbyAttractions: ["Ravangla", "Namchi", "Temi Tea Garden"]
  },
  {
    id: "do-drul-chorten",
    name: "Do-Drul Chorten Stupa",
    location: "Gangtok, East Sikkim",
    established: "1945",
    description: "A sacred stupa built by Trulshi Rimpoche, the head of the Nyingma order of Tibetan Buddhism. It contains 108 prayer wheels and houses many religious objects and ancient texts. The stupa is considered one of the most important religious monuments in Sikkim.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Do-Drul_Chorten",
    tourUrl: "https://www.google.com/maps/embed?pb=!4v1757260598274!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V2LXJFYWc.!2m2!1d27.31568276523647!2d88.60481141338492!3f162.4442602982708!4f29.158720082570426!5f0.7820865974627469",
    coordinates: { lat: 27.3300, lng: 88.6100 },
    images: ["/monastery-images/do-drul.jpg"],
    significance: "Most important religious monument in Sikkim",
    architecture: "Traditional Tibetan stupa with 108 prayer wheels",
    festivals: ["Losar", "Saga Dawa", "Drukpa Kunley"],
    travelInfo: {
      byCar: "2 km from Gangtok city center (5 minutes)",
      byBus: "Local buses and shared taxis available",
      nearestAirport: "Bagdogra Airport (124 km)",
      distanceFromGangtok: "2 km",
      bestTimeToVisit: "Year-round",
      entryFee: "Free",
      photography: "Allowed (exterior only)",
      visitingHours: "6:00 AM - 6:00 PM",
      altitude: "1,600 meters"
    },
    contactInfo: {
      phone: "+91-3592-202-317"
    },
    facilities: ["Parking", "Prayer Wheels", "Circumambulation Path"],
    nearbyAttractions: ["Gangtok", "Enchey Monastery", "Namgyal Institute of Tibetology"]
  }
];

export const getMonasteryById = (id: string): Monastery | undefined => {
  return monasteries.find(monastery => monastery.id === id);
};

export const getMonasteriesByLocation = (location: string): Monastery[] => {
  return monasteries.filter(monastery => 
    monastery.location.toLowerCase().includes(location.toLowerCase())
  );
};