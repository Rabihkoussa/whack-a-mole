class WhackAMoleGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.timeLeft = 60;
        this.gameActive = false;
        this.currentDifficulty = null;
        this.molesHit = 0;
        this.moleImage = 'mole.png';
        this.difficultySettings = {
            easy: { holesCount: 4, moleShowTime: 1200, moleHideTime: 800, speedIncrease: 0.05 },
            medium: { holesCount: 6, moleShowTime: 900, moleHideTime: 600, speedIncrease: 0.08 },
            hard: { holesCount: 9, moleShowTime: 600, moleHideTime: 400, speedIncrease: 0.12 },
            extreme: { holesCount: 12, moleShowTime: 400, moleHideTime: 300, speedIncrease: 0.15 }
        };
        this.holes = [];
        this.activeMole = null;
        this.moleTimeout = null;
        this.timerInterval = null;
        this.setupEventListeners();
    }
    setupEventListeners() {
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.startGame(e.target.dataset.difficulty);
            });
        });
    }
    startGame(difficulty) {
        this.currentDifficulty = difficulty;
        this.score = 0;
        this.level = 1;
        this.timeLeft = 60;
        this.molesHit = 0;
        this.gameActive = true;
        document.getElementById('difficultySelector').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        this.createHoles();
        this.startTimer();
        this.spawnMole();
    }
    createHoles() {
        const container = document.getElementById('holesContainer');
        container.innerHTML = '';
        this.holes = [];
        const settings = this.difficultySettings[this.currentDifficulty];
        let holesCount = settings.holesCount + (this.level - 1) * 2;
        const width = container.parentElement.offsetWidth;
        let columns = 4;
        if (width < 600) columns = 3;
        if (width < 400) columns = 2;
        container.style.gridTemplateColumns = `repeat(${Math.min(columns, holesCount)}, 1fr)`;
        for (let i = 0; i < holesCount; i++) {
            const hole = document.createElement('div');
            hole.className = 'hole empty';
            hole.addEventListener('click', (e) => this.hitMole(e, i));
            container.appendChild(hole);
            this.holes.push(hole);
        }
    }
    spawnMole() {
        if (!this.gameActive) return;
        if (this.activeMole !== null) {
            this.holes[this.activeMole].innerHTML = '';
            this.holes[this.activeMole].classList.add('empty');
        }
        const randomIndex = Math.floor(Math.random() * this.holes.length);
        this.activeMole = randomIndex;
        const hole = this.holes[randomIndex];
        const mole = document.createElement('div');
        mole.className = 'mole popup';
        mole.style.backgroundImage = `url('${this.moleImage}')`;
        hole.innerHTML = '';
        hole.appendChild(mole);
        hole.classList.remove('empty');
        const settings = this.difficultySettings[this.currentDifficulty];
        const showTime = settings.moleShowTime * Math.pow(1 - settings.speedIncrease, this.level - 1);
        this.moleTimeout = setTimeout(() => {
            this.spawnMole();
        }, showTime + settings.moleHideTime);
    }
    hitMole(e, holeIndex) {
        if (!this.gameActive || this.activeMole !== holeIndex) return;
        e.stopPropagation();
        this.molesHit++;
        this.score += 10 * this.level;
        const mole = this.holes[holeIndex].querySelector('.mole');
        if (mole) {
            mole.classList.remove('popup');
            mole.classList.add('smashed');
        }
        clearTimeout(this.moleTimeout);
        this.activeMole = null;
        this.updateScore();
        this.checkLevelUp();
        setTimeout(() => {
            if (this.gameActive) {
                this.spawnMole();
            }
        }, 300);
    }
    checkLevelUp() {
        const molesToNextLevel = 5 + (this.level - 1) * 3;
        if (this.molesHit >= molesToNextLevel) {
            this.level++;
            this.molesHit = 0;
            this.createHoles();
        }
    }
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
    }
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        clearTimeout(this.moleTimeout);
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        const statsText = `You hit ${this.molesHit} moles across ${this.level} level(s)!`;
        document.getElementById('statsText').textContent = statsText;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WhackAMoleGame();
});