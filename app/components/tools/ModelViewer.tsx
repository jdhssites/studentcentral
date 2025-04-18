"use client";

import React, { useState } from "react";
import { Cube, RotateCcw, ZoomIn, Move, Download } from "lucide-react";

// Placeholder component for a 3D model viewer
// In a real implementation, you would use a library like Three.js or React Three Fiber
export default function ModelViewer() {
  const [selectedModel, setSelectedModel] = useState("cube");
  
  const models = [
    { id: "cube", name: "Cube", category: "Basic" },
    { id: "sphere", name: "Sphere", category: "Basic" },
    { id: "cylinder", name: "Cylinder", category: "Basic" },
    { id: "cone", name: "Cone", category: "Basic" },
    { id: "pyramid", name: "Pyramid", category: "Basic" },
    { id: "torus", name: "Torus", category: "Advanced" },
    { id: "knot", name: "Knot", category: "Advanced" },
    { id: "dodecahedron", name: "Dodecahedron", category: "Advanced" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Model Selection Panel */}
      <div className="lg:col-span-1">
        <div className="card">
          <div className="card-header">3D Models</div>
          <div className="card-body p-0">
            <div className="px-4 py-2 bg-gray-700 text-sm font-medium">Basic Shapes</div>
            <ul className="py-2">
              {models
                .filter(model => model.category === "Basic")
                .map(model => (
                  <li key={model.id}>
                    <button
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                        selectedModel === model.id ? "bg-blue-600" : ""
                      }`}
                    >
                      {model.name}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="px-4 py-2 bg-gray-700 text-sm font-medium">Advanced Shapes</div>
            <ul className="py-2">
              {models
                .filter(model => model.category === "Advanced")
                .map(model => (
                  <li key={model.id}>
                    <button
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                        selectedModel === model.id ? "bg-blue-600" : ""
                      }`}
                    >
                      {model.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Viewer Panel */}
      <div className="lg:col-span-3">
        <div className="card mb-4 h-[420px] flex items-center justify-center relative">
          {/* This would be a real 3D renderer in production */}
          <div className="text-center">
            <Cube className="w-32 h-32 mx-auto text-blue-400 opacity-50" />
            <p className="mt-4 text-gray-400">
              3D Viewer placeholder. <br />
              In a real application, this would render a {selectedModel} using Three.js or similar.
            </p>
          </div>
          
          {/* Controls overlay */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
              <Move className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 p-2 rounded-full hover:bg-blue-700">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Properties Panel */}
        <div className="card">
          <div className="card-header">Properties</div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Dimensions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Width</label>
                    <input 
                      type="number" 
                      value="2.0"
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Height</label>
                    <input 
                      type="number" 
                      value="2.0"
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Depth</label>
                    <input 
                      type="number" 
                      value="2.0"
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Material
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                  <option>Basic</option>
                  <option>Phong</option>
                  <option>Lambert</option>
                  <option>Standard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Color
                </label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value="#3b82f6"
                    className="bg-transparent border-0 w-8 h-8"
                  />
                  <input 
                    type="text" 
                    value="#3b82f6"
                    className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Wireframe
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox bg-gray-700 border-gray-500 rounded" />
                    <span className="ml-2">Show wireframe</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 