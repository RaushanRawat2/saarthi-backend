import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/monastery-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Traditional Buddhist monastery in Sikkim mountains"
          className="w-full h-full object-cover object-center scale-110  brightness-90 transition-transform duration-700 ease-out hover:scale-125"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-monastery-maroon/30 to-mountain-blue/30 mix-blend-multiply"></div>
        {/* Extra decorative starry background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_70%)] animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-10 animate-fadeInUp">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-monastery-gold via-orange-300 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-textGlow">
              SAARTHI
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 leading-relaxed animate-fadeInUp delay-200">
            A Digital Heritage Platform for Sikkim's Sacred Monasteries
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto animate-fadeInUp delay-400">
            Discover Himalayan monasteries through virtual tours, rare archives, and timeless spiritual treasures
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp delay-600">
          <Button
            variant="hero"
            size="xl"
             className="animate-glow hover:scale-105 transition-transform duration-800 shadow-lg"
            asChild
          >
            <Link to="/tours">Explore Virtual Tours</Link>
          </Button>
          <Button
            variant="spiritual"
            size="xl"
            className="hover:scale-105 transition-transform duration-300 shadow-lg"
            asChild
          >
            <Link to="/archives"> Discover Archives</Link>
          </Button>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-24 left-12 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-4 h-4 bg-monastery-gold rounded-full shadow-lg shadow-yellow-400/50 animate-ping"></div>
        </div>
        <div
          className="absolute bottom-36 right-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-3 h-3 bg-sunrise rounded-full shadow-md shadow-orange-400/50 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
