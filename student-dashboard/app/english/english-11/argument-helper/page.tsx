"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlignLeft, ArrowLeft, Lightbulb, BookOpen, MousePointer, Copy, ChevronDown, ChevronUp, Sparkles, PenSquare, Info } from "lucide-react";

interface ArgumentSection {
  title: string;
  content: string;
  isExpanded: boolean;
}

export default function LiteraryArgumentHelperPage() {
  const [theme, setTheme] = useState("");
  const [work, setWork] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [argumentSections, setArgumentSections] = useState<ArgumentSection[]>([]);
  
  const exampleThemes = [
    "The American Dream is ultimately unattainable",
    "Society restricts individual freedom",
    "The pursuit of wealth leads to moral corruption",
    "Appearances often hide truth",
    "Power inevitably corrupts those who possess it",
    "Love requires sacrifice"
  ];
  
  const handleGenerateArgument = () => {
    if (!theme.trim()) {
      setError("Please enter a theme to analyze");
      return;
    }
    
    if (!work.trim()) {
      setError("Please enter a literary work to analyze");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    
    // In a real application, this would be an API call
    // For now, we'll simulate a response with example data
    setTimeout(() => {
      let themeFormatted = theme;
      if (!themeFormatted.endsWith(".")) {
        themeFormatted += ".";
      }
      
      let sections: ArgumentSection[] = [];
      
      // Check for specific works/themes for customized responses
      if (work.toLowerCase().includes("gatsby") || 
          work.toLowerCase().includes("fitzgerald") ||
          theme.toLowerCase().includes("american dream")) 
      {
        sections = getGatsbyArgument(themeFormatted);
      } 
      else if (work.toLowerCase().includes("mockingbird") || 
               work.toLowerCase().includes("lee") ||
               theme.toLowerCase().includes("justice") ||
               theme.toLowerCase().includes("prejudice")) 
      {
        sections = getMockingbirdArgument(themeFormatted);
      }
      else {
        sections = getGenericArgument(themeFormatted, work, authorName);
      }
      
      setArgumentSections(sections);
      setIsGenerating(false);
    }, 2000);
  };
  
  const getGatsbyArgument = (theme: string): ArgumentSection[] => {
    return [
      {
        title: "Thesis Statement",
        content: `In F. Scott Fitzgerald's "The Great Gatsby," the corruption of the American Dream is illustrated through Gatsby's ultimately futile pursuit of wealth and status in his attempt to win Daisy's love, revealing how materialism and social stratification undermine the idealistic promise of success through merit and hard work.`,
        isExpanded: true
      },
      {
        title: "Introduction",
        content: `F. Scott Fitzgerald's masterpiece "The Great Gatsby" (1925) examines the hollowness of the American Dream during the decadent Jazz Age. Set against the backdrop of the Roaring Twenties, the novel portrays a society obsessed with wealth and status while revealing the moral emptiness beneath its glittering surface. Through the tragic story of Jay Gatsby and his pursuit of Daisy Buchanan, Fitzgerald crafts a powerful critique of American society and its defining national myth. ${theme} This analysis will examine how Gatsby's journey illustrates the corruption of the American Dream through three key aspects: the moral decay concealed by material excess, the rigid social barriers that prevent true mobility, and the ultimate emptiness of success achieved through dishonest means.`,
        isExpanded: false
      },
      {
        title: "Argument Point 1: Material Excess and Moral Decay",
        content: `Fitzgerald uses Gatsby's lavish parties and ostentatious displays of wealth to illustrate how material excess often conceals moral decay. Gatsby's mansion, described as "a factual imitation of some Hôtel de Ville in Normandy," represents the façade of success built on inauthentic foundations. The extravagant parties where "men and girls came and went like moths among the whisperings and the champagne and the stars" create an atmosphere of hedonistic indulgence, yet the host himself remains detached, revealing the emptiness of these material pursuits. When Nick observes that Gatsby "had come a long way to this blue lawn and his dream must have seemed so close that he could hardly fail to grasp it," Fitzgerald highlights how material wealth fails to deliver true fulfillment. Gatsby's acquisition of wealth and property serves only as a means to win Daisy, but this materialistic approach to love ultimately leads to his downfall, suggesting that the American Dream's emphasis on financial success corrupts more meaningful aspirations.`,
        isExpanded: false
      },
      {
        title: "Argument Point 2: Social Stratification and Barriers",
        content: `Despite the American Dream's promise of mobility through merit, Fitzgerald reveals how rigid social barriers persist in American society. Though Gatsby acquires enormous wealth, he remains an outsider to the "old money" elite represented by Tom and Daisy Buchanan. Tom dismisses Gatsby as "Mr. Nobody from Nowhere," highlighting how birth and background continue to determine social standing regardless of financial achievement. Daisy's voice, famously described as "full of money," symbolizes the inseparable nature of class and character in the novel's social hierarchy. When Gatsby insists that Daisy can erase five years of her life with Tom, Nick reflects that he is "talking to her as if Daisy's reaction was the only thing that mattered." This moment illustrates Gatsby's fundamental misunderstanding of the class barriers that make his dream impossible—he believes wealth alone can overcome established social divisions. Through this portrayal, Fitzgerald critiques the American Dream's false promise of a meritocratic society while exposing the entrenched class structure that truly determines one's place.`,
        isExpanded: false
      },
      {
        title: "Argument Point 3: Dishonesty and the Emptiness of Success",
        content: `Fitzgerald further challenges the American Dream by showing how success achieved through dishonest means leads to emptiness and destruction. Gatsby's wealth comes from illegal bootlegging and financial fraud rather than honest labor, undermining the Dream's emphasis on hard work and integrity. His invention of a false background—claiming to be "an Oxford man" from a wealthy family—reveals his understanding that honest upward mobility is largely impossible. The green light at the end of Daisy's dock, which Gatsby stretches his arms toward in a gesture of yearning, symbolizes both the hope and the ultimate unattainability of his dream. When Nick finally concludes that Gatsby "paid a high price for living too long with a single dream," Fitzgerald suggests that dedicating oneself to the materialistic aspects of the American Dream leads only to spiritual emptiness. The novel's final reflection that "we beat on, boats against the current, borne back ceaselessly into the past" powerfully articulates how the corruption of the American Dream traps individuals in futile pursuit of illusory goals.`,
        isExpanded: false
      },
      {
        title: "Conclusion",
        content: `Through the tragic figure of Jay Gatsby, Fitzgerald presents a devastating critique of the American Dream as it evolved in the 1920s. The novel reveals how the focus on material wealth corrupts the Dream's more noble aspirations, how rigid social hierarchies contradict the myth of meritocracy, and how the pursuit of success through dishonest means leads to moral and spiritual emptiness. As Gatsby's green light fades and his dream collapses, Fitzgerald suggests that the American Dream itself has become corrupted beyond redemption. The enduring power of "The Great Gatsby" lies in its recognition that the pursuit of wealth and status as ends in themselves—a fundamental distortion of the American Dream—leads not to fulfillment but to disillusionment. In Gatsby's downfall, Fitzgerald offers a warning about the dangers of building one's identity and aspirations on the unstable foundation of materialism and social ambition.`,
        isExpanded: false
      }
    ];
  };
  
  const getMockingbirdArgument = (theme: string): ArgumentSection[] => {
    return [
      {
        title: "Thesis Statement",
        content: `In Harper Lee's "To Kill a Mockingbird," the concept of moral courage is developed through Atticus Finch's willingness to defend Tom Robinson despite community opposition, demonstrating that true integrity requires standing for justice even when facing overwhelming social pressure to conform to unjust norms.`,
        isExpanded: true
      },
      {
        title: "Introduction",
        content: `Harper Lee's "To Kill a Mockingbird" (1960) explores the social and moral complexities of racism and justice in the Depression-era South through the innocent perspective of Scout Finch. Set in the fictional town of Maycomb, Alabama, the novel examines how prejudice warps the community's sense of justice while highlighting the rare individuals who demonstrate moral courage in the face of overwhelming social pressure. ${theme} Through the character of Atticus Finch and his defense of Tom Robinson, an African American man falsely accused of raping a white woman, Lee constructs a powerful argument about the nature of moral courage and its relationship to true justice. This analysis will examine how the novel develops this theme through Atticus's unwavering commitment to principle despite community opposition, the contrast between moral and physical courage, and the lasting impact of moral example on the younger generation.`,
        isExpanded: false
      },
      {
        title: "Argument Point 1: Standing for Principle Despite Opposition",
        content: `Atticus Finch embodies moral courage through his willingness to stand by his principles even when it means opposing the entire community. When he chooses to defend Tom Robinson, Atticus understands the social consequences his family will face, yet he explains to Scout, "I couldn't go to church and worship God if I didn't try to help that man." This statement reveals his moral framework—one where justice transcends social conformity. When faced with the mob at the jail, Atticus places himself physically between them and Tom, demonstrating his commitment to protecting the innocent regardless of personal risk. His calm response to being called "nigger-lover" further illustrates his moral resilience; he tells Scout it's just "a term of ignorance" that reveals more about the accuser than the accused. Through these moments, Lee demonstrates that moral courage requires not only adhering to one's principles in easy circumstances but maintaining them under intense social pressure and potential danger.`,
        isExpanded: false
      },
      {
        title: "Argument Point 2: Moral Courage vs. Physical Courage",
        content: `Lee draws an important distinction between physical and moral courage, suggesting that the latter represents a higher form of bravery. This contrast is embodied in Atticus's character, who refuses to boast about his marksmanship skills (physical prowess) yet displays unwavering moral conviction throughout Tom's trial. When Atticus tells Jem, "I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand," he's referring to Mrs. Dubose's battle against morphine addiction, but the statement equally applies to his own form of courage. During the trial, despite knowing the verdict is predetermined by racial prejudice, Atticus provides a vigorous defense that challenges the community's moral complacency. His closing argument directly confronts the jury with their moral responsibility: "In the name of God, believe him." Though he loses the case as expected, his willingness to fight a battle he cannot win demonstrates that moral courage often means pursuing justice without guarantee of success.`,
        isExpanded: false
      },
      {
        title: "Argument Point 3: The Impact of Moral Example",
        content: `Throughout the novel, Lee illustrates how Atticus's moral courage profoundly influences the ethical development of Scout and Jem, suggesting that principled action creates ripple effects beyond immediate outcomes. When Scout confronts the lynch mob by humanizing Walter Cunningham's father, she demonstrates the beginning of her own moral courage, directly inspired by Atticus's example. After the trial, Jem's distress at the unjust verdict shows his developing moral consciousness: "It ain't right, Atticus." Miss Maudie reinforces the significance of Atticus's stand when she tells the children, "We're making a step—it's just a baby-step, but it's a step." This perspective frames moral courage as part of a longer historic struggle for justice rather than judging it solely by immediate results. By the novel's conclusion, Scout's ability to "stand in Boo Radley's shoes" demonstrates how she has internalized Atticus's moral lesson to understand others with empathy rather than judgment—showing that moral courage can transform not just the person who displays it but those who witness it as well.`,
        isExpanded: false
      },
      {
        title: "Conclusion",
        content: `Harper Lee's "To Kill a Mockingbird" ultimately presents moral courage as the willingness to stand for justice and human dignity even when such a stance contradicts social norms and brings personal cost. Through Atticus Finch, Lee creates a character whose principled actions transcend the prejudices of his time and place, offering a model of integrity that influences both his children and the reader. While the novel acknowledges that moral courage may not immediately transform society—as evidenced by Tom's conviction despite his obvious innocence—it suggests that such courage is nevertheless essential to long-term social progress. By contrasting Atticus's moral strength with the community's moral weakness, Lee argues that true justice depends not on laws or institutions alone but on individuals willing to defend what is right regardless of consequences. The novel's enduring impact stems from this powerful message: that moral courage, though difficult and sometimes seemingly futile, remains our best hope for creating a more just society.`,
        isExpanded: false
      }
    ];
  };
  
  const getGenericArgument = (theme: string, work: string, author: string): ArgumentSection[] => {
    const authorText = author ? author : "the author";
    
    return [
      {
        title: "Thesis Statement",
        content: `In ${work}, ${theme} This theme is developed through the protagonist's journey, symbolic elements within the text, and the contrast between competing value systems, ultimately revealing deeper truths about human nature and society.`,
        isExpanded: true
      },
      {
        title: "Introduction",
        content: `${work} explores fundamental questions about human experience and societal values through its narrative structure, characterization, and thematic elements. Set against [relevant historical/social context], the work presents a complex examination of [broader topic related to theme]. ${theme} This analysis will explore how this theme is developed through three key aspects: the protagonist's evolution throughout the narrative, the symbolic framework that reinforces this theme, and the tension between competing values that illuminates the theme's significance to both the text and contemporary society.`,
        isExpanded: false
      },
      {
        title: "Argument Point 1: Character Development",
        content: `The protagonist's journey throughout ${work} provides a central vehicle for exploring the theme that ${theme.toLowerCase()} Through key moments in the narrative, including [potential moment 1], [potential moment 2], and the climactic [potential climax], the character undergoes a transformation that reflects the thematic concerns of the work. ${authorText} uses this character development to illustrate how [aspect of theme] manifests in individual experience. The internal conflicts faced by the protagonist mirror larger societal tensions, creating a microcosm through which readers can examine the broader implications of the theme. By the conclusion of the work, the protagonist's final state serves as evidence for ${authorText}'s perspective on this theme, suggesting that [potential conclusion related to theme].`,
        isExpanded: false
      },
      {
        title: "Argument Point 2: Symbolic Framework",
        content: `${work} employs a rich symbolic framework that reinforces its thematic exploration of ${theme.toLowerCase()} Key symbols might include [potential symbol 1], which represents [potential meaning 1], and [potential symbol 2], which evokes [potential meaning 2]. The recurrence of these symbols throughout the narrative creates a pattern that emphasizes the theme's importance to the work as a whole. ${authorText} particularly uses the symbol of [potential central symbol] to illustrate how [aspect of theme] functions in both the narrative world and, by extension, our own society. The evolution of these symbols throughout the work—from their initial presentation to their final manifestation—parallels the development of the theme itself, providing a visual and emotional language through which readers can engage with abstract concepts in concrete terms.`,
        isExpanded: false
      },
      {
        title: "Argument Point 3: Competing Value Systems",
        content: `The theme that ${theme.toLowerCase()} is further illuminated through the conflict between competing value systems within ${work}. This tension is embodied in the contrast between [character/group representing value system 1] and [character/group representing value system 2]. Through their interactions and eventual resolution (or lack thereof), ${authorText} explores the implications of choosing one value system over another. This conflict creates moral complexity within the work, preventing simplistic interpretations and forcing readers to confront the nuances of [aspect of theme]. By the narrative's conclusion, the apparent triumph of [potentially triumphant value system] suggests ${authorText}'s perspective that [conclusion related to competing values and central theme]. This resolution (or purposeful lack of resolution) invites readers to reconsider their own assumptions about [broader implications of theme].`,
        isExpanded: false
      },
      {
        title: "Conclusion",
        content: `Through character development, symbolic representation, and the conflict between competing value systems, ${work} offers a nuanced exploration of the theme that ${theme.toLowerCase()} ${authorText}'s treatment of this theme reveals its complexity and continued relevance to contemporary society, suggesting that [broader significance of theme]. The work ultimately argues that [final position on theme], a perspective that challenges readers to reconsider [relevant aspect of human experience]. By examining how this theme functions within the text, we gain insight not only into the narrative itself but also into the broader human questions it illuminates. ${work} thus demonstrates literature's power to explore abstract concepts through concrete narrative, offering readers both aesthetic pleasure and deeper understanding of the human condition.`,
        isExpanded: false
      }
    ];
  };
  
  const toggleSection = (index: number) => {
    setArgumentSections(prevSections => 
      prevSections.map((section, i) => 
        i === index 
          ? { ...section, isExpanded: !section.isExpanded } 
          : section
      )
    );
  };
  
  const handleCopySection = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you might add a toast notification here
  };
  
  const handleCopyAll = () => {
    const fullText = argumentSections.map(section => 
      `${section.title}\n\n${section.content}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(fullText);
    // In a real app, you might add a toast notification here
  };
  
  const handleThemeExample = (example: string) => {
    setTheme(example);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 w-10 h-10 rounded-md flex items-center justify-center">
            <AlignLeft className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Literary Argument Helper</h1>
            <p className="text-gray-400">Turn a theme into a fully developed analytical argument</p>
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
      
      {/* Input Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Enter Your Literary Analysis Information</h2>
        </div>
        <div className="card-body space-y-4">
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">
              Theme or Argument*
            </label>
            <textarea
              id="theme"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter a theme or argument (e.g., 'The American Dream is ultimately unattainable')"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              rows={2}
            />
            <div className="mt-1 text-sm text-gray-400">
              This will become the basis of your thesis statement
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-2/3">
              <label htmlFor="work" className="block text-sm font-medium text-gray-300 mb-1">
                Literary Work*
              </label>
              <input
                id="work"
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter the title of the work (e.g., 'The Great Gatsby')"
                value={work}
                onChange={(e) => setWork(e.target.value)}
              />
            </div>
            
            <div className="md:w-1/3 mt-4 md:mt-0">
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                Author
              </label>
              <input
                id="author"
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Author's name (optional)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400 mb-2">Example themes:</div>
            <div className="flex flex-wrap gap-2">
              {exampleThemes.map((exampleTheme, index) => (
                <button
                  key={index}
                  className="bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 text-sm flex items-center"
                  onClick={() => handleThemeExample(exampleTheme)}
                >
                  <Lightbulb className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-gray-300 text-sm truncate max-w-[300px]">{exampleTheme}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-red-400">*</span>
              <span className="text-gray-400 text-sm ml-1">Required fields</span>
            </div>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 flex items-center disabled:opacity-50"
              onClick={handleGenerateArgument}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Literary Argument'}
              <Sparkles className="h-4 w-4 ml-2" />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Results Section */}
      {argumentSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-400">Your Literary Argument</h2>
            <button
              className="flex items-center text-green-400 hover:text-green-300 px-3 py-1 rounded-md bg-green-900/20 border border-green-800"
              onClick={handleCopyAll}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy All
            </button>
          </div>
          
          {argumentSections.map((section, index) => (
            <div key={index} className="card">
              <div 
                className="card-header flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <h3 className="font-semibold">{section.title}</h3>
                <button className="text-gray-400 hover:text-white">
                  {section.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              {section.isExpanded && (
                <div className="card-body">
                  <p className="text-gray-300 mb-3 whitespace-pre-line">{section.content}</p>
                  <div className="flex justify-end">
                    <button
                      className="flex items-center text-sm text-gray-400 hover:text-white"
                      onClick={() => handleCopySection(section.content)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Section
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <div className="flex">
              <Info className="w-5 h-5 text-green-400 flex-shrink-0 mr-2 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-green-400 mb-1">How to Use This Argument</h3>
                <p className="text-gray-300 text-sm">
                  Use this generated argument as a starting point for your literary analysis essay. 
                  Customize the content by adding specific textual evidence, refining the analysis 
                  to match your interpretation, and adjusting the language to your personal style. 
                  Remember that the strongest literary arguments combine thoughtful analysis with 
                  specific references to the text.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-start">
                    <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</div>
                    <span className="text-gray-300 text-sm">Add specific quotes and examples from the text to support each point</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</div>
                    <span className="text-gray-300 text-sm">Connect your analysis to historical context and literary techniques</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-900/30 text-green-300 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</div>
                    <span className="text-gray-300 text-sm">Revise for clarity, coherence, and your own unique voice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tips Section (when no argument is generated) */}
      {argumentSections.length === 0 && !isGenerating && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold">Tips for Strong Literary Arguments</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-start">
                <BookOpen className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-200 font-medium">Focus on a Specific Theme</h3>
                  <p className="text-gray-300 text-sm">
                    Narrow your analysis to a specific aspect of the work rather than trying to cover everything.
                    The more specific your theme, the deeper your analysis can be.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <PenSquare className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-200 font-medium">Support With Textual Evidence</h3>
                  <p className="text-gray-300 text-sm">
                    Strong arguments incorporate specific quotes and examples from the text that directly
                    support your point. Always analyze evidence rather than simply presenting it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MousePointer className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-200 font-medium">Consider Literary Techniques</h3>
                  <p className="text-gray-300 text-sm">
                    Examine how the author uses elements like symbolism, imagery, characterization, and structure
                    to develop the theme you're analyzing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Lightbulb className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-200 font-medium">Go Beyond the Obvious</h3>
                  <p className="text-gray-300 text-sm">
                    The best literary analyses reveal insights that aren't immediately apparent to casual readers.
                    Look for subtext, contradictions, and complexities within the work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 