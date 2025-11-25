import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink, Play, Loader2, Smartphone, Monitor, Tablet } from "lucide-react";
import { monasteries } from "@/data/monasteries";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

export const VirtualTours = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(monasteries[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const viewerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleViewArchives = useCallback(() => {
    navigate(`/archives?monastery=${encodeURIComponent(selectedMonastery.name)}`);
  }, [navigate, selectedMonastery.name]);

  const handleAudioGuide = useCallback(() => {
    navigate(`/audio-guides?monastery=${encodeURIComponent(selectedMonastery.name)}`);
  }, [navigate, selectedMonastery.name]);

  const handleMonasterySelect = useCallback((monastery: typeof monasteries[0]) => {
    setIsLoading(true);
    setSelectedMonastery(monastery);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleStartTour = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-6 lg:pb-8 bg-gradient-to-br from-monastery-gold/10 to-background dark:from-monastery-gold/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-foreground">
              <span className="bg-gradient-monastery bg-clip-text text-transparent">Virtual Tours</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Step inside Sikkim’s sacred monasteries with 360° experiences — wander through ancient halls, prayer rooms, and uncover centuries of living spiritual heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Monastery List */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Choose a Monastery</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {isMobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  <span>{isMobile ? 'Mobile' : 'Desktop'} View</span>
                </div>
              </div>
              <div className="space-y-3 max-h-96 lg:max-h-none overflow-y-auto">
                {monasteries.map((monastery) => (
                  <Card 
                    key={monastery.id}
                    className={`p-3 lg:p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                      selectedMonastery.id === monastery.id ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : ''
                    }`}
                    onClick={() => handleMonasterySelect(monastery)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-monastery rounded-lg flex items-center justify-center text-white font-bold text-sm lg:text-base">
                        {monastery.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 text-sm lg:text-base truncate">{monastery.name}</h3>
                        <div className="flex items-center text-xs lg:text-sm text-muted-foreground mb-1">
                          <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{monastery.location}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                          <span>Est. {monastery.established}</span>
                        </div>
                        {monastery.tourUrl && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            360° Tour Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Virtual Tour Viewer */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                {/* Tour Player */}
                <div ref={viewerRef} className={`relative ${isMobile ? 'h-64' : 'h-96'} bg-gradient-mountain flex items-center justify-center`}>
                  {isLoading ? (
                    <div className="text-center text-white">
                      <Loader2 className="w-12 h-12 animate-spin mb-4 mx-auto" />
                      <h3 className="text-lg font-semibold mb-2">Loading 360° Tour...</h3>
                      <p className="text-white/80">Preparing immersive experience</p>
                    </div>
                  ) : selectedMonastery.tourUrl ? (
                    <iframe
                      src={selectedMonastery.tourUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${selectedMonastery.name} 360° Tour`}
                      onLoad={() => setIsLoading(false)}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-presentation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      frameBorder="0"
                      scrolling="no"
                    />
                  ) : (
                    <div className="text-center text-white p-6">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/30 transition-colors cursor-pointer">
                        <Play className="w-6 h-6 lg:w-8 lg:h-8 ml-1" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-semibold mb-2">Start 360° Virtual Tour</h3>
                      <p className="text-white/80 text-sm lg:text-base">Experience {selectedMonastery.name} in immersive detail</p>
                      <p className="text-white/60 text-xs mt-2">Tour coming soon</p>
                    </div>
                  )}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-monastery-gold text-monastery-maroon text-xs lg:text-sm">
                      360° Experience
                    </Badge>
                  </div>
                </div>

                {/* Monastery Info */}
                <div className="p-4 lg:p-6">
                  <div className="mb-4">
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground">{selectedMonastery.name}</h2>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm lg:text-base">Location & History</h4>
                      <p className="text-muted-foreground text-xs lg:text-sm mb-2">
                        <MapPin className="inline w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        {selectedMonastery.location}
                      </p>
                      <p className="text-muted-foreground text-xs lg:text-sm mb-3">
                        <Calendar className="inline w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        Established {selectedMonastery.established}
                      </p>
                      <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">{selectedMonastery.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm lg:text-base">Architecture & Significance</h4>
                      <p className="text-muted-foreground text-xs lg:text-sm mb-2">
                        <strong>Architecture:</strong> {selectedMonastery.architecture}
                      </p>
                      <p className="text-muted-foreground text-xs lg:text-sm mb-3">
                        <strong>Significance:</strong> {selectedMonastery.significance}
                      </p>
                      <div>
                        <p className="text-xs lg:text-sm font-medium text-foreground mb-2">Major Festivals:</p>
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {selectedMonastery.festivals.map((festival, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {festival}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                    <Button 
                      variant="monastery" 
                      className="w-full h-10 lg:h-11 text-sm lg:text-base"
                      disabled={!selectedMonastery.tourUrl || isLoading}
                      onClick={handleStartTour}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {selectedMonastery.tourUrl ? 'Start Tour' : 'Coming Soon'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-10 lg:h-11 text-sm lg:text-base"
                      onClick={handleAudioGuide}
                    >
                      Audio Guide
                    </Button>
                    <Button 
                      variant="spiritual" 
                      className="w-full h-10 lg:h-11 text-sm lg:text-base"
                      onClick={handleViewArchives}
                    >
                      View Archives
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Tour Features */}
              <div className="mt-6 lg:mt-8 grid sm:grid-cols-2 gap-4 lg:gap-6">
                <Card className="p-4 lg:p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-sm lg:text-base">Tour Features</h3>
                  <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      360° panoramic views
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Multi-language narration
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Interactive hotspots
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Historical timeline
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Sacred artifact highlights
                    </li>
                  </ul>
                </Card>

                <Card className="p-4 lg:p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-sm lg:text-base">Technical Info</h3>
                  <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      4K resolution imagery
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      VR headset compatible
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Mobile optimized
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Offline mode available
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      Bookmark favorite spots
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualTours;