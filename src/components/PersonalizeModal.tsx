import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { initialBirthdayConfig } from '../config/birthdayData';
import { sounds } from '../utils/soundEffects';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'memories' | 'wishes'>('general');

  if (!isOpen) return null;

  const handleReset = () => {
    sounds.playSoftClick();
    setFormData(initialBirthdayConfig);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSparkle();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-3xl w-full max-h-[90vh] glass-panel bg-[#150720]/95 border border-rose-300/30 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl text-rose-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h2 className="font-serif text-xl sm:text-2xl text-gold-gradient font-medium">
                Personalize Surprise Website
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 pt-4 pb-2">
            {[
              { id: 'general', label: 'General & Names' },
              { id: 'memories', label: `Memories (${formData.memories.length})` },
              { id: 'wishes', label: 'Wishes & Letter' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playSoftClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white/5 text-rose-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-6 pr-2">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                      Recipient Nickname
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipientFullName}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientFullName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={formData.senderName}
                      onChange={(e) =>
                        setFormData({ ...formData, senderName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                      Birthday Date
                    </label>
                    <input
                      type="text"
                      value={formData.birthdayDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthdayDate: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                    Personalized Birthday Message (Page 2)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.page2PersonalMessage}
                    onChange={(e) =>
                      setFormData({ ...formData, page2PersonalMessage: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                    Footer Made With Love Text
                  </label>
                  <input
                    type="text"
                    value={formData.madeWithLoveText}
                    onChange={(e) =>
                      setFormData({ ...formData, madeWithLoveText: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'memories' && (
              <div className="space-y-4">
                <p className="text-xs text-rose-300/70">
                  You can edit memory titles, dates, locations, and image URLs.
                </p>
                {formData.memories.map((mem, index) => (
                  <div
                    key={mem.id}
                    className="p-4 rounded-2xl bg-black/30 border border-rose-300/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300">
                        Memory #{index + 1}
                      </span>
                      <span className="text-xs text-rose-300/60 capitalize">{mem.category}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={mem.title}
                        onChange={(e) => {
                          const newMems = [...formData.memories];
                          newMems[index].title = e.target.value;
                          setFormData({ ...formData, memories: newMems });
                        }}
                        placeholder="Memory Title"
                        className="px-3 py-1.5 rounded-lg bg-black/50 border border-rose-300/20 text-xs text-rose-100"
                      />
                      <input
                        type="text"
                        value={mem.date}
                        onChange={(e) => {
                          const newMems = [...formData.memories];
                          newMems[index].date = e.target.value;
                          setFormData({ ...formData, memories: newMems });
                        }}
                        placeholder="Date"
                        className="px-3 py-1.5 rounded-lg bg-black/50 border border-rose-300/20 text-xs text-rose-100"
                      />
                    </div>
                    <input
                      type="text"
                      value={mem.image}
                      onChange={(e) => {
                        const newMems = [...formData.memories];
                        newMems[index].image = e.target.value;
                        setFormData({ ...formData, memories: newMems });
                      }}
                      placeholder="Image URL"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-rose-300/20 text-xs text-rose-100"
                    />
                    <textarea
                      rows={2}
                      value={mem.shortCaption}
                      onChange={(e) => {
                        const newMems = [...formData.memories];
                        newMems[index].shortCaption = e.target.value;
                        setFormData({ ...formData, memories: newMems });
                      }}
                      placeholder="Short Caption"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-rose-300/20 text-xs text-rose-100"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishes' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                    Letter Title
                  </label>
                  <input
                    type="text"
                    value={formData.letterTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, letterTitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                    Final Birthday Greeting
                  </label>
                  <input
                    type="text"
                    value={formData.finalGreeting}
                    onChange={(e) =>
                      setFormData({ ...formData, finalGreeting: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1">
                    Final Subgreeting
                  </label>
                  <input
                    type="text"
                    value={formData.finalSubgreeting}
                    onChange={(e) =>
                      setFormData({ ...formData, finalSubgreeting: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-300/20 text-rose-100 text-sm focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs sm:text-sm font-medium shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
