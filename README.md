# Whack-A-Mole Game

## Features Overview
- Fun and interactive game experience.
- Multiple difficulty levels to challenge players of all ages.

## Difficulty Levels
| Level          | Moles Appearance Frequency | Max Score | 
|----------------|---------------------------|-----------| 
| Easy           | 5 seconds                 | 50        | 
| Medium         | 3 seconds                 | 100       | 
| Hard           | 1 second                  | 200       | 

## How to Play
1. Start the game by clicking the "Start" button.
2. Moles will start appearing randomly on the screen.
3. Click on a mole to score points. 
4. The game ends when the timer runs out.

## Setup Guide for Adding Mole Image
1. Prepare your mole image in PNG/JPEG format.
2. Save the image in the `images/` directory of your project.
3. Update the image source in the game script accordingly.

## Game Mechanics
- Points are awarded for each mole clicked.
- Different score values based on the difficulty level.
- Timer countdown for an added challenge.

## File Structure
```
whack-a-mole/
├── index.html
├── styles.css
├── script.js
└── images/
    └── mole.png
```

## Browser Compatibility
- Supported on the latest versions of Chrome, Firefox, Safari, and Edge.

## Customization Options
- Difficulty settings: Modify the frequency of mole appearance in `script.js`.
- Scoring: Adjust the points awarded in the game mechanics section of `script.js`.

## Future Enhancements
- Add sounds for mole hits and miss clicks.
- Implement a leaderboard feature to track high scores.
- Consider mobile responsiveness improvements for better gameplay on mobile devices.

---
Last updated: 2026-03-28 21:29:46 UTC