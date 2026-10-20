import React, { useState } from 'react';
import {
  Character,
  GenerationLocks,
  StatName,
} from '../types/character';
import { CLASS_DEFINITIONS } from '../data/characterData';
import {
  Lock,
  Unlock,
  Bookmark,
  Check,
  Copy,
  Download,
  Share2,
  Sword,
  Shield,
  Sparkles,
  Zap,
  Heart,
  Compass,
  Gamepad2,
  RefreshCw,
  BookOpen,
  Scroll,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CharacterCardProps {
  character: Character;
  locks: GenerationLocks;
  onToggleLock: (key: keyof GenerationLocks) => void;
  onSaveToRoster: (character: Character) => void;
  isSaved: boolean;
  onQuickReroll: () => void;
  isRolling: boolean;
  onGenerateCartoonPortrait: () => void;
  onRegeneratePortrait: () => void;
  onResetToPainterly: () => void;
  isGeneratingPortrait: boolean;
  onGenerateBackstory: () => void;
  isGeneratingBackstory?: boolean;
}

const STAT_INFO: Record<StatName, { label: string; desc: string }> = {
  STR: { label: 'Strength', desc: 'Physical power and weapon thrust' },
  DEX: { label: 'Dexterity', desc: 'Agility, reflexes, and stealth' },
  CON: { label: 'Constitution', desc: 'Health, stamina, and resilience' },
  INT: { label: 'Intelligence', desc: 'Arcane acumen and mental memory' },
  WIS: { label: 'Wisdom', desc: 'Perception, intuition, and divine faith' },
  CHA: { label: 'Charisma', desc: 'Force of personality and presence' },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  locks,
  onToggleLock,
  onSaveToRoster,
  isSaved,
  onQuickReroll,
  isRolling,
  onGenerateCartoonPortrait,
  onRegeneratePortrait,
  onResetToPainterly,
  isGeneratingPortrait,
  onGenerateBackstory,
  isGeneratingBackstory,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const classDef = CLASS_DEFINITIONS[character.class];

  const handleCopy = () => {
    soundManager.playClick();
    const statsText = Object.entries(character.stats)
      .map(([stat, val]) => `${stat}: ${val.score} (${val.modifier >= 0 ? '+' : ''}${val.modifier})`)
      .join(' | ');

    const markdown = `# ${character.name}
*${character.title}*
**Class:** ${character.class} | **Race:** ${character.race} | **Alignment:** ${character.alignment} | **Level:** ${character.level}
**HP:** ${character.hitPoints} | **AC:** ${character.armorClass}

### Ability Scores
${statsText}

### Signature Ability: ${character.signatureAbility.name} (${character.signatureAbility.type})
${character.signatureAbility.description}
*Effect:* ${character.signatureAbility.effect}

### Equipment
- **Weapon:** ${character.equipment.weapon}
- **Armor:** ${character.equipment.armor}
- **Relic:** ${character.equipment.relic}

### Backstory
${character.backstory}

> ${character.quote}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleExportJSON = () => {
    soundManager.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(character, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${character.name.toLowerCase().replace(/\s+/g, '_')}_sheet.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`relative bg-[#16100b]/95 border border-amber-900/60 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 backdrop-blur-md ${isRolling ? 'opacity-70 scale-[0.99] blur-[0.5px]' : 'opacity-100 scale-100'}`}>
      {/* Alchemical decorative corner brass inlays */}
      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-500/50 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-500/50 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />

      {/* Subtle alchemical golden glow top line */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${classDef?.themeColor || '#d97706'} 50%, transparent 100%)`,
        }}
      />

      {/* Main card grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Portrait & Identity Lock Controls (4 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Portrait Container with antique brass bezel */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-amber-800/70 bg-[#0e0906] group shadow-2xl">
            {!imageError && character.portraitUrl ? (
              <img
                src={character.portraitUrl}
                alt={`${character.name} the ${character.class}`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1b130d] to-[#0c0805] text-center">
                <Sparkles className="w-12 h-12 text-amber-400 mb-3 opacity-80" />
                <p className="font-fantasy-name text-xl text-amber-200">{character.class}</p>
                <p className="text-xs text-amber-400/70 mt-1">{character.race}</p>
              </div>
            )}

            {/* Loading overlay when generating portrait */}
            {isGeneratingPortrait && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                <span className="text-xs font-semibold text-amber-200 tracking-wider font-cinzel">
                  {character.portraitStyle === 'cartoon_game' ? 'Regenerating Portrait...' : 'Generating Cartoon Portrait...'}
                </span>
              </div>
            )}

            {/* Scrim Overlay with quick combat numbers */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-rose-300">
                <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-400" />
                <span className="font-mono tabular-nums font-semibold">{character.hitPoints} HP</span>
              </div>
              <div className="flex items-center gap-1.5 text-sky-300">
                <Shield className="w-3.5 h-3.5 fill-sky-500/30 text-sky-400" />
                <span className="font-mono tabular-nums font-semibold">AC {character.armorClass}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono tabular-nums font-semibold">LVL {character.level}</span>
              </div>
            </div>
          </div>

          {/* Cartoon / Video Game Style Portrait Generation & Regeneration Buttons */}
          <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                <span>PORTRAIT STUDIO</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {character.portraitStyle === 'cartoon_game' ? 'Cartoon RPG Active' : 'Classic Painterly'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onGenerateCartoonPortrait}
                disabled={isGeneratingPortrait}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer ${
                  character.portraitStyle === 'cartoon_game'
                    ? 'bg-amber-400/20 border border-amber-500/50 text-amber-300 hover:bg-amber-400/30'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${character.portraitStyle === 'cartoon_game' ? 'text-amber-400' : 'text-slate-950'}`} />
                <span>{character.portraitStyle === 'cartoon_game' ? 'Generate Cartoon' : 'Generate Cartoon Portrait'}</span>
              </button>

              <button
                type="button"
                onClick={onRegeneratePortrait}
                disabled={isGeneratingPortrait}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                <span>Regenerate Portrait</span>
              </button>
            </div>

            {character.portraitStyle === 'cartoon_game' && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> Cartoon / Video Game Style
                </span>
                <button
                  type="button"
                  onClick={onResetToPainterly}
                  className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
                >
                  Restore Painterly
                </button>
              </div>
            )}
          </div>

          {/* Quick Reroll Lock Toggles (Zero pill, clean buttons) */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">CREATOR LOCKS</span>
              <span className="text-xs text-slate-500">Hold values for next roll</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onToggleLock('lockName')}
                className={`flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                  locks.lockName
                    ? 'bg-amber-950/40 border-amber-600/70 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>Name</span>
                {locks.lockName ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-500" />}
              </button>

              <button
                type="button"
                onClick={() => onToggleLock('lockClass')}
                className={`flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                  locks.lockClass
                    ? 'bg-amber-950/40 border-amber-600/70 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>Class</span>
                {locks.lockClass ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-500" />}
              </button>

              <button
                type="button"
                onClick={() => onToggleLock('lockRace')}
                className={`flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                  locks.lockRace
                    ? 'bg-amber-950/40 border-amber-600/70 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>Race</span>
                {locks.lockRace ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-500" />}
              </button>

              <button
                type="button"
                onClick={() => onToggleLock('lockStats')}
                className={`flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                  locks.lockStats
                    ? 'bg-amber-950/40 border-amber-600/70 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>Stats</span>
                {locks.lockStats ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-500" />}
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSaveToRoster(character)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-emerald-950/40 border-emerald-600/80 text-emerald-300'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved to Roster' : 'Save to Roster'}</span>
            </button>

            <button
              onClick={handleCopy}
              title="Copy markdown sheet"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleExportJSON}
              title="Export JSON"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Character Details, Stats & Lore (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Header Zone: Name, Title & Unboxed Metadata */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/40 pb-3 mb-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-fantasy-name text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {character.name}
              </h2>
            </div>
            
            <p className="text-sm text-amber-300/80 italic mt-0.5 font-cinzel">
              {character.title}
            </p>

            {/* Zero-Pill Metadata Discipline: Clean unboxed text with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/70 mt-2.5">
              <span className="font-semibold text-amber-300">{character.class}</span>
              <span aria-hidden="true" className="text-amber-800">·</span>
              <span>{character.race}</span>
              <span aria-hidden="true" className="text-amber-800">·</span>
              <span>{character.alignment}</span>
              <span aria-hidden="true" className="text-amber-800">·</span>
              <span>{classDef?.role || 'Heroic Wanderer'}</span>
            </div>
          </div>

          {/* Ability Scores Grid (Tabular numerals, bar gauges) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-400 tracking-wider">CORE ATTRIBUTES (4D6 DROP LOWEST)</h3>
              <span className="text-xs text-slate-500 font-mono">Primary: {classDef.primaryStat}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {(Object.keys(STAT_INFO) as StatName[]).map((stat) => {
                const item = character.stats[stat];
                const isPrimary = stat === classDef.primaryStat;
                const modifierStr = item.modifier >= 0 ? `+${item.modifier}` : `${item.modifier}`;
                const percent = Math.min(Math.max(((item.score - 3) / 15) * 100, 10), 100);

                return (
                  <div
                    key={stat}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      isPrimary
                        ? 'bg-amber-950/20 border-amber-600/50 text-amber-200 shadow-sm shadow-amber-950/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block text-[11px] font-semibold text-slate-400 tracking-wider">
                      {stat}
                    </span>
                    <span className="block text-lg font-bold font-mono tabular-nums mt-0.5">
                      {item.score}
                    </span>
                    <span className={`block text-xs font-mono font-medium ${isPrimary ? 'text-amber-400' : 'text-slate-400'}`}>
                      {modifierStr}
                    </span>
                    {/* Stat visual gauge */}
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isPrimary ? 'bg-amber-400' : 'bg-slate-500'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Ability & Gear Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Signature Ability */}
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-1.5 text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-slate-300">
                  SIGNATURE ABILITY
                </h4>
              </div>
              <p className="text-sm font-semibold text-amber-100 font-cinzel">
                {character.signatureAbility.name}
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {character.signatureAbility.description}
              </p>
              <p className="text-[11px] text-amber-400/90 mt-2 font-mono">
                {character.signatureAbility.effect}
              </p>
            </div>

            {/* Equipment */}
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2 text-slate-300">
                <Sword className="w-4 h-4 text-slate-400 shrink-0" />
                <h4 className="text-xs font-semibold tracking-wider text-slate-300">
                  STARTING GEAR
                </h4>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-500">Weapon:</span>
                  <span className="font-medium text-slate-200">{character.equipment.weapon}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-500">Armor:</span>
                  <span className="font-medium text-slate-200">{character.equipment.armor}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-500">Relic:</span>
                  <span className="font-medium text-amber-300/90">{character.equipment.relic}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Lore & Backstory */}
          <div className="p-4 rounded-lg bg-[#140e09]/90 border border-amber-900/50 shadow-inner">
            <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-amber-900/40">
              <h4 className="text-xs font-semibold text-amber-300/90 tracking-wider flex items-center gap-1.5 font-cinzel">
                <Scroll className="w-3.5 h-3.5 text-amber-400" />
                <span>ORIGIN CHRONICLE</span>
              </h4>

              {/* Generate Backstory Button */}
              <button
                type="button"
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/50 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              >
                <BookOpen className={`w-3.5 h-3.5 text-amber-400 ${isGeneratingBackstory ? 'animate-spin' : ''}`} />
                <span>{isGeneratingBackstory ? 'Divining Origin...' : 'Generate Backstory'}</span>
              </button>
            </div>

            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans-body">
              {character.backstory}
            </p>
            <blockquote className="mt-3 text-xs md:text-sm italic text-amber-200/80 font-cinzel border-t border-amber-900/40 pt-2.5">
              {character.quote}
            </blockquote>
          </div>

          {/* Tactile Reroll Button (Under card for easy repeat clicking) */}
          <div className="pt-1 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Clicking generate re-rolls unlocked fields automatically.
            </span>
            <button
              onClick={onQuickReroll}
              disabled={isRolling}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950" />
              <span>{isRolling ? 'Forging...' : 'Re-roll Character'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
