import {
  BaseClient,
  ApiResponse,
  NBATeam,
  NBAPlayer,
  NBAGame,
  NBAStats,
  NBASeasonAverages,
  NBAStandings,
  NBABoxScore,
  NBAAdvancedStats,
  NBAOdds,
  NBAPlayerInjury,
} from "./types";

export class NBAClient extends BaseClient {
  async getTeams(params?: {
    division?: string;
    conference?: string;
  }): Promise<ApiResponse<NBATeam[]>> {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    return this.request<ApiResponse<NBATeam[]>>(`/nba/v1/teams?${queryParams}`);
  }

  async getTeam(id: number): Promise<ApiResponse<NBATeam>> {
    return this.request<ApiResponse<NBATeam>>(`/nba/v1/teams/${id}`);
  }

  async getPlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<NBAPlayer[]>> {
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
    return this.request<ApiResponse<NBAPlayer[]>>(
      `/nba/v1/players?${queryParams}`
    );
  }

  async getPlayer(id: number): Promise<ApiResponse<NBAPlayer>> {
    return this.request<ApiResponse<NBAPlayer>>(`/nba/v1/players/${id}`);
  }

  async getActivePlayers(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
    search?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<ApiResponse<NBAPlayer[]>> {
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
    return this.request<ApiResponse<NBAPlayer[]>>(
      `/nba/v1/players/active?${queryParams}`
    );
  }

  async getGames(params?: {
    cursor?: number;
    per_page?: number;
    dates?: string[];
    team_ids?: number[];
    seasons?: number[];
    postseason?: boolean;
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<NBAGame[]>> {
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
    return this.request<ApiResponse<NBAGame[]>>(`/nba/v1/games?${queryParams}`);
  }

  async getGame(id: number): Promise<ApiResponse<NBAGame>> {
    return this.request<ApiResponse<NBAGame>>(`/nba/v1/games/${id}`);
  }

  async getStats(params?: {
    cursor?: number;
    per_page?: number;
    player_ids?: number[];
    game_ids?: number[];
    dates?: string[];
    seasons?: number[];
    postseason?: boolean;
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<NBAStats[]>> {
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
    return this.request<ApiResponse<NBAStats[]>>(
      `/nba/v1/stats?${queryParams}`
    );
  }

  async getSeasonAverages(params: {
    season: number;
    player_id: number;
  }): Promise<ApiResponse<NBASeasonAverages[]>> {
    const queryParams = new URLSearchParams();
    queryParams.append("season", params.season.toString());
    queryParams.append("player_id", params.player_id.toString());
    return this.request<ApiResponse<NBASeasonAverages[]>>(
      `/nba/v1/season_averages?${queryParams}`
    );
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<NBAStandings[]>> {
    const queryParams = new URLSearchParams();
    queryParams.append("season", params.season.toString());
    return this.request<ApiResponse<NBAStandings[]>>(
      `/nba/v1/standings?${queryParams}`
    );
  }

  async getLiveBoxScores(): Promise<ApiResponse<NBABoxScore[]>> {
    return this.request<ApiResponse<NBABoxScore[]>>("/nba/v1/box_scores/live");
  }

  async getBoxScores(date: string): Promise<ApiResponse<NBABoxScore[]>> {
    const queryParams = new URLSearchParams({ date });
    return this.request<ApiResponse<NBABoxScore[]>>(
      `/nba/v1/box_scores?${queryParams}`
    );
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<NBAPlayerInjury[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NBAPlayerInjury[]>>(
      `/nba/v1/player_injuries?${queryParams}`
    );
  }

  async getOdds(params?: {
    date?: string;
    game_id?: number;
  }): Promise<ApiResponse<NBAOdds[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NBAOdds[]>>(`/nba/v1/odds?${queryParams}`);
  }

  async getAdvancedStats(params?: {
    cursor?: number;
    per_page?: number;
    player_ids?: number[];
    game_ids?: number[];
    dates?: string[];
    seasons?: number[];
    postseason?: boolean;
  }): Promise<ApiResponse<NBAAdvancedStats[]>> {
    const queryParams = new URLSearchParams(this.buildQueryParams(params));
    return this.request<ApiResponse<NBAAdvancedStats[]>>(
      `/nba/v1/stats/advanced?${queryParams}`
    );
  }
}
