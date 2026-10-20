import React, { useState } from 'react';
import { Character, ClassType } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/characterData';
import {
  Layers,
  Heart,
  Droplets,
  Flame,
  Trash2,
  Eye,
  Copy,
  Check,
  Search,
  Sparkles,
  Download,
  Share2,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MyDeckViewProps {
  deck: Character[];
  activeCardId: string;
  onSelectCard: (card: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
  onNavigateToForge: () => void;
}

export const MyDeckView: React.FC<MyDeckViewProps> = ({
  deck,
  activeCardId,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
  onNavigateToForge,
}) => {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Deck statistics
  const totalHealth = deck.reduce((acc, c) => acc + (c.health || 100), 0);
  const totalMana = deck.reduce((acc, c) => acc + (c.mana || 50), 0);
  const totalStrength = deck.reduce((acc, c) => acc + (c.strength || 60), 0);
  const avgHealth = deck.length > 0 ? Math.round(totalHealth / deck.length) : 0;
  const avgMana = deck.length > 0 ? Math.round(totalMana / deck.length) : 0;
  const avgStrength = deck.length > 0 ? Math.round(totalStrength / deck.length) : 0;

  const filteredDeck = deck.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.race.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === 'ALL' || card.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const handleCopyCard = (card: Character) => {
    soundManager.playClick();
    const text = `[PLAYER CARD] ${card.name} (${card.class} · ${card.race})\nHEALTH: ${card.health} HP | MANA: ${card.mana} MP | STRENGTH: ${card.strength} STR\nAbility: ${card.signatureAbility.name} - ${card.signatureAbility.effect}\nOrigin: ${card.backstory}`;
    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportDeckJSON = () => {
    soundManager.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `alchemist_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="relative bg-[#16100b]/90 border border-amber-900/60 rounded-2xl p-5 md:p-7 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Brass Corner Brackets */}
      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-amber-900/40 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-bold font-fantasy-name text-amber-100">
              My Player Card Deck
            </h2>
            <span className="text-xs font-mono text-amber-400/80 px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-600/50">
              {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
            </span>
          </div>
          <p className="text-xs md:text-sm text-amber-200/70">
            Your collection of saved player cards with custom Health, Mana, and Strength stats.
          </p>
        </div>

        {deck.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDeckJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 bg-slate-900 hover:bg-slate-800 border border-amber-900/60 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Deck</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your entire deck?')) {
                  onClearDeck();
                }
              }}
              className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/50 rounded-lg transition-colors cursor-pointer"
            >
              Clear Deck
            </button>
          </div>
        )}
      </div>

      {/* Deck Stats Bar */}
      {deck.length > 0 && (
        <div className="my-5 p-3.5 rounded-xl bg-[#0e0906] border border-amber-900/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400/70 block">TOTAL CARDS</span>
            <span className="text-xl font-bold font-mono text-amber-100 tabular-nums">{deck.length}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-rose-400/80 block">AVG HEALTH</span>
            <span className="text-xl font-bold font-mono text-rose-300 tabular-nums">{avgHealth} HP</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-sky-400/80 block">AVG MANA</span>
            <span className="text-xl font-bold font-mono text-sky-300 tabular-nums">{avgMana} MP</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 block">AVG STRENGTH</span>
            <span className="text-xl font-bold font-mono text-amber-300 tabular-nums">{avgStrength} STR</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 my-4 relative z-10">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-amber-500/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deck by card name or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d0805] border border-amber-900/60 rounded-xl pl-9 pr-4 py-2 text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="bg-[#0d0805] border border-amber-900/60 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-500 w-full sm:w-auto"
        >
          <option value="ALL">All Archetypes</option>
          {Object.keys(CLASS_DEFINITIONS).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Deck Grid */}
      {filteredDeck.length === 0 ? (
        <div className="text-center py-14 px-4 bg-[#0d0805]/70 rounded-2xl border border-amber-900/40 my-4">
          <Layers className="w-12 h-12 text-amber-600/50 mx-auto mb-3" />
          <h3 className="text-lg font-fantasy-name text-amber-200">
            {deck.length === 0 ? 'Your Deck is Currently Empty' : 'No Matching Cards Found in Deck'}
          </h3>
          <p className="text-xs text-amber-200/60 max-w-md mx-auto mt-1 mb-5">
            {deck.length === 0
              ? 'Transmute your favorite characters in the Player Card Forge and click "Save to Deck" to build your ultimate hand!'
              : 'Try clearing your search query or class filter to view other cards in your deck.'}
          </p>
          {deck.length === 0 && (
            <button
              onClick={onNavigateToForge}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Forge Your First Player Card
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
          {filteredDeck.map((card) => {
            const isActive = card.id === activeCardId;
            const classDef = CLASS_DEFINITIONS[card.class];

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl border-2 transition-all p-4 flex flex-col justify-between shadow-xl ${
                  isActive
                    ? 'bg-[#18110b] border-amber-400 shadow-amber-950/60 ring-2 ring-amber-400/30'
                    : 'bg-[#100b07] border-amber-900/60 hover:border-amber-600/70'
                }`}
              >
                <div>
                  {/* Top card strip: Rarity & Name */}
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-900/40">
                    <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-700/60 text-amber-300">
                      {card.cardRarity || 'Rare'}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400/80">
                      {card.class}
                    </span>
                  </div>

                  {/* Character Illustration & Core Stats */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-700/60 bg-[#090604] shrink-0 shadow-md">
                      <img
                        src={card.portraitUrl}
                        alt={card.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold font-fantasy-name text-amber-100 truncate tracking-wide">
                        {card.name}
                      </h4>
                      <p className="text-[11px] text-amber-300/70 truncate italic font-cinzel">
                        {card.title}
                      </p>
                      <p className="text-[10px] text-amber-200/50 mt-0.5">
                        {card.race} · {card.alignment}
                      </p>
                    </div>
                  </div>

                  {/* 3 Core Stats Badges: Health, Mana, Strength */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-[#090604] border border-amber-900/60 text-center mb-3">
                    <div className="p-1 rounded bg-rose-950/40 border border-rose-900/50">
                      <span className="text-[9px] font-mono text-rose-400 block font-semibold">HEALTH</span>
                      <span className="text-xs font-bold font-mono text-rose-200 tabular-nums">
                        {card.health || card.hitPoints * 10} HP
                      </span>
                    </div>

                    <div className="p-1 rounded bg-sky-950/40 border border-sky-900/50">
                      <span className="text-[9px] font-mono text-sky-400 block font-semibold">MANA</span>
                      <span className="text-xs font-bold font-mono text-sky-200 tabular-nums">
                        {card.mana || 80} MP
                      </span>
                    </div>

                    <div className="p-1 rounded bg-amber-950/40 border border-amber-900/50">
                      <span className="text-[9px] font-mono text-amber-400 block font-semibold">STRENGTH</span>
                      <span className="text-xs font-bold font-mono text-amber-200 tabular-nums">
                        {card.strength || 90} STR
                      </span>
                    </div>
                  </div>

                  {/* Signature Ability mention */}
                  <p className="text-[11px] text-amber-200/70 line-clamp-2 leading-relaxed">
                    <strong className="text-amber-100 font-semibold">{card.signatureAbility.name}:</strong>{' '}
                    {card.signatureAbility.effect}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-amber-900/40">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectCard(card);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-600/50'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isActive ? 'In Forge' : 'View Card'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyCard(card)}
                      title="Copy Card Details"
                      className="p-1.5 text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/60 rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedId === card.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onRemoveFromDeck(card.id)}
                      title="Remove from Deck"
                      className="p-1.5 text-amber-500/70 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
