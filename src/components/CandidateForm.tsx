import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Candidate } from "@/types/election";
import { Plus } from "lucide-react";

interface CandidateFormProps {
  onAdd: (candidate: Candidate) => void;
}

const defaultColors = [
  "hsl(25, 95%, 53%)",
  "hsl(220, 90%, 56%)",
  "hsl(48, 96%, 53%)",
  "hsl(197, 92%, 61%)",
  "hsl(240, 60%, 45%)",
];

export const CandidateForm = ({ onAdd }: CandidateFormProps) => {
  const [name, setName] = useState("");
  const [votes, setVotes] = useState("");
  const [color, setColor] = useState(defaultColors[0]);
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !votes) return;

    const candidate: Candidate = {
      id: crypto.randomUUID(),
      name,
      votes: parseInt(votes),
      color,
      image: image || undefined,
    };

    onAdd(candidate);
    setName("");
    setVotes("");
    setColor(defaultColors[Math.floor(Math.random() * defaultColors.length)]);
    setImage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du candidat</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom complet"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="votes">Nombre de voix</Label>
        <Input
          id="votes"
          type="number"
          value={votes}
          onChange={(e) => setVotes(e.target.value)}
          placeholder="0"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Couleur</Label>
        <div className="flex gap-2 items-center">
          <input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-20 rounded border border-input cursor-pointer"
          />
          <Input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="hsl(0, 0%, 0%)"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Photo (optionnel)</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        {image && (
          <img
            src={image}
            alt="Aperçu"
            className="w-20 h-20 rounded-full object-cover border-2 border-border"
          />
        )}
      </div>

      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Ajouter le candidat
      </Button>
    </form>
  );
};
