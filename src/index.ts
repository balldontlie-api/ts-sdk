import { MLBClient } from "./mlb";
import { NBAClient } from "./nba";
import { NFLClient } from "./nfl";
import { ClientConfig } from "./types";

export * from "./types";

export class BalldontlieAPI {
  public readonly nba: NBAClient;
  public readonly nfl: NFLClient;
  public readonly mlb: MLBClient;

  constructor(config: ClientConfig) {
    this.nba = new NBAClient(config);
    this.nfl = new NFLClient(config);
    this.mlb = new MLBClient(config);
  }
}
