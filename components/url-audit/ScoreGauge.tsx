'use client';

import { useEffect, useRef } from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
}

export default function ScoreGauge({ score, label }: ScoreGaugeProps) {
  const pathRef = useRef<SVGPathElement>(null);
  // Calculate the angle for the semi-circle (0-180 degrees)
  const percentage = Math.min(Math.max(score, 0), 100);
  const angle = (percentage / 100) * 180;
  
  // SVG dimensions - responsive
  const width = 160;
  const height = 100;
  const centerX = width / 2;
  const centerY = height; // Center at bottom for semi-circle
  const radius = 70;
  
  // Start and end points for the full semi-circle
  const startX = centerX - radius;
  const startY = centerY;
  const endX = centerX + radius;
  const endY = centerY;
  
  // Calculate the end point for the filled portion
  // Angle goes from 180° (left) to 0° (right) clockwise
  const startAngleDeg = 180;
  const endAngleDeg = 180 - angle;
  const endAngleRad = (endAngleDeg * Math.PI) / 180;
  
  const filledEndX = centerX + radius * Math.cos(endAngleRad);
  const filledEndY = centerY + radius * Math.sin(endAngleRad);
  
  // Full semi-circle path - single path for both arcs
  const fullArcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  
  // Calculate arc length for dash array
  const circumference = Math.PI * radius; // Half circle circumference
  const filledLength = (percentage / 100) * circumference;
  
  // Create unique gradient ID and animation ID
  const gradientId = `gradient-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const animationId = `fill-animation-${label.replace(/\s+/g, '-').toLowerCase()}`;

  // Trigger animation when score changes
  useEffect(() => {
    if (pathRef.current && percentage > 0) {
      // Reset and restart animation
      pathRef.current.style.animation = 'none';
      // Force reflow by accessing a property
      void pathRef.current.getBBox();
      // Restart animation
      setTimeout(() => {
        if (pathRef.current) {
          pathRef.current.style.animation = '';
        }
      }, 4);
    }
  }, [score, percentage]);

  return (
    <div className="flex flex-col items-center sm:items-end">
      <div className="relative" style={{ width: '100%', maxWidth: width, height }}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient 
              id={gradientId} 
              x1={startX} 
              y1={startY} 
              x2={endX} 
              y2={endY}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ef4444" /> {/* red - left */}
              <stop offset="33%" stopColor="#f97316" /> {/* orange */}
              <stop offset="66%" stopColor="#eab308" /> {/* yellow */}
              <stop offset="100%" stopColor="#22c55e" /> {/* green - right */}
            </linearGradient>
            <style>
              {`
                @keyframes ${animationId} {
                  from {
                    stroke-dashoffset: ${circumference};
                  }
                  to {
                    stroke-dashoffset: ${circumference - filledLength};
                  }
                }
                .gauge-fill {
                  animation: ${animationId} 1.5s ease-out forwards;
                }
              `}
            </style>
          </defs>
          
          {/* Background arc (full semi-circle) - drawn first */}
          <path
            d={fullArcPath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Filled arc (score portion) - animated fill from left to right */}
          {percentage > 0 && (
            <path
              ref={pathRef}
              d={fullArcPath}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              className="gauge-fill"
            />
          )}
        </svg>
        
        {/* Score and label positioned in the center of the arc */}
        <div 
          className="absolute flex flex-col items-center justify-center"
          style={{ 
            left: '50%',
            top: `${centerY - radius * 0.3}px`,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{label}</div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">{score}%</div>
        </div>
      </div>
    </div>
  );
}

