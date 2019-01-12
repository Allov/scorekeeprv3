import { IPlayer } from 'infrastructure/players/player.types';
import { IUser } from 'infrastructure/users/user.types';
import sillyname from 'sillyname';
import {User as UserRepository } from '../users/user.model';
import { Game } from './game.model';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export async function createdBy(game: IGame) {
  return await UserRepository.findById(game.createdBy);
}

export async function players(game: IGame) {
  return game.players.filter((player: IPlayer) => !player.archived);
}

export async function createGame(_: any, { input }: { input: IGameInput }) {
  let user : IUser;
  if(input.userId){
    user = await UserRepository.findById(input.userId);
  } else {
    user = await UserRepository.create({username: `${sillyname()}`.replace(/ /g, '-')});
  }

  input.createdAt = Date.now();
  input.shareId = `${sillyname()}${sillyname()}`.replace(/ /g, '-').toLowerCase();
  input.createdBy = user.id;
  input.rounds = [];
  const game = await Game.create(input);
  user.games = [game.id];
  user = await UserRepository.findByIdAndUpdate(user.id, user);
  return game;
}

export async function deleteGame(_: any, { id }: { id: any }) {
  return await Game.findByIdAndRemove(id);
}

export async function editGame(_: any, { id, input }: { id: any, input: IGameInput }) {
  return await Game.findByIdAndUpdate(id, input);
}

export async function gamebyId(_: any, { id }: { id: any }) {
  return await Game.findById(id);
}

export async function gameByShareId(_: any, { shareId }: { shareId: string }) {
  return await Game.findOne({ shareId });
}

export async function games(_: any, { filter }: { filter: IGameFilterInput }) {
  return await Game.find({}, null, filter);
}

export const gameResolvers = {
  Game: {
    createdBy,
    players,
  },
  Mutation: {
    createGame,
    deleteGame,
    editGame,
  },
  Query: {
    game: gamebyId,
    gameByShareId,
    games,
  },
};
