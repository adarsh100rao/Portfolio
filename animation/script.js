const character = document.getElementById("character");
const gameContainer = document.getElementById("game-container");
const obstaclesContainer = document.getElementById("obstacles-container");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");

let isJumping = false;
let isGameOver = true;
let score = 0;
let gameSpeed = 5; // Initial pixels per frame
let obstacles = [];
let animationFrameId;
let frameCount = 0;
let lastTime = 0;

// Definitions for different obstacle types
const obstacleTypes = ['rock', 'spikes', 'tall-box', 'bird'];

function startGame() {
    isGameOver = false;
    score = 0;
    gameSpeed = 5;
    frameCount = 0;
    obstacles = [];
    
    // Reset UI
    scoreDisplay.innerText = "Score: " + score;
    gameOverScreen.style.display = "none";
    gameContainer.classList.remove("paused");
    obstaclesContainer.innerHTML = '';
    
    // Reset character animation
    character.classList.add("run");
    character.classList.remove("jump");
    
    // Important: Force a reflow to restart CSS keyframe cycle
    void character.offsetWidth;
    
    cancelAnimationFrame(animationFrameId);
    lastTime = performance.now();
    gameLoop(lastTime);
}

window.restartGame = function() {
    startGame();
};

function jump() {
    if (isJumping || isGameOver) return;
    
    isJumping = true;
    character.classList.remove("run");
    character.classList.add("jump");

    // JS jump animation handles the state restoration
    setTimeout(() => {
        if (!isGameOver) {
            character.classList.remove("jump");
            character.classList.add("run");
        }
        isJumping = false;
    }, 600); // Wait for the transition defined in CSS
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault(); // Stop window split scroll
        
        if (isGameOver && gameOverScreen.style.display === "flex") {
            restartGame();
        } else {
            jump();
        }
    }
});

gameContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (isGameOver && gameOverScreen.style.display === "flex") {
        restartGame();
    } else {
        jump();
    }
});

function spawnObstacle() {
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const el = document.createElement('div');
    el.classList.add('obstacle');
    el.classList.add(type);
    
    const startX = 800;
    el.style.left = startX + "px";
    obstaclesContainer.appendChild(el);
    
    let height, width;
    if (type === 'rock') { width = 40; height = 30; }
    else if (type === 'spikes') { width = 60; height = 40; }
    else if (type === 'tall-box') { width = 35; height = 80; }
    else if (type === 'bird') { width = 40; height = 25; }
    
    obstacles.push({
        element: el,
        x: startX,
        width: width,
        height: height,
        type: type,
        passed: false
    });
}

function updateObstacles(deltaTime) {
    // Normalise speed by time so 144Hz monitors don't run 2x as fast.
    // gameSpeed is roughly units per 16ms frame
    const speedMultiplier = Math.min(deltaTime / 16.66, 2); 
    const currentSpeed = gameSpeed * speedMultiplier;

    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        
        obs.x -= currentSpeed;
        obs.element.style.left = obs.x + "px";
        
        // Character left is 80px
        if (!obs.passed && obs.x + obs.width < 80) {
            obs.passed = true;
            score += 10;
            scoreDisplay.innerText = "Score: " + score;
            
            // Speed up progressively
            if (score % 50 === 0) {
                gameSpeed += 0.3;
            }
        }
    }
    
    // Memory fix: Remove off-screen obstacles
    if (obstacles.length > 0 && obstacles[0].x < -100) {
        let oldObs = obstacles.shift();
        if (oldObs.element.parentNode) {
            oldObs.element.parentNode.removeChild(oldObs.element);
        }
    }
}

function checkCollision() {
    const charRect = character.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();
    
    const charLeft = charRect.left - containerRect.left;
    const charRight = charLeft + charRect.width;
    const charTop = charRect.top - containerRect.top;
    const charBottom = charTop + charRect.height;

    // Small padding so tiny grazes don't kill the player
    const hitPaddingX = 8;
    const hitPaddingY = 5;

    for (let obs of obstacles) {
        const obsRect = obs.element.getBoundingClientRect();
        const obsLeft = obsRect.left - containerRect.left;
        const obsRight = obsLeft + obsRect.width;
        const obsTop = obsRect.top - containerRect.top;
        const obsBottom = obsTop + obsRect.height;
        
        // Bounding Box check
        if (charRight - hitPaddingX > obsLeft && 
            charLeft + hitPaddingX < obsRight && 
            charBottom - hitPaddingY > obsTop && 
            charTop + hitPaddingY < obsBottom) {
            return true;
        }
    }
    return false;
}

function gameLoop(timestamp) {
    if (isGameOver) return;
    
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    frameCount++;
    
    // Spawn objects probabilistically based on speed, with minimum spacing
    const minSpacingFrames = Math.max(40, 100 - (gameSpeed * 3));
    if (frameCount > minSpacingFrames) {
        if (Math.random() < 0.03) {
            spawnObstacle();
            frameCount = 0; // Reset frame count after spawn
        }
    }
    
    updateObstacles(deltaTime);
    
    if (checkCollision()) {
        gameOver();
        return; 
    }
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    isGameOver = true;
    character.classList.remove("run");
    // Don't remove jump if they crashed mid-air, it looks cool frozen!
    
    gameContainer.classList.add("paused");
    
    finalScoreDisplay.innerText = score;
    gameOverScreen.style.display = "flex";
}

// Start immediately on load
startGame();
