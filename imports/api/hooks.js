import { Players, combatCalculator } from './players.js';
import { osrs } from 'runescape-api';
import { Meteor } from 'meteor/meteor';

const getPlayerSkills = (name, callback) => osrs.hiscores.player(name).then((res) => {
  if (res) return callback(null, res.skills);
  return callback(null);
});

const updatePlayerSkills = (id, skills) => {
  const combat = combatCalculator(skills);
  const mods = { $set: { skills, combat } };
  Players.update(id, mods, (error, result) => {
    if (error) console.error(error);
  });
};

export const updatePlayer = (id) => {
  const doc = Players.findOne(id);

  const skills = Meteor.wrapAsync(getPlayerSkills)(doc.name);
  updatePlayerSkills(id, skills);
};

