import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Volume2, Archive, Play, ExternalLink } from "lucide-react";
import { monasteries } from "@/data/monasteries";
import { archiveItems } from "@/data/archives";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  type: 'monastery' | 'archive' | 'audio' | 'tour' | 'calendar';
  description: string;
  monastery?: string;
  path: string;
  icon: React.ReactNode;
}

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Audio guides data (matching the structure from AudioGuides.tsx)
  const audioGuides = [
    { id: "1", title: "Rumtek Monastery", monastery: "Rumtek Monastery", type: "tour" },
    { id: "2", title: "Enchey Monastery", monastery: "Enchey Monastery", type: "tour" },
    { id: "3", title: "Tashiding Monastery", monastery: "Tashiding Monastery", type: "tour" },
    { id: "4", title: "Pemayangtse Monastery", monastery: "Pemayangtse Monastery", type: "tour" },
    { id: "5", title: "Dubdi Monastery", monastery: "Dubdi Monastery", type: "tour" },
    { id: "6", title: "Kartok Monastery", monastery: "Kartok Monastery", type: "tour" },
    { id: "7", title: "Lingdum (Ranka) Monastery", monastery: "Lingdum (Ranka) Monastery", type: "tour" },
    { id: "8", title: "Phodong Monastery", monastery: "Phodong Monastery", type: "tour" },
    { id: "9", title: "Ralang Monastery", monastery: "Ralang Monastery", type: "tour" },
    { id: "10", title: "Do-Drul Chorten Stupa", monastery: "Do-Drul Chorten Stupa", type: "tour" }
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search monasteries
    monasteries.forEach(monastery => {
      if (
        monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.significance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.architecture.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.festivals.some(festival => festival.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        searchResults.push({
          id: monastery.id,
          title: monastery.name,
          type: 'monastery',
          description: monastery.description,
          path: `/map?monastery=${encodeURIComponent(monastery.name)}`,
          icon: <MapPin className="w-4 h-4" />
        });
      }
    });

    // Search archives
    archiveItems.forEach(archive => {
      if (
        archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.monastery.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archive.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        archive.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push({
          id: archive.id,
          title: archive.title,
          type: 'archive',
          description: archive.description,
          monastery: archive.monastery,
          path: `/archives?monastery=${encodeURIComponent(archive.monastery)}`,
          icon: <Archive className="w-4 h-4" />
        });
      }
    });

    // Search audio guides
    audioGuides.forEach(audio => {
      if (
        audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audio.monastery.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push({
          id: audio.id,
          title: audio.title,
          type: 'audio',
          description: `Audio guide for ${audio.monastery}`,
          monastery: audio.monastery,
          path: `/audio-guides?monastery=${encodeURIComponent(audio.monastery)}`,
          icon: <Volume2 className="w-4 h-4" />
        });
      }
    });

    // Add general feature searches
    const features = [
      { name: "Home", path: "/", icon: <MapPin className="w-4 h-4" />, description: "Main dashboard with overview of all monastery features", keywords: ["home", "dashboard", "main", "overview"] },
      { name: "Virtual Tours", path: "/tours", icon: <Play className="w-4 h-4" />, description: "Explore monasteries through virtual reality tours", keywords: ["virtual", "tours", "vr", "360", "tour"] },
      { name: "Audio Guides", path: "/audio-guides", icon: <Volume2 className="w-4 h-4" />, description: "Immersive audio guides for monastery exploration", keywords: ["audio", "guides", "sound", "narration", "listening"] },
      { name: "Interactive Map", path: "/map", icon: <MapPin className="w-4 h-4" />, description: "Interactive map showing all monastery locations", keywords: ["map", "interactive", "location", "navigation"] },
      { name: "Cultural Calendar", path: "/calendar", icon: <Calendar className="w-4 h-4" />, description: "Upcoming festivals and cultural events", keywords: ["calendar", "festivals", "events", "cultural", "schedule"] },
      { name: "Digital Archives", path: "/archives", icon: <Archive className="w-4 h-4" />, description: "Digital collection of manuscripts, murals, and documents", keywords: ["archives", "digital", "manuscripts", "murals", "documents"] }
    ];

    features.forEach(feature => {
      const searchLower = searchQuery.toLowerCase();
      const matchesName = feature.name.toLowerCase().includes(searchLower);
      const matchesDescription = feature.description.toLowerCase().includes(searchLower);
      const matchesKeywords = feature.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
      
      if (matchesName || matchesDescription || matchesKeywords) {
        searchResults.push({
          id: feature.name.toLowerCase().replace(/\s+/g, '-'),
          title: feature.name,
          type: feature.name === 'Audio Guides' ? 'audio' : 'tour',
          description: feature.description,
          path: feature.path,
          icon: feature.icon
        });
      }
    });

    setResults(searchResults);
    setShowResults(true);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setSearchQuery("");
    setShowResults(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monastery": return "bg-mountain-blue/20 text-mountain-blue";
      case "archive": return "bg-monastery-gold/20 text-monastery-maroon";
      case "audio": return "bg-primary/20 text-primary";
      case "tour": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="relative w-[250px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search monasteries, archives..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          className="pl-10"
        />
      </div>
      
      {showResults && searchQuery && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto z-50 bg-background/95 backdrop-blur-sm border-border shadow-lg">
          <div className="p-2">
            {results.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-1">
                {results.slice(0, 8).map((result) => (
                  <div 
                    key={result.id} 
                    className="p-3 cursor-pointer hover:bg-muted/50 transition-colors rounded-md"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{result.title}</h3>
                          <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                            {capitalizeFirst(result.type)}
                          </Badge>
                        </div>
                        {result.monastery && (
                          <p className="text-xs text-muted-foreground mb-1">
                            {result.monastery}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
