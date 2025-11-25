export const Impact = () => {
  const impacts = [
    {
      number: "200+",
      label: "Historic Monasteries",
      description: "Dating back to 17th & 18th centuries"
    },
    {
      number: "500+",
      label: "Years of History",
      description: "Preserved for future generations"
    },
    {
      number: "Global",
      label: "Educational Access",
      description: "Supporting spiritual exploration worldwide"
    },
    {
      number: "Local",
      label: "Community Empowerment",
      description: "Through participatory archiving"
    }
  ];

  return (
    <section className="py-24 bg-gradient-spiritual text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-monastery-gold rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-sunrise rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cultural <span className="text-monastery-gold">Impact</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Monastery360 is more than a platform—it's a bridge between ancient wisdom 
            and modern accessibility, preserving invaluable cultural heritage for generations to come
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-500"
            >
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-monastery-gold mb-2 group-hover:animate-glow">
                  {impact.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{impact.label}</h3>
                <p className="text-white/80">{impact.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Why Monastery360 Matters</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-monastery-gold rounded-full flex items-center justify-center mt-1">
                  <span className="text-monastery-maroon font-bold text-sm">✓</span>
                </div>
                <p className="text-white/90">
                  <strong>Tourism Growth:</strong> Makes monasteries more accessible, boosting sustainable cultural tourism
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-monastery-gold rounded-full flex items-center justify-center mt-1">
                  <span className="text-monastery-maroon font-bold text-sm">✓</span>
                </div>
                <p className="text-white/90">
                  <strong>Cultural Preservation:</strong> Digitally preserves endangered cultural assets and manuscripts
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-monastery-gold rounded-full flex items-center justify-center mt-1">
                  <span className="text-monastery-maroon font-bold text-sm">✓</span>
                </div>
                <p className="text-white/90">
                  <strong>Global Education:</strong> Enables worldwide access to spiritual and historical knowledge
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-monastery-gold rounded-full flex items-center justify-center mt-1">
                  <span className="text-monastery-maroon font-bold text-sm">✓</span>
                </div>
                <p className="text-white/90">
                  <strong>Community Involvement:</strong> Empowers local communities in preserving their heritage
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold mb-4 text-monastery-gold">Vision Statement</h4>
              <p className="text-white/90 leading-relaxed mb-6">
                "To create a digital bridge between the sacred traditions of Sikkim's monasteries 
                and the modern world, ensuring that the spiritual wisdom and cultural heritage 
                of the Himalayas remains accessible and preserved for future generations."
              </p>
              <div className="w-full h-1 bg-gradient-monastery rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};