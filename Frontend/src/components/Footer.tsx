import { Card } from "@/components/ui/card";
import { MapPin, Smartphone, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-monastery-maroon text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* App Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">App Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 bg-monastery-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-monastery-gold" />
              </div>
              <h3 className="font-semibold text-white mb-2">GPS & Beacon Integration</h3>
              <p className="text-sm text-white/80">
                Automatic guide activation based on your location within monastery grounds
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 bg-mountain-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-mountain-blue" />
              </div>
              <h3 className="font-semibold text-white mb-2">Offline Mode</h3>
              <p className="text-sm text-white/80">
                Download guides for use in remote areas without internet connectivity
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Multi-Language Support</h3>
              <p className="text-sm text-white/80">
                Audio guides available in English, Tibetan, Hindi, Nepali, and more
              </p>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-monastery-gold">SAARTHI</h3>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Preserving and sharing the sacred heritage of Sikkim's monasteries through 
              innovative digital technology and immersive experiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-monastery-gold transition-colors cursor-pointer">
                <span className="text-sm">📧</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-monastery-gold transition-colors cursor-pointer">
                <span className="text-sm">📱</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-monastery-gold transition-colors cursor-pointer">
                <span className="text-sm">🌐</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-monastery-gold">Platform</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/tours" className="hover:text-monastery-gold transition-colors">Virtual Tours</Link></li>
              <li><Link to="/archives" className="hover:text-monastery-gold transition-colors">Digital Archives</Link></li>
              <li><Link to="/map" className="hover:text-monastery-gold transition-colors">Interactive Map</Link></li>
              <li><Link to="/audio-guides" className="hover:text-monastery-gold transition-colors">Audio Guides</Link></li>
              <li><Link to="/calendar" className="hover:text-monastery-gold transition-colors">Cultural Calendar</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © SAARTHI. Preserving sacred heritage for future generations.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-monastery-gold text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-monastery-gold text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-monastery-gold text-sm transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};