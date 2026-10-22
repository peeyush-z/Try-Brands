/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Film,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Shield,
  Save,
  CheckCircle,
} from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';
import { ReelItem, CaseStudy, ClientBrand, Testimonial } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    reels,
    addReel,
    updateReel,
    deleteReel,
    toggleReelVisibility,
    reorderReels,
    caseStudies,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    toggleCaseStudyVisibility,
    reorderCaseStudies,
    clients,
    addClient,
    updateClient,
    deleteClient,
    toggleClientVisibility,
    reorderClients,
    testimonials,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialVisibility,
    inquiries,
    resetToDefaults,
  } = useAgency();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'reels' | 'cases' | 'clients' | 'testimonials' | 'inquiries' | 'sync'>('reels');

  // Form states for adding/editing Reel
  const [isAddingReel, setIsAddingReel] = useState(false);
  const [editingReelId, setEditingReelId] = useState<string | null>(null);
  const [reelForm, setReelForm] = useState({
    title: '',
    client: '',
    category: '3D Motion',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=720&q=80',
    caption: '',
    tags: '3D Motion, CGI, Concept',
    views: '120K',
  });

  // Form states for adding/editing Case Study
  const [isAddingCase, setIsAddingCase] = useState(false);
  const [caseForm, setCaseForm] = useState({
    title: '',
    client: '',
    year: '2026',
    category: 'Branding' as const,
    heroMediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    excerpt: '',
    description: '',
    challenge: '',
    solution: '',
    deliverables: 'Brand System, WebGL Flagship, Cinema Motion',
    metrics: '+180% Growth, 3x Conversion',
  });

  // Form states for adding/editing Client
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    industry: '',
    impactMetric: '',
    partnershipYear: '2025–2026',
    symbolText: '',
    logoDescription: '',
  });

  // Bulk JSON paste state
  const [bulkJsonText, setBulkJsonText] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError('Invalid administrative passcode. (Demo: admin or trybrands2025!)');
    } else {
      setLoginError('');
      setPasswordInput('');
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('admin');
    setLoginError('');
  };

  const handleCreateReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelForm.title || !reelForm.client) return;

    if (editingReelId) {
      updateReel(editingReelId, {
        title: reelForm.title,
        client: reelForm.client,
        category: reelForm.category,
        videoUrl: reelForm.videoUrl,
        thumbnailUrl: reelForm.thumbnailUrl,
        caption: reelForm.caption,
        tags: reelForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        views: reelForm.views,
      });
      setEditingReelId(null);
    } else {
      addReel({
        title: reelForm.title,
        client: reelForm.client,
        category: reelForm.category,
        videoUrl: reelForm.videoUrl,
        thumbnailUrl: reelForm.thumbnailUrl,
        caption: reelForm.caption,
        tags: reelForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        views: reelForm.views,
        aspectRatio: '9:16',
        isActive: true,
      });
    }

    setIsAddingReel(false);
    setReelForm({
      title: '',
      client: '',
      category: '3D Motion',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=720&q=80',
      caption: '',
      tags: '3D Motion, CGI, Concept',
      views: '120K',
    });
  };

  const startEditReel = (reel: ReelItem) => {
    setEditingReelId(reel.id);
    setReelForm({
      title: reel.title,
      client: reel.client,
      category: reel.category,
      videoUrl: reel.videoUrl,
      thumbnailUrl: reel.thumbnailUrl,
      caption: reel.caption,
      tags: reel.tags.join(', '),
      views: reel.views,
    });
    setIsAddingReel(true);
  };

  // Reordering helpers
  const moveReel = (index: number, direction: 'up' | 'down') => {
    sound.playTick(600);
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= reels.length) return;
    const newReels = [...reels];
    const temp = newReels[index];
    newReels[index] = newReels[targetIdx];
    newReels[targetIdx] = temp;
    reorderReels(newReels);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name.trim()) return;

    if (editingClientId) {
      updateClient(editingClientId, {
        name: clientForm.name,
        industry: clientForm.industry,
        impactMetric: clientForm.impactMetric,
        partnershipYear: clientForm.partnershipYear,
        symbolText: clientForm.symbolText || clientForm.name.slice(0, 3).toUpperCase(),
        logoDescription: clientForm.logoDescription,
      });
      setEditingClientId(null);
    } else {
      addClient({
        name: clientForm.name,
        industry: clientForm.industry,
        impactMetric: clientForm.impactMetric,
        partnershipYear: clientForm.partnershipYear,
        symbolText: clientForm.symbolText || clientForm.name.slice(0, 3).toUpperCase(),
        logoDescription: clientForm.logoDescription,
        isActive: true,
      });
    }

    setIsAddingClient(false);
    setClientForm({
      name: '',
      industry: '',
      impactMetric: '',
      partnershipYear: '2025–2026',
      symbolText: '',
      logoDescription: '',
    });
  };

  const startEditClient = (c: ClientBrand) => {
    setEditingClientId(c.id);
    setClientForm({
      name: c.name,
      industry: c.industry,
      impactMetric: c.impactMetric,
      partnershipYear: c.partnershipYear,
      symbolText: c.symbolText,
      logoDescription: c.logoDescription,
    });
    setIsAddingClient(true);
  };

  const handleExportJson = () => {
    const data = {
      clients,
      reels,
      caseStudies,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    setBulkJsonText(jsonStr);
    navigator.clipboard?.writeText(jsonStr);
    setBulkStatus('Copied full agency database JSON to clipboard!');
    sound.playPop(700);
    setTimeout(() => setBulkStatus(''), 4000);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(bulkJsonText);
      if (parsed.clients && Array.isArray(parsed.clients)) {
        localStorage.setItem('trybrands_clients_v1', JSON.stringify(parsed.clients));
      }
      if (parsed.reels && Array.isArray(parsed.reels)) {
        localStorage.setItem('trybrands_reels_v1', JSON.stringify(parsed.reels));
      }
      if (parsed.caseStudies && Array.isArray(parsed.caseStudies)) {
        localStorage.setItem('trybrands_cases_v1', JSON.stringify(parsed.caseStudies));
      }
      setBulkStatus('Successfully imported! Refreshing state...');
      sound.playChime(660, 0.3);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setBulkStatus('Invalid JSON format. Please ensure valid JSON structure.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={() => {
        sound.playTick(450);
        setIsAdminOpen(false);
      }}
    >
      <div
        className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0a0c0b] border border-[#232b25] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-[#1f2621] bg-[#0c0f0d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#19221b] border border-[#2a362e] text-[#ccff00]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>TRY-BRANDS CMS & Media Manager</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#18201a] text-[#ccff00] border border-[#2a362e]">
                  Live Stored
                </span>
              </div>
              <div className="text-xs text-[#8e9290] font-mono">
                Full CRUD for 9:16 Short-Video Reels, Case Studies, 10 Clients & Testimonials
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  sound.playTick(450);
                  logoutAdmin();
                }}
                className="px-3 py-1.5 rounded-lg border border-[#232b25] bg-[#121614] text-xs font-mono text-[#8e9290] hover:text-white transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={() => {
                sound.playTick(450);
                setIsAdminOpen(false);
              }}
              className="p-2 rounded-full bg-[#161a17] hover:bg-[#202722] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
              aria-label="Close CMS Manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#161d18] border border-[#263128] text-[#ccff00] mx-auto flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display">CMS Portal Access</h3>
              <p className="text-xs text-[#8e9290] font-mono">
                Enter your administrative passphrase to manage media, reels, and clients.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Passcode (e.g. admin or trybrands2025!)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0f1210] border border-[#232b25] focus:border-[#ccff00] focus:outline-none text-sm text-white placeholder-[#505a52] font-mono text-center"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#d4ff3f] text-black font-bold font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Authenticate Session
              </button>
            </form>

            {/* Quick Demo Access for reviewers convenience */}
            <div className="pt-2 border-t border-[#1a201c]">
              <button
                onClick={handleQuickLogin}
                className="w-full py-2.5 rounded-lg border border-[#232b25] bg-[#121614] hover:border-[#ccff00]/40 text-xs font-mono text-[#ccff00] transition-colors cursor-pointer"
              >
                ⚡ 1-Click Demo Reviewer Access
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated CMS Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Navigation */}
            <div className="px-6 border-b border-[#1f2621] bg-[#0d100e] flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-2 py-2">
                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('reels');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'reels'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>9:16 Reels ({reels.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('cases');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'cases'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Case Studies ({caseStudies.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('clients');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'clients'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>10 Clients ({clients.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('testimonials');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'testimonials'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Testimonials ({testimonials.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('inquiries');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquiries ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick(600);
                    setActiveTab('sync');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'sync'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'text-[#8e9290] hover:text-white'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Quick JSON & Client Sync</span>
                </button>
              </div>

              {/* Reset seed data button */}
              <button
                onClick={() => {
                  if (window.confirm('Reset all media, reels, and clients back to default curated agency seed data?')) {
                    resetToDefaults();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#232b25] bg-[#121614] text-[11px] font-mono text-[#8e9290] hover:text-[#ccff00] transition-colors cursor-pointer"
                title="Reset to default seed data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Seed Data</span>
              </button>
            </div>

            {/* Tab Pane Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: 9:16 REELS */}
              {activeTab === 'reels' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display">
                        Short-Form Video Reels (9:16)
                      </h3>
                      <p className="text-xs text-[#8e9290] font-mono">
                        Add vertical video files or URLs. Reorder reels to change homepage sequence.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        sound.playTick(600);
                        setEditingReelId(null);
                        setIsAddingReel(!isAddingReel);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ccff00] text-black font-bold font-mono text-xs uppercase transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAddingReel ? 'Cancel' : 'Add New 9:16 Reel'}</span>
                    </button>
                  </div>

                  {/* Add / Edit Reel Form Drawer */}
                  {isAddingReel && (
                    <form
                      onSubmit={handleCreateReel}
                      className="p-5 rounded-2xl bg-[#0e1210] border border-[#2a362e] space-y-4 animate-fadeIn"
                    >
                      <div className="text-sm font-bold font-display text-[#ccff00]">
                        {editingReelId ? 'Edit Short Reel' : 'Add New Vertical 9:16 Reel'}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Reel Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Kinetic Fluid Motion"
                            value={reelForm.title}
                            onChange={(e) => setReelForm({ ...reelForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Client Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Hyperwear"
                            value={reelForm.client}
                            onChange={(e) => setReelForm({ ...reelForm, client: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Video URL (MP4 / WebM)
                          </label>
                          <input
                            type="url"
                            required
                            value={reelForm.videoUrl}
                            onChange={(e) => setReelForm({ ...reelForm, videoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Poster / Thumbnail Image URL
                          </label>
                          <input
                            type="url"
                            required
                            value={reelForm.thumbnailUrl}
                            onChange={(e) => setReelForm({ ...reelForm, thumbnailUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Category Tag
                          </label>
                          <select
                            value={reelForm.category}
                            onChange={(e) => setReelForm({ ...reelForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                          >
                            <option value="3D Motion">3D Motion</option>
                            <option value="Branding">Branding</option>
                            <option value="Creative Direction">Creative Direction</option>
                            <option value="Digital Product">Digital Product</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Views Display (e.g. 140K)
                          </label>
                          <input
                            type="text"
                            value={reelForm.views}
                            onChange={(e) => setReelForm({ ...reelForm, views: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#8e9290] mb-1">
                          Reel Caption / Description
                        </label>
                        <textarea
                          rows={2}
                          value={reelForm.caption}
                          onChange={(e) => setReelForm({ ...reelForm, caption: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingReel(false)}
                          className="px-4 py-2 rounded-lg border border-[#232b25] text-xs font-mono text-[#8e9290]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#ccff00] text-black font-bold font-mono text-xs uppercase"
                        >
                          {editingReelId ? 'Save Changes' : 'Publish Reel to Homepage'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reels Management List */}
                  <div className="space-y-3">
                    {reels.map((reel, idx) => (
                      <div
                        key={reel.id}
                        className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                          reel.isActive
                            ? 'bg-[#0e1210] border-[#222a24]'
                            : 'bg-[#090b0a] border-[#181d1a] opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* 9:16 Small Preview */}
                          <div className="w-12 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-[#263128]">
                            <img
                              src={reel.thumbnailUrl}
                              alt={reel.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-[11px] font-mono">
                              <span className="text-[#ccff00] font-bold">{reel.client}</span>
                              <span className="text-[#8e9290]">· {reel.category}</span>
                              <span className="text-[#8e9290]">· {reel.views} views</span>
                            </div>
                            <div className="text-sm font-bold text-white font-display">
                              {reel.title}
                            </div>
                            <div className="text-xs text-[#8e9290] line-clamp-1 max-w-md">
                              {reel.caption}
                            </div>
                          </div>
                        </div>

                        {/* Actions: Reorder, Visibility, Edit, Delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveReel(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveReel(idx, 'down')}
                            disabled={idx === reels.length - 1}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleReelVisibility(reel.id)}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-[#ccff00] cursor-pointer"
                            title={reel.isActive ? 'Hide from homepage' : 'Show on homepage'}
                          >
                            {reel.isActive ? <Eye className="w-3.5 h-3.5 text-[#ccff00]" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => startEditReel(reel)}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-white cursor-pointer"
                            title="Edit Reel"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteReel(reel.id)}
                            className="p-1.5 rounded bg-[#161d18] text-red-400 hover:text-red-300 cursor-pointer"
                            title="Delete Reel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CASE STUDIES */}
              {activeTab === 'cases' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display">
                      Case Studies & Selected Work
                    </h3>
                    <p className="text-xs text-[#8e9290] font-mono">
                      Manage agency portfolio projects, deliverables, challenges, and ROI metrics.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {caseStudies.map((cs) => (
                      <div
                        key={cs.id}
                        className="p-4 rounded-xl border border-[#222a24] bg-[#0e1210] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={cs.heroMediaUrl}
                            alt={cs.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 rounded-lg object-cover border border-[#263128]"
                          />
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono text-[#8e9290]">
                              <span className="text-[#ccff00]">{cs.client}</span>
                              <span>·</span>
                              <span>{cs.category}</span>
                              <span>·</span>
                              <span>{cs.year}</span>
                            </div>
                            <div className="text-sm font-bold text-white font-display">
                              {cs.title}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCaseStudyVisibility(cs.id)}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-[#ccff00] cursor-pointer"
                            title={cs.isActive ? 'Hide' : 'Show'}
                          >
                            {cs.isActive ? <Eye className="w-3.5 h-3.5 text-[#ccff00]" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => deleteCaseStudy(cs.id)}
                            className="p-1.5 rounded bg-[#161d18] text-red-400 hover:text-red-300 cursor-pointer"
                            title="Delete Case Study"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: 10 CLIENTS */}
              {activeTab === 'clients' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display">
                        10 Enterprise Client Marquee Brands ({clients.length})
                      </h3>
                      <p className="text-xs text-[#8e9290] font-mono">
                        Add or edit client metrics, logos, industries, and visibility on the infinite homepage marquee.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        sound.playTick(600);
                        setEditingClientId(null);
                        setIsAddingClient(!isAddingClient);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ccff00] text-black font-bold font-mono text-xs uppercase transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAddingClient ? 'Cancel' : 'Add Client Brand'}</span>
                    </button>
                  </div>

                  {/* Add / Edit Client Form Drawer */}
                  {isAddingClient && (
                    <form
                      onSubmit={handleSaveClient}
                      className="p-5 rounded-2xl bg-[#0e1210] border border-[#2a362e] space-y-4 animate-fadeIn"
                    >
                      <div className="text-sm font-bold font-display text-[#ccff00]">
                        {editingClientId ? 'Edit Client Brand' : 'Add New Client Partner'}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Client Brand Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Hyperwear"
                            value={clientForm.name}
                            onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Industry / Sector *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. High-Performance Biomechanics"
                            value={clientForm.industry}
                            onChange={(e) => setClientForm({ ...clientForm, industry: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Verified Outcome Metric
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. +240% D2C Growth"
                            value={clientForm.impactMetric}
                            onChange={(e) => setClientForm({ ...clientForm, impactMetric: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Partnership Years
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 2024–2026"
                            value={clientForm.partnershipYear}
                            onChange={(e) => setClientForm({ ...clientForm, partnershipYear: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Logo Monogram / Symbol Text (2-4 letters)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. APX"
                            value={clientForm.symbolText}
                            onChange={(e) => setClientForm({ ...clientForm, symbolText: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono uppercase"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#8e9290] mb-1">
                            Logo Description / Subtitle
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Biomechanical apparel architecture"
                            value={clientForm.logoDescription}
                            onChange={(e) => setClientForm({ ...clientForm, logoDescription: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#141a16] border border-[#232b25] text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingClient(false)}
                          className="px-4 py-2 rounded-lg border border-[#232b25] text-xs font-mono text-[#8e9290]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#ccff00] text-black font-bold font-mono text-xs uppercase"
                        >
                          {editingClientId ? 'Update Client' : 'Add to Marquee'}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                          client.isActive
                            ? 'border-[#222a24] bg-[#0e1210]'
                            : 'border-[#181d1a] bg-[#090b0a] opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#171f19] border border-[#2a362e] text-[#ccff00] font-bold flex items-center justify-center text-xs">
                            {client.symbolText.slice(0, 3)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white font-display">
                              {client.name}
                            </div>
                            <div className="text-xs text-[#8e9290] font-mono">
                              {client.impactMetric} · {client.partnershipYear}
                            </div>
                            <div className="text-[11px] text-[#71717a] font-sans">
                              {client.industry}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleClientVisibility(client.id)}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-[#ccff00] cursor-pointer"
                            title={client.isActive ? 'Hide from homepage marquee' : 'Show on marquee'}
                          >
                            {client.isActive ? <Eye className="w-3.5 h-3.5 text-[#ccff00]" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => startEditClient(client)}
                            className="p-1.5 rounded bg-[#161d18] text-[#8e9290] hover:text-white cursor-pointer"
                            title="Edit Client"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteClient(client.id)}
                            className="p-1.5 rounded bg-[#161d18] text-red-400 hover:text-red-300 cursor-pointer"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display">
                      Client Proof & Testimonials
                    </h3>
                    <p className="text-xs text-[#8e9290] font-mono">
                      Manage client quotes, executive roles, and verified impact badges.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 rounded-xl border border-[#222a24] bg-[#0e1210] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{test.author}</span>
                            <span className="text-xs text-[#8e9290]">
                              ({test.role}, {test.company})
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#18201a] text-[#ccff00] border border-[#263128]">
                            {test.metricLabel}: {test.metricValue}
                          </span>
                        </div>
                        <p className="text-xs text-[#a1a1aa] italic">"{test.quote}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: INBOUND INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display">
                      Inbound Project Inquiries ({inquiries.length})
                    </h3>
                    <p className="text-xs text-[#8e9290] font-mono">
                      Live submissions received from the Try-Brands discovery form.
                    </p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-12 text-center text-[#8e9290] font-mono text-xs border border-dashed border-[#232b25] rounded-xl">
                      No customer briefs submitted yet. Test submitting one from the homepage!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-5 rounded-xl border border-[#222a24] bg-[#0e1210] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b221d] pb-2 text-xs font-mono">
                            <div className="text-white font-bold">
                              {inq.name} · <span className="text-[#ccff00]">{inq.company}</span>
                            </div>
                            <div className="text-[#8e9290]">
                              {inq.email} · {new Date(inq.submittedAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                            <div>
                              <span className="text-[#8e9290]">Budget: </span>
                              <span className="text-white font-bold">{inq.budgetRange}</span>
                            </div>
                            <div>
                              <span className="text-[#8e9290]">Timeline: </span>
                              <span className="text-white">{inq.timeline}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {inq.services.map((srv, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161d18] text-[#ccff00] border border-[#263128]"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>

                          {inq.projectOverview && (
                            <p className="text-xs text-[#a1a1aa] bg-[#090b0a] p-3 rounded-lg border border-[#1a201c]">
                              {inq.projectOverview}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: QUICK JSON & CLIENT DATA SYNC */}
              {activeTab === 'sync' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display">
                      Quick Client & Media Data Sync
                    </h3>
                    <p className="text-xs text-[#8e9290] font-mono">
                      Export, backup, or paste your complete client roster, 9:16 reels, and portfolio case studies in structured JSON.
                    </p>
                  </div>

                  {bulkStatus && (
                    <div className="p-3 rounded-lg bg-[#161d18] border border-[#ccff00] text-xs text-[#ccff00] font-mono flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{bulkStatus}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleExportJson}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold font-mono text-xs uppercase cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Export Current Database to Clipboard</span>
                    </button>
                    <button
                      onClick={handleImportJson}
                      disabled={!bulkJsonText.trim()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#232b25] bg-[#121614] hover:border-[#ccff00] text-white disabled:opacity-40 font-mono text-xs uppercase cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Apply & Import Pasted JSON</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8e9290] mb-2 uppercase">
                      Paste or Edit Agency Database JSON
                    </label>
                    <textarea
                      rows={14}
                      value={bulkJsonText}
                      onChange={(e) => setBulkJsonText(e.target.value)}
                      placeholder={`{\n  "clients": [\n    {\n      "id": "client-1",\n      "name": "Your Brand Name",\n      "industry": "Fintech / Mobility / AI",\n      "impactMetric": "+250% Growth",\n      "partnershipYear": "2025–2026",\n      "symbolText": "YBN",\n      "logoDescription": "Brand Architecture",\n      "isActive": true,\n      "order": 1\n    }\n  ],\n  "reels": [...],\n  "caseStudies": [...]\n}`}
                      className="w-full p-4 rounded-xl bg-[#090b0a] border border-[#232b25] font-mono text-xs text-[#d4d4d8] focus:border-[#ccff00] focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e1210] border border-[#222a24] space-y-2 text-xs font-mono text-[#8e9290]">
                    <div className="text-white font-bold text-xs uppercase tracking-wider">
                      💡 How to share your client info in chat:
                    </div>
                    <p>
                      You can also simply type or paste your client list directly in our chat message anytime using this simple structure:
                    </p>
                    <div className="p-3 rounded bg-black/60 text-[#ccff00] text-[11px] font-mono">
                      1. Brand Name: Apex Hyperwear<br />
                      2. Industry: Biomechanical Technical Apparel<br />
                      3. Key Metric: +240% D2C Growth or Series B Raised<br />
                      4. Years: 2024–2026<br />
                      5. Logo/Symbol: APX or link to SVG/PNG logo<br />
                      6. Reel Video URL: https://example.com/video.mp4
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
