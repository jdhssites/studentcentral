"use client";

import React, { useState } from "react";

export default function EquationSolver() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solveEquation = () => {
    setError(null);

    try {
      // This is a simplified equation solver for demonstration
      // In a real app, you would use a math library like math.js
      
      // Basic linear equation solving (form: ax + b = c)
      const cleanedEquation = equation.replace(/\s+/g, "");
      
      // Check if equation contains an equals sign
      if (!cleanedEquation.includes("=")) {
        throw new Error("Equation must contain an equals sign (=)");
      }
      
      const [leftSide, rightSide] = cleanedEquation.split("=");
      
      // Extract coefficient of x and constant term
      const xIndex = leftSide.indexOf("x");
      
      if (xIndex === -1) {
        throw new Error("Equation must contain variable 'x'");
      }
      
      let coefficient = leftSide.substring(0, xIndex);
      coefficient = coefficient === "" ? "1" : coefficient === "-" ? "-1" : coefficient;
      
      // Extract the constant term (number after x)
      let constant = leftSide.substring(xIndex + 1);
      constant = constant === "" ? "0" : constant;
      
      // Convert to numbers
      const a = parseFloat(coefficient);
      const b = constant.startsWith("+") 
        ? parseFloat(constant.substring(1)) 
        : constant.startsWith("-")
        ? parseFloat(constant)
        : parseFloat("+" + constant);
      const c = parseFloat(rightSide);
      
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        throw new Error("Invalid equation format. Use format like '2x+3=7'");
      }
      
      // Solve for x: ax + b = c => x = (c - b) / a
      const x = (c - b) / a;
      
      setResult(`x = ${x}`);
    } catch (err: any) {
      setError(err.message || "Error solving equation");
      setResult(null);
    }
  };

  return (
    <div className="card max-w-lg mx-auto">
      <div className="card-header">Linear Equation Solver</div>
      <div className="card-body space-y-4">
        <div className="space-y-2">
          <label htmlFor="equation" className="block text-sm font-medium text-gray-300">
            Enter a linear equation (e.g., 2x+3=7)
          </label>
          <input
            type="text"
            id="equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Example: 2x+3=7"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={solveEquation}
          className="btn-primary w-full"
        >
          Solve Equation
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-md">
            <h3 className="font-semibold text-lg">Solution:</h3>
            <div className="text-2xl font-bold text-white mt-1">{result}</div>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-md text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            <li>Enter a linear equation in the form <code className="bg-gray-700 px-1 rounded">ax + b = c</code></li>
            <li>The equation must contain the variable <code className="bg-gray-700 px-1 rounded">x</code></li>
            <li>Click "Solve Equation" to calculate the value of x</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 