import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Candidate } from "@/types/election";
import { Camera, Plus } from "lucide-react";

interface CandidateFormProps {
  onAdd: (candidate: Candidate) => void;
}

const defaultColors = [
  "#F85B0E",
  "#1B6EFD",
  "#FBCD09", 
  "#2DBBF3",
  "#3939B3",
  "#E91E63",
  "#9C27B0", 
  "#673AB7",
  "#4CAF50",
  "#FF5722",
  "#795548",
  "#607D8B",
  "#FF9800",
  "#8BC34A",
  "#009688"
];

export const CandidateForm = ({ onAdd }: CandidateFormProps) => {
  const [name, setName] = useState("");
  const [votes, setVotes] = useState("");
  const [color, setColor] = useState(defaultColors[0]);
  const [image, setImage] = useState("");
  const [showColors, setShowColors] = useState(false);
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
			<div className="relative flex items-stretch gap-2">
				<div className="flex flex-col space-y-2">
					<Label htmlFor="image">Photo</Label>
					<Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
					<div
						onClick={() => document.getElementById("image")?.click()}
						className="flex-1 h-auto max-h-[120px] overflow-hidden w-32  border border-border cursor-pointer flex items-center justify-center bg-background hover:bg-muted/10 transition-colors">
						{image ? <img src={image} alt="Aperçu" className="w-full h-auto object-cover" /> : <Camera className="h-8 w-8 text-muted-foreground" />}
					</div>
				</div>

        <div className="flex flex-col justify-between gap-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nom du candidat</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom et prénoms" />
          </div>

          <div className="flex gap-2">
            <div className="space-y-1">
              <Label htmlFor="votes">Nombre de voix</Label>
              <Input id="votes" type="number" value={votes} className="text-end pr-2" onChange={(e) => setVotes(e.target.value)} placeholder="0" min="0" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="color">Couleur</Label>
              <div className="flex gap-2 items-center">
                <div className="relative">
                  <div
                    className="h-10 w-20  border border-input cursor-pointer flex items-center justify-center"
                    onClick={() => setShowColors(!showColors)}
                    style={{ backgroundColor: color }}
                  />
                  {showColors && (
                    <div className="absolute top-full w-80 right-0 mt-1 bg-background border border-input shadow-lg z-10">
                      <div className="flex">
                        {defaultColors
                          .filter((c) => c !== color)
                          .map((c) => (
                            <div
                              key={c}
                              className="w-6 h-6  cursor-pointer hover:opacity-80 border"
                              style={{ backgroundColor: c }}
                              onClick={() => {
                                setColor(c);
                                setShowColors(false);
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
			</div>

			<Button type="submit" className="w-full rounded-none">
				<Plus className="mr-2 h-4 w-4" />
				Ajouter le candidat
			</Button>
		</form>
	);
};
