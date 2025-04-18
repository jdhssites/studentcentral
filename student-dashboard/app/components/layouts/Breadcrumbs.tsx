"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Skip rendering breadcrumbs on the homepage
  if (pathname === "/") {
    return null;
  }

  // Create breadcrumb items from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    
    // Handle special case for old English 9 and 10 paths that now redirect to English 9-12
    let label = segment;
    if (segment === "english-9" || segment === "english-10" || segment === "english-11" || segment === "english-12") {
      // If this is one of the individual English grade pages
      if (index === 1) {
        // Only modify if it's directly under /english/
        label = "english-9-12";
      }
    }
    
    // Format the label
    label = label
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    // Special case for English 9-12 label
    if (label === "English 9 12") {
      label = "English 9-12";
    }
    
    return { href: segment === "english-9" || segment === "english-10" || segment === "english-11" || segment === "english-12" 
            ? "/english/english-9-12" 
            : href, 
            label };
  });

  // Add Home as the first breadcrumb
  breadcrumbs.unshift({ href: "/", label: "Home" });

  return (
    <nav className="flex items-center text-sm">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        
        return (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            
            {isLast ? (
              <span className="font-medium text-blue-400">{breadcrumb.label}</span>
            ) : (
              <Link 
                href={breadcrumb.href}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
} 