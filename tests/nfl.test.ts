import { BalldontlieAPI, APIError } from "../src";
import { expect } from "chai";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  throw new Error("BALLDONTLIE_API_KEY environment variable is required");
}

describe("NFL API", () => {
  let api: BalldontlieAPI;

  before(() => {
    api = new BalldontlieAPI({ apiKey: API_KEY });
  });

  describe("Teams", () => {
    it("should get all teams", async () => {
      const teams = await api.nfl.getTeams();
      expect(teams.data).to.be.an("array");
      expect(teams.data[0]).to.have.all.keys(
        "id",
        "conference",
        "division",
        "location",
        "name",
        "full_name",
        "abbreviation"
      );
    });

    it("should filter teams by conference", async () => {
      const teams = await api.nfl.getTeams({ conference: "AFC" });
      expect(teams.data).to.be.an("array");
      teams.data.forEach((team) => {
        expect(team.conference).to.equal("AFC");
      });
    });

    it("should get a single team", async () => {
      const teams = await api.nfl.getTeams();
      const teamId = teams.data[0].id;
      const team = await api.nfl.getTeam(teamId);
      expect(team.data).to.have.property("id", teamId);
    });
  });

  describe("Injuries", () => {
    it("should get injuries", async () => {
      const injuries = await api.nfl.getPlayerInjuries();
      expect(injuries.data).to.be.an("array");
    });
  });

  describe("Players", () => {
    it("should get players with pagination", async () => {
      const players = await api.nfl.getPlayers({ per_page: 5 });
      expect(players.data).to.be.an("array");
      expect(players.data).to.have.lengthOf(5);
    });

    it("should search players by name", async () => {
      const players = await api.nfl.getPlayers({ search: "lamar jackson" });
      expect(players.data).to.be.an("array");
      players.data.forEach((player) => {
        expect(player.first_name.toLowerCase()).to.include("lamar");
        expect(player.last_name.toLowerCase()).to.include("lamar");
      });
    });

    it("should get active players", async () => {
      const players = await api.nfl.getActivePlayers();
      expect(players.data).to.be.an("array");
    });
  });

  describe("Games", () => {
    it("should get games with filters", async () => {
      const games = await api.nfl.getGames({
        seasons: [2023],
        weeks: [1],
        per_page: 5,
      });
      expect(games.data).to.be.an("array");
      games.data.forEach((game) => {
        expect(game.season).to.equal(2023);
        expect(game.week).to.equal(1);
      });
    });

    it("should get a specific game", async () => {
      const games = await api.nfl.getGames();
      const gameId = games.data[0].id;
      const game = await api.nfl.getGame(gameId);
      expect(game.data).to.have.property("id", gameId);
    });
  });

  describe("Standings", () => {
    it("should get standings", async () => {
      const res = await api.nfl.getStandings({ season: 2023 });
      const standing = res.data[0];
      expect(standing.season).to.equal(2023);
    });
  });

  describe("Stats", () => {
    it("should get player stats", async () => {
      const stats = await api.nfl.getStats({
        seasons: [2023],
        per_page: 5,
      });
      expect(stats.data).to.be.an("array");
      expect(stats.data[0]).to.have.property("player");
    });

    it("should get season stats", async () => {
      const stats = await api.nfl.getSeasonStats({
        season: 2023,
      });
      expect(stats.data).to.be.an("array");
    });

    describe("Advanced Stats", () => {
      it("should get rushing stats", async () => {
        const stats = await api.nfl.getAdvancedRushingStats({
          season: 2023,
        });
        expect(stats.data).to.be.an("array");
      });

      it("should get passing stats", async () => {
        const stats = await api.nfl.getAdvancedPassingStats({
          season: 2023,
          week: 1,
        });
        expect(stats.data).to.be.an("array");
        expect(stats.data[0].week).to.equal(1);
        expect(stats.data[0].season).to.equal(2023);
        expect(stats.data[0].player).to.not.be.undefined;
      });

      it("should get receiving stats", async () => {
        const stats = await api.nfl.getAdvancedReceivingStats({
          season: 2023,
          week: 2,
        });
        expect(stats.data).to.be.an("array");
        const data = stats.data[0];
        expect(data.week).to.equal(2);
        expect(data.season).to.equal(2023);
        expect(data.player).to.not.be.undefined;
      });
    });
  });
});
