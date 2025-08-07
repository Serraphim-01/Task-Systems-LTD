"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const partners = [
  {
    name: "APC",
    logo: "/partners/apc.png",
    status: "Partner",
    link: "https://www.apc.com",
    services: ["Power Management", "Data Center Solutions"],
  },
  {
    name: "Apple",
    logo: "/partners/apple.png",
    status: "Partner",
    link: "https://www.apple.com",
    services: ["Enterprise Mobility", "Hardware"],
  },
  {
    name: "ASUS",
    logo: "/partners/asus.png",
    status: "Partner",
    link: "https://www.asus.com",
    services: ["Laptops", "Workstations"],
  },
  {
    name: "AWS",
    logo: "/partners/aws.png",
    status: "Partner",
    link: "https://aws.amazon.com",
    services: ["Cloud Solutions", "AI/ML"],
  },
  {
    name: "Cisco",
    logo: "/partners/cisco.svg",
    status: "Partner",
    link: "https://www.cisco.com",
    services: ["Network Solutions", "Security"],
  },
  {
    name: "Check Point",
    logo: "/partners/CP.png",
    status: "Partner",
    link: "https://www.checkpoint.com",
    services: ["Cybersecurity", "Threat Prevention"],
  },
  {
    name: "D-Link",
    logo: "/partners/d-link.jpeg",
    status: "Partner",
    link: "https://www.dlink.com",
    services: ["Networking Hardware", "Switches"],
  },
  {
    name: "Dell",
    logo: "/partners/dell.png",
    status: "Partner",
    link: "https://www.dell.com",
    services: ["Servers", "Storage"],
  },
  {
    name: "EMC",
    logo: "/partners/emc.png",
    status: "Partner",
    link: "https://www.delltechnologies.com",
    services: ["Data Storage", "Cloud Computing"],
  },
  {
    name: "HP",
    logo: "/partners/hp.png",
    status: "Partner",
    link: "https://www.hp.com",
    services: ["Printing Solutions", "Personal Systems"],
  },
  {
    name: "Hewlett Packard",
    logo: "/partners/hpe.png",
    status: "Partner",
    link: "https://www.hpe.com",
    services: ["Enterprise Solutions", "Hybrid Cloud"],
  },
  {
    name: "Huawei",
    logo: "/partners/huawei.png",
    status: "Partner",
    link: "https://www.huawei.com",
    services: ["ICT Infrastructure", "Smart Devices"],
  },
  {
    name: "IBM",
    logo: "/partners/ibm.png",
    status: "Partner",
    link: "https://www.ibm.com",
    services: ["AI", "Cloud Computing"],
  },
  {
    name: "Kaspersky",
    logo: "/partners/kaspersky.png",
    status: "Partner",
    link: "https://www.kaspersky.com",
    services: ["Cybersecurity", "Antivirus"],
  },
  {
    name: "Lenovo",
    logo: "/partners/lenovo.png",
    status: "Partner",
    link: "https://www.lenovo.com",
    services: ["Laptops", "Data Center"],
  },
  {
    name: "Logitech",
    logo: "/partners/logitech.png",
    status: "Partner",
    link: "https://www.logitech.com",
    services: ["Peripherals", "Video Conferencing"],
  },
  {
    name: "Microsoft",
    logo: "/partners/microsoft.png",
    status: "Partner",
    link: "https://www.microsoft.com",
    services: ["Software", "Cloud Services"],
  },
  {
    name: "Netapp",
    logo: "/partners/netapp.webp",
    status: "Partner",
    link: "https://www.netapp.com",
    services: ["Data Management", "Cloud Storage"],
  },
  {
    name: "Neverfail",
    logo: "/partners/Nf.jpg",
    status: "Partner",
    link: "https://www.neverfail.com",
    services: ["Business Continuity", "Disaster Recovery"],
  },
  {
    name: "Nokia",
    logo: "/partners/nokia_new.png",
    status: "Partner",
    link: "https://www.nokia.com",
    services: ["Telecommunications", "Networking"],
  },
  {
    name: "Oracle",
    logo: "/partners/oracle.png",
    status: "Partner",
    link: "https://www.oracle.com",
    services: ["Database", "Cloud Applications"],
  },
  {
    name: "Schneider Electric",
    logo: "/partners/Sch-ele.png",
    status: "Partner",
    link: "https://www.se.com",
    services: ["Energy Management", "Automation"],
  },
  {
    name: "Starlink",
    logo: "/partners/starlink.png",
    status: "Partner",
    link: "https://www.starlink.com",
    services: ["Satellite Internet", "Connectivity"],
  },
  {
    name: "Zebra",
    logo: "/partners/zebra.png",
    status: "Partner",
    link: "https://www.zebra.com",
    services: ["Barcode Scanners", "Mobile Computing"],
  },
];

export function PartnersSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver world-class solutions
          </p>
        </motion.div>

        <div className="relative overflow-hidden group">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -2500],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <Link
                href={`/partner/${partner.name.toLowerCase().replace(/ /g, "-")}`}
                key={`${partner.name}-${index}`}
                className="group relative flex-shrink-0 w-32 h-32 flex items-center justify-center bg-background rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center text-xs py-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Mobile scroll hint */}
        <p className="text-center text-sm text-muted-foreground mt-6 md:hidden">
          Scroll horizontally to see all partners
        </p>
      </div>
    </section>
  );
}