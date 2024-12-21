import { BaseClient } from "./client";
import type {
  ApiResponse,
  EPLTeam,
  EPLPlayer,
  EPLGame,
  EPLGameLineup,
  EPLGameGoal,
  EPLGameTeamStats,
  EPLGamePlayerStats,
  EPLStanding,
  EPLPlayerStatLeaders,
  EPLTeamStatLeaders,
  EPLPlayerSeasonStat,
  EPLTeamSeasonStat,
  EPLPlayerStatType,
  EPLTeamStatType,
} from "./types";

export class EPLClient extends BaseClient {
  async getGames(params?: {
    cursor?: number;
    per_page?: number;
    season?: number;
    team_id?: number;
    week?: number;
  }): Promise<ApiResponse<EPLGame[]>> {
    return this.request<ApiResponse<EPLGame[]>>("/epl/v1/games", {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getGameLineups(id: number): Promise<ApiResponse<EPLGameLineup[]>> {
    return this.request<ApiResponse<EPLGameLineup[]>>(
      `/epl/v1/games/${id}/lineups`
    );
  }

  async getGameGoals(id: number): Promise<ApiResponse<EPLGameGoal[]>> {
    return this.request<ApiResponse<EPLGameGoal[]>>(
      `/epl/v1/games/${id}/goals`
    );
  }

  async getGameTeamStats(id: number): Promise<ApiResponse<EPLGameTeamStats>> {
    return this.request<ApiResponse<EPLGameTeamStats>>(
      `/epl/v1/games/${id}/team_stats`
    );
  }

  async getGamePlayerStats(
    id: number
  ): Promise<ApiResponse<EPLGamePlayerStats>> {
    return this.request<ApiResponse<EPLGamePlayerStats>>(
      `/epl/v1/games/${id}/player_stats`
    );
  }

  async getPlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    season: number;
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<EPLPlayer[]>> {
    return this.request<ApiResponse<EPLPlayer[]>>("/epl/v1/players", {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getPlayerSeasonStats(
    id: number,
    params: {
      season: number;
    }
  ): Promise<ApiResponse<EPLPlayerSeasonStat[]>> {
    return this.request<ApiResponse<EPLPlayerSeasonStat[]>>(
      `/epl/v1/players/${id}/season_stats`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getPlayerStatsLeaders(params: {
    cursor?: number;
    per_page?: number;
    season: number;
    type: EPLPlayerStatType;
  }): Promise<ApiResponse<EPLPlayerStatLeaders[]>> {
    return this.request<ApiResponse<EPLPlayerStatLeaders[]>>(
      "/epl/v1/player_stats/leaders",
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getTeamStatsLeaders(params: {
    cursor?: number;
    per_page?: number;
    season: number;
    type: EPLTeamStatType;
  }): Promise<ApiResponse<EPLTeamStatLeaders[]>> {
    return this.request<ApiResponse<EPLTeamStatLeaders[]>>(
      "/epl/v1/team_stats/leaders",
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<EPLStanding[]>> {
    return this.request<ApiResponse<EPLStanding[]>>("/epl/v1/standings", {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getTeams(params: { season: number }): Promise<ApiResponse<EPLTeam[]>> {
    return this.request<ApiResponse<EPLTeam[]>>("/epl/v1/teams", {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getTeamPlayers(
    id: number,
    params: {
      season: number;
    }
  ): Promise<ApiResponse<EPLPlayer[]>> {
    return this.request<ApiResponse<EPLPlayer[]>>(
      `/epl/v1/teams/${id}/players`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getTeamSeasonStats(
    id: number,
    params: {
      season: number;
    }
  ): Promise<ApiResponse<EPLTeamSeasonStat[]>> {
    return this.request<ApiResponse<EPLTeamSeasonStat[]>>(
      `/epl/v1/teams/${id}/season_stats`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }
}
