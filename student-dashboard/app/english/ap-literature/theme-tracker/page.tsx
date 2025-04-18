"use client";

import { useState } from "react";
import { Plus, Trash2, Book, PlusCircle, MinusCircle, Save, FileText, X, Download, BookOpen, Bookmark, Link as LinkIcon, ArrowLeft, Library } from "lucide-react";
import Link from 'next/link';

interface Work {
  id: string;
  title: string;
  author: string;
}

interface ThemeInstance {
  id: string;
  themeId: string;
  workId: string;
  evidence: string;
  pages: string;
}

interface Theme {
  id: string;
  name: string;
  description: string;
}

export default function ThemeTrackerPage() {
  const [activeTab, setActiveTab] = useState<'works' | 'themes' | 'connections'>('works');
  
  // State for works
  const [works, setWorks] = useState<Work[]>([]);
  const [newWorkTitle, setNewWorkTitle] = useState('');
  const [newWorkAuthor, setNewWorkAuthor] = useState('');
  
  // State for themes
  const [themes, setThemes] = useState<Theme[]>([]);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeDescription, setNewThemeDescription] = useState('');
  
  // State for theme instances (connections between works and themes)
  const [themeInstances, setThemeInstances] = useState<ThemeInstance[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [newEvidence, setNewEvidence] = useState('');
  const [newPages, setNewPages] = useState('');
  
  // Add a new work
  const addWork = () => {
    if (newWorkTitle.trim() === '' || newWorkAuthor.trim() === '') return;
    
    const newWork: Work = {
      id: Date.now().toString(),
      title: newWorkTitle.trim(),
      author: newWorkAuthor.trim(),
    };
    
    setWorks([...works, newWork]);
    setNewWorkTitle('');
    setNewWorkAuthor('');
  };
  
  // Remove a work
  const removeWork = (workId: string) => {
    setWorks(works.filter(work => work.id !== workId));
    // Also remove any theme instances associated with this work
    setThemeInstances(themeInstances.filter(instance => instance.workId !== workId));
  };
  
  // Add a new theme
  const addTheme = () => {
    if (newThemeName.trim() === '') return;
    
    const newTheme: Theme = {
      id: Date.now().toString(),
      name: newThemeName.trim(),
      description: newThemeDescription.trim(),
    };
    
    setThemes([...themes, newTheme]);
    setNewThemeName('');
    setNewThemeDescription('');
  };
  
  // Remove a theme
  const removeTheme = (themeId: string) => {
    setThemes(themes.filter(theme => theme.id !== themeId));
    // Also remove any theme instances associated with this theme
    setThemeInstances(themeInstances.filter(instance => instance.themeId !== themeId));
  };
  
  // Add a new theme instance
  const addThemeInstance = () => {
    if (!selectedThemeId || !selectedWorkId || newEvidence.trim() === '') return;
    
    const newInstance: ThemeInstance = {
      id: Date.now().toString(),
      themeId: selectedThemeId,
      workId: selectedWorkId,
      evidence: newEvidence.trim(),
      pages: newPages.trim(),
    };
    
    setThemeInstances([...themeInstances, newInstance]);
    setNewEvidence('');
    setNewPages('');
  };
  
  // Remove a theme instance
  const removeThemeInstance = (instanceId: string) => {
    setThemeInstances(themeInstances.filter(instance => instance.id !== instanceId));
  };
  
  // Export data
  const exportData = () => {
    const data = {
      works,
      themes,
      themeInstances,
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportName = 'theme-tracker-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };
  
  // Get a work by ID
  const getWorkById = (workId: string) => works.find(work => work.id === workId);
  
  // Get a theme by ID
  const getThemeById = (themeId: string) => themes.find(theme => theme.id === themeId);
  
  // Get all instances for a theme
  const getInstancesForTheme = (themeId: string) => 
    themeInstances.filter(instance => instance.themeId === themeId);
  
  // Get all instances for a work
  const getInstancesForWork = (workId: string) => 
    themeInstances.filter(instance => instance.workId === workId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-800 w-10 h-10 rounded-md flex items-center justify-center">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Literary Theme Tracker</h1>
            <p className="text-gray-400">Track and connect themes across literary works</p>
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
      
      <div className="card mb-6">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'works' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('works')}
            >
              <BookOpen className="inline h-4 w-4 mr-2" />
              Literary Works
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'themes' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('themes')}
            >
              <Bookmark className="inline h-4 w-4 mr-2" />
              Themes
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'connections' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('connections')}
            >
              <LinkIcon className="inline h-4 w-4 mr-2" />
              Thematic Connections
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {activeTab === 'works' && (
            <div>
              <div className="bg-gray-800/50 p-4 rounded-lg mb-4 border border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-200">Add a Literary Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newWorkTitle}
                    onChange={e => setNewWorkTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newWorkAuthor}
                    onChange={e => setNewWorkAuthor(e.target.value)}
                  />
                </div>
                <button
                  className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center"
                  onClick={addWork}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Work
                </button>
              </div>
              
              {works.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No literary works added yet. Add works to begin tracking themes.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {works.map(work => (
                    <div key={work.id} className="border border-gray-700 rounded-lg p-4 relative bg-gray-800/30">
                      <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
                        onClick={() => removeWork(work.id)}
                        title="Remove work"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <h4 className="font-semibold text-lg mb-1 text-gray-200">{work.title}</h4>
                      <p className="text-gray-400">by {work.author}</p>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">
                          Themes in this work ({getInstancesForWork(work.id).length})
                        </h5>
                        {getInstancesForWork(work.id).length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {getInstancesForWork(work.id).map(instance => {
                              const theme = getThemeById(instance.themeId);
                              return theme ? (
                                <span key={instance.id} className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded-full">
                                  {theme.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No themes connected yet</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'themes' && (
            <div>
              <div className="bg-gray-800/50 p-4 rounded-lg mb-4 border border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-200">Add a Theme</h3>
                <div className="space-y-3 mb-3">
                  <input
                    type="text"
                    placeholder="Theme Name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newThemeName}
                    onChange={e => setNewThemeName(e.target.value)}
                  />
                  <textarea
                    placeholder="Description (optional)"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    value={newThemeDescription}
                    onChange={e => setNewThemeDescription(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center"
                  onClick={addTheme}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Theme
                </button>
              </div>
              
              {themes.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No themes added yet. Add themes that you want to track across works.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map(theme => (
                    <div key={theme.id} className="border border-gray-700 rounded-lg p-4 relative bg-gray-800/30">
                      <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
                        onClick={() => removeTheme(theme.id)}
                        title="Remove theme"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <h4 className="font-semibold text-lg mb-1 text-gray-200">{theme.name}</h4>
                      {theme.description && (
                        <p className="text-gray-400 mb-3">{theme.description}</p>
                      )}
                      
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">
                          Appears in ({getInstancesForTheme(theme.id).length}) works
                        </h5>
                        {getInstancesForTheme(theme.id).length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {getInstancesForTheme(theme.id).map(instance => {
                              const work = getWorkById(instance.workId);
                              return work ? (
                                <span key={instance.id} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                  {work.title}
                                </span>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Not connected to any works yet</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'connections' && (
            <div>
              <div className="bg-gray-800/50 p-4 rounded-lg mb-4 border border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-200">Connect Themes to Works</h3>
                
                {works.length === 0 || themes.length === 0 ? (
                  <div className="text-center py-4 text-gray-400">
                    Add at least one work and one theme to begin creating connections.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={selectedWorkId || ''}
                        onChange={e => setSelectedWorkId(e.target.value || null)}
                        aria-label="Select a literary work"
                      >
                        <option value="">Select a literary work</option>
                        {works.map(work => (
                          <option key={work.id} value={work.id}>
                            {work.title} by {work.author}
                          </option>
                        ))}
                      </select>
                      
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={selectedThemeId || ''}
                        onChange={e => setSelectedThemeId(e.target.value || null)}
                        aria-label="Select a theme"
                      >
                        <option value="">Select a theme</option>
                        {themes.map(theme => (
                          <option key={theme.id} value={theme.id}>
                            {theme.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <textarea
                      placeholder="Evidence/Quote from the text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      value={newEvidence}
                      onChange={e => setNewEvidence(e.target.value)}
                    ></textarea>
                    
                    <input
                      type="text"
                      placeholder="Page number(s) (optional)"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={newPages}
                      onChange={e => setNewPages(e.target.value)}
                    />
                    
                    <button
                      className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center"
                      onClick={addThemeInstance}
                      disabled={!selectedWorkId || !selectedThemeId}
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connect Theme to Work
                    </button>
                  </div>
                )}
              </div>
              
              {themeInstances.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No thematic connections added yet. Connect themes to works to build your analysis.
                </div>
              ) : (
                <div className="space-y-4">
                  {themeInstances.map(instance => {
                    const theme = getThemeById(instance.themeId);
                    const work = getWorkById(instance.workId);
                    
                    if (!theme || !work) return null;
                    
                    return (
                      <div key={instance.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded-full font-medium">
                              {theme.name}
                            </span>
                            <span className="mx-2 text-gray-500">in</span>
                            <span className="font-medium text-gray-300">{work.title}</span>
                            <span className="text-gray-500 text-sm"> by {work.author}</span>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => removeThemeInstance(instance.id)}
                            title="Remove connection"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <blockquote className="border-l-4 border-purple-800 pl-3 py-1 italic text-gray-300 mb-2">
                          "{instance.evidence}"
                        </blockquote>
                        
                        {instance.pages && (
                          <p className="text-sm text-gray-500">
                            Pages: {instance.pages}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {works.length} works, {themes.length} themes, {themeInstances.length} connections
        </div>
        
        <button
          className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 flex items-center"
          onClick={exportData}
          disabled={works.length === 0 && themes.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>
    </div>
  );
} 