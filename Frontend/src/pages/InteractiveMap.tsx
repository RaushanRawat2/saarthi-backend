import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation as NavigationIcon, Calendar, ExternalLink, Search, Clock, Phone, Globe, Mountain, Users, Camera, Car, Bus, Plane } from "lucide-react";
import { monasteries, Monastery } from "@/data/monasteries";
import { Navigation } from "@/components/Navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom styles for monastery markers
const markerStyles = `
  .monastery-marker {
    background: transparent !important;
    border: none !important;
  }
  .monastery-marker div {
    transition: all 0.2s ease;
  }
  .monastery-marker:hover div {
    transform: scale(1.1);
  }
`;

// Fix for Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom monastery icon
const monasteryIcon = new L.DivIcon({
  className: "monastery-marker",
  html: `<div class="w-8 h-8 bg-monastery-gold rounded-full flex items-center justify-center shadow-lg border-2 border-white">
    <svg class="w-4 h-4 text-monastery-maroon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Component to handle map view changes
const MapController = ({ selectedMonastery }: { selectedMonastery: Monastery }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([selectedMonastery.coordinates.lat, selectedMonastery.coordinates.lng], 12);
  }, [selectedMonastery, map]);
  
  return null;
};

export const InteractiveMap = () => {
  const [selectedMonastery, setSelectedMonastery] = useState(monasteries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapCenter] = useState([27.3200, 88.5000]); // Center of Sikkim to show all monasteries

  // Inject custom styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = markerStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const filteredMonasteries = monasteries.filter(monastery =>
    monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.significance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.architecture.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Sort monasteries by distance from selected monastery
  const sortedMonasteries = [...filteredMonasteries].sort((a, b) => {
    if (a.id === selectedMonastery.id) return -1;
    if (b.id === selectedMonastery.id) return 1;
    
    const distanceA = calculateDistance(
      selectedMonastery.coordinates.lat,
      selectedMonastery.coordinates.lng,
      a.coordinates.lat,
      a.coordinates.lng
    );
    const distanceB = calculateDistance(
      selectedMonastery.coordinates.lat,
      selectedMonastery.coordinates.lng,
      b.coordinates.lat,
      b.coordinates.lng
    );
    
    return distanceA - distanceB;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-monastery-gold/10 to-background dark:from-monastery-gold/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-monastery bg-clip-text text-transparent">Interactive Map</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Sikkim's sacred monasteries with our interactive map. Get directions, 
              plan your pilgrimage, and discover hidden spiritual gems.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[370px_1fr] gap-6 lg:gap-8">
          {/* Search and Monastery List */}
          <div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search monasteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3 h-[400px] sm:h-[540px] overflow-y-auto">
              {sortedMonasteries.map((monastery) => {
                const distance = monastery.id !== selectedMonastery.id 
                  ? calculateDistance(
                      selectedMonastery.coordinates.lat,
                      selectedMonastery.coordinates.lng,
                      monastery.coordinates.lat,
                      monastery.coordinates.lng
                    ).toFixed(1)
                  : null;
                
                return (
                  <Card
                    key={monastery.id}
                    className={`p-3 sm:p-4 cursor-pointer transition-all hover:shadow-peaceful border border-border rounded-md ${
                      selectedMonastery.id === monastery.id ? 'ring-2 ring-mountain-blue shadow-peaceful' : ''
                    }`}
                    onClick={() => setSelectedMonastery(monastery)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base truncate pr-2">{monastery.name}</h3>
                      {distance && (
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {distance} km
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{monastery.location}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2">
                      <Mountain className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{monastery.travelInfo.altitude}</span>
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        Est. {monastery.established}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {monastery.travelInfo.entryFee}
                      </Badge>
                    </div>
                    {/* Page Links */}
                    <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs">
                      <Link
                        to={`/archives?monastery=${encodeURIComponent(monastery.name)}`}
                        className="underline text-foreground/80 hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Digital Archives
                      </Link>
                      <Link
                        to={`/audio-guides?monastery=${encodeURIComponent(monastery.name)}`}
                        className="underline text-foreground/80 hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Audio Guides
                      </Link>
                      <Link
                        to={`/calendar`}
                        className="underline text-foreground/80 hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Cultural Calendar
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Map Area */}
          <div className="order-first lg:order-last">
            <Card className="overflow-hidden">
              {/* Real Interactive Map */}
              <div className="h-64 sm:h-80 lg:h-96 w-full">
                <MapContainer
                  center={mapCenter}
                  zoom={9}
                  style={{ height: "100%", width: "100%" }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Monastery Markers */}
                  {monasteries.map((monastery) => (
                    <Marker
                      key={monastery.id}
                      position={[monastery.coordinates.lat, monastery.coordinates.lng]}
                      icon={monastery.id === selectedMonastery.id ? monasteryIcon : L.divIcon({
                        className: "monastery-marker",
                        html: `<div class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-monastery-maroon cursor-pointer hover:scale-110 transition-transform">
                          <svg class="w-3 h-3 text-monastery-maroon" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                        </div>`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12],
                      })}
                      eventHandlers={{
                        click: () => setSelectedMonastery(monastery),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold text-sm mb-1">{monastery.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{monastery.location}</p>
                          <p className="text-xs text-gray-500">{monastery.established}</p>
                          <Button 
                            size="sm" 
                            className="mt-2 w-full"
                            onClick={() => setSelectedMonastery(monastery)}
                          >
                            View Details
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  <MapController selectedMonastery={selectedMonastery} />
                </MapContainer>
              </div>

              {/* Monastery Details */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{selectedMonastery.name}</h2>
                    <div className="flex items-center text-muted-foreground mb-2 text-sm">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{selectedMonastery.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-2 text-sm">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Established {selectedMonastery.established}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Mountain className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Altitude: {selectedMonastery.travelInfo.altitude}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                      <Link to={`/archives?monastery=${encodeURIComponent(selectedMonastery.name)}`}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Digital Archives</span>
                        <span className="sm:hidden">Archives</span>
                      </Link>
                    </Button>
                    <Button 
                      variant="monastery" 
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMonastery.coordinates.lat},${selectedMonastery.coordinates.lng}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <NavigationIcon className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{selectedMonastery.description}</p>

                {/* Key Information */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Significance
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedMonastery.significance}</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Mountain className="w-4 h-4 mr-2" />
                      Architecture
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedMonastery.architecture}</p>
                  </Card>
                  
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Festivals
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMonastery.festivals.map((festival, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {festival}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Travel Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      Travel Options
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Car className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">By Car:</span>
                          <span className="text-foreground ml-2">{selectedMonastery.travelInfo.byCar}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Bus className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">By Bus:</span>
                          <span className="text-foreground ml-2">{selectedMonastery.travelInfo.byBus}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Plane className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Nearest Airport:</span>
                          <span className="text-foreground ml-2">{selectedMonastery.travelInfo.nearestAirport}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Visit Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best Time:</span>
                        <span className="text-foreground">{selectedMonastery.travelInfo.bestTimeToVisit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entry Fee:</span>
                        <span className="text-foreground">{selectedMonastery.travelInfo.entryFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visiting Hours:</span>
                        <span className="text-foreground">{selectedMonastery.travelInfo.visitingHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Photography:</span>
                        <span className="text-foreground flex items-center">
                          <Camera className="w-3 h-3 mr-1" />
                          {selectedMonastery.travelInfo.photography}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Facilities and Nearby Attractions - removed as requested */}

                {/* Contact Information - removed as requested */}

                {/* Nearby Monasteries */}
                <Card className="p-4 bg-muted/50 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Nearby Monasteries</h4>
                  <div className="space-y-2">
                    {sortedMonasteries.slice(1, 4).map((monastery) => {
                      const distance = calculateDistance(
                        selectedMonastery.coordinates.lat,
                        selectedMonastery.coordinates.lng,
                        monastery.coordinates.lat,
                        monastery.coordinates.lng
                      ).toFixed(1);
                      
                      return (
                        <div 
                          key={monastery.id}
                          className="flex justify-between items-center p-2 rounded hover:bg-background/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedMonastery(monastery)}
                        >
                          <div>
                            <span className="text-sm font-medium">{monastery.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{monastery.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {distance} km
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <NavigationIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="monastery" asChild>
                    <Link to={`/tours?monastery=${encodeURIComponent(selectedMonastery.name)}`}>
                      Start Virtual Tour
                    </Link>
                  </Button>
                  <Button variant="spiritual" asChild>
                    <Link to={`/archives?monastery=${encodeURIComponent(selectedMonastery.name)}`}>
                      View Archives
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/audio-guides?monastery=${encodeURIComponent(selectedMonastery.name)}`}>
                      Audio Guide
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMonastery.coordinates.lat},${selectedMonastery.coordinates.lng}`;
                      window.open(url, '_blank');
                    }}
                  >
                    Plan Route
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;