import { PubSub } from "graphql-subscriptions";

export enum Events {
  GameUpdated = "GameUpdated",
}

const pubSub = new PubSub();

export default pubSub;
