import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "You Need to Validate Your Idea with a Real Product",
    description: "Build an MVP to test the market, attract early adopters, and secure funding without over-engineering.",
    icon: "/assets/You-Need-to-Validate-Your-Idea-with-a-Real-Product.svg",
    href: "#",
  },
  {
    title: "You Need to Accelerate Your Software Roadmap",
    description: "Augment your existing team with specialized engineering talent to meet tight deadlines and deliver features faster.",
    icon: "/assets/You-need-to-accelerate-your-software-roadmap-1.svg",
    href: "#",
  },
  {
    title: "You Need to Modernise Legacy Systems",
    description: "Upgrade outdated applications to modern tech stacks for improved performance, security, and scalability.",
    icon: "/assets/You-need-to-modernise-legacy-systems.svg",
    href: "#",
  },
  {
    title: "Scale Your India Engineering Center",
    description: "Build, operate, and scale your dedicated engineering center in India with full operational control.",
    icon: "/assets/Scale-Your-India-Engineering-Center.svg",
    href: "#",
  },
  {
    title: "You Need to Ship AI into Production",
    description: "Integrate generative AI and machine learning models into your existing applications to automate workflows.",
    icon: "/assets/You-Need-to-Ship-AI-into-Production.svg",
    href: "#",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 text-[#333333]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#05164d]">
            How Can We Help You?
          </h2>
          <p className="text-lg text-gray-600">
            Whether you are a startup validating an idea or an enterprise modernizing systems, we have the engineering muscle to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-shadow group flex flex-col h-full"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-lg bg-[#f0f4ff] flex items-center justify-center p-3 text-[#0c33b3]">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={40} 
                    height={40} 
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#05164d] group-hover:text-[#0c33b3] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {service.description}
              </p>
              <Link 
                href={service.href} 
                className="inline-flex items-center text-[#0c33b3] font-semibold hover:text-[#04aa6d] transition-colors mt-auto"
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
