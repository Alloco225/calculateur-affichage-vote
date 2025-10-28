import { useState } from "react";
import { ChartCanvas } from "@/components/ChartCanvas";
import { CandidateForm } from "@/components/CandidateForm";
import { CandidateList } from "@/components/CandidateList";
import { SavedCampaigns } from "@/components/SavedCampaigns";
import { useCampaign } from "@/hooks/useCampaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Save, FileText } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const Index = () => {
  const {
    campaigns,
    currentCampaign,
    saveCampaign,
    loadCampaign,
    deleteCampaign,
    updateTitle,
    updateLocation,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    newCampaign,
  } = useCampaign();

  const [activeTab, setActiveTab] = useState("edit");

  const handleDownload = async () => {
    const canvas = document.getElementById("chart-canvas");
    if (!canvas) return;

    try {
      const dataCanvas = await html2canvas(canvas, {
        backgroundColor: "#f5f5f5",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `${currentCampaign.title}-${currentCampaign.location}.png`;
      link.href = dataCanvas.toDataURL();
      link.click();

      toast.success("Graphique téléchargé avec succès");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  const handleSave = () => {
    saveCampaign();
    toast.success("Campagne sauvegardée");
  };

  const handleNew = () => {
    newCampaign();
    toast.success("Nouvelle campagne créée");
  };

  return (
		<div className="flex h-screen w-full overflow-hidden">

				{/* Canvas central */}
				<div className="relative flex-1 bg-canvas overflow-auto">
					<img src="/images/background.webp" alt="Background" className="absolute z-0 top-0 left-0 w-full h-full object-cover" />
					<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
					<ChartCanvas title={currentCampaign.title} location={currentCampaign.location} candidates={currentCampaign.candidates} />
				</div>

				{/* Panneau latéral droit */}
				<div className="w-96 bg-card border-l border-border flex flex-col">
					<div className="sticky top-0 p-3 border-b">
						<h2 className="text-lg text-center">Visualisateur de résultats de vote</h2>
					</div>
					<div className="p-4 border-b border-border">
						<div className="flex gap-2 mb-4">
							<Button onClick={handleNew} variant="outline" className="flex-1">
								<FileText className="mr-2 h-4 w-4" />
								Nouveau
							</Button>
							<Button onClick={handleSave} variant="outline" className="flex-1">
								<Save className="mr-2 h-4 w-4" />
								Sauvegarder
							</Button>
							<Button onClick={handleDownload} variant="outline">
								<Download className="h-4 w-4" />
							</Button>
						</div>

						<div className="space-y-3">
							<div>
								<Label htmlFor="title">Titre de l'élection</Label>
								<Input id="title" value={currentCampaign.title} onChange={(e) => updateTitle(e.target.value)} placeholder="Élection 2025" />
							</div>
							<div>
								<Label htmlFor="location">Ville/Localité</Label>
								<Input id="location" value={currentCampaign.location} onChange={(e) => updateLocation(e.target.value)} placeholder="Ville" />
							</div>
						</div>
					</div>

					<Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
						<TabsList className="w-full rounded-none">
							<TabsTrigger value="edit" className="flex-1">
								Éditer
							</TabsTrigger>
							<TabsTrigger value="saved" className="flex-1">
								Sauvegardés
							</TabsTrigger>
						</TabsList>

						<TabsContent value="edit" className="flex-1 overflow-auto p-4 mt-0">
							<div className="space-y-6">
								<div>
									<h3 className="font-semibold mb-3">Ajouter un candidat</h3>
									<CandidateForm onAdd={addCandidate} />
								</div>

								{currentCampaign.candidates.length > 0 && (
									<div>
										<h3 className="font-semibold mb-3">Candidats ({currentCampaign.candidates.length})</h3>
										<CandidateList candidates={currentCampaign.candidates} onUpdate={updateCandidate} onDelete={deleteCandidate} />
									</div>
								)}
							</div>
						</TabsContent>

						<TabsContent value="saved" className="flex-1 overflow-auto p-4 mt-0">
							<SavedCampaigns campaigns={campaigns} onLoad={loadCampaign} onDelete={deleteCampaign} currentCampaignId={currentCampaign.id} />
						</TabsContent>
					</Tabs>
				</div>
		</div>
	);
};

export default Index;
