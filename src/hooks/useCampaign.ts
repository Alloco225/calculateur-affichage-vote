import { useState, useEffect } from "react";
import { Campaign, Candidate } from "@/types/election";

const STORAGE_KEY = "election-campaigns";
const CURRENT_CAMPAIGN_KEY = "current-campaign";

export const useCampaign = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign>({
    id: "",
    title: "Élection 2025",
    location: "Ville",
    candidates: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCampaigns(JSON.parse(stored));
    }

    const currentStored = localStorage.getItem(CURRENT_CAMPAIGN_KEY);
    if (currentStored) {
      setCurrentCampaign(JSON.parse(currentStored));
    }
  }, []);

  const saveCampaign = () => {
    const campaign = {
      ...currentCampaign,
      id: currentCampaign.id || crypto.randomUUID(),
      updatedAt: Date.now(),
    };

    const existingIndex = campaigns.findIndex((c) => c.id === campaign.id);
    let updatedCampaigns: Campaign[];

    if (existingIndex >= 0) {
      updatedCampaigns = [...campaigns];
      updatedCampaigns[existingIndex] = campaign;
    } else {
      updatedCampaigns = [...campaigns, campaign];
    }

    setCampaigns(updatedCampaigns);
    setCurrentCampaign(campaign);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCampaigns));
    localStorage.setItem(CURRENT_CAMPAIGN_KEY, JSON.stringify(campaign));
  };

  const loadCampaign = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setCurrentCampaign(campaign);
      localStorage.setItem(CURRENT_CAMPAIGN_KEY, JSON.stringify(campaign));
    }
  };

  const deleteCampaign = (id: string) => {
    const updatedCampaigns = campaigns.filter((c) => c.id !== id);
    setCampaigns(updatedCampaigns);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCampaigns));
  };

  const updateTitle = (title: string) => {
    setCurrentCampaign({ ...currentCampaign, title });
  };

  const updateLocation = (location: string) => {
    setCurrentCampaign({ ...currentCampaign, location });
  };

  const addCandidate = (candidate: Candidate) => {
    setCurrentCampaign({
      ...currentCampaign,
      candidates: [...currentCampaign.candidates, candidate],
    });
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCurrentCampaign({
      ...currentCampaign,
      candidates: currentCampaign.candidates.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    });
  };

  const deleteCandidate = (id: string) => {
    setCurrentCampaign({
      ...currentCampaign,
      candidates: currentCampaign.candidates.filter((c) => c.id !== id),
    });
  };

  const newCampaign = () => {
    const campaign: Campaign = {
      id: "",
      title: "Élection 2025",
      location: "Ville",
      candidates: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setCurrentCampaign(campaign);
    localStorage.setItem(CURRENT_CAMPAIGN_KEY, JSON.stringify(campaign));
  };

  return {
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
  };
};
