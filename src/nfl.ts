import { BaseClient } from "./client";
import type {
  ApiResponse,
  NFLTeam,
  NFLPlayer,
  NFLGame,
  NFLStats,
  NFLStandings,
  NFLAdvancedPassingStats,
  NFLAdvancedReceivingStats,
  NFLAdvancedRushingStats,
  NFLPlayerInjury,
  NFLSeasonStats,
} from "./types";

export class NFLClient extends BaseClient {
  async getTeams(params?: {
    division?: string;
    conference?: string;
  }): Promise<ApiResponse<NFLTeam[]>> {
    return this.request<ApiResponse<NFLTeam[]>>(`/nfl/v1/teams`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getTeam(id: number): Promise<ApiResponse<NFLTeam>> {
    return this.request<ApiResponse<NFLTeam>>(`/nfl/v1/teams/${id}`);
  }

  async getPlayer(id: number): Promise<ApiResponse<NFLPlayer>> {
    return this.request<ApiResponse<NFLPlayer>>(`/nfl/v1/players/${id}`);
  }

  async getPlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<NFLPlayer[]>> {
    return this.request<ApiResponse<NFLPlayer[]>>(`/nfl/v1/players`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getActivePlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<NFLPlayer[]>> {
    return this.request<ApiResponse<NFLPlayer[]>>(`/nfl/v1/players/active`, {
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
    weeks?: number[];
  }): Promise<ApiResponse<NFLGame[]>> {
    return this.request<ApiResponse<NFLGame[]>>(`/nfl/v1/games`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getGame(id: number): Promise<ApiResponse<NFLGame>> {
    return this.request<ApiResponse<NFLGame>>(`/nfl/v1/games/${id}`);
  }

  async getStats(params?: {
    cursor?: number;
    per_page?: number;
    player_ids?: number[];
    game_ids?: number[];
    seasons?: number[];
  }): Promise<ApiResponse<NFLStats[]>> {
    return this.request<ApiResponse<NFLStats[]>>(`/nfl/v1/stats`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<NFLStandings[]>> {
    return this.request<ApiResponse<NFLStandings[]>>(`/nfl/v1/standings`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<NFLPlayerInjury[]>> {
    return this.request<ApiResponse<NFLPlayerInjury[]>>(
      `/nfl/v1/player_injuries`,
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
  }): Promise<ApiResponse<NFLSeasonStats[]>> {
    return this.request<ApiResponse<NFLSeasonStats[]>>(`/nfl/v1/season_stats`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getAdvancedRushingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedRushingStats[]>> {
    return this.request<ApiResponse<NFLAdvancedRushingStats[]>>(
      `/nfl/v1/advanced_stats/rushing`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getAdvancedPassingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedPassingStats[]>> {
    return this.request<ApiResponse<NFLAdvancedPassingStats[]>>(
      `/nfl/v1/advanced_stats/passing`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getAdvancedReceivingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedReceivingStats[]>> {
    return this.request<ApiResponse<NFLAdvancedReceivingStats[]>>(
      `/nfl/v1/advanced_stats/receiving`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }
}
