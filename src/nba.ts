import { BaseClient } from "./client";
import type {
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
  NBALeader,
} from "./types";

export class NBAClient extends BaseClient {
  async getTeams(params?: {
    division?: string;
    conference?: string;
  }): Promise<ApiResponse<NBATeam[]>> {
    return this.request<ApiResponse<NBATeam[]>>(`/nba/v1/teams`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
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
    return this.request<ApiResponse<NBAPlayer[]>>(`/nba/v1/players`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
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
    return this.request<ApiResponse<NBAPlayer[]>>(`/nba/v1/players/active`, {
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
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<NBAGame[]>> {
    return this.request<ApiResponse<NBAGame[]>>(`/nba/v1/games`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
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
    return this.request<ApiResponse<NBAStats[]>>(`/nba/v1/stats`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getSeasonAverages(params: {
    season: number;
    player_id: number;
  }): Promise<ApiResponse<NBASeasonAverages[]>> {
    return this.request<ApiResponse<NBASeasonAverages[]>>(
      `/nba/v1/season_averages`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getStandings(params: {
    season: number;
  }): Promise<ApiResponse<NBAStandings[]>> {
    return this.request<ApiResponse<NBAStandings[]>>(`/nba/v1/standings`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getLiveBoxScores(): Promise<ApiResponse<NBABoxScore[]>> {
    return this.request<ApiResponse<NBABoxScore[]>>("/nba/v1/box_scores/live");
  }

  async getBoxScores(date: string): Promise<ApiResponse<NBABoxScore[]>> {
    return this.request<ApiResponse<NBABoxScore[]>>(`/nba/v1/box_scores`, {
      method: "GET",
      params: this.buildQueryParams({ date }),
    });
  }

  async getPlayerInjuries(params?: {
    cursor?: number;
    per_page?: number;
    team_ids?: number[];
    player_ids?: number[];
  }): Promise<ApiResponse<NBAPlayerInjury[]>> {
    return this.request<ApiResponse<NBAPlayerInjury[]>>(
      `/nba/v1/player_injuries`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }

  async getLeaders(params: {
    stat_type:
      | "reb"
      | "dreb"
      | "tov"
      | "ast"
      | "oreb"
      | "min"
      | "pts"
      | "stl"
      | "blk";
    season: number;
  }): Promise<ApiResponse<NBALeader[]>> {
    return this.request<ApiResponse<NBALeader[]>>(`/nba/v1/leaders?`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
  }

  async getOdds(params: {
    date: string;
    game_id?: number;
  }): Promise<ApiResponse<NBAOdds[]>> {
    return this.request<ApiResponse<NBAOdds[]>>(`/nba/v1/odds?`, {
      method: "GET",
      params: this.buildQueryParams(params),
    });
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
    return this.request<ApiResponse<NBAAdvancedStats[]>>(
      `/nba/v1/stats/advanced`,
      {
        method: "GET",
        params: this.buildQueryParams(params),
      }
    );
  }
}
