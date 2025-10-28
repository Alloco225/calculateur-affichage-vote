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
  const maxVotes = Math.max(...candidates.map(c => c.votes), 1);

  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="relative w-full h-full flex items-start justify-center p-4 pt-8 sm:p-8 sm:pt-12" id="chart-canvas">
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-5xl">
        <div className="text-center mb-8">
          <div className="text-3xl sm:text-4xl md:text-5xl inline-block font-bold mb-4 bg-[#B30A0C] text-white p-5 " >
            {title}
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-white" >
            Résultats
            
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white">
              {location}
            </div>
          </p>
        </div>

        {sortedCandidates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg sm:text-xl text-white">
              Ajoutez des candidats pour voir le graphique
            </p>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-2 sm:gap-4 h-[300px] sm:h-[400px] md:h-[500px] border-b-4 pb-3 border-[#B30A0C]">
            {sortedCandidates.map((candidate) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
              const minTextHeight = 50; // in pixels
              const imageHeight = 200 + minTextHeight; // height of the image in pixels
              const barHeightPx = (percentage / 100) * 500; // 500px is the container height, used for calculation base
              const finalHeightPercent = barHeightPx < imageHeight ? (imageHeight / 500) * 100 : percentage;
              const firstName = candidate.name.split(' ')[0];
              const lastName = candidate.name.split(' ').slice(1).join(' ').toUpperCase();

              return (
                <div
                  key={candidate.id}
                  className="relative h-full flex flex-col items-center justify-end flex-1 max-w-[120px] sm:max-w-[160px] md:max-w-[200px]"
                >
                  <div
                    className="relative w-full transition-all duration-700 ease-out flex flex-col justify-between min-h-[60px] sm:min-h-[80px] md:min-h-[100px]"
                    style={{
                      backgroundColor: candidate.color,
                      height: animated ? `${finalHeightPercent}%` : "0%",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-lg">
                        {percentage.toFixed(2)}%
                      </span>
                    </div>

                    {candidate.image && (
                      <div className="h-[120px] sm:h-[160px] md:h-[200px] overflow-hidden flex justify-center">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="max-h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black opacity-50">
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-1 sm:p-2 mt-3 text-center text-white">
                        <p className="text-base sm:text-lg md:text-xl">{lastName}</p>
                        <p className="font-semibold text-xl sm:text-2xl md:text-3xl uppercase">{firstName}</p>
                    </div>
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
