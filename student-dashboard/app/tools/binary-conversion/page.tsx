"use client";

import React, { useState, useEffect } from "react";
import { Binary } from "lucide-react";

export default function BinaryConversionPage() {
  const [value, setValue] = useState("");
  const [inputBase, setInputBase] = useState("10"); // Default: Decimal
  const [outputBases, setOutputBases] = useState({
    "2": "", // Binary
    "8": "", // Octal
    "10": "", // Decimal
    "16": "", // Hexadecimal
  });
  const [error, setError] = useState("");

  // Base descriptors for UI
  const bases = {
    "2": { name: "Binary", prefix: "0b", regex: /^[01]*$/ },
    "8": { name: "Octal", prefix: "0o", regex: /^[0-7]*$/ },
    "10": { name: "Decimal", prefix: "", regex: /^[0-9]*$/ },
    "16": { name: "Hexadecimal", prefix: "0x", regex: /^[0-9A-Fa-f]*$/ },
  };

  // Convert the value whenever the input changes
  useEffect(() => {
    if (!value) {
      // Reset outputs when input is empty
      setOutputBases({
        "2": "",
        "8": "",
        "10": "",
        "16": "",
      });
      setError("");
      return;
    }

    try {
      // Validate the input against the selected base's regex
      if (!bases[inputBase].regex.test(value)) {
        setError(`Invalid character for ${bases[inputBase].name}`);
        return;
      }

      setError("");
      
      // Convert the input value to decimal first (as a common intermediary)
      const decimalValue = parseInt(value, parseInt(inputBase));
      
      if (isNaN(decimalValue)) {
        setError("Invalid conversion");
        return;
      }

      // Convert the decimal value to all output bases
      const newOutputs = {};
      Object.keys(bases).forEach(base => {
        const baseInt = parseInt(base);
        if (baseInt === 10) {
          newOutputs[base] = decimalValue.toString();
        } else {
          newOutputs[base] = decimalValue.toString(baseInt);
        }
      });

      setOutputBases(newOutputs);
    } catch (err) {
      console.error(err);
      setError("Conversion error");
    }
  }, [value, inputBase]);

  // Handle input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Handle base change
  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputBase(e.target.value);
    setValue(""); // Reset input value when base changes
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-green-500 w-10 h-10 rounded-md flex items-center justify-center">
          <Binary className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Binary Conversion</h1>
      </div>
      
      <p className="text-gray-300">
        Convert between decimal, binary, octal, and hexadecimal number systems. Enter a value and select the input base to see all conversions.
      </p>
      
      <div className="card">
        <div className="card-header">Number Conversion Tool</div>
        <div className="card-body space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <label htmlFor="value" className="block text-sm font-medium text-gray-300 mb-2">
                Enter Value
              </label>
              <input
                type="text"
                id="value"
                value={value}
                onChange={handleValueChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter a number to convert"
              />
            </div>
            
            <div>
              <label htmlFor="inputBase" className="block text-sm font-medium text-gray-300 mb-2">
                Input Base
              </label>
              <select
                id="inputBase"
                value={inputBase}
                onChange={handleBaseChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(bases).map(([base, { name }]) => (
                  <option key={base} value={base}>
                    {name} (Base {base})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Results Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-lg">Conversion Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(bases).map(([base, { name, prefix }]) => (
                <div key={base} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-400">
                    {name} (Base {base})
                  </label>
                  <div className="flex">
                    <div className="bg-gray-800 px-3 py-2 border-y border-l border-gray-600 rounded-l-md text-gray-400">
                      {prefix}
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={outputBases[base]}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-r-md focus:outline-none"
                      aria-label={`${name} (Base ${base}) result`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Educational Section */}
      <div className="card mt-8">
        <div className="card-header">Number Systems Guide</div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">How to Read Number Systems</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <span className="font-medium text-green-400">Binary (Base 2):</span> Uses only 0 and 1.
                  <br/><code className="bg-gray-800 px-2 py-1 rounded">0b101 = 1×2² + 0×2¹ + 1×2⁰ = 5</code>
                </li>
                <li>
                  <span className="font-medium text-green-400">Octal (Base 8):</span> Uses digits 0-7.
                  <br/><code className="bg-gray-800 px-2 py-1 rounded">0o17 = 1×8¹ + 7×8⁰ = 15</code>
                </li>
                <li>
                  <span className="font-medium text-green-400">Decimal (Base 10):</span> Standard system using digits 0-9.
                  <br/><code className="bg-gray-800 px-2 py-1 rounded">42 = 4×10¹ + 2×10⁰ = 42</code>
                </li>
                <li>
                  <span className="font-medium text-green-400">Hexadecimal (Base 16):</span> Uses digits 0-9 and letters A-F.
                  <br/><code className="bg-gray-800 px-2 py-1 rounded">0x1A = 1×16¹ + 10×16⁰ = 26</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Common Uses</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><span className="font-medium text-green-400">Binary:</span> Computer data storage, digital circuits</li>
                <li><span className="font-medium text-green-400">Octal:</span> Unix file permissions, older programming languages</li>
                <li><span className="font-medium text-green-400">Decimal:</span> Everyday counting and mathematics</li>
                <li><span className="font-medium text-green-400">Hexadecimal:</span> Memory addresses, color codes in web design, assembly code</li>
              </ul>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Why Convert Between Systems?</h3>
                <p className="text-sm text-gray-300">
                  Different number systems are optimal for different purposes. Computers work in binary, 
                  but hexadecimal is more compact for representing binary values. Understanding conversion
                  helps in programming, computer science, and digital electronics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 