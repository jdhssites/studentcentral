"use client";

import React, { useState } from "react";
import { Lightbulb, Info, PlusCircle, MinusCircle, X } from "lucide-react";

// Define category types and element interfaces
interface ElementCategory {
  name: string;
  color: string;
}

interface Element {
  symbol: string;
  name: string;
  number: number;
  mass: string;
  category: keyof typeof elementCategories;
  group: number;
  period: number;
  description: string;
}

// Define element categories and their colors
const elementCategories = {
  "alkali-metal": { name: "Alkali Metal", color: "bg-red-500" },
  "alkaline-earth": { name: "Alkaline Earth Metal", color: "bg-yellow-500" },
  "transition-metal": { name: "Transition Metal", color: "bg-blue-500" },
  "post-transition": { name: "Post-Transition Metal", color: "bg-green-300" },
  "metalloid": { name: "Metalloid", color: "bg-green-500" },
  "nonmetal": { name: "Nonmetal", color: "bg-teal-500" },
  "halogen": { name: "Halogen", color: "bg-purple-500" },
  "noble-gas": { name: "Noble Gas", color: "bg-indigo-500" },
  "lanthanide": { name: "Lanthanide", color: "bg-pink-500" },
  "actinide": { name: "Actinide", color: "bg-orange-500" },
  "unknown": { name: "Unknown Properties", color: "bg-gray-500" }
};

// Sample data for some representative elements from different categories
const elements: Element[] = [
  { symbol: "H", name: "Hydrogen", number: 1, mass: "1.008", category: "nonmetal", group: 1, period: 1, 
    description: "Colorless, odorless, tasteless, non-toxic, highly combustible gas. Most abundant chemical substance in the universe." },
  { symbol: "He", name: "Helium", number: 2, mass: "4.0026", category: "noble-gas", group: 18, period: 1,
    description: "Colorless, odorless, tasteless, non-toxic, inert monatomic gas. Second most abundant element in the observable universe." },
  { symbol: "Li", name: "Lithium", number: 3, mass: "6.94", category: "alkali-metal", group: 1, period: 2,
    description: "Soft, silvery-white alkali metal. Under standard conditions, it is the lightest metal and the lightest solid element." },
  { symbol: "Be", name: "Beryllium", number: 4, mass: "9.0122", category: "alkaline-earth", group: 2, period: 2,
    description: "Relatively rare element in the universe. Steel-gray, strong, lightweight and brittle alkaline earth metal." },
  { symbol: "B", name: "Boron", number: 5, mass: "10.81", category: "metalloid", group: 13, period: 2,
    description: "Produced entirely by cosmic ray spallation and supernovae. Essential for all plants and some animals." },
  { symbol: "C", name: "Carbon", number: 6, mass: "12.011", category: "nonmetal", group: 14, period: 2,
    description: "Basis of all known life on Earth. Fourth most abundant element in the universe by mass." },
  { symbol: "N", name: "Nitrogen", number: 7, mass: "14.007", category: "nonmetal", group: 15, period: 2,
    description: "Colorless, odorless, tasteless gas that makes up 78% of Earth's atmosphere. Essential component of proteins and nucleic acids." },
  { symbol: "O", name: "Oxygen", number: 8, mass: "15.999", category: "nonmetal", group: 16, period: 2,
    description: "Third most abundant element in the universe. Highly reactive nonmetal that readily forms compounds with most elements." },
  { symbol: "F", name: "Fluorine", number: 9, mass: "18.998", category: "halogen", group: 17, period: 2,
    description: "Lightest halogen. Extremely reactive gas, that readily forms compounds with most elements." },
  { symbol: "Ne", name: "Neon", number: 10, mass: "20.180", category: "noble-gas", group: 18, period: 2,
    description: "Colorless, odorless, inert monatomic gas. Fifth most abundant element in the universe." },
  { symbol: "Na", name: "Sodium", number: 11, mass: "22.990", category: "alkali-metal", group: 1, period: 3,
    description: "Soft, silvery-white, highly reactive metal. Sixth most abundant element in the Earth's crust." },
  { symbol: "Mg", name: "Magnesium", number: 12, mass: "24.305", category: "alkaline-earth", group: 2, period: 3,
    description: "Shiny gray solid which bears a close physical resemblance to the other five elements in the second column of the periodic table." },
  { symbol: "Al", name: "Aluminum", number: 13, mass: "26.982", category: "post-transition", group: 13, period: 3,
    description: "Silvery-white, soft, non-magnetic and ductile metal. Third most abundant element in the Earth's crust." },
  { symbol: "Si", name: "Silicon", number: 14, mass: "28.085", category: "metalloid", group: 14, period: 3,
    description: "Hard and brittle crystalline solid with a blue-grey metallic lustre. Second most abundant element in the Earth's crust." },
  { symbol: "P", name: "Phosphorus", number: 15, mass: "30.974", category: "nonmetal", group: 15, period: 3,
    description: "Essential for life. Forms the backbone of DNA and RNA molecules. Used in fertilizers, detergents, and pesticides." },
  { symbol: "S", name: "Sulfur", number: 16, mass: "32.06", category: "nonmetal", group: 16, period: 3,
    description: "Abundant, multivalent, and nonmetallic. Essential element for all living organisms." },
  { symbol: "Cl", name: "Chlorine", number: 17, mass: "35.45", category: "halogen", group: 17, period: 3,
    description: "Yellow-green gas at room temperature. Strong oxidizing agent used in water purification and as a disinfectant." },
  { symbol: "Ar", name: "Argon", number: 18, mass: "39.948", category: "noble-gas", group: 18, period: 3,
    description: "Colorless, odorless, inert monatomic gas. Third most abundant gas in the Earth's atmosphere." },
  { symbol: "K", name: "Potassium", number: 19, mass: "39.098", category: "alkali-metal", group: 1, period: 4,
    description: "Silvery-white, soft alkali metal that oxidizes rapidly in air. Essential for the function of all living cells." },
  { symbol: "Ca", name: "Calcium", number: 20, mass: "40.078", category: "alkaline-earth", group: 2, period: 4,
    description: "Soft, silvery-white alkaline earth metal. Fifth most abundant element in Earth's crust. Essential for living organisms." },
  { symbol: "Fe", name: "Iron", number: 26, mass: "55.845", category: "transition-metal", group: 8, period: 4,
    description: "Most common element on Earth. Pure iron is soft but is unobtainable by smelting. Forms much stronger alloys like steel." },
  { symbol: "Cu", name: "Copper", number: 29, mass: "63.546", category: "transition-metal", group: 11, period: 4,
    description: "Soft, malleable, and ductile metal with high thermal and electrical conductivity. A vital nutrient for all living organisms." },
  { symbol: "Zn", name: "Zinc", number: 30, mass: "65.38", category: "transition-metal", group: 12, period: 4,
    description: "Bluish-white, lustrous, diamagnetic metal. The fourth most common metal in use after iron, aluminum, and copper." },
  { symbol: "Br", name: "Bromine", number: 35, mass: "79.904", category: "halogen", group: 17, period: 4,
    description: "Only non-metallic element that is liquid at room temperature. Reddish-brown in color with an irritating odor." },
  { symbol: "Ag", name: "Silver", number: 47, mass: "107.87", category: "transition-metal", group: 11, period: 5,
    description: "Soft, white, lustrous transition metal. Has the highest electrical conductivity of any element and the highest thermal conductivity of any metal." },
  { symbol: "Au", name: "Gold", number: 79, mass: "196.97", category: "transition-metal", group: 11, period: 6,
    description: "Bright, slightly reddish yellow, dense, soft, malleable, and ductile metal. Does not react with most chemicals but is affected by chlorine, fluorine and aqua regia." },
  { symbol: "Hg", name: "Mercury", number: 80, mass: "200.59", category: "transition-metal", group: 12, period: 6,
    description: "Only metallic element that is liquid at standard conditions for temperature and pressure. Formerly used in thermometers, barometers, and other scientific apparatus." },
  { symbol: "Pb", name: "Lead", number: 82, mass: "207.2", category: "post-transition", group: 14, period: 6,
    description: "Heavy metal that is denser than most common materials. Soft, malleable, and has a relatively low melting point. Toxic to humans and animals." },
  { symbol: "U", name: "Uranium", number: 92, mass: "238.03", category: "actinide", group: 3, period: 7,
    description: "Silvery-grey metal that is weakly radioactive. Used as a fuel in nuclear power plants and in nuclear weapons." },
];

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Generate a grid for the periodic table
  // This is a simplified representation with gaps for where elements should be
  const createPeriodicTableGrid = () => {
    // Create a grid with 7 periods and 18 groups
    const grid = Array(7).fill(null).map(() => Array(18).fill(null));
    
    // Place elements in their correct positions
    elements.forEach(element => {
      if (element.period && element.group) {
        grid[element.period - 1][element.group - 1] = element;
      }
    });
    
    return grid;
  };
  
  const periodicTable = createPeriodicTableGrid();
  
  // Show element details
  const showElementDetails = (element: Element) => {
    setSelectedElement(element);
  };
  
  // Close element details
  const closeElementDetails = () => {
    setSelectedElement(null);
  };
  
  // Zoom in/out
  const zoomIn = () => {
    if (zoomLevel < 1.5) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };
  
  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-red-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Periodic Table</h1>
      </div>
      
      <p className="text-gray-300">
        Explore the periodic table of elements. Click on any element to view detailed information about it.
      </p>
      
      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={zoomIn}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center"
            aria-label="Zoom in"
          >
            <PlusCircle className="w-5 h-5 mr-1" /> Zoom In
          </button>
          <button 
            onClick={zoomOut}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center"
            aria-label="Zoom out"
          >
            <MinusCircle className="w-5 h-5 mr-1" /> Zoom Out
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {Object.entries(elementCategories).map(([key, { name, color }]) => (
            <div key={key} className="flex items-center text-sm">
              <div className={`w-4 h-4 ${color} rounded-sm mr-1`}></div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Periodic Table */}
      <div className="overflow-auto pb-4" style={{ maxWidth: '100%' }}>
        <div 
          className="periodic-table-grid" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(18, minmax(50px, 1fr))',
            gap: '4px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: 'transform 0.3s ease',
          }}
        >
          {periodicTable.map((period, periodIndex) => (
            period.map((element: Element | null, groupIndex) => (
              <div 
                key={`${periodIndex}-${groupIndex}`}
                className={`
                  relative aspect-square flex flex-col justify-center items-center
                  ${element ? `${elementCategories[element.category].color} cursor-pointer hover:scale-105 transition-transform` : 'bg-transparent'}
                  text-center rounded-md overflow-hidden
                `}
                onClick={() => element && showElementDetails(element)}
              >
                {element && (
                  <>
                    <div className="absolute top-1 left-1 text-xs">{element.number}</div>
                    <div className="text-xl font-bold">{element.symbol}</div>
                    <div className="text-xs mt-1">{element.name}</div>
                    <div className="text-xs mt-0.5 opacity-75">{element.mass}</div>
                  </>
                )}
              </div>
            ))
          ))}
        </div>
      </div>
      
      {/* Element details modal */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${elementCategories[selectedElement.category as keyof typeof elementCategories].color} rounded-md flex items-center justify-center mr-3`}>
                  <span className="text-xl font-bold">{selectedElement.symbol}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedElement.name}</h2>
                  <p className="text-sm text-gray-400">{elementCategories[selectedElement.category as keyof typeof elementCategories].name}</p>
                </div>
              </div>
              <button 
                onClick={closeElementDetails}
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-400" />
                    Basic Information
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-400">Atomic Number:</span>
                      <span>{selectedElement.number}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Symbol:</span>
                      <span>{selectedElement.symbol}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Atomic Mass:</span>
                      <span>{selectedElement.mass} u</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Group:</span>
                      <span>{selectedElement.group}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Period:</span>
                      <span>{selectedElement.period}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span>{elementCategories[selectedElement.category as keyof typeof elementCategories].name}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Description</h3>
                  <p className="text-gray-300">{selectedElement.description}</p>
                  
                  <div className="mt-4">
                    <h3 className="font-medium text-lg mb-2">Common Uses</h3>
                    <p className="text-gray-300">
                      {selectedElement.symbol === "H" && "Rocket fuel, fertilizer production, welding"}
                      {selectedElement.symbol === "O" && "Medical oxygen, combustion, water treatment"}
                      {selectedElement.symbol === "C" && "Fuels, plastics, steel production"}
                      {selectedElement.symbol === "Fe" && "Construction, manufacturing, automotive industry"}
                      {selectedElement.symbol === "Au" && "Jewelry, electronics, monetary exchange"}
                      {selectedElement.symbol === "Si" && "Electronics, glass production, solar cells"}
                      {selectedElement.symbol === "Cu" && "Electrical wiring, plumbing, currency"}
                      {selectedElement.symbol === "Al" && "Aircraft construction, packaging, construction"}
                      {selectedElement.symbol === "He" && "Balloons, cryogenics, MRI cooling"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Legend and Educational Section */}
      <div className="card mt-8">
        <div className="card-header">About the Periodic Table</div>
        <div className="card-body">
          <p className="text-gray-300 mb-4">
            The periodic table is a tabular arrangement of chemical elements, organized by atomic number, electron configuration, and chemical properties. 
            Elements are presented in order of increasing atomic number (number of protons).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-medium mb-2">Organization</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><span className="font-medium text-red-400">Groups (Columns):</span> Elements in the same group have similar chemical properties.</li>
                <li><span className="font-medium text-red-400">Periods (Rows):</span> Elements in the same period have the same number of electron shells.</li>
                <li><span className="font-medium text-red-400">Blocks:</span> Sections based on the electron configuration (s, p, d, f).</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Element Categories</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><span className="font-medium text-red-400">Metals:</span> Good conductors of heat and electricity, malleable, ductile.</li>
                <li><span className="font-medium text-red-400">Nonmetals:</span> Poor conductors, brittle as solids, form anions.</li>
                <li><span className="font-medium text-red-400">Metalloids:</span> Properties between metals and nonmetals.</li>
                <li><span className="font-medium text-red-400">Noble Gases:</span> Low reactivity, colorless, odorless gases.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 