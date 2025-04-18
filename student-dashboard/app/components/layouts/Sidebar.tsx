"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, 
  BookText, 
  Home, 
  Microscope, 
  GalleryVerticalEnd,
  Languages,
  GraduationCap,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

// Define the navigation items
const navItems = [
  { 
    title: "Home", 
    path: "/", 
    icon: Home 
  },
  { 
    title: "Math", 
    icon: Calculator,
    subMenu: [
      { title: "Algebra 1", path: "/mathematics/algebra-1" },
      { title: "Algebra 2", path: "/mathematics/algebra-2" },
      { title: "Geometry", path: "/mathematics/geometry" },
      { title: "Trigonometry", path: "/mathematics/trigonometry" },
      { title: "Pre-Calculus", path: "/mathematics/pre-calculus" },
      { title: "Calculus", path: "/mathematics/calculus" },
      { title: "AP Calculus", path: "/mathematics/ap-calculus" },
      { title: "Statistics", path: "/mathematics/statistics" },
    ]
  },
  { 
    title: "ELA", 
    icon: BookText,
    subMenu: [
      { title: "English 9-12", path: "/english/english-9-12" },
      { title: "AP Literature", path: "/english/ap-literature" },
      { title: "AP Language", path: "/english/ap-language" },
      { title: "Creative Writing", path: "/english/creative-writing" },
    ]
  },
  { 
    title: "Science", 
    icon: Microscope,
    subMenu: [
      { title: "Biology", path: "/science/biology" },
      { title: "Chemistry", path: "/science/chemistry" },
      { title: "Physics", path: "/science/physics" },
      { title: "Earth Science", path: "/science/earth-science" },
      { title: "Environmental Science", path: "/science/environmental" },
      { title: "AP Biology", path: "/science/ap-biology" },
      { title: "AP Chemistry", path: "/science/ap-chemistry" },
      { title: "AP Physics", path: "/science/ap-physics" },
    ]
  },
  { 
    title: "History", 
    icon: GalleryVerticalEnd,
    subMenu: [
      { title: "World History", path: "/history/world" },
      { title: "US History", path: "/history/us" },
      { title: "Government", path: "/history/government" },
      { title: "Economics", path: "/history/economics" },
      { title: "AP US History", path: "/history/ap-us" },
      { title: "AP World History", path: "/history/ap-world" },
      { title: "AP Government", path: "/history/ap-government" },
    ]
  },
  { 
    title: "Language", 
    icon: Languages,
    subMenu: [
      { title: "Spanish 1", path: "/languages/spanish-1" },
      { title: "Spanish 2", path: "/languages/spanish-2" },
      { title: "Spanish 3", path: "/languages/spanish-3" },
      { title: "French 1", path: "/languages/french-1" },
      { title: "French 2", path: "/languages/french-2" },
      { title: "Mandarin", path: "/languages/mandarin" },
      { title: "Latin", path: "/languages/latin" },
    ]
  },
];

type NavItemProps = {
  item: {
    title: string;
    path?: string;
    icon: any;
    subMenu?: { title: string; path: string }[];
  };
  isActive: boolean;
};

const NavItem = ({ item, isActive }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if any submenu item is active
  const isSubMenuActive = item.subMenu?.some(subItem => pathname === subItem.path);
  
  // Automatically open the submenu if any of its items are active
  useState(() => {
    if (isSubMenuActive) {
      setIsOpen(true);
    }
  });

  if (item.subMenu) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
            isSubMenuActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span className="flex-1">{item.title}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <div className="mt-1 ml-6 space-y-1">
            {item.subMenu.map((subItem) => (
              <Link
                key={subItem.path}
                href={subItem.path}
                className={`block px-4 py-2 rounded-md ${
                  pathname === subItem.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.path || "#"}
      className={`flex items-center px-4 py-2 mb-1 rounded-md ${
        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span>{item.title}</span>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-[var(--sidebar-width)] h-screen bg-gray-900 border-r border-gray-800 p-4 overflow-auto">
      <div className="flex items-center mb-8 px-4">
        <GraduationCap className="w-8 h-8 text-blue-500 mr-3" />
        <h1 className="text-xl font-bold text-white">Student Central</h1>
      </div>
      
      <nav>
        {navItems.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            isActive={pathname === item.path}
          />
        ))}
      </nav>
    </div>
  );
} 