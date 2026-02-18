'use client';

import { useMemo, useState, useEffect } from 'react';
import type { EvaluatePageResponse, ParameterScore} from '@/lib/api';
import { BarChart3, Eye } from 'lucide-react';

interface EvaluatePageViewProps {
  data: EvaluatePageResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

function clampScore(score: number) {
  if (Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

function clampParameterScore(score: number) {
  if (Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(10, score));
}

function levelStyles(level: 'LOW' | 'MEDIUM' | 'HIGH' | 'Moderate') {
  switch (level) {
    case 'HIGH':
      return { pill: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-400' };
    case 'MEDIUM':
    case 'Moderate':
      return { pill: 'bg-yellow-100 text-yellow-800 border-yellow-200', dot: 'bg-yellow-400' };
    case 'LOW':
    default:
      return { pill: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-400' };
  }
}

function scoreColor(score: number) {
  const s = clampScore(score);
  if (s >= 85) return 'bg-green-400';
  if (s >= 70) return 'bg-yellow-400';
  return 'bg-red-400';
}

function parameterScoreColor(score: number) {
  const s = clampParameterScore(score);
  if (s >= 8.5) return 'bg-green-400';
  if (s >= 7.0) return 'bg-yellow-400';
  return 'bg-red-400';
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
      </div>
    </div>
  );
}

function ParameterCard({
  item,
  isOpen,
  onToggle,
}: {
  item: ParameterScore;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const s = clampParameterScore(item.score);
  const [showInfo, setShowInfo] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);

  // Reset info and blocks visibility when card closes
  useEffect(() => {
    if (!isOpen) {
      setShowInfo(false);
      setShowBlocks(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`
        group border-2 rounded-2xl transition-all duration-300 overflow-visible
        ${isOpen ? 'border-[#272b8b] bg-white shadow-xl ring-4 ring-indigo-50' : 'border-slate-200 hover:border-indigo-200 bg-white/70 backdrop-blur-sm'}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full cursor-pointer px-4 sm:px-5 py-4 flex items-start gap-3 sm:gap-4 text-left transition-all"
        style={{ touchAction: 'manipulation' }}
      >
        <div
          className={`
            flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110
            ${isOpen ? 'bg-[#272b8b] text-white shadow-lg shadow-indigo-200' : 'bg-[#272b8b] text-white'}
          `}
        >
          <BarChart3 size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex items-center gap-2">
              <p className="text-sm md:text-base font-bold text-slate-900 truncate">{item.parameter}</p>
              {item.info && (
                <div className="relative flex-shrink-0 z-10">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfo(!showInfo);
                    }}
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => {
                      // Keep tooltip open if card is open and user clicked
                      if (!isOpen) {
                        setShowInfo(false);
                      }
                    }}
                    className="w-7 h-7 rounded-full hover:bg-blue-200 text-[#272b8b] flex items-center justify-center transition-colors cursor-pointer"
                    title="Parameter information"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowInfo(!showInfo);
                      }
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {/* Tooltip */}
                  {showInfo && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-80 md:w-96 min-h-[200px] z-[9999] pointer-events-auto">
                      <div className="bg-slate-900 text-white text-xs rounded-lg shadow-2xl p-3 relative border border-slate-700">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="font-semibold text-blue-300 uppercase tracking-wide">About this parameter</p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowInfo(false);
                            }}
                            className="text-slate-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-label="Close tooltip"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowInfo(false);
                              }
                            }}
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <p className="leading-relaxed text-slate-100">{item.info}</p>
                        {/* Arrow pointing left */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-slate-900"></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-bold text-slate-900">{s}</span>
              <span className="text-xl text-slate-400 font-bold">/10</span>
              <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-2 ${parameterScoreColor(s)} rounded-full transition-all duration-500`} style={{ width: `${s * 10}%` }} />
            </div>
          </div>
        </div>
      </button>


      <div
        className="grid overflow-hidden transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="min-h-0">
          <div className="px-4 sm:px-5 pb-6 pt-0 ml-[52px] border-t border-slate-50 mt-2">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.justification}</p>

            {(item.blocking_issues?.length ?? 0) > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Blocking issues</p>
                  {(item.blocking_blocks?.length ?? 0) > 0 && (
                    <button
                      onClick={() => setShowBlocks(!showBlocks)}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                      title={`${item.blocking_blocks?.length ?? 0} problematic HTML block${(item.blocking_blocks?.length ?? 0) > 1 ? 's' : ''} found`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {showBlocks ? 'Hide Problematic HTML' : 'View Problematic HTML'}
                    </button>
                  )}
                </div>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {item.blocking_issues.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {showBlocks && (item.blocking_blocks?.length ?? 0) > 0 && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-black text-red-900 mb-2 uppercase tracking-widest">Problematic HTML blocks</p>
                <div className="space-y-2">
                  {item.blocking_blocks?.map((block, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-red-200 rounded text-xs font-mono text-red-900 overflow-x-auto max-h-48 overflow-y-auto">
                      <code className="whitespace-pre-wrap break-all">{block}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(item.recommended_fixes?.length ?? 0) > 0 && (
              <div className="mt-4">
                <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-widest">Recommended fixes</p>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {item.recommended_fixes.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EvaluatePageView({ data, isLoading, error }: EvaluatePageViewProps) {
  const [openParam, setOpenParam] = useState<number | null>(0);

  const sortedParams = useMemo(() => {
    if (!data?.parameter_scores) return [];
    return [...data.parameter_scores].sort((a, b) => clampParameterScore(b.score) - clampParameterScore(a.score));
  }, [data]);

  // Don't render anything when loading - unified banner handles it
  if (isLoading) {
    return null;
  }

  // Show error
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Section Header (match FAQ hero styling) */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 md:p-10 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Eye size={170} className="text-indigo-400 rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#272b8b]/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#272b8b]">
              AI Evaluation
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            LLM <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Visibility</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
            Understand how confidently a model can extract, summarize, and cite your content—then fix what blocks it.
          </p>
        </div>
      </div>

      {/* Summary */}
      {/* <div className="bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 border-2 border-indigo-100 rounded-[40px] p-6 md:p-10 shadow-xl shadow-indigo-100/10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest bg-[#272b8b] text-indigo-700 border-indigo-200">
                <Sparkles size={14} className="text-indigo-600" />
                AI Visibility
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest ${level.pill}`}>
                <span className={`w-2 h-2 rounded-full ${level.dot}`} />
                {summary.visibility_level} visibility
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 tracking-tight">Overall score</h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              A higher score means your page is easier for LLMs to parse, trust, and cite correctly.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <div className="text-4xl md:text-5xl font-bold text-slate-900 leading-none">{overall}</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">out of 100</div>
            </div>
            <div className="w-32 md:w-40">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-2 ${scoreColor(overall)} rounded-full transition-all duration-700`} style={{ width: `${overall}%` }} />
              </div>
            </div>
          </div>
        </div>

        {(summary.primary_blockers?.length ?? 0) > 0 && (
          <div className="mt-8 flex items-start gap-3 p-4 bg-red-50/60 border border-red-100 rounded-2xl text-red-900">
            <div className="w-10 h-10 bg-white border border-red-100 rounded-xl flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">
              <Eye size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-red-700 mb-2">Primary blockers</p>
              <ul className="space-y-2">
                {summary.primary_blockers.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="text-sm text-red-900/90 leading-relaxed font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div> */}

      {/* Parameter Scores */}
      <div className="space-y-6">
        <SectionHeader title="Parameter scores" />
        <div className="grid grid-cols-1 gap-4 overflow-visible">
          {sortedParams.map((p, idx) => (
            <ParameterCard
              key={`${p.parameter}-${idx}`}
              item={p}
              isOpen={openParam === idx}
              onToggle={() => setOpenParam(openParam === idx ? null : idx)}
            />
          ))}
        </div>
      </div>

      {/* Deep-dive boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm">
          <SectionHeader title="Citation confidence" />
          <div className="mt-6">
            {(() => {
              const level = levelStyles(data.citation_confidence.current_state);
              return (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest ${level.pill}`}>
                  <span className={`w-2 h-2 rounded-full ${level.dot}`} />
                  {data.citation_confidence.current_state}
                </div>
              );
            })()}
            <p className="text-sm text-slate-700 leading-relaxed mt-4 font-medium">{data.citation_confidence.why_or_why_not}</p>
            {(data.citation_confidence.what_would_improve_it?.length ?? 0) > 0 && (
              <div className="mt-4">
                <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest">What would improve it</p>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {data.citation_confidence.what_would_improve_it.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm">
          <SectionHeader title="Recommended next actions" />
          <div className="mt-6 space-y-5">
            {(data.recommended_next_actions.quick_wins?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest">Quick wins</p>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {data.recommended_next_actions.quick_wins.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            {(data.recommended_next_actions.structural_changes?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest">Structural changes</p>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {data.recommended_next_actions.structural_changes.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

