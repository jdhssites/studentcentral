"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 px-6 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              For exclusive use by John Dewey High School students and faculty
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            <p>© {currentYear} Production Central Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 