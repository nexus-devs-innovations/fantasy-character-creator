import React from 'react';
import { ClassType } from '../types/character';
import { Dices, Sparkles, Wand2, ShieldAlert, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GeneratorControlsProps {
  onGenerate: (forcedClass?: ClassType) => void;
  isRolling: boolean;
  selectedClassFilter: ClassType | 'ALL';
  setSelectedClassFilter: (val: ClassType | 'ALL') => void;
  onGenerateCartoonPortrait?: () => void;
  isGeneratingPortrait?: boolean;
  isCartoonActive?: boolean;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  isRolling,
  selectedClassFilter,
  setSelectedClassFilter,
  onGenerateCartoonPortrait,
  isGeneratingPortrait,
  isCartoonActive,
}) => {
  const handleRandomClick = () => {
    soundManager.playDiceRoll();
    if (selectedClassFilter === 'ALL') {
      onGenerate();
    } else {
      onGenerate(selectedClassFilter);
    }
  };

  const handleClassPresetClick = (cls: ClassType) => {
    soundManager.playDiceRoll();
    setSelectedClassFilter(cls);
    onGenerate(cls);
  };

  return (
    <div className="relative bg-[#16100b]/90 border border-amber-900/60 rounded-xl p-5 md:p-6 mb-8 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Decorative brass corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side: Context & Headline */}
        <div>
          <div className="flex items-center gap-2 mb-1 text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-300/90 font-cinzel">
              Ancient Alchemical Workbench
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-fantasy-name text-amber-100 tracking-wide drop-shadow-sm">
            The Transmutation Crucible
          </h1>
          <p className="text-xs md:text-sm text-amber-200/70 mt-1 max-w-xl">
            Transmute a hero with an inscribed name, ancient lineage, combat ratings, signature arts, and alchemical origins.
          </p>
        </div>

        {/* Center / Right: The Primary Generator Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {onGenerateCartoonPortrait && (
            <button
              onClick={onGenerateCartoonPortrait}
              disabled={isGeneratingPortrait}
              className={`inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-semibold rounded-xl border transition-all cursor-pointer shadow-md ${
                isCartoonActive
                  ? 'bg-amber-950/40 border-amber-500/70 text-amber-300 hover:bg-amber-950/60'
                  : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 hover:border-slate-600 text-slate-100'
              }`}
            >
              <Sparkles className={`w-4 h-4 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
              <span className="whitespace-nowrap">
                {isGeneratingPortrait
                  ? 'Rendering Art...'
                  : isCartoonActive
                  ? 'Regenerate Cartoon'
                  : 'Generate Cartoon Portrait'}
              </span>
            </button>
          )}

          <button
            onClick={handleRandomClick}
            disabled={isRolling}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] rounded-xl shadow-lg shadow-amber-950/50 transition-all cursor-pointer border border-amber-200/50"
          >
            <Dices
              className={`w-6 h-6 text-slate-950 transition-transform ${
                isRolling ? 'animate-spin' : 'group-hover:rotate-45'
              }`}
            />
            <span className="font-cinzel tracking-wider text-slate-950">
              {isRolling ? 'Rolling Destinies...' : 'Roll Random Character'}
            </span>
          </button>
        </div>
      </div>

      {/* Class Quick Selection Tabs */}
      <div className="mt-6 pt-5 border-t border-amber-900/40 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold text-amber-300/80 tracking-wider">
            ALCHEMICAL CLASS AFFINITY
          </span>
          <span className="text-xs text-amber-200/50">
            Select a discipline to infuse directly into your roll
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* All Random */}
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedClassFilter('ALL');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              selectedClassFilter === 'ALL'
                ? 'bg-amber-600/30 border-amber-500 text-amber-200 font-semibold shadow-inner'
                : 'bg-[#130d08]/80 border-amber-900/50 text-amber-200/70 hover:text-amber-100 hover:border-amber-700'
            }`}
          >
            Any Class
          </button>

          {/* Core 3 featured in prompt */}
          <button
            onClick={() => handleClassPresetClick('Warrior')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedClassFilter === 'Warrior'
                ? 'bg-amber-600/40 border-amber-400 text-amber-100 font-semibold'
                : 'bg-[#130d08]/80 border-amber-900/50 text-amber-200/80 hover:border-amber-600/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Warrior</span>
          </button>

          <button
            onClick={() => handleClassPresetClick('Mage')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedClassFilter === 'Mage'
                ? 'bg-sky-900/50 border-sky-400 text-sky-200 font-semibold'
                : 'bg-[#130d08]/80 border-amber-900/50 text-amber-200/80 hover:border-sky-500/60'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Mage</span>
          </button>

          <button
            onClick={() => handleClassPresetClick('Rogue')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedClassFilter === 'Rogue'
                ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-semibold'
                : 'bg-[#130d08]/80 border-amber-900/50 text-amber-200/80 hover:border-emerald-500/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rogue</span>
          </button>

          {/* Secondary Classes */}
          {(['Paladin', 'Ranger', 'Cleric', 'Druid', 'Necromancer', 'Bard', 'Monk'] as ClassType[]).map(
            (cls) => (
              <button
                key={cls}
                onClick={() => handleClassPresetClick(cls)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  selectedClassFilter === cls
                    ? 'bg-amber-600/30 border-amber-400 text-amber-100 font-semibold'
                    : 'bg-[#130d08]/70 border-amber-900/40 text-amber-200/60 hover:text-amber-100 hover:border-amber-700'
                }`}
              >
                {cls}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
