'use client';

import { useMemo, useState } from 'react';
import type { EvaluatePageResponse, ParameterScore, VisibilityLevel } from '@/lib/api';

interface EvaluatePageViewProps {
  data: EvaluatePageResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

function clampScore(score: number) {
  if (Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(100, score));
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

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-600">{subtitle}</p> : null}
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
  const s = clampScore(item.score);
  return (
    <div className={`border rounded-xl bg-white transition-all ${isOpen ? 'border-gray-300 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
      <button
        onClick={onToggle}
        className="w-full cursor-pointer touch-manipulation px-4 sm:px-5 py-4 flex items-start gap-3 sm:gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{item.parameter}</p>
              <p className="text-xs text-gray-500 mt-0.5">{isOpen ? 'Tap to collapse' : 'Tap to view details'}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-bold text-gray-900">{s}</span>
              <span className="text-xs text-gray-500">/100</span>
              <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-2 ${scoreColor(s)} rounded-full transition-all duration-500`} style={{ width: `${s}%` }} />
            </div>
          </div>
        </div>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="min-h-0">
          <div className="px-4 sm:px-5 pb-4 pt-0">
            <p className="text-sm text-gray-700 leading-relaxed">{item.justification}</p>

            {(item.blocking_issues?.length ?? 0) > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-900 mb-1">Blocking issues</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {item.blocking_issues.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}

            {(item.recommended_fixes?.length ?? 0) > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-900 mb-1">Recommended fixes</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
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
  const [openParam, setOpenParam] = useState<number | null>(null);

  const sortedParams = useMemo(() => {
    if (!data?.parameter_scores) return [];
    return [...data.parameter_scores].sort((a, b) => clampScore(b.score) - clampScore(a.score));
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5 text-[#272b8b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Evaluating page for LLM visibility…</span>
        </div>
      </div>
    );
  }

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
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-purple-50 text-purple-700 border-purple-200">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                AI Visibility
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${level.pill}`}>
                <span className={`w-2 h-2 rounded-full ${level.dot}`} />
                {summary.visibility_level} visibility
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3">LLM Visibility Score</h2>
            <p className="text-sm text-gray-600 mt-1">
              How confidently a model can extract and cite your content.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">{overall}</div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
            <div className="w-28 sm:w-32">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-2 ${scoreColor(overall)} rounded-full transition-all duration-700`} style={{ width: `${overall}%` }} />
              </div>
            </div>
          </div>
        </div>

        {(summary.primary_blockers?.length ?? 0) > 0 && (
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">Primary blockers</p>
            <ul className="space-y-2">
              {summary.primary_blockers.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <SectionHeader title="Parameter scores" subtitle="Tap a card to see justification and fixes." />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeader title="Citation confidence" />
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-gray-50 text-gray-700 border-gray-200">
              {data.citation_confidence.current_state}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">{data.citation_confidence.why_or_why_not}</p>
            {(data.citation_confidence.what_would_improve_it?.length ?? 0) > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-900 mb-1">What would improve it</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {data.citation_confidence.what_would_improve_it.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <SectionHeader title="Recommended next actions" />
          <div className="mt-3 space-y-4">
            {(data.recommended_next_actions.quick_wins?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Quick wins</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {data.recommended_next_actions.quick_wins.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            {(data.recommended_next_actions.structural_changes?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Structural changes</p>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
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

