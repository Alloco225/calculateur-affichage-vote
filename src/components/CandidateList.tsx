import { Candidate } from "@/types/election";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Check } from "lucide-react";
import { useState } from "react";

interface CandidateListProps {
  candidates: Candidate[];
  onUpdate: (id: string, updates: Partial<Candidate>) => void;
  onDelete: (id: string) => void;
}

export const CandidateList = ({ candidates, onUpdate, onDelete }: CandidateListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Candidate>>({});

  const startEdit = (candidate: Candidate) => {
    setEditingId(candidate.id);
    setEditValues({ name: candidate.name, votes: candidate.votes });
  };

  const saveEdit = (id: string) => {
    onUpdate(id, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex-1 h-[300px] space-y-2 overflow-y-auto">
      {sortedCandidates.map((candidate, index) => {
        const isEditing = editingId === candidate.id;

        return (
          <div
            key={candidate.id}
            className="p-3 flex items-center gap-3"
            style={{
              backgroundColor: `${candidate.color}15`,
              borderColor: `${candidate.color}40`,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div
                style={{ color: candidate.color }}
            >
              {index + 1}
            </div>


            {candidate.image && (
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-10 h-10 rounded-full object-cover"

                style={{ borderColor: candidate.color, borderWidth: 2 }}
              />
            )}

            {/* <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: candidate.color }}
            /> */}

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-1">
                  <Input
                    value={editValues.name || ""}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                    className="h-8"
                  />
                  <Input
                    type="number"
                    value={editValues.votes || 0}
                    onChange={(e) =>
                      setEditValues({ ...editValues, votes: parseInt(e.target.value) })
                    }
                    className="h-8"
                  />
                </div>
              ) : (
                <>
                  <p className="font-medium text-sm truncate"
                style={{ color: candidate.color }}
                  
                  >{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {candidate.votes.toLocaleString()} voix
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-1">
              {isEditing ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => saveEdit(candidate.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(candidate)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(candidate.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
