import { BaseClient } from "./client";
import type {
  ApiResponse,
  MLBTeam,
  MLBPlayer,
  MLBGame,
  MLBStats,
  MLBStandings,
  MLBSeasonStats,
  MLBTeamSeasonStats,
  MLBPlayerInjury,
} from "./types";

export class MLBClient extends BaseClient {
  async getTeams(params?: {
    division?: string;
    league?: string;
  }): Promise<ApiResponse<MLBTeam[]>> {
    return this.request<ApiResponse<MLBTeam[]>>(`/mlb/v1/teams`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getTeam(id: number): Promise<ApiResponse<MLBTeam>> {
    return this.request<ApiResponse<MLBTeam>>(`/mlb/v1/teams/${id}`);
  }

  async getPlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<MLBPlayer[]>> {
    return this.request<ApiResponse<MLBPlayer[]>>(`/mlb/v1/players`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getPlayer(id: number): Promise<ApiResponse<MLBPlayer>> {
    return this.request<ApiResponse<MLBPlayer>>(`/mlb/v1/players/${id}`);
  }

  async getActivePlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<MLBPlayer[]>> {
    return this.request<ApiResponse<MLBPlayer[]>>(`/mlb/v1/players/active`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getGames(params?: {
    cursor?: number;
    per_page?: number;
    dates?: string[];
    team_ids?: number[];
    seasons?: number[];
    postseason?: boolean;
  }): Promise<ApiResponse<MLBGame[]>> {
    return this.request<ApiResponse<MLBGame[]>>(`/mlb/v1/games`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getGame(id: number): Promise<ApiResponse<MLBGame>> {
    return this.request<ApiResponse<MLBGame>>(`/mlb/v1/games/${id}`);
  }

  async getStats(params?: {
    cursor?: number;
    per_page?: number;
    player_ids?: number[];
    game_ids?: number[];
    seasons?: number[];
  }): Promise<ApiResponse<MLBStats[]>> {
    return this.request<ApiResponse<MLBStats[]>>(`/mlb/v1/stats`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<MLBStandings[]>> {
    return this.request<ApiResponse<MLBStandings[]>>(`/mlb/v1/standings`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<MLBPlayerInjury[]>> {
    return this.request<ApiResponse<MLBPlayerInjury[]>>(
      `/mlb/v1/player_injuries`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getSeasonStats(params: {
    season: number;
    player_ids?: number[];
    team_id?: number;
    postseason?: boolean;
    sort_by?: string;
    sort_order?: "asc" | "desc";
  }): Promise<ApiResponse<MLBSeasonStats[]>> {
    return this.request<ApiResponse<MLBSeasonStats[]>>(`/mlb/v1/season_stats`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getTeamSeasonStats(params: {
    season: number;
    team_id?: number;
    postseason?: boolean;
  }): Promise<ApiResponse<MLBTeamSeasonStats[]>> {
    return this.request<ApiResponse<MLBTeamSeasonStats[]>>(
      `/mlb/v1/teams/season_stats`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }
}
