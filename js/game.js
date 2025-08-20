class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Create textured backgrounds for different object types
        
        // Fish texture
        this.add.graphics()
            .fillGradientStyle(0xff6b6b, 0xff8e8e, 0xffb3b3, 0xff6b6b)
            .fillEllipse(50, 40, 60, 40)
            .lineStyle(2, 0xcc5555)
            .strokeEllipse(50, 40, 60, 40)
            .fillStyle(0x000000)
            .fillCircle(35, 35, 3) // eye
            .fillStyle(0xff8500)
            .fillTriangle(70, 40, 85, 35, 85, 45) // tail
            .generateTexture('fish-texture', 100, 80);
        
        // Tennis ball texture
        this.add.graphics()
            .fillStyle(0x90ee90)
            .fillCircle(40, 40, 35)
            .lineStyle(3, 0x228b22)
            .strokeCircle(40, 40, 35)
            .lineStyle(2, 0xffffff)
            .strokePath()
            .beginPath()
            .arc(40, 40, 25, 0, Math.PI)
            .strokePath()
            .beginPath()
            .arc(40, 40, 25, Math.PI, Math.PI * 2)
            .strokePath()
            .generateTexture('ball-texture', 80, 80);
        
        // Grass/leaf texture
        this.add.graphics()
            .fillGradientStyle(0x32cd32, 0x7cfc00, 0x9aff9a, 0x32cd32)
            .fillEllipse(30, 40, 25, 50)
            .lineStyle(2, 0x228b22)
            .strokeEllipse(30, 40, 25, 50)
            .lineStyle(1, 0x228b22)
            .lineBetween(30, 15, 30, 65) // center line
            .generateTexture('grass-texture', 60, 80);
        
        // Shrimp texture
        this.add.graphics()
            .fillGradientStyle(0xffa500, 0xffb347, 0xffc069, 0xffa500)
            .fillEllipse(50, 30, 50, 25)
            .lineStyle(2, 0xcc8400)
            .strokeEllipse(50, 30, 50, 25)
            .fillStyle(0x000000)
            .fillCircle(30, 25, 2) // eye
            .lineStyle(1, 0xcc8400)
            .lineBetween(75, 30, 85, 25) // antennae
            .lineBetween(75, 30, 85, 35)
            .generateTexture('shrimp-texture', 100, 60);
            
        // Create river background with animated water
        this.add.graphics()
            .fillGradientStyle(0x4682B4, 0x4682B4, 0x2F4F4F, 0x2F4F4F)
            .fillRect(0, 0, 1200, 800)
            .generateTexture('river-bg', 1200, 800);
            
        // Create ball-like word containers (fish bubbles)
        this.add.graphics()
            .fillStyle(0x0f3460)
            .fillCircle(75, 50, 75)
            .lineStyle(3, 0x4ade80, 0.8)
            .strokeCircle(75, 50, 75)
            .generateTexture('word-ball', 150, 100);
            
        this.add.graphics()
            .fillStyle(0x16213e)
            .fillCircle(75, 50, 75)
            .lineStyle(3, 0x60a5fa, 1)
            .strokeCircle(75, 50, 75)
            .generateTexture('word-ball-highlight', 150, 100);

        // Create duck sprite (simple emoji-style)
        this.add.graphics()
            .fillStyle(0xFFD700)
            .fillCircle(25, 20, 15)
            .fillEllipse(25, 35, 20, 25)
            .fillStyle(0xFF8C00)
            .fillTriangle(15, 20, 25, 25, 15, 30)
            .fillStyle(0x000000)
            .fillCircle(20, 18, 2)
            .generateTexture('duck', 50, 50);
    }

    create() {
        // Get reference to the main game instance
        this.typingGame = window.game;
        
        // Initialize duck size from the game instance
        this.duckSize = this.typingGame ? this.typingGame.duckSize : 40;
        
        // Create a brighter river background
        this.add.rectangle(600, 400, 1200, 800, 0x3b82f6); // Brighter blue river
        
        // Create Japanese-style grass/pipe borders
        const grassColor = 0x10b981; // Green grass color
        const pipeColor = 0x059669; // Darker green for pipes
        
        // Left border - grass with pipe-like segments
        for (let y = 0; y < 800; y += 60) {
            const grass = this.add.rectangle(30, y + 30, 60, 60, grassColor);
            grass.setStrokeStyle(3, pipeColor);
        }
        
        // Right border - grass with pipe-like segments  
        for (let y = 0; y < 800; y += 60) {
            const grass = this.add.rectangle(1170, y + 30, 60, 60, grassColor);
            grass.setStrokeStyle(3, pipeColor);
        }
        
        // Add river flow animation (moving water lines)
        this.waterLines = [];
        for (let i = 0; i < 5; i++) {
            const line = this.add.graphics();
            line.lineStyle(2, 0x60a5fa, 0.4);
            line.lineBetween(100, 150 + i * 120, 1100, 150 + i * 120);
            this.waterLines.push(line);
        }
        
        // Create the cute duck character (lying on water, facing upward)
        this.duckGroup = this.add.group();
        
        // Duck body (main ellipse lying flat on water)
        this.duck = this.add.ellipse(200, 650, this.duckSize * 1.4, this.duckSize, 0xffd700);
        this.duck.setStrokeStyle(2, 0xffa500);
        this.duckGroup.add(this.duck);
        
        // Duck head (positioned toward top of screen)
        this.duckHead = this.add.ellipse(200, 620, this.duckSize * 0.8, this.duckSize * 0.6, 0xffd700);
        this.duckHead.setStrokeStyle(2, 0xffa500);
        this.duckGroup.add(this.duckHead);
        
        // Eyes removed for top view
        
        // Orange beak pointing upward (toward top of screen)
        this.duckBeak = this.add.triangle(200, 605, 0, -this.duckSize * 0.2, this.duckSize * 0.15, this.duckSize * 0.1, -this.duckSize * 0.15, this.duckSize * 0.1, 0xff8500);
        this.duckGroup.add(this.duckBeak);
        
        // Wings (subtle, positioned on sides for swimming)
        this.duckWingLeft = this.add.ellipse(175, 645, this.duckSize * 0.15, this.duckSize * 0.4, 0xccaa00, 0.7);
        this.duckWingLeft.setStrokeStyle(1, 0xaa8800, 0.5);
        this.duckWingRight = this.add.ellipse(225, 645, this.duckSize * 0.15, this.duckSize * 0.4, 0xccaa00, 0.7);
        this.duckWingRight.setStrokeStyle(1, 0xaa8800, 0.5);
        this.duckGroup.add(this.duckWingLeft);
        this.duckGroup.add(this.duckWingRight);
        
        // Feet/paddles under water (small ovals)
        this.duckFootLeft = this.add.ellipse(190, 670, this.duckSize * 0.2, this.duckSize * 0.15, 0xff8500);
        this.duckFootRight = this.add.ellipse(210, 670, this.duckSize * 0.2, this.duckSize * 0.15, 0xff8500);
        this.duckGroup.add(this.duckFootLeft);
        this.duckGroup.add(this.duckFootRight);
        this.duckGroup.add(this.duckWingLeft);
        this.duckGroup.add(this.duckWingRight);
        
        // Water ripples around duck (paddling effect)
        this.waterRipples = [];
        for (let i = 0; i < 3; i++) {
            const ripple = this.add.circle(200, 680 + i * 15, 20 + i * 10, 0x60a5fa, 0.3);
            ripple.setStrokeStyle(2, 0x3b82f6, 0.5);
            this.waterRipples.push(ripple);
        }
        
        // Duck swimming animation - slowly moving forward with paddling
        const allDuckParts = [this.duck, this.duckHead, this.duckBeak, this.duckWingLeft, this.duckWingRight,
                             this.duckFootLeft, this.duckFootRight];
        
        this.tweens.add({
            targets: allDuckParts.concat(this.waterRipples),
            x: '+=30',
            duration: 4000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Gentle bobbing motion for the duck
        this.tweens.add({
            targets: allDuckParts,
            y: '+=8',
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Paddling animation - feet moving alternately
        this.tweens.add({
            targets: [this.duckFootLeft],
            y: '+=5',
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        this.tweens.add({
            targets: [this.duckFootRight],
            y: '+=5',
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            delay: 300 // Offset for alternating motion
        });
        
        // Wing flapping animation
        this.tweens.add({
            targets: [this.duckWingLeft, this.duckWingRight],
            scaleY: 0.8,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Water ripple animation (paddling effect)
        this.waterRipples.forEach((ripple, index) => {
            this.tweens.add({
                targets: ripple,
                alpha: 0.1,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 1000 + index * 200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        
        // Create obstacle ducks (smaller, different colors)
        this.obstacleDucks = [];
        for (let i = 0; i < 2; i++) {
            const obstacleX = 400 + i * 400;
            const obstacleY = 500 + Math.random() * 100;
            
            const obstacleDuck = this.add.circle(obstacleX, obstacleY, 25, 0xff6b6b);
            obstacleDuck.setStrokeStyle(2, 0xcc5555);
            
            // Add simple eyes
            const eyeL = this.add.circle(obstacleX - 8, obstacleY - 5, 3, 0xffffff);
            const eyeR = this.add.circle(obstacleX + 8, obstacleY - 5, 3, 0xffffff);
            const pupilL = this.add.circle(obstacleX - 8, obstacleY - 7, 1.5, 0x000000);
            const pupilR = this.add.circle(obstacleX + 8, obstacleY - 7, 1.5, 0x000000);
            
            // Add beak
            const beak = this.add.triangle(obstacleX, obstacleY + 5, 0, 0, 6, 3, 6, -3, 0xff8500);
            
            const duckGroup = [obstacleDuck, eyeL, eyeR, pupilL, pupilR, beak];
            this.obstacleDucks.push({ parts: duckGroup, x: obstacleX, y: obstacleY });
            
            // Swimming animation for obstacle ducks
            this.tweens.add({
                targets: duckGroup,
                x: `+=${20 + Math.random() * 20}`,
                duration: 3000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Create input display above the duck
        this.typingGame.inputDisplay = this.add.text(600, 580, '', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: 'rgba(15, 52, 96, 0.8)',
            padding: { x: 20, y: 10 },
            borderRadius: 8
        }).setOrigin(0.5);

        // Create falling words group
        this.typingGame.fallingWordsGroup = this.add.group();
        
        // Instructions (removed welcome text - using modal instead)
        this.typingGame.instructionText = null;

        this.typingGame.updateInputDisplay();
        
        // Animate water flow
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.waterLines.forEach((line, index) => {
                    line.x -= 2;
                    if (line.x <= -50) {
                        line.x = 0;
                    }
                });
            },
            loop: true
        });
    }

    update(time, delta) {
        if (this.typingGame) {
            this.typingGame.update(time, delta);
        }
    }
}

class TypingGame {
    constructor() {
        this.config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 800,
            parent: 'game-canvas',
            backgroundColor: '#4682B4',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: GameScene
        };

        this.words = [];
        this.filteredWords = [];
        this.fallingWords = [];
        this.clearedWords = [];
        this.currentInput = '';
        this.score = 0;
        this.gameStarted = false;
        this.isPaused = false;
        this.startTime = 0;
        this.wordsTyped = 0;
        this.wordSpawnTimer = 0;
        this.wordSpawnInterval = 2000; // Start with 2 seconds
        this.baseSpeed = 30; // Much slower base falling speed
        this.currentSpeed = 30;
        this.maxSpeed = 60; // Cap speed around 50 WPM equivalent
        this.speedLevel = 1;
        this.missedWords = 0;
        this.maxMissedWords = 10;
        this.countdownActive = false;
        this.countdownStarted = false;
        this.duckSize = 40; // Starting duck size
        this.gameOverTime = null;
        this.gameOverDelay = 30000; // 30 seconds after first miss
        this.scene = null;
        
        // Initialize high score display
        const currentHighScore = parseInt(localStorage.getItem('typingDuckHighScore') || '0');
        document.getElementById('high-score').textContent = currentHighScore;
        
        // Display customization settings
        this.displaySettings = {
            cardSize: 1,
            charColor: '#ffffff',
            engColor: '#9ca3af',
            cardColor: '#0f3460'
        };
        
        // Tone mode setting
        this.tonelessMode = false;
        
        this.game = new Phaser.Game(this.config);
        this.loadWords().then(() => {
            // Words loaded, game ready
        });
        this.setupEventListeners();
    }

    async loadWords() {
        try {
            const response = await fetch('data/words.json');
            this.words = await response.json();
            this.filteredWords = [...this.words];
            
            // Add previously typed words from localStorage
            this.addPreviouslyTypedWords();
            
            this.updateStats();
        } catch (error) {
            console.error('Error loading words:', error);
            // Fallback data if file doesn't load
            this.words = [
                { char: "鴨", lshk: "aap3", eng: "duck", labels: ["animal"] },
                { char: "狗", lshk: "gau2", eng: "dog", labels: ["animal"] },
                { char: "貓", lshk: "maau1", eng: "cat", labels: ["animal"] }
            ];
            this.filteredWords = [...this.words];
            
            // Add previously typed words from localStorage even for fallback
            this.addPreviouslyTypedWords();
        }
    }
    
    addPreviouslyTypedWords() {
        const wordHistory = JSON.parse(localStorage.getItem('typingDuckWordHistory') || '[]');
        for (const historyWord of wordHistory) {
            // Check if this word is already in the main word list
            const existsInMain = this.filteredWords.some(word => word.char === historyWord.char);
            if (!existsInMain) {
                // Add the word from history to the available words
                this.filteredWords.push({
                    char: historyWord.char,
                    lshk: historyWord.lshk,
                    eng: historyWord.eng,
                    labels: ['Previously Typed'],
                    isFromHistory: true
                });
            }
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (!this.gameStarted || this.isPaused) return;
            
            const key = event.key.toLowerCase();
            
            if (key === 'backspace') {
                event.preventDefault();
                this.currentInput = this.currentInput.slice(0, -1);
                this.updateInputDisplay();
                this.highlightMatchingWords();
            } else if (key.length === 1 && /[a-z0-9 ]/.test(key)) { // Allow spaces for multi-syllable words
                event.preventDefault();
                this.currentInput += key;
                this.updateInputDisplay();
                this.highlightMatchingWords();
                // Check for instant match after each keystroke
                this.checkWordInstant();
            }
        });
    }

    updateDisplaySettings() {
        this.displaySettings = {
            cardSize: parseFloat(document.getElementById('card-size').value),
            charColor: document.getElementById('char-color').value,
            engColor: document.getElementById('eng-color').value,
            cardColor: document.getElementById('card-color').value
        };
        
        // Update existing words
        if (this.fallingWordsGroup) {
            this.fallingWordsGroup.children.entries.forEach(wordSprite => {
                this.updateWordAppearance(wordSprite);
            });
        }
    }

    updateWordAppearance(wordSprite) {
        if (!wordSprite.charText || !wordSprite.engText) return;
        
        // Get size multiplier from the word sprite (default to 1 if not set)
        const sizeMultiplier = wordSprite.sizeMultiplier || 1;
        
        // Update scale
        wordSprite.setScale(this.displaySettings.cardSize);
        
        // Update colors
        wordSprite.charText.setFill(this.displaySettings.charColor);
        wordSprite.engText.setFill(this.displaySettings.engColor);
        
        // Update background color would require regenerating texture
        // For now, we'll keep the original ball design
    }

    update(time, delta) {
        if (!this.gameStarted || this.isPaused || !this.fallingWordsGroup) return;

        // Check for game over conditions
        if (this.missedWords >= this.maxMissedWords) {
            this.endGame('You missed too many words!');
            return;
        }
        
        if (this.gameOverTime && Date.now() > this.gameOverTime) {
            this.endGame('Time\'s up! Great effort surviving after missing words!');
            return;
        }

        // Spawn new words
        this.wordSpawnTimer += delta;
        if (this.wordSpawnTimer >= this.wordSpawnInterval && this.filteredWords.length > 0) {
            this.spawnWord();
            this.wordSpawnTimer = 0;
        }

        // Update speed based on time (increase every 20 seconds, more gradually)
        const elapsedSeconds = (Date.now() - this.startTime) / 1000;
        const newSpeedLevel = Math.floor(elapsedSeconds / 20) + 1;
        if (newSpeedLevel !== this.speedLevel) {
            this.speedLevel = newSpeedLevel;
            // More gradual speed increase with cap
            this.currentSpeed = Math.min(this.maxSpeed, this.baseSpeed + (this.speedLevel - 1) * 4);
            this.wordSpawnInterval = Math.max(1200, 2000 - (this.speedLevel - 1) * 150);
        }

        // Move falling words down
        const wordsToCheck = [...this.fallingWordsGroup.children.entries];
        wordsToCheck.forEach(wordSprite => {
            if (!wordSprite.active) return; // Skip destroyed words
            
            // Use individual speed multiplier for different shapes
            const speedMultiplier = wordSprite.baseSpeed || 1;
            wordSprite.y += this.currentSpeed * speedMultiplier * (delta / 1000);
            
            // Check collision with main duck (game over if word hits duck)
            const scene = this.game.scene.getScene('GameScene');
            if (scene && scene.duck) {
                const duckX = scene.duck.x;
                const duckY = scene.duck.y;
                const distance = Math.sqrt((wordSprite.x - duckX) ** 2 + (wordSprite.y - duckY) ** 2);
                
                if (distance < 60) { // Collision threshold
                    this.endGame('鴨撞字！The duck hit Word!');
                    return;
                }
            }
            
            // Check collision with obstacle ducks
            if (scene && scene.obstacleDucks) {
                for (let obstacleDuck of scene.obstacleDucks) {
                    const distance = Math.sqrt((wordSprite.x - obstacleDuck.x) ** 2 + (wordSprite.y - obstacleDuck.y) ** 2);
                    if (distance < 50) {
                        this.endGame('字撞鴨！Word hit a duckling!');
                        return;
                    }
                }
            }
            
            // Remove words that fall off screen (missed words)
            if (wordSprite.y > 850) {
                this.missWord(wordSprite);
            }
        });

        this.updateStats();
    }

    missWord(wordSprite) {
        this.missedWords++;
        
        // Start countdown on 3 missed words
        if (this.missedWords === 3 && !this.countdownStarted) {
            this.startCountdown();
        }
        
        // Start game over timer on first miss
        if (this.missedWords === 1) {
            this.gameOverTime = Date.now() + this.gameOverDelay;
        }
        
        this.removeWord(wordSprite);
        this.updateStats();
    }

    startCountdown() {
        this.countdownStarted = true;
        this.countdownActive = true;
        this.gameOverTime = Date.now() + 10000; // 10 second countdown
        
        const scene = this.game.scene.getScene('GameScene');
        if (scene) {
            // Create countdown display
            this.countdownText = scene.add.text(600, 200, '10', {
                fontSize: '72px',
                fill: '#ef4444',
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            // Countdown animation
            this.countdownInterval = setInterval(() => {
                const remaining = Math.ceil((this.gameOverTime - Date.now()) / 1000);
                if (remaining <= 0) {
                    clearInterval(this.countdownInterval);
                    this.countdownText.destroy();
                    this.endGame('夠鐘！Time\'s up!');
                } else {
                    this.countdownText.setText(remaining.toString());
                    // Flash effect
                    scene.tweens.add({
                        targets: this.countdownText,
                        scale: 1.2,
                        duration: 100,
                        yoyo: true
                    });
                }
            }, 1000);
        }
    }

    endGame(message) {
        this.gameStarted = false;
        this.isPaused = false;
        
        // Show game over overlay
        const overlay = document.getElementById('game-over-overlay');
        const messageEl = document.getElementById('game-over-message');
        const statsEl = document.getElementById('final-stats');
        
        messageEl.textContent = message;
        
        const elapsedTime = this.formatTime((Date.now() - this.startTime) / 1000);
        const wpm = this.calculateWPM();
        
        statsEl.innerHTML = `
            <p><strong>Final Score:</strong> ${this.score}</p>
            <p><strong>Words Cleared:</strong> ${this.clearedWords.length}</p>
            <p><strong>Words Missed:</strong> ${this.missedWords}</p>
            <p><strong>Speed Level Reached:</strong> ${this.speedLevel}</p>
            <p><strong>WPM:</strong> ${wpm}</p>
            <p><strong>Total Time:</strong> ${elapsedTime}</p>
        `;
        
        overlay.style.display = 'flex';
        
        // Don't re-enable start buttons immediately - let user decide when to start again
        // They can click "Play Again" from the game over screen
    }

    spawnWord() {
        if (this.filteredWords.length === 0) return;
        
        // Get the scene instance
        const scene = this.game.scene.getScene('GameScene');
        if (!scene || !this.fallingWordsGroup) return;

        const randomWord = this.filteredWords[Math.floor(Math.random() * this.filteredWords.length)];
        const x = Math.random() * (1200 - 150) + 75; // Keep within screen bounds
        const y = -100;

        // Calculate word complexity for size and speed adjustments
        const lshkLength = randomWord.lshk.replace(/\s/g, '').length; // Length without spaces
        const syllableCount = randomWord.lshk.split(' ').length; // Number of syllables
        const engLength = randomWord.eng.length; // English translation length
        
        // Determine complexity level
        const complexityScore = lshkLength + syllableCount * 2 + Math.floor(engLength / 10);
        let sizeMultiplier = 1;
        let speedMultiplier = 1;
        
        if (complexityScore >= 8) {
            // Very complex words: much bigger and slower
            sizeMultiplier = 1.6;
            speedMultiplier = 0.4;
        } else if (complexityScore >= 6) {
            // Complex words: bigger and slower
            sizeMultiplier = 1.4;
            speedMultiplier = 0.6;
        } else if (complexityScore >= 4) {
            // Medium words: slightly bigger and slower
            sizeMultiplier = 1.2;
            speedMultiplier = 0.8;
        }

        // Create word sprite with varied designs
        const wordSprite = scene.add.container(x, y);
        
        // Choose random shape and color theme
        const shapeTypes = ['bubble', 'fish', 'shrimp', 'ball', 'grass'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        let bgImage;
        let baseSpeed = speedMultiplier; // Use calculated speed multiplier
        
        if (shapeType === 'fish') {
            baseSpeed = speedMultiplier * 1.5;
            bgImage = scene.add.image(0, 0, 'fish-texture');
            bgImage.setScale(1.3 * sizeMultiplier); // Apply size multiplier
        } else if (shapeType === 'shrimp') {
            baseSpeed = speedMultiplier * 1.5;
            bgImage = scene.add.image(0, 0, 'shrimp-texture');
            bgImage.setScale(1.3 * sizeMultiplier); // Apply size multiplier
        } else if (shapeType === 'ball') {
            bgImage = scene.add.image(0, 0, 'ball-texture');
            bgImage.setScale(1.3 * sizeMultiplier); // Apply size multiplier
        } else if (shapeType === 'grass') {
            bgImage = scene.add.image(0, 0, 'grass-texture');
            bgImage.setScale(1.3 * sizeMultiplier); // Apply size multiplier
        } else {
            // Default bubble style with bright, non-transparent colors
            const bubbleSize = 55 * sizeMultiplier; // Apply size multiplier to bubble
            const bgOuter = scene.add.circle(0, 0, bubbleSize, 0xff6b35, 1.0); // Orange, fully opaque, bigger
            const bgMiddle = scene.add.circle(0, 0, bubbleSize * 0.76, 0xff8c42, 1.0); // Lighter orange
            const bgInner = scene.add.circle(0, 0, bubbleSize * 0.64, 0xffad5a, 1.0); // Even lighter orange
            const shine1 = scene.add.circle(-15 * sizeMultiplier, -15 * sizeMultiplier, 10 * sizeMultiplier, 0xffffff, 0.9);
            const shine2 = scene.add.circle(-10 * sizeMultiplier, -18 * sizeMultiplier, 5 * sizeMultiplier, 0xffffff, 1.0);
            bgOuter.setStrokeStyle(2, 0xd4540a, 1.0); // Dark orange border
            
            wordSprite.add([bgOuter, bgMiddle, bgInner, shine1, shine2]);
            wordSprite.bgOuter = bgOuter; // For highlighting
        }
        
        if (bgImage) {
            wordSprite.add(bgImage);
            wordSprite.bgOuter = bgImage; // For highlighting
        }
        
        // Store the speed multiplier for this word sprite
        wordSprite.baseSpeed = baseSpeed;
        
        // Floating animation for the bubble
        scene.tweens.add({
            targets: wordSprite,
            x: x + (Math.random() - 0.5) * 20,
            duration: 2000 + Math.random() * 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Chinese character (with better contrast and readability)
        const charFontSize = Math.floor(28 * this.displaySettings.cardSize * sizeMultiplier);
        const charText = scene.add.text(0, -12 * sizeMultiplier, randomWord.char, {
            fontSize: charFontSize + 'px',
            fill: '#000000',
            fontWeight: 'bold',
            lineSpacing: -5,
            stroke: '#ffffff',
            strokeThickness: 5
        }).setOrigin(0.5);
        wordSprite.add(charText);
        
        // English translation with line breaks (replace commas with newlines)
        const engWithLineBreaks = randomWord.eng.replace(/,\s*/g, '\n');
        const engFontSize = Math.floor(12 * this.displaySettings.cardSize * sizeMultiplier);
        const engText = scene.add.text(0, 18 * sizeMultiplier, engWithLineBreaks, {
            fontSize: engFontSize + 'px',
            fill: '#000000',
            lineSpacing: -2,
            stroke: '#ffffff',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);
        wordSprite.add(engText);

        // Store word data and references
        wordSprite.wordData = randomWord;
        wordSprite.charText = charText;
        wordSprite.engText = engText;
        wordSprite.isHighlighted = false;
        wordSprite.sizeMultiplier = sizeMultiplier; // Store for reference
        
        // Apply current scale
        wordSprite.setScale(this.displaySettings.cardSize);

        // Add floating animation
        scene.tweens.add({
            targets: wordSprite,
            angle: '+=5',
            duration: 2000 + Math.random() * 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.fallingWordsGroup.add(wordSprite);
    }

    updateInputDisplay() {
        if (this.inputDisplay) {
            this.inputDisplay.setText(`${this.currentInput}`);
        }
    }

    highlightMatchingWords() {
        if (!this.fallingWordsGroup) return;
        
        let currentTarget = null;
        const wordsToCheck = [...this.fallingWordsGroup.children.entries];
        
        wordsToCheck.forEach(wordSprite => {
            if (!wordSprite.active) return; // Skip destroyed words
            
            // Remove spaces from input for comparison
            const inputNoSpaces = this.currentInput.replace(/\s+/g, '').toLowerCase();
            let targetLshk = wordSprite.wordData.lshk.toLowerCase();
            const targetNoSpaces = targetLshk.replace(/\s+/g, '');
            
            let matches = false;
            if (this.tonelessMode) {
                const inputToneless = inputNoSpaces.replace(/\d/g, '');
                const targetToneless = targetNoSpaces.replace(/\d/g, '');
                matches = targetToneless.startsWith(inputToneless) && inputToneless.length > 0;
            } else {
                matches = targetNoSpaces.startsWith(inputNoSpaces) && inputNoSpaces.length > 0;
            }
            
            if (matches) {
                if (!currentTarget) {
                    currentTarget = wordSprite; // First matching word becomes target
                }
                
                if (!wordSprite.isHighlighted) {
                    // Highlight by changing fill color to green
                    if (wordSprite.bgOuter) {
                        try {
                            if (wordSprite.bgOuter.setFillStyle) {
                                wordSprite.bgOuter.setFillStyle(0x10b981);
                            } else {
                                wordSprite.bgOuter.fillColor = 0x10b981;
                            }
                        } catch (e) {
                            console.log('Highlight method not available:', e);
                        }
                    }
                    wordSprite.isHighlighted = true;
                }
            } else {
                if (wordSprite.isHighlighted) {
                    // Remove highlight by restoring original blue color
                    if (wordSprite.bgOuter) {
                        try {
                            if (wordSprite.bgOuter.setFillStyle) {
                                wordSprite.bgOuter.setFillStyle(0x3b82f6);
                            } else {
                                wordSprite.bgOuter.fillColor = 0x3b82f6;
                            }
                        } catch (e) {
                            console.log('Unhighlight method not available:', e);
                        }
                    }
                    wordSprite.isHighlighted = false;
                }
            }
        });
        
        // Move duck to the currently targeted word
        if (currentTarget) {
            this.moveDuckToTarget(currentTarget);
        }
    }
    
    moveDuckToTarget(targetWord) {
        const scene = this.game.scene.getScene('GameScene');
        if (!scene || !scene.duckGroup) return;
        
        const targetX = targetWord.x;
        const duckCurrentX = scene.duckGroup.x;
        
        // Only move if the target is significantly different from current position
        if (Math.abs(targetX - duckCurrentX) > 10) {
            scene.tweens.killTweensOf(scene.duckGroup);
            
            scene.tweens.add({
                targets: scene.duckGroup,
                x: targetX,
                duration: 300,
                ease: 'Power2.Out'
            });
        }
    }

    checkWordInstant() {
        if (this.currentInput.length === 0 || !this.fallingWordsGroup) return;

        // Remove spaces from input for comparison
        const inputNoSpaces = this.currentInput.replace(/\s+/g, '');
        
        // Find exact match
        const matchingWord = [...this.fallingWordsGroup.children.entries].find(wordSprite => {
            if (!wordSprite.active) return false; // Skip destroyed words
            
            let targetLshk = wordSprite.wordData.lshk.toLowerCase();
            
            // Remove spaces from target for comparison
            const targetNoSpaces = targetLshk.replace(/\s+/g, '');
            
            // If in toneless mode, remove tone numbers
            if (this.tonelessMode) {
                const inputToneless = inputNoSpaces.replace(/\d/g, '');
                const targetToneless = targetNoSpaces.replace(/\d/g, '');
                return targetToneless === inputToneless;
            }
            
            return targetNoSpaces === inputNoSpaces;
        });

        if (matchingWord) {
            // Word cleared instantly!
            this.clearWord(matchingWord);
            this.currentInput = '';
            this.updateInputDisplay();
        }
    }

    checkWord() {
        if (this.currentInput.length === 0 || !this.fallingWordsGroup) return;

        // Remove spaces from input for comparison
        const inputNoSpaces = this.currentInput.replace(/\s+/g, '');
        
        // Find exact match
        const matchingWord = [...this.fallingWordsGroup.children.entries].find(wordSprite => {
            if (!wordSprite.active) return false; // Skip destroyed words
            
            let targetLshk = wordSprite.wordData.lshk.toLowerCase();
            
            // Remove spaces from target for comparison
            const targetNoSpaces = targetLshk.replace(/\s+/g, '');
            
            // If in toneless mode, remove tone numbers
            if (this.tonelessMode) {
                const inputToneless = inputNoSpaces.replace(/\d/g, '');
                const targetToneless = targetNoSpaces.replace(/\d/g, '');
                return targetToneless === inputToneless;
            }
            
            return targetNoSpaces === inputNoSpaces;
        });

        if (matchingWord) {
            // Word cleared!
            this.clearWord(matchingWord);
            this.currentInput = '';
            this.updateInputDisplay();
        }
    }

    clearWord(wordSprite) {
        // Add to cleared words
        this.clearedWords.push(wordSprite.wordData);
        this.score += 10 + (this.speedLevel * 5); // Bonus points for higher speed levels
        this.wordsTyped++;
        
        // Grow the duck!
        this.growDuck();
        
        // Save to localStorage for word history
        this.saveWordToHistory(wordSprite.wordData);
        
        // Show success effect
        const scene = this.game.scene.getScene('GameScene');
        if (scene) {
            // Create a brief flash effect
            const flash = scene.add.circle(wordSprite.x, wordSprite.y, 50, 0x4ade80, 0.7);
            scene.tweens.add({
                targets: flash,
                alpha: 0,
                scale: 2,
                duration: 300,
                onComplete: () => flash.destroy()
            });
        }
        
        // Remove from falling words
        this.removeWord(wordSprite);
        
        // Update UI
        this.updateClearedWordsList();
        this.updateStats();
    }

    growDuck() {
        this.duckSize = Math.min(this.duckSize + 4, 80); // Faster growth: increased from 2 to 4
        const scene = this.game.scene.getScene('GameScene');
        if (scene && scene.duck) {
            const scale = this.duckSize / 40;
            
            // Get duck parts for scaling (removed eyes for top view)
            const allDuckParts = [scene.duck, scene.duckHead, scene.duckBeak, scene.duckWingLeft, scene.duckWingRight,
                                 scene.duckFootLeft, scene.duckFootRight];
            
            // Animate entire duck growth with bounce effect
            scene.tweens.add({
                targets: allDuckParts,
                scaleX: scale,
                scaleY: scale,
                duration: 300,
                ease: 'Back.easeOut'
            });
            
            // Also scale the water ripples
            if (scene.waterRipples) {
                scene.tweens.add({
                    targets: scene.waterRipples,
                    scaleX: scale * 0.8,
                    scaleY: scale * 0.8,
                    duration: 300,
                    ease: 'Back.easeOut'
                });
            }
        }
    }

    saveWordToHistory(wordData) {
        let wordHistory = JSON.parse(localStorage.getItem('typingDuckWordHistory') || '[]');
        const existingWord = wordHistory.find(w => w.char === wordData.char);
        
        if (existingWord) {
            existingWord.count++;
            existingWord.lastTyped = Date.now();
        } else {
            wordHistory.push({
                char: wordData.char,
                lshk: wordData.lshk,
                eng: wordData.eng,
                count: 1,
                firstTyped: Date.now(),
                lastTyped: Date.now()
            });
        }
        
        localStorage.setItem('typingDuckWordHistory', JSON.stringify(wordHistory));
    }

    removeWord(wordSprite) {
        wordSprite.destroy();
    }

    updateClearedWordsList() {
        const clearedWordsDiv = document.getElementById('cleared-words');
        clearedWordsDiv.innerHTML = '';
        
        // Show last 15 cleared words
        const recentWords = this.clearedWords.slice(-15).reverse();
        
        recentWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'cleared-word';
            
            // Add line breaks to English translation
            const engWithLineBreaks = word.eng.replace(/,\s*/g, '<br>');
            
            wordDiv.innerHTML = `
                <div class="char">
                    <a href="https://words.hk/zidin/${word.char}" target="_blank" style="color: inherit; text-decoration: none;">
                        ${word.char}
                    </a>
                </div>
                <div class="pronunciation">${word.lshk}</div>
                <div class="eng">${engWithLineBreaks}</div>
            `;
            clearedWordsDiv.appendChild(wordDiv);
        });
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    calculateWPM() {
        if (this.gameStarted && this.startTime) {
            const elapsedMinutes = (Date.now() - this.startTime) / (1000 * 60);
            return elapsedMinutes > 0 ? Math.round(this.wordsTyped / elapsedMinutes) : 0;
        }
        return 0;
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('words-cleared').textContent = this.clearedWords.length;
        document.getElementById('missed-words').textContent = this.missedWords;
        document.getElementById('speed-level').textContent = this.speedLevel;
        document.getElementById('wpm').textContent = this.calculateWPM();
        
        // Update high score
        const currentHighScore = parseInt(localStorage.getItem('typingDuckHighScore') || '0');
        if (this.score > currentHighScore) {
            localStorage.setItem('typingDuckHighScore', this.score.toString());
        }
        document.getElementById('high-score').textContent = Math.max(this.score, currentHighScore);
        
        // Update word pool status
        const totalWordsElement = document.getElementById('total-words-count');
        const historyWordsElement = document.getElementById('history-words-count');
        
        if (totalWordsElement) {
            totalWordsElement.textContent = this.filteredWords.length;
        }
        
        if (historyWordsElement) {
            const historyWordsCount = this.filteredWords.filter(word => word.isFromHistory).length;
            historyWordsElement.textContent = historyWordsCount;
        }
        
        // Update game time
        if (this.gameStarted && this.startTime) {
            const elapsedSeconds = (Date.now() - this.startTime) / 1000;
            document.getElementById('game-time').textContent = this.formatTime(elapsedSeconds);
        }
    }

    applyFilters() {
        const regexFilter = document.getElementById('word-filter').value.trim();
        const labelFilter = document.getElementById('label-filter').value.trim();
        
        // Start with the original word list and add previously typed words
        let filtered = [...this.words];
        
        // Add previously typed words from localStorage
        const wordHistory = JSON.parse(localStorage.getItem('typingDuckWordHistory') || '[]');
        for (const historyWord of wordHistory) {
            // Check if this word is already in the main word list
            const existsInMain = filtered.some(word => word.char === historyWord.char);
            if (!existsInMain) {
                // Add the word from history to the available words
                filtered.push({
                    char: historyWord.char,
                    lshk: historyWord.lshk,
                    eng: historyWord.eng,
                    labels: ['Previously Typed'],
                    isFromHistory: true
                });
            }
        }
        
        // Apply regex filter
        if (regexFilter) {
            try {
                const regex = new RegExp(regexFilter, 'i');
                filtered = filtered.filter(word => 
                    regex.test(word.char) || 
                    regex.test(word.lshk) || 
                    regex.test(word.eng)
                );
            } catch (e) {
                console.error('Invalid regex pattern');
                return;
            }
        }
        
        // Apply label filter
        if (labelFilter) {
            const labels = labelFilter.split(',').map(l => l.trim().toLowerCase());
            filtered = filtered.filter(word => 
                word.labels && word.labels.some(label => 
                    labels.some(filterLabel => label.toLowerCase().includes(filterLabel))
                )
            );
        }
        
        this.filteredWords = filtered;
        this.updateStats();
    }

    resetFilters() {
        document.getElementById('word-filter').value = '';
        document.getElementById('label-filter').value = '';
        
        // Reset to original words plus previously typed words
        let resetWords = [...this.words];
        
        // Add previously typed words from localStorage
        const wordHistory = JSON.parse(localStorage.getItem('typingDuckWordHistory') || '[]');
        for (const historyWord of wordHistory) {
            // Check if this word is already in the main word list
            const existsInMain = resetWords.some(word => word.char === historyWord.char);
            if (!existsInMain) {
                // Add the word from history to the available words
                resetWords.push({
                    char: historyWord.char,
                    lshk: historyWord.lshk,
                    eng: historyWord.eng,
                    labels: ['Previously Typed'],
                    isFromHistory: true
                });
            }
        }
        
        this.filteredWords = resetWords;
        this.updateStats();
    }

    startGame() {
        if (this.filteredWords.length === 0) {
            console.log('No words available! Please check your filters.');
            return;
        }
        
        if (!this.fallingWordsGroup) {
            console.log('Game not ready yet! Please wait a moment and try again.');
            return;
        }
        
        this.gameStarted = true;
        this.isPaused = false;
        this.startTime = Date.now();
        this.score = 0;
        this.wordsTyped = 0;
        this.clearedWords = [];
        this.missedWords = 0;
        this.speedLevel = 1;
        this.currentSpeed = this.baseSpeed;
        this.wordSpawnInterval = 2000;
        this.wordSpawnTimer = 0; // Reset spawn timer
        this.gameOverTime = null;
        this.countdownActive = false;
        this.countdownStarted = false;
        this.duckSize = 40; // Reset duck size
        this.currentInput = '';
        
        // Clear existing falling words
        this.fallingWordsGroup.children.entries.forEach(word => word.destroy());
        
        // Clear instructions
        if (this.instructionText) {
            this.instructionText.destroy();
            this.instructionText = null;
        }
        
        // Hide game over overlay
        document.getElementById('game-over-overlay').style.display = 'none';
        
        this.updateInputDisplay();
        this.updateClearedWordsList();
        this.updateStats();
    }

    pauseGame() {
        if (!this.gameStarted) {
            console.log('Game not started yet!');
            return;
        }
        
        this.isPaused = !this.isPaused;
    }

    resetGame() {
        this.gameStarted = false;
        this.isPaused = false;
        this.startTime = 0;
        this.score = 0;
        this.wordsTyped = 0;
        this.clearedWords = [];
        this.missedWords = 0;
        this.speedLevel = 1;
        this.currentSpeed = this.baseSpeed;
        this.wordSpawnInterval = 2000;
        this.gameOverTime = null;
        this.countdownActive = false;
        this.countdownStarted = false;
        this.duckSize = 40; // Reset duck size
        this.currentInput = '';
        
        // Clear existing falling words
        if (this.fallingWordsGroup) {
            this.fallingWordsGroup.children.entries.forEach(word => word.destroy());
        }
        
        // Hide game over overlay
        document.getElementById('game-over-overlay').style.display = 'none';
        
        // Show start game modal again
        if (typeof enableStartButtons === 'function') {
            enableStartButtons();
        }
        
        // Recreate instructions
        const scene = this.game.scene.getScene('GameScene');
        if (scene && !this.instructionText) {
            // Instructions removed - using HTML modal instead
            this.instructionText = null;
        }
        
        this.updateInputDisplay();
        this.updateClearedWordsList();
        this.updateStats();
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    window.game = new TypingGame();
});
