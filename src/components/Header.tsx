import React from 'react';
import { Volume2, VolumeX, Layers, Dices } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onRoll: () => void;
  activeTab: 'forge' | 'deck' | 'classes' | 'dice';
  setActiveTab: (tab: 'forge' | 'deck' | 'classes' | 'dice') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  deckCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onRoll,
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  deckCount,
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120d08]/95 backdrop-blur-md border-b border-amber-900/50 px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('forge');
          }}
          className="text-lg md:text-2xl font-bold tracking-wider text-amber-200 font-fantasy-name whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors text-left drop-shadow cursor-pointer"
        >
          Fantasy Character Creator
        </button>

        {/* Zone 2: 4 single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100/70">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('forge');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white cursor-pointer ${
              activeTab === 'forge'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-amber-200/60'
            }`}
          >
            Player Card Forge
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('deck');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'deck'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-amber-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>My Deck ({deckCount})</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('classes');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white cursor-pointer ${
              activeTab === 'classes'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-amber-200/60'
            }`}
          >
            Class Grimoire
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('dice');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white cursor-pointer ${
              activeTab === 'dice'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-amber-200/60'
            }`}
          >
            Dice Crucible
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-2 text-amber-400/80 hover:text-amber-300 hover:bg-[#1a120b] rounded-lg transition-colors border border-amber-900/60 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onRoll}
            className="px-4 py-2 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 active:scale-95 shadow-md shadow-amber-950/70 border border-amber-200/60 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Forge Player Card
          </button>
        </div>
      </div>
    </header>
  );
};
