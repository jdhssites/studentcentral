"use client";

import React from "react";
import { BarChart4, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EssayGraderPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-900 w-10 h-10 rounded-md flex items-center justify-center">
            <BarChart4 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Essay Rubric Grader</h1>
            <p className="text-gray-400">Score essays on College Board's 6-point rubric</p>
          </div>
        </div>
        <Link 
          href="/english/ap-literature"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to AP Literature
        </Link>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Simple Test Page</h2>
        <p className="text-gray-300">
          This is a simplified version of the Essay Rubric Grader page for troubleshooting.
        </p>
      </div>
    </div>
  );
} 