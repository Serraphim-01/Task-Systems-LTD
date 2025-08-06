"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navigationItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Solutions',
    href: '/solutions',
    dropdown: [
      { name: 'Network Solutions', href: '/solutions?tab=network' },
      { name: 'Enterprise Mobility', href: '/solutions?tab=mobility' },
      { name: 'Convergence Solutions', href: '/solutions?tab=convergence' },
      { name: 'Collaboration Solutions', href: '/solutions?tab=collaboration' },
      { name: 'Security Solutions', href: '/solutions?tab=security' },
      { name: 'Enterprise Applications', href: '/solutions?tab=applications' },
      { name: 'Managed Support', href: '/solutions?tab=support' },
      { name: 'Cloud Solutions', href: '/solutions?tab=cloud' },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  {
    name: 'About',
    href: '/discover-us',
    dropdown: [
      { name: 'Discover Us', href: '/discover-us' },
      { name: 'Media', href: '/media' },
      { name: 'Careers', href: '/careers' },
    ]
  },
  { name: 'Reach Us', href: '/reach-us' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center lg:hidden">
              <div className="text-2xl font-bold text-[#ffbb00]">
                Task Systems
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
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
                        className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
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

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-9 w-9"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            <div className="hidden lg:flex items-center">
              <Link href="/" className="flex items-center ml-6">
                <div className="text-2xl font-bold text-[#ffbb00]">
                  Task Systems
                </div>
              </Link>
            </div>
            {/* Mobile header */}
            <div className="flex items-center lg:hidden">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="h-9 w-9"
                >
                  {theme === 'dark' ? (
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
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full bg-background lg:hidden"
            >
              <div className="pb-4 space-y-2 max-h-screen overflow-y-auto">
                {/* Mobile Search */}
                <div className="md:hidden px-2 pb-2">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 w-full"
                    />
                  </form>
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
                          <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </Button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.dropdown && openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
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