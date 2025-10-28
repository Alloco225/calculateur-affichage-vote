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
    <div className="relative w-full h-full flex items-start justify-center p-8 pt-12" id="chart-canvas">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="text-5xl inline-block font-bold mb-4 bg-[#B30A0C] text-white p-5 " >
            {title}
          </div>
          <p className="text-2xl text-white" >
            Résultats
            
            <div className="text-5xl font-bold uppercase text-white">
              {location}
            </div>
          </p>
        </div>

        {sortedCandidates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-white">
              Ajoutez des candidats pour voir le graphique
            </p>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-4 h-[500px]">
            {sortedCandidates.map((candidate) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
              const minTextHeight = 50; // in pixels
              const imageHeight = 200 + minTextHeight; // height of the image in pixels
              const barHeightPx = (percentage / 100) * 500; // 500px is the container height
              const finalHeightPercent = barHeightPx < imageHeight ? (imageHeight / 500) * 100 : percentage;
              const firstName = candidate.name.split(' ')[0];
              const lastName = candidate.name.split(' ').slice(1).join(' ').toUpperCase();

              return (
                <div
                  key={candidate.id}
                  className="relative h-full flex flex-col items-center justify-end flex-1 max-w-[200px]"
                >
                  <div
                    className="relative w-full transition-all duration-700 ease-out flex flex-col justify-between"
                    style={{
                      backgroundColor: candidate.color,
                      height: animated ? `${finalHeightPercent}%` : "0%",
                      minHeight: "100px",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-white font-bold text-3xl drop-shadow-lg">
                        {percentage.toFixed(2)}%
                      </span>
                    </div>

                    {candidate.image && (
                      <div className="h-[200px] overflow-hidden flex justify-center">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="max-h-[200px] w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black opacity-50">
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-2 mt-3 text-center text-white">
                        <p className="text-xl">{lastName}</p>
                        <p className="font-semibold text-3xl uppercase">{firstName}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="h-2 bg-[#B30A0C] w-full mt-3"></div>
      </div>
    </div>
  );
};
