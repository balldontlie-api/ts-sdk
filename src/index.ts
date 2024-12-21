import { EPLClient } from "./epl";
import { MLBClient } from "./mlb";
import { NBAClient } from "./nba";
import { NFLClient } from "./nfl";
import { ClientConfig } from "./types";

export * from "./types";

export class BalldontlieAPI {
  public readonly nba: NBAClient;
  public readonly nfl: NFLClient;
  public readonly mlb: MLBClient;
  public readonly epl: EPLClient;

  constructor(config: ClientConfig) {
    this.nba = new NBAClient(config);
    this.nfl = new NFLClient(config);
    this.mlb = new MLBClient(config);
    this.epl = new EPLClient(config);
  }
}
