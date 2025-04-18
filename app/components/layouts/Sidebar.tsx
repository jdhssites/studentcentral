"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, 
  LineChart, 
  Home, 
  Box, 
  Lightbulb, 
  BookOpen,
  Shapes,
  Binary,
  Atom,
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
    title: "Mathematics", 
    icon: Calculator,
    subMenu: [
      { title: "Algebraic Equations", path: "/tools/algebraic-equations" },
      { title: "Calculus", path: "/tools/calculus" },
      { title: "Statistics", path: "/tools/statistics" },
      { title: "Graph Visualizer", path: "/tools/graph-visualizer" },
    ]
  },
  { 
    title: "Physics", 
    icon: Atom,
    subMenu: [
      { title: "Mechanics", path: "/tools/mechanics" },
      { title: "Electricity", path: "/tools/electricity" },
      { title: "Optics", path: "/tools/optics" },
    ]
  },
  { 
    title: "Computer Science", 
    icon: Binary,
    subMenu: [
      { title: "Data Structures", path: "/tools/data-structures" },
      { title: "Algorithms", path: "/tools/algorithms" },
      { title: "Binary Conversion", path: "/tools/binary-conversion" },
    ]
  },
  { 
    title: "Geometry", 
    icon: Shapes,
    subMenu: [
      { title: "2D Shapes", path: "/tools/2d-shapes" },
      { title: "3D Models", path: "/tools/3d-models" },
      { title: "Coordinate Geometry", path: "/tools/coordinate-geometry" },
    ]
  },
  { 
    title: "Chemistry", 
    icon: Lightbulb,
    subMenu: [
      { title: "Periodic Table", path: "/tools/periodic-table" },
      { title: "Chemical Equations", path: "/tools/chemical-equations" },
      { title: "Molecular Viewer", path: "/tools/molecular-viewer" },
    ]
  },
  { 
    title: "Biology", 
    icon: LineChart,
    subMenu: [
      { title: "Cell Structure", path: "/tools/cell-structure" },
      { title: "Genetics", path: "/tools/genetics" },
      { title: "Ecology", path: "/tools/ecology" },
    ]
  },
  { 
    title: "Literature", 
    icon: BookOpen,
    subMenu: [
      { title: "Citation Generator", path: "/tools/citation-generator" },
      { title: "Grammar Checker", path: "/tools/grammar-checker" },
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