import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Map, ChevronLeft, CheckCircle2, Circle, Code2, TerminalSquare, Lightbulb } from "lucide-react";
import { roadmapData } from "./data/roadmap";
import { conceptsData } from "./data/concepts";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import CodeWorkspace from "./components/CodeWorkspace";

export default function App() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isLanding, setIsLanding] = useState(true);
  
  // Progress tracking
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    const saved = localStorage.getItem("dsa-progress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("dsa-progress", JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id) => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const totalQuestions = roadmapData.reduce((acc, day) => acc + day.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  // Filtered Roadmap Data
  const filteredRoadmap = roadmapData.map(day => ({
    ...day,
    questions: day.questions.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
  })).filter(day => day.questions.length > 0 || (searchQuery === "" && difficultyFilter === "All"));

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Medium": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Hard": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  if (isLanding) {
    return (
      <div className="min-h-screen text-white bg-black flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full text-center relative z-10 space-y-10"
        >
          <div className="space-y-4 flex flex-col items-center">
            <motion.img 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src="/logo.png" 
              alt="Logo" 
              className="w-24 h-24 md:w-32 md:h-32 mb-4 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
            >
              <Badge className="bg-primary/20 text-primary border-primary/30 font-mono">NEW</Badge>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Complete Blind 75 Curriculum</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              Master DSA in <br />
              <span className="bg-gradient-to-r from-cyan-400 via-primary to-violet-500 bg-clip-text text-transparent italic">
                30 Days.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              The ultimate bootcamp for the Blind 75. Zero to intermediate proficiency with a Socratic tutor and an automated evaluation engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <Map className="w-6 h-6 text-cyan-400" />, title: "30-Day Roadmap", desc: "Structured progression through every core pattern." },
              { icon: <TerminalSquare className="w-6 h-6 text-primary" />, title: "Smart Judge", desc: "Real-time evaluation with 75+ professional challenges." },
              { icon: <Lightbulb className="w-6 h-6 text-amber-400" />, title: "Socratic Tutor", desc: "Guided thinking hints that help you learn, not just copy." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]"
              >
                <div className="p-3 bg-white/5 rounded-xl w-fit mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              onClick={() => setIsLanding(false)}
              className="px-10 py-8 text-xl font-bold bg-white text-black hover:bg-gray-200 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 group"
            >
              Start Training <ChevronLeft className="w-6 h-6 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-white/5 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
                +2k
              </div>
              <span className="ml-4 text-sm text-gray-500 font-medium">Joined by 2,000+ engineers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hidden lg:block"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-mono text-emerald-400">System: Ready to master Arrays?</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center overflow-x-hidden">
      
      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setActiveTab("roadmap"); setSelectedDay(null); setActiveQuestion(null); setSearchQuery(""); setDifficultyFilter("All"); }}>
          <div className="p-1 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-violet-400 transition-all">
              30-Day DSA Mastery
            </h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Zero to Intermediate in JavaScript</p>
          </div>
        </div>
        
        <nav className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
          <Button 
            variant={activeTab === "roadmap" ? "secondary" : "ghost"} 
            className={`gap-2 rounded-lg transition-all ${activeTab === "roadmap" ? "bg-white/10 hover:bg-white/20" : ""}`}
            onClick={() => { setActiveTab("roadmap"); setSelectedDay(null); setActiveQuestion(null); }}
          >
            <Map className="w-4 h-4" /> Roadmap
          </Button>
          <Button 
            variant={activeTab === "learn" ? "secondary" : "ghost"} 
            className={`gap-2 rounded-lg transition-all ${activeTab === "learn" ? "bg-white/10 hover:bg-white/20" : ""}`}
            onClick={() => { setActiveTab("learn"); setActiveQuestion(null); }}
          >
            <BookOpen className="w-4 h-4" /> Learning Hub
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto p-4 md:p-6 flex-1 flex flex-col gap-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {activeQuestion ? (
            <motion.div key="workspace" {...pageTransition} className="h-full w-full">
               <CodeWorkspace 
                 question={activeQuestion} 
                 onBack={() => setActiveQuestion(null)}
                 isCompleted={!!completedQuestions[activeQuestion.id]}
                 onComplete={() => toggleQuestion(activeQuestion.id)}
               />
            </motion.div>
          ) : (
            <motion.div key="dashboard" {...pageTransition} className="flex flex-col gap-8 w-full">
              
              {/* Global Progress */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Your Journey</h3>
                    <p className="text-sm text-gray-400">{completedCount} of {totalQuestions} challenges conquered</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-cyan-400">{Math.round(progressPercent)}</span>
                    <span className="text-lg text-cyan-500/50">%</span>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-3 bg-white/5" indicatorColor="bg-gradient-to-r from-cyan-400 to-violet-500" />
              </div>

              {activeTab === "roadmap" && (
                selectedDay === null ? (
                  <div className="space-y-6">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="relative w-full md:max-w-md">
                        <TerminalSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="text"
                          placeholder="Search challenges (e.g. 'Two Sum')..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 custom-scrollbar">
                        {["All", "Easy", "Medium", "Hard"].map(diff => (
                          <Button 
                            key={diff}
                            variant="outline"
                            size="sm"
                            className={`rounded-full border-white/10 px-4 transition-all ${difficultyFilter === diff ? 'bg-primary text-white border-primary' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                            onClick={() => setDifficultyFilter(diff)}
                          >
                            {diff}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      variants={containerVariants} 
                      initial="hidden" 
                      animate="show" 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5"
                    >
                      {filteredRoadmap.map((dayData) => {
                        const dayCompletedCount = dayData.questions.filter(q => completedQuestions[q.id]).length;
                        const isDayComplete = dayData.questions.length > 0 && dayCompletedCount === dayData.questions.length;
                        
                        return (
                          <motion.div variants={itemVariants} key={dayData.day}>
                            <Card 
                              className={`glass-panel h-full flex flex-col cursor-pointer group hover:-translate-y-1 transition-all duration-300 ${isDayComplete ? 'border-primary/30' : 'border-white/5'}`}
                              onClick={() => setSelectedDay(dayData.day)}
                            >
                              <CardHeader className="p-5 pb-3">
                                <div className="flex justify-between items-start mb-3">
                                  <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-300 font-mono">
                                    Day {dayData.day}
                                  </Badge>
                                  {isDayComplete && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                      <CheckCircle2 className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                                    </motion.div>
                                  )}
                                </div>
                                <CardTitle className="text-lg text-white group-hover:text-cyan-300 transition-colors">{dayData.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-end">
                                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">{dayData.theory}</p>
                                
                                {/* Mini progress bar for the day */}
                                {dayData.questions.length > 0 && (
                                  <div className="mt-auto flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary transition-all duration-500" 
                                        style={{ width: `${(dayCompletedCount / dayData.questions.length) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-mono">{dayCompletedCount}/{dayData.questions.length}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                    
                    {filteredRoadmap.length === 0 && (
                      <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400">No challenges found matching your search.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
                    
                    <Button variant="ghost" className="mb-8 -ml-4 text-gray-400 hover:text-white" onClick={() => setSelectedDay(null)}>
                      <ChevronLeft className="w-5 h-5 mr-1" /> Back to Roadmap
                    </Button>
                    
                    {roadmapData.filter(d => d.day === selectedDay).map((dayData) => (
                      <div key={dayData.day} className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 font-mono text-sm px-3 py-1">Day {dayData.day}</Badge>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">{dayData.title}</h2>
                        
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-10 text-gray-300 relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500"></div>
                          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-cyan-400" /> Theory & Pattern
                          </h3>
                          <p className="leading-relaxed text-lg opacity-90">{dayData.theory}</p>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                          <Code2 className="w-6 h-6 text-primary" /> Practice Questions
                        </h3>
                        
                        {dayData.questions.length === 0 ? (
                          <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-8 text-center">
                            <p className="text-gray-400 italic">No specific questions today. Take time to review your past work!</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {dayData.questions.map((q, idx) => {
                              const isDone = !!completedQuestions[q.id];
                              return (
                                <motion.div 
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  key={q.id} 
                                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-300 ${isDone ? 'bg-primary/5 border-primary/20' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                                >
                                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleQuestion(q.id)}>
                                    <div className="flex-shrink-0 relative">
                                      {isDone ? 
                                        <CheckCircle2 className="w-7 h-7 text-primary" /> : 
                                        <Circle className="w-7 h-7 text-gray-500 hover:text-gray-400 transition-colors" />
                                      }
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-2">
                                        <label 
                                          className={`text-lg font-semibold cursor-pointer transition-all ${isDone ? 'text-gray-500 line-through decoration-primary/50 decoration-2' : 'text-white'}`}
                                        >
                                          {q.title}
                                        </label>
                                        <Badge variant="outline" className={`text-[10px] px-2 py-0 h-4 ${getDifficultyColor(q.difficulty)}`}>
                                          {q.difficulty}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <Button 
                                    onClick={() => setActiveQuestion(q)}
                                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20 rounded-lg group"
                                  >
                                    Solve in Editor <ChevronLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                </motion.div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )
              )}

              {activeTab === "learn" && (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden h-[75vh]">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight flex items-center gap-3">
                      <BookOpen className="w-8 h-8 text-primary" /> Learning Hub
                    </h2>
                    <Tabs defaultValue={conceptsData[0].id} className="flex flex-col md:flex-row gap-8 flex-1 overflow-hidden">
                      <TabsList className="flex md:flex-col h-auto bg-transparent items-start justify-start space-y-2 border-r border-white/10 pr-6 min-w-[200px] overflow-y-auto custom-scrollbar pb-4">
                        {conceptsData.map(c => (
                          <TabsTrigger 
                            key={c.id} 
                            value={c.id}
                            className="w-full justify-start text-left data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:font-semibold text-gray-400 whitespace-normal rounded-lg px-4 py-3 transition-all"
                          >
                            {c.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-10">
                        {conceptsData.map(c => (
                          <TabsContent key={c.id} value={c.id} className="mt-0 outline-none">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                              <h3 className="text-3xl font-bold mb-6 text-white">{c.title}</h3>
                              
                              <div className="space-y-8">
                                {/* Overview */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
                                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap relative z-10 italic opacity-90">{c.overview || c.content}</p>
                                </div>

                                {/* Detailed Sections */}
                                {c.sections?.map((section, idx) => (
                                  <div key={idx} className="space-y-3">
                                    <h4 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                                      {section.title}
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap pl-3.5 border-l-2 border-white/5">{section.content}</p>
                                  </div>
                                ))}

                                {/* Code Examples */}
                                {c.examples?.map((ex, idx) => (
                                  <div key={idx} className="space-y-4">
                                    <h4 className="text-xl font-bold text-violet-400 flex items-center gap-2">
                                      <Code2 className="w-5 h-5" /> {ex.title}
                                    </h4>
                                    {ex.description && <p className="text-gray-400 text-sm italic">{ex.description}</p>}
                                    <div className="bg-[#0F172A] border border-white/10 rounded-xl overflow-hidden">
                                      <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Example Code</span>
                                        <div className="flex gap-1.5">
                                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                        </div>
                                      </div>
                                      <pre className="p-5 text-sm text-blue-300 font-mono overflow-x-auto custom-scrollbar leading-relaxed">
                                        <code>{ex.code}</code>
                                      </pre>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          </TabsContent>
                        ))}
                      </div>
                    </Tabs>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
