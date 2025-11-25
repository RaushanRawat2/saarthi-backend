import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, Download, Volume2, MapPin, Clock, Smartphone, Loader2, Search, VolumeX, Volume1 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { monasteries } from "@/data/monasteries";
import { useSearchParams } from "react-router-dom";
import TranslateSpeak from "../components/TranslateSpeak.jsx";

// Import audio files
import rumtekAudio from "@/assets/audio/Rumtek monastery.mp3";
import encheyAudio from "@/assets/audio/Enchey Monastery.mp3";
import tashidingAudio from "@/assets/audio/Tashiding Monastery.mp3";
import pemayangtseAudio from "@/assets/audio/Pemayangtse Monastery.mp3";
import dubdiAudio from "@/assets/audio/Dubdi Monastery.mp3";
import kartokAudio from "@/assets/audio/Kartok Monastery.mp3";
import lingdumAudio from "@/assets/audio/Lingdum (Ranka) Monastery.mp3";
import phodongAudio from "@/assets/audio/Phodong Monastery.mp3";
import ralangAudio from "@/assets/audio/Ralang Monastery.mp3";
import doDrulAudio from "@/assets/audio/Do-Drul Chorten Stupa.mp3";

interface AudioGuide {
  id: string;
  title: string;
  monastery: string;
  duration: string;
  language: string;
  narrator: string;
  description: string;
  type: "tour" | "history" | "meditation" | "ceremony";
  offline: boolean;
  premium: boolean;
  audioFile: string;
}

const audioGuides: AudioGuide[] = [
  {
    id: "1",
    title: "Rumtek Monastery",
    monastery: "Rumtek Monastery",
    duration: "45 min",
    language: "English",
    narrator: "Dr. Tenzin Norbu",
    description: "Explore the seat of the Karmapa lineage, featuring stunning Tibetan architecture, ancient murals, and the Golden Stupa containing relics of the 16th Karmapa.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: rumtekAudio
  },
  {
    id: "2",
    title: "Enchey Monastery",
    monastery: "Enchey Monastery",
    duration: "25 min",
    language: "English",
    narrator: "Lama Pemba",
    description: "Discover this 200-year-old monastery known for its unique Nyingma tradition, featuring beautiful prayer halls and panoramic views of Gangtok.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: encheyAudio
  },
  {
    id: "3",
    title: "Tashiding Monastery",
    monastery: "Tashiding Monastery",
    duration: "35 min",
    language: "English",
    narrator: "Prof. Sangay Dolma",
    description: "Visit this sacred monastery perched on a hilltop, famous for its annual Bumchu festival and ancient Buddhist scriptures dating back centuries.",
    type: "tour",
    offline: false,
    premium: false,
    audioFile: tashidingAudio
  },
  {
    id: "4",
    title: "Pemayangtse Monastery",
    monastery: "Pemayangtse Monastery",
    duration: "60 min",
    language: "English",
    narrator: "Monastery Monks",
    description: "Experience the oldest monastery in Sikkim, featuring intricate wood carvings, ancient thangkas, and the famous Padmasambhava statue.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: pemayangtseAudio
  },
  {
    id: "5",
    title: "Dubdi Monastery",
    monastery: "Dubdi Monastery",
    duration: "40 min",
    language: "English",
    narrator: "Elder Karma Lama",
    description: "Journey to the oldest monastery in Sikkim, built in 1701, featuring traditional Tibetan architecture and stunning mountain views.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: dubdiAudio
  },
  {
    id: "6",
    title: "Kartok Monastery",
    monastery: "Kartok Monastery",
    duration: "30 min",
    language: "English",
    narrator: "Lama Dorje",
    description: "Explore this peaceful monastery known for its meditation retreats and beautiful garden setting, perfect for spiritual contemplation.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: kartokAudio
  },
  {
    id: "7",
    title: "Lingdum (Ranka) Monastery",
    monastery: "Lingdum (Ranka) Monastery",
    duration: "35 min",
    language: "English",
    narrator: "Rinpoche Tenzin",
    description: "Discover this modern monastery complex featuring traditional architecture, a large prayer hall, and educational facilities for Buddhist studies.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: lingdumAudio
  },
  {
    id: "8",
    title: "Phodong Monastery",
    monastery: "Phodong Monastery",
    duration: "28 min",
    language: "English",
    narrator: "Lama Karma",
    description: "Visit this historic monastery known for its beautiful murals, ancient manuscripts, and the annual Chaam dance festival.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: phodongAudio
  },
  {
    id: "9",
    title: "Ralang Monastery",
    monastery: "Ralang Monastery",
    duration: "32 min",
    language: "English",
    narrator: "Lama Sangye",
    description: "Explore this magnificent monastery featuring stunning architecture, intricate artwork, and a peaceful atmosphere for meditation and prayer.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: ralangAudio
  },
  {
    id: "10",
    title: "Do-Drul Chorten Stupa",
    monastery: "Do-Drul Chorten Stupa",
    duration: "20 min",
    language: "English",
    narrator: "Lama Tashi",
    description: "Discover this sacred stupa built by the revered Buddhist master Dudjom Rinpoche, featuring beautiful architecture and spiritual significance.",
    type: "tour",
    offline: true,
    premium: false,
    audioFile: doDrulAudio
  }
];

export const AudioGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioDurations, setAudioDurations] = useState<Record<string, number>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pausedId, setPausedId] = useState<string | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [searchParams] = useSearchParams();
  const monasteryParam = searchParams.get('monastery');

  // Set search query from URL parameter on component mount
  useEffect(() => {
    if (monasteryParam) {
      setSearchQuery(monasteryParam);
    }
  }, [monasteryParam]);

  const filteredGuides = audioGuides.filter(guide => {
    const matchesSearch = searchQuery === "" || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.monastery.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tour": return "bg-monastery-gold/20 text-monastery-maroon dark:bg-sunrise/20 dark:text-sunrise";
      case "history": return "bg-mountain-blue/20 text-mountain-blue";
      case "meditation": return "bg-primary/20 text-primary";
      case "ceremony": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  // Audio player functions
  const handlePlayPause = (guideId: string, audioFile: string) => {
    if (playingId === guideId) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingId(null);
      setPausedId(guideId);
    } else if (pausedId === guideId) {
      // Resume paused audio
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Error resuming audio:', error);
          setPlayingId(null);
          setPausedId(null);
        });
        setPlayingId(guideId);
        setPausedId(null);
      }
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Load new audio
      const audio = new Audio(audioFile);
      audioRef.current = audio;
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setPlayingId(null);
        setPausedId(null);
        setCurrentTime(0);
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setPlayingId(null);
        setPausedId(null);
      });
      
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        setPlayingId(null);
        setPausedId(null);
      });
      setPlayingId(guideId);
      setPausedId(null);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Load audio durations when component mounts
  useEffect(() => {
    const loadAudioDurations = async () => {
      const durations: Record<string, number> = {};
      
      // Load durations in parallel for better performance
      const loadPromises = audioGuides.map(async (guide) => {
        try {
          const audio = new Audio(guide.audioFile);
          
          return new Promise<{id: string, duration: number}>((resolve) => {
            const timeout = setTimeout(() => {
              console.warn(`Timeout loading duration for ${guide.title}, using fallback`);
              resolve({ id: guide.id, duration: parseDuration(guide.duration) });
            }, 5000);
            
            audio.addEventListener('loadedmetadata', () => {
              clearTimeout(timeout);
              resolve({ id: guide.id, duration: audio.duration });
            });
            
            audio.addEventListener('error', (e) => {
              clearTimeout(timeout);
              console.warn(`Error loading duration for ${guide.title}:`, e);
              resolve({ id: guide.id, duration: parseDuration(guide.duration) });
            });
            
            // Load the audio to trigger metadata loading
            audio.load();
          });
        } catch (error) {
          console.warn(`Could not load duration for ${guide.title}:`, error);
          return { id: guide.id, duration: parseDuration(guide.duration) };
        }
      });
      
      try {
        const results = await Promise.all(loadPromises);
        results.forEach(({ id, duration }) => {
          durations[id] = duration;
        });
        setAudioDurations(durations);
      } catch (error) {
        console.error('Error loading audio durations:', error);
      }
    };

    loadAudioDurations();
  }, []);

  // Helper function to parse duration string to seconds
  const parseDuration = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)\s*min/);
    return match ? parseInt(match[1]) * 60 : 0;
  };

  // Helper function to format seconds to duration string
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    if (minutes > 0) {
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes} min`;
    }
    return `${remainingSeconds} sec`;
  };

  // Download audio file function
  const handleDownload = async (guide: AudioGuide) => {
    setDownloadingId(guide.id);
    
    try {
      // Fetch the audio file
      const response = await fetch(guide.audioFile);
      if (!response.ok) {
        throw new Error('Failed to fetch audio file');
      }
      
      // Convert to blob
      const blob = await response.blob();
      
      // Create download URL
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      
      // Create a clean filename
      const fileName = `${guide.monastery.replace(/[^a-zA-Z0-9]/g, '_')}_${guide.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
      link.download = fileName;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading audio file:', error);
      // Fallback: try direct download
      try {
        const link = document.createElement('a');
        link.href = guide.audioFile;
        link.download = `${guide.monastery.replace(/[^a-zA-Z0-9]/g, '_')}_${guide.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError);
        // Final fallback: open in new tab
        window.open(guide.audioFile, '_blank');
      }
    } finally {
      setDownloadingId(null);
    }
  };

  // Volume control functions
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (playingId || pausedId)) {
        e.preventDefault();
        const currentGuide = audioGuides.find(g => g.id === (playingId || pausedId));
        if (currentGuide) {
          handlePlayPause(currentGuide.id, currentGuide.audioFile);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playingId, pausedId]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingId(null);
      setPausedId(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-monastery-gold/10 to-background dark:from-monastery-gold/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-monastery bg-clip-text text-transparent">Smart Audio Guides</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience immersive audio guided tour covering architecture, history, and spiritual significance. 
              Available in multiple languages with offline mode for remote monastery visits.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search audio guides by monastery, narrator, language, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base"
            />
          </div>
        </div>

        {/* Global Audio Controls - Only show when audio is playing */}
        {(playingId || pausedId) && (
          <div className="mb-8">
            <Card className="p-4 bg-gradient-to-r from-monastery-gold/10 to-mountain-blue/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-monastery-gold/20 rounded-full flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-monastery-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {audioGuides.find(g => g.id === (playingId || pausedId))?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {audioGuides.find(g => g.id === (playingId || pausedId))?.monastery}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Volume Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMuteToggle}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume1 className="w-4 h-4" />}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Progress Display */}
                  <div className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration || audioDurations[playingId || pausedId || ''] || 0)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredGuides.length} audio guide{filteredGuides.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Audio Guides Grid */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No audio guides found</h3>
            <p className="text-muted-foreground">
              No results found for "{searchQuery}". Try adjusting your search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-peaceful transition-all duration-300">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 truncate">{guide.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-2 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{guide.monastery}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 flex-shrink-0">
                    <Badge className={getTypeColor(guide.type)}>
                      {capitalizeFirst(guide.type)}
                    </Badge>
                    {guide.premium && (
                      <Badge variant="secondary" className="text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">{guide.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {audioDurations[guide.id] ? formatDuration(audioDurations[guide.id]) : (
                      <span className="flex items-center">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Loading...
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {guide.language}
                  </div>
                  <div className="flex items-center">
                    {guide.offline && (
                      <Badge variant="outline" className="text-xs">
                        Offline Ready
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Audio Player Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="monastery"
                    size="sm"
                    onClick={() => handlePlayPause(guide.id, guide.audioFile)}
                    className="flex-1"
                  >
                    {playingId === guide.id ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : pausedId === guide.id ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {guide.premium ? "Preview" : "Play"}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(guide)}
                    title={`Download ${guide.title}`}
                    disabled={downloadingId === guide.id}
                  >
                    {downloadingId === guide.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Progress Bar (when playing or paused) */}
                {(playingId === guide.id || pausedId === guide.id) && (
                  <div className="mt-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-monastery-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration || audioDurations[guide.id] || parseDuration(guide.duration))}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            ))}
          </div>
        )}

      </div>


<div>

</div >

    </div>
  );
};

export default AudioGuides;