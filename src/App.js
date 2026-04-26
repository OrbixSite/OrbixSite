import React, { useState, useEffect } from 'react';

export default function App() {
  const [revenue, setRevenue] = useState(1500);
  const [salesCount, setSalesCount] = useState(25);
  const [displaySavings, setDisplaySavings] = useState(0);

  const maxRev = 10000;
  const maxSales = 200;

  // Logic
  const etsyCosts = (revenue * 0.095) + (salesCount * 0.20);
  const orbixFreeCosts = (revenue * 0.08);
  const orbixProCosts = 12.50 + (revenue * 0.03);
  const bestOrbixOption = Math.min(orbixFreeCosts, orbixProCosts);
  const annualSavings = (etsyCosts - bestOrbixOption) * 12;

  useEffect(() => {
    let start = displaySavings;
    const end = annualSavings;
    const duration = 400;
    const step = (end - start) / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        setDisplaySavings(end);
        clearInterval(timer);
      } else {
        setDisplaySavings(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [annualSavings]);

  const SAGE = "#7C9885"; 
  const BRIGHT_GREEN = "#22C55E";

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 font-sans antialiased text-slate-700">
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-10">
          
          {/* UX Friendly Header Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12 text-center">
            <h1 className="text-3xl font-serif italic text-slate-800 mb-1">
              Orbix <span className="font-sans font-light text-slate-400 not-italic">vs</span> Etsy
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7C9885]">
              Founding Member Calculation
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Revenue Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Revenue</span>
                <span className="text-2xl font-mono font-bold text-slate-800">${revenue.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max={maxRev} step="100"
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${SAGE} 0%, ${SAGE} ${(revenue/maxRev)*100}%, #F1F5F9 ${(revenue/maxRev)*100}%, #F1F5F9 100%)`,
                  accentColor: SAGE
                }}
              />
            </div>

            {/* Sales Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Orders</span>
                <span className="text-2xl font-mono font-bold text-slate-800">{salesCount}</span>
              </div>
              <input 
                type="range" min="1" max={maxSales} step="1"
                value={salesCount} 
                onChange={(e) => setSalesCount(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${SAGE} 0%, ${SAGE} ${(salesCount/maxSales)*100}%, #F1F5F9 ${(salesCount/maxSales)*100}%, #F1F5F9 100%)`,
                  accentColor: SAGE
                }}
              />
            </div>

            {/* Results Block */}
            <div className="py-10 border-y border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Annual Projected Savings</p>
                <div className="flex items-center justify-center text-[#2D4A4F]">
                  <span className="text-6xl font-serif italic tracking-tighter">
                    ${Math.round(displaySavings).toLocaleString()}
                  </span>
                </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button 
                style={{ backgroundColor: BRIGHT_GREEN }}
                className="w-full py-5 rounded-full text-white font-bold text-sm shadow-[0_15px_30px_-5px_rgba(34,197,94,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(34,197,94,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 uppercase tracking-[0.2em]"
              >
                Join the Beta 50
              </button>
              <div className="flex items-center justify-center gap-2 mt-8 text-slate-300">
                <div className="h-px w-8 bg-slate-200"></div>
                <p className="text-[9px] font-bold uppercase tracking-widest italic">Est. 2026</p>
                <div className="h-px w-8 bg-slate-200"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
