"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SEARCH_DATA } from "@/lib/search";

const navigationItems = [
  { name: "Home", href: "/" },
  {
    name: "Solutions",
    href: "/solutions",
    dropdown: [
      { name: "Network Solutions", href: "/solutions?tab=network" },
      { name: "Enterprise Mobility", href: "/solutions?tab=mobility" },
      { name: "Convergence Solutions", href: "/solutions?tab=convergence" },
      { name: "Collaboration Solutions", href: "/solutions?tab=collaboration" },
      { name: "Security Solutions", href: "/solutions?tab=security" },
      { name: "Enterprise Applications", href: "/solutions?tab=applications" },
      { name: "Managed Support", href: "/solutions?tab=support" },
      { name: "Cloud Solutions", href: "/solutions?tab=cloud" },
    ],
  },
  { name: "Portfolio", href: "/portfolio" },
  {
    name: "About",
    href: "/discover-us",
    dropdown: [
      { name: "Discover Us", href: "/discover-us" },
      { name: "Media", href: "/media" },
      { name: "Careers", href: "/careers" },
    ],
  },
  { name: "Reach Us", href: "/reach-us" },
];

const SearchComponent = ({
  onResultClick,
}: {
  onResultClick?: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; href: string }[]
  >([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = SEARCH_DATA.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, isMobile ? 5 : 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, isMobile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      window.location.href = searchResults[0].href;
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="pl-10 pr-4 w-full"
        />
      </form>
      {isSearchFocused && searchQuery && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-10">
          <Command>
            <CommandList>
              {searchResults.length > 0 ? (
                <CommandGroup>
                  {searchResults.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      passHref
                      onClick={() => {
                        onResultClick?.();
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                    >
                      <CommandItem className="cursor-pointer">
                        {item.name}
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
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
            <div className="hidden lg:flex items-center">
              <Link href="/" className="flex items-center mr-6">
                <Image
                  src="/task-logo.png"
                  alt="Task Systems"
                  width={100}
                  height={40}
                  style={{ height: "auto" }}
                  priority
                />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="max-w-xs w-full">
              <SearchComponent />
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-foreground hover:text-[#ffbb00] transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-[#ffbb00]/10 hover:text-[#ffbb00] transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center ml-8">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-9 w-9"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            {/* Mobile header */}
            <div className="flex items-center lg:hidden">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-9 w-9"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className=""
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-[90%] right-0 bg-background lg:hidden"
            >
              <div className="pb-4 space-y-2 max-h-screen overflow-y-auto">
                {/* Mobile Search */}
                <div className="md:hidden px-2 pb-2">
                  <SearchComponent onResultClick={() => setIsOpen(false)} />
                </div>

                {navigationItems.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-foreground hover:text-[#ffbb00] hover:bg-[#ffbb00]/10 rounded-md transition-colors duration-200"
                        onClick={() => {
                          if (!item.dropdown) {
                            setIsOpen(false);
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDropdownToggle(item.name)}
                          className="h-9 w-9"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.dropdown && openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 space-y-1"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-[#ffbb00] hover:bg-[#ffbb00]/10 rounded-md transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
