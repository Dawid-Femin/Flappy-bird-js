document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 450;

    function startGame() {
        birdBottom -= gravity;
        bird.style.left = `${birdLeft}px`;
        bird.style.bottom = `${birdBottom}px`;
    }
    let gameTimerId = setInterval(startGame, 20);    

    function control(event) {
        if(event.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if(birdBottom < 490) {
            birdBottom += 50;
            bird.style.bottom = `${birdBottom}`;
        }
    }

    document.addEventListener('keydown', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.floor(Math.random()*120);
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = `${obstacleLeft}px`; 
        topObstacle.style.left = `${obstacleLeft}px`; 
        obstacle.style.bottom = `${obstacleBottom}px`;
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObsticle() {
            obstacleLeft -= 2;
            obstacle.style.left = `${obstacleLeft}px`;
            topObstacle.style.left = `${obstacleLeft}px`;

            if(obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObsticle, 20);
        if(!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        console.log('GAME OVER!');
        isGameOver = true;
        document.removeEventListener('keydown', control);
    }
})