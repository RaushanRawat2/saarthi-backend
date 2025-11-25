// Features.jsx
import React from "react";
import vrTourIcon from "@/assets/vr-tour-icon.jpg";
import digitalArchiveIcon from "@/assets/digital-archive-icon.jpg";
import interactiveMapIcon from "@/assets/interactive-map-icon.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: vrTourIcon,
    title: "Virtual Tours",
    description:
      "360° panoramic views of monastery interiors with narrated walkthroughs in multiple languages.",
    highlight: "Immersive Experience",
    link: "/tours",
  },
  {
    icon: interactiveMapIcon,
    title: "Interactive Map",
    description:
      "Geo-tagged monastery locations with travel routes and integration with local transport services.",
    highlight: "Smart Navigation",
    link: "/map",
  },
  {
    icon: digitalArchiveIcon,
    title: "Digital Archives",
    description:
      "Scanned manuscripts, murals, and historical documents with AI-powered search and categorization.",
    highlight: "Cultural Preservation",
    link: "/archives",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-monastery-gold/10 to-background dark:from-monastery-gold/20 dark:to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Preserving{" "}
            <span className="bg-gradient-monastery bg-clip-text text-transparent">
              Sacred Heritage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            SAARTHI blends modern innovation with timeless wisdom, offering a
            groundbreaking platform for digital preservation and immersive
            exploration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group block relative bg-card rounded-xl overflow-hidden shadow-peaceful hover:shadow-monastery transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gradient-monastery text-primary-foreground text-sm font-semibold rounded-full mb-3">
                    {feature.highlight}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-spiritual opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Additional Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-monastery-gold rounded-full mt-3 animate-glow"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Smart Audio Guide App
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    Location-based audio guides using Bluetooth beacons or GPS
                    with offline mode for remote areas.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/audio-guides">Explore Audio Guides</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-monastery-gold rounded-full mt-3 animate-glow"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Cultural Calendar
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    Events, festivals, and rituals schedule with booking and
                    participation options for tourists.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/calendar">View Calendar</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-monastery-gold rounded-full mt-3 animate-glow"></div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Community Archiving
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    Empowers local communities through participatory archiving
                    and digital preservation efforts.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/archives">Explore Archives</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
