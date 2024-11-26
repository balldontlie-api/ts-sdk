import {
  BaseClient,
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
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request<ApiResponse<MLBTeam[]>>(`/mlb/v1/teams?${queryParams}`);
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
    return this.request<ApiResponse<MLBPlayer[]>>(
      `/mlb/v1/players?${queryParams}`
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
  }): Promise<ApiResponse<MLBPlayer[]>> {
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
    return this.request<ApiResponse<MLBPlayer[]>>(
      `/mlb/v1/players/active?${queryParams}`
    );
  }

  async getGames(params?: {
    cursor?: number;
    per_page?: number;
    dates?: string[];
    team_ids?: number[];
    seasons?: number[];
    postseason?: boolean;
  }): Promise<ApiResponse<MLBGame[]>> {
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
    return this.request<ApiResponse<MLBGame[]>>(`/mlb/v1/games?${queryParams}`);
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
    return this.request<ApiResponse<MLBStats[]>>(
      `/mlb/v1/stats?${queryParams}`
    );
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<MLBStandings[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<MLBStandings[]>>(
      `/mlb/v1/standings?${queryParams}`
    );
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<MLBPlayerInjury[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<MLBPlayerInjury[]>>(
      `/mlb/v1/player_injuries?${queryParams}`
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
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<MLBSeasonStats[]>>(
      `/mlb/v1/season_stats?${queryParams}`
    );
  }

  async getTeamSeasonStats(params: {
    season: number;
    team_id?: number;
    postseason?: boolean;
  }): Promise<ApiResponse<MLBTeamSeasonStats[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<MLBTeamSeasonStats[]>>(
      `/mlb/v1/teams/season_stats?${queryParams}`
    );
  }
}
