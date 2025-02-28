import React, { useMemo } from 'react';

interface CourseHistoryGridProps {
  terms: string[];
}

const CourseHistoryGrid: React.FC<CourseHistoryGridProps> = ({ terms }) => {
  const currentYear = new Date().getFullYear();
  const relevantYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
  
  const termLookup = useMemo(() => {
    const lookup: Record<string, Set<string>> = {};
    
    terms.forEach(term => {
      const [year, seasonRaw] = term.split(' ');
      const season = seasonRaw.startsWith('Summer') ? 'Summer' : seasonRaw;
      
      if (!lookup[year]) {
        lookup[year] = new Set();
      }
      lookup[year].add(season);
    });
    
    return lookup;
  }, [terms]);
  
  const wasOffered = (year: number, season: string): boolean => {
    return Boolean(termLookup[year.toString()] && termLookup[year.toString()].has(season));
  };
  
  return (
    <div className="w-full rounded-lg">
      <div className="px-4 pt-4">
        <div className="grid grid-cols-5 gap-1 mb-2">
          <div className="font-medium text-neutral-400 text-sm"></div>
          {relevantYears.map(year => (
            <div key={year} className="font-medium text-center text-sm text-neutral-400">{year}</div>
          ))}
        </div>
        
        {/* Season rows */}
        {seasons.map(season => (
          <div key={season} className="grid grid-cols-5 gap-2 mb-3">
            <div className="font-medium text-sm flex items-center text-neutral-400">{season}</div>
            
            {relevantYears.map(year => {
              const offered = wasOffered(year, season);
              return (
                <div 
                  key={`${year}-${season}`} 
                  className={`h-8 rounded flex items-center justify-center ${
                    offered 
                      ? 'bg-emerald-500' 
                      : 'bg-dark-highlight'
                  }`}
                >
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHistoryGrid;