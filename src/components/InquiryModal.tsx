/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, ArrowRight, Sparkles, Send } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const InquiryModal: React.FC = () => {
  const { isInquiryOpen, setIsInquiryOpen, submitInquiry } = useAgency();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budgetRange: '$100K – $250K',
    timeline: '8–12 Weeks',
    services: ['Brand Identity & Strategy', 'Immersive 3D & Web Flagship'],
    projectOverview: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isInquiryOpen) return null;

  const budgetOptions = ['$50K – $100K', '$100K – $250K', '$250K – $500K', '$500K+'];
  const timelineOptions = ['4–6 Weeks (Expedited)', '8–12 Weeks (Standard)', 'Flexible (Q3/Q4 2026)'];
  const availableServices = [
    'Brand Identity & Strategy',
    'Immersive 3D & Web Flagship',
    'High-Velocity Motion & CGI',
    'Spatial OS & Mobile UX',
    'Go-to-Market Scale Advisory',
  ];

  const toggleService = (service: string) => {
    sound.playTick(700);
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please provide a valid business email.');
      return;
    }

    submitInquiry({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      services: formData.services,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      projectOverview: formData.projectOverview,
    });

    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleClose = () => {
    sound.playTick(450);
    setIsInquiryOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-[#090b0a] border border-[#232b25] shadow-2xl p-6 sm:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#161a17] hover:bg-[#202722] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          aria-label="Close Inquiry Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ccff00] text-black mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold font-display">
                Transmission Received.
              </h3>
              <p className="text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our partners at Try-Brands will review your brief and respond within 24 hours to schedule a confidential discovery session.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-lg bg-[#181d1a] border border-[#232b25] text-xs font-mono uppercase tracking-wider text-white hover:border-[#ccff00] transition-colors cursor-pointer"
              >
                Return to Experience
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
                <span>PROJECT INQUIRY</span>
                <span aria-hidden="true">·</span>
                <span>CONFIDENTIAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Initiate Project Discovery
              </h2>
              <p className="text-xs text-[#8e9290] font-mono mt-1">
                Tell us about your brand challenge, capital timeline, and scope.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 font-mono">
                {errorMsg}
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#8e9290] mb-1.5 uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Hayes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f1210] border border-[#232b25] focus:border-[#ccff00] focus:outline-none text-sm text-white placeholder-[#4b554e] font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8e9290] mb-1.5 uppercase">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f1210] border border-[#232b25] focus:border-[#ccff00] focus:outline-none text-sm text-white placeholder-[#4b554e] font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[#8e9290] mb-1.5 uppercase">
                  Brand or Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Veloce Autonomous Motors"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0f1210] border border-[#232b25] focus:border-[#ccff00] focus:outline-none text-sm text-white placeholder-[#4b554e] font-sans"
                />
              </div>
            </div>

            {/* Capabilities Needed */}
            <div>
              <label className="block text-xs font-mono text-[#8e9290] mb-2 uppercase">
                Capabilities Required
              </label>
              <div className="flex flex-wrap gap-2">
                {availableServices.map((service) => {
                  const isChecked = formData.services.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                          : 'bg-[#0f1210] text-[#a1a1aa] border-[#232b25] hover:border-[#38433b]'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range Segmented Selection */}
            <div>
              <label className="block text-xs font-mono text-[#8e9290] mb-2 uppercase">
                Anticipated Capital Allocation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((budget) => {
                  const isSelected = formData.budgetRange === budget;
                  return (
                    <button
                      type="button"
                      key={budget}
                      onClick={() => {
                        sound.playTick(650);
                        setFormData({ ...formData, budgetRange: budget });
                      }}
                      className={`p-2.5 text-xs font-mono text-center rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#18201a] border-[#ccff00] text-[#ccff00] font-bold'
                          : 'bg-[#0f1210] border-[#232b25] text-[#8e9290] hover:text-white'
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Overview textarea */}
            <div>
              <label className="block text-xs font-mono text-[#8e9290] mb-1.5 uppercase">
                Brief Context / Objectives
              </label>
              <textarea
                rows={3}
                placeholder="Describe your current stage, category challenges, or target launch date..."
                value={formData.projectOverview}
                onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0f1210] border border-[#232b25] focus:border-[#ccff00] focus:outline-none text-sm text-white placeholder-[#4b554e] font-sans resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] active:scale-95 rounded-xl transition-all shadow-[0_0_25px_-5px_rgba(204,255,0,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Strategic Brief</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
