"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-[var(--sidebar-width)] w-[calc(100%-var(--sidebar-width))]">
        {/* Header */}
        <header className="h-[var(--header-height)] border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
          <Breadcrumbs />
          
          <div className="flex items-center space-x-4">
            {/* Optional: Add header elements like search, user profile, etc. */}
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 