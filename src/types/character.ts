export type ClassType = 
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Druid'
  | 'Necromancer'
  | 'Bard'
  | 'Monk';

export type RaceType =
  | 'Human'
  | 'High Elf'
  | 'Mountain Dwarf'
  | 'Shadow Tiefling'
  | 'Dragonborn'
  | 'Wood Elf'
  | 'Half-Orc'
  | 'Halfling';

export type AlignmentType =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export type StatName = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface AbilityScore {
  score: number;
  modifier: number;
}

export interface SignatureAbility {
  name: string;
  type: string;
  description: string;
  effect: string;
}

export interface Equipment {
  weapon: string;
  armor: string;
  relic: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  class: ClassType;
  race: RaceType;
  alignment: AlignmentType;
  level: number;
  hitPoints: number;
  armorClass: number;
  health: number; // Player Card Health stat
  mana: number; // Player Card Mana stat
  strength: number; // Player Card Strength stat
  cardRarity: 'Rare' | 'Epic' | 'Legendary';
  stats: Record<StatName, AbilityScore>;
  signatureAbility: SignatureAbility;
  equipment: Equipment;
  backstory: string;
  quote: string;
  portraitUrl: string;
  portraitStyle?: 'painterly' | 'cartoon_game' | 'cel_shaded' | 'chibi' | 'arcade';
  createdAt: number;
  isFavorite: boolean;
}

export interface ClassDefinition {
  name: ClassType;
  role: string;
  hitDie: string;
  primaryStat: StatName;
  description: string;
  iconName: string;
  themeColor: string;
  defaultPortrait: string;
  typicalWeapons: string[];
  abilities: SignatureAbility[];
}

export interface GenerationLocks {
  lockName: boolean;
  lockClass: boolean;
  lockRace: boolean;
  lockStats: boolean;
}
