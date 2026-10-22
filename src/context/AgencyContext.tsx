/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ReelItem,
  CaseStudy,
  ClientBrand,
  Testimonial,
  CapabilityService,
  ProjectInquiry,
  CursorVariant,
} from '../types';
import {
  SEED_REELS,
  SEED_CLIENTS,
  SEED_CASE_STUDIES,
  SEED_TESTIMONIALS,
  SEED_CAPABILITIES,
} from '../data/seedData';
import { sound } from '../utils/sound';

interface AgencyContextType {
  // Data
  reels: ReelItem[];
  clients: ClientBrand[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  capabilities: CapabilityService[];
  inquiries: ProjectInquiry[];

  // Reels CRUD
  addReel: (reel: Omit<ReelItem, 'id' | 'order'>) => void;
  updateReel: (id: string, reel: Partial<ReelItem>) => void;
  deleteReel: (id: string) => void;
  toggleReelVisibility: (id: string) => void;
  reorderReels: (newOrder: ReelItem[]) => void;

  // Case Studies CRUD
  addCaseStudy: (caseStudy: Omit<CaseStudy, 'id' | 'order'>) => void;
  updateCaseStudy: (id: string, caseStudy: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;
  toggleCaseStudyVisibility: (id: string) => void;
  reorderCaseStudies: (newOrder: CaseStudy[]) => void;

  // Clients CRUD
  addClient: (client: Omit<ClientBrand, 'id' | 'order'>) => void;
  updateClient: (id: string, client: Partial<ClientBrand>) => void;
  deleteClient: (id: string) => void;
  toggleClientVisibility: (id: string) => void;
  reorderClients: (newOrder: ClientBrand[]) => void;

  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  toggleTestimonialVisibility: (id: string) => void;

  // Inquiries
  submitInquiry: (inquiry: Omit<ProjectInquiry, 'id' | 'submittedAt'>) => void;

  // Modals & Active Viewers
  activeReel: ReelItem | null;
  setActiveReel: (reel: ReelItem | null) => void;
  activeCaseStudy: CaseStudy | null;
  setActiveCaseStudy: (caseStudy: CaseStudy | null) => void;
  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Global Interactive Cursor
  cursorText: string | null;
  cursorVariant: CursorVariant;
  setCursor: (variant: CursorVariant, text?: string | null) => void;

  // Audio / Sound
  isMuted: boolean;
  toggleSound: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;

  // Reset
  resetToDefaults: () => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REELS: 'trybrands_reels_v1',
  CLIENTS: 'trybrands_clients_v1',
  CASES: 'trybrands_cases_v1',
  TESTIMONIALS: 'trybrands_testimonials_v1',
  INQUIRIES: 'trybrands_inquiries_v1',
  ADMIN_AUTH: 'trybrands_admin_auth_v1',
};

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage or defaults
  const [reels, setReels] = useState<ReelItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REELS);
      return stored ? JSON.parse(stored) : SEED_REELS;
    } catch {
      return SEED_REELS;
    }
  });

  const [clients, setClients] = useState<ClientBrand[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return stored ? JSON.parse(stored) : SEED_CLIENTS;
    } catch {
      return SEED_CLIENTS;
    }
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CASES);
      return stored ? JSON.parse(stored) : SEED_CASE_STUDIES;
    } catch {
      return SEED_CASE_STUDIES;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return stored ? JSON.parse(stored) : SEED_TESTIMONIALS;
    } catch {
      return SEED_TESTIMONIALS;
    }
  });

  const [inquiries, setInquiries] = useState<ProjectInquiry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Modal states
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Cursor state
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  // Sound state
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());

  // Capabilities
  const capabilities = SEED_CAPABILITIES;

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
    } catch {
      // Ignore
    }
  }, [reels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    } catch {
      // Ignore
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(caseStudies));
    } catch {
      // Ignore
    }
  }, [caseStudies]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch {
      // Ignore
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch {
      // Ignore
    }
  }, [inquiries]);

  // Audio helper
  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const setCursor = (variant: CursorVariant, text: string | null = null) => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  // Reels CRUD
  const addReel = (reelData: Omit<ReelItem, 'id' | 'order'>) => {
    const newReel: ReelItem = {
      ...reelData,
      id: `reel-${Date.now()}`,
      order: reels.length + 1,
    };
    setReels((prev) => [newReel, ...prev]);
    sound.playPop(560);
  };

  const updateReel = (id: string, updated: Partial<ReelItem>) => {
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    sound.playTick(720);
  };

  const deleteReel = (id: string) => {
    setReels((prev) => prev.filter((r) => r.id !== id));
    sound.playTick(420);
  };

  const toggleReelVisibility = (id: string) => {
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
    sound.playTick(600);
  };

  const reorderReels = (newOrder: ReelItem[]) => {
    const reordered = newOrder.map((item, idx) => ({ ...item, order: idx + 1 }));
    setReels(reordered);
  };

  // Case Studies CRUD
  const addCaseStudy = (caseData: Omit<CaseStudy, 'id' | 'order'>) => {
    const newCase: CaseStudy = {
      ...caseData,
      id: `case-${Date.now()}`,
      order: caseStudies.length + 1,
    };
    setCaseStudies((prev) => [newCase, ...prev]);
    sound.playPop(620);
  };

  const updateCaseStudy = (id: string, updated: Partial<CaseStudy>) => {
    setCaseStudies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    sound.playTick(720);
  };

  const deleteCaseStudy = (id: string) => {
    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
    sound.playTick(420);
  };

  const toggleCaseStudyVisibility = (id: string) => {
    setCaseStudies((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
    sound.playTick(600);
  };

  const reorderCaseStudies = (newOrder: CaseStudy[]) => {
    const reordered = newOrder.map((item, idx) => ({ ...item, order: idx + 1 }));
    setCaseStudies(reordered);
  };

  // Clients CRUD
  const addClient = (clientData: Omit<ClientBrand, 'id' | 'order'>) => {
    const newClient: ClientBrand = {
      ...clientData,
      id: `client-${Date.now()}`,
      order: clients.length + 1,
    };
    setClients((prev) => [...prev, newClient]);
    sound.playPop(520);
  };

  const updateClient = (id: string, updated: Partial<ClientBrand>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    sound.playTick(720);
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    sound.playTick(420);
  };

  const toggleClientVisibility = (id: string) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
    sound.playTick(600);
  };

  const reorderClients = (newOrder: ClientBrand[]) => {
    const reordered = newOrder.map((item, idx) => ({ ...item, order: idx + 1 }));
    setClients(reordered);
  };

  // Testimonials CRUD
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testimonialData,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newTest, ...prev]);
    sound.playPop(540);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    sound.playTick(720);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    sound.playTick(420);
  };

  const toggleTestimonialVisibility = (id: string) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)));
    sound.playTick(600);
  };

  // Inquiries
  const submitInquiry = (inquiryData: Omit<ProjectInquiry, 'id' | 'submittedAt'>) => {
    const newInquiry: ProjectInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    sound.playChime(587.33, 0.4);
  };

  // Admin Auth
  const loginAdmin = (pass: string) => {
    // Standard access key or demo shortcut
    if (pass === 'trybrands2025!' || pass === 'admin' || pass === 'password') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      sound.playChime(660, 0.2);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    sound.playTick(400);
  };

  // Reset to default seed data
  const resetToDefaults = () => {
    setReels(SEED_REELS);
    setClients(SEED_CLIENTS);
    setCaseStudies(SEED_CASE_STUDIES);
    setTestimonials(SEED_TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.REELS);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.CASES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    sound.playChime(440, 0.3);
  };

  return (
    <AgencyContext.Provider
      value={{
        reels,
        clients,
        caseStudies,
        testimonials,
        capabilities,
        inquiries,
        addReel,
        updateReel,
        deleteReel,
        toggleReelVisibility,
        reorderReels,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        toggleCaseStudyVisibility,
        reorderCaseStudies,
        addClient,
        updateClient,
        deleteClient,
        toggleClientVisibility,
        reorderClients,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        toggleTestimonialVisibility,
        submitInquiry,
        activeReel,
        setActiveReel,
        activeCaseStudy,
        setActiveCaseStudy,
        isInquiryOpen,
        setIsInquiryOpen,
        isAdminOpen,
        setIsAdminOpen,
        cursorText,
        cursorVariant,
        setCursor,
        isMuted,
        toggleSound,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
