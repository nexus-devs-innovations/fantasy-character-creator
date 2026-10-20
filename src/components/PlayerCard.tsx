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
  Sword,
  Shield,
  Sparkles,
  Zap,
  Heart,
  Droplets,
  Flame,
  Gamepad2,
  RefreshCw,
  BookOpen,
  Scroll,
  Layers,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PlayerCardProps {
  character: Character;
  locks: GenerationLocks;
  onToggleLock: (key: keyof GenerationLocks) => void;
  onSaveToDeck: (character: Character) => void;
  isSavedInDeck: boolean;
  onQuickReroll: () => void;
  isRolling: boolean;
  onGenerateCartoonPortrait: () => void;
  onRegeneratePortrait: () => void;
  onResetToPainterly: () => void;
  isGeneratingPortrait: boolean;
  onGenerateBackstory: () => void;
  isGeneratingBackstory?: boolean;
}

const STAT_INFO: Record<StatName, { label: string }> = {
  STR: { label: 'STR' },
  DEX: { label: 'DEX' },
  CON: { label: 'CON' },
  INT: { label: 'INT' },
  WIS: { label: 'WIS' },
  CHA: { label: 'CHA' },
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  character,
  locks,
  onToggleLock,
  onSaveToDeck,
  isSavedInDeck,
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
    const markdown = `# ${character.name} [PLAYER CARD]
*${character.title}*
**Class:** ${character.class} | **Race:** ${character.race} | **Rarity:** ${character.cardRarity}
**HEALTH:** ${character.health} HP | **MANA:** ${character.mana} MP | **STRENGTH:** ${character.strength} ATK

### Signature Ability
**${character.signatureAbility.name}** (${character.signatureAbility.type})
${character.signatureAbility.description}
*Effect:* ${character.signatureAbility.effect}

### Gear & Equipment
- Weapon: ${character.equipment.weapon}
- Armor: ${character.equipment.armor}
- Relic: ${character.equipment.relic}

### Origin Story
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
    downloadAnchor.setAttribute('download', `${character.name.toLowerCase().replace(/\s+/g, '_')}_card.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Outer Card Shell with Distinct Multi-Layer Metallic Border */}
      <div
        className={`relative rounded-3xl p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-all duration-300 ${
          isRolling ? 'opacity-70 scale-[0.99] blur-[0.5px]' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #2b1d12 0%, #150e09 40%, #0d0906 100%)',
          border: '3px solid rgba(217, 119, 6, 0.7)',
          boxShadow: '0 0 0 1px #451a03, 0 0 25px rgba(217, 119, 6, 0.25), inset 0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        {/* Inner Card Gilded Filigree Inset Border */}
        <div className="relative rounded-2xl border-2 border-amber-600/50 bg-[#120c08]/95 p-4 sm:p-6 backdrop-blur-md overflow-hidden">
          
          {/* Card Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

          {/* CARD TOP BAR: Name, Rarity & Mana Cost Crystal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-amber-800/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400/90 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/60">
                  {character.cardRarity} CARD
                </span>
                <span className="text-xs text-amber-300/60 font-cinzel">·</span>
                <span className="text-xs font-semibold text-amber-300">{character.class}</span>
                <span className="text-xs text-amber-300/60 font-cinzel">·</span>
                <span className="text-xs text-amber-100/70">{character.race}</span>
              </div>

              {/* Character's Name in Stylized Fantasy Font */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-fantasy-name text-amber-100 tracking-wide mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {character.name}
              </h2>
              <p className="text-xs sm:text-sm text-amber-300/80 italic font-cinzel">
                {character.title}
              </p>
            </div>

            {/* Top Right Card Mana / Level Crystal */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-950/80 to-indigo-950/80 border border-sky-500/60 shadow-md shadow-sky-950/50">
                <Droplets className="w-4 h-4 text-sky-400 fill-sky-500/30" />
                <span className="font-mono text-sm font-bold text-sky-200 tabular-nums">
                  {character.mana} MP
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-300/60 flex items-center justify-center font-mono font-extrabold text-slate-950 text-base shadow-md">
                1
              </div>
            </div>
          </div>

          {/* MAIN CARD BODY: Split between Portrait & Stats/Abilities */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Bordered Illustration Window (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {/* Card Portrait Frame with Beveled Border */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border-3 border-amber-700/80 bg-[#090604] shadow-2xl group">
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
                    <p className="font-fantasy-name text-2xl text-amber-200">{character.class}</p>
                    <p className="text-xs text-amber-400/70 mt-1">{character.race}</p>
                  </div>
                )}

                {/* Loading overlay when generating portrait */}
                {isGeneratingPortrait && (
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                    <span className="text-xs font-semibold text-amber-200 tracking-wider font-cinzel">
                      {character.portraitStyle === 'cartoon_game' ? 'Regenerating Portrait...' : 'Generating Cartoon Portrait...'}
                    </span>
                  </div>
                )}

                {/* Bottom Frame Trim */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090604] via-[#090604]/70 to-transparent p-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-300 font-semibold">{character.alignment}</span>
                  <span className="text-amber-400/80">#HERO-001</span>
                </div>
              </div>

              {/* Portrait Studio Buttons (Cartoon / Video game generator & regenerator) */}
              <div className="p-3 rounded-xl bg-[#0f0a07] border border-amber-900/60 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>PORTRAIT STUDIO</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/70">
                    {character.portraitStyle === 'cartoon_game' ? 'Cartoon Active' : 'Painterly'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onGenerateCartoonPortrait}
                    disabled={isGeneratingPortrait}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 cursor-pointer ${
                      character.portraitStyle === 'cartoon_game'
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200 hover:bg-amber-500/30'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{character.portraitStyle === 'cartoon_game' ? 'Cartoon Art' : 'Generate Cartoon'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRegeneratePortrait}
                    disabled={isGeneratingPortrait}
                    className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-amber-200 border border-amber-900/60 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 text-amber-400 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>

                {character.portraitStyle === 'cartoon_game' && (
                  <div className="mt-2 pt-1.5 border-t border-amber-900/40 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Cartoon Video Game Art
                    </span>
                    <button
                      type="button"
                      onClick={onResetToPainterly}
                      className="text-amber-400/80 hover:text-amber-200 underline cursor-pointer"
                    >
                      Classic Art
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Lock Toggles */}
              <div className="p-3 rounded-xl bg-[#0f0a07] border border-amber-900/60">
                <span className="text-[11px] font-semibold text-amber-300/80 block mb-2 tracking-wider">
                  CARD ATTRIBUTE LOCKS
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => onToggleLock('lockName')}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors ${
                      locks.lockName
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                        : 'bg-[#16100b] border-amber-900/40 text-amber-200/60 hover:text-amber-100'
                    }`}
                  >
                    <span>Name</span>
                    {locks.lockName ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-amber-700" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleLock('lockClass')}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors ${
                      locks.lockClass
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                        : 'bg-[#16100b] border-amber-900/40 text-amber-200/60 hover:text-amber-100'
                    }`}
                  >
                    <span>Class</span>
                    {locks.lockClass ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-amber-700" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleLock('lockRace')}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors ${
                      locks.lockRace
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                        : 'bg-[#16100b] border-amber-900/40 text-amber-200/60 hover:text-amber-100'
                    }`}
                  >
                    <span>Race</span>
                    {locks.lockRace ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-amber-700" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleLock('lockStats')}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors ${
                      locks.lockStats
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                        : 'bg-[#16100b] border-amber-900/40 text-amber-200/60 hover:text-amber-100'
                    }`}
                  >
                    <span>Stats</span>
                    {locks.lockStats ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-amber-700" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: The New Player Card Stats & Abilities Text Box (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-5">
              
              {/* THE 3 CORE PLAYER CARD STATS: HEALTH, MANA, STRENGTH */}
              <div className="bg-[#0b0805] rounded-2xl p-4 border-2 border-amber-800/60 shadow-xl">
                <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase block mb-3 font-cinzel">
                  PLAYER CARD COMBAT METRICS
                </span>

                <div className="grid grid-cols-3 gap-3">
                  {/* HEALTH STAT */}
                  <div className="relative p-3 rounded-xl bg-gradient-to-b from-rose-950/50 to-[#120707] border border-rose-600/60 flex flex-col items-center justify-center text-center shadow-md shadow-rose-950/40">
                    <div className="flex items-center gap-1.5 text-rose-400 mb-1">
                      <Heart className="w-4 h-4 fill-rose-500/40" />
                      <span className="text-[10px] font-bold tracking-wider uppercase font-mono">HEALTH</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-200 tabular-nums">
                      {character.health}
                    </span>
                    <span className="text-[10px] text-rose-300/80 font-mono mt-0.5">Vital HP</span>
                    {/* Progress bar */}
                    <div className="w-full bg-rose-950 h-1.5 rounded-full mt-2 overflow-hidden border border-rose-900">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                        style={{ width: `${Math.min((character.health / 250) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* MANA STAT */}
                  <div className="relative p-3 rounded-xl bg-gradient-to-b from-sky-950/50 to-[#070d14] border border-sky-500/60 flex flex-col items-center justify-center text-center shadow-md shadow-sky-950/40">
                    <div className="flex items-center gap-1.5 text-sky-400 mb-1">
                      <Droplets className="w-4 h-4 fill-sky-500/40" />
                      <span className="text-[10px] font-bold tracking-wider uppercase font-mono">MANA</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-200 tabular-nums">
                      {character.mana}
                    </span>
                    <span className="text-[10px] text-sky-300/80 font-mono mt-0.5">Arcane MP</span>
                    {/* Progress bar */}
                    <div className="w-full bg-sky-950 h-1.5 rounded-full mt-2 overflow-hidden border border-sky-900">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                        style={{ width: `${Math.min((character.mana / 250) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* STRENGTH STAT */}
                  <div className="relative p-3 rounded-xl bg-gradient-to-b from-amber-950/50 to-[#140f06] border border-amber-500/60 flex flex-col items-center justify-center text-center shadow-md shadow-amber-950/40">
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                      <Flame className="w-4 h-4 fill-amber-500/40" />
                      <span className="text-[10px] font-bold tracking-wider uppercase font-mono">STRENGTH</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-200 tabular-nums">
                      {character.strength}
                    </span>
                    <span className="text-[10px] text-amber-300/80 font-mono mt-0.5">Attack STR</span>
                    {/* Progress bar */}
                    <div className="w-full bg-amber-950 h-1.5 rounded-full mt-2 overflow-hidden border border-amber-900">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${Math.min((character.strength / 250) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD ABILITY / TEXT BOX */}
              <div className="p-4 rounded-xl bg-[#0f0a07] border border-amber-900/60 shadow-inner">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <h3 className="text-xs font-bold tracking-wider uppercase font-cinzel">
                      CARD ACTION: {character.signatureAbility.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/80 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                    {character.signatureAbility.type}
                  </span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed mt-1">
                  {character.signatureAbility.description}
                </p>
                <div className="mt-2.5 p-2 rounded-lg bg-amber-950/30 border border-amber-700/40 text-xs font-mono text-amber-300">
                  <strong className="text-amber-200 font-semibold">Card Effect:</strong> {character.signatureAbility.effect}
                </div>
              </div>

              {/* ORIGIN STORY WITH 'GENERATE BACKSTORY' BUTTON */}
              <div className="p-4 rounded-xl bg-[#0f0a07] border border-amber-900/60 shadow-inner">
                <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-amber-900/40">
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
                    <span>{isGeneratingBackstory ? 'Divining...' : 'Generate Backstory'}</span>
                  </button>
                </div>

                <p className="text-xs text-amber-100/90 leading-relaxed font-sans-body">
                  {character.backstory}
                </p>
                <blockquote className="mt-2 text-xs italic text-amber-300/80 font-cinzel border-t border-amber-900/30 pt-1.5">
                  {character.quote}
                </blockquote>
              </div>

              {/* GEAR & ATTRIBUTE SUB-MATRIX */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#0e0906] border border-amber-900/40">
                  <span className="text-[10px] text-amber-400/80 font-semibold block mb-1">EQUIPPED ARMS</span>
                  <p className="text-amber-100 font-medium truncate">{character.equipment.weapon}</p>
                  <p className="text-[11px] text-amber-300/70 truncate">{character.equipment.relic}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0e0906] border border-amber-900/40">
                  <span className="text-[10px] text-amber-400/80 font-semibold block mb-1">DEFENSE & SPEED</span>
                  <p className="text-amber-100 font-mono tabular-nums font-semibold">Armor Class: {character.armorClass}</p>
                  <p className="text-[11px] text-amber-300/70 font-mono tabular-nums">Base Hit Points: {character.hitPoints}</p>
                </div>
              </div>

              {/* PRIMARY CARD ACTIONS: 'SAVE TO DECK' & 'RE-ROLL' */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-900/50">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Save to Deck Button */}
                  <button
                    type="button"
                    onClick={() => onSaveToDeck(character)}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-md ${
                      isSavedInDeck
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-emerald-950/50'
                        : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-300/80 shadow-amber-950/60 active:scale-95'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isSavedInDeck ? 'Saved in Deck ✓' : 'Save to Deck'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    title="Copy card text"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-200 rounded-xl border border-amber-900/60 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleExportJSON}
                    title="Export Card JSON"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-200 rounded-xl border border-amber-900/60 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Tactile Reroll Button */}
                <button
                  type="button"
                  onClick={onQuickReroll}
                  disabled={isRolling}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-amber-300 bg-[#1a120b] hover:bg-[#251a10] border border-amber-700/60 rounded-xl shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isRolling ? 'Forging...' : 'Re-roll Card'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* CARD FOOTER: Collector Set Info */}
          <div className="mt-5 pt-3 border-t border-amber-900/50 flex flex-wrap items-center justify-between text-[10px] font-mono text-amber-400/60">
            <span>COLLECTOR SET: ALCHEMY V1 · #024/100</span>
            <span>FOIL FINISH: LEGENDARY</span>
            <span>ART: WORKBENCH FORGE</span>
          </div>

        </div>
      </div>
    </div>
  );
};
