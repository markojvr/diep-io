let movementSpeed = 3;
let startingHealth = 10;
let bulletSpeed = 10;
let reloadSpeed = 600;

const IDs = [];
let gamePlaying = false;
let Top = 300;
let enemyTop = 300;
let enemyHealth = startingHealth;
let health = startingHealth;

function playerOneController() {
    let mode = "up";
    const bullets = [];
    let reloading = false;
    function gameLoop() {
        setTimeout(function () {
            if (gamePlaying === true) {
                gameLoop();
            }
        }, 10);
        if (mode === "up") {
            if (Top > 5) {
                Top -= movementSpeed+2;
                $(".good-robot").css("top", Top + "px");
            
                bullets.forEach(function (cur, i) {
                    cur.position.Top += movementSpeed+2;
                    document.getElementById(cur.id).style.top = cur.position.Top + "px";
                });
            }else{
                mode = "down";
            }   
        }else if (mode === "down") {
            if (Top < window.screen.height - 230) {
                Top += movementSpeed+2;
                $(".good-robot").css("top", Top + "px");

                bullets.forEach(function (cur, i) {
                    cur.position.Top -= movementSpeed+2;
                    document.getElementById(cur.id).style.top = cur.position.Top + "px";
                });
            }else{
                mode = "up";
            }
        }
        bullets.forEach(function (cur, i) {
            if (cur.position.left + 120 >= window.screen.width) {
                document.getElementById(cur.id).remove();
                bullets.splice(i, 1);
            }else{
                cur.position.left += bulletSpeed;
                document.getElementById(cur.id).style.left = cur.position.left + "px"
            }
            //
            //check of bullet bo-op robot is
            //

            //werk verskil uit
            let leftDifference = 1180 - cur.position.left;
            let topDifference = enemyTop - (Top - cur.position.Top * -1);
            //maak seker verskil is bo 0
            if(topDifference<0){
                topDifference *= -1
            }
            if(leftDifference<0){
                leftDifference *= -1
            }
            const totalDifference = leftDifference + topDifference
            //as verskil minder as 80 is doen damage, self destruct en speel klank
            if(totalDifference<80){
                const audio = new Audio("hit.mp3");
                audio.play();
                document.getElementById(cur.id).remove();
                bullets.splice(i, 1);
                enemyHealth--
                $(".bad-health").css("height",(enemyHealth*10)+"px");
                if(enemyHealth<1){
                    declareWinner("Blue");
                    gamePlaying = false;
                }
            }
        });
        
    }
        
        gameLoop()
        function newID() {
            let id = 1
            IDs.forEach(function (cur) {
                if (cur >= id) {
                    id = cur + 1;
                }
            });
            IDs.push(id);
            return id;
        }

        // move up or down
        document.addEventListener('keydown', function (event) {
            if (event.key === "w") {
                //beweeg op
                mode = "up";
            }
            else if (event.key === "s") {
                mode = "down";
            }
        });


        //Shoot!
        // document.addEventListener('keypress',shoot)
         function shoot() {
            if (reloading === false) {
                reloading = true
                $(".blue-reload-box").css("background-color","red");
                setTimeout(function(){
                    reloading = false;
                    $(".blue-reload-box").css("background-color","greenyellow");
                    shoot();
                },reloadSpeed-200);
                const audio = new Audio("shot.wav");
                audio.play();

                const newBullet = {
                    id: newID(),
                    position: {
                        Top: 0,
                        left: 0
                    }
                }
                document.querySelector(".good-bot-head").insertAdjacentHTML('beforeend', '<div id="' + newBullet.id + '" class="bullet good-bullet"></div>');
                bullets.push(newBullet);
            }
        };
        shoot();
    }
    //
    //
    //player twee
    //
    //
    function playerTwoController() {
        const bullets = [];
        let mode = "none"
        let reloading = false;
        function gameLoop() {
            setTimeout(function () {
                if (gamePlaying === true) {
                    gameLoop();
                }
            }, 10);
            if (mode === "up") {
                if (enemyTop > 5) {
                    enemyTop -= movementSpeed;
                    $(".bad-robot").css("top", enemyTop + "px");

                    bullets.forEach(function (cur, i) {
                        cur.position.Top += movementSpeed;
                        document.getElementById(cur.id).style.top = cur.position.Top + "px";
                    });
                }

            } else if (mode === "down") {
                if (enemyTop < window.screen.height - 230) {
                    enemyTop += movementSpeed;
                    $(".bad-robot").css("top", enemyTop + "px");

                    bullets.forEach(function (cur, i) {
                        cur.position.Top -= movementSpeed;
                        document.getElementById(cur.id).style.top = cur.position.Top + "px";
                    });
                }
            }
            bullets.forEach(function (cur, i) {
                if (cur.position.left < -window.screen.width) {
                    document.getElementById(cur.id).remove();
                    bullets.splice(i, 1);
                } else {
                    cur.position.left -= bulletSpeed;
                    document.getElementById(cur.id).style.left = cur.position.left + "px"
                }
                //
                //check of bullet bo-op robot is
                //

                //werk verskil uit
                let leftDifference = 1110 + cur.position.left;
                let topDifference = Top - (enemyTop - cur.position.Top * -1);
                //maak seker verskil is bo 0
                if(topDifference<0){
                    topDifference *= -1
                }
                if(leftDifference<0){
                    leftDifference *= -1
                }
                const totalDifference = leftDifference + topDifference
                //as verskil minder as 80 is doen damage en self destruct
                if(totalDifference<80){
                    const audio = new Audio("hit.mp3");
                    audio.play();
                    document.getElementById(cur.id).remove();
                    bullets.splice(i, 1);
                    health--
                    $(".good-health").css("height",(health*10)+"px");
                    if(health<1){
                        declareWinner("Red");
                    
                    }
                }
            });
        }
        gameLoop()
        function newID() {
            let id = 1
            IDs.forEach(function (cur) {
                if (cur >= id) {
                    id = cur + 1;
                }
            });
            IDs.push(id);
            return id;
        }

        // move up or down
        document.addEventListener('keydown', function (event) {
            if (event.key === "i") {
                //beweeg op
                mode = "up";
            }
            else if (event.key === "k") {
                mode = "down";
            }
        });


        //Shoot!
        document.addEventListener('keypress', function (event) {
            if (event.key === "j" && reloading === false) {
                reloading = true
                $(".red-reload-box").css("background-color","red");
                setTimeout(function(){
                    reloading = false;
                    $(".red-reload-box").css("background-color","greenyellow");
                },reloadSpeed);
                const audio = new Audio("shot.wav");
                audio.play();

                const newBullet = {
                    id: newID(),
                    position: {
                        Top: 0,
                        left: 0
                    }
                }
                document.querySelector(".bad-bot-head").insertAdjacentHTML('beforeend', '<div id="' + newBullet.id + '" class="bullet bad-bullet"></div>');
                bullets.push(newBullet);
            }
        });
    
    }
function declareWinner(winnerName){
    gamePlaying = false
    $(".main-menu").slideDown();
    const audio = new Audio("win.mp3");
    audio.play();
    document.querySelector(".main-menu").innerHTML = `
    <h1>${winnerName} won!</h1>
    <a href="index.html">Play again</a>`
    $(".main-menu").addClass("home-menu");
    $(".main-menu").removeClass("main-menu");
}
function startgame(){
    gamePlaying = true;
    $(".play-btn").click(function(){
        playerOneController();
        playerTwoController();
        $(".main-menu").slideUp();
    });
}
$(".save-btn").click(function(){
    movementSpeed = parseInt(document.querySelector(".movementSpeed").value);
    startingHealth = parseInt(document.querySelector(".startingHealth").value);
    bulletSpeed = parseInt(document.querySelector(".bulletSpeed").value);
    reloadSpeed = parseInt(document.querySelector(".reloadSpeed").value);
    $(".settings-menu").addClass("hidden");
});
$(".settings-btn").click(function(){
    $(".settings-menu").removeClass("hidden");
});
startgame();