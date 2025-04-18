"use client";

import React, { useState } from "react";
import Link from "next/link";
import { History, ArrowLeft, Search, BookOpen, Clock, User, MapPin, Send, Info } from "lucide-react";

interface AuthorContext {
  name: string;
  bio: string;
  birthDeath: string;
  literaryPeriod: string;
  majorWorks: string[];
  historicalContext: string;
  literaryInfluences: string[];
  writingStyle: string;
  impact: string;
}

export default function AuthorContextPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuthorContext | null>(null);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const popularAuthors = [
    "F. Scott Fitzgerald",
    "Nathaniel Hawthorne",
    "Ernest Hemingway",
    "Mark Twain",
    "Emily Dickinson",
    "Walt Whitman",
    "Edgar Allan Poe",
    "Ralph Waldo Emerson"
  ];
  
  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter an author name or literary work");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response with example data
    setTimeout(() => {
      // Add to recent searches
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev].slice(0, 5));
      }
      
      // Check if query is for Fitzgerald/Gatsby
      if (query.toLowerCase().includes("fitzgerald") || query.toLowerCase().includes("gatsby")) {
        setResult(getFitzgeraldContext());
      } 
      // Check if query is for Hawthorne
      else if (query.toLowerCase().includes("hawthorne") || query.toLowerCase().includes("scarlet letter")) {
        setResult(getHawthorneContext());
      }
      // Default response for any other query
      else {
        setResult(getGenericContext(query));
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const getFitzgeraldContext = (): AuthorContext => {
    return {
      name: "F. Scott Fitzgerald",
      bio: "Francis Scott Key Fitzgerald was an American novelist, essayist, and short story writer. He was best known for his novels depicting the flamboyance and excess of the Jazz Age.",
      birthDeath: "1896 - 1940",
      literaryPeriod: "Modernism, Jazz Age",
      majorWorks: [
        "The Great Gatsby (1925)",
        "Tender Is the Night (1934)",
        "This Side of Paradise (1920)",
        "The Beautiful and Damned (1922)",
        "The Last Tycoon (unfinished, pub. 1941)"
      ],
      historicalContext: "Fitzgerald wrote during the Roaring Twenties, a period of economic prosperity and cultural dynamism in America. His work captures the disillusionment and excess of the post-World War I era, Prohibition, and the eventual stock market crash of 1929 that led to the Great Depression.",
      literaryInfluences: [
        "Joseph Conrad",
        "Edith Wharton",
        "Oscar Wilde",
        "H.G. Wells"
      ],
      writingStyle: "Fitzgerald's prose is known for its rich, lyrical quality and vivid descriptions. He employed symbolism extensively and created complex, flawed characters who often represented broader social issues and concerns.",
      impact: "Fitzgerald's work, particularly 'The Great Gatsby,' has become emblematic of the American Dream and its contradictions. His exploration of wealth, class, and societal expectations continues to resonate with readers and has influenced countless writers who followed him."
    };
  };
  
  const getHawthorneContext = (): AuthorContext => {
    return {
      name: "Nathaniel Hawthorne",
      bio: "Nathaniel Hawthorne was an American novelist, dark romantic, and short story writer. His works often focus on history, morality, and religion.",
      birthDeath: "1804 - 1864",
      literaryPeriod: "Dark Romanticism, American Renaissance",
      majorWorks: [
        "The Scarlet Letter (1850)",
        "The House of the Seven Gables (1851)",
        "Twice-Told Tales (1837)",
        "The Marble Faun (1860)",
        "The Blithedale Romance (1852)"
      ],
      historicalContext: "Hawthorne wrote during the American Renaissance and was influenced by Puritan New England's religious intensity. His work explores themes of sin, guilt, and hypocrisy, often in historical settings that reflect America's colonial past.",
      literaryInfluences: [
        "John Bunyan",
        "William Shakespeare",
        "John Milton",
        "Sir Walter Scott"
      ],
      writingStyle: "Hawthorne's writing is characterized by moral complexity, psychological depth, and dense symbolism. He often employed allegory to explore moral and spiritual questions, with a particular interest in the effects of sin and guilt on individuals and communities.",
      impact: "Hawthorne's examination of America's Puritan heritage and moral ambiguity has made him one of the most studied writers in American literature. 'The Scarlet Letter' remains a classic study of sin, guilt, and redemption, while his exploration of psychological themes anticipated later developments in American fiction."
    };
  };
  
  const getGenericContext = (query: string): AuthorContext => {
    return {
      name: query,
      bio: "This author was a significant figure in American literature, known for works that explored important themes in American society and culture.",
      birthDeath: "19th - 20th century",
      literaryPeriod: "American Literature",
      majorWorks: [
        "Notable novel A",
        "Important collection B",
        "Landmark work C",
        "Influential essay D"
      ],
      historicalContext: "This author wrote during a period of significant change in American society, reflecting the tensions and transformations of the era in their work.",
      literaryInfluences: [
        "Earlier American writers",
        "European literary traditions",
        "Contemporary social movements",
        "Regional or cultural backgrounds"
      ],
      writingStyle: "The author's distinctive style combines careful attention to language with deep insight into character and social dynamics, often employing unique narrative approaches.",
      impact: "This author's work has continued to influence American literature and is studied for its artistic merit and cultural significance."
    };
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 w-10 h-10 rounded-md flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Author Context Tool</h1>
            <p className="text-gray-400">Historical and biographical background for authors and texts</p>
          </div>
        </div>
        <Link 
          href="/english/english-9-12?grade=11"
          className="flex items-center text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English 11
        </Link>
      </div>
      
      {/* Search Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Enter Author or Literary Work</h2>
        </div>
        <div className="card-body space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter author name or literary work (e.g., 'F. Scott Fitzgerald', 'The Great Gatsby')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">
              Try: {popularAuthors.slice(0, 3).map((author, index) => (
                <button 
                  key={author} 
                  className="text-green-400 hover:text-green-300"
                  onClick={() => setQuery(author)}
                >
                  {author}{index < 2 ? ', ' : ''}
                </button>
              ))}
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 flex items-center disabled:opacity-50"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
              <Send className="h-4 w-4 ml-2" />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Searches */}
      {recentSearches.length > 0 && !result && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Recent Searches</h2>
          </div>
          <div className="card-body">
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  className="bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 text-sm flex items-center"
                  onClick={() => {
                    setQuery(search);
                    handleSearch();
                  }}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-green-400">{result.name}</h2>
                <span className="text-sm bg-green-900/30 text-green-300 px-2 py-1 rounded-full">
                  {result.literaryPeriod}
                </span>
              </div>
            </div>
            <div className="card-body space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-green-400 mb-1">Biography</h3>
                    <p className="text-gray-300">{result.bio}</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <User className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 text-sm">Lived: </span>
                      <span className="text-gray-300">{result.birthDeath}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3 bg-gray-800 p-4 rounded-md mt-4 md:mt-0">
                  <h3 className="text-lg font-medium text-green-400 mb-2">Major Works</h3>
                  <ul className="space-y-2">
                    {result.majorWorks.map((work, index) => (
                      <li key={index} className="flex items-start">
                        <BookOpen className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{work}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-2">Historical Context</h3>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-300">{result.historicalContext}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-green-400 mb-2">Literary Influences</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.literaryInfluences.map((influence, index) => (
                      <span key={index} className="bg-green-900/20 text-green-300 px-2 py-1 rounded-full text-sm">
                        {influence}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-green-400 mb-2">Writing Style</h3>
                  <p className="text-gray-300">{result.writingStyle}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-2">Literary Impact</h3>
                <p className="text-gray-300">{result.impact}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <div className="flex">
              <Info className="w-5 h-5 text-green-400 flex-shrink-0 mr-2 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-1">Using This Information</h3>
                <p className="text-gray-300 text-sm">
                  Use this biographical and historical context to enhance your essays and literary analysis. 
                  Understanding an author's background, influences, and historical period can provide valuable 
                  insights into themes, symbols, and character motivations in their works. This contextual 
                  knowledge demonstrates depth of understanding in your literary analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Suggestions Section (when no search is active) */}
      {!result && !isLoading && recentSearches.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">American Authors</h2>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {popularAuthors.slice(0, 4).map((author) => (
                  <button
                    key={author}
                    className="flex items-center w-full text-left p-3 rounded-md bg-gray-800 hover:bg-gray-700"
                    onClick={() => {
                      setQuery(author);
                      handleSearch();
                    }}
                  >
                    <User className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">{author}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Why Context Matters</h2>
            </div>
            <div className="card-body">
              <p className="text-gray-300 mb-4">
                Understanding the historical and biographical context of an author helps you:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</div>
                  <span className="text-gray-300">Recognize influences on themes and characters</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</div>
                  <span className="text-gray-300">Identify historical references and allusions</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</div>
                  <span className="text-gray-300">Interpret symbols and metaphors accurately</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</div>
                  <span className="text-gray-300">Support your analysis with relevant background information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 