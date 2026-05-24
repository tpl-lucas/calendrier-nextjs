"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  
  const [viewDate, setViewDate] = useState(new Date());
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const actualDate = new Date();
  const actualYear = actualDate.getFullYear();
  const actualMonth = actualDate.getMonth();
  const actualToday = actualDate.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; 
  
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(viewDate);
  const formattedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  
  const emptyDays = Array.from({ length: firstDayIndex });
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const previousMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => { 
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 text-slate-800 p-8 flex items-center justify-center font-sans">
      
      <div className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white p-8 md:p-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-100 pb-6 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 tracking-tight mb-2">
              Calendrier
            </h1>
            <p className="text-slate-400 font-medium">Gérez votre emploi du temps</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1">
              <button 
                onClick={previousMonth}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-bold"
              >
                &lt;
              </button>
              
              <div className="text-lg font-bold text-indigo-900 px-4 min-w-[150px] text-center">
                {formattedMonthName} {currentYear}
              </div>

              <button 
                onClick={nextMonth}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-bold"
              >
                &gt;
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-7 gap-4 mb-6 text-center">
          {days.map((d, index) => (
            <div key={index} className="font-bold text-indigo-400/80 uppercase tracking-widest text-xs">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="hidden sm:block"></div>
          ))}
          
          {monthDays.map((num) => {
            const isToday = 
              num === actualToday && 
              currentMonth === actualMonth && 
              currentYear === actualYear;

            return (
              <div
                key={num}
                className={`group relative flex flex-col h-32 p-4 bg-white border rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden
                  ${isToday ? "border-indigo-500 ring-2 ring-indigo-100" : "border-slate-100 hover:border-indigo-200"}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 
                  ${isToday ? "from-indigo-50 to-transparent opacity-100" : "from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100"}`}>
                </div>

                <span className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold transition-colors duration-300
                  ${isToday ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md"}`}>
                  {num}
                </span>

                <div className="relative z-10 mt-auto w-full flex flex-col gap-1">
                  {num === 15 && (
                    <div className="text-[11px] font-bold bg-violet-100 text-violet-700 px-2 py-1.5 rounded-lg truncate shadow-sm">
                      test bouton
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}