# BALLDONTLIE API

Official TypeScript/JavaScript SDK for the BALLDONTLIE API. Access NBA, NFL, and MLB statistics and data. Check out the official website [here](https://app.balldontlie.io).

## Installation

```bash
# npm
npm install @balldontlie/sdk

# yarn
yarn add @balldontlie/sdk

# pnpm
pnpm add @balldontlie/sdk
```

## Usage

### TypeScript/ES Modules

```typescript
import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: "your-api-key" });

// Using async/await
async function getTeams() {
  try {
    const teams = await api.nba.getTeams();
    console.log(teams.data);
  } catch (error) {
    console.error(error);
  }
}

// Using promises
api.nba
  .getPlayers({ search: "James" })
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

### CommonJS

```javascript
const { BalldontlieAPI } = require("@balldontlie/sdk");

const api = new BalldontlieAPI({ apiKey: "your-api-key" });
```

## Example Usage

### NBA

```typescript
// Get all NBA teams
const teams = await api.nba.getTeams();

// Get a specific team
const team = await api.nba.getTeam(1);

// Search for players
const players = await api.nba.getPlayers({
  search: "James",
});

// Get season averages
const stats = await api.nba.getSeasonAverages({
  season: 2023,
  player_id: 1,
});
```

### NFL

```typescript
// Get NFL teams
const teams = await api.nfl.getTeams({ conference: "AFC" });

// Get player stats
const stats = await api.nfl.getStats({
  player_ids: [1],
  seasons: [2023],
});

// Get advanced stats
const rushingStats = await api.nfl.getAdvancedRushingStats({
  season: 2023,
  player_id: 1,
});
```

### MLB

```typescript
// Get MLB teams
const teams = await api.mlb.getTeams({ league: "American" });

// Get season stats
const seasonStats = await api.mlb.getSeasonStats({
  season: 2023,
  player_ids: [1],
});

// Get team season stats
const teamStats = await api.mlb.getTeamSeasonStats({
  season: 2023,
  team_id: 1,
});
```

## API Reference

View the source code to see the types and function names: https://github.com/balldontlie-api/ts-sdk/tree/master/src

Check out the full API documentation:
[NBA](https://nba.balldontlie.io)
[NFL](https://nfl.balldontlie.io)
[MLB](https://mlb.balldontlie.io)

## Error Handling

```typescript
try {
  const data = await api.nba.getTeam(999999);
} catch (error) {
  if (error.status === 404) {
    console.error("Team not found");
  } else {
    console.error("API Error:", error.message);
  }
}
```
