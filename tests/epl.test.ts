import { BalldontlieAPI } from "../src";
import { expect } from "chai";

const API_KEY = process.env.BALLDONTLIE_API_KEY;

if (!API_KEY) {
  throw new Error("BALLDONTLIE_API_KEY environment variable is required");
}

describe("EPL API", () => {
  let api: BalldontlieAPI;

  before(() => {
    api = new BalldontlieAPI({ apiKey: API_KEY });
  });

  describe("Games", () => {
    it("should get games with pagination and filters", async () => {
      const games = await api.epl.getGames({
        per_page: 5,
        season: 2023,
        week: 1,
      });
      expect(games.data).to.be.an("array");
      expect(games.data).to.have.lengthOf(5);
      games.data.forEach((game) => {
        expect(game.season).to.equal(2023);
        expect(game.week).to.equal(1);
      });

      expect(games.meta?.next_cursor).to.be.a("number");
    });

    it("should get game lineups", async () => {
      const games = await api.epl.getGames({
        per_page: 1,
        season: 2024,
        week: 1,
      });
      const gameId = games.data[0].id;
      const lineups = await api.epl.getGameLineups(gameId);
      expect(lineups.data).to.be.an("array");
      lineups.data.forEach((lineup) => {
        expect(lineup.team_id).to.be.a("number");
        expect(lineup.player).to.have.property("id");
        expect(lineup.substitute).to.be.a("boolean");
        expect(lineup.captain).to.be.a("boolean");
      });
    });

    it("should get game goals", async () => {
      const games = await api.epl.getGames({
        per_page: 1,
        week: 1,
        season: 2024,
      });
      const gameId = games.data[0].id;
      const goals = await api.epl.getGameGoals(gameId);
      expect(goals.data).to.be.an("array");
      goals.data.forEach((goal) => {
        expect(goal.game_id).to.equal(gameId);
        expect(goal.scorer).to.have.property("id");
        expect(goal.clock).to.be.a("number");
      });
    });

    it("should get game team stats", async () => {
      const games = await api.epl.getGames({
        per_page: 1,
        week: 1,
        season: 2024,
      });
      const gameId = games.data[0].id;
      const stats = await api.epl.getGameTeamStats(gameId);
      expect(stats.data.game_id).to.equal(gameId);
      expect(stats.data.teams).to.be.an("array");
      stats.data.teams.forEach((team) => {
        expect(team.team_id).to.be.a("number");
        expect(team.stats).to.be.an("array");
      });
    });

    it("should get game player stats", async () => {
      const games = await api.epl.getGames({
        per_page: 1,
        week: 1,
        season: 2024,
      });
      const gameId = games.data[0].id;
      const stats = await api.epl.getGamePlayerStats(gameId);
      expect(stats.data.game_id).to.equal(gameId);
      expect(stats.data.players).to.be.an("array");
      stats.data.players.forEach((player) => {
        expect(player.team_id).to.be.a("number");
        expect(player.player_id).to.be.a("number");
        expect(player.stats).to.be.an("array");

        const stat = player.stats[0];
        expect(stat.name).to.be.a("string");
        expect(stat.value).to.be.a("number");
      });
    });
  });

  describe("Players", () => {
    it("should get players with pagination and filters", async () => {
      const players = await api.epl.getPlayers({
        per_page: 5,
        season: 2023,
        first_name: "Heung-Min",
      });
      expect(players.data).to.be.an("array");
      expect(players.data).to.have.lengthOf(1);
    });

    it("should get player season stats", async () => {
      const id = 295;
      const stats = await api.epl.getPlayerSeasonStats(id, { season: 2024 });
      expect(stats.data).to.be.an("array");

      const stat = stats.data[0];
      expect(stat.name).to.be.a("string");
      expect(stat.value).to.be.a("number");
    });
  });

  describe("Leaders", () => {
    describe("players", () => {
      it("should get player stats leaders", async () => {
        const leaders = await api.epl.getPlayerStatsLeaders({
          season: 2023,
          type: "goals",
          per_page: 5,
        });
        expect(leaders.data).to.be.an("array");
        expect(leaders.data).to.have.lengthOf(5);
        expect(leaders.data[0].rank).to.be.lessThan(leaders.data[1].rank);

        leaders.data.forEach((leader) => {
          expect(leader.season).to.equal(2023);
          expect(leader.name).to.equal("goals");
          expect(leader.value).to.be.a("number");
          expect(leader.rank).to.be.a("number");
          expect(leader.player).to.have.property("id");
        });
      });
    });

    describe("teams", () => {
      it("should get team stats leaders", async () => {
        const leaders = await api.epl.getTeamStatsLeaders({
          season: 2023,
          type: "goals",
          per_page: 5,
        });
        expect(leaders.data).to.be.an("array");
        expect(leaders.data).to.have.lengthOf(5);
        expect(leaders.data[0].rank).to.be.lessThan(leaders.data[1].rank);

        leaders.data.forEach((leader) => {
          expect(leader.season).to.equal(2023);
          expect(leader.name).to.equal("goals");
          expect(leader.value).to.be.a("number");
          expect(leader.rank).to.be.a("number");
          expect(leader.team).to.have.property("id");
        });
      });
    });
  });

  describe("Standings", () => {
    it("should get standings", async () => {
      const standings = await api.epl.getStandings({ season: 2023 });
      expect(standings.data).to.be.an("array");
      standings.data.forEach((standing) => {
        expect(standing.season).to.equal(2023);
        expect(standing.team).to.have.property("id");
        expect(standing.position).to.be.a("number");
        expect(standing.overall_points).to.be.a("number");
        expect(standing.overall_played).to.be.a("number");
        expect(standing.overall_won).to.be.a("number");
        expect(standing.overall_lost).to.be.a("number");
        expect(standing.overall_drawn).to.be.a("number");
        expect(standing.home_points).to.be.a("number");
        expect(standing.away_points).to.be.a("number");
      });
    });
  });

  describe("Teams", () => {
    it("should get teams", async () => {
      const teams = await api.epl.getTeams({ season: 2023 });
      expect(teams.data).to.be.an("array");
      teams.data.forEach((team) => {
        expect(team).to.have.all.keys(
          "id",
          "name",
          "short_name",
          "abbr",
          "city",
          "stadium"
        );
      });
    });

    it("should get team players", async () => {
      const teams = await api.epl.getTeams({ season: 2023 });
      const teamId = teams.data[0].id;
      const players = await api.epl.getTeamPlayers(teamId, { season: 2023 });
      expect(players.data).to.be.an("array");
      players.data.forEach((player) => {
        expect(player.id).to.be.a("number");
      });
    });

    it("should get team season stats", async () => {
      const teams = await api.epl.getTeams({ season: 2023 });
      const teamId = teams.data[0].id;
      const stats = await api.epl.getTeamSeasonStats(teamId, { season: 2023 });
      expect(stats.data).to.be.an("array");
      stats.data.forEach((stat) => {
        expect(stat.season).to.equal(2023);
        expect(stat.value).to.be.a("number");
        expect(stat.rank).to.be.a("number");
      });
    });
  });
});
