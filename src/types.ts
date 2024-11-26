// Base types
export interface Pagination {
  next_cursor: number;
  per_page: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Pagination;
}

export interface Error {
  error: string;
}

// NBA Types
export interface NBATeam {
  id: number;
  conference: "East" | "West";
  division:
    | "Atlantic"
    | "Central"
    | "Southeast"
    | "Northwest"
    | "Pacific"
    | "Southwest";
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export interface NBAPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height: string;
  weight: string;
  jersey_number: string;
  college: string;
  country: string;
  draft_year: number;
  draft_round: number;
  draft_number: number;
  team: NBATeam;
}

export interface NBAGame {
  id: number;
  date: string;
  season: number;
  status: string;
  period: number;
  time: string;
  postseason: boolean;
  home_team_score: number;
  visitor_team_score: number;
  home_team: NBATeam;
  visitor_team: NBATeam;
}

export interface NBAStats {
  id: number;
  min: string;
  fgm: number;
  fga: number;
  fg_pct: number;
  fg3m: number;
  fg3a: number;
  fg3_pct: number;
  ftm: number;
  fta: number;
  ft_pct: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  player: NBAPlayer;
  team: NBATeam;
  game: NBAGame;
}

export interface NBASeasonAverages {
  games_played: number;
  pts: number;
  ast: number;
  reb: number;
  stl: number;
  blk: number;
  turnover: number;
  min: string;
  fgm: number;
  fga: number;
  fg_pct: number;
  fg3m: number;
  fg3a: number;
  fg3_pct: number;
  ftm: number;
  fta: number;
  ft_pct: number;
  oreb: number;
  dreb: number;
  player_id: number;
  season: number;
}

export interface NBAStandings {
  team: NBATeam;
  conference_record: string;
  conference_rank: number;
  division_record: string;
  division_rank: number;
  wins: number;
  losses: number;
  home_record: string;
  road_record: string;
  season: number;
}

export interface NBABoxScore {
  date: string;
  season: number;
  status: string;
  period: number;
  time: string;
  postseason: boolean;
  home_team_score: number;
  visitor_team_score: number;
  home_team: NBATeam;
  visitor_team: NBATeam;
  players: {
    min: string;
    fgm: number;
    fga: number;
    fg_pct: number;
    fg3m: number;
    fg3a: number;
    fg3_pct: number;
    ftm: number;
    fta: number;
    ft_pct: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
    pf: number;
    pts: number;
    player: NBAPlayer;
  }[];
}
export interface NBAPlayerInjury {
  player: NBAPlayer;
  return_date: string;
  description: string;
  status: string;
}

export interface NBALeader {
  player: NBAPlayer;
  value: number;
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
  rank: number;
  season: number;
  games_played: number;
}

export interface NBAOdds {
  type: "2way" | "spread" | "over/under";
  vendor: string;
  live: boolean;
  game_id: number;
  odds_decimal_home: string;
  odds_decimal_visitor: string;
  odds_american_home: string;
  odds_american_visitor: string;
  away_spread: string;
  over_under: string;
}

export interface NBAAdvancedStats {
  id: number;
  pie: number;
  pace: number;
  assist_percentage: number;
  assist_ratio: number;
  assist_to_turnover: number;
  defensive_rating: number;
  defensive_rebound_percentage: number;
  effective_field_goal_percentage: number;
  net_rating: number;
  offensive_rating: number;
  offensive_rebound_percentage: number;
  rebound_percentage: number;
  true_shooting_percentage: number;
  turnover_ratio: number;
  usage_percentage: number;
  player: NBAPlayer;
  team: NBATeam;
  game: NBAGame;
}

export interface NFLTeam {
  id: number;
  conference: "AFC" | "NFC";
  division: "NORTH" | "SOUTH" | "EAST" | "WEST";
  location: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export interface NFLPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  position_abbreviation: string;
  height: string;
  weight: string;
  jersey_number: string;
  college: string;
  experience: string;
  age: number;
  team: NFLTeam;
}

export interface NFLGame {
  id: number;
  visitor_team: NFLTeam;
  home_team: NFLTeam;
  summary: string;
  venue: string;
  week: number;
  date: string;
  season: number;
  postseason: boolean;
  status: string;
  home_team_score: number;
  visitor_team_score: number;
}

export interface NFLStats {
  player: NFLPlayer;
  team: NFLTeam;
  game: NFLGame;
  passing_completions: number;
  passing_attempts: number;
  passing_yards: number;
  yards_per_pass_attempt: number;
  passing_touchdowns: number;
  passing_interceptions: number;
  sacks: number;
  qbr: number;
  qb_rating: number;
  rushing_attempts: number;
  rushing_yards: number;
  yards_per_rush_attempt: number;
  rushing_touchdowns: number;
  receptions: number;
  receiving_yards: number;
  yards_per_reception: number;
  receiving_touchdowns: number;
  fumbles: number;
  fumbles_lost: number;
}

export interface NFLStandings {
  team: NFLTeam;
  win_streak: number;
  points_for: number;
  points_against: number;
  playoff_seed: number;
  point_differential: number;
  overall_record: string;
  conference_record: string;
  division_record: string;
  wins: number;
  losses: number;
  ties: number;
  home_record: string;
  road_record: string;
  season: number;
}

export interface NFLPlayerInjury {
  player: NFLPlayer;
  status: string;
  comment: string;
  date: string;
}

export interface NFLSeasonStats {
  player: NFLPlayer;
  games_played: number;
  season: number;
  postseason: boolean;
  passing_completions: number;
  passing_attempts: number;
  passing_yards: number;
  passing_yards_per_game: number;
  passing_touchdowns: number;
  passing_interceptions: number;
  passing_completion_pct: number;
  rushing_attempts: number;
  rushing_yards: number;
  rushing_yards_per_game: number;
  rushing_touchdowns: number;
  receiving_receptions: number;
  receiving_yards: number;
  receiving_touchdowns: number;
  receiving_targets: number;
}

export interface NFLAdvancedRushingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  avgTimeToLos: number;
  expectedRushYards: number;
  rushAttempts: number;
  rushPctOverExpected: number;
  rushTouchdowns: number;
  rushYards: number;
  rushYardsOverExpected: number;
  rushYardsOverExpectedPerAtt: number;
  efficiency: number;
  percentAttemptsGteEightDefenders: number;
  avgRushYards: number;
}

export interface NFLAdvancedPassingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  aggressiveness: number;
  attempts: number;
  avgAirDistance: number;
  avgAirYardsDifferential: number;
  avgAirYardsToSticks: number;
  avgCompletedAirYards: number;
  avgIntendedAirYards: number;
  avgTimeToThrow: number;
  completionPercentage: number;
  completionPercentageAboveExpectation: number;
  completions: number;
  expectedCompletionPercentage: number;
  maxAirDistance: number;
  maxCompletedAirDistance: number;
  passerRating: number;
}

export interface NFLAdvancedReceivingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  avgCushion: number;
  avgExpectedYac: number;
  avgIntendedAirYards: number;
  avgSeparation: number;
  avgYac: number;
  avgYacAboveExpectation: number;
  catchPercentage: number;
  percentShareOfIntendedAirYards: number;
  recTouchdowns: number;
  receptions: number;
  targets: number;
  yards: number;
}

export interface MLBTeam {
  id: number;
  slug: string;
  abbreviation: string;
  display_name: string;
  short_display_name: string;
  name: string;
  location: string;
  league: "American" | "National";
  division: "East" | "Central" | "West";
}

export interface MLBPlayer {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  debut_year: number;
  jersey: string;
  college: string;
  position: string;
  active: boolean;
  birth_place: string;
  dob: string;
  age: number;
  height: string;
  weight: string;
  draft: string;
  bats_throws: string;
  team: MLBTeam;
}

export interface MLBGame {
  id: number;
  home_team_name: string;
  away_team_name: string;
  home_team: MLBTeam;
  away_team: MLBTeam;
  season: number;
  postseason: boolean;
  date: string;
  home_team_data: {
    hits: number;
    runs: number;
    errors: number;
    inning_scores: number[];
  };
  away_team_data: {
    hits: number;
    runs: number;
    errors: number;
    inning_scores: number[];
  };
  venue: string;
  attendance: number;
  status: string;
}

export interface MLBStats {
  player: MLBPlayer;
  game: MLBGame;
  team_name: string;
  at_bats: number;
  runs: number;
  hits: number;
  rbi: number;
  hr: number;
  bb: number;
  k: number;
  avg: number;
  obp: number;
  slg: number;
  ip: number;
  p_hits: number;
  p_runs: number;
  er: number;
  p_bb: number;
  p_k: number;
  p_hr: number;
  pitch_count: number;
  strikes: number;
  era: number;
}

export interface MLBStandings {
  team: MLBTeam;
  league_name: string;
  league_short_name: string;
  division_name: string;
  division_short_name: string;
  wins: number;
  losses: number;
  win_percent: number;
  games_behind: number;
  streak: number;
  last_ten_games: string;
  season: number;
}

export interface MLBSeasonStats {
  player: MLBPlayer;
  team_name: string;
  season: number;
  postseason: boolean;
  batting_gp: number;
  batting_ab: number;
  batting_r: number;
  batting_h: number;
  batting_avg: number;
  batting_2b: number;
  batting_3b: number;
  batting_hr: number;
  batting_rbi: number;
  batting_bb: number;
  batting_so: number;
  batting_sb: number;
  batting_obp: number;
  batting_slg: number;
  batting_ops: number;
  batting_war: number;
  pitching_gp: number;
  pitching_gs: number;
  pitching_w: number;
  pitching_l: number;
  pitching_era: number;
  pitching_sv: number;
  pitching_ip: number;
  pitching_h: number;
  pitching_er: number;
  pitching_hr: number;
  pitching_bb: number;
  pitching_k: number;
  pitching_war: number;
}

export interface MLBTeamSeasonStats {
  team: MLBTeam;
  team_name: string;
  postseason: boolean;
  season: number;
  gp: number;
  batting_ab: number;
  batting_r: number;
  batting_h: number;
  batting_2b: number;
  batting_3b: number;
  batting_hr: number;
  batting_rbi: number;
  batting_bb: number;
  batting_so: number;
  batting_sb: number;
  batting_avg: number;
  batting_obp: number;
  batting_slg: number;
  batting_ops: number;
  pitching_w: number;
  pitching_l: number;
  pitching_era: number;
  pitching_sv: number;
  pitching_ip: number;
  pitching_h: number;
  pitching_er: number;
  pitching_hr: number;
  pitching_bb: number;
  pitching_k: number;
  fielding_e: number;
  fielding_fp: number;
}

export interface MLBStandings {
  team: MLBTeam;
  league_name: string;
  league_short_name: string;
  division_name: string;
  division_short_name: string;
  wins: number;
  losses: number;
  win_percent: number;
  games_behind: number;
  streak: number;
  last_ten_games: string;
  season: number;
}

export interface MLBSeasonStats {
  player: MLBPlayer;
  team_name: string;
  season: number;
  postseason: boolean;
  batting_gp: number;
  batting_ab: number;
  batting_r: number;
  batting_h: number;
  batting_avg: number;
  batting_2b: number;
  batting_3b: number;
  batting_hr: number;
  batting_rbi: number;
  batting_bb: number;
  batting_so: number;
  batting_sb: number;
  batting_obp: number;
  batting_slg: number;
  batting_ops: number;
  batting_war: number;
  pitching_gp: number;
  pitching_gs: number;
  pitching_w: number;
  pitching_l: number;
  pitching_era: number;
  pitching_sv: number;
  pitching_ip: number;
  pitching_h: number;
  pitching_er: number;
  pitching_hr: number;
  pitching_bb: number;
  pitching_k: number;
  pitching_war: number;
}

export interface MLBTeamSeasonStats {
  team: MLBTeam;
  team_name: string;
  postseason: boolean;
  season: number;
  gp: number;
  batting_ab: number;
  batting_r: number;
  batting_h: number;
  batting_2b: number;
  batting_3b: number;
  batting_hr: number;
  batting_rbi: number;
  batting_bb: number;
  batting_so: number;
  batting_sb: number;
  batting_avg: number;
  batting_obp: number;
  batting_slg: number;
  batting_ops: number;
  pitching_w: number;
  pitching_l: number;
  pitching_era: number;
  pitching_sv: number;
  pitching_ip: number;
  pitching_h: number;
  pitching_er: number;
  pitching_hr: number;
  pitching_bb: number;
  pitching_k: number;
  fielding_e: number;
  fielding_fp: number;
}

export interface MLBPlayerInjury {
  player: MLBPlayer;
  date: string;
  return_date: string;
  type: string;
  detail: string;
  side: string;
  status: string;
  long_comment: string;
  short_comment: string;
}

// Base client configuration
export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
}

// Base client class
export class BaseClient {
  protected readonly baseUrl: string;
  protected readonly headers: Record<string, string>;

  constructor(config: ClientConfig) {
    this.baseUrl = config.baseUrl || "https://api.balldontlie.io";
    this.headers = {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
    };
  }

  protected async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    if (!response.ok) {
      const error = (await response.json()) as Error;
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  protected buildQueryParams(
    params?: Record<string, any>
  ): Record<string, string> {
    if (!params) return {};

    const result: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          result[`${key}[${i}]`] = v.toString();
        });
      } else if (value !== undefined) {
        result[key] = value.toString();
      }
    });
    return result;
  }
}
