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
    id: "enchey-001",
    title: "Wheel of Life (Bhavachakra) Mural",
    type: "mural",
    monastery: "Enchey Monastery",
    monasteryId: "enchey",
    date: "1909",
    description: "Traditional Buddhist cosmological diagram depicting the cycle of existence and rebirth. Shows the six realms of existence and the twelve links of dependent origination.",
    language: "Visual/Symbolic",
    digitized: true,
    category: "Religious Art",
    condition: "good",
    accessLevel: "public",
    tags: ["Wheel of Life", "Cosmology", "Rebirth", "Six Realms", "Buddhist Art"],
    dimensions: "200cm x 150cm",
    material: "Wall painting with natural pigments"
  },
  {
    id: "enchey-002",
    title: "Nyingma Prayer Book",
    type: "manuscript",
    monastery: "Enchey Monastery",
    monasteryId: "enchey",
    date: "19th Century",
    description: "Collection of traditional Nyingma prayers and mantras used in daily practice. Includes prayers to Guru Rinpoche and various protective deities.",
    language: "Tibetan",
    digitized: true,
    category: "Prayer Books",
    condition: "good",
    accessLevel: "public",
    tags: ["Nyingma", "Prayers", "Mantras", "Guru Rinpoche", "Daily Practice"],
    material: "Handmade paper with gold ink"
  },
  {
    id: "tashiding-001",
    title: "Bumchu Festival Records",
    type: "document",
    monastery: "Tashiding Monastery",
    monasteryId: "tashiding",
    date: "1641",
    description: "Ancient records of the Bumchu (Holy Water) festival, including predictions and prophecies made by the monastery's lamas over centuries.",
    language: "Tibetan",
    digitized: true,
    category: "Prophetic Records",
    condition: "poor",
    accessLevel: "monastery-only",
    tags: ["Bumchu", "Festival", "Prophecy", "Holy Water", "Predictions"]
  },
  {
    id: "tashiding-002",
    title: "Buddha Life Stories Mural",
    type: "mural",
    monastery: "Tashiding Monastery",
    monasteryId: "tashiding",
    date: "17th Century",
    description: "Painted narratives depicting the life and enlightenment of Buddha Shakyamuni. Shows key events from birth to parinirvana in traditional Tibetan style.",
    language: "Visual/Symbolic",
    digitized: false,
    category: "Religious Art",
    condition: "fair",
    accessLevel: "public",
    tags: ["Buddha", "Life Stories", "Enlightenment", "Narrative", "Buddhist Art"],
    dimensions: "300cm x 200cm",
    material: "Wall painting with mineral pigments"
  },
  {
    id: "pemayangtse-001",
    title: "Tantric Ritual Manual",
    type: "manuscript",
    monastery: "Pemayangtse Monastery",
    monasteryId: "pemayangtse",
    date: "17th Century",
    description: "Detailed instructions for performing sacred tantric ceremonies and rituals. Includes mudras, mantras, and visualization practices for advanced practitioners.",
    language: "Tibetan",
    digitized: true,
    category: "Tantric Texts",
    condition: "good",
    accessLevel: "monastery-only",
    tags: ["Tantra", "Rituals", "Ceremonies", "Mudras", "Mantras", "Visualization"],
    material: "Handmade paper with red and gold ink"
  },
  {
    id: "dubdi-001",
    title: "Lhatsun Chempo's Teachings",
    type: "manuscript",
    monastery: "Dubdi Monastery",
    monasteryId: "dubdi",
    date: "1701",
    description: "Original teachings and instructions written by Lhatsun Chempo, one of the three lamas who consecrated the first Chogyal of Sikkim. Contains meditation instructions and spiritual guidance.",
    language: "Tibetan",
    digitized: true,
    category: "Spiritual Teachings",
    condition: "poor",
    accessLevel: "public",
    tags: ["Lhatsun Chempo", "Teachings", "Meditation", "Spiritual Guidance", "Chogyal"],
    material: "Ancient paper with faded ink"
  },
  {
    id: "labrang-001",
    title: "Royal Family Prayer Book",
    type: "manuscript",
    monastery: "Labrang Monastery",
    monasteryId: "labrang",
    date: "19th Century",
    description: "Sacred prayer book used exclusively by the royal family of Sikkim. Contains special prayers for the protection and prosperity of the kingdom.",
    language: "Tibetan",
    digitized: true,
    category: "Royal Documents",
    condition: "excellent",
    accessLevel: "restricted",
    tags: ["Royal Family", "Prayers", "Protection", "Prosperity", "Kingdom"],
    material: "Silk pages with gold and silver ink"
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
