"use client";

import React, { useState } from "react";
import { Globe, ArrowLeft, BookOpen, Search, Filter, ChevronDown, ChevronRight, Info, MapPin } from "lucide-react";
import Link from "next/link";

// Literary movement/period types
interface LiteraryPeriod {
  id: string;
  name: string;
  year: string;
  region: string;
  description: string;
  themes: string[];
  keyAuthors: Author[];
  keyWorks: string[];
}

interface Author {
  id: string;
  name: string;
  country: string;
  years: string;
  bio: string;
  notableWorks: string[];
}

// Example data
const literaryPeriods: LiteraryPeriod[] = [
  {
    id: "ancient",
    name: "Ancient Literature",
    year: "3000 BCE - 500 CE",
    region: "Global",
    description: "The earliest written works, including epic poetry, religious texts, and philosophical treatises that laid the foundation for literary traditions around the world.",
    themes: ["Heroism", "Divine intervention", "Fate", "Honor", "Mortality"],
    keyAuthors: [
      {
        id: "homer",
        name: "Homer",
        country: "Ancient Greece",
        years: "c. 8th century BCE",
        bio: "Ancient Greek author credited with composing the Iliad and the Odyssey, two foundational works of ancient Greek literature.",
        notableWorks: ["The Iliad", "The Odyssey"]
      },
      {
        id: "virgil",
        name: "Virgil",
        country: "Ancient Rome",
        years: "70 BCE - 19 BCE",
        bio: "Roman poet who wrote the Aeneid, an epic poem about the founding of Rome.",
        notableWorks: ["The Aeneid", "Eclogues", "Georgics"]
      }
    ],
    keyWorks: ["The Epic of Gilgamesh", "The Iliad", "The Odyssey", "The Aeneid", "The Ramayana", "The Mahabharata"]
  },
  {
    id: "medieval",
    name: "Medieval Literature",
    year: "500 - 1500",
    region: "Europe, Middle East, Asia",
    description: "Literature of the Middle Ages, characterized by religious themes, chivalric romances, and allegorical narratives.",
    themes: ["Religion", "Chivalry", "Courtly love", "Honor", "Morality"],
    keyAuthors: [
      {
        id: "dante",
        name: "Dante Alighieri",
        country: "Italy",
        years: "1265 - 1321",
        bio: "Italian poet known for the Divine Comedy, a three-part journey through Hell, Purgatory, and Paradise.",
        notableWorks: ["Divine Comedy", "La Vita Nuova"]
      },
      {
        id: "chaucer",
        name: "Geoffrey Chaucer",
        country: "England",
        years: "c. 1340s - 1400",
        bio: "English poet best known for The Canterbury Tales, a collection of stories told by pilgrims traveling to Canterbury.",
        notableWorks: ["The Canterbury Tales", "Troilus and Criseyde"]
      }
    ],
    keyWorks: ["Beowulf", "The Canterbury Tales", "The Divine Comedy", "The Tale of Genji", "One Thousand and One Nights"]
  },
  {
    id: "renaissance",
    name: "Renaissance",
    year: "1300 - 1700",
    region: "Europe",
    description: "A period of cultural rebirth that emphasized humanism, individualism, and classical learning, producing influential works in poetry, drama, and prose.",
    themes: ["Humanism", "Classical revival", "Individualism", "Love", "Nature"],
    keyAuthors: [
      {
        id: "shakespeare",
        name: "William Shakespeare",
        country: "England",
        years: "1564 - 1616",
        bio: "English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.",
        notableWorks: ["Hamlet", "Romeo and Juliet", "Macbeth", "King Lear", "Sonnets"]
      },
      {
        id: "cervantes",
        name: "Miguel de Cervantes",
        country: "Spain",
        years: "1547 - 1616",
        bio: "Spanish writer widely regarded as the greatest Spanish-language writer of all time, known for his novel Don Quixote.",
        notableWorks: ["Don Quixote", "Novelas Ejemplares"]
      }
    ],
    keyWorks: ["Don Quixote", "Hamlet", "Romeo and Juliet", "The Prince", "Essays (Montaigne)"]
  },
  {
    id: "enlightenment",
    name: "The Enlightenment",
    year: "1685 - 1815",
    region: "Europe, Americas",
    description: "A philosophical movement emphasizing reason, science, and individualism, reflected in literature that questioned traditional authority and explored new ideas.",
    themes: ["Reason", "Science", "Progress", "Liberty", "Criticism of authority"],
    keyAuthors: [
      {
        id: "voltaire",
        name: "Voltaire",
        country: "France",
        years: "1694 - 1778",
        bio: "French Enlightenment writer, historian, and philosopher famous for his wit, criticism of Christianity, and advocacy of freedom of religion and separation of church and state.",
        notableWorks: ["Candide", "Philosophical Dictionary", "Letters Concerning the English Nation"]
      },
      {
        id: "swift",
        name: "Jonathan Swift",
        country: "Ireland",
        years: "1667 - 1745",
        bio: "Anglo-Irish satirist, essayist, political pamphleteer, poet, and cleric who became Dean of St Patrick's Cathedral, Dublin.",
        notableWorks: ["Gulliver's Travels", "A Modest Proposal", "A Tale of a Tub"]
      }
    ],
    keyWorks: ["Candide", "Gulliver's Travels", "The Social Contract", "Common Sense", "The Declaration of Independence"]
  },
  {
    id: "romantic",
    name: "Romanticism",
    year: "1800 - 1850",
    region: "Europe, Americas",
    description: "A literary and artistic movement that emphasized emotion, individualism, and the glorification of nature and the past, particularly the medieval period.",
    themes: ["Nature", "Emotion", "Individualism", "Imagination", "The supernatural"],
    keyAuthors: [
      {
        id: "wordsworth",
        name: "William Wordsworth",
        country: "England",
        years: "1770 - 1850",
        bio: "English Romantic poet who helped launch the Romantic Age in English literature with the publication of Lyrical Ballads with Samuel Taylor Coleridge.",
        notableWorks: ["Lyrical Ballads", "The Prelude", "I Wandered Lonely as a Cloud"]
      },
      {
        id: "goethe",
        name: "Johann Wolfgang von Goethe",
        country: "Germany",
        years: "1749 - 1832",
        bio: "German writer and statesman, his works include novels, poetry, drama, and scientific texts.",
        notableWorks: ["Faust", "The Sorrows of Young Werther", "Wilhelm Meister's Apprenticeship"]
      }
    ],
    keyWorks: ["Frankenstein", "Faust", "Pride and Prejudice", "Les Misérables", "Jane Eyre"]
  },
  {
    id: "realism",
    name: "Realism",
    year: "1830 - 1900",
    region: "Europe, Americas, Russia",
    description: "A literary movement that attempted to represent reality as it actually is, without idealizing or romanticizing it, often focusing on ordinary people and everyday life.",
    themes: ["Social issues", "Ordinary life", "Objective representation", "Class struggles", "Human psychology"],
    keyAuthors: [
      {
        id: "tolstoy",
        name: "Leo Tolstoy",
        country: "Russia",
        years: "1828 - 1910",
        bio: "Russian writer widely considered one of the greatest authors of all time, known for his realistic fiction and moral essays.",
        notableWorks: ["War and Peace", "Anna Karenina", "The Death of Ivan Ilyich"]
      },
      {
        id: "flaubert",
        name: "Gustave Flaubert",
        country: "France",
        years: "1821 - 1880",
        bio: "French novelist known for his quest for aesthetic perfection and his realistic depiction of human behavior.",
        notableWorks: ["Madame Bovary", "Sentimental Education", "Three Tales"]
      }
    ],
    keyWorks: ["War and Peace", "Madame Bovary", "Great Expectations", "Crime and Punishment", "The Adventures of Huckleberry Finn"]
  },
  {
    id: "modernism",
    name: "Modernism",
    year: "1900 - 1945",
    region: "Global",
    description: "A literary movement characterized by a break with traditional forms and a strong emphasis on innovation and experimentation, often reflecting the rapid changes and disruptions of modern society.",
    themes: ["Alienation", "Fragmentation", "Stream of consciousness", "Subjectivity", "Urban life"],
    keyAuthors: [
      {
        id: "joyce",
        name: "James Joyce",
        country: "Ireland",
        years: "1882 - 1941",
        bio: "Irish novelist, short story writer, and poet known for his experimental use of language and exploration of new literary methods.",
        notableWorks: ["Ulysses", "Dubliners", "A Portrait of the Artist as a Young Man", "Finnegans Wake"]
      },
      {
        id: "woolf",
        name: "Virginia Woolf",
        country: "England",
        years: "1882 - 1941",
        bio: "English writer considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device.",
        notableWorks: ["Mrs. Dalloway", "To the Lighthouse", "Orlando", "A Room of One's Own"]
      }
    ],
    keyWorks: ["Ulysses", "The Waste Land", "Mrs. Dalloway", "The Great Gatsby", "In Search of Lost Time"]
  },
  {
    id: "postcolonial",
    name: "Postcolonial Literature",
    year: "1950s - Present",
    region: "Africa, Asia, Caribbean, Middle East",
    description: "Literature that explores the human consequences of colonization and the political and cultural independence of formerly colonized regions, often dealing with issues of identity, language, and place.",
    themes: ["Identity", "Cultural hybridity", "Language", "Displacement", "Resistance"],
    keyAuthors: [
      {
        id: "achebe",
        name: "Chinua Achebe",
        country: "Nigeria",
        years: "1930 - 2013",
        bio: "Nigerian novelist, poet, professor, and critic, widely regarded as a dominant figure in modern African literature.",
        notableWorks: ["Things Fall Apart", "No Longer at Ease", "Arrow of God", "A Man of the People"]
      },
      {
        id: "rushdie",
        name: "Salman Rushdie",
        country: "India/UK",
        years: "1947 - ",
        bio: "British-Indian novelist whose work combines magical realism with historical fiction, addressing connections and disruptions between Eastern and Western worlds.",
        notableWorks: ["Midnight's Children", "The Satanic Verses", "Shame", "The Moor's Last Sigh"]
      }
    ],
    keyWorks: ["Things Fall Apart", "Midnight's Children", "The God of Small Things", "One Hundred Years of Solitude", "The Brief Wondrous Life of Oscar Wao"]
  }
];

// Regions for filtering
const regions = [
  "All Regions",
  "Europe",
  "Americas",
  "Africa",
  "Asia",
  "Middle East",
  "Global"
];

export default function GlobalLitExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);
  const [expandedAuthor, setExpandedAuthor] = useState<string | null>(null);
  
  // Filter periods based on search term and selected region
  const filteredPeriods = literaryPeriods.filter(period => {
    const matchesSearch = 
      period.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      period.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      period.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase())) ||
      period.keyAuthors.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      period.keyWorks.some(work => work.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesRegion = selectedRegion === "All Regions" || period.region.includes(selectedRegion);
    
    return matchesSearch && matchesRegion;
  });
  
  // Toggle expanded period
  const togglePeriod = (periodId: string) => {
    if (expandedPeriod === periodId) {
      setExpandedPeriod(null);
    } else {
      setExpandedPeriod(periodId);
      setExpandedAuthor(null);
    }
  };
  
  // Toggle expanded author
  const toggleAuthor = (authorId: string) => {
    if (expandedAuthor === authorId) {
      setExpandedAuthor(null);
    } else {
      setExpandedAuthor(authorId);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 w-10 h-10 rounded-md flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Global Lit Explorer</h1>
            <p className="text-gray-400">Explore world literature through time and culture</p>
          </div>
        </div>
        <Link 
          href="/english/english-10"
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to English 10
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by period, author, theme, or work..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-6 md:left-8 w-0.5 bg-gray-700 z-0"></div>
        
        <div className="space-y-6 relative z-10">
          {filteredPeriods.length > 0 ? (
            filteredPeriods.map((period) => (
              <div key={period.id} className="relative">
                <div 
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePeriod(period.id)}
                >
                  <div className="h-4 w-4 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 -ml-2"></div>
                  <div className="ml-6 bg-gray-800 border border-gray-700 rounded-lg p-4 w-full hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-blue-400">{period.name}</h2>
                        <div className="flex items-center text-gray-400 text-sm mt-1">
                          <div className="mr-3">{period.year}</div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {period.region}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-blue-400">
                        {expandedPeriod === period.id ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedPeriod === period.id && (
                  <div className="ml-8 mt-3 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-blue-400 mb-2">Description</h3>
                      <p className="text-gray-300">{period.description}</p>
                      
                      <h3 className="text-lg font-medium text-blue-400 mt-4 mb-2">Key Themes</h3>
                      <div className="flex flex-wrap gap-2">
                        {period.themes.map((theme, index) => (
                          <span key={index} className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full text-sm">
                            {theme}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-medium text-blue-400 mt-4 mb-2">Notable Works</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {period.keyWorks.map((work, index) => (
                          <li key={index}>{work}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <h3 className="text-lg font-medium text-blue-400 mt-4 mb-2">Key Authors</h3>
                    {period.keyAuthors.map((author) => (
                      <div key={author.id} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                        <div 
                          className="p-4 cursor-pointer hover:bg-gray-800 flex justify-between items-center"
                          onClick={() => toggleAuthor(author.id)}
                        >
                          <div>
                            <h4 className="font-medium text-gray-200">{author.name}</h4>
                            <div className="text-sm text-gray-400">{author.country}, {author.years}</div>
                          </div>
                          <div className="text-gray-400">
                            {expandedAuthor === author.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        
                        {expandedAuthor === author.id && (
                          <div className="p-4 border-t border-gray-700">
                            <p className="text-gray-300 mb-3">{author.bio}</p>
                            
                            <h5 className="text-sm font-medium text-gray-400 mb-1">Notable Works</h5>
                            <ul className="list-disc list-inside text-gray-300 ml-2 space-y-0.5">
                              {author.notableWorks.map((work, index) => (
                                <li key={index}>{work}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <BookOpen className="h-12 w-12 mb-3 text-gray-500" />
              <p>No literary periods match your search criteria.</p>
              <button 
                className="mt-3 text-blue-400 hover:text-blue-300"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("All Regions");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Info card */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
        <div className="flex">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mr-2 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-400 mb-1">About This Timeline</h3>
            <p className="text-gray-300 text-sm">
              This timeline represents major literary movements throughout history. Each period overlaps with others and 
              boundaries between them are often fluid. The provided information is a starting point for deeper exploration 
              of world literature. Click on each period to learn more about its characteristics, themes, and key authors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 