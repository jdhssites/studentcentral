'use client';

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, FileText, Plus, Trash2, BookOpen, Quote, ListChecks } from "lucide-react";

interface EvidenceItem {
  id: string;
  text: string;
  page: string;
  notes: string;
  tags: string[];
}

interface ThesisStatement {
  text: string;
}

export default function EvidenceSelector() {
  const [activeTab, setActiveTab] = useState("collect");
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [newEvidenceText, setNewEvidenceText] = useState("");
  const [newEvidencePage, setNewEvidencePage] = useState("");
  const [newEvidenceNotes, setNewEvidenceNotes] = useState("");
  const [newEvidenceTags, setNewEvidenceTags] = useState("");
  const [thesisStatement, setThesisStatement] = useState<ThesisStatement>({ text: "" });
  const [selectedEvidence, setSelectedEvidence] = useState<Set<string>>(new Set());
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddEvidence = () => {
    if (!newEvidenceText.trim()) return;

    const newItem: EvidenceItem = {
      id: Date.now().toString(),
      text: newEvidenceText,
      page: newEvidencePage,
      notes: newEvidenceNotes,
      tags: newEvidenceTags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    };

    setEvidenceItems([...evidenceItems, newItem]);
    setNewEvidenceText("");
    setNewEvidencePage("");
    setNewEvidenceNotes("");
    setNewEvidenceTags("");
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceItems(evidenceItems.filter(item => item.id !== id));
    
    // Remove from selected if it was selected
    if (selectedEvidence.has(id)) {
      const newSelected = new Set(selectedEvidence);
      newSelected.delete(id);
      setSelectedEvidence(newSelected);
    }
  };

  const toggleEvidenceSelection = (id: string) => {
    const newSelected = new Set(selectedEvidence);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEvidence(newSelected);
  };

  const selectedEvidenceItems = evidenceItems.filter(item => selectedEvidence.has(item.id));

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <ListChecks className="h-6 w-6" />
            Evidence Selector
          </CardTitle>
          <CardDescription>
            Collect, organize, and select textual evidence for your analytical essays
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="collect" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Collect Evidence</span>
          </TabsTrigger>
          <TabsTrigger value="organize" className="flex items-center gap-2">
            <Quote className="h-4 w-4" />
            <span>Organize</span>
          </TabsTrigger>
          <TabsTrigger value="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Essay Outline</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Source Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="book-title">Book or Text Title</Label>
                <Input 
                  id="book-title" 
                  placeholder="Enter book or text title"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  placeholder="Enter author's name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Add New Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evidence-text">Quotation or Passage</Label>
                <Textarea 
                  id="evidence-text" 
                  placeholder="Enter direct quotation or passage from the text"
                  className="min-h-[100px]"
                  value={newEvidenceText}
                  onChange={(e) => setNewEvidenceText(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="page-number">Page Number(s)</Label>
                  <Input 
                    id="page-number" 
                    placeholder="e.g., 42 or 15-17"
                    value={newEvidencePage}
                    onChange={(e) => setNewEvidencePage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="e.g., symbolism, character, theme"
                    value={newEvidenceTags}
                    onChange={(e) => setNewEvidenceTags(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Your Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Enter your thoughts about this evidence"
                  className="min-h-[100px]"
                  value={newEvidenceNotes}
                  onChange={(e) => setNewEvidenceNotes(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleAddEvidence}
                className="w-full flex items-center gap-2"
                disabled={!newEvidenceText.trim()}
              >
                <Plus className="h-4 w-4" />
                Add Evidence
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Collected Evidence ({evidenceItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {evidenceItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No evidence collected yet. Add quotations from the text above.
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {evidenceItems.map((item) => (
                      <Card key={item.id} className="relative">
                        <CardContent className="pt-6 pb-4">
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => toggleEvidenceSelection(item.id)}
                              className={selectedEvidence.has(item.id) ? "text-green-500" : ""}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleRemoveEvidence(item.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <blockquote className="border-l-2 pl-4 italic">
                            "{item.text}"
                          </blockquote>
                          <div className="text-sm text-muted-foreground mt-2">
                            Page: {item.page || "N/A"}
                          </div>
                          {item.notes && (
                            <div className="mt-3">
                              <div className="font-medium">Notes:</div>
                              <p className="text-sm">{item.notes}</p>
                            </div>
                          )}
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.tags.map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organize" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Thesis Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter your thesis statement here"
                className="min-h-[100px]"
                value={thesisStatement.text}
                onChange={(e) => setThesisStatement({ text: e.target.value })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Select Evidence</CardTitle>
              <CardDescription>Choose evidence that supports your thesis</CardDescription>
            </CardHeader>
            <CardContent>
              {evidenceItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No evidence available. Go to Collect Evidence tab to add quotes.
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {evidenceItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => toggleEvidenceSelection(item.id)}
                          className={selectedEvidence.has(item.id) ? "text-green-500" : ""}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Card className="flex-1">
                          <CardContent className="pt-6 pb-4">
                            <blockquote className="border-l-2 pl-4 italic">
                              "{item.text}"
                            </blockquote>
                            <div className="text-sm text-muted-foreground mt-2">
                              Page: {item.page || "N/A"}
                            </div>
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.tags.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Essay Outline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Introduction</h3>
                <div className="ml-4 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Thesis Statement:</h4>
                    <div className="p-3 border rounded-md bg-secondary/30">
                      {thesisStatement.text || 
                        <span className="text-muted-foreground italic">
                          No thesis statement defined. Go to the Organize tab to create one.
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Body Paragraphs</h3>
                <div className="ml-4">
                  {selectedEvidenceItems.length === 0 ? (
                    <div className="text-muted-foreground italic p-3">
                      No evidence selected. Go to the Organize tab to select evidence for your essay.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedEvidenceItems.map((item, index) => (
                        <div key={item.id} className="space-y-2">
                          <h4 className="font-medium">Paragraph {index + 1}</h4>
                          <Card className="border-l-4 border-l-primary">
                            <CardContent className="py-3">
                              <div className="space-y-3">
                                <div>
                                  <span className="font-medium">Evidence:</span>
                                  <blockquote className="border-l-2 pl-4 mt-1 italic">
                                    "{item.text}"
                                  </blockquote>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {bookTitle}, p. {item.page || "N/A"}
                                  </div>
                                </div>
                                
                                {item.notes && (
                                  <div>
                                    <span className="font-medium">Analysis:</span>
                                    <p className="mt-1">{item.notes}</p>
                                  </div>
                                )}
                                
                                {item.tags.length > 0 && (
                                  <div>
                                    <span className="font-medium">Related to:</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {item.tags.map((tag, tagIndex) => (
                                        <span 
                                          key={tagIndex} 
                                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Conclusion</h3>
                <div className="ml-4 text-muted-foreground italic">
                  <p>Restate your thesis in a new way</p>
                  <p>Summarize your main points</p>
                  <p>End with a thought-provoking final statement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 