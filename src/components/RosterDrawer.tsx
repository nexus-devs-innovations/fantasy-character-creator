import React, { useState } from 'react';
import { Character, ClassType } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/characterData';
import {
  Bookmark,
  Star,
  Trash2,
  Eye,
  Copy,
  Check,
  Search,
  Sparkles,
  Shield,
  Heart,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RosterDrawerProps {
  roster: Character[];
  activeCharacterId: string;
  onSelectCharacter: (char: Character) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteCharacter: (id: string) => void;
  onClearRoster: () => void;
  onNavigateToGenerator: () => void;
}

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  roster,
  activeCharacterId,
  onSelectCharacter,
  onToggleFavorite,
  onDeleteCharacter,
  onClearRoster,
  onNavigateToGenerator,
}) => {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRoster = roster.filter((char) => {
    const matchesSearch =
      char.name.toLowerCase().includes(search.toLowerCase()) ||
      char.title.toLowerCase().includes(search.toLowerCase()) ||
      char.race.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === 'ALL' || char.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const handleCopyShort = (char: Character) => {
    soundManager.playClick();
    const text = `${char.name} (${char.class} · ${char.race} · LVL ${char.level})\nHP: ${char.hitPoints} | AC: ${char.armorClass}\nSignature: ${char.signatureAbility.name} - ${char.signatureAbility.effect}`;
    navigator.clipboard.writeText(text);
    setCopiedId(char.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative bg-[#16100b]/90 border border-amber-900/60 rounded-xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Decorative brass corner brackets */}
      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-amber-900/40 relative z-10">
        <div>
          <h2 className="text-xl md:text-3xl font-bold font-fantasy-name text-amber-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <span>Alchemical Hall of Heroes</span>
            <span className="text-xs font-mono text-amber-400/60 font-normal">
              ({roster.length} recorded)
            </span>
          </h2>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Preserve and inspect heroes transmuted across your alchemical experiments.
          </p>
        </div>

        {roster.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear all saved heroes from your roster?')) {
                onClearRoster();
              }
            }}
            className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/50 rounded-lg transition-colors"
          >
            Clear Roster
          </button>
        )}
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row items-center gap-3 my-5">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search heroes by name or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 w-full md:w-auto"
        >
          <option value="ALL">All Classes</option>
          {Object.keys(CLASS_DEFINITIONS).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Roster list */}
      {filteredRoster.length === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-950/40 rounded-xl border border-slate-800/80">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-cinzel text-slate-300">
            {roster.length === 0 ? 'No Heroes Saved Yet' : 'No Matching Heroes Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            {roster.length === 0
              ? 'Roll characters in the forge and click "Save to Roster" to catalog them here.'
              : 'Try clearing your search query or class filter to view other saved characters.'}
          </p>
          {roster.length === 0 && (
            <button
              onClick={onNavigateToGenerator}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Forge a Hero Now
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoster.map((char) => {
            const isActive = char.id === activeCharacterId;
            const classDef = CLASS_DEFINITIONS[char.class];

            return (
              <div
                key={char.id}
                className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top row: Avatar & Basic stats */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                      <img
                        src={char.portraitUrl}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-base font-bold font-fantasy-name text-amber-100 truncate tracking-wide">
                          {char.name}
                        </h4>
                        <button
                          onClick={() => onToggleFavorite(char.id)}
                          title={char.isFavorite ? 'Remove favorite' : 'Mark as favorite'}
                          className="text-slate-500 hover:text-amber-400 p-1"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              char.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Zero-Pill metadata */}
                      <p className="text-[11px] text-slate-400 truncate">
                        <span style={{ color: classDef?.themeColor }}>{char.class}</span>
                        <span className="mx-1">·</span>
                        <span>{char.race}</span>
                        {char.portraitStyle === 'cartoon_game' && (
                          <>
                            <span className="mx-1">·</span>
                            <span className="text-amber-400/90 font-medium">Cartoon Art</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Vitals strip */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1 text-rose-300">
                      <Heart className="w-3 h-3 text-rose-400" />
                      <span className="tabular-nums">{char.hitPoints} HP</span>
                    </span>
                    <span className="flex items-center gap-1 text-sky-300">
                      <Shield className="w-3 h-3 text-sky-400" />
                      <span className="tabular-nums">AC {char.armorClass}</span>
                    </span>
                    <span className="text-amber-300/80">
                      LVL {char.level}
                    </span>
                  </div>

                  {/* Signature Ability mention */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-300 font-normal">Ability:</strong>{' '}
                    {char.signatureAbility.name} — {char.signatureAbility.effect}
                  </p>
                </div>

                {/* Card footer actions */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectCharacter(char);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{isActive ? 'Current Sheet' : 'Inspect'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyShort(char)}
                      title="Copy quick summary"
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                    >
                      {copiedId === char.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteCharacter(char.id)}
                      title="Delete character"
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
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
