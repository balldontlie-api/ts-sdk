import { BalldontlieAPI, APIError } from "../src";
import { expect } from "chai";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  throw new Error("BALLDONTLIE_API_KEY environment variable is required");
}

describe("MLB API", () => {
  let api: BalldontlieAPI;

  before(() => {
    api = new BalldontlieAPI({ apiKey: API_KEY });
  });

  describe("Teams", () => {
    it("should get all teams", async () => {
      const teams = await api.mlb.getTeams();
      expect(teams.data).to.be.an("array");
      expect(teams.data[0]).to.have.all.keys(
        "id",
        "slug",
        "abbreviation",
        "display_name",
        "short_display_name",
        "name",
        "location",
        "league",
        "division"
      );
    });

    it("should filter teams by league", async () => {
      const teams = await api.mlb.getTeams({ league: "American" });
      expect(teams.data).to.be.an("array");
      teams.data.forEach((team) => {
        expect(team.league).to.equal("American");
      });
    });

    it("should get a single team", async () => {
      const teams = await api.mlb.getTeams();
      const teamId = teams.data[0].id;
      const team = await api.mlb.getTeam(teamId);
      expect(team.data).to.have.property("id", teamId);
    });
  });

  describe("Players", () => {
    it("should get players with pagination", async () => {
      const players = await api.mlb.getPlayers({ per_page: 5 });
      expect(players.data).to.be.an("array");
      expect(players.data).to.have.lengthOf(5);
    });

    it("should search players by name", async () => {
      const players = await api.mlb.getPlayers({ search: "Trout" });
      expect(players.data).to.be.an("array");
      players.data.forEach((player) => {
        expect(player.last_name.toLowerCase()).to.include("trout");
      });
    });

    it("should get active players", async () => {
      const players = await api.mlb.getActivePlayers();
      expect(players.data).to.be.an("array");
    });
  });

  describe("Games", () => {
    it("should get games with filters", async () => {
      const games = await api.mlb.getGames({
        seasons: [2023],
        per_page: 5,
      });
      expect(games.data).to.be.an("array");
      games.data.forEach((game) => {
        expect(game.season).to.equal(2023);
      });
    });

    it("should get a specific game", async () => {
      const games = await api.mlb.getGames();
      const gameId = games.data[0].id;
      const game = await api.mlb.getGame(gameId);
      expect(game.data).to.have.property("id", gameId);
    });
  });

  describe("Stats", () => {
    it("should get player stats", async () => {
      const stats = await api.mlb.getStats({
        per_page: 1,
      });
      expect(stats.data).to.be.an("array");
      expect(stats.data[0]).to.have.property("player");
    });

    it("should get season stats", async () => {
      const stats = await api.mlb.getSeasonStats({
        season: 2023,
      });
      expect(stats.data).to.be.an("array");
    });

    it("should get team season stats", async () => {
      const teams = await api.mlb.getTeams();
      const teamId = teams.data[0].id;
      const stats = await api.mlb.getTeamSeasonStats({
        season: 2023,
        team_id: teamId,
      });
      expect(stats.data).to.be.an("array");
    });
  });
});
