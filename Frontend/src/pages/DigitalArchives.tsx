import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Eye, BookOpen, Image, FileText, Calendar, Shield, Lock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ImageViewModal } from "@/components/ImageViewModal";
import { archiveItems, getArchiveStatistics, type ArchiveItem } from "@/data/archives";
import { useSearchParams } from "react-router-dom";

export const DigitalArchives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const monasteryParam = searchParams.get('monastery');

  // Set search term from URL parameter on component mount
  useEffect(() => {
    if (monasteryParam) {
      setSearchTerm(monasteryParam);
    }
  }, [monasteryParam]);

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.monastery.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "manuscript": return <BookOpen className="w-4 h-4" />;
      case "mural": return <Image className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
      case "photograph": return <Eye className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "manuscript": return "bg-monastery-gold/20 text-monastery-maroon";
      case "mural": return "bg-mountain-blue/20 text-mountain-blue";
      case "document": return "bg-muted text-muted-foreground";
      case "photograph": return "bg-primary/20 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getAccessLevelIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case "public": return null;
      case "restricted": return <Shield className="w-3 h-3" />;
      case "monastery-only": return <Lock className="w-3 h-3" />;
      default: return null;
    }
  };

  const getAccessLevelColor = (accessLevel: string) => {
    switch (accessLevel) {
      case "public": return "bg-green-100 text-green-800";
      case "restricted": return "bg-yellow-100 text-yellow-800";
      case "monastery-only": return "bg-red-100 text-red-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "fair": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const stats = getArchiveStatistics();

  const handleViewItem = (item: ArchiveItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-monastery-gold/10 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-monastery bg-clip-text text-transparent">Digital Archives</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore centuries of preserved manuscripts, murals, documents, and photographs 
              from Sikkim's monasteries with AI-powered search and categorization.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search archives by title, monastery, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setSearchTerm("")}
                disabled={!searchTerm}
              >
                Clear Search
              </Button>
            </div>
          </div>

          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="manuscript">Manuscripts</TabsTrigger>
              <TabsTrigger value="mural">Murals</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
              <TabsTrigger value="photograph">Photographs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} of {archiveItems.length} archived items
          </p>
        </div>

        {/* Archive Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No archive items found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `No results found for "${searchTerm}". Try adjusting your search terms.`
                : "No items match the selected filter."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-monastery transition-all duration-300 group">
              {/* Item Preview */}
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-6xl text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300">
                    {getTypeIcon(item.type)}
                  </div>
                )}
                {!item.digitized && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive" className="text-xs">
                      Not Digitized
                    </Badge>
                  </div>
                )}
                {item.digitized && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-monastery-gold text-monastery-maroon text-xs">
                      Available
                    </Badge>
                  </div>
                )}
                {item.accessLevel !== "public" && (
                  <div className="absolute top-3 left-3">
                    <Badge className="text-xs">
                      {getAccessLevelIcon(item.accessLevel)}
                      {item.accessLevel === "restricted" ? "Restricted" : "Monastery Only"}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-2 text-sm sm:text-base flex-1">{item.title}</h3>
                  <Badge className="ml-2 text-xs flex-shrink-0">
                    {capitalizeFirst(item.type)}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {item.monastery}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Language: {item.language}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {item.category}
                  </div>
                  <div className="text-sm">
                    Condition: <span className="font-medium">
                      {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                    </span>
                  </div>
                  {item.dimensions && (
                    <div className="text-sm text-muted-foreground">
                      Dimensions: {item.dimensions}
                    </div>
                  )}
                  {item.material && (
                    <div className="text-sm text-muted-foreground">
                      Material: {item.material}
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {item.digitized ? (
                    <Button 
                      variant="monastery" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewItem(item)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1" disabled>
                      Pending Digitization
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}

        {/* Archive Statistics */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-monastery-gold mb-2">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-mountain-blue mb-2">{stats.digitized}</div>
            <div className="text-sm text-muted-foreground">Digitized</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.monasteries}</div>
            <div className="text-sm text-muted-foreground">Monasteries</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{stats.languages}</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </Card>
        </div>
      </div>

      {/* Image View Modal */}
      <ImageViewModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DigitalArchives;
