import React from 'react';
import { ClassType } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/characterData';
import { Sparkles, Dices, Shield, Zap, Wand2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ClassCompendiumProps {
  onRollClass: (cls: ClassType) => void;
}

export const ClassCompendium: React.FC<ClassCompendiumProps> = ({ onRollClass }) => {
  const classes = Object.values(CLASS_DEFINITIONS);

  const getIcon = (name: ClassType) => {
    switch (name) {
      case 'Warrior':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Mage':
        return <Wand2 className="w-5 h-5 text-sky-400" />;
      case 'Rogue':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="relative bg-[#16100b]/90 border border-amber-900/60 rounded-xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Decorative brass corner brackets */}
      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

      <div className="mb-6 relative z-10 border-b border-amber-900/40 pb-4">
        <h2 className="text-xl md:text-3xl font-bold font-fantasy-name text-amber-100 flex items-center gap-2">
          <span>Grimoire of Disciplines</span>
        </h2>
        <p className="text-xs md:text-sm text-amber-200/70 mt-1">
          Explore the alchemical doctrines, primary attributes, and magical arts of the realm. Click &ldquo;Forge Hero&rdquo; on any class to transmute an adventurer tailored to that path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {classes.map((cls) => (
          <div
            key={cls.name}
            className="bg-[#120d08]/85 border border-amber-900/50 rounded-xl p-5 flex flex-col justify-between hover:border-amber-700/70 transition-colors shadow-lg"
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(cls.name)}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-slate-100">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-slate-400">{cls.role}</p>
                  </div>
                </div>
              </div>

              {/* Zero-Pill stat badges */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <span>Hit Die: <strong className="text-slate-200">{cls.hitDie}</strong></span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Primary Stat: <strong className="text-amber-300">{cls.primaryStat}</strong></span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {cls.description}
              </p>

              {/* Abilities preview */}
              <div className="mb-4">
                <h4 className="text-[11px] font-semibold text-slate-400 tracking-wider mb-1.5 uppercase">
                  Signature Arts
                </h4>
                <div className="space-y-1.5">
                  {cls.abilities.slice(0, 2).map((ab) => (
                    <div key={ab.name} className="text-xs bg-slate-900/60 p-2 rounded border border-slate-800/60">
                      <div className="font-medium text-amber-200/90">{ab.name}</div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{ab.effect}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action */}
            <button
              onClick={() => {
                soundManager.playDiceRoll();
                onRollClass(cls.name);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition-all cursor-pointer mt-2"
            >
              <Dices className="w-3.5 h-3.5 text-slate-950" />
              <span>Forge {cls.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
