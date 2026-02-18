'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  Copy, 
  CheckCircle2,
  Bookmark,
  FileText
} from 'lucide-react';
import { FAQItem } from '@/lib/api';

interface AccordionProps {
  faq: FAQItem;
  type: 'competitor' | 'recommended' | 'existing';
  isOpenByDefault?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ faq, type, isOpenByDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [isCopied, setIsCopied] = useState(false);

  const isCompetitor = type === 'competitor';
  const isExisting = type === 'existing';
  
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${faq.question}\n\n${faq.answer}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const theme = isCompetitor 
    ? {
        border: 'border-slate-200 hover:border-slate-300',
        active: 'border-slate-800 bg-white shadow-lg ring-4 ring-slate-100',
        icon: 'bg-slate-100 text-slate-500',
        chevron: 'bg-slate-100 text-slate-400'
      }
    : isExisting
    ? {
        border: 'border-slate-200 hover:border-slate-400',
        active: 'border-slate-600 bg-white shadow-lg ring-2 ring-slate-100',
        icon: 'bg-slate-200 text-slate-600',
        chevron: 'bg-slate-200 text-slate-500'
      }
    : {
        border: 'border-indigo-100 hover:border-indigo-300',
        active: 'border border-[#272b8b] bg-white shadow-xl ring-2 ring-indigo-50',
        icon: 'bg-[#272b8b] text-white',
        chevron: 'bg-[#272b8b] text-white'
      };

  return (
    <div className={`
      group overflow-hidden border-2 rounded-2xl transition-all duration-300 mb-3 cursor-pointer
      ${isOpen ? theme.active : theme.border + ' bg-white/50 backdrop-blur-sm hover:shadow-md hover:bg-white'}
    `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start w-full p-4 md:p-5 text-left transition-all cursor-pointer"
      >
        {/* Left Icon Section */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center 
          transition-transform duration-300 group-hover:scale-105 mr-4
          ${theme.icon}
        `}>
          {isCompetitor ? <Bookmark size={18} /> : isExisting ? <FileText size={18} /> : <Sparkles size={20} />}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 pr-4">
            <span className={`
            block font-semibold leading-tight transition-colors duration-300
            ${isCompetitor ? 'text-sm text-slate-700' : isExisting ? 'text-sm text-slate-700' : 'text-base md:text-lg text-slate-900'}
            ${isOpen ? 'text-slate-900' : ''}
          `}>
            {faq.question}
          </span>
        </div>

        {/* Right Action Section */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
          ${isOpen ? 'rotate-180 ' + theme.chevron : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300 group-hover:text-slate-600'}
        `}>
          <ChevronDown size={16} className="transition-transform duration-300" />
        </div>
      </button>
      
      <div className={`
        grid transition-all duration-500 ease-in-out
        ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 ml-[56px] border-t border-slate-100 mt-2">
            <p className={`
              text-slate-600 leading-relaxed font-medium mb-6
              ${isCompetitor || isExisting ? 'text-sm' : 'text-[15px] md:text-base'}
            `}>
              {faq.answer}
            </p>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button 
                onClick={handleCopy}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200
                  ${isCompetitor || isExisting ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95' : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'}
                `}
              >
                {isCopied ? <CheckCircle2 size={14} className="text-green-600" /> : <Copy size={14} />}
                {isCopied ? 'Copied!' : 'Copy Question & Answer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
