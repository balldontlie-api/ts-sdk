export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class AuthenticationError extends APIError {}
export class ValidationError extends APIError {}
export class NotFoundError extends APIError {}
export class RateLimitError extends APIError {}
export class ServerError extends APIError {}
export interface Pagination {
  next_cursor: number;
  per_page: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Pagination;
}

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
  position: string | null;
  height: string | null;
  weight: string | null;
  jersey_number: string | null;
  college: string | null;
  country: string | null;
  draft_year: number | null;
  draft_round: number | null;
  draft_number: number | null;
  team?: NBATeam;
  team_id?: number;
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
  home_team?: NBATeam;
  home_team_id?: NBATeam;
  visitor_team?: NBATeam;
  visitor_team_id?: number;
}

export interface NBAStats {
  id: number;
  min: string;
  fgm: number | null;
  fga: number | null;
  fg_pct: number | null;
  fg3m: number | null;
  fg3a: number | null;
  fg3_pct: number | null;
  ftm: number | null;
  fta: number | null;
  ft_pct: number | null;
  oreb: number | null;
  dreb: number | null;
  reb: number | null;
  ast: number | null;
  stl: number | null;
  blk: number | null;
  turnover: number | null;
  pf: number | null;
  pts: number | null;
  player: NBAPlayer;
  team?: NBATeam;
  game?: NBAGame;
}

export interface NBASeasonAverages {
  games_played: number;
  pts: number | null;
  ast: number | null;
  reb: number | null;
  stl: number | null;
  blk: number | null;
  turnover: number | null;
  min: string | null;
  fgm: number | null;
  fga: number | null;
  fg_pct: number | null;
  fg3m: number | null;
  fg3a: number | null;
  fg3_pct: number | null;
  ftm: number | null;
  fta: number | null;
  ft_pct: number | null;
  oreb: number | null;
  dreb: number | null;
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

export interface NBABoxScoreTeam extends NBATeam {
  players: NBAStats[];
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
  home_team: NBABoxScoreTeam;
  visitor_team: NBABoxScoreTeam;
}
export interface NBAPlayerInjury {
  player: NBAPlayer;
  return_date: string | null;
  description: string | null;
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
  away_spread?: string;
  over_under?: string;
}

export interface NBAAdvancedStats {
  id: number;
  pie: number | null;
  pace: number | null;
  assist_percentage: number | null;
  assist_ratio: number | null;
  assist_to_turnover: number | null;
  defensive_rating: number | null;
  defensive_rebound_percentage: number | null;
  effective_field_goal_percentage: number | null;
  net_rating: number | null;
  offensive_rating: number | null;
  offensive_rebound_percentage: number | null;
  rebound_percentage: number | null;
  true_shooting_percentage: number | null;
  turnover_ratio: number | null;
  usage_percentage: number | null;
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
  team?: NFLTeam;
  team_id?: number;
}

export interface NFLGame {
  id: number;
  visitor_team: NFLTeam;
  home_team: NFLTeam;
  summary?: string;
  venue?: string;
  week: number;
  date: string;
  season: number;
  postseason: boolean;
  status: string;
  home_team_score: number | null;
  home_team_q1: number | null;
  home_team_q2: number | null;
  home_team_q3: number | null;
  home_team_q4: number | null;
  home_team_ot: number | null;
  visitor_team_score: number | null;
  visitor_team_q1: number | null;
  visitor_team_q2: number | null;
  visitor_team_q3: number | null;
  visitor_team_q4: number | null;
  visitor_team_ot: number | null;
}

export interface NFLStats {
  player: NFLPlayer;
  team: NFLTeam;
  game: NFLGame;
  passing_completions: number | null;
  passing_attempts: number | null;
  passing_yards: number | null;
  yards_per_pass_attempt: number | null;
  passing_touchdowns: number | null;
  passing_interceptions: number | null;
  sacks: number | null;
  sacks_loss: number | null;
  qbr: number | null;
  qb_rating: number | null;
  rushing_attempts: number | null;
  rushing_yards: number | null;
  yards_per_rush_attempt: number | null;
  rushing_touchdowns: number | null;
  long_rushing: number | null;
  receptions: number | null;
  receiving_yards: number | null;
  yards_per_reception: number | null;
  receiving_touchdowns: number | null;
  long_reception: number | null;
  receiving_targets: number | null;
  fumbles: number | null;
  fumbles_lost: number | null;
  fumbles_recovered: number | null;
  total_tackles: number | null;
  defensive_sacks: number | null;
  solo_tackles: number | null;
  tackles_for_loss: number | null;
  passes_defended: number | null;
  qb_hits: number | null;
  fumbles_touchdowns: number | null;
  defensive_interceptions: number | null;
  interception_yards: number | null;
  interception_touchdowns: number | null;
  kick_returns: number | null;
  kick_return_yards: number | null;
  yards_per_kick_return: number | null;
  long_kick_return: number | null;
  kick_return_touchdowns: number | null;
  punt_returns: number | null;
  punt_return_yards: number | null;
  yards_per_punt_return: number | null;
  long_punt_return: number | null;
  punt_return_touchdowns: number | null;
  field_goal_attempts: number | null;
  field_goals_made: number | null;
  field_goal_pct: number | null;
  long_field_goal_made: number | null;
  extra_points_made: number | null;
  total_points: number | null;
  punts: number | null;
  punt_yards: number | null;
  gross_avg_punt_yards: number | null;
  touchbacks: number | null;
  punts_inside_20: number | null;
  long_punt: number | null;
}

export interface NFLStandings {
  team: NFLTeam;
  win_streak: number | null;
  points_for: number | null;
  points_against: number | null;
  playoff_seed: number | null;
  point_differential: number | null;
  overall_record: string | null;
  conference_record: string | null;
  division_record: string | null;
  wins: number | null;
  losses: number | null;
  ties: number | null;
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
  passing_completions: number | null;
  passing_attempts: number | null;
  passing_yards: number | null;
  yards_per_pass_attempt: number | null;
  passing_touchdowns: number | null;
  passing_interceptions: number | null;
  passing_yards_per_game: number | null;
  passing_completion_pct: number | null;
  qbr: number | null;
  rushing_attempts: number | null;
  rushing_yards: number | null;
  rushing_yards_per_game: number | null;
  yards_per_rush_attempt: number | null;
  rushing_touchdowns: number | null;
  rushing_fumbles: number | null;
  rushing_fumbles_lost: number | null;
  rushing_first_downs: number | null;
  receptions: number | null;
  receiving_yards: number | null;
  yards_per_reception: number | null;
  receiving_touchdowns: number | null;
  receiving_fumbles: number | null;
  receiving_fumbles_lost: number | null;
  receiving_first_downs: number | null;
  receiving_targets: number | null;
  receiving_yards_per_game: number | null;
  fumbles_forced: number | null;
  fumbles_recovered: number | null;
  total_tackles: number | null;
  defensive_sacks: number | null;
  defensive_sack_yards: number | null;
  solo_tackles: number | null;
  assist_tackles: number | null;
  fumbles_touchdowns: number | null;
  defensive_interceptions: number | null;
  interception_touchdowns: number | null;
  kick_returns: number | null;
  kick_return_yards: number | null;
  yards_per_kick_return: number | null;
  kick_return_touchdowns: number | null;
  punt_returner_returns: number | null;
  punt_returner_return_yards: number | null;
  yards_per_punt_return: number | null;
  punt_return_touchdowns: number | null;
  field_goal_attempts: number | null;
  field_goals_made: number | null;
  field_goal_pct: number | null;
  punts: number | null;
  punt_yards: number | null;
  field_goals_made_1_19: number | null;
  field_goals_made_20_29: number | null;
  field_goals_made_30_39: number | null;
  field_goals_made_40_49: number | null;
  field_goals_made_50: number | null;
  field_goals_attempts_1_19: number | null;
  field_goals_attempts_20_29: number | null;
  field_goals_attempts_30_39: number | null;
  field_goals_attempts_40_49: number | null;
  field_goals_attempts_50: number | null;
}

export interface NFLAdvancedRushingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  avg_time_to_los: number;
  expected_rush_yards: number;
  rush_attempts: number;
  rush_pct_over_expected: number;
  rush_touchdowns: number;
  rush_yards: number;
  rush_yards_over_expected: number;
  rush_yards_over_expected_per_att: number;
  efficiency: number;
  percent_attempts_gte_eight_defenders: number;
  avg_rush_yards: number;
}

export interface NFLAdvancedPassingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  aggressiveness: number;
  attempts: number;
  avg_air_distance: number;
  avg_air_yards_differential: number;
  avg_air_yards_to_sticks: number;
  avg_completed_air_yards: number;
  avg_intended_air_yards: number;
  avg_time_to_throw: number;
  completion_percentage: number;
  completion_percentage_above_expectation: number;
  completions: number;
  expected_completion_percentage: number;
  games_played: number;
  interceptions: number;
  max_air_distance: number;
  max_completed_air_distance: number;
  pass_touchdowns: number;
  pass_yards: number;
  passer_rating: number;
}

export interface NFLAdvancedReceivingStats {
  player: NFLPlayer;
  season: number;
  week: number;
  avg_cushion: number;
  avg_expected_yac: number;
  avg_intended_air_yards: number;
  avg_separation: number;
  avg_yac: number;
  avg_yac_above_expectation: number;
  catch_percentage: number;
  percent_share_of_intended_air_yards: number;
  rec_touchdowns: number;
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
  debut_year: number | null;
  jersey: string | null;
  college: string | null;
  position: string;
  active: boolean;
  birth_place: string | null;
  dob: string | null;
  age: number | null;
  height: string | null;
  weight: string | null;
  draft: string | null;
  bats_throws: string | null;
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
  venue: string | null;
  attendance: number | null;
  status: string;
  scoring_summary: Array<{
    play: string;
    inning: string;
    period: string;
    away_score: number;
    home_score: number;
  }>;
}

export interface MLBStats {
  player: MLBPlayer;
  game: MLBGame;
  team_name: string;
  at_bats: number | null;
  runs: number | null;
  hits: number | null;
  rbi: number | null;
  hr: number | null;
  bb: number | null;
  k: number | null;
  avg: number | null;
  obp: number | null;
  slg: number | null;
  ip: number | null;
  p_hits: number | null;
  p_runs: number | null;
  er: number | null;
  p_bb: number | null;
  p_k: number | null;
  p_hr: number | null;
  pitch_count: number | null;
  strikes: number | null;
  era: number | null;
}

export interface MLBStandings {
  team: MLBTeam;
  league_name: string;
  league_short_name: string;
  division_name: string;
  division_short_name: string;
  ot_losses: number | null;
  ot_wins: number | null;
  avg_points_against: number | null;
  avg_points_for: number | null;
  clincher: number | null;
  differential: number | null;
  division_win_percent: number | null;
  games_behind: number | null;
  games_played: number | null;
  league_win_percent: number | null;
  losses: number | null;
  playoff_seed: number | null;
  point_differential: number | null;
  game_back_points: number | null;
  points_against: number | null;
  points_for: number | null;
  streak: number | null;
  ties: number | null;
  win_percent: number | null;
  wins: number | null;
  division_games_behind: number | null;
  division_percent: number | null;
  division_tied: number | null;
  home_losses: number | null;
  home_ties: number | null;
  home_wins: number | null;
  magic_number_division: number | null;
  magic_number_wildcard: number | null;
  playoff_percent: number | null;
  road_losses: number | null;
  road_ties: number | null;
  road_wins: number | null;
  wildcard_percent: number | null;
  total: string | null;
  home: string | null;
  road: string | null;
  intra_division: string | null;
  intra_league: string | null;
  last_ten_games: string | null;
}

export interface MLBSeasonStats {
  player: MLBPlayer;
  team_name: string;
  season: number;
  postseason: boolean;
  batting_gp: number | null;
  batting_ab: number | null;
  batting_r: number | null;
  batting_h: number | null;
  batting_avg: number | null;
  batting_2b: number | null;
  batting_3b: number | null;
  batting_hr: number | null;
  batting_rbi: number | null;
  batting_bb: number | null;
  batting_so: number | null;
  batting_sb: number | null;
  batting_obp: number | null;
  batting_slg: number | null;
  batting_ops: number | null;
  batting_war: number | null;
  pitching_gp: number | null;
  pitching_gs: number | null;
  pitching_w: number | null;
  pitching_l: number | null;
  pitching_era: number | null;
  pitching_sv: number | null;
  pitching_ip: number | null;
  pitching_h: number | null;
  pitching_er: number | null;
  pitching_hr: number | null;
  pitching_bb: number | null;
  pitching_k: number | null;
  pitching_war: number | null;
  fielding_gp: number | null;
  fielding_gs: number | null;
  fielding_fip: number | null;
  fielding_tc: number | null;
  fielding_po: number | null;
  fielding_a: number | null;
  fielding_fp: number | null;
  fielding_e: number | null;
  fielding_dp: number | null;
  fielding_rf: number | null;
  fielding_dwar: number | null;
  fielding_pb: number | null;
  fielding_cs: number | null;
  fielding_cs_percent: number | null;
  fielding_sba: number | null;
}

export interface MLBTeamSeasonStats {
  team: MLBTeam;
  team_name: string;
  postseason: boolean;
  season: number;
  gp: number | null;
  batting_ab: number | null;
  batting_r: number | null;
  batting_h: number | null;
  batting_2b: number | null;
  batting_3b: number | null;
  batting_hr: number | null;
  batting_rbi: number | null;
  batting_tb: number | null;
  batting_bb: number | null;
  batting_so: number | null;
  batting_sb: number | null;
  batting_avg: number | null;
  batting_obp: number | null;
  batting_slg: number | null;
  batting_ops: number | null;
  pitching_w: number | null;
  pitching_l: number | null;
  pitching_era: number | null;
  pitching_sv: number | null;
  pitching_cg: number | null;
  pitching_sho: number | null;
  pitching_qs: number | null;
  pitching_ip: number | null;
  pitching_h: number | null;
  pitching_er: number | null;
  pitching_hr: number | null;
  pitching_bb: number | null;
  pitching_k: number | null;
  pitching_oba: number | null;
  pitching_whip: number | null;
  fielding_e: number | null;
  fielding_fp: number | null;
  fielding_tc: number | null;
  fielding_po: number | null;
  fielding_a: number | null;
}

export interface MLBPlayerInjury {
  player: MLBPlayer;
  date: string;
  return_date: string | null;
  type: string;
  detail: string;
  side: string;
  status: string;
  long_comment: string | null;
  short_comment: string | null;
}

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface EPLTeam {
  id: number;
  name: string;
  short_name: string;
  abbr: string;
  city: string;
  stadium: string;
}

export interface EPLPlayer {
  id: number;
  position: string | null;
  national_team: string | null;
  height: number | null;
  weight: number | null;
  birth_date: string | null;
  age: string | null;
  name?: string;
  first_name: string | null;
  last_name: string | null;
  team_ids?: number[] | null;
}

export interface EPLTeamSeasonStat {
  value: number;
  name: string;
  rank: number;
  season: number;
}

export interface EPLPlayerSeasonStat {
  value: number;
  name: string;
  rank: number;
  season: number;
}

export interface EPLGame {
  id: number;
  week: number;
  kickoff: string | null;
  provisional_kickoff: string | null;
  home_team_id: number;
  away_team_id: number;
  home_score: number | null;
  away_score: number | null;
  status: string | null;
  season: number;
  ground: string | null;
  clock: number | null;
  clock_display: string | null;
  extra_time: boolean | null;
}

export interface EPLGameLineup {
  team_id: number;
  player: EPLPlayer;
  substitute: boolean;
  captain: boolean;
  position: string | null;
  shirt_number: number | null;
  sub_clock: number | null;
  sub_clock_display: string | null;
}

export interface EPLGameGoal {
  game_id: number;
  scorer: EPLPlayer;
  assister: EPLPlayer | null;
  clock: number;
  clock_display: string | null;
  phase: string | null;
  type: string | null;
}

export interface EPLGameTeamStats {
  game_id: number;
  teams: Array<{
    team_id: number;
    stats: Array<{
      name: string;
      value: number;
    }>;
  }>;
}

export interface EPLGamePlayerStats {
  game_id: number;
  players: Array<{
    team_id: number;
    player_id: number;
    stats: Array<{
      name: string;
      value: number;
    }>;
  }>;
}

export interface EPLStanding {
  team: EPLTeam;
  season: number;
  position: number;
  form: string;
  home_played: number;
  home_drawn: number;
  home_won: number;
  home_lost: number;
  home_goals_against: number;
  home_goals_difference: number;
  home_goals_for: number;
  home_points: number;
  away_played: number;
  away_drawn: number;
  away_won: number;
  away_lost: number;
  away_goals_against: number;
  away_goals_difference: number;
  away_goals_for: number;
  away_points: number;
  overall_played: number;
  overall_drawn: number;
  overall_won: number;
  overall_lost: number;
  overall_goals_against: number;
  overall_goals_difference: number;
  overall_goals_for: number;
  overall_points: number;
}

export interface EPLPlayerStatLeaders {
  player: EPLPlayer;
  season: number;
  rank: number;
  value: number;
  name: EPLPlayerStatType;
}

export interface EPLTeamStatLeaders {
  team: EPLTeam;
  season: number;
  rank: number;
  value: number;
  name: EPLTeamStatType;
}

export type EPLPlayerStatType =
  | "goals"
  | "goal_assist"
  | "clean_sheet"
  | "appearances"
  | "mins_played"
  | "yellow_card"
  | "red_card"
  | "total_pass"
  | "touches"
  | "total_scoring_att"
  | "hit_woodwork"
  | "big_chance_missed"
  | "total_offside"
  | "total_tackle"
  | "fouls"
  | "dispossessed"
  | "own_goals"
  | "total_clearance"
  | "clearance_off_line"
  | "saves"
  | "penalty_save"
  | "total_high_claim"
  | "punches";

export type EPLTeamStatType =
  | "wins"
  | "losses"
  | "touches"
  | "own_goals"
  | "total_yel_card"
  | "total_red_card"
  | "goals"
  | "total_pass"
  | "total_scoring_att"
  | "total_offside"
  | "hit_woodwork"
  | "big_chance_missed"
  | "total_tackle"
  | "total_clearance"
  | "clearance_off_line"
  | "dispossessed"
  | "clean_sheet"
  | "saves"
  | "penalty_save"
  | "total_high_claim"
  | "punches";
