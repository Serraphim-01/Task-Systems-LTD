"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Discover Us", href: "/discover-us" },
  { name: "Careers", href: "/careers" },
  { name: "Reach Us", href: "/reach-us" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center lg:hidden">
              <Image
                src="/task-logo.png"
                alt="Task Systems"
                width={100}
                height={40}
                style={{ height: "auto" }}
                priority
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-6">
              For more than three decades, Task has remained an industry leader
              with the implementation of various ICT projects in the Oil & Gas,
              Banking, Telecoms, Manufacturing and Public sectors.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors duration-200 hover-underline-animation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group-hover:animate-shake">
                <Mail className="h-5 w-5 text-[#ffbb00] mt-0.5 flex-shrink-0 animate-move-up-down shake-icon" />
                <a
                  href="mailto:engage@tasksystems.com"
                  className="text-muted-foreground transition-colors duration-200 hover-underline-animation"
                >
                  engage@tasksystems.com
                </a>
              </div>
              <div className="flex items-start space-x-3 group-hover:animate-shake">
                <Phone className="h-5 w-5 text-[#ffbb00] mt-0.5 flex-shrink-0 animate-move-up-down shake-icon" />
                <div className="space-y-1">
                  <div className="text-muted-foreground">+234 123 783 3843</div>
                  <div className="text-muted-foreground">+234 911 080 8619</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 group-hover:animate-shake">
                <MapPin className="h-5 w-5 text-[#ffbb00] mt-0.5 flex-shrink-0 animate-move-up-down shake-icon" />
                <div className="text-muted-foreground">
                  Yudala Heights Building
                  <br />
                  13 Idowu Martins Street,
                  <br />
                  Victoria Island, Lagos
                </div>
              </div>
            </div>
          </div>

          {/* Stay in Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Stay in Touch
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-[#ffbb00] transition-colors duration-200 group-hover:animate-shake"
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6 animate-move-up-down shake-icon" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center text-muted-foreground">
            © 2025 | Task Systems Limited
          </div>
        </div>
      </div>
    </footer>
  );
}
