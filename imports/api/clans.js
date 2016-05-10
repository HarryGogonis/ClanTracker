import { Mongo } from 'meteor/mongo';

export const Clans = new Mongo.Collection('clans');

export const MIN_WORLD = 301;
export const MAX_WORLD = 394;
