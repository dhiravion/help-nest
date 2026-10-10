import Link from "next/link";
import { HeadphonesIcon, ArrowLeft } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      <div className="bg-[#0f172a] text-white p-4 flex items-center shadow-md">
        <Link href="/" className="mr-4 p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Human Support</h1>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeadphonesIcon className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">We&apos;re here to help</h2>
          <p className="text-slate-600 mb-6">
            Our technical support team has been notified and will be with you shortly. Please keep this page open.
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-500 font-medium mb-1">Current Wait Time</p>
            <p className="text-2xl font-bold text-slate-800">~ 2 minutes</p>
          </div>
          <Link href="/" className="inline-block px-6 py-3 bg-[#0f172a] text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
