'use client';

import { useMemo, useState } from 'react';
import type { EvaluatePageResponse, ParameterScore, VisibilityLevel } from '@/lib/api';
import { BarChart3, Eye, Sparkles } from 'lucide-react';

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

function levelStyles(level: VisibilityLevel) {
  switch (level) {
    case 'HIGH':
      return { pill: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' };
    case 'MEDIUM':
      return { pill: 'bg-yellow-100 text-yellow-800 border-yellow-200', dot: 'bg-yellow-500' };
    case 'LOW':
    default:
      return { pill: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' };
  }
}

function scoreColor(score: number) {
  const s = clampScore(score);
  if (s >= 85) return 'bg-green-500';
  if (s >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}

function parameterScoreColor(score: number) {
  const s = clampParameterScore(score);
  if (s >= 8.5) return 'bg-green-500';
  if (s >= 7.0) return 'bg-yellow-500';
  return 'bg-red-500';
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
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
  const percentage = (s / 10) * 100;
  return (
    <div
      className={`
        group overflow-hidden border-2 rounded-2xl transition-all duration-300
        ${isOpen ? 'border-indigo-600 bg-white shadow-2xl ring-8 ring-indigo-50' : 'border-slate-200 hover:border-indigo-200 bg-white/70 backdrop-blur-sm'}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full cursor-pointer touch-manipulation px-4 sm:px-5 py-4 flex items-start gap-3 sm:gap-4 text-left transition-all"
      >
        <div
          className={`
            flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105
            ${isOpen ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-600'}
          `}
        >
          <BarChart3 size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm md:text-base font-bold text-slate-900 truncate">{item.parameter}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{isOpen ? 'Tap to collapse' : 'Tap to view details'}</p>
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
              <div className={`h-2 ${parameterScoreColor(s)} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
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
              <div className="mt-3">
                <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-widest">Blocking issues</p>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  {item.blocking_issues.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {(item.recommended_fixes?.length ?? 0) > 0 && (
              <div className="mt-3">
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

  const summary = data.llm_visibility_summary;
  const level = levelStyles(summary.visibility_level);
  const overall = clampScore(summary.overall_visibility_score);

  return (
    <div className="space-y-8">
      {/* Section Header (match FAQ hero styling) */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 md:p-10 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Eye size={170} className="text-indigo-400 rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-400/20">
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
      <div className="bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 border-2 border-indigo-100 rounded-[40px] p-6 md:p-10 shadow-xl shadow-indigo-100/10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border-indigo-200">
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
      </div>

      {/* Parameter Scores */}
      <div className="space-y-4">
        <SectionHeader title="Parameter scores" />
        <div className="grid grid-cols-1 gap-3">
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
        <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8">
          <SectionHeader title="Citation confidence" />
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest bg-white text-slate-700 border-slate-200">
              {data.citation_confidence.current_state}
            </div>
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

        <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8">
          <SectionHeader title="Recommended next actions" />
          <div className="mt-4 space-y-5">
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

