import {
  Character,
  ClassDefinition,
  ClassType,
  RaceType,
  AlignmentType,
  StatName,
  AbilityScore,
  GenerationLocks,
} from '../types/character';

// Generated asset paths
export const REALM_BANNER_IMG = '/src/assets/images/fantasy_banner_realm_1792490943906.jpg';
export const ALCHEMIST_WORKBENCH_BG_IMG = '/src/assets/images/alchemist_workbench_bg_1792491696546.jpg';
export const MAGE_PORTRAIT_IMG = '/src/assets/images/fantasy_mage_portrait_1792490945307.jpg';
export const WARRIOR_PORTRAIT_IMG = '/src/assets/images/fantasy_warrior_portrait_1792490944969.jpg';
export const ROGUE_PORTRAIT_IMG = '/src/assets/images/fantasy_rogue_portrait_1792490945446.jpg';

// Cartoon / Video Game Style Portraits
export const CARTOON_WARRIOR_IMG = '/src/assets/images/cartoon_game_warrior_1792491360419.jpg';
export const CARTOON_MAGE_IMG = '/src/assets/images/cartoon_game_mage_1792491360907.jpg';
export const CARTOON_ROGUE_IMG = '/src/assets/images/cartoon_game_rogue_1792491362311.jpg';
export const CARTOON_RANGER_IMG = '/src/assets/images/cartoon_game_ranger_1792491363082.jpg';
export const CARTOON_PALADIN_IMG = '/src/assets/images/cartoon_game_paladin_1792491362566.jpg';

export const CARTOON_PORTRAITS_BY_CLASS: Record<ClassType, string[]> = {
  Warrior: [CARTOON_WARRIOR_IMG, CARTOON_PALADIN_IMG],
  Mage: [CARTOON_MAGE_IMG],
  Rogue: [CARTOON_ROGUE_IMG, CARTOON_RANGER_IMG],
  Paladin: [CARTOON_PALADIN_IMG, CARTOON_WARRIOR_IMG],
  Ranger: [CARTOON_RANGER_IMG, CARTOON_ROGUE_IMG],
  Cleric: [CARTOON_PALADIN_IMG, CARTOON_MAGE_IMG],
  Druid: [CARTOON_RANGER_IMG, CARTOON_MAGE_IMG],
  Necromancer: [CARTOON_MAGE_IMG, CARTOON_ROGUE_IMG],
  Bard: [CARTOON_ROGUE_IMG, CARTOON_RANGER_IMG],
  Monk: [CARTOON_WARRIOR_IMG, CARTOON_ROGUE_IMG],
};

export const CLASS_DEFINITIONS: Record<ClassType, ClassDefinition> = {
  Warrior: {
    name: 'Warrior',
    role: 'Frontline Vanguard & Master of Arms',
    hitDie: 'd10',
    primaryStat: 'STR',
    description: 'Battlefield juggernaut tempered in martial discipline, unmatched in heavy armor mastery and weapon technique.',
    iconName: 'ShieldAlert',
    themeColor: '#d97706', // Amber gold
    defaultPortrait: WARRIOR_PORTRAIT_IMG,
    typicalWeapons: ['Sunforged Greatsword', 'Runed Bastard Sword', 'Dwarven War-Axe', 'Spiked Flail & Tower Shield'],
    abilities: [
      {
        name: 'Vanguard Cleave',
        type: 'Martial Maneuver',
        description: 'Channels unyielding momentum into a sweeping arc that shatters enemy battlements and staggers foes.',
        effect: '+4 bonus damage to adjacent hostiles, staggers light combatants.',
      },
      {
        name: 'Iron Bastion',
        type: 'Defensive Stance',
        description: 'Plants stance firmly into the earth, raising shield to absorb lethal kinetic strikes.',
        effect: 'Reduces all incoming physical damage by 35% for 2 rounds.',
      },
      {
        name: 'Battle Cry',
        type: 'Aura Command',
        description: 'Roars a thunderous battle command that inspires nearby allies and strikes fear into enemy hearts.',
        effect: 'Grants +2 to all party attack rolls and breaks fear effects.',
      },
    ],
  },
  Mage: {
    name: 'Mage',
    role: 'Arcane Scholar & Reality Weaver',
    hitDie: 'd6',
    primaryStat: 'INT',
    description: 'Master of ethereal formulas, ancient incantations, and elemental destruction drawn directly from planar rifts.',
    iconName: 'Sparkles',
    themeColor: '#38bdf8', // Arcane Sky Blue
    defaultPortrait: MAGE_PORTRAIT_IMG,
    typicalWeapons: ['Codex of the Astral Rift', 'Crystalline Stave', 'Orb of Perpetual Frost', 'Silver Rune Wand'],
    abilities: [
      {
        name: 'Astral Supernova',
        type: 'Evocation Spell',
        description: 'Condenses ambient leylines into a blinding vortex of astral fire that detonates on command.',
        effect: 'Deals 3d8 radiant fire damage across a 20-foot radius.',
      },
      {
        name: 'Chrono Ward',
        type: 'Abjuration Spell',
        description: 'Bends the flow of immediate time around the caster, turning fatal projectiles into harmless ash.',
        effect: 'Grants +5 Armor Class against the next two ranged spells or arrows.',
      },
      {
        name: 'Mind Delve',
        type: 'Divination Spell',
        description: 'Probes the thoughts of another sentient being to reveal hidden intents and weaknesses.',
        effect: 'Exposes target vulnerabilities and grants advantage on perception checks.',
      },
    ],
  },
  Rogue: {
    name: 'Rogue',
    role: 'Shadow Infiltrator & Precision Striker',
    hitDie: 'd8',
    primaryStat: 'DEX',
    description: 'Lethal shadow operative wielding concealment, precision daggers, acrobatics, and deadly anatomical knowledge.',
    iconName: 'Zap',
    themeColor: '#34d399', // Emerald Jade
    defaultPortrait: ROGUE_PORTRAIT_IMG,
    typicalWeapons: ['Night-Forged Twin Daggers', 'Recurve Shadow Bow', 'Weighted Throwing Needles', 'Serrated Rapier'],
    abilities: [
      {
        name: 'Shadowstep Flurry',
        type: 'Agility Technique',
        description: 'Vanishes into adjacent silhouettes and emerges behind the target with surgical steel.',
        effect: 'Guaranteed critical hit if attacking from concealment or flanking.',
      },
      {
        name: 'Smoke Veil',
        type: 'Deception Trap',
        description: 'Shatters an alchemical orb into an impenetrable cloud of noxious black smoke.',
        effect: 'Blinds targets within 15ft and allows instant disengage.',
      },
      {
        name: 'Vital Puncture',
        type: 'Precision Strike',
        description: 'Targets armor joints with deadly accuracy to inflict bleeding wounds.',
        effect: 'Inflicts 1d6 ongoing bleed damage for 3 turns.',
      },
    ],
  },
  Paladin: {
    name: 'Paladin',
    role: 'Holy Champion & Divine Ward',
    hitDie: 'd10',
    primaryStat: 'STR',
    description: 'Consecrated knight bound by inviolable holy oaths, radiating divine radiance and restorative auras.',
    iconName: 'Shield',
    themeColor: '#fbbf24', // Radiant Gold
    defaultPortrait: WARRIOR_PORTRAIT_IMG,
    typicalWeapons: ['Blessed Sun-Hammer', 'Gilded Morningstar', 'Heirloom Greatsword of Dawn', 'Silver Reliquary Shield'],
    abilities: [
      {
        name: 'Radiant Smite',
        type: 'Divine Channel',
        description: 'Infuses weapon strikes with blinding solar fire that sears corruption.',
        effect: '+2d8 extra radiant damage, doubles against undead and fiends.',
      },
      {
        name: 'Aura of Sanctity',
        type: 'Passive Ward',
        description: 'Radiates a soothing celestial warmth that repels curses and malevolent enchantments.',
        effect: 'Allies within 10ft gain +3 to all saving throws.',
      },
    ],
  },
  Ranger: {
    name: 'Ranger',
    role: 'Wilderness Tracker & Deadly Marksman',
    hitDie: 'd10',
    primaryStat: 'DEX',
    description: 'Peerless scout attuned to the deepest frontier forests, beast whispers, and lethal long-range marksmanship.',
    iconName: 'Compass',
    themeColor: '#4ade80', // Forest Green
    defaultPortrait: ROGUE_PORTRAIT_IMG,
    typicalWeapons: ['Yew Longbow of the Wilds', 'Composite Recurve Bow', 'Oakwood Dual Hatchets', 'Tracker Shortsword'],
    abilities: [
      {
        name: 'Pinpoint Volley',
        type: 'Marksmanship Technique',
        description: 'Looses three arrows in a single fluid breath, each guided by wind intuition.',
        effect: 'Fires three shots at target with increased range and armor-piercing.',
      },
      {
        name: 'Wilderness Camouflage',
        type: 'Survivalist Art',
        description: 'Blends into foliage and terrain so thoroughly as to become undetectable.',
        effect: 'Enemies cannot detect presence unless within 5 feet.',
      },
    ],
  },
  Cleric: {
    name: 'Cleric',
    role: 'Divine Conduit & Life Preserver',
    hitDie: 'd8',
    primaryStat: 'WIS',
    description: 'Devoted disciple wielding miracles of healing, celestial judgment, and guardian wards.',
    iconName: 'Sun',
    themeColor: '#f472b6', // Dawn Rose
    defaultPortrait: MAGE_PORTRAIT_IMG,
    typicalWeapons: ['Flanged War-Mace', 'Staff of Seraphic Light', 'Silver Aspergillum', 'Oak Buckler'],
    abilities: [
      {
        name: 'Breath of the Dawn',
        type: 'Restoration Miracle',
        description: 'Summons a warm golden rain that closes mortal wounds and restores vigor.',
        effect: 'Restores 3d8+4 health to up to three injured party members.',
      },
      {
        name: 'Guiding Bolt',
        type: 'Divine Retribution',
        description: 'Hurls a blinding streak of divine radiance toward an adversary.',
        effect: 'Deals 4d6 radiant damage and grants next ally attack advantage.',
      },
    ],
  },
  Druid: {
    name: 'Druid',
    role: 'Primal Shifter & Nature Warden',
    hitDie: 'd8',
    primaryStat: 'WIS',
    description: 'Keeper of ancient stone circles and untamed biomes, wielding shape-shifting and raw weather magic.',
    iconName: 'Feather',
    themeColor: '#a3e635', // Verdant Lime
    defaultPortrait: MAGE_PORTRAIT_IMG,
    typicalWeapons: ['Ironwood Quarterstaff', 'Yew Sickle', 'Amber Beast-Talisman', 'Thorn Shield'],
    abilities: [
      {
        name: 'Ursine Shift',
        type: 'Primal Metamorphosis',
        description: 'Transforms physical form into an enormous elder cave bear with razor claws.',
        effect: 'Doubles maximum hit points and unlocks crushing swipe attacks.',
      },
      {
        name: 'Tanglevine Grasp',
        type: 'Nature Evocation',
        description: 'Commands thorny briars to erupt from soil and ensnare adversaries.',
        effect: 'Roots all enemies in area for 2 turns and causes ongoing bleed.',
      },
    ],
  },
  Necromancer: {
    name: 'Necromancer',
    role: 'Deathbinder & Essence Harvester',
    hitDie: 'd6',
    primaryStat: 'INT',
    description: 'Occult scholar unraveling the threshold between vitality and decay, summoning spectral thralls.',
    iconName: 'Skull',
    themeColor: '#c084fc', // Nether Violet
    defaultPortrait: MAGE_PORTRAIT_IMG,
    typicalWeapons: ['Bone-Carved Scythe', 'Ossuary Wand', 'Soul-Cage Lantern', 'Grave Dust Athame'],
    abilities: [
      {
        name: 'Soul Siphon',
        type: 'Necrotic Tap',
        description: 'Draws the life essence from a wounded target to mend caster wounds.',
        effect: 'Deals 2d10 necrotic damage and heals caster for 50% of damage dealt.',
      },
      {
        name: 'Grave Thrall',
        type: 'Animation Ritual',
        description: 'Animates the bones of fallen warriors to fight under psychic command.',
        effect: 'Summons a skeletal guardian with 24 HP to tank enemy blows.',
      },
    ],
  },
  Bard: {
    name: 'Bard',
    role: 'Virtuoso Skald & Charm Weaver',
    hitDie: 'd8',
    primaryStat: 'CHA',
    description: 'Lyrical wanderer weaving ancient saga rhymes into sonic blasts, inspiration, and mind-bending enchantments.',
    iconName: 'Music',
    themeColor: '#fb7185', // Coral Lyric
    defaultPortrait: ROGUE_PORTRAIT_IMG,
    typicalWeapons: ['Silverstring Lute', 'Ornate Rapier', 'Dragon-Bone Panpipes', 'Bladed Buckler'],
    abilities: [
      {
        name: 'Symphony of Valor',
        type: 'Acoustic Hymn',
        description: 'Plucks a resonant ballad of ancient kings that stirs heroism in bloodlines.',
        effect: 'Grants all allies +1d8 inspiration die on next skill check or attack.',
      },
      {
        name: 'Dissonant Screech',
        type: 'Sonic Enthrallment',
        description: 'Releases a discord chord that ruptures ear vessels and disorients wits.',
        effect: 'Deals 3d6 psychic damage and forces target to retreat in panic.',
      },
    ],
  },
  Monk: {
    name: 'Monk',
    role: 'Ki Channeler & Martial Ascetic',
    hitDie: 'd8',
    primaryStat: 'DEX',
    description: 'Disciplined monastic channeling internal spiritual ki to execute superhuman strikes and deflect arrows.',
    iconName: 'Wind',
    themeColor: '#38bdf8', // Azure Gale
    defaultPortrait: WARRIOR_PORTRAIT_IMG,
    typicalWeapons: ['Temple Quarterstaff', 'Iron Banded Cestus', 'Wind-Drawn Nunchaku', 'Bare Palm Striking'],
    abilities: [
      {
        name: 'Flurry of Blows',
        type: 'Ki Channel',
        description: 'Unleashes a barrage of blindingly rapid unarmed palm strikes into nerve centers.',
        effect: 'Executes two bonus unarmed strikes and may knock target prone.',
      },
      {
        name: 'Deflect Missiles',
        type: 'Reaction Feat',
        description: 'Snatches incoming arrows or spears out of midair with bare palms.',
        effect: 'Reduces ranged physical attack damage to 0 and may fling projectile back.',
      },
    ],
  },
};

export const FIRST_NAMES: Record<string, string[]> = {
  noble: [
    'Theron', 'Alistair', 'Seraphina', 'Elowen', 'Cassian', 'Gawain', 'Roderick',
    'Genevieve', 'Valerius', 'Lucian', 'Cordelia', 'Bartholomew', 'Evangeline', 'Cedric'
  ],
  elven: [
    'Aeloria', 'Faelan', 'Sylas', 'Ilyana', 'Kaelen', 'Lirien', 'Naerith',
    'Thalor', 'Valen', 'Zephyr', 'Aeris', 'Morwen', 'Elidyr', 'Caelum'
  ],
  dwarven: [
    'Thorgar', 'Balgor', 'Brynna', 'Durnik', 'Garrick', 'Hilda', 'Kragmor',
    'Morgran', 'Ragnor', 'Thorin', 'Vondal', 'Dain', 'Orla', 'Brunhild'
  ],
  shadow: [
    'Nyx', 'Malakor', 'Vespera', 'Raven', 'Draven', 'Lilith', 'Moros',
    'Noctis', 'Sable', 'Vandor', 'Azrael', 'Morticia', 'Zephyra', 'Kage'
  ],
  draconic: [
    'Ignis', 'Pyroth', 'Krynn', 'Drakon', 'Zarek', 'Balerion', 'Vermithrax',
    'Ashara', 'Scaldor', 'Therok', 'Gorthor', 'Vaelin', 'Soryn'
  ],
  nomad: [
    'Kael', 'Jarek', 'Sariel', 'Talon', 'Orion', 'Boran', 'Mira',
    'Rhea', 'Kaelan', 'Torin', 'Zahara', 'Hadi', 'Ronan'
  ],
};

export const SURNAMES_AND_EPITHETS = [
  'Emberwhisper', 'Stonebreaker', 'Nightshade', 'Sunstrider', 'Frostborn',
  'Ironvein', 'Dawnseeker', 'Shadowwalker', 'Stormcaller', 'Wyrmslayer',
  'the Undaunted', 'the Spellbound', 'Ravencrest', 'Ashford', 'Blackwood',
  'Brightshield', 'Winterfall', 'Grimward', 'Bloodthorn', 'Silverleaf',
  'Gloomweaver', 'Oakenshield', 'Swiftstrike', 'Voidstrider', 'Highgate'
];

export const TITLES = [
  'Sentinel of the High Crags', 'Warden of the Shrouded Vale', 'Scion of the First Flame',
  'Blade of the Eclipse', 'Weaver of the Star-Web', 'Seeker of Forgotten Runes',
  'Champion of the Bronze Gate', 'Exile of the Silver Peaks', 'Guardian of the Deep Well',
  'Herald of the Stormfront', 'Harvester of the Black Sands', 'Shield of the Realm'
];

export const RACES: RaceType[] = [
  'Human',
  'High Elf',
  'Mountain Dwarf',
  'Shadow Tiefling',
  'Dragonborn',
  'Wood Elf',
  'Half-Orc',
  'Halfling',
];

export const ALIGNMENTS: AlignmentType[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
];

export const RACE_BONUSES: Record<RaceType, { stat: StatName; bonus: number; trait: string }> = {
  'Human': { stat: 'CON', bonus: 1, trait: 'Adaptable grit & unwavering determination' },
  'High Elf': { stat: 'INT', bonus: 2, trait: 'Centuries of arcane heritage & keen perception' },
  'Mountain Dwarf': { stat: 'CON', bonus: 2, trait: 'Stone-forged constitution & poison resistance' },
  'Shadow Tiefling': { stat: 'CHA', bonus: 2, trait: 'Hellfire legacy & captivating presence' },
  'Dragonborn': { stat: 'STR', bonus: 2, trait: 'Draconic breath weapon & scaled endurance' },
  'Wood Elf': { stat: 'DEX', bonus: 2, trait: 'Fleet-footed silence & wilderness camouflage' },
  'Half-Orc': { stat: 'STR', bonus: 2, trait: 'Relentless endurance & savage ferocity' },
  'Halfling': { stat: 'DEX', bonus: 2, trait: 'Incredible luck & uncanny nimbleness' },
};

export const BACKSTORIES = [
  'Born during a rare eclipse under an auspicious comet, they were marked from childhood by the temple elders as either savior or doom of the outer kingdoms. They now seek the truth behind their celestial birthmark across uncharted frontiers.',
  'Orphaned in the sacking of the Citadel of Thorns, they survived alone in the shadowed ruins by foraging and deciphering forbidden glyphs etched into cold marble. Their mastery over survival has made them both feared and revered by wandering sellswords.',
  'Former lieutenant in the High King\'s guard who broke oath when commanded to burn a rebellious farming valley; now they wander the frontiers seeking redemption. With every clash of steel, they strive to atone for sins committed under a corrupt crown.',
  'Apprenticed to an eccentric hermetic master who vanished into a spatial rift, leaving behind only an inscribed brass compass that always points toward danger. They follow its mystical needle across ancient borders, determined to rescue their forgotten mentor.',
  'Hailing from a proud deep-mountain clan known for smelting star-metal; ventured into the surface world to reclaim a stolen clan relic before the winter solstice. Armed with unbreakable resolve, they will let no sorcerer or warlord bar their passage.',
  'Grew up running rooftops and navigating cutthroat underworld guilds, until a mysterious employer betrayed them and left them for dead in the harbor tide. Now rising from the shadows, they dismantle their conspirators\' criminal empire piece by piece.',
  'An exile from the enchanted Silver Canopies who tasted forbidden mortal wines and wanders freely across mortal borders with boundless curiosity. Their wanderlust is matched only by their uncanny instinct for averting catastrophe.',
  'Sworn to protect a sealed ancient tomb hidden beneath the salt flats; when grave robbers opened the seal, they set forth to banish the horrors unleashed. Until every spectral abomination is returned to stone, their vigil will never end.',
];

export function generateUniqueOriginStory(character: Character): string {
  const name = character.name;
  const cls = character.class;
  const race = character.race;
  const weapon = character.equipment.weapon;

  const classStories: Record<ClassType, string[]> = {
    Warrior: [
      `Forged in the brutal iron trenches of the Ashen March, ${name} earned renown when they held a collapsing siege bridge single-handedly against a horde of fiends. Armed with their ${weapon}, they roam the outer marches defending the helpless and seeking a battle worthy of their oath.`,
      `Once the sworn shield-lieutenant to the High Warden of the Bronze Crags, ${name} cast down their imperial badge after refusing an unjust slaughter. Today, they wander the borderlands as a free sword, bound only by personal honor and unyielding iron discipline.`,
      `Orphaned during the winter siege of their mountain clan, ${name} spent years training in underground gladiatorial rings to master every brutal art of war. With every strike of their ${weapon}, they inch closer to confronting the warlord who destroyed their kin.`,
      `Born into a proud lineage of vanguard knights, ${name} inherited the discipline of ancestral steel and the scarred battle-courage of a seasoned veteran. Their battle-cry now echoes across the realm as a warning to tyrants and oathbreakers.`,
    ],
    Mage: [
      `While deciphering a forbidden astral codex deep in the sunken ruins of Aethelgard, ${name} accidentally fractured a minor planar seal and absorbed an ancient leyline spark. Now they wander the mortal realms, desperate to master their surging cosmic power before it consumes them.`,
      `Formerly the most promising prodigy in the Grand Spire of Oakhaven, ${name} was exiled when their temporal divination experiments exposed an impending royal coup. They now wander the realm with their ${weapon}, manipulating arcane currents to avert the catastrophe they foresaw.`,
      `Born under the alignment of twin celestial blood-moons, ${name} heard the murmurs of planar deities in every thunderclap since early youth. Their life is an endless quest to compile the ultimate grimoire of reality-altering formulas.`,
      `Apprenticed to an eccentric hermetic sage who vanished into an ethereal vortex, ${name} inherited an enigmatic brass alembic and an unquenchable thirst for arcane truth. Leylines bend naturally to their will wherever their path leads.`,
    ],
    Rogue: [
      `Raised in the sunless labyrinth of the Under-Market, ${name} mastered silent footsteps and razor reflexes long before discovering their true lineage. After stealing a ciphered ledger from the guildmaster's vault, they vanished into the mist and now live by stealth and cunning.`,
      `Once an elite royal scout who uncovered a venomous conspiracy within the high court, ${name} was framed for treason and forced into the shadows. Equipped with their ${weapon}, they strike from darkness to expose the corrupt councilors who stole their honor.`,
      `A legendary shadow operative whispered about in tavern ballads, ${name} has infiltrated impenetrable fortresses without ever leaving a trace in the snow. They seek one final, impossible relic before vanishing permanently into the frontier mist.`,
      `Trained in the secluded order of the Whispering Blade, ${name} severed ties when commanded to strike down an innocent royal scholar. Now hunted by their former brethren, they use every shadow as both fortress and lethal sanctuary.`,
    ],
    Paladin: [
      `Consecrated at the Sun-Altar of the Radiant Dawn, ${name} took an inviolable vow to carry celestial light into the most forsaken crypts of the realm. Even in the face of demonic corruption, their faith in divine justice burns brighter than any forge.`,
      `Saved from a plague-ridden battlefield by a blinding angelic apparition in their youth, ${name} surrendered their noble lands to take up the silver shield. Their sacred smite strikes fear into fiends and brings restorative warmth to the weary.`,
      `Bound by the ancient Oath of the Silver Chalice, ${name} spent a decade defending sacred pilgrim routes against ravenous mountain bandits. Now guided by celestial visions, they march toward ancient ruins to cleanse an awakening blight.`,
    ],
    Ranger: [
      `Raised by an elder warden deep within the primeval Whisperwood, ${name} speaks the dialects of wild beasts and tracks prey across bare granite ridges. Armed with their ${weapon}, they defend the untamed frontier from encroaching abominations.`,
      `The sole survivor of an expedition into the cursed Black Swamps, ${name} developed superhuman senses to navigate territories where no mortal map survives. The wilderness is their only true home, and the whistling wind their swiftest ally.`,
      `Born a nomadic hunter along the frozen tundra wastes, ${name} can read the trajectory of an oncoming storm hours before the first snowflake lands. They hunt predatory monstrosities that threaten vulnerable frontier settlements.`,
    ],
    Cleric: [
      `Called to the priesthood after restoring sight to a cursed elder with a single touch, ${name} travels foreign lands providing succor to outcasts and banishing malevolent spirits. Their faith is an unshakeable pillar that shields comrades from planar ruin.`,
      `Once an apothecary in a besieged border citadel, ${name} witnessed miraculous celestial interventions during the city's darkest hour and consecrated their life to the dawn. Their healing warmth closes fatal wounds that medicine alone cannot mend.`,
    ],
    Druid: [
      `Initiated into the ancient Ring of Standing Stones during a winter equinox blizzard, ${name} can shape-shift into apex predators and command root and briar. They walk mortal roads to restore balance between ravenous civilizations and the roaring spirits of nature.`,
      `Bound by spirit-blood to an ancient grove elder, ${name} hears the heartbeat of the forest in every subterranean root. When dark corruptions began poisoning the woodland springs, they set forth to purge the defilers.`,
    ],
    Necromancer: [
      `Having glimpsed beyond the veil of mortality during a near-fatal childhood sickness, ${name} views decay not as an enemy, but as the inevitable completion of vitality. They harness spectral souls to unlock secrets long buried beneath cemetery loam.`,
      `Exiled from the High Academies for conducting forbidden resurrection rituals on ancestral heroes, ${name} believes death is merely an unpicked lock. With dark focus, they study the threshold of souls to conquer mortality itself.`,
    ],
    Bard: [
      `Wandering minstrel whose ballads can move stone sentinels to tears or incite an entire city square to rebellion, ${name} travels from tavern to castle court chronicling epochal deeds. Behind their charming smile lies an encyclopedic memory of forgotten royal secrets.`,
      `Apprenticed to the legendary skalds of the Northern Fjords, ${name} weaves ancient saga rhymes into sonic vibrations that shatter armor and inspire heroism in allies. They seek the true lost song that originally breathed life into the cosmos.`,
    ],
    Monk: [
      `Enduring fifteen years of silent ascetic meditation on the frozen pinnacles of Mount Zephyr, ${name} unlocked the ability to channel spiritual ki into bone-cracking strikes. They journey downward into mortal squalor seeking spiritual enlightenment and defending the defenseless.`,
      `Trained in an ancient mountain monastery whose location shifts with the equinox, ${name} learned to deflect arrows with bare palms and run across water without leaving ripples. They walk the realm to temper their inner spirit against earthly temptations.`,
    ],
  };

  const pool = classStories[cls] || classStories.Warrior;
  return getRandomElement(pool);
}

export const QUOTES = [
  '"Honor is forged not in polished halls, but in the crucible of impossible choices."',
  '"The arcane leylines whisper secrets only those who dare step beyond fear can hear."',
  '"A silent blade asks no permission and leaves no tracks in the snow."',
  '"Where darkness gathers, my lantern will burn longest."',
  '"Steel speaks true when diplomacy crumbles to dust."',
  '"In the stillness between breaths, the future is written."',
  '"Trust the earth beneath your boots, but never sleep with your back to the pines."',
  '"Fate is merely a tapestry yet unpicked; hand me the shears."'
];

// Helper to roll 4d6 and drop lowest
export function roll4d6DropLowest(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3]; // sum top 3
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomName(): { name: string; title: string } {
  const nameCategories = Object.keys(FIRST_NAMES);
  const category = getRandomElement(nameCategories);
  const firstName = getRandomElement(FIRST_NAMES[category]);
  const surname = getRandomElement(SURNAMES_AND_EPITHETS);
  const title = getRandomElement(TITLES);
  
  const fullName = surname.startsWith('the ') ? `${firstName} ${surname}` : `${firstName} ${surname}`;
  return { name: fullName, title };
}

export function generateCharacterStats(
  primaryStat: StatName,
  race: RaceType
): Record<StatName, AbilityScore> {
  const statsList: StatName[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  
  // Roll 6 stats
  const rolls = statsList.map(() => roll4d6DropLowest());
  rolls.sort((a, b) => b - a); // descending

  const result: Partial<Record<StatName, AbilityScore>> = {};

  // Give highest roll to primary stat
  const highestRoll = rolls.shift()!;
  
  // Distribute rest
  const remainingStats = statsList.filter(s => s !== primaryStat);
  
  // Primary stat receives highest
  let primaryScore = highestRoll;
  if (RACE_BONUSES[race].stat === primaryStat) {
    primaryScore += RACE_BONUSES[race].bonus;
  }
  result[primaryStat] = {
    score: primaryScore,
    modifier: calculateModifier(primaryScore),
  };

  // Fill in other stats with remaining rolls
  remainingStats.forEach((stat, index) => {
    let score = rolls[index] || 10;
    if (RACE_BONUSES[race].stat === stat) {
      score += RACE_BONUSES[race].bonus;
    }
    result[stat] = {
      score,
      modifier: calculateModifier(score),
    };
  });

  return result as Record<StatName, AbilityScore>;
}

export function generateFullCharacter(
  existingCharacter?: Character | null,
  locks: GenerationLocks = { lockName: false, lockClass: false, lockRace: false, lockStats: false },
  forcedClass?: ClassType
): Character {
  const classKey: ClassType = locks.lockClass && existingCharacter
    ? existingCharacter.class
    : forcedClass || getRandomElement(Object.keys(CLASS_DEFINITIONS) as ClassType[]);

  const classDef = CLASS_DEFINITIONS[classKey];

  const race: RaceType = locks.lockRace && existingCharacter
    ? existingCharacter.race
    : getRandomElement(RACES);

  const { name, title } = (locks.lockName && existingCharacter)
    ? { name: existingCharacter.name, title: existingCharacter.title }
    : generateRandomName();

  const alignment: AlignmentType = existingCharacter && (locks.lockName || locks.lockClass)
    ? existingCharacter.alignment
    : getRandomElement(ALIGNMENTS);

  const stats = (locks.lockStats && existingCharacter)
    ? existingCharacter.stats
    : generateCharacterStats(classDef.primaryStat, race);

  const primaryAbility = getRandomElement(classDef.abilities);
  const weapon = getRandomElement(classDef.typicalWeapons);
  const armor = classDef.name === 'Warrior' || classDef.name === 'Paladin'
    ? 'Reinforced Plate with Crest Mail'
    : classDef.name === 'Rogue' || classDef.name === 'Ranger' || classDef.name === 'Monk'
    ? 'Supple Dragonscale Leather'
    : 'Embroidered Silk Astral Vestments';

  const relic = getRandomElement([
    'Amulet of the Eclipse Moon',
    'Signet Ring of the First Warden',
    'Inscribed Vial of Planar Quicksilver',
    'Carved Rune of Unyielding Resolve',
    'Compass of the Forgotten Leyline',
    'Talisman of Ancestral Fortitude'
  ]);

  const conMod = stats.CON.modifier;
  const dexMod = stats.DEX.modifier;
  
  // Base HP calculation: Base class hit die + Con modifier
  const hitDieValue = parseInt(classDef.hitDie.replace('d', ''), 10) || 8;
  const hitPoints = Math.max(hitDieValue + conMod + 4, 10);
  
  // AC calculation
  const armorClass = classDef.name === 'Warrior' || classDef.name === 'Paladin'
    ? 18 + Math.min(dexMod, 1)
    : 11 + dexMod + (classDef.name === 'Monk' ? Math.max(stats.WIS.modifier, 0) : 0);

  // Generate new Player Card stats: Health, Mana, Strength
  let health: number;
  let mana: number;
  let strength: number;

  if (locks.lockStats && existingCharacter) {
    health = existingCharacter.health;
    mana = existingCharacter.mana;
    strength = existingCharacter.strength;
  } else {
    // Randomized base values customized by archetype
    let h = 100 + Math.floor(Math.random() * 50); // 100 - 150
    let m = 60 + Math.floor(Math.random() * 50);  // 60 - 110
    let s = 70 + Math.floor(Math.random() * 45);  // 70 - 115

    if (classKey === 'Warrior' || classKey === 'Paladin') {
      h += 60 + Math.floor(Math.random() * 35);
      s += 50 + Math.floor(Math.random() * 35);
      m += Math.floor(Math.random() * 25);
    } else if (classKey === 'Mage' || classKey === 'Necromancer') {
      m += 95 + Math.floor(Math.random() * 45);
      h += 15 + Math.floor(Math.random() * 25);
      s += 20 + Math.floor(Math.random() * 30);
    } else if (classKey === 'Rogue' || classKey === 'Ranger') {
      s += 45 + Math.floor(Math.random() * 35);
      h += 35 + Math.floor(Math.random() * 25);
      m += 35 + Math.floor(Math.random() * 30);
    } else {
      h += 40 + Math.floor(Math.random() * 30);
      m += 65 + Math.floor(Math.random() * 35);
      s += 30 + Math.floor(Math.random() * 30);
    }

    health = h;
    mana = m;
    strength = s;
  }

  const cardRarities: ('Rare' | 'Epic' | 'Legendary')[] = ['Rare', 'Epic', 'Legendary'];
  const cardRarity = getRandomElement(cardRarities);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    title,
    class: classKey,
    race,
    alignment,
    level: 1,
    hitPoints,
    armorClass,
    health,
    mana,
    strength,
    cardRarity,
    stats,
    signatureAbility: primaryAbility,
    equipment: {
      weapon,
      armor,
      relic,
    },
    backstory: getRandomElement(BACKSTORIES),
    quote: getRandomElement(QUOTES),
    portraitUrl: classDef.defaultPortrait,
    createdAt: Date.now(),
    isFavorite: false,
  };
}
