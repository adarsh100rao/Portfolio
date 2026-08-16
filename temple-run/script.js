// Game Variables
let scene, camera, renderer;
let clock;
let player, playerGroup;
let isPlaying = false;
let isGameOver = false;
let score = 0;
let coinsCollected = 0;
let gameSpeed = 40; // Units per second
let objects = []; // Obstacles and coins
let environmentObjects = []; // Scenery like trees/walls

// Input & Movement Variables
const LANE_WIDTH = 3.5;
let currentLane = 0; // -1 (left), 0 (center), 1 (right)
let targetX = 0;
let moveSpeed = 15; // interpolation speed for lane switching

let isJumping = false;
let isSliding = false;
let playerVelocityY = 0;
const GRAVITY = -70; // Gravity pull
const JUMP_POWER = 25; // Initial upward velocity
const SLIDE_DURATION = 800; // ms

// UI Elements
const scoreEl = document.getElementById('score');
const coinsEl = document.getElementById('coins');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('startBtn'); // Fix id
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');

function init() {
    scene = new THREE.Scene();
    // Sky/Fog to hide distant popping
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 40, 160);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    // Position camera behind and slightly above player
    camera.position.set(0, 6, 12);
    camera.lookAt(0, 2, -10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -30;
    dirLight.shadow.camera.right = 30;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -150;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    createWorld();
    createPlayer();

    window.addEventListener('resize', onWindowResize, false);
    
    // Inputs
    document.addEventListener('keydown', handleKeyDown);
    
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', resetGame);

    // Initial Render
    renderer.render(scene, camera);
}

function createTexture(color1, color2) {
    // Creates a simple checkerboard/brick texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color1;
    ctx.fillRect(0,0,128,128);
    ctx.fillStyle = color2;
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if((i+j)%2 === 0) {
                ctx.fillRect(i*32, j*32, 32, 32);
            }
        }
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
}

function createWorld() {
    // Stone Path
    const pathTex = createTexture('#7f8c8d', '#95a5a6');
    pathTex.repeat.set(3, 100);
    
    const pathGeo = new THREE.PlaneGeometry(LANE_WIDTH * 3 + 1, 1000);
    const pathMat = new THREE.MeshStandardMaterial({ map: pathTex, roughness: 0.9 });
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.z = -400;
    path.receiveShadow = true;
    scene.add(path);
    
    // Water/Lava/Grass on sides
    const sideGeo = new THREE.PlaneGeometry(200, 1000);
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 }); // Green grass
    
    const leftSide = new THREE.Mesh(sideGeo, sideMat);
    leftSide.rotation.x = -Math.PI / 2;
    leftSide.position.set(-105, -1, -400);
    leftSide.receiveShadow = true;
    scene.add(leftSide);
    
    const rightSide = new THREE.Mesh(sideGeo, sideMat);
    rightSide.rotation.x = -Math.PI / 2;
    rightSide.position.set(105, -1, -400);
    rightSide.receiveShadow = true;
    scene.add(rightSide);
    
    // Borders
    const borderGeo = new THREE.BoxGeometry(1, 2, 1000);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x34495e });
    const leftBorder = new THREE.Mesh(borderGeo, borderMat);
    leftBorder.position.set(- (LANE_WIDTH * 1.5 + 0.5), 0, -400);
    scene.add(leftBorder);
    
    const rightBorder = new THREE.Mesh(borderGeo, borderMat);
    rightBorder.position.set((LANE_WIDTH * 1.5 + 0.5), 0, -400);
    scene.add(rightBorder);
    
    // Initial scenery
    for(let i=0; i<40; i++) {
        spawnScenery(-20 - (Math.random() * 200));
    }
}

function createPlayer() {
    playerGroup = new THREE.Group();
    scene.add(playerGroup);

    // Body
    const bodyGeo = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2980b9 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.25;
    body.castShadow = true;
    playerGroup.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf3ca20 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.4;
    head.castShadow = true;
    playerGroup.add(head);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.4, 1, 0.4);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-0.25, 0.5, 0);
    legL.castShadow = true;
    playerGroup.add(legL);
    
    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(0.25, 0.5, 0);
    legR.castShadow = true;
    playerGroup.add(legR);
    
    // Arms
    const armGeo = new THREE.BoxGeometry(0.4, 1.2, 0.4);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xf3ca20 });
    
    const armL = new THREE.Mesh(armGeo, armMat);
    armL.position.set(-0.7, 1.4, 0);
    armL.castShadow = true;
    playerGroup.add(armL);
    
    const armR = new THREE.Mesh(armGeo, armMat);
    armR.position.set(0.7, 1.4, 0);
    armR.castShadow = true;
    playerGroup.add(armR);
    
    playerGroup.userData = { body, head, legL, legR, armL, armR };
}

function startGame() {
    startScreen.style.display = 'none';
    isPlaying = true;
    clock.start();
    renderer.setAnimationLoop(animate);
}

function resetGame() {
    // Clear objects
    objects.forEach(obj => scene.remove(obj.mesh));
    objects = [];
    
    score = 0;
    coinsCollected = 0;
    gameSpeed = 40;
    currentLane = 0;
    targetX = 0;
    playerGroup.position.set(0, 0, 0);
    playerGroup.scale.y = 1;
    playerGroup.rotation.z = 0;
    
    isJumping = false;
    isSliding = false;
    playerVelocityY = 0;
    
    updateScoreUI();
    
    gameOverScreen.style.display = 'none';
    isPlaying = true;
    clock.start();
}

function handleKeyDown(e) {
    if (!isPlaying || isGameOver) return;

    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        if (currentLane > -1) {
            currentLane--;
            targetX = currentLane * LANE_WIDTH;
        }
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        if (currentLane < 1) {
            currentLane++;
            targetX = currentLane * LANE_WIDTH;
        }
    } else if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        if (!isJumping && !isSliding) {
            isJumping = true;
            playerVelocityY = JUMP_POWER;
        }
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        if (!isJumping && !isSliding) {
            isSliding = true;
            // Squish the player model
            playerGroup.scale.y = 0.5;
            
            setTimeout(() => {
                if(!isGameOver) {
                    isSliding = false;
                    playerGroup.scale.y = 1;
                }
            }, SLIDE_DURATION);
        }
    }
}

let spawnTimer = 0;
function animateSpawn(delta) {
    spawnTimer += delta;
    // As game speeds up, spawn items more frequently. Also random interval
    const baseInterval = 1.2;
    const speedFactor = Math.min(gameSpeed / 100, 0.8);
    const spawnInterval = Math.max(0.4, baseInterval - speedFactor + (Math.random() * 0.4 - 0.2));
    
    if (spawnTimer > spawnInterval) {
        spawnRow();
        spawnTimer = 0;
        
        // Keep environment populated
        spawnScenery(-180);
        spawnScenery(-190);
    }
}

function spawnRow() {
    // Patterns -> 0: empty, 1: coin, 2: low obstacle, 3: high obstacle
    const patterns = [
        [1, 1, 1], [2, 0, 0], [0, 2, 0], [0, 0, 2],
        [3, 0, 0], [0, 3, 0], [0, 0, 3], [2, 2, 0],
        [0, 2, 2], [2, 0, 2], [1, 2, 1], [3, 1, 0],
        [1, 3, 1], [0, 1, 0], [1, 0, 1]
    ];
    
    const p = patterns[Math.floor(Math.random() * patterns.length)];
    
    for (let i = 0; i < 3; i++) {
        const lane = i - 1; 
        const type = p[i];
        
        // Sometimes spawn a line of coins
        if (type === 1) {
            spawnCoin(lane, 0);
            if (Math.random() > 0.5) spawnCoin(lane, 5);
            if (Math.random() > 0.7) spawnCoin(lane, 10);
        }
        else if (type === 2) spawnObstacle(lane, 'low');
        else if (type === 3) spawnObstacle(lane, 'high');
    }
}

function spawnScenery(zPos) {
    const side = Math.random() > 0.5 ? 1 : -1;
    const xPos = side * (LANE_WIDTH * 2 + 2 + Math.random() * 20);
    
    // Ancient ruins / pillars
    const type = Math.random();
    let geo, mat, mesh;
    
    if (type > 0.5) {
        geo = new THREE.CylinderGeometry(0.8, 1, 15 + Math.random()*10);
        mat = new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 1 });
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(xPos, 7.5, zPos);
    } else {
        // Tree
        geo = new THREE.ConeGeometry(3, 10, 8);
        mat = new THREE.MeshStandardMaterial({ color: 0x1e8449 });
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(xPos, 5, zPos);
        
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.5, 0.5, 2);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = -5;
        mesh.add(trunk);
    }
    
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
    environmentObjects.push(mesh);
}

function spawnCoin(lane, zOffset) {
    const geo = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2, metalness: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.y = Math.random() * Math.PI; // random start angle
    mesh.position.set(lane * LANE_WIDTH, 1, -150 + zOffset);
    mesh.castShadow = true;
    scene.add(mesh);
    
    objects.push({ mesh, type: 'coin', hit: false });
}

function spawnObstacle(lane, type) {
    let geo, mat, yPos;
    
    if (type === 'low') {
        // e.g. fallen tree or stone block
        geo = new THREE.BoxGeometry(LANE_WIDTH - 0.5, 1.2, 1.5); 
        mat = new THREE.MeshStandardMaterial({ color: 0xc0392b }); // Reddish
        yPos = 0.6;
    } else {
        // High obstacle (slide under), e.g. floating log or arch
        geo = new THREE.BoxGeometry(LANE_WIDTH - 0.2, 2, 1.5); 
        mat = new THREE.MeshStandardMaterial({ color: 0xd35400 }); // Orange
        yPos = 2.8; 
    }
    
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(lane * LANE_WIDTH, yPos, -150);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
    objects.push({ mesh, type: 'obstacle', subtype: type, hit: false });
}

function checkCollisions() {
    // Player Hitbox (Approx)
    // Z is around 0.
    
    for (let obj of objects) {
        if (obj.hit) continue;
        
        // Z range overlap
        if (obj.mesh.position.z > -1.5 && obj.mesh.position.z < 1.0) {
            
            // X overlap (Is it in the same lane?)
            let dx = Math.abs(playerGroup.position.x - obj.mesh.position.x);
            
            if (dx < LANE_WIDTH/2) {
                // Determine vertical overlap limits
                let playerTop = playerGroup.position.y + (isSliding ? 1.5 : 2.8);
                let playerBottom = playerGroup.position.y;
                
                if (obj.type === 'coin') {
                    // Check if player reaches the coin vertically
                    let coinY = obj.mesh.position.y;
                    if (playerTop >= coinY - 0.6 && playerBottom <= coinY + 0.6) {
                        obj.hit = true;
                        scene.remove(obj.mesh);
                        coinsCollected++;
                        score += 50;
                        updateScoreUI();
                    }
                } else if (obj.type === 'obstacle') {
                    let objTop = obj.mesh.position.y + (obj.subtype === 'high' ? 1 : 0.6);
                    let objBottom = obj.mesh.position.y - (obj.subtype === 'high' ? 1 : 0.6);
                    
                    if (playerBottom < objTop && playerTop > objBottom) {
                        gameOver();
                    }
                }
            }
        }
    }
}

function gameOver() {
    isPlaying = false;
    isGameOver = true;
    finalScoreEl.innerText = Math.floor(score);
    gameOverScreen.style.display = 'flex';
    renderer.setAnimationLoop(null); // stop rendering loop
}

function updateScoreUI() {
    scoreEl.innerText = Math.floor(score);
    coinsEl.innerText = coinsCollected;
}

function updateScenery(deltaDistance) {
    for (let i = environmentObjects.length - 1; i >= 0; i--) {
        let env = environmentObjects[i];
        env.position.z += deltaDistance;
        
        if (env.position.z > 50) {
            scene.remove(env);
            environmentObjects.splice(i, 1);
        }
    }
}

function animate() {
    const delta = clock.getDelta();
    
    if (isPlaying) {
        // Move player horizontally
        const diff = targetX - playerGroup.position.x;
        playerGroup.position.x += diff * moveSpeed * delta;
        
        // Tilt animation for lane switching
        playerGroup.rotation.z = -diff * 0.15;
        
        // Jump Logic
        if (isJumping) {
            playerGroup.position.y += playerVelocityY * delta;
            playerVelocityY += GRAVITY * delta;
            
            if (playerGroup.position.y <= 0) {
                playerGroup.position.y = 0;
                isJumping = false;
                playerVelocityY = 0;
            }
        }
        
        // Running animation (swinging legs and arms)
        if (!isJumping && !isSliding) {
            // Speed up run cycle if game is faster
            const runCycles = clock.getElapsedTime() * (Math.max(15, gameSpeed * 0.4));
            playerGroup.userData.legL.rotation.x = Math.sin(runCycles) * 0.8;
            playerGroup.userData.legR.rotation.x = Math.sin(runCycles + Math.PI) * 0.8;
            
            playerGroup.userData.armL.rotation.x = Math.sin(runCycles + Math.PI) * 0.8;
            playerGroup.userData.armR.rotation.x = Math.sin(runCycles) * 0.8;
        } else {
            // Freeze limbs
            playerGroup.userData.legL.rotation.x = 0;
            playerGroup.userData.legR.rotation.x = 0;
            if (isJumping) {
                playerGroup.userData.armL.rotation.x = -Math.PI;
                playerGroup.userData.armR.rotation.x = -Math.PI;
            } else {
                playerGroup.userData.armL.rotation.x = 0;
                playerGroup.userData.armR.rotation.x = 0;
            }
        }

        // Animate objects moving towards player
        const moveDist = gameSpeed * delta;
        
        // Score
        score += moveDist * 0.1;
        updateScoreUI();
        
        // Gently increase speed up to max
        if (gameSpeed < 150) {
            gameSpeed += delta * 0.8;
        }

        animateSpawn(delta);
        
        // Update gameplay objects
        for (let i = objects.length - 1; i >= 0; i--) {
            let obj = objects[i];
            obj.mesh.position.z += moveDist;
            
            if (obj.type === 'coin') {
                obj.mesh.rotation.y += delta * 5;
            }
            
            // Remove if past camera
            if (obj.mesh.position.z > 20) {
                scene.remove(obj.mesh);
                objects.splice(i, 1);
            }
        }
        
        updateScenery(moveDist);
        checkCollisions();
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start setup
init();
