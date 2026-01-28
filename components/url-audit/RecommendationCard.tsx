interface RecommendationCardProps {
  title: string;
  description: string;
}

export default function RecommendationCard({ title, description }: RecommendationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

