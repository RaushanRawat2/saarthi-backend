import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ZoomIn, ZoomOut, RotateCw, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { ArchiveItem } from "@/data/archives";

interface ImageViewModalProps {
  item: ArchiveItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageViewModal = ({ item, isOpen, onClose }: ImageViewModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  // Get the images to display - use galleryImages if available, otherwise fallback to imageUrl
  const images = item.galleryImages && item.galleryImages.length > 0 
    ? item.galleryImages 
    : item.imageUrl 
    ? [item.imageUrl] 
    : [];

  const currentImage = images[currentImageIndex];

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${currentImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
    setZoom(1);
    setRotation(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">{item.title}</DialogTitle>
              {images.length > 1 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Image {currentImageIndex + 1} of {images.length}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="monastery"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="w-4 h-4 mr-2" />
                {showInfo ? 'Hide Info' : 'Show Info'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Image Viewer */}
          <div className="flex-1 relative bg-black/5 overflow-hidden">
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-monastery-maroon/90 backdrop-blur-sm hover:bg-sunrise hover:text-sunset dark:bg-monastery-maroon/90 dark:text-white dark:hover:bg-sunrise dark:hover:text-sunset"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-monastery-maroon/90 backdrop-blur-sm hover:bg-sunrise hover:text-sunset dark:bg-monastery-maroon/90 dark:text-white dark:hover:bg-sunrise dark:hover:text-sunset"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div
                className="relative max-w-full max-h-full transition-transform duration-200"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              >
                <img
                  src={currentImage}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Image Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg dark:bg-sunrise/20 dark:text-sunrise">
              <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5} className="hover:bg-sunrise hover:text-sunset dark:hover:bg-sunrise dark:hover:text-sunset">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center dark:text-sunrise">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 3} className="hover:bg-sunrise hover:text-sunset dark:hover:bg-sunrise dark:hover:text-sunset">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1 dark:bg-sunrise/30" />
              <Button variant="outline" size="sm" onClick={handleRotate} className="hover:bg-sunrise hover:text-sunset dark:hover:bg-sunrise dark:hover:text-sunset">
                <RotateCw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView} className="hover:bg-sunrise hover:text-sunset dark:hover:bg-sunrise dark:hover:text-sunset">
                Reset
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg dark:bg-sunrise/20">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setZoom(1);
                      setRotation(0);
                    }}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary shadow-md dark:border-sunrise' 
                        : 'border-transparent hover:border-primary/50 dark:hover:border-sunrise/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div className="lg:w-80 border-l bg-background overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-semibold mb-3">Item Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Type:</span>
                      <Badge className="ml-2">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Monastery:</span>
                      <span className="ml-2">{item.monastery}</span>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{item.date}</span>
                    </div>
                    <div>
                      <span className="font-medium">Language:</span>
                      <span className="ml-2">{item.language}</span>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{item.category}</span>
                    </div>
                    <div>
                      <span className="font-medium">Condition:</span>
                      <span className={`ml-2 font-medium ${
                        item.condition === 'excellent' ? 'text-green-600' :
                        item.condition === 'good' ? 'text-blue-600' :
                        item.condition === 'fair' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                      </span>
                    </div>
                    {item.dimensions && (
                      <div>
                        <span className="font-medium">Dimensions:</span>
                        <span className="ml-2">{item.dimensions}</span>
                      </div>
                    )}
                    {item.material && (
                      <div>
                        <span className="font-medium">Material:</span>
                        <span className="ml-2">{item.material}</span>
                      </div>
                    )}
                    {item.artist && (
                      <div>
                        <span className="font-medium">Artist:</span>
                        <span className="ml-2">{item.artist}</span>
                      </div>
                    )}
                    {item.provenance && (
                      <div>
                        <span className="font-medium">Provenance:</span>
                        <span className="ml-2">{item.provenance}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Access Level */}
                <div>
                  <h3 className="font-semibold mb-3">Access Level</h3>
                  <Badge 
                    className={
                      item.accessLevel === 'public' ? 'bg-green-100 text-green-800' :
                      item.accessLevel === 'restricted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {item.accessLevel === 'public' ? 'Public Access' :
                     item.accessLevel === 'restricted' ? 'Restricted Access' :
                     'Monastery Only'}
                  </Badge>
                </div>

              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
