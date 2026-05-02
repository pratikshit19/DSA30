import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, RotateCcw, CheckCircle2, Circle, ChevronLeft, Terminal, Lightbulb, Lock, Unlock, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeWorkspace({ question, onBack, onComplete, isCompleted }) {
  const [code, setCode] = useState(question.starterCode);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [revealedHints, setRevealedHints] = useState(0);
  const [activeExplanation, setActiveExplanation] = useState(null);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Medium": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Hard": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    setIsRunning(true);
    setResults(null);
    setErrorMsg("");

    const injectHelpers = `
      function ListNode(val, next) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
      function TreeNode(val, left, right) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
      function buildList(arr) {
        if (!arr || !arr.length) return null;
        let head = new ListNode(arr[0]);
        let curr = head;
        for(let i=1; i<arr.length; i++) {
          curr.next = new ListNode(arr[i]);
          curr = curr.next;
        }
        return head;
      }
      function listToArray(head) {
        let res = [];
        while(head) { res.push(head.val); head = head.next; }
        return res;
      }
      function buildTree(arr) {
        if (!arr || !arr.length) return null;
        let root = new TreeNode(arr[0]);
        let q = [root];
        let i = 1;
        while(q.length && i < arr.length) {
          let curr = q.shift();
          if (arr[i] !== null && arr[i] !== undefined) {
            curr.left = new TreeNode(arr[i]);
            q.push(curr.left);
          }
          i++;
          if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            curr.right = new TreeNode(arr[i]);
            q.push(curr.right);
          }
          i++;
        }
        return root;
      }
      function treeToArray(root) {
        if (!root) return [];
        let res = [];
        let q = [root];
        while(q.length) {
          let curr = q.shift();
          if (curr) {
            res.push(curr.val);
            q.push(curr.left);
            q.push(curr.right);
          } else {
            res.push(null);
          }
        }
        while(res.length > 0 && res[res.length-1] === null) res.pop();
        return res;
      }
    `;

    setTimeout(() => {
      try {
        let testOutcomes = [];
        let allPassed = true;

        for (let i = 0; i < question.testCases.length; i++) {
          const tc = question.testCases[i];
          const argsCloneStr = JSON.stringify(tc.inputArgs);
          
          let execStr = injectHelpers + "\n" + code + "\n";
          execStr += "let args = JSON.parse('" + argsCloneStr.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "');\n";
          
          if (question.argsType === 'linked-list') {
            execStr += "args = args.map(arg => Array.isArray(arg) ? buildList(arg) : arg);\n";
          } else if (question.argsType === 'binary-tree') {
            execStr += "args = args.map(arg => Array.isArray(arg) ? buildTree(arg) : arg);\n";
          }
          
          execStr += "let res = " + question.functionName + ".apply(null, args);\n";
          
          if (question.argsType === 'linked-list' && (question.id === 'reverse-linked-list' || question.id === 'merge-two-sorted-lists')) {
            execStr += "res = listToArray(res);\n";
          } else if (question.argsType === 'binary-tree' && question.id === 'invert-binary-tree') {
            execStr += "res = treeToArray(res);\n";
          }
          
          execStr += "return res;";
          
          // eslint-disable-next-line no-new-func
          const fn = new Function(execStr);
          const result = fn();
          
          const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
          if (!passed) allPassed = false;
          
          testOutcomes.push({
            input: tc.inputArgs,
            expected: tc.expected,
            actual: result,
            passed: passed
          });
        }
        
        setResults({ outcomes: testOutcomes, allPassed });
        if (allPassed && !isCompleted) {
          onComplete(); // Auto complete on success
        }
      } catch (error) {
        setErrorMsg(error.toString());
      } finally {
        setIsRunning(false);
      }
    }, 100);
  };

  const revealNextHint = () => {
    if (revealedHints < (question.hints?.length || 0)) {
      setRevealedHints(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] w-full border border-white/10 rounded-2xl overflow-hidden glass-panel shadow-2xl relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none z-0"></div>

      {/* Left Panel: Description & Hints */}
      <div className="w-full md:w-5/12 bg-black/60 flex flex-col border-b md:border-b-0 md:border-r border-white/10 relative z-10 backdrop-blur-xl">
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <Button variant="ghost" className="self-start mb-6 text-gray-400 hover:text-white group" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Curriculum
          </Button>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono">
                  Problem
                </Badge>
                <Badge variant="outline" className={`font-mono text-[10px] ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </Badge>
              </div>
              {isCompleted && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 gap-1 pr-3">
                    <CheckCircle2 className="w-3 h-3" /> Solved
                  </Badge>
                </motion.div>
              )}
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">{question.title}</h2>
          </div>
          
          <div className="prose prose-invert max-w-none mb-10">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px] font-medium bg-white/5 p-6 rounded-xl border border-white/5">
              {question.description}
            </div>
          </div>

          {question.hints && question.hints.length > 0 && (
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" /> Guided Thinking
                </h3>
                <span className="text-xs text-gray-500 font-mono">{revealedHints} / {question.hints.length} Unlocked</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {question.hints.map((hint, idx) => {
                    const isRevealed = idx < revealedHints;
                    return (
                      <motion.div key={idx} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${isRevealed ? "bg-white/5 border-yellow-500/30" : "bg-black/40 border-white/5 border-dashed"}`}>
                        {isRevealed ? (
                          <div className="flex flex-col">
                            <div className="p-5 flex gap-4 items-start pb-4">
                              <div className="mt-1 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-yellow-400 text-xs font-bold">{idx + 1}</span>
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed pt-1">{hint.text}</p>
                            </div>
                            {hint.code && (
                              <div className="bg-[#0F172A] border-t border-white/5 p-4 overflow-x-auto custom-scrollbar relative group">
                                <div className="absolute top-2 right-4 flex items-center gap-3">
                                  <span className="text-[10px] text-gray-500 font-mono uppercase opacity-50">Javascript</span>
                                  {hint.explanation && (
                                    <button 
                                      onClick={() => setActiveExplanation(hint.explanation)}
                                      className="text-cyan-500 hover:text-cyan-300 transition-colors bg-cyan-500/10 hover:bg-cyan-500/20 p-1.5 rounded-md"
                                      title="Explain Code"
                                    >
                                      <Info className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                                <pre className="text-xs text-blue-300 font-mono leading-relaxed mt-2">
                                  <code>{hint.code}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 flex items-center justify-center text-gray-500 gap-2 select-none">
                            <Lock className="w-4 h-4 opacity-50" />
                            <span className="text-sm font-medium">Hint {idx + 1} Locked</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {revealedHints < question.hints.length && (
                  <Button onClick={revealNextHint} variant="outline" className="mt-2 bg-transparent border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400">
                    <Unlock className="w-4 h-4 mr-2" /> Reveal Next Hint
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Editor & Test Results */}
      <div className="w-full md:w-7/12 flex flex-col bg-[#0F172A] relative z-10">
        <div className="flex justify-between items-center p-4 bg-[#1E293B] border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            {/* Timer UI */}
            <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <span className={`text-sm font-mono font-bold ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
                {formatTime(timeLeft)}
              </span>
              <button 
                onClick={() => setIsTimerActive(!isTimerActive)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isTimerActive ? <X className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => { setTimeLeft(2700); setIsTimerActive(false); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setCode(question.starterCode)} className="h-9 border-white/10 text-gray-300 hover:text-white bg-transparent hover:bg-white/5">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button size="sm" onClick={runCode} disabled={isRunning} className="h-9 bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/30">
              <Play className="w-4 h-4 mr-2 fill-current" /> {isRunning ? "Testing..." : "Run Tests"}
            </Button>
          </div>
        </div>

        <div className="flex-1 min-h-[250px] bg-[#0F172A]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{ minimap: { enabled: false }, fontSize: 15, fontFamily: "'Fira Code', 'Inter', monospace", fontLigatures: true, wordWrap: "on", padding: { top: 20 } }}
          />
        </div>

        {/* Test Results Panel */}
        <div className="h-[40%] min-h-[250px] bg-[#020617] border-t border-white/10 flex flex-col relative">
          <div className="px-5 py-3 bg-[#0F172A] border-b border-white/5 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Test Results
            </span>
          </div>
          
          <div className="p-0 overflow-y-auto flex-1 custom-scrollbar">
            {!results && !errorMsg && (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 italic">
                Click "Run Tests" to evaluate your solution.
              </div>
            )}

            {errorMsg && (
              <div className="p-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><XCircle className="w-5 h-5"/> Execution Error</h4>
                  <pre className="text-red-300/80 font-mono text-xs whitespace-pre-wrap">{errorMsg}</pre>
                </div>
              </div>
            )}

            {results && (
              <div className="p-6 flex flex-col gap-4">
                <div className={`p-4 rounded-xl border ${results.allPassed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${results.allPassed ? 'text-green-400' : 'text-red-400'}`}>
                    {results.allPassed ? <><CheckCircle2 className="w-6 h-6"/> All Tests Passed!</> : <><XCircle className="w-6 h-6"/> Some Tests Failed</>}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {results.outcomes.map((tc, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                      key={idx} 
                      className={`rounded-lg border p-4 ${tc.passed ? 'bg-white/5 border-white/10' : 'bg-red-500/5 border-red-500/20'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {tc.passed ? <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Pass</Badge> : <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Fail</Badge>}
                        <span className="text-gray-400 font-medium text-sm">Test Case {idx + 1}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Input</span>
                          <code className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{JSON.stringify(tc.input)}</code>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Expected Output</span>
                          <code className="text-xs text-green-300 bg-black/40 px-2 py-1 rounded">{JSON.stringify(tc.expected)}</code>
                        </div>
                        {!tc.passed && (
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <span className="text-[10px] uppercase tracking-wider text-red-400/80 font-bold">Your Output</span>
                            <code className="text-xs text-red-300 bg-red-950/40 border border-red-900/50 px-2 py-1 rounded">{JSON.stringify(tc.actual)}</code>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Explanation Modal */}
      <AnimatePresence>
        {activeExplanation && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0F172A] border border-white/10 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/5 bg-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-400" /> Code Explanation
                </h3>
                <button onClick={() => setActiveExplanation(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {activeExplanation}
                </div>
              </div>
              <div className="p-5 border-t border-white/5 bg-black/20 flex justify-end">
                <Button onClick={() => setActiveExplanation(null)} className="bg-white/10 hover:bg-white/20 text-white">Got it</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
