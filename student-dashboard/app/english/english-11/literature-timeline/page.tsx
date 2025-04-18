import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Info } from "lucide-react";

interface TimelinePeriod {
  id: string;
  name: string;
  years: string;
  description: string;
  keyAuthors: string[];
  keyWorks: string[];
}

export default function LiteratureTimelinePage() {
  const periods: TimelinePeriod[] = [
    {
      id: "colonial",
      name: "Colonial and Early National Period",
      years: "1607-1830",
      description: "Literature from the early settlements through the Revolutionary War and early Republic, characterized by religious and political writings.",
      keyAuthors: ["Anne Bradstreet", "Benjamin Franklin", "Thomas Jefferson", "Washington Irving"],
      keyWorks: ["Common Sense", "The Declaration of Independence", "The Federalist Papers", "Rip Van Winkle"]
    },
    {
      id: "romanticism",
      name: "American Romanticism",
      years: "1830-1865",
      description: "Emphasized emotion, individualism, and the glorification of nature and the past, particularly medieval.",
      keyAuthors: ["Edgar Allan Poe", "Nathaniel Hawthorne", "Herman Melville", "Walt Whitman", "Emily Dickinson"],
      keyWorks: ["The Scarlet Letter", "Moby-Dick", "Leaves of Grass", "The Raven"]
    },
    {
      id: "realism",
      name: "Realism and Naturalism",
      years: "1865-1914",
      description: "Post-Civil War literature characterized by detailed realism and exploration of social issues.",
      keyAuthors: ["Mark Twain", "Henry James", "Kate Chopin", "Stephen Crane", "Jack London"],
      keyWorks: ["Adventures of Huckleberry Finn", "The Awakening", "The Red Badge of Courage"]
    },
    {
      id: "modernism",
      name: "Modernism",
      years: "1914-1945",
      description: "Marked by a break with traditional forms and optimism, reflecting the disillusionment following World War I.",
      keyAuthors: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "John Steinbeck", "Langston Hughes"],
      keyWorks: ["The Great Gatsby", "The Sun Also Rises", "The Sound and the Fury", "The Grapes of Wrath"]
    },
    {
      id: "postwar",
      name: "Postwar and Contemporary",
      years: "1945-Present",
      description: "Diverse literature reflecting the social changes and cultural shifts of the latter 20th century to present day.",
      keyAuthors: ["J.D. Salinger", "Toni Morrison", "Maya Angelou", "Ralph Ellison", "Sandra Cisneros"],
      keyWorks: ["The Catcher in the Rye", "Beloved", "I Know Why the Caged Bird Sings", "Invisible Man", "The House on Mango Street"]
    }
  ];

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            American Literature Timeline
          </CardTitle>
          <CardDescription>
            Explore the major periods of American literature, their characteristics, and notable authors
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="colonial" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          {periods.map((period) => (
            <TabsTrigger key={period.id} value={period.id}>
              {period.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {periods.map((period) => (
          <TabsContent key={period.id} value={period.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{period.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">{period.years}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-1 mb-2">
                    <Info className="h-4 w-4" /> Overview
                  </h3>
                  <p>{period.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Authors</h3>
                  <ul className="list-disc pl-5">
                    {period.keyAuthors.map((author, i) => (
                      <li key={i}>{author}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Notable Works</h3>
                  <ul className="list-disc pl-5">
                    {period.keyWorks.map((work, i) => (
                      <li key={i}>{work}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 