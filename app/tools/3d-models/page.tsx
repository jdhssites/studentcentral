import React from "react";
import ModelViewer from "@/app/components/tools/ModelViewer";
import { Shapes, Cube, Box } from "lucide-react";

export default function ThreeDModelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Cube className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">3D Models</h1>
      </div>
      
      <p className="text-gray-300">
        Explore and interact with 3D geometric shapes and models. Visualize, manipulate, and learn about 3D geometry.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
        <div className="card bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors border-yellow-800/50 cursor-pointer">
          <div className="card-header">Basic Shapes</div>
          <div className="card-body text-sm text-gray-300">
            Cubes, spheres, cylinders and more
          </div>
        </div>
        
        <div className="card bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors border-yellow-800/50 cursor-pointer">
          <div className="card-header">Advanced Shapes</div>
          <div className="card-body text-sm text-gray-300">
            Complex mathematical objects
          </div>
        </div>
        
        <div className="card bg-gray-800/80 hover:bg-gray-800 transition-colors border-gray-700 cursor-pointer opacity-70">
          <div className="card-header">Molecular Models</div>
          <div className="card-body text-sm text-gray-400">
            Visualize chemical compounds in 3D
            <div className="mt-2 text-xs text-blue-400">Coming soon</div>
          </div>
        </div>
        
        <div className="card bg-gray-800/80 hover:bg-gray-800 transition-colors border-gray-700 cursor-pointer opacity-70">
          <div className="card-header">Custom Models</div>
          <div className="card-body text-sm text-gray-400">
            Build your own 3D models
            <div className="mt-2 text-xs text-blue-400">Coming soon</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-6">
        <ModelViewer />
      </div>
    </div>
  );
} 