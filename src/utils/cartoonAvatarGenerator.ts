import { Character, ClassType } from '../types/character';
import { CARTOON_PORTRAITS_BY_CLASS } from '../data/characterData';

export type CartoonStylePreset = 'cel_shaded' | 'chibi_rpg' | 'arcade_quest' | 'retro_pixel';

export interface GeneratedCartoonPortrait {
  url: string;
  styleName: string;
  themeColor: string;
  variantIndex: number;
}

const CARTOON_STYLE_NAMES: Record<CartoonStylePreset, string> = {
  cel_shaded: 'Cel-Shaded Hero',
  chibi_rpg: 'Chibi RPG Quest',
  arcade_quest: 'Arcade Legend',
  retro_pixel: '16-Bit Pixel Realm',
};

// Generates or regenerates a cartoon/video game style portrait for a given character
export function generateCartoonPortrait(
  character: Character,
  style: CartoonStylePreset = 'cel_shaded',
  currentVariant = 0
): GeneratedCartoonPortrait {
  const classKey = character.class;
  const pool = CARTOON_PORTRAITS_BY_CLASS[classKey] || CARTOON_PORTRAITS_BY_CLASS.Warrior;
  
  // Pick next variant index for regeneration
  const nextVariant = (currentVariant + 1) % pool.length;
  const baseImg = pool[nextVariant] || pool[0];

  return {
    url: baseImg,
    styleName: CARTOON_STYLE_NAMES[style],
    themeColor: getThemeColorForClass(classKey),
    variantIndex: nextVariant,
  };
}

export function getThemeColorForClass(cls: ClassType): string {
  switch (cls) {
    case 'Warrior':
      return '#f59e0b';
    case 'Mage':
      return '#38bdf8';
    case 'Rogue':
      return '#10b981';
    case 'Paladin':
      return '#fbbf24';
    case 'Ranger':
      return '#22c55e';
    case 'Cleric':
      return '#f472b6';
    case 'Druid':
      return '#84cc16';
    case 'Necromancer':
      return '#a855f7';
    case 'Bard':
      return '#f43f5e';
    case 'Monk':
      return '#06b6d4';
    default:
      return '#d97706';
  }
}
