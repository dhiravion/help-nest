"use client";

import { Camera, ClipboardPaste, MessageSquare, HeadphonesIcon, Bell, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-10 px-4 font-sans text-slate-200 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative z-10"
      >
        
        {/* Header Section */}
        <div className="bg-slate-900/80 border-b border-white/5 p-6 flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl h-fit shadow-lg shadow-blue-500/20">
              <LifeBuoy className="text-white h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">HelpNest AI</h1>
              <p className="text-blue-200 text-sm mt-0.5 opacity-80">Next-gen tech support.</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Your AI Tech Assistant
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              What can we help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">fix today?</span>
            </h2>
            <p className="text-slate-400 mb-8 text-base md:text-lg">
              Don&apos;t worry about technical terms. Just show us what&apos;s happening and our Gemini-powered assistant will diagnose it.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            
            {/* Option 1 */}
            <motion.div variants={itemVariants}>
              <Link href="/chat?mode=photo" className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="bg-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Camera className="text-blue-400 h-6 w-6 flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">Upload a screenshot</h3>
                    <p className="text-slate-400 text-sm mt-1">Show us the error on your screen.</p>
                  </div>
                  <div className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                    &rsaquo;
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Option 2 */}
            <motion.div variants={itemVariants}>
              <Link href="/chat?mode=paste" className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="bg-indigo-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <ClipboardPaste className="text-indigo-400 h-6 w-6 flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">Paste your error message</h3>
                    <p className="text-slate-400 text-sm mt-1">Copy and paste anything you don&apos;t understand.</p>
                  </div>
                  <div className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                    &rsaquo;
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Option 3 */}
            <motion.div variants={itemVariants}>
              <Link href="/chat?mode=text" className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-5 relative z-10">
                  <div className="bg-purple-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <MessageSquare className="text-purple-400 h-6 w-6 flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">Explain it in your own words</h3>
                    <p className="text-slate-400 text-sm mt-1">For example: &quot;My Wi-Fi is not working.&quot;</p>
                  </div>
                  <div className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all">
                    &rsaquo;
                  </div>
                </div>
              </Link>
            </motion.div>

          </motion.div>

          {/* Need a real person */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 bg-blue-950/30 border border-blue-900/50 rounded-2xl p-5 hover:bg-blue-900/30 transition-colors"
          >
            <Link href="/support" className="flex items-start gap-4 group">
              <div className="bg-blue-900/50 p-2 rounded-lg group-hover:bg-blue-800/50 transition-colors">
                <HeadphonesIcon className="text-blue-400 h-6 w-6 flex-shrink-0" />
              </div>
              <div>
                <h3 className="text-[17px] font-medium text-blue-300 group-hover:text-blue-200 transition-colors">Need a real person?</h3>
                <p className="text-blue-200/60 text-sm mt-1">Our support team can help if the AI doesn&apos;t solve your problem.</p>
              </div>
            </Link>
          </motion.div>
          
        </div>
      </motion.div>
      
      <p className="text-slate-500 text-sm mt-8 text-center font-medium">
        HelpNest AI Concept · Powered by Gemini
      </p>
      
      <Chatbot />
    </div>
  );
}
