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
}

export const archiveItems: ArchiveItem[] = [
  // Rumtek Monastery Archives
  {
    id: "rumtek-001",
    title: "Prajnaparamita Sutra (Perfection of Wisdom)",
    type: "manuscript",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "18th Century",
    description: "Ancient Buddhist text on the perfection of wisdom, handwritten in Tibetan script on palm leaves. Contains 8,000 verses explaining the nature of emptiness and the path to enlightenment.",
    language: "Tibetan",
    digitized: true,
    category: "Philosophy",
    condition: "good",
    accessLevel: "public",
    tags: ["Buddhism", "Philosophy", "Wisdom", "Emptiness", "Enlightenment"],
    dimensions: "45cm x 8cm",
    material: "Palm leaves with ink",
    provenance: "Gifted by 16th Karmapa"
  },
  {
    id: "rumtek-002",
    title: "Karmapa Lineage Thangka",
    type: "mural",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1966",
    description: "Sacred painting depicting the lineage of Karmapas from the 1st to the 16th Karmapa. Painted with natural pigments on cotton canvas.",
    language: "Visual/Symbolic",
    digitized: true,
    category: "Religious Art",
    condition: "excellent",
    accessLevel: "public",
    tags: ["Karmapa", "Lineage", "Thangka", "Religious Art", "Kagyu"],
    dimensions: "120cm x 80cm",
    material: "Cotton canvas with natural pigments",
    artist: "Master Thangka Painter from Tibet"
  },
  {
    id: "rumtek-003",
    title: "Monastery Construction Records",
    type: "document",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1966",
    description: "Official documents detailing the construction, funding, and consecration of Rumtek Monastery. Includes architectural plans and donor records.",
    language: "Tibetan/English",
    digitized: true,
    category: "Historical Records",
    condition: "good",
    accessLevel: "restricted",
    tags: ["Construction", "History", "Architecture", "Funding", "Consecration"]
  },
  {
    id: "rumtek-004",
    title: "16th Karmapa and Dalai Lama Meeting",
    type: "photograph",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1975",
    description: "Rare photographs of the historic meeting between the 16th Karmapa and the 14th Dalai Lama at Rumtek Monastery during the Dalai Lama's visit to Sikkim.",
    language: "N/A",
    digitized: true,
    category: "Historical Photography",
    condition: "excellent",
    accessLevel: "public",
    tags: ["Karmapa", "Dalai Lama", "Meeting", "History", "Religious Leaders"]
  },
  {
    id: "rumtek-005",
    title: "Black Crown (Vajra Mukut) Documentation",
    type: "document",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1959",
    description: "Sacred documentation of the Black Crown brought by the 16th Karmapa from Tibet. Said to be woven from the hair of dakinis (celestial beings).",
    language: "Tibetan",
    digitized: true,
    category: "Sacred Relics",
    condition: "excellent",
    accessLevel: "monastery-only",
    tags: ["Black Crown", "Karmapa", "Sacred Relics", "Dakinis", "Tibet"]
  },
  {
    id: "rumtek-006",
    title: "Losar Festival Cham Dance Masks",
    type: "photograph",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1980",
    description: "Photographic documentation of traditional Cham dance masks used during Losar (Tibetan New Year) celebrations. Shows various protective deities and their symbolic representations.",
    language: "N/A",
    digitized: true,
    category: "Cultural Documentation",
    condition: "good",
    accessLevel: "public",
    tags: ["Cham Dance", "Losar", "Masks", "Festival", "Cultural Heritage"]
  },
  {
    id: "rumtek-007",
    title: "Golden Stupa Relics Inventory",
    type: "document",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1981",
    description: "Detailed inventory of relics contained within the Golden Stupa, including bone fragments, hair, and personal items of the 16th Karmapa.",
    language: "Tibetan/English",
    digitized: true,
    category: "Relic Documentation",
    condition: "excellent",
    accessLevel: "restricted",
    tags: ["Golden Stupa", "Relics", "16th Karmapa", "Sacred Objects", "Inventory"]
  },
  {
    id: "rumtek-008",
    title: "Dharma Chakra Centre Teaching Records",
    type: "manuscript",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1970s",
    description: "Collection of teaching notes and philosophical discourses given at the Dharma Chakra Centre. Includes teachings on Buddhist philosophy, rituals, and practices.",
    language: "Tibetan",
    digitized: true,
    category: "Teaching Records",
    condition: "good",
    accessLevel: "public",
    tags: ["Dharma Chakra", "Teachings", "Philosophy", "Rituals", "Buddhist Studies"]
  },
  {
    id: "rumtek-009",
    title: "Drupchen 10-Day Ritual Manual",
    type: "manuscript",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1960s",
    description: "Detailed manual for the 10-day Drupchen rituals with chanting, prayers, and dances. Contains instructions for advanced practitioners and monastic ceremonies.",
    language: "Tibetan",
    digitized: true,
    category: "Ritual Manuals",
    condition: "good",
    accessLevel: "monastery-only",
    tags: ["Drupchen", "Rituals", "Chanting", "Prayers", "Dances", "Monastic Ceremonies"]
  },
  {
    id: "rumtek-010",
    title: "Monastic College Curriculum",
    type: "document",
    monastery: "Rumtek Monastery",
    monasteryId: "rumtek",
    date: "1970s",
    description: "Educational curriculum for the monastic college, one of the largest Buddhist learning institutions in India. Includes philosophy, rituals, and practices.",
    language: "Tibetan/English",
    digitized: true,
    category: "Educational Records",
    condition: "good",
    accessLevel: "public",
    tags: ["Monastic College", "Education", "Curriculum", "Buddhist Learning", "Philosophy"]
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
