import React, { useState } from 'react';
import { Dices, RefreshCw, Sparkles } from 'lucide-react';
import { calculateModifier } from '../data/characterData';
import { soundManager } from '../utils/audio';

interface DiceRollResult {
  rolls: number[];
  droppedIndex: number;
  total: number;
  modifier: number;
  timestamp: number;
}

export const DiceSandbox: React.FC = () => {
  const [history, setHistory] = useState<DiceRollResult[]>([]);
  const [currentRoll, setCurrentRoll] = useState<DiceRollResult | null>(null);
  const [d20Roll, setD20Roll] = useState<{ val: number; natural20: boolean; natural1: boolean } | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollStatDice = () => {
    soundManager.playDiceRoll();
    setIsRolling(true);

    setTimeout(() => {
      const dice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];

      // Find lowest index
      let lowestIndex = 0;
      let lowestVal = dice[0];
      for (let i = 1; i < dice.length; i++) {
        if (dice[i] < lowestVal) {
          lowestVal = dice[i];
          lowestIndex = i;
        }
      }

      const total = dice.reduce((acc, val, idx) => (idx === lowestIndex ? acc : acc + val), 0);
      const modifier = calculateModifier(total);

      const res: DiceRollResult = {
        rolls: dice,
        droppedIndex: lowestIndex,
        total,
        modifier,
        timestamp: Date.now(),
      };

      setCurrentRoll(res);
      setHistory((prev) => [res, ...prev.slice(0, 7)]);
      setIsRolling(false);
    }, 250);
  };

  const rollD20 = () => {
    soundManager.playDiceRoll();
    const val = Math.floor(Math.random() * 20) + 1;
    setD20Roll({
      val,
      natural20: val === 20,
      natural1: val === 1,
    });
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
          <span>The Alchemical Dice Crucible</span>
        </h2>
        <p className="text-xs md:text-sm text-amber-200/70 mt-1">
          Inspect how character attributes are generated via the authentic tabletop rule: <strong>4d6, drop the lowest die</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Main 4d6 Roller */}
        <div className="lg:col-span-7 bg-[#120d08]/85 border border-amber-900/50 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">
                TABLETOP ATTRIBUTE ROLLER
              </span>
              <span className="text-xs text-amber-400 font-mono">4d6 Drop Lowest</span>
            </div>

            {/* Current Visual Dice */}
            <div className="flex items-center justify-center gap-4 py-8">
              {currentRoll ? (
                currentRoll.rolls.map((die, idx) => {
                  const isDropped = idx === currentRoll.droppedIndex;
                  return (
                    <div
                      key={idx}
                      className={`relative w-16 h-16 rounded-xl flex flex-col items-center justify-center border font-mono font-bold text-2xl transition-all ${
                        isDropped
                          ? 'bg-slate-900/60 border-rose-900/60 text-slate-600 line-through scale-90'
                          : 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500/60 text-amber-200 shadow-md shadow-amber-950/40'
                      }`}
                    >
                      <span>{die}</span>
                      {isDropped && (
                        <span className="absolute -top-2 px-1 text-[9px] bg-rose-950 text-rose-300 rounded font-sans not-italic border border-rose-800">
                          Dropped
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Click the button below to test a roll.
                </div>
              )}
            </div>

            {/* Computed Outcome */}
            {currentRoll && (
              <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 flex items-center justify-around text-center my-2">
                <div>
                  <span className="text-xs text-slate-400 block">Total Attribute</span>
                  <span className="text-3xl font-bold font-mono text-amber-300 tabular-nums">
                    {currentRoll.total}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-xs text-slate-400 block">D&amp;D Ability Modifier</span>
                  <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
                    {currentRoll.modifier >= 0 ? `+${currentRoll.modifier}` : currentRoll.modifier}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={rollStatDice}
              disabled={isRolling}
              className="flex-1 py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs md:text-sm font-cinzel transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>Roll 4d6 Drop Lowest</span>
            </button>
          </div>
        </div>

        {/* d20 Check & Roll History */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* d20 Quick Test */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">
                ACTION CHECK (D20)
              </span>
              <span className="text-xs text-slate-500">1 to 20</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-2xl font-bold text-slate-100 tabular-nums">
                  {d20Roll ? d20Roll.val : '-'}
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-300 block">
                    {d20Roll
                      ? d20Roll.natural20
                        ? 'Natural 20! Critical Hit!'
                        : d20Roll.natural1
                        ? 'Natural 1: Fumble!'
                        : `Check result: ${d20Roll.val}`
                      : 'Roll to test fate'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Used for attack rolls &amp; saving throws
                  </span>
                </div>
              </div>

              <button
                onClick={rollD20}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
              >
                Roll d20
              </button>
            </div>
          </div>

          {/* Roll History */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex-1">
            <span className="text-xs font-semibold text-slate-400 tracking-wider block mb-2.5">
              RECENT STAT ROLLS
            </span>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No rolls recorded yet.</p>
            ) : (
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {history.map((h, i) => (
                  <div
                    key={h.timestamp + i}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-slate-900/60 border border-slate-800/80 font-mono text-slate-300"
                  >
                    <span>
                      Dice: [{h.rolls.join(', ')}]
                    </span>
                    <span className="font-bold text-amber-300 tabular-nums">
                      Score: {h.total} ({h.modifier >= 0 ? `+${h.modifier}` : h.modifier})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
