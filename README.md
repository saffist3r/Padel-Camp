# Padel Tournament Dashboard

A modern, responsive web application for displaying padel tournament information, including group phases and elimination rounds.

## Features

- Display tournament groups and standings
- Show group phase matches
- Display elimination phase brackets
- Responsive design for all screen sizes
- CSV file upload for tournament data
- Modern UI with Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development server (usually `http://localhost:5173`).

## CSV File Format

The application expects a CSV file with the following format:

### Group Phase
```
Group A
player1,player2,skill_level1,skill_level2
...

Group B
player1,player2,skill_level1,skill_level2
...
```

### Elimination Phase
```
Elimination Phase
round,team1,team2,score,winner
...
```

See `sample-tournament.csv` for an example of the expected format.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Papa Parse (CSV parsing)

## Development

To modify the application:

1. Edit components in the `src/components` directory
2. Update types in `src/types`
3. Modify CSV parsing logic in `src/utils`

## License

MIT
