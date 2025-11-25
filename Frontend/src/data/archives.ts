// Import images
import rumtekMain from "@/assets/rumtak/Rumtek_Monastery_07.jpg";
import rumtekPrayerWheels from "@/assets/rumtak/PrayerWheelsRumtek.jpeg";
import rumtekDharma from "@/assets/rumtak/Dharma_Chakra_Centre.jpg";

import pemayangtseMain from "@/assets/Pemayangtse Monastery/Front_view_of_Pemayangtse_monastery.jpg";
import pemayangtseEntrance from "@/assets/Pemayangtse Monastery/Entrance_to_Pemangytse_Gompa.jpg";
import pemayangtseChains from "@/assets/Pemayangtse Monastery/Chains_buried_into_solid_concrete_below.jpg";
import pemayangtseRoof from "@/assets/Pemayangtse Monastery/Roof_chained_for_protection.jpeg";

import tashidingMain from "@/assets/Tashiding Monastery/The_golden_chorten_-_tashiding.jpg";
import tashidingChorten from "@/assets/Tashiding Monastery/Chorten_and_inscriptions_slabs_outside_the_Tashiding_Monastery..jpg";
import tashidingIndia from "@/assets/Tashiding Monastery/India_-_sikkim.jpg";
import tashidingPlaque from "@/assets/Tashiding Monastery/Plaque_at_entrance_to_Tashiding_Monastery.jpg";
import tashidingBell from "@/assets/Tashiding Monastery/Tashiding_bronze_bell.jpg";

import encheyMain from "@/assets/Enchey Monastery/Close_view_of_Enchey_Gompa_in_Gangtok.jpg";
import encheyChorten from "@/assets/Enchey Monastery/Chorten_in_Enchey_Gompa_in_Gangtok.jpg";
import encheyInside from "@/assets/Enchey Monastery/Enchey_Monastery_Inside.jpg";
import encheyPrayerWheels from "@/assets/Enchey Monastery/Prayer_wheels_in_Enchey_Gompa_in_Gangtok.jpg";
import encheySignage from "@/assets/Enchey Monastery/Signage_Enchey_Monastery-Gangtok-Sikkim-MA-19.jpg";
import encheyWindow from "@/assets/Enchey Monastery/Window_of_prayer_hall,_Enchey.jpg";

import dodrulMain from "@/assets/Do-Drul/Dro-dul_Chorten_-_Gangtok,_Sikkim.jpg";

import dubdiMain from "@/assets/Dubdi Monastery/Yuksom_Dubdi_Gompa2.jpg";
import dubdiGompa3 from "@/assets/Dubdi Monastery/Yuksom_Dubdi_Gompa3.jpg";
import dubdiBuddha from "@/assets/Dubdi Monastery/Face_of_Buddha_in_a_monastry_in_Yuksom.jpg";

import ralangMain from "@/assets/Ralang Monastery/Ralong_monastery_-_top_view.jpg";

import phodongMain from "@/assets/Phodong Monastery/Phodong_monastery_-_north_sikkim.jpg";

import kartokMain from "@/assets/Kartok Monastery/Katok_Monastery.jpg";

import lingdumMain from "@/assets/Lingdum (Ranka) Monastery/Lingdum_Monastery_(also_Ranka_Lingdum_or_Pal_Zurmang_Kagyud_Monastery).jpg";

export interface ArchiveItem {
  id: string;
  title: string;
  type: "manuscript" | "mural" | "document" | "photograph";
  monastery: string;
  monasteryId: string;
  date: string;
  description: string;
  language: string;
  digitized: boolean;
  category: string;
  condition: "excellent" | "good" | "fair" | "poor";
  accessLevel: "public" | "restricted" | "monastery-only";
  tags: string[];
  dimensions?: string;
  material?: string;
  artist?: string;
  provenance?: string;
  imageUrl?: string;
  
  galleryImages?: string[];
}

export const archiveItems: ArchiveItem[] = [
  // Rumtek Monastery Archives
  {
    "id": "SKM001",
    "title": "Rumtek Monastery",
    "type": "manuscript",
    "monastery": "Rumtek Monastery",
    "monasteryId": "SKM001",
    "date": "16th Century (rebuilt in 1960s)",
    "description": "Largest monastery in Sikkim, seat of the Karmapa, known for its golden stupa and Tibetan architecture.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Religious Heritage",
    "condition": "excellent",
    "accessLevel": "public",
    "tags": ["Buddhism", "Kagyupa", "East Sikkim"],
    "material": "Stone, Wood, Metal",
    "provenance": "Karmapa lineage",
    "imageUrl": rumtekMain,
    "galleryImages": [
      rumtekMain,
      rumtekPrayerWheels,
      rumtekDharma
    ]
  },
  {
    "id": "SKM002",
    "title": "Pemayangtse Monastery",
    "type": "manuscript",
    "monastery": "Pemayangtse Monastery",
    "monasteryId": "SKM002",
    "date": "17th Century",
    "description": "One of the oldest monasteries in Sikkim, famous for its Zangdok Palri wooden sculpture and located near Pelling.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Religious Heritage",
    "condition": "good",
    "accessLevel": "public",
    "tags": ["Buddhism", "Nyingma", "West Sikkim"],
    "material": "Stone, Wood",
    "provenance": "Nyingma order",
    "imageUrl": pemayangtseMain,
    "galleryImages": [
      pemayangtseMain,
      pemayangtseEntrance,
      pemayangtseChains,
      pemayangtseRoof
    ]
  },
  {
    "id": "SKM003",
    "title": "Tashiding Monastery",
    "type": "manuscript",
    "monastery": "Tashiding Monastery",
    "monasteryId": "SKM003",
    "date": "17th Century",
    "description": "Sacred monastery in West Sikkim, important pilgrimage site, known for Bumchu festival.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Pilgrimage Site",
    "condition": "excellent",
    "accessLevel": "public",
    "tags": ["Buddhism", "Nyingma", "Festival"],
    "material": "Stone, Wood",
    "provenance": "Lama Ngadak Sempa Chempo",
    "imageUrl": tashidingMain,
    "galleryImages": [
      tashidingMain,
      tashidingChorten,
      tashidingIndia,
      tashidingPlaque,
      tashidingBell
    ]
  },
  {
    "id": "SKM004",
    "title": "Enchey Monastery",
    "type": "mural",
    "monastery": "Enchey Monastery",
    "monasteryId": "SKM004",
    "date": "1909 (rebuilt)",
    "description": "Monastery in Gangtok, believed to be blessed by Lama Druptob Karpo, famous for Cham masked dances.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Cultural Heritage",
    "condition": "good",
    "accessLevel": "public",
    "tags": ["Buddhism", "Nyingma", "Festival"],
    "material": "Wood, Stone",
    "provenance": "Blessed by Lama Druptob Karpo",
    "imageUrl": encheyMain,
    "galleryImages": [
      encheyMain,
      encheyChorten,
      encheyInside,
      encheyPrayerWheels,
      encheySignage,
      encheyWindow
    ]
  },
  {
    "id": "SKM005",
    "title": "Do-Drul Chorten Stupa",
    "type": "document",
    "monastery": "Do-Drul Chorten Stupa",
    "monasteryId": "SKM005",
    "date": "1945",
    "description": "Important stupa in Gangtok built by Trulshik Rinpoche, surrounded by 108 prayer wheels.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Buddhist Monument",
    "condition": "excellent",
    "accessLevel": "public",
    "tags": ["Stupa", "Buddhism", "East Sikkim"],
    "material": "Stone, Metal",
    "provenance": "Nyingma tradition",
    "imageUrl": dodrulMain,
    "galleryImages": [
      dodrulMain
    ]
  },
  {
    "id": "SKM006",
    "title": "Dubdi Monastery",
    "type": "mural",
    "monastery": "Dubdi Monastery",
    "monasteryId": "SKM006",
    "date": "1701",
    "description": "First monastery of Sikkim, built after coronation of the first Chogyal at Yuksom.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Historic Site",
    "condition": "fair",
    "accessLevel": "public",
    "tags": ["Buddhism", "Nyingma", "West Sikkim"],
    "material": "Stone, Wood",
    "provenance": "Three Lamas of Yuksom",
    "imageUrl": dubdiMain,
    "galleryImages": [
      dubdiMain,
      dubdiGompa3,
      dubdiBuddha
    ]
  },
  {
    "id": "SKM007",
    "title": "Ralang Monastery",
    "type": "mural",
    "monastery": "Ralang Monastery",
    "monasteryId": "SKM007",
    "date": "18th Century (New Ralang in 1995)",
    "description": "Important Kagyu monastery in South Sikkim, hosts Pang Lhabsol festival.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Religious Heritage",
    "condition": "good",
    "accessLevel": "public",
    "tags": ["Buddhism", "Kagyupa", "South Sikkim"],
    "material": "Stone, Wood, Metal",
    "provenance": "Karmapa order",
    "imageUrl": ralangMain,
    "galleryImages": [
      ralangMain
    ]
  },
  {
    "id": "SKM008",
    "title": "Phodong Monastery",
    "type": "mural",
    "monastery": "Phodong Monastery",
    "monasteryId": "SKM008",
    "date": "18th Century",
    "description": "Monastery in North Sikkim, famous for grand masked dances during festivals.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Cultural Heritage",
    "condition": "good",
    "accessLevel": "public",
    "tags": ["Buddhism", "Kagyupa", "North Sikkim"],
    "material": "Stone, Wood",
    "provenance": "Kagyupa order",
    "imageUrl": phodongMain,
    "galleryImages": [
      phodongMain
    ]
  },
  {
    "id": "SKM009",
    "title": "Kartok Monastery",
    "type": "manuscript",
    "monastery": "Kartok Monastery",
    "monasteryId": "SKM009",
    "date": "17th Century",
    "description": "Small but scenic monastery in Yuksom, linked to the three great lamas of Sikkim.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Religious Site",
    "condition": "fair",
    "accessLevel": "public",
    "tags": ["Buddhism", "West Sikkim", "Historic"],
    "material": "Wood, Stone",
    "provenance": "Three Lamas of Yuksom",
    "imageUrl": kartokMain,
    "galleryImages": [
      kartokMain
    ]
  },
  {
    "id": "SKM010",
    "title": "Lingdum (Ranka) Monastery",
    "type": "mural",
    "monastery": "Lingdum (Ranka) Monastery",
    "monasteryId": "SKM010",
    "date": "Late 20th Century",
    "description": "A comparatively new but beautiful monastery near Gangtok, known for Tibetan Buddhist rituals and peaceful surroundings.",
    "language": "Tibetan, Nepali",
    "digitized": true,
    "category": "Modern Monastery",
    "condition": "excellent",
    "accessLevel": "public",
    "tags": ["Buddhism", "East Sikkim", "Modern"],
    "material": "Concrete, Wood, Metal",
    "provenance": "Kagyupa tradition",
    "imageUrl": lingdumMain,
    "galleryImages": [
      lingdumMain
    ]
  }
];

export const getArchiveItemById = (id: string): ArchiveItem | undefined => {
  return archiveItems.find(item => item.id === id);
};

export const getArchiveItemsByMonastery = (monasteryId: string): ArchiveItem[] => {
  return archiveItems.filter(item => item.monasteryId === monasteryId);
};

export const getArchiveItemsByType = (type: string): ArchiveItem[] => {
  return archiveItems.filter(item => item.type === type);
};

export const getArchiveStatistics = () => {
  const total = archiveItems.length;
  const digitized = archiveItems.filter(item => item.digitized).length;
  const byType = archiveItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const byMonastery = archiveItems.reduce((acc, item) => {
    acc[item.monastery] = (acc[item.monastery] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const languages = [...new Set(archiveItems.map(item => item.language))].length;
  const categories = [...new Set(archiveItems.map(item => item.category))].length;

  return {
    total,
    digitized,
    notDigitized: total - digitized,
    byType,
    byMonastery,
    languages,
    categories,
    monasteries: Object.keys(byMonastery).length
  };
};
