"use client";

import React, { useState } from "react";
import { Pencil, ArrowLeft, RefreshCw, Copy, Check } from "lucide-react";
import Link from "next/link";

type ThesisType = "analytical" | "argumentative" | "expository";

interface FormValues {
  essayType: ThesisType;
  topic: string;
  stance: string;
  reasons: string[];
}

export default function ThesisBuilderPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    essayType: "analytical",
    topic: "",
    stance: "",
    reasons: ["", "", ""]
  });
  
  const [thesis, setThesis] = useState("");
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  
  const essayTypes = [
    { id: "analytical", label: "Analytical", description: "Breaks down an idea into its component parts for examination" },
    { id: "argumentative", label: "Argumentative", description: "Takes a position on a topic and defends it with evidence" },
    { id: "expository", label: "Expository", description: "Explains a concept or process in a straightforward manner" }
  ];
  
  const updateFormValue = (field: keyof FormValues, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear thesis when form changes
    setThesis("");
    setError("");
  };
  
  const updateReason = (index: number, value: string) => {
    const newReasons = [...formValues.reasons];
    newReasons[index] = value;
    
    updateFormValue("reasons", newReasons);
  };
  
  const validateForm = (): string | null => {
    if (!formValues.topic.trim()) {
      return "Please enter a topic";
    }
    
    if (formValues.essayType !== "expository" && !formValues.stance.trim()) {
      return "Please enter your stance or main point";
    }
    
    // Check if at least the first reason is filled for argumentative essays
    if (formValues.essayType === "argumentative" && !formValues.reasons[0].trim()) {
      return "Please enter at least one supporting reason";
    }
    
    return null;
  };
  
  const handleGenerateThesis = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setGenerating(true);
    setError("");
    
    try {
      // Call the API endpoint
      const response = await fetch('/api/thesis-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate thesis');
      }
      
      const data = await response.json();
      setThesis(data.thesis || "");
    } catch (err) {
      console.error("Error generating thesis:", err);
      setError("Failed to generate thesis. Please try again.");
    } finally {
      setGenerating(false);
    }
  };
  
  const copyThesis = () => {
    navigator.clipboard.writeText(thesis).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const refreshThesis = async () => {
    setGenerating(true);
    try {
      // Call the API endpoint
      const response = await fetch('/api/thesis-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate thesis');
      }
      
      const data = await response.json();
      setThesis(data.thesis || "");
    } catch (err) {
      console.error("Error refreshing thesis:", err);
      setError("Failed to generate a new variation. Please try again.");
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-md flex items-center justify-center">
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Thesis Builder</h1>
            <p className="text-gray-400">Create strong, focused thesis statements</p>
          </div>
        </div>
        <Link 
          href="/english/english-9"
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English 9
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Build Your Thesis</h2>
            </div>
            <div className="card-body space-y-5">
              {/* Essay Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Essay Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {essayTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        formValues.essayType === type.id
                          ? "border-indigo-500 bg-indigo-900/30"
                          : "border-gray-700 hover:border-gray-500"
                      }`}
                      onClick={() => updateFormValue("essayType", type.id)}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Topic */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                  Topic (What are you writing about?)
                </label>
                <input
                  type="text"
                  id="topic"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={formValues.essayType === "argumentative" ? "e.g., School uniforms" : "e.g., The symbolism in 'The Great Gatsby'"}
                  value={formValues.topic}
                  onChange={(e) => updateFormValue("topic", e.target.value)}
                />
              </div>
              
              {/* Stance */}
              <div>
                <label htmlFor="stance" className="block text-sm font-medium text-gray-300 mb-2">
                  {formValues.essayType === "argumentative" 
                    ? "Your Stance (What do you believe?)" 
                    : formValues.essayType === "analytical"
                    ? "Main Point (What do you want to prove?)"
                    : "Main Focus (What aspects will you explain?)"}
                </label>
                <input
                  type="text"
                  id="stance"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={
                    formValues.essayType === "argumentative" 
                      ? "e.g., should not be mandatory" 
                      : formValues.essayType === "analytical"
                      ? "e.g., the green light represents Gatsby's hopes and dreams"
                      : "e.g., the three branches of government"
                  }
                  value={formValues.stance}
                  onChange={(e) => updateFormValue("stance", e.target.value)}
                />
              </div>
              
              {/* Reasons */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {formValues.essayType === "argumentative" 
                    ? "Supporting Reasons (Why do you believe this?)" 
                    : formValues.essayType === "analytical"
                    ? "Evidence (What supports your analysis?)"
                    : "Key Aspects (What will you explain?)"}
                </label>
                <div className="space-y-3">
                  {formValues.reasons.map((reason, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Reason ${index + 1}`}
                      value={reason}
                      onChange={(e) => updateReason(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <button
                className="btn-primary bg-indigo-600 hover:bg-indigo-700 w-full"
                onClick={handleGenerateThesis}
                disabled={generating}
              >
                {generating ? "Generating..." : "Generate Thesis Statement"}
              </button>
            </div>
          </div>
          
          {/* Result */}
          {thesis && (
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Thesis Statement</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={refreshThesis}
                    className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="Generate variation"
                    disabled={generating}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyThesis}
                    className="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="bg-indigo-900/20 border border-indigo-900/30 rounded-md p-4">
                  <p className="text-white font-medium">{thesis}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">What Makes a Good Thesis?</h2>
            </div>
            <div className="card-body space-y-4">
              <div>
                <h3 className="font-medium text-indigo-400">Specific</h3>
                <p className="text-sm text-gray-300">Your thesis should address a specific aspect of your topic, not be overly broad.</p>
              </div>
              <div>
                <h3 className="font-medium text-indigo-400">Arguable</h3>
                <p className="text-sm text-gray-300">It should present a view that someone could reasonably disagree with.</p>
              </div>
              <div>
                <h3 className="font-medium text-indigo-400">Evidence-based</h3>
                <p className="text-sm text-gray-300">Your thesis should be supportable with evidence from your text or research.</p>
              </div>
              <div>
                <h3 className="font-medium text-indigo-400">Concise</h3>
                <p className="text-sm text-gray-300">Express your main idea in a single, clear sentence when possible.</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Thesis Examples</h2>
            </div>
            <div className="card-body p-0">
              <div className="divide-y divide-gray-700">
                <div className="p-4">
                  <h3 className="font-medium text-indigo-400">Analytical</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    In "To Kill a Mockingbird," the mockingbird symbolizes innocence and harmlessness, as demonstrated through the characters of Tom Robinson and Boo Radley.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-indigo-400">Argumentative</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    High school students should be required to take a personal finance course because it prepares them for adult responsibilities, helps prevent future debt, and teaches valuable life skills.
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-indigo-400">Expository</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    The water cycle can be understood by examining its key components, including evaporation, condensation, precipitation, and collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 