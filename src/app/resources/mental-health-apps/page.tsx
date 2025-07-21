'use client';
import { Smile, Cloud, Sun, Heart, Lock, User, Brain, Feather, Moon, Star, ThumbsUp, Shield, MessageCircle, CheckCircle, Zap, Globe, BookOpen, PlusCircle, Activity, AppWindow } from 'lucide-react';

const apps = [
  { name: 'Calm', icon: <Cloud className="w-10 h-10 text-sky-400" /> },
  { name: 'Headspace', icon: <Sun className="w-10 h-10 text-orange-400" /> },
  { name: 'MindShift CBT', icon: <Smile className="w-10 h-10 text-blue-400" /> },
  { name: 'Happify', icon: <Heart className="w-10 h-10 text-pink-400" /> },
  { name: 'PTSD Coach', icon: <Shield className="w-10 h-10 text-purple-400" /> },
  { name: 'Sanvello', icon: <Feather className="w-10 h-10 text-green-400" /> },
  { name: 'Insight Timer', icon: <Moon className="w-10 h-10 text-indigo-400" /> },
  { name: 'Talkspace', icon: <MessageCircle className="w-10 h-10 text-yellow-400" /> },
  { name: 'Moodfit', icon: <ThumbsUp className="w-10 h-10 text-blue-500" /> },
  { name: "What's Up?", icon: <User className="w-10 h-10 text-pink-500" /> },
  { name: 'Breathe2Relax', icon: <Feather className="w-10 h-10 text-sky-500" /> },
  { name: 'Daylio', icon: <Smile className="w-10 h-10 text-green-500" /> },
  { name: 'MoodTools', icon: <Brain className="w-10 h-10 text-blue-600" /> },
  { name: 'SuperBetter', icon: <Zap className="w-10 h-10 text-yellow-500" /> },
  { name: 'Breathe, Think, Do', icon: <CheckCircle className="w-10 h-10 text-green-600" /> },
  { name: 'CBT-i Coach', icon: <Moon className="w-10 h-10 text-indigo-600" /> },
  { name: 'Healthy Minds Program', icon: <BookOpen className="w-10 h-10 text-purple-600" /> },
  { name: 'MyPossibleSelf', icon: <PlusCircle className="w-10 h-10 text-pink-600" /> },
  { name: 'QuitNow', icon: <Activity className="w-10 h-10 text-red-500" /> },
  { name: 'Virtual Hope Box', icon: <AppWindow className="w-10 h-10 text-blue-700" /> },
  { name: 'Shine', icon: <Star className="w-10 h-10 text-yellow-600" /> },
];

export default function MentalHealthAppsPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Free Mental Health Apps</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore a curated list of free mental health apps to support your well-being and self-care journey.</p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {apps.map((app, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition">
            {app.icon}
            <span className="mt-4 text-base font-semibold text-gray-800">{app.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
} 