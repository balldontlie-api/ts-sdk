import {
  BaseClient,
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
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request<ApiResponse<NFLTeam[]>>(`/nfl/v1/teams?${queryParams}`);
  }

  async getTeam(id: number): Promise<ApiResponse<NFLTeam>> {
    return this.request<ApiResponse<NFLTeam>>(`/nfl/v1/teams/${id}`);
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
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}[]`, v.toString()));
        } else if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request<ApiResponse<NFLPlayer[]>>(
      `/nfl/v1/players?${queryParams}`
    );
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
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}[]`, v.toString()));
        } else if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request<ApiResponse<NFLPlayer[]>>(
      `/nfl/v1/players/active?${queryParams}`
    );
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
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}[]`, v.toString()));
        } else if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request<ApiResponse<NFLGame[]>>(`/nfl/v1/games?${queryParams}`);
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
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}[]`, v.toString()));
        } else if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request<ApiResponse<NFLStats[]>>(
      `/nfl/v1/stats?${queryParams}`
    );
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<NFLStandings[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLStandings[]>>(
      `/nfl/v1/standings?${queryParams}`
    );
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<NFLPlayerInjury[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLPlayerInjury[]>>(
      `/nfl/v1/player_injuries?${queryParams}`
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
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLSeasonStats[]>>(
      `/nfl/v1/season_stats?${queryParams}`
    );
  }

  async getAdvancedRushingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedRushingStats[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLAdvancedRushingStats[]>>(
      `/nfl/v1/advanced_stats/rushing?${queryParams}`
    );
  }

  async getAdvancedPassingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedPassingStats[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLAdvancedPassingStats[]>>(
      `/nfl/v1/advanced_stats/passing?${queryParams}`
    );
  }

  async getAdvancedReceivingStats(params: {
    season: number;
    player_id?: number;
    week?: number;
  }): Promise<ApiResponse<NFLAdvancedReceivingStats[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NFLAdvancedReceivingStats[]>>(
      `/nfl/v1/advanced_stats/receiving?${queryParams}`
    );
  }
}
