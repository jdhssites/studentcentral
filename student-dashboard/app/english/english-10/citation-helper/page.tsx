"use client";

import React, { useState } from 'react';
import { FileText, BookOpen, RefreshCw, Clipboard } from "lucide-react";
import Link from "next/link";

interface SourceInfo {
  sourceType: string;
  title: string;
  authors: string;
  publisher: string;
  publicationDate: string;
  accessDate: string;
  url: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  city?: string;
}

interface CitationResult {
  mla: string;
  apa: string;
  chicago: string;
}

export default function CitationHelperPage() {
  const [sourceInfo, setSourceInfo] = useState<SourceInfo>({
    sourceType: "website",
    title: "",
    authors: "",
    publisher: "",
    publicationDate: "",
    accessDate: new Date().toISOString().split('T')[0],
    url: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    city: "",
  });
  const [result, setResult] = useState<CitationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'mla' | 'apa' | 'chicago'>('mla');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSourceInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceInfo((prev) => ({ ...prev, sourceType: e.target.value }));
  };

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation);
    setToastMessage("Citation copied to clipboard");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generateCitations = () => {
    if (!sourceInfo.title || !sourceInfo.authors) {
      setToastMessage("Please provide at least the title and authors of your source.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsGenerating(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      const mla = generateMLACitation(sourceInfo);
      const apa = generateAPACitation(sourceInfo);
      const chicago = generateChicagoCitation(sourceInfo);

      setResult({ mla, apa, chicago });
      setIsGenerating(false);
    }, 1500);
  };

  const generateMLACitation = (info: SourceInfo): string => {
    const authors = formatAuthorsForMLA(info.authors);
    let citation = '';

    if (info.sourceType === "website") {
      citation = `${authors}. "${info.title}." ${info.publisher ? `${info.publisher}, ` : ''}${
        info.publicationDate ? formatDateForMLA(info.publicationDate) : 'n.d.'
      }, ${info.url}.${info.accessDate ? ` Accessed ${formatDateForMLA(info.accessDate)}.` : ''}`;
    } else if (info.sourceType === "book") {
      citation = `${authors}. ${info.title}. ${info.city ? `${info.city}: ` : ''}${
        info.publisher ? `${info.publisher}, ` : ''
      }${info.publicationDate ? formatDateForMLA(info.publicationDate).split(' ')[1] : 'n.d.'}.`;
    } else if (info.sourceType === "journal") {
      citation = `${authors}. "${info.title}." ${info.publisher}${
        info.volume ? `, vol. ${info.volume}` : ''
      }${info.issue ? `, no. ${info.issue}` : ''}${
        info.publicationDate ? `, ${formatDateForMLA(info.publicationDate)}` : ''
      }${info.pages ? `, pp. ${info.pages}` : ''}${info.doi ? `, ${info.doi}` : ''}.`;
    }

    return citation;
  };

  const generateAPACitation = (info: SourceInfo): string => {
    const authors = formatAuthorsForAPA(info.authors);
    let citation = '';

    if (info.sourceType === "website") {
      citation = `${authors} (${info.publicationDate ? formatDateForAPA(info.publicationDate) : 'n.d.'}). ${
        info.title
      }. ${info.publisher}. ${info.url}`;
    } else if (info.sourceType === "book") {
      citation = `${authors} (${info.publicationDate ? formatDateForAPA(info.publicationDate) : 'n.d.'}). ${
        info.title
      }. ${info.publisher}.`;
    } else if (info.sourceType === "journal") {
      citation = `${authors} (${info.publicationDate ? formatDateForAPA(info.publicationDate) : 'n.d.'}). ${
        info.title
      }. ${info.publisher}${info.volume ? `, ${info.volume}` : ''}${
        info.issue ? `(${info.issue})` : ''
      }${info.pages ? `, ${info.pages}` : ''}. ${info.doi ? `${info.doi}` : ''}`;
    }

    return citation;
  };

  const generateChicagoCitation = (info: SourceInfo): string => {
    const authors = formatAuthorsForChicago(info.authors);
    let citation = '';

    if (info.sourceType === "website") {
      citation = `${authors}. "${info.title}." ${info.publisher}. ${
        info.publicationDate ? formatDateForChicago(info.publicationDate) : 'n.d.'
      }. ${info.url}.`;
    } else if (info.sourceType === "book") {
      citation = `${authors}. ${info.title}. ${info.city ? `${info.city}: ` : ''}${
        info.publisher ? `${info.publisher}, ` : ''
      }${info.publicationDate ? formatDateForChicago(info.publicationDate) : 'n.d.'}.`;
    } else if (info.sourceType === "journal") {
      citation = `${authors}. "${info.title}." ${info.publisher} ${
        info.volume ? `${info.volume}` : ''
      }${info.issue ? `, no. ${info.issue}` : ''} (${
        info.publicationDate ? formatDateForChicago(info.publicationDate) : 'n.d.'
      })${info.pages ? `: ${info.pages}` : ''}.`;
    }

    return citation;
  };

  // Helper functions to format authors and dates for different citation styles
  const formatAuthorsForMLA = (authors: string): string => {
    if (!authors) return '';
    
    const authorList = authors.split(',').map(a => a.trim());
    if (authorList.length === 1) {
      return authorList[0];
    } else if (authorList.length === 2) {
      return `${authorList[0]} and ${authorList[1]}`;
    } else {
      return `${authorList[0]} et al.`;
    }
  };

  const formatAuthorsForAPA = (authors: string): string => {
    if (!authors) return '';
    
    const authorList = authors.split(',').map(a => a.trim());
    if (authorList.length === 1) {
      const parts = authorList[0].split(' ');
      if (parts.length >= 2) {
        const lastName = parts.pop();
        const initials = parts.map(name => `${name.charAt(0)}.`).join(' ');
        return `${lastName}, ${initials}`;
      }
      return authorList[0];
    } else {
      const formattedAuthors = authorList.map(author => {
        const parts = author.trim().split(' ');
        if (parts.length >= 2) {
          const lastName = parts.pop();
          const initials = parts.map(name => `${name.charAt(0)}.`).join(' ');
          return `${lastName}, ${initials}`;
        }
        return author;
      });
      
      if (formattedAuthors.length <= 2) {
        return formattedAuthors.join(' & ');
      } else {
        return `${formattedAuthors.slice(0, -1).join(', ')}, & ${formattedAuthors[formattedAuthors.length - 1]}`;
      }
    }
  };

  const formatAuthorsForChicago = (authors: string): string => {
    if (!authors) return '';
    
    const authorList = authors.split(',').map(a => a.trim());
    if (authorList.length === 1) {
      const parts = authorList[0].split(' ');
      if (parts.length >= 2) {
        const firstName = parts.slice(0, -1).join(' ');
        const lastName = parts[parts.length - 1];
        return `${lastName}, ${firstName}`;
      }
      return authorList[0];
    } else {
      const firstAuthor = authorList[0].split(' ');
      const firstAuthorLastName = firstAuthor[firstAuthor.length - 1];
      const firstAuthorFirstName = firstAuthor.slice(0, -1).join(' ');
      
      return `${firstAuthorLastName}, ${firstAuthorFirstName}${authorList.length > 1 ? ' et al.' : ''}`;
    }
  };

  const formatDateForMLA = (date: string): string => {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return date;
    }
  };

  const formatDateForAPA = (date: string): string => {
    try {
      const dateObj = new Date(date);
      return dateObj.getFullYear().toString();
    } catch {
      return date;
    }
  };

  const formatDateForChicago = (date: string): string => {
    try {
      const dateObj = new Date(date);
      return dateObj.getFullYear().toString();
    } catch {
      return date;
    }
  };

  const resetForm = () => {
    setSourceInfo({
      sourceType: "website",
      title: "",
      authors: "",
      publisher: "",
      publicationDate: "",
      accessDate: new Date().toISOString().split('T')[0],
      url: "",
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      city: "",
    });
    setResult(null);
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-800 w-10 h-10 rounded-md flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Research Citation Helper</h1>
          <p className="text-gray-400">Generate properly formatted citations for your research papers</p>
        </div>
      </div>
      
      <div className="mb-8 border border-gray-700 rounded-lg bg-gray-800">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Source Information</h2>
          <p className="text-gray-400 text-sm">Enter the details of your source to generate citations</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="sourceType" className="block text-sm font-medium text-gray-300 mb-1">Source Type</label>
            <select 
              id="sourceType"
              value={sourceInfo.sourceType} 
              onChange={handleSelectChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="website">Website</option>
              <option value="book">Book</option>
              <option value="journal">Journal Article</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={sourceInfo.title}
              onChange={handleInputChange}
              placeholder="Title of the source"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="authors" className="block text-sm font-medium text-gray-300 mb-1">Author(s)</label>
            <input
              id="authors"
              name="authors"
              type="text"
              value={sourceInfo.authors}
              onChange={handleInputChange}
              placeholder="Authors (comma separated for multiple authors)"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-gray-300 mb-1">Publisher/Website Name</label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              value={sourceInfo.publisher}
              onChange={handleInputChange}
              placeholder="Publisher or website name"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-300 mb-1">Publication Date</label>
              <input
                id="publicationDate"
                name="publicationDate"
                type="date"
                value={sourceInfo.publicationDate}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {sourceInfo.sourceType === "website" && (
              <div>
                <label htmlFor="accessDate" className="block text-sm font-medium text-gray-300 mb-1">Access Date</label>
                <input
                  id="accessDate"
                  name="accessDate"
                  type="date"
                  value={sourceInfo.accessDate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {sourceInfo.sourceType === "website" && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">URL</label>
              <input
                id="url"
                name="url"
                type="text"
                value={sourceInfo.url}
                onChange={handleInputChange}
                placeholder="https://"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {sourceInfo.sourceType === "book" && (
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">Publication City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={sourceInfo.city || ""}
                onChange={handleInputChange}
                placeholder="City of publication"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {sourceInfo.sourceType === "journal" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="volume" className="block text-sm font-medium text-gray-300 mb-1">Volume</label>
                  <input
                    id="volume"
                    name="volume"
                    type="text"
                    value={sourceInfo.volume || ""}
                    onChange={handleInputChange}
                    placeholder="Volume number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-gray-300 mb-1">Issue</label>
                  <input
                    id="issue"
                    name="issue"
                    type="text"
                    value={sourceInfo.issue || ""}
                    onChange={handleInputChange}
                    placeholder="Issue number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pages" className="block text-sm font-medium text-gray-300 mb-1">Pages</label>
                  <input
                    id="pages"
                    name="pages"
                    type="text"
                    value={sourceInfo.pages || ""}
                    onChange={handleInputChange}
                    placeholder="Page range (e.g., 45-67)"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="doi" className="block text-sm font-medium text-gray-300 mb-1">DOI</label>
                  <input
                    id="doi"
                    name="doi"
                    type="text"
                    value={sourceInfo.doi || ""}
                    onChange={handleInputChange}
                    placeholder="Digital Object Identifier"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-between">
          <button 
            onClick={resetForm} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button 
            onClick={generateCitations} 
            disabled={isGenerating} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : (
              <>
                <BookOpen size={16} />
                Generate Citations
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="border border-gray-700 rounded-lg bg-gray-800">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Generated Citations</h2>
            <p className="text-gray-400 text-sm">Copy the citation style you need for your research</p>
          </div>
          <div className="p-6">
            <div className="flex border-b border-gray-700 mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'mla' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('mla')}
              >
                MLA
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'apa' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('apa')}
              >
                APA
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'chicago' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('chicago')}
              >
                Chicago
              </button>
            </div>
            
            {activeTab === 'mla' && (
              <div>
                <div className="mb-2 text-sm font-medium">MLA (9th edition)</div>
                <div className="p-4 bg-gray-900 rounded-md mb-3">
                  <p className="whitespace-pre-wrap break-words">{result.mla}</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleCopyCitation(result.mla)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'apa' && (
              <div>
                <div className="mb-2 text-sm font-medium">APA (7th edition)</div>
                <div className="p-4 bg-gray-900 rounded-md mb-3">
                  <p className="whitespace-pre-wrap break-words">{result.apa}</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleCopyCitation(result.apa)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'chicago' && (
              <div>
                <div className="mb-2 text-sm font-medium">Chicago (17th edition)</div>
                <div className="p-4 bg-gray-900 rounded-md mb-3">
                  <p className="whitespace-pre-wrap break-words">{result.chicago}</p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleCopyCitation(result.chicago)} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
} 