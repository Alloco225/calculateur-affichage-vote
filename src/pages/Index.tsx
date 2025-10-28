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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // NEW: Import Sheet components for mobile menu
import { Download, Save, FileText, RotateCcw, Menu } from "lucide-react"; // ADD: Import Menu icon
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { Campaign, Candidate } from "@/types/election"; // Assuming Campaign and Candidate types are available

// Extracted component for the sidebar content to avoid duplication
interface CampaignSidebarContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentCampaign: Campaign;
  updateTitle: (title: string) => void;
  updateLocation: (location: string) => void;
  addCandidate: (candidate: Omit<Candidate, "id">) => void;
  updateCandidate: (id: string, updatedCandidate: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  handleNew: () => void;
  handleSave: () => void;
  handleDownload: () => void;
  campaigns: Campaign[];
  loadCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
}

const CampaignSidebarContent = ({
  activeTab,
  setActiveTab,
  currentCampaign,
  updateTitle,
  updateLocation,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  handleNew,
  handleSave,
  handleDownload,
  campaigns,
  loadCampaign,
  deleteCampaign,
}: CampaignSidebarContentProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 bg-background">
      <TabsList className="w-full rounded-none bg-background">
        <TabsTrigger value="edit" className="flex-1">
          Formulaire
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex-1">
          Sauvegardés
        </TabsTrigger>
      </TabsList>

      <TabsContent value="edit" className="h-full">
        <div className="h-full flex-1 flex flex-col justify-between overflow-auto mt-0 pb-8">
          <div className="flex-1 flex flex-col">
            <div className="space-y-3 border-b border-border p-4">
              <h2 className="text-lg font-semibold">Formulaire Résultat de Campagne</h2>
              <div>
                <Label htmlFor="title">Titre de l'élection</Label>
                <Input id="title" value={currentCampaign.title} onChange={(e) => updateTitle(e.target.value)} placeholder="Élection 2025" />
              </div>
              <div>
                <Label htmlFor="location">Ville/Localité</Label>
                <Input id="location" value={currentCampaign.location} onChange={(e) => updateLocation(e.target.value)} placeholder="Ville" />
              </div>
            </div>
            <div className="space-y-6 p-4">
              <div>
                <h3 className="font-semibold mb-3">Ajouter un candidat</h3>
                <CandidateForm onAdd={addCandidate} />
              </div>
              {currentCampaign.candidates.length > 0 && (
                <div className="flex-1">
                  <h3 className="font-semibold mb-3">Candidats ({currentCampaign.candidates.length})</h3>
                  <CandidateList candidates={currentCampaign.candidates} onUpdate={updateCandidate} onDelete={deleteCandidate} />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pb-8 px-4">
            <Button onClick={handleNew} variant="outline" className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Réinitialiser
            </Button>
            <Button onClick={handleSave} variant="default" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="saved" className="flex flex-col flex-1 h-full p-4 mt-0">
        <h2 className="text-lg font-semibold mb-2">Campagnes sauvegardées</h2>
        <SavedCampaigns campaigns={campaigns} onLoad={loadCampaign} onDelete={deleteCampaign} currentCampaignId={currentCampaign.id} />
      </TabsContent>
    </Tabs>
  );
};

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
    toast.success("Formulaire réinitialisé");
  };

  return (
		<div className="flex h-screen w-full overflow-hidden">
			{/* Canvas central */}
			<div className="relative flex-1 bg-canvas overflow-auto">
				<img src="/images/background.webp" alt="Background" className="absolute z-0 top-0 left-0 w-full h-full object-cover" />
				<div className="absolute top-0 left-0 w-full h-full bg-white/60"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
				<ChartCanvas title={currentCampaign.title} location={currentCampaign.location} candidates={currentCampaign.candidates} />

        {/* Mobile menu trigger (burger icon) - visible only on small screens */}
        <div className="absolute top-4 right-4 md:hidden z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col">
              <CampaignSidebarContent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                currentCampaign={currentCampaign}
                updateTitle={updateTitle}
                updateLocation={updateLocation}
                addCandidate={addCandidate}
                updateCandidate={updateCandidate}
                deleteCandidate={deleteCandidate}
                handleNew={handleNew}
                handleSave={handleSave}
                handleDownload={handleDownload}
                campaigns={campaigns}
                loadCampaign={loadCampaign}
                deleteCampaign={deleteCampaign}
              />
            </SheetContent>
          </Sheet>
        </div>
			</div>

			{/* Panneau latéral droit - visible only on medium screens and up */}
			<aside className="hidden md:flex md:w-96 bg-card border-l border-border flex-col">
        <CampaignSidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentCampaign={currentCampaign}
          updateTitle={updateTitle}
          updateLocation={updateLocation}
          addCandidate={addCandidate}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
          handleNew={handleNew}
          handleSave={handleSave}
          handleDownload={handleDownload}
          campaigns={campaigns}
          loadCampaign={loadCampaign}
          deleteCampaign={deleteCampaign}
        />
			</aside>
		</div>
	);
};

export default Index;
