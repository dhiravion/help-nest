"use client";

import { useRef, useEffect, useState } from "react";
import { Camera, Paperclip, ArrowUp, User, Bot, Loader2, ArrowLeft, Menu, Plus, MessageSquare, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState("gemma4");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    body: {
      model: selectedModel,
    },
    initialMessages: [
      {
        id: 'welcome-message',
        role: "assistant",
        content: "Hi there! I'm HelpNest, your IT support assistant. How can I help you today? Please explain your issue, paste an error message, or upload a screenshot."
      }
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (mode === "photo") {
      setInput("I have a photo of my issue. (Image upload feature is being implemented)");
    } else if (mode === "paste") {
      setInput("Here is my error message: \n\n```\n\n```");
    }
  }, [mode, setInput]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChangeWithResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;
    
    if (input.trim()) {
      handleSubmit(e);
    }
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Clear file after submit
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex h-screen bg-[#212121] text-[#ececec] font-sans overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 bg-[#171717] h-full flex flex-col hidden md:flex"
          >
            <div className="p-3">
              <button className="flex items-center gap-2 w-full p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-sm font-medium">
                <div className="bg-white text-black rounded-full p-1"><Plus className="h-4 w-4" /></div>
                New chat
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-3 py-2 text-sm text-[#9b9b9b]">
              <div className="text-xs font-semibold mb-3 px-2 mt-4 text-[#9b9b9b]">Today</div>
              <button className="flex items-center gap-2 w-full p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-left truncate">
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">IT Support Issue</span>
              </button>
            </div>
            
            <div className="p-3 mt-auto border-t border-white/5">
              <Link href="/" className="flex items-center gap-2 p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-sm text-[#ececec]">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top bar */}
        <div className="h-14 flex items-center justify-between px-3 md:px-4 sticky top-0 bg-[#212121] z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-[#ececec] hidden md:block"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-[#ececec] md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="relative">
              <div 
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="font-semibold text-lg flex items-center gap-2 ml-1 cursor-pointer hover:bg-[#2f2f2f] px-3 py-1.5 rounded-lg transition-colors text-[#ececec]"
              >
                HelpNest 
                <span className="text-[#9b9b9b] text-sm font-normal flex items-center gap-1">
                  <span className="text-emerald-400">●</span> {selectedModel} (Local)
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </div>
              
              <AnimatePresence>
                {isModelDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1 mt-1 w-56 bg-[#2f2f2f] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="text-xs font-semibold text-[#9b9b9b] px-2 py-1 mb-1">Local Models</div>
                      {["gemma4", "llama2", "llama3", "mistral"].map((modelName) => (
                        <button
                          key={modelName}
                          onClick={() => {
                            setSelectedModel(modelName);
                            setIsModelDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedModel === modelName ? "bg-white/10 text-white" : "hover:bg-white/5 text-[#ececec]"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            {modelName}
                          </div>
                          {selectedModel === modelName && <span className="text-emerald-400 text-sm leading-none">✓</span>}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto w-full pb-32">
          <div className="max-w-3xl mx-auto w-full px-4 md:px-5">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col mb-6 mt-6",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-start gap-4 w-full">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full border border-white/10 bg-white flex items-center justify-center mt-1">
                        <Bot className="text-black h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1 text-[#ececec]">
                        <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/10 max-w-none text-base">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.role === "user" && (
                    <div className="bg-[#2f2f2f] px-5 py-3 rounded-3xl max-w-[85%] md:max-w-[70%] text-[#ececec] text-base leading-relaxed break-words whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 mb-6 mt-6">
                <div className="flex-shrink-0 h-8 w-8 rounded-full border border-white/10 bg-white flex items-center justify-center mt-1">
                  <Bot className="text-black h-5 w-5" />
                </div>
                <div className="flex-1 pt-2 flex gap-1 items-center h-8">
                   <motion.div className="h-2 w-2 bg-[#ececec] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} />
                   <motion.div className="h-2 w-2 bg-[#ececec] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} />
                   <motion.div className="h-2 w-2 bg-[#ececec] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Form */}
        <div className="absolute bottom-0 left-0 right-0 w-full pt-6 pb-6 px-4 md:px-0 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent">
          <div className="max-w-3xl mx-auto w-full relative">
            
            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-3 justify-center"
              >
                {[
                  "Repeated problems waste troubleshooting time",
                  "Internet outages at remote sites",
                  "Small businesses cannot afford dedicated IT support",
                  "People cannot understand technical errors",
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="bg-[#2f2f2f] hover:bg-[#3f3f3f] text-[#ececec] text-sm px-4 py-2 rounded-xl transition-colors border border-white/5 text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </motion.div>
            )}
            
            {/* File Preview Area */}
            <AnimatePresence>
              {previewUrl && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-[calc(100%+12px)] left-0 bg-[#2f2f2f] rounded-xl p-2 border border-white/10 shadow-lg flex items-center gap-3"
                >
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-sm font-medium truncate max-w-[150px]">{selectedFile?.name}</span>
                    <span className="text-xs text-[#9b9b9b]">Image attached</span>
                  </div>
                  <button 
                    onClick={removeFile}
                    type="button"
                    className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full border border-white/20 hover:bg-[#2f2f2f]"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={onFormSubmit} className="relative flex flex-col bg-[#2f2f2f] rounded-[24px] border border-transparent focus-within:border-white/10 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)]">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChangeWithResize}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() || selectedFile) {
                      onFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                    }
                  }
                }}
                placeholder="Message HelpNest..."
                className="w-full max-h-[200px] bg-transparent pt-3.5 pb-12 px-12 text-[#ececec] outline-none resize-none placeholder:text-[#9b9b9b] placeholder:font-light"
                rows={1}
                style={{ minHeight: '52px' }}
              />
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden" 
              />
              
              <div className="absolute bottom-2.5 left-2 flex items-center gap-1">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-[#ececec] hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute bottom-2.5 right-2 flex items-center">
                <button
                  type="submit"
                  disabled={isLoading || (!input.trim() && !selectedFile)}
                  className="p-1.5 bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:bg-[#4f4f4f] disabled:text-[#ececec] transition-colors flex items-center justify-center w-8 h-8"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
                </button>
              </div>
            </form>
            <div className="text-center mt-2 text-xs text-[#9b9b9b]">
              HelpNest AI can make mistakes. Consider verifying important information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

