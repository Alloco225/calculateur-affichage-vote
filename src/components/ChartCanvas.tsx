import { useEffect, useState } from "react";
import { Candidate } from "@/types/election";

interface ChartCanvasProps {
  title: string;
  location: string;
  candidates: Candidate[];
}

export const ChartCanvas = ({ title, location, candidates }: ChartCanvasProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [candidates]);

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="w-full h-full flex items-center justify-center p-8" id="chart-canvas">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
            {title}
          </h1>
          <p className="text-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Résultats - {location}
          </p>
        </div>

        {sortedCandidates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Ajoutez des candidats pour voir le graphique
            </p>
          </div>
        ) : (
          <div className="flex items-end justify-center gap-4 h-[500px]">
            {sortedCandidates.map((candidate) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
              const heightPercent = Math.max(percentage, 5);

              return (
                <div
                  key={candidate.id}
                  className="flex flex-col items-center justify-end flex-1 max-w-[200px]"
                >
                  <div
                    className="relative w-full rounded-t-lg transition-all duration-700 ease-out flex flex-col justify-between p-4"
                    style={{
                      backgroundColor: candidate.color,
                      height: animated ? `${heightPercent}%` : "0%",
                      minHeight: "100px",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-white font-bold text-3xl drop-shadow-lg">
                        {percentage.toFixed(2)}%
                      </span>
                    </div>

                    {candidate.image && (
                      <div className="flex justify-center">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-center w-full">
                    <p className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                      {candidate.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
