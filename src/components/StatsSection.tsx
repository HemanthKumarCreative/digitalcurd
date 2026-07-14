export default function StatsSection() {
  const stats = [
    { label: "Years of Experience", value: "19+" },
    { label: "Projects Launched", value: "4200+" },
    { label: "Satisfied Clients", value: "2500+" },
    { label: "Client Retention", value: "97%" },
  ];

  return (
    <section className="py-16 bg-[#04aa6d] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.value}</span>
              <span className="text-sm md:text-base font-medium opacity-90 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
