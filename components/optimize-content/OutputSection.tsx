import CopyButton from './CopyButton';

interface OutputSectionProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export default function OutputSection({ title, content, icon }: OutputSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-600">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{content}</pre>
      </div>
    </div>
  );
}

