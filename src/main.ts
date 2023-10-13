//purposely bad code so students can fix it - can make it worse

import './style.css'

const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const bird = document.getElementById("bird")

const scoreText = document.getElementById("scoreText")
let score = 0
setText("click to start!")


let speed = 2.5; // Initial speed of obstacles
let speedIncrement = 100; // Speed increment over time
let speedInterval = 10000000; // Interval to increase spee


var isJumping = false
let gameOver = true
let animationFrame: number | null = null;

document.addEventListener('mousedown', () => jump()) // Change 'click' to 'mousedown'


setInterval(function () { Main()}, 10)

function Main()
{
    if(gameOver == false)
    {
        score = score + 1;
        setText("Score: " + score)

        if (score % speedInterval === 0) {
            speed += speedIncrement;
        }      
        if (cactus && bird) {
            cactus.style.animationDuration = speed + 's';
            bird.style.animationDuration = (speed * 1.5) + 's';
          }
        CheckGameOver()
    }
}


function jump()
{
    if(gameOver === false)
    {
        if(isJumping == false)
        {
            isJumping = true
            dino?.classList.add("jump")
            setTimeout(RemoveJump, 500)
        }
    }
    else
    {
        startGame();
    }
    
}


function RemoveJump()
{
    dino?.classList.remove("jump")
    isJumping = false;
    //mainLoop = mainLoop //bug fix?
}

function RemoveObstacles()
{
    cactus?.classList.remove("cactusMove")
    bird?.classList.remove("birdMove")
}


function CheckGameOver()
{

    if(gameOver == false && dino != null && cactus != null && bird != null)
    {
        //get is dinosaur jumping
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

        //get cactus position
        let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        //get bird position
        let birdleft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"))

        //detect cactus collision
        if(dinoTop >= 150 && Math.abs(cactusleft) < 7)
        {
            //end game
            console.log("player died!")
            setText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus
            RemoveObstacles()
        }

        //detect bird collision
        if(dinoTop <= 55 && Math.abs(birdleft) < 11)
        {
            //end game
            console.log("player died!")
            setText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus
            RemoveObstacles()
        }
    }
}


function startGame()
{
    console.log("Game started!")
    gameOver = false
    score = 0
    cactus?.classList.add("cactusMove")
    bird?.classList.add("birdMove")
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameOver) {
        score += 1;
        setText("Score: " + score);
        CheckGameOver();
        animationFrame = requestAnimationFrame(gameLoop);
    }
}

function setText(s: string)
{
    if(scoreText)
    {
        scoreText.textContent = s
    }
}

// Initial call to start the game
startGame();

// Add an event listener to restart the game when the player clicks
document.addEventListener('mousedown', () => {
    if (gameOver) {
        startGame();
    }
});

// Add an event listener to pause the game when the player clicks
document.addEventListener('mousedown', () => {
    if (!gameOver) {
        cancelAnimationFrame(animationFrame!);
    }
});