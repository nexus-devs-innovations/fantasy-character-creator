import React, { useState, useEffect } from 'react';
import {
  Character,
  ClassType,
  GenerationLocks,
} from './types/character';
import {
  generateFullCharacter,
  generateUniqueOriginStory,
  ALCHEMIST_WORKBENCH_BG_IMG,
  CLASS_DEFINITIONS,
} from './data/characterData';
import { generateCartoonPortrait } from './utils/cartoonAvatarGenerator';
import { Header } from './components/Header';
import { PlayerCard } from './components/PlayerCard';
import { GeneratorControls } from './components/GeneratorControls';
import { MyDeckView } from './components/MyDeckView';
import { ClassCompendium } from './components/ClassCompendium';
import { DiceSandbox } from './components/DiceSandbox';
import { soundManager } from './utils/audio';

export default function App() {
  const [character, setCharacter] = useState<Character>(() => generateFullCharacter());
  const [locks, setLocks] = useState<GenerationLocks>({
    lockName: false,
    lockClass: false,
    lockRace: false,
    lockStats: false,
  });
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem('fantasy_player_card_deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState<'forge' | 'deck' | 'classes' | 'dice'>('forge');
  const [selectedClassFilter, setSelectedClassFilter] = useState<ClassType | 'ALL'>('ALL');
  const [isRolling, setIsRolling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [currentCartoonVariant, setCurrentCartoonVariant] = useState(0);

  // Sync deck to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fantasy_player_card_deck', JSON.stringify(deck));
    } catch {
      // storage unavailable
    }
  }, [deck]);

  const handleGenerateCartoonPortrait = () => {
    soundManager.playChime();
    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const generated = generateCartoonPortrait(character, 'cel_shaded', currentCartoonVariant);
      setCurrentCartoonVariant(generated.variantIndex);
      setCharacter((prev) => {
        const updated: Character = {
          ...prev,
          portraitUrl: generated.url,
          portraitStyle: 'cartoon_game',
        };
        setDeck((d) => d.map((c) => (c.id === prev.id ? updated : c)));
        return updated;
      });
      setIsGeneratingPortrait(false);
    }, 250);
  };

  const handleRegeneratePortrait = () => {
    soundManager.playDiceRoll();
    setIsGeneratingPortrait(true);

    setTimeout(() => {
      const generated = generateCartoonPortrait(character, 'cel_shaded', currentCartoonVariant);
      setCurrentCartoonVariant(generated.variantIndex);
      setCharacter((prev) => {
        const updated: Character = {
          ...prev,
          portraitUrl: generated.url,
          portraitStyle: 'cartoon_game',
        };
        setDeck((d) => d.map((c) => (c.id === prev.id ? updated : c)));
        return updated;
      });
      setIsGeneratingPortrait(false);
      soundManager.playChime();
    }, 250);
  };

  const handleResetToPainterly = () => {
    soundManager.playClick();
    const defaultImg = CLASS_DEFINITIONS[character.class]?.defaultPortrait;
    setCharacter((prev) => {
      const updated: Character = {
        ...prev,
        portraitUrl: defaultImg,
        portraitStyle: 'painterly',
      };
      setDeck((d) => d.map((c) => (c.id === prev.id ? updated : c)));
      return updated;
    });
  };

  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

  const handleGenerateBackstory = () => {
    soundManager.playChime();
    setIsGeneratingBackstory(true);

    setTimeout(() => {
      const newBackstory = generateUniqueOriginStory(character);
      setCharacter((prev) => {
        const updated = {
          ...prev,
          backstory: newBackstory,
        };
        // Update in deck if already saved
        setDeck((d) => d.map((c) => (c.id === prev.id ? updated : c)));
        return updated;
      });
      setIsGeneratingBackstory(false);
    }, 200);
  };

  const handleToggleLock = (key: keyof GenerationLocks) => {
    soundManager.playClick();
    setLocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRollCharacter = (forcedClass?: ClassType) => {
    soundManager.playDiceRoll();
    setIsRolling(true);

    setTimeout(() => {
      const newChar = generateFullCharacter(character, locks, forcedClass);
      setCharacter(newChar);
      setIsRolling(false);
      soundManager.playChime();
    }, 200);
  };

  const handleSaveToDeck = (cardToSave: Character) => {
    soundManager.playChime();
    setDeck((prev) => {
      const exists = prev.some((c) => c.id === cardToSave.id);
      if (exists) {
        return prev;
      }
      return [cardToSave, ...prev];
    });
  };

  const handleRemoveFromDeck = (id: string) => {
    soundManager.playClick();
    setDeck((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearDeck = () => {
    soundManager.playClick();
    setDeck([]);
  };

  const handleSelectCard = (card: Character) => {
    setCharacter(card);
    setActiveTab('forge');
  };

  const handleRollFromClassCompendium = (cls: ClassType) => {
    setSelectedClassFilter(cls);
    handleRollCharacter(cls);
    setActiveTab('forge');
  };

  const isSavedInDeck = deck.some((c) => c.id === character.id);

  return (
    <div className="min-h-screen bg-[#0c0906] text-[#e6dfd5] flex flex-col font-sans-body relative selection:bg-amber-600/40 selection:text-amber-100">
      {/* Ancient Alchemist's Workbench Dark Textured Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={ALCHEMIST_WORKBENCH_BG_IMG}
          alt="Ancient alchemist workbench texture"
          className="w-full h-full object-cover object-center brightness-[0.4] contrast-[1.15] filter"
          referrerPolicy="no-referrer"
        />
        {/* Deep dark chiaroscuro vignette and warm candlelight aura */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0906]/85 via-[#0e0a07]/80 to-[#070503]/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/15 via-transparent to-black/75" />
      </div>

      {/* Top Bar Contract (1 line brand - 4 links - 1 primary action) */}
      <Header
        onRoll={() => handleRollCharacter(selectedClassFilter === 'ALL' ? undefined : selectedClassFilter)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        deckCount={deck.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Player Card Forge View (Primary Bordered Player Card Layout) */}
        {activeTab === 'forge' && (
          <div>
            <GeneratorControls
              onGenerate={(forcedClass) => handleRollCharacter(forcedClass)}
              isRolling={isRolling}
              selectedClassFilter={selectedClassFilter}
              setSelectedClassFilter={setSelectedClassFilter}
              onGenerateCartoonPortrait={handleGenerateCartoonPortrait}
              isGeneratingPortrait={isGeneratingPortrait}
              isCartoonActive={character.portraitStyle === 'cartoon_game'}
            />

            <PlayerCard
              character={character}
              locks={locks}
              onToggleLock={handleToggleLock}
              onSaveToDeck={handleSaveToDeck}
              isSavedInDeck={isSavedInDeck}
              onQuickReroll={() =>
                handleRollCharacter(selectedClassFilter === 'ALL' ? undefined : selectedClassFilter)
              }
              isRolling={isRolling}
              onGenerateCartoonPortrait={handleGenerateCartoonPortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              onResetToPainterly={handleResetToPainterly}
              isGeneratingPortrait={isGeneratingPortrait}
              onGenerateBackstory={handleGenerateBackstory}
              isGeneratingBackstory={isGeneratingBackstory}
            />
          </div>
        )}

        {/* My Deck List View */}
        {activeTab === 'deck' && (
          <MyDeckView
            deck={deck}
            activeCardId={character.id}
            onSelectCard={handleSelectCard}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            onNavigateToForge={() => setActiveTab('forge')}
          />
        )}

        {/* Class Grimoire Codex View */}
        {activeTab === 'classes' && (
          <ClassCompendium onRollClass={handleRollFromClassCompendium} />
        )}

        {/* Dice Crucible Sandbox View */}
        {activeTab === 'dice' && <DiceSandbox />}
      </main>

      {/* Minimal Footer adhering to anti-slop guidelines */}
      <footer className="mt-auto border-t border-amber-900/40 bg-[#0a0704]/95 py-6 px-6 text-center text-xs text-amber-200/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-fantasy-name text-amber-300/80 text-sm">
            Ancient Alchemist&apos;s Workbench
          </p>
          <p className="text-amber-200/50">
            Player Card Forge &amp; Collectible Deck Builder for fantasy adventurers.
          </p>
        </div>
      </footer>
    </div>
  );
}
