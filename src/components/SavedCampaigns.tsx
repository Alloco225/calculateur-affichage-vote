import { Campaign } from "@/types/election";
import { Button } from "@/components/ui/button";
import { Trash2, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SavedCampaignsProps {
  campaigns: Campaign[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  currentCampaignId: string;
}

export const SavedCampaigns = ({
  campaigns,
  onLoad,
  onDelete,
  currentCampaignId,
}: SavedCampaignsProps) => {
  return (
    <div className="flex-1 space-y-2">
      {campaigns.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          Aucune campagne sauvegardée
        </p>
      ) : (
        campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`p-3 border ${
              campaign.id === currentCampaignId
                ? "border-accent bg-accent/10"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{campaign.title}</h4>
                <p className="text-xs text-muted-foreground">{campaign.location}</p>
                <p className="text-xs text-muted-foreground">
                  {campaign.candidates.length} candidat(s)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(campaign.updatedAt), "dd MMM yyyy à HH:mm", {
                    locale: fr,
                  })}
                </p>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onLoad(campaign.id)}
                  disabled={campaign.id === currentCampaignId}
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(campaign.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
