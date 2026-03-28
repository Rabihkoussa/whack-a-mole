'use strict';

class WhackAMole {
    constructor() {
        this.score = 0;
        this.moles = [];
        this.gameDuration = 30; // seconds
        this.interval = null;
    }

    // Initialize the game
    startGame() {
        this.score = 0;
        this.moles = this.generateMoles();
        this.interval = setInterval(() => this.showMole(), 1000);
        setTimeout(() => this.endGame(), this.gameDuration * 1000);
    }

    // Generate mole positions
    generateMoles() {
        let moles = [];
        for (let i = 0; i < 6; i++) {
            moles.push({ id: i, active: false });
        }
        return moles;
    }

    // Show a mole randomly
    showMole() {
        const index = Math.floor(Math.random() * this.moles.length);
        this.moles.forEach((mole, i) => mole.active = i === index);
        console.log(`Mole ${index} is active!`);
    }

    // Whack a mole
    whackMole(id) {
        const mole = this.moles[id];
        if (mole.active) {
            this.score++;
            console.log(`Whacked mole ${id}! Score: ${this.score}`);
        } else {
            console.log(`Missed mole ${id}!`);
        }
    }

    // End the game
    endGame() {
        clearInterval(this.interval);
        console.log(`Game over! Your score: ${this.score}`);
    }
}

// Example usage:
const game = new WhackAMole();
game.startGame();

// simulate whacking a mole
setTimeout(() => game.whackMole(0), 2000); // tries to whack mole at position 0
