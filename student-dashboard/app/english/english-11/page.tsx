import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, FileText, BookOpen, List, Target } from "lucide-react";
import Link from "next/link";

interface Tool {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

export default function English11Page() {
  const tools: Tool[] = [
    {
      title: "Evidence Selector",
      description: "Organize textual evidence from literary works to support your analytical essays",
      icon: BookOpen,
      path: "/english/english-11/evidence-selector"
    },
    {
      title: "American Literature Timeline",
      description: "Explore key literary movements and authors in American literature",
      icon: FileText,
      path: "/english/english-11/literature-timeline"
    },
    {
      title: "Rhetoric Analyzer",
      description: "Analyze rhetorical strategies in speeches and essays from American history",
      icon: Target,
      path: "/english/english-11/rhetoric-analyzer"
    },
    {
      title: "Vocabulary Builder",
      description: "Build your vocabulary with terms from American literature classics",
      icon: List,
      path: "/english/english-11/vocabulary-builder"
    }
  ];

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookCopy className="h-6 w-6" />
            English 11: American Literature
          </CardTitle>
          <CardDescription>
            Tools and resources to help you explore American literature and develop your writing skills
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link href={tool.path} key={tool.title}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(tool.icon, { className: "h-5 w-5" })}
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 