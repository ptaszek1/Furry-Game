document.addEventListener("DOMContentLoaded", function () {


    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = "";

    }

    function Coin(x, y) {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    function game() {
        var self = this;
        this.Furry = new Furry();
        this.Coin = new Coin();
        this.score = 0;
        this.speedUp = 250;

        this.index = function (x, y) {
            return x + (y * 10);
        }
        this.board = document.querySelectorAll('#board div');
        this.showFurry = function () {
            if (document.querySelector('.furry') != null) {
                this.hideVisibleFurry();
            }
            this.board[this.index(this.Furry.x, this.Furry.y)].classList.add('furry');
            console.log(this.Furry.y)
        }
        this.showCoin = function () {
            this.board[this.index(this.Coin.x, this.Coin.y)].classList.add('coin')
        }


        this.idSetInterval = setInterval(this.startGame = function () {
            moveFurry();
        }, this.speedUp);


        this.moveFurry = function () {
            if (this.Furry.direction === "right") {
                this.Furry.x += 1;
            } else if (this.Furry.direction === "left") {
                this.Furry.x = this.Furry.x -= 1;
            } else if (this.Furry.direction === "down") {
                this.Furry.y = this.Furry.y += 1;
            } else if (this.Furry.direction === "up") {
                this.Furry.y = this.Furry.y -= 1;
            }
            showFurry();
            checkCoinCollision();
            gameOver();
        }

        this.hideVisibleFurry = function () {
            var getFurry = document.querySelector('.furry');
            getFurry.classList.remove('furry')
        }
        document.addEventListener('keydown', function (event) {
            self.turnFurry(event)
        });
        this.turnFurry = function (event) {
            switch (event.which) {
                case 37:
                    this.Furry.direction = "left";
                    break;
                case 38:
                    this.Furry.direction = 'up';
                    break;
                case 39:
                    this.Furry.direction = 'right';
                    break;
                case 40:
                    this.Furry.direction = 'down';
                    break;
            }
        }


        this.checkCoinCollision = function () {
            if (this.Furry.x == this.Coin.x && this.Furry.y == this.Coin.y) {
                var getCoin = document.querySelector('.coin');
                getCoin.classList.remove('coin');
                this.score += 1;
                this.writeScore = document.querySelector('#score strong')
                this.writeScore.innerText = this.score;
                this.Coin = new Coin();
                showCoin();
            }
        }
        this.gameOver = function () {
            if (this.Furry.x < 0 || this.Furry.x > 9 || this.Furry.y < 0 || this.Furry.y > 9) {
                clearInterval(idSetInterval);
                this.hideVisibleFurry();
                var again = document.querySelector('.gameover');
                again.classList.remove('invisible');
            }
        }


        this.newGame = function () {
            var yes = document.getElementsByClassName('yes');
            yes[0].addEventListener('click', function () {
                var again = document.querySelector('.gameover');
                again.classList.add('invisible');
                this.score = 0;
                this.writeScore = document.querySelector('#score strong')
                this.writeScore.innerText = this.score;
                clearInterval(idSetInterval);
                game()
            });
        }

        this.endGame = function () {
            var no = document.getElementsByClassName('no');
            no[0].addEventListener('click', function () {
                var choose = document.querySelector('.choose');
                choose.classList.remove('invisible')
                var again = document.querySelector('.gameover');
                again.classList.add('invisible');
                var score = document.querySelector('#score')
                score.classList.add('invisible')
                this.score = 0;
                this.writeScore = document.querySelector('#score strong')
                this.writeScore.innerText = this.score;
                clearInterval(idSetInterval);
                game()
            });
        }
        this.newGameMenu = function () {
            var newGameMenu = document.getElementsByClassName('newGame');
            newGameMenu[0].addEventListener('click', function () {
                var choose = document.querySelector('.choose');
                choose.classList.add('invisible')
                var score = document.querySelector('#score')
                score.classList.remove('invisible')
                newGame();

            })
        }
        this.info = function () {
            var infoMenu = document.getElementsByClassName('info');
            infoMenu[0].addEventListener('click', function () {
                var choose = document.querySelector('.choose');
                choose.classList.add('invisible')
                var about = document.querySelector('.about');
                about.classList.remove('invisible')
            })
        }

        this.back = function () {
            var backToMenu = document.getElementsByClassName('back');
            backToMenu[0].addEventListener('click', function () {
                var choose = document.querySelector('.choose');
                choose.classList.remove('invisible')
                var about = document.querySelector('.about');
                about.classList.add('invisible')
            })
        }


        newGameMenu();
        startGame();
        newGame();
        endGame();
        info();
        back();
    }

    game();
    showFurry();
    showCoin();


});




