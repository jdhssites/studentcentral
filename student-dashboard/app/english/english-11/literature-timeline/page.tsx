'use client';

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

interface Period {
  id: string;
  name: string;
  years: string;
  description: string;
  authors: Author[];
}

interface Author {
  name: string;
  works: string[];
  description: string;
}

export default function LiteratureTimeline() {
  const [activeTab, setActiveTab] = useState("colonial");

  const periods: Period[] = [
    {
      id: "colonial",
      name: "Colonial Period",
      years: "1607-1775",
      description: "Literature focused on religious and practical themes, reflecting Puritan values and early American experiences.",
      authors: [
        {
          name: "Anne Bradstreet",
          works: ["The Tenth Muse Lately Sprung Up in America", "To My Dear and Loving Husband"],
          description: "First published female poet in the American colonies."
        },
        {
          name: "Jonathan Edwards",
          works: ["Sinners in the Hands of an Angry God"],
          description: "Prominent Puritan minister and theologian."
        }
      ]
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
            Explore the major periods of American literature and their notable authors
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                <CardTitle>{period.name} ({period.years})</CardTitle>
                <CardDescription>{period.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    {period.authors.map((author, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="text-lg font-semibold">{author.name}</h3>
                        <p className="text-muted-foreground">{author.description}</p>
                        <div className="pl-4">
                          <h4 className="text-sm font-medium mb-2">Notable Works:</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {author.works.map((work, workIndex) => (
                              <li key={workIndex} className="text-sm">{work}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 