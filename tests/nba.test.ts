import { BalldontlieAPI, APIError } from "../src";
import { expect } from "chai";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  throw new Error("BALLDONTLIE_API_KEY environment variable is required");
}

describe("NBA API", () => {
  let api: BalldontlieAPI;

  before(() => {
    api = new BalldontlieAPI({ apiKey: API_KEY });
  });

  describe("Teams", () => {
    it("should get all teams", async () => {
      const teams = await api.nba.getTeams();
      expect(teams.data).to.be.an("array");
      expect(teams.data[0]).to.have.all.keys(
        "id",
        "conference",
        "division",
        "city",
        "name",
        "full_name",
        "abbreviation"
      );
    });

    it("should get teams filtered by conference", async () => {
      const teams = await api.nba.getTeams({ conference: "East" });
      expect(teams.data).to.be.an("array");
      teams.data.forEach((team) => {
        expect(team.conference).to.equal("East");
      });
    });

    it("should get a single team", async () => {
      const team = await api.nba.getTeam(1);
      expect(team.data).to.have.property("id", 1);
    });
  });

  describe("Players", () => {
    it("should get players with pagination", async () => {
      const players = await api.nba.getPlayers({ per_page: 5 });
      expect(players.data).to.be.an("array");
      expect(players.data).to.have.lengthOf(5);
      expect(players.meta?.per_page).to.equal(5);
    });

    it("should search players by name", async () => {
      const players = await api.nba.getPlayers({ search: "lebron" });
      expect(players.data).to.be.an("array");
      players.data.forEach((player) => {
        expect(player.first_name.toLowerCase()).to.include("lebron");
      });
    });

    it("should get active players", async () => {
      const players = await api.nba.getActivePlayers();
      expect(players.data).to.be.an("array");
    });
  });

  describe("Games", () => {
    it("should get games with filters", async () => {
      const games = await api.nba.getGames({
        seasons: [2023],
        team_ids: [1],
        per_page: 5,
      });
      expect(games.data).to.be.an("array");
      games.data.forEach((game) => {
        expect(game.season).to.equal(2023);
      });
    });

    it("should get a specific game", async () => {
      const games = await api.nba.getGames();
      const gameId = games.data[0].id;
      const game = await api.nba.getGame(gameId);
      expect(game.data).to.have.property("id", gameId);
    });

    it("should get live box scores", async () => {
      const boxScores = await api.nba.getLiveBoxScores();
      expect(boxScores.data).to.be.an("array");
    });
  });

  describe("Stats", () => {
    it.only("should get player stats", async () => {
      const stats = await api.nba.getStats({
        per_page: 1,
      });
      expect(stats.data).to.be.an("array");
      stats.data.forEach((stat) => {
        expect(stat).to.have.property("pts");
        expect(stat).to.have.property("ast");
        expect(stat).to.have.property("reb");
      });
    });

    it("should get season averages", async () => {
      const players = await api.nba.getPlayers();
      const playerId = players.data[0].id;
      const stats = await api.nba.getSeasonAverages({
        season: 2023,
        player_id: playerId,
      });
      expect(stats.data).to.be.an("array");
    });

    it("should get advanced stats", async () => {
      const stats = await api.nba.getAdvancedStats({
        seasons: [2023],
        per_page: 5,
      });
      expect(stats.data).to.be.an("array");
    });
  });

  describe("Error Handling", () => {
    it("should handle 404 errors", async () => {
      try {
        await api.nba.getTeam(999999);
        expect.fail("Should have thrown error");
      } catch (e) {
        expect(e).to.be.instanceOf(APIError);
        expect((e as any).status).to.equal(404);
      }
    });
  });
});
