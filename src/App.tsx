/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Home, 
  LayoutDashboard, 
  LineChart as ChartIcon, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Lightbulb, 
  Wind, 
  Refrigerator, 
  Waves, 
  Cpu, 
  Cloud, 
  BrainCircuit, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const energyData = [
  { name: '00:00', voltage: 228, current: 4.2 },
  { name: '04:00', voltage: 232, current: 3.8 },
  { name: '08:00', voltage: 230, current: 5.5 },
  { name: '12:00', voltage: 225, current: 7.2 },
  { name: '16:00', voltage: 229, current: 6.1 },
  { name: '20:00', voltage: 231, current: 8.4 },
  { name: '23:59', voltage: 230, current: 5.2 },
];

const loadData = [
  { name: 'Fan', value: 15, color: '#6366f1' },
  { name: 'AC', value: 45, color: '#8b5cf6' },
  { name: 'Fridge', value: 20, color: '#ec4899' },
  { name: 'Washing', value: 10, color: '#f43f5e' },
  { name: 'Lights', value: 10, color: '#06b6d4' },
];

const appliances = [
  { name: 'Fan', icon: Wind, power: '60W', status: 'Low', color: 'text-green-400' },
  { name: 'Air Conditioner', icon: Zap, power: '1500W', status: 'High', color: 'text-red-400' },
  { name: 'Refrigerator', icon: Refrigerator, power: '200W', status: 'Medium', color: 'text-orange-400' },
  { name: 'Washing Machine', icon: Waves, power: '500W', status: 'Medium', color: 'text-orange-400' },
  { name: 'Smart Lights', icon: Lightbulb, power: '45W', status: 'Low', color: 'text-green-400' },
];

// --- Components ---

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ['Home', 'Dashboard', 'Prediction'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Smart Energy <span className="text-indigo-400">AI</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveTab(link)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === link 
                    ? "bg-purple-gradient text-white shadow-lg shadow-purple-500/30" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right Corner */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Monitoring
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/40 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setActiveTab(link);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all",
                    activeTab === link ? "bg-purple-gradient text-white" : "text-gray-400 hover:bg-white/5"
                  )}
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles size={14} />
          AI-Powered Energy Monitoring Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          Monitor Smarter.<br />
          Predict Better.<br />
          <span className="text-gradient">Optimize Energy.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          An intelligent IoT + AI powered system using ESP32 and Machine Learning to monitor real-time electricity usage and predict future consumption.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-card p-8 md:p-10 max-w-3xl mx-auto animate-float">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-semibold">System Highlights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                'Real-time monitoring via ESP32',
                'Voltage & Current sensors (ACS712, ZMPT101B)',
                'Cloud integration (Blynk / ThingSpeak)',
                'AI-based next-month prediction',
                'Smart energy-saving suggestions',
                'Optional TinyML edge deployment'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MetricCard = ({ title, value, trend, icon: Icon, color }: { title: string, value: string, trend: string, icon: any, color: string }) => {
  const isPositive = trend.startsWith('+');
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card glass-card-hover p-6 relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 blur-2xl", color)} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl bg-opacity-10", color.replace('bg-', 'bg-opacity-10 bg-'))}>
          <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
          isPositive ? "text-red-400 bg-red-400/10" : "text-emerald-400 bg-emerald-400/10"
        )}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
};

const AnalyticsGrid = () => {
  const [timeframe, setTimeframe] = useState('Weekly');

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart Card */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold">Energy Monitoring Overview</h3>
              <p className="text-gray-400 text-sm">Real-time Current vs Voltage</p>
            </div>
            <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
              {['Weekly', 'Monthly'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
                    timeframe === t ? "bg-purple-gradient text-white shadow-md" : "text-gray-400 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVoltage)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCurrent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Card */}
        <div className="glass-card p-8 flex flex-col">
          <h3 className="text-xl font-bold mb-1">Load Distribution</h3>
          <p className="text-gray-400 text-sm mb-6">Appliance usage breakdown</p>
          
          <div className="h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {loadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-auto">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Usage Hours</h4>
            <div className="flex flex-wrap gap-2">
              {loadData.map((item) => (
                <div 
                  key={item.name}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-gray-300">{item.name}: {item.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ApplianceGrid = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold">Appliance Status</h3>
          <p className="text-gray-400">Real-time status of connected devices</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {appliances.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card glass-card-hover p-6 group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={cn(
                "p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/20",
                app.color.replace('text-', 'text-')
              )}>
                <app.icon size={32} />
              </div>
              <div>
                <h4 className="font-semibold text-white">{app.name}</h4>
                <p className="text-gray-400 text-sm">{app.power}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                app.status === 'High' ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" :
                app.status === 'Medium' ? "bg-orange-500/10 border-orange-500/20 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]" :
                app.status === 'Low' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" :
                "bg-gray-500/10 border-gray-500/20 text-gray-500"
              )}>
                {app.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SmartSuggestion = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [status] = useState<'HIGH' | 'MEDIUM' | 'LOW' | 'NON-USE'>('HIGH'); // Mock status

  const getSuggestion = () => {
    switch(status) {
      case 'HIGH': return "High energy consumption detected. Reduce usage to save electricity cost.";
      case 'MEDIUM': return "Moderate usage detected. Consider reducing usage during peak hours.";
      case 'LOW': return "Energy usage is optimal. Maintain this level.";
      case 'NON-USE': return "Currently not in use.";
      default: return "Currently not in use.";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-8 left-8 z-40 max-w-sm"
        >
          <div className="glass-card p-6 border-purple-500/30 purple-glow relative group">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <BrainCircuit size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center gap-2">
                  AI Smart Energy Suggestion
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {getSuggestion()}
                </p>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                  View Details <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FlowSection = () => {
  const steps = [
    { icon: Cpu, label: 'Sensors' },
    { icon: Activity, label: 'ESP32' },
    { icon: Cloud, label: 'Cloud' },
    { icon: BrainCircuit, label: 'ML Model' },
    { icon: ChartIcon, label: 'Prediction' },
    { icon: Sparkles, label: 'Smart Suggestion' },
  ];

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="relative flex items-center justify-between">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/40 to-indigo-500/20 -translate-y-1/2 z-0">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-left"
          />
        </div>

        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0a0a20] border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl group"
            >
              <step.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:text-purple-400 transition-colors" />
              <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </motion.div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Metrics Grid */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard 
              title="Voltage" 
              value="230V" 
              trend="+2%" 
              icon={Zap} 
              color="bg-indigo-500" 
            />
            <MetricCard 
              title="Current" 
              value="5.2A" 
              trend="-1%" 
              icon={Activity} 
              color="bg-purple-500" 
            />
            <MetricCard 
              title="Power" 
              value="1196W" 
              trend="+5%" 
              icon={Flame} 
              color="bg-pink-500" 
            />
          </div>
        </section>

        <AnalyticsGrid />
        
        <ApplianceGrid />
        
        <FlowSection />
      </main>

      <SmartSuggestion />

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2026 Smart Energy AI. Built for the future of sustainable living.
        </p>
      </footer>
    </div>
  );
}
