import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Clans } from './api/clans.js';
import { Players } from './api/players.js';
import { Meteor } from 'meteor/meteor';
import { updatePlayer } from './api/hooks.js';

// TODO Turn off during production
SimpleSchema.debug = true;

const Schemas = {};

const Overall = new SimpleSchema({
  rank: {
    type: Number,
    min: -1,
    defaultValue: Number.MAX_SAFE_INTEGER,
    optional: true,
  },
  level: {
    type: Number,
    min: -1,
    max: 2277,
    defaultValue: 1,
    optional: true,
  },
  exp: {
    type: Number,
    min: -1,
    defaultValue: 0,
    optional: true,
  },
});

const Skill = new SimpleSchema({
  rank: {
    type: Number,
    min: -1,
    defaultValue: Number.MAX_SAFE_INTEGER,
    optional: true,
  },
  level: {
    type: Number,
    min: -1,
    max: 99,
    defaultValue: 1,
    optional: true,
  },
  exp: {
    type: Number,
    min: -1,
    defaultValue: 0,
    optional: true,
  },
});

const HighScore = new SimpleSchema({
  overall: {
    type: Overall,
  },
  attack: {
    type: Skill,
  },
  strength: {
    type: Skill,
  },
  defence: {
    type: Skill,
  },
  hitpoints: {
    type: Skill,
  },
  ranged: {
    type: Skill,
  },
  prayer: {
    type: Skill,
  },
  magic: {
    type: Skill,
  },
  cooking: {
    type: Skill,
  },
  woodcutting: {
    type: Skill,
  },
  fletching: {
    type: Skill,
  },
  fishing: {
    type: Skill,
  },
  firemaking: {
    type: Skill,
  },
  crafting: {
    type: Skill,
  },
  smithing: {
    type: Skill,
  },
  mining: {
    type: Skill,
  },
  herblore: {
    type: Skill,
  },
  agility: {
    type: Skill,
  },
  thieving: {
    type: Skill,
  },
  slayer: {
    type: Skill,
  },
  farming: {
    type: Skill,
  },
  runecrafting: {
    type: Skill,
  },
  hunter: {
    type: Skill,
  },
  construction: {
    type: Skill,
  },
});

Schemas.Clan = new SimpleSchema({
  name: {
    type: String,
    max: 32,
    unique: true,
  },
  tag: {
    type: String,
    max: 6,
  },
  description: {
    type: String,
    optional: true,
  },
  active: {
    type: Boolean,
    defaultValue: true,
    optional: true,
  },
  homeworld: {
    type: Number,
    optional: true,
  },
  chatname: {
    type: String,
    max: 12,
  },
  timezone: {
    type: Number,
    optional: true,
  },
  website: {
    type: String,
    max: 2083,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  lastUpdated: {
    type: Date,
    defaultValue: new Date(),
    max: new Date(),
    optional: true,
  },
});

export const PlayerSchema = {
  name: {
    type: String,
    max: 12,
    unique: true,
  },
  combat: {
    type: Number,
    max: 126,
    min: 1,
    defaultValue: 1,
    optional: true,
  },
  skills: {
    type: HighScore,
    optional: true,
  },
  clans: {
    type: [String],
    //regex: SimpleSchema.RegEx.Id,
    defaultValue: [],
    optional: true,
  },
  clanRole: {
    type: String,
    defaultValue: 'Member',
    optional: true,
  },
  lastUpdated: {
    type: Date,
    autoValue: () => new Date(),
    //max: new Date(),
  },
};

Schemas.Player = PlayerSchema;

Clans.attachSchema(Schemas.Clan);
Players.attachSchema(Schemas.Player);

Meteor.methods({
  'clans.update'(id) {
    const players = Players.find({ clans: id });
    players.map((player) => updatePlayer(player._id));
  },
  'players.update'(id) {
    updatePlayer(id);
  },
});
