import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/overview", label: "Overview" },
  {
    label: "Calendar",
    dropdown: [
      { to: "/timetable", label: "Timetable" },
      { to: "/exams", label: "Tests & Exams" },
      // { to: "/events", label: "Events" },
    ],
  },
  { to: "/courses", label: "Courses" },
  { to: "/materials", label: "Materials" },
];


const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);


  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2 select-none">
          <motion.span
            className="font-mono text-2xl font-medium text-black tracking-tight"
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: [-10, 0], scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 120,
              damping: 8,
              delay: 0.1,
            }}
            whileHover={{
              scale: 1.15,
              transition: { type: "spring", stiffness: 300, damping: 12 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              <span className="text-blue-600">C</span>
              <span className="inline-block -mx-0.5 rotate-12 text-green-600">S</span>
              <span className="inline-block mx-0.5 -rotate-6 text-yellow-600">C</span>
              <span className="text-black">techies</span>
              <span className="ml-1 text-xs align-super text-gray-400">∑</span>
            </span>
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 font-mono">
          {links.map((link) => {
            if ("dropdown" in link) {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="cursor-pointer" size="sm">
                      {link.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    asChild
                    className="w-48"
                    side="bottom"
                    align="start"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.dropdown?.map((item) => (
                        <DropdownMenuItem asChild className="cursor-pointer" key={item.to}>
                          <Link to={item.to}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            const isActive = location.pathname === link.to;
            return (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button variant={isActive ? "default" : "outline"} size="sm" asChild>
                  <Link to={link.to!}>{link.label}</Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" /> // X icon
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger icon
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="font-mono flex flex-col px-6 py-4 space-y-3">
              {links.map((link) => {
                const isActive = location.pathname === link.to;

                if ("dropdown" in link) {
                  const isOpen = openMobileDropdown === link.label;

                  return (
                    <div key={link.label} className="flex flex-col space-y-1">
                        <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center cursor-pointer"
                        onClick={() =>
                          setOpenMobileDropdown(isOpen ? null : link.label)
                        }
                        >
                        {link.label}
                        </Button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {link.dropdown?.map((item) => (
                              <Button
                                key={item.to}
                                variant={
                                  location.pathname === item.to
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                className="w-full justify-start"
                                asChild
                                onClick={() => setMobileOpen(false)}
                              >
                                <Link to={item.to}>{item.label}</Link>
                              </Button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Button
                    key={link.to}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    asChild
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to={link.to!}>{link.label}</Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </nav>
  );
};

export default Navbar;
