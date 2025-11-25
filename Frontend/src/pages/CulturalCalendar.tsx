import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Users, ExternalLink, X, Share2, Copy, Check } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  monastery: string;
  month: string;
  time: string;
  type: "festival" | "ceremony" | "teaching" | "pilgrimage";
  description: string;
  duration: string;
  participationAllowed: boolean;
  maxParticipants?: number;
  bookingRequired: boolean;
  detailedDescription?: string;
  culturalSignificance?: string;
  activities?: string[];
  community?: string;
  traditions?: string[];
}

const events: Event[] = [
  // January
  {
    id: "1",
    title: "Maghe Sankranti (Makar Sankranti)",
    monastery: "Multiple Monasteries",
    month: "January",
    time: "06:00 AM",
    type: "festival",
    description: "Celebrated by the Nepalese community. A bathing festival called makkar is observed, when people take a dip at the confluence of the Tista and Rangit. Features holy dips in rivers, family gatherings, traditional foods, and the grand Maghey Mela in Jorethang showcasing local culture, handicrafts, horticulture, and sports.",
    duration: "3 days",
    participationAllowed: true,
    maxParticipants: 500,
    bookingRequired: false,
    detailedDescription: "Maghe Sankranti in Sikkim is a significant Nepali cultural and Hindu festival, often called Makar Sankranti, celebrated in mid-January to mark the beginning of warmer, auspicious weather and the sun's northward journey. It's a multi-day celebration featuring holy dips in rivers like the Teesta and Rangit, family gatherings, traditional foods, and fairs like the grand Maghey Mela in Jorethang, which showcases local culture, handicrafts, horticulture, and sports.",
    culturalSignificance: "Marks the transition of the sun into the northern hemisphere, symbolizing the end of winter and beginning of spring. It's considered an auspicious time for new beginnings and spiritual purification.",
    activities: ["Holy dips in Teesta and Rangit rivers", "Maghey Mela fair in Jorethang", "Traditional food preparation", "Family gatherings", "Cultural performances", "Handicraft exhibitions"],
    community: "Nepalese community in Sikkim",
    traditions: ["Makkar (bathing ritual)", "Traditional Nepali cuisine", "Folk dances", "Religious ceremonies", "Community feasts"]
  },
  
  // February/March
  {
    id: "2",
    title: "Losar (Tibetan New Year)",
    monastery: "Rumtek Monastery",
    month: "February",
    time: "06:00 AM",
    type: "festival",
    description: "The Tibetan New Year celebrated according to the Tibetan calendar. Celebrated by communities in Ladakh, Sikkim, Arunachal Pradesh, and Himachal Pradesh. The festival is dedicated to warding off evil spirits and welcoming a new year filled with happiness and prosperity.",
    duration: "3 days",
    participationAllowed: true,
    maxParticipants: 300,
    bookingRequired: true,
    detailedDescription: "Losar is the Tibetan New Year celebrated according to the Tibetan calendar. It is celebrated by communities in Ladakh, Sikkim, Arunachal Pradesh, and Himachal Pradesh, all of which have a strong Tibetan cultural influence. The festival is dedicated to warding off evil spirits and welcoming a new year that is expected to be filled with happiness and prosperity. In Arunachal Pradesh, the Losar festival is particularly observed by the Monpa tribe, who celebrate it with great enthusiasm over three days.",
    culturalSignificance: "Losar marks the beginning of the Tibetan New Year and is considered the most important festival in Tibetan Buddhism. It symbolizes the victory of good over evil and the renewal of life.",
    activities: ["Traditional prayers and ceremonies", "Mask dances (Cham)", "Family gatherings", "Traditional food preparation", "Cleaning and decorating homes", "Lighting butter lamps"],
    community: "Tibetan Buddhist communities",
    traditions: ["Guthuk (special soup)", "Tibetan butter tea", "Traditional costumes", "Prayer flag hanging", "Monastery visits", "Community feasts"]
  },
  
  // March/April
  {
    id: "3",
    title: "Holi (Festival of Colors)",
    monastery: "Multiple Monasteries",
    month: "March",
    time: "10:00 AM",
    type: "festival",
    description: "The Hindu festival of colors, celebrated widely in Sikkim as a unifying event. Locals and visitors come together to partake in joyous festivities, dousing each other in colored powders and water, symbolizing the victory of good over evil.",
    duration: "1 day",
    participationAllowed: true,
    maxParticipants: 200,
    bookingRequired: false,
    detailedDescription: "Holi, the festival of colors, is celebrated with great fervor and enthusiasm in Sikkim, adding vibrant hues to the picturesque landscape of the state. Locals and visitors alike come together to partake in the joyous festivities, dousing each other in colored powders and water, symbolizing the victory of good over evil.",
    culturalSignificance: "Holi celebrates the triumph of good over evil, specifically the victory of Lord Vishnu's devotee Prahlada over the demon king Hiranyakashipu. It also marks the arrival of spring and the end of winter.",
    activities: ["Color throwing with gulal", "Water balloon fights", "Traditional music and dance", "Community gatherings", "Special food preparation", "Bonfire on Holika Dahan"],
    community: "Hindu communities across Sikkim",
    traditions: ["Holika Dahan (bonfire)", "Playing with colors", "Traditional sweets (gujiya)", "Bhang consumption", "Folk songs and dances", "Community feasts"]
  },
  {
    id: "4",
    title: "Ram Navami (Chaite Dasain)",
    monastery: "Multiple Monasteries",
    month: "April",
    time: "08:00 AM",
    type: "festival",
    description: "Marks the birth of Lord Rama, celebrated with prayers, processions, and religious ceremonies across Sikkim.",
    duration: "1 day",
    participationAllowed: true,
    maxParticipants: 150,
    bookingRequired: false,
    detailedDescription: "Ram Navami celebrates the birth of Lord Rama, an important Hindu festival observed with great religious fervor in Sikkim. Also known as Chaite Dasain in the local context, this festival features prayers, devotional songs, and community gatherings. Devotees participate in special puja ceremonies, read from the Ramayana, and engage in spiritual activities to honor Lord Rama's divine birth and his exemplary life.",
    culturalSignificance: "Ram Navami celebrates the birth of Lord Rama, the seventh avatar of Vishnu, symbolizing righteousness, truth, and the victory of good over evil. It's considered one of the most auspicious days in the Hindu calendar.",
    activities: ["Special puja ceremonies", "Ramayana recitations", "Devotional songs and bhajans", "Community gatherings", "Religious processions", "Temple visits", "Fasting and prayers"],
    community: "Hindu communities in Sikkim",
    traditions: ["Rama Katha recitations", "Devotional singing", "Temple decorations", "Special prayers", "Community feasts", "Religious discourses", "Charitable activities"]
  },
  
  // April/May
  {
    id: "5",
    title: "Sakewa",
    monastery: "Multiple Monasteries",
    month: "April",
    time: "07:00 AM",
    type: "festival",
    description: "Marks the beginning of the agricultural season and is a major religious festival for the Rai community. Celebrated as a homage to Mother Earth, it commences by performing Bhumi Puja followed by community dances and other rituals.",
    duration: "2 days",
    participationAllowed: true,
    maxParticipants: 200,
    bookingRequired: false,
    detailedDescription: "Sakewa marks the beginning of the agricultural season and is a major religious festival for the Rai community. Celebrated as a homage to Mother Earth, it commences by performing Bhumi Puja followed by community dances and other rituals. This festival is deeply rooted in agricultural traditions and nature worship, reflecting the Rai community's connection to the land and their agricultural practices.",
    culturalSignificance: "Sakewa celebrates the beginning of the agricultural season and honors Mother Earth, symbolizing the community's dependence on and respect for nature's bounty.",
    activities: ["Bhumi Puja (Earth worship)", "Community dances", "Agricultural rituals", "Traditional music performances", "Cultural ceremonies", "Community gatherings", "Traditional food preparation"],
    community: "Rai community in Sikkim",
    traditions: ["Earth worship ceremonies", "Agricultural blessings", "Traditional Rai dances", "Community rituals", "Nature offerings", "Cultural performances", "Community feasts"]
  },
  {
    id: "6",
    title: "Saga Dawa",
    monastery: "Multiple Monasteries",
    month: "May",
    time: "05:00 AM",
    type: "festival",
    description: "The most important Buddhist festival, commemorating Buddha's birth, enlightenment, and nirvana. A sacred month-long Tibetan Buddhist festival considered the most auspicious time for good deeds, with merits believed to be multiplied. Features pilgrimages, prayers, offerings, and colorful processions of monks and devotees.",
    duration: "1 month",
    participationAllowed: true,
    maxParticipants: 1000,
    bookingRequired: false,
    detailedDescription: "Saga Dawa is a sacred month-long Tibetan Buddhist festival that commemorates the birth, enlightenment, and passing into Nirvana of Lord Buddha. Celebrated in the fourth Tibetan lunar month, it is considered the most auspicious time for good deeds, with merits believed to be multiplied. Key activities include performing pilgrimages, reciting prayers, making offerings, and participating in colorful processions of monks and devotees. The festival marks the 'Triple Blessed Day' for Lord Buddha, celebrating his birth, his enlightenment, and his achievement of Nirvana. It is known as the 'Month of Merits' because good deeds performed during this time are believed to bring multiplied rewards, sometimes said to be 300 or 1000 times more merit.",
    culturalSignificance: "Saga Dawa is the most sacred month in Tibetan Buddhism, commemorating the three most important events in Buddha's life. It's believed that any positive action performed during this month creates 100,000 times more merit than usual.",
    activities: ["Pilgrimage to sacred sites", "Prayer recitations", "Making offerings to monasteries", "Lighting butter lamps", "Releasing animals", "Monk processions", "Religious teachings"],
    community: "Tibetan Buddhist communities worldwide",
    traditions: ["Circumambulation of stupas", "Prayer wheel spinning", "Butter lamp offerings", "Animal liberation", "Vegetarian diet", "Meditation retreats", "Monastery visits"]
  },
  
  // June
  {
    id: "7",
    title: "Guru Rinpoche's Thrunkar Tshechu",
    monastery: "Pemayangtse Monastery",
    month: "June",
    time: "09:00 AM",
    type: "festival",
    description: "A festival honoring Guru Padmasambhava, the patron saint of Sikkim. Features religious ceremonies, mask dances, and prayers for peace and prosperity.",
    duration: "3 days",
    participationAllowed: true,
    maxParticipants: 250,
    bookingRequired: true,
    detailedDescription: "Guru Rinpoche's Thrunkar Tshechu is a festival honoring Guru Padmasambhava, the patron saint of Sikkim. This sacred festival features religious ceremonies, mask dances, and prayers for peace and prosperity. Guru Padmasambhava, also known as the Second Buddha, is revered for bringing Buddhism to Tibet and the Himalayan regions. The festival celebrates his teachings and spiritual legacy through elaborate ceremonies and traditional performances.",
    culturalSignificance: "This festival honors Guru Padmasambhava, who is considered the patron saint of Sikkim and the founder of Tibetan Buddhism in the region. It celebrates his spiritual teachings and the spread of Buddhism.",
    activities: ["Religious ceremonies", "Mask dances (Cham)", "Prayers for peace and prosperity", "Monastery gatherings", "Traditional music", "Spiritual teachings", "Community blessings"],
    community: "Tibetan Buddhist communities in Sikkim",
    traditions: ["Guru Padmasambhava worship", "Mask dance performances", "Religious ceremonies", "Prayer recitations", "Monastery rituals", "Spiritual offerings", "Community prayers"]
  },
  
  // July/August
  {
    id: "8",
    title: "Drukpa Tshechi",
    monastery: "Rumtek Monastery",
    month: "August",
    time: "08:00 AM",
    type: "festival",
    description: "A festival that celebrates the Buddhist heritage of Sikkim and commemorates the day Lord Buddha delivered his first sermon on the Four Noble Truths. Celebrations include religious ceremonies, monastery gatherings, and traditional sports like yak racing, as well as prayers for peace and wisdom.",
    duration: "2 days",
    participationAllowed: true,
    maxParticipants: 300,
    bookingRequired: true,
    detailedDescription: "Drukpa Tshechi is a festival that celebrates the Buddhist heritage of Sikkim and commemorates the day Lord Buddha delivered his first sermon on the Four Noble Truths. This important Buddhist festival includes religious ceremonies, monastery gatherings, and traditional sports like yak racing, as well as prayers for peace and wisdom. The festival brings together the Buddhist community to honor the foundational teachings of Buddhism and celebrate the spiritual heritage of the region.",
    culturalSignificance: "Drukpa Tshechi commemorates the first teaching of Lord Buddha on the Four Noble Truths, marking a pivotal moment in Buddhist history and celebrating the core principles of Buddhist philosophy.",
    activities: ["Religious ceremonies", "Monastery gatherings", "Yak racing", "Prayers for peace and wisdom", "Traditional sports", "Community celebrations", "Spiritual teachings"],
    community: "Drukpa Kagyu Buddhist communities",
    traditions: ["Buddhist teachings recitation", "Monastery ceremonies", "Traditional sports competitions", "Prayer sessions", "Community gatherings", "Spiritual offerings", "Cultural performances"]
  },
  {
    id: "9",
    title: "Indrajatra",
    monastery: "Multiple Monasteries",
    month: "August",
    time: "07:00 AM",
    type: "festival",
    description: "Honors Lord Indra, the god of rain and harvest. The festival marks the end of the monsoon and rice farming season and signals the dawn of fall. Celebrated mostly by the Newar community, featuring chariot processions, masked dances, and religious enactments to thank Indra for a good harvest.",
    duration: "8 days",
    participationAllowed: true,
    maxParticipants: 400,
    bookingRequired: false,
    detailedDescription: "Indrajatra honors Lord Indra, the god of rain and harvest. This festival marks the end of the monsoon and rice farming season and signals the dawn of fall. Celebrated mostly by the Newar community, it features chariot processions, masked dances, and religious enactments to thank Indra for a good harvest. The festival is a vibrant celebration of agricultural abundance and divine blessings.",
    culturalSignificance: "Indrajatra celebrates the end of the agricultural season and honors Lord Indra for providing rain and ensuring a good harvest. It marks the transition from monsoon to autumn.",
    activities: ["Chariot processions", "Masked dances", "Religious enactments", "Harvest celebrations", "Community gatherings", "Traditional music", "Religious ceremonies"],
    community: "Newar community in Sikkim",
    traditions: ["Indra worship", "Chariot processions", "Masked dance performances", "Harvest thanksgiving", "Religious enactments", "Community feasts", "Traditional Newar rituals"]
  },
  {
    id: "10",
    title: "Tendong Lho Rum Faat",
    monastery: "Multiple Monasteries",
    month: "August",
    time: "06:00 AM",
    type: "festival",
    description: "Commemorates the legend of Mount Tendong. The Lepchas celebrate this occasion to commemorate the almighty who saved their ancestors from a calamity and to pay respect to the hill. During the festivities, people make a model of the mountain in the facade of their homes and worship it.",
    duration: "2 days",
    participationAllowed: true,
    maxParticipants: 150,
    bookingRequired: false,
    detailedDescription: "Tendong Lho Rum Faat commemorates the legend of Mount Tendong. The Lepchas celebrate this occasion to commemorate the almighty who saved their ancestors from a calamity and to pay respect to the hill. During the festivities, people make a model of the mountain in the facade of their homes and worship it. This festival is deeply rooted in Lepcha mythology and represents their spiritual connection to the natural landscape.",
    culturalSignificance: "This festival honors the legend of Mount Tendong and celebrates the divine intervention that saved the Lepcha ancestors. It represents the community's deep spiritual connection to their ancestral land and natural environment.",
    activities: ["Mountain model making", "Home worship ceremonies", "Legend recitations", "Community gatherings", "Traditional prayers", "Cultural performances", "Ancestral remembrance"],
    community: "Lepcha community in Sikkim",
    traditions: ["Mountain worship", "Legend storytelling", "Home decorations", "Traditional prayers", "Ancestral ceremonies", "Community feasts", "Cultural preservation"]
  },
  
  // August/September
  {
    id: "11",
    title: "Lhabab Dhuechen",
    monastery: "Multiple Monasteries",
    month: "September",
    time: "08:00 AM",
    type: "festival",
    description: "Commemorates Lord Buddha's descent from heaven, marked on the ninth month of the Tibetan lunar calendar. During this event, Buddha ascended to the heaven of Thirty-Three to teach his mother and other gods, then returned to earth on a specially constructed triple ladder. The festival is a significant day to engage in virtuous activities.",
    duration: "1 day",
    participationAllowed: true,
    maxParticipants: 200,
    bookingRequired: false,
    detailedDescription: "Lhabab Dhuechen commemorates Lord Buddha's descent from heaven, marked on the ninth month of the Tibetan lunar calendar. During this event, Buddha ascended to the heaven of Thirty-Three to teach his mother and other gods, then returned to earth on a specially constructed triple ladder. The festival is a significant day to engage in virtuous activities and reflects on Buddha's compassion and teachings.",
    culturalSignificance: "This festival celebrates Buddha's descent from heaven after teaching his mother and other celestial beings, symbolizing his compassion and the accessibility of Buddhist teachings to all beings.",
    activities: ["Religious ceremonies", "Prayer sessions", "Virtuous activities", "Monastery visits", "Community gatherings", "Spiritual teachings", "Meditation practices"],
    community: "Tibetan Buddhist communities",
    traditions: ["Buddha descent commemoration", "Prayer recitations", "Virtuous deeds", "Monastery ceremonies", "Spiritual offerings", "Community prayers", "Religious observances"]
  },
  
  // September/October
  {
    id: "12",
    title: "Pang Lhabsol",
    monastery: "Multiple Monasteries",
    month: "September",
    time: "09:00 AM",
    type: "festival",
    description: "A unique Sikkimese festival dedicated to the guardian deities of the region, especially Mount Khangchendzonga as the state's guardian deity. Honors its protective spirit and celebrates the blood-brotherhood pact between the Lepchas and Bhutias. Features elaborate masked dance known as the Pangtoed Chaam, recitations of ritual texts, and prayers for the land's welfare.",
    duration: "3 days",
    participationAllowed: true,
    maxParticipants: 500,
    bookingRequired: true,
    detailedDescription: "Pang Lhabsol is a unique Sikkimese festival dedicated to the guardian deities of the region, especially Mount Khangchendzonga as the state's guardian deity. The name roughly translates to 'worship of deities' or 'witnessing a mountain', and the festival features elaborate masked dance known as the Pangtoed Chaam, recitations of ritual texts, and prayers for the land's welfare. It honors the protective spirit of Mount Khangchendzonga and celebrates the blood-brotherhood pact between the Lepchas and Bhutias, symbolizing unity and harmony in Sikkim.",
    culturalSignificance: "Pang Lhabsol is unique to Sikkim and represents the deep spiritual connection between the people and their natural environment. It celebrates the sacred bond between different communities and honors the mountain deity that protects the state.",
    activities: ["Pangtoed Chaam (masked dance)", "Ritual text recitations", "Prayers for land welfare", "Community gatherings", "Traditional music", "Religious ceremonies", "Mountain worship rituals"],
    community: "Lepcha and Bhutia communities of Sikkim",
    traditions: ["Masked dance performances", "Mountain deity worship", "Blood-brotherhood celebration", "Traditional costumes", "Sacred text recitations", "Community feasts", "Prayer ceremonies"]
  },
  
  // October/November
  {
    id: "13",
    title: "Diwali/Tihar",
    monastery: "Multiple Monasteries",
    month: "November",
    time: "06:00 PM",
    type: "festival",
    description: "The Hindu festival of lights, celebrated as Tihar in Sikkim and the Northeast. A major Hindu celebration featuring the veneration of various animals, including crows, dogs, and cows, on successive days, culminating in Bhai Tika (brother-sister bond celebration). Includes lighting of lamps, electrical decorations, and folk carols called Bhailo and Deusi.",
    duration: "5 days",
    participationAllowed: true,
    maxParticipants: 300,
    bookingRequired: false,
    detailedDescription: "In Sikkim, the five-day Tihar festival is a major Hindu celebration similar to Diwali, also known as Deepawali or Yamapanchak, and holds significant cultural importance, especially for the Nepali community. The festival features the veneration of various animals, including crows, dogs, and cows, on successive days, culminates in Bhai Tika (brother-sister bond celebration), and includes the lighting of lamps and electrical decorations. Folk carols called Bhailo and Deusi are also sung during this time. Each day is dedicated to a different animal or being like kaag tihar, kukkar tihar etc.",
    culturalSignificance: "Tihar celebrates the victory of light over darkness and good over evil. It also honors the relationship between humans and animals, recognizing their importance in our lives and the natural world.",
    activities: ["Animal veneration (crows, dogs, cows)", "Lighting diyas and lamps", "Bhai Tika ceremony", "Bhailo and Deusi carols", "House decoration", "Traditional food preparation", "Community gatherings"],
    community: "Nepali and Hindu communities in Sikkim",
    traditions: ["Kaag Tihar (crow worship)", "Kukkar Tihar (dog worship)", "Gai Tihar (cow worship)", "Bhai Tika (brother-sister bond)", "Bhailo and Deusi songs", "Rangoli decorations", "Traditional sweets"]
  },
  
  // November/December
  {
    id: "14",
    title: "Kagyed Dance (Kagyed Chaam)",
    monastery: "Tsuklakhang Palace",
    month: "December",
    time: "10:00 AM",
    type: "festival",
    description: "A religious dance performed during the annual Kagyed festival, where masked dancers enact mythical stories. An annual Sikkimese Buddhist festival featuring ritualistic dances and prayers to eight tantric deities known as Kagyad, symbolizing the triumph of good over evil. Monks perform these dances with elaborate masks and costumes to seek blessings for well-being, prosperity, and protection from evil for all beings.",
    duration: "2 days",
    participationAllowed: true,
    maxParticipants: 200,
    bookingRequired: true,
    detailedDescription: "Kagyed Dance (Kagyed Chaam) is a religious dance performed during the annual Kagyed festival, where masked dancers enact mythical stories. This annual Sikkimese Buddhist festival features ritualistic dances and prayers to eight tantric deities known as Kagyad, symbolizing the triumph of good over evil. Monks perform these dances with elaborate masks and costumes to seek blessings for well-being, prosperity, and protection from evil for all beings.",
    culturalSignificance: "Kagyed Dance represents the triumph of good over evil through ritualistic performances. The eight tantric deities symbolize different aspects of spiritual protection and blessings for the community.",
    activities: ["Masked dance performances", "Ritualistic ceremonies", "Prayers to tantric deities", "Monk performances", "Community blessings", "Religious observances", "Cultural exhibitions"],
    community: "Sikkimese Buddhist communities",
    traditions: ["Kagyed Chaam dances", "Elaborate mask performances", "Tantric deity worship", "Monk rituals", "Community blessings", "Religious ceremonies", "Cultural preservation"]
  },
  {
    id: "15",
    title: "Losoong/Namsoong (Sikkimese New Year)",
    monastery: "Multiple Monasteries",
    month: "December",
    time: "07:00 AM",
    type: "festival",
    description: "The Sikkimese New Year, celebrating the end of the harvest season. Celebrated by the Bhutia and Lepcha communities, marking agrarian gratitude and spiritual renewal with a week of celebrations, including the vibrant Cham dances performed by Buddhist monks.",
    duration: "7 days",
    participationAllowed: true,
    maxParticipants: 400,
    bookingRequired: false,
    detailedDescription: "Losoong/Namsoong is the Sikkimese New Year, celebrating the end of the harvest season. Celebrated by the Bhutia and Lepcha communities, this festival marks agrarian gratitude and spiritual renewal with a week of celebrations, including the vibrant Cham dances performed by Buddhist monks. It's a time of thanksgiving for the harvest and spiritual reflection for the coming year.",
    culturalSignificance: "Losoong/Namsoong marks the end of the agricultural year and the beginning of a new cycle. It celebrates the harvest, expresses gratitude to nature, and seeks blessings for the coming year.",
    activities: ["Cham dances by Buddhist monks", "Harvest celebrations", "Community gatherings", "Religious ceremonies", "Traditional music", "Cultural performances", "New Year festivities"],
    community: "Bhutia and Lepcha communities in Sikkim",
    traditions: ["Cham dance performances", "Harvest thanksgiving", "New Year celebrations", "Religious observances", "Community feasts", "Traditional ceremonies", "Spiritual renewal rituals"]
  }
];

export const CulturalCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredEvents = events.filter(event => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    
    const matchesMonth = selectedMonth === "all" || 
      (selectedMonth === "current" && event.month === currentMonth) ||
      (selectedMonth === "upcoming" && event.month !== currentMonth);
    
    const matchesType = selectedType === "all" || event.type === selectedType;
    
    return matchesMonth && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "festival": return "bg-monastery-gold/20 text-monastery-maroon dark:bg-sunrise/20 dark:text-sunrise";
      case "ceremony": return "bg-mountain-blue/20 text-mountain-blue";
      case "teaching": return "bg-primary/20 text-primary";
      case "pilgrimage": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatMonth = (month: string) => {
    return month;
  };

  const handleDetailsClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const shareEvent = async (event: Event) => {
    const shareData = {
      title: event.title,
      text: `${event.title} at ${event.monastery}\n\n${event.description}\n\nMonth: ${formatMonth(event.month)}\n\nDiscover more about Sikkim's cultural heritage!`,
      url: window.location.href
    };

    // Try native Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Event shared successfully!",
          description: "The event has been shared.",
        });
        return;
      } catch (error) {
        // User cancelled sharing, do nothing
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to copying to clipboard
    const shareText = `${event.title} at ${event.monastery}\n\n${event.description}\n\nMonth: ${formatMonth(event.month)}\n\nDiscover more about Sikkim's cultural heritage at: ${window.location.href}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedEventId(event.id);
      toast({
        title: "Event details copied!",
        description: "Event information has been copied to your clipboard.",
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedEventId(null);
      }, 2000);
    } catch (error) {
      toast({
        title: "Failed to share",
        description: "Unable to copy event details. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-monastery-gold/10 to-background dark:from-monastery-gold/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-monastery bg-clip-text text-transparent">Cultural Calendar</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover sacred festivals, ceremonies, and teachings happening at Sikkim's monasteries. 
              Join spiritual celebrations and book your participation in ancient traditions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={selectedMonth === "all" ? "monastery" : "outline"} 
                size="sm"
                onClick={() => setSelectedMonth("all")}
              >
                All Events
              </Button>
              <Button 
                variant={selectedMonth === "current" ? "monastery" : "outline"} 
                size="sm"
                onClick={() => setSelectedMonth("current")}
              >
                This Month
              </Button>
              <Button 
                variant={selectedMonth === "upcoming" ? "monastery" : "outline"} 
                size="sm"
                onClick={() => setSelectedMonth("upcoming")}
              >
                Upcoming
              </Button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={selectedType === "all" ? "spiritual" : "outline"} 
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                All Types
              </Button>
              <Button 
                variant={selectedType === "festival" ? "spiritual" : "outline"} 
                size="sm"
                onClick={() => setSelectedType("festival")}
              >
                Festivals
              </Button>
              <Button 
                variant={selectedType === "ceremony" ? "spiritual" : "outline"} 
                size="sm"
                onClick={() => setSelectedType("ceremony")}
              >
                Ceremonies
              </Button>
              <Button 
                variant={selectedType === "teaching" ? "spiritual" : "outline"} 
                size="sm"
                onClick={() => setSelectedType("teaching")}
              >
                Teachings
              </Button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-monastery transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.monastery}
                    </div>
                  </div>
                  <Badge className={getTypeColor(event.type)}>
                    {capitalizeFirst(event.type)}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatMonth(event.month)}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{event.description}</p>


                <div className="flex gap-2">
                  <Button 
                    variant="monastery" 
                    size="lg"
                    className="flex-1 text-base py-3"
                    onClick={() => handleDetailsClick(event)}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-monastery-gold/10 to-background">
            <div className="text-3xl font-bold text-monastery-gold mb-2">24</div>
            <div className="text-sm text-muted-foreground">Annual Festivals</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-mountain-blue/10 to-background">
            <div className="text-3xl font-bold text-mountain-blue mb-2">365</div>
            <div className="text-sm text-muted-foreground">Daily Ceremonies</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-background">
            <div className="text-3xl font-bold text-primary mb-2">52</div>
            <div className="text-sm text-muted-foreground">Teaching Sessions</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-background">
            <div className="text-3xl font-bold text-accent mb-2">12</div>
            <div className="text-sm text-muted-foreground">Pilgrimage Routes</div>
          </Card>
        </div>
      </div>

      {/* Detailed Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedEvent.monastery}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatMonth(selectedEvent.month)}
                  </div>
                </div>
            <div className="flex flex-col gap-2">
              <Badge className={`${getTypeColor(selectedEvent.type)} w-fit`}>
                {capitalizeFirst(selectedEvent.type)}
              </Badge>
              {selectedEvent.bookingRequired && (
                <Badge variant="secondary" className="w-fit">
                  Booking Required
                </Badge>
              )}
              {selectedEvent.community && (
                <Badge variant="outline" className="w-fit">
                  {selectedEvent.community}
                </Badge>
              )}
            </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedEvent.description}</p>
              </div>

              {/* Detailed Description */}
              {selectedEvent.detailedDescription && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
                  <p className="text-muted-foreground">{selectedEvent.detailedDescription}</p>
                </div>
              )}

              {/* Cultural Significance */}
              {selectedEvent.culturalSignificance && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cultural Significance</h3>
                  <p className="text-muted-foreground">{selectedEvent.culturalSignificance}</p>
                </div>
              )}

              {/* Activities */}
              {selectedEvent.activities && selectedEvent.activities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Activities & Events</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedEvent.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Traditions */}
              {selectedEvent.traditions && selectedEvent.traditions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Traditions & Rituals</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedEvent.traditions.map((tradition, index) => (
                      <li key={index}>{tradition}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => selectedEvent && shareEvent(selectedEvent)}
                >
                  {copiedEventId === selectedEvent?.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CulturalCalendar;