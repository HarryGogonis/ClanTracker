import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');

export const combatCalculator = (skills) => {
  console.log(skills);
  const base = 0.25 * (skills.defence.level +
    skills.hitpoints.level +
    Math.floor(skills.prayer.level / 2));
  const melee = 0.325 * (skills.attack.level + skills.strength.level);
  const ranged = 0.325 * (Math.floor(skills.ranged.level / 2)
    + skills.ranged.level);
  const magic = 0.325 * (Math.floor(skills.magic.level / 2)
    + skills.magic.level);
  console.log(base, melee, ranged, magic);
  return Math.floor(base + Math.max(melee, ranged, magic));
};
