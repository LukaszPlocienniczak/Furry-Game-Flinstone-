document.addEventListener('DOMContentLoaded', function () {

    var Furry = require('./furry.js');
    var Coin = require('./coin.js');



        var Game = function () {

        this.board = document.querySelectorAll("#board>div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        var niceWork = new Audio('sounds/nice-work.wav');

        this.index = function (x, y) {
            return x + y * 10;
        };
        this.showFurry = function () {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.hideVisibleFurry = function () {

            var hideFurry = document.querySelector(".furry");
            hideFurry.classList.remove("furry");
        };


        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };
        this.moveFurry = function () {
            this.hideVisibleFurry();

            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y + 1;
            } else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y - 1;
            }

            this.checkCoinCollision();
            this.gameOver();
            this.showFurry();
        };

        this.turnFurry = function (event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = "down";
                    break;
                case 39:
                    this.furry.direction = "right";
                    break;
                case 40:
                    this.furry.direction = "up";
                    break;
            }
        };
        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                niceWork.play();



                var point = document.querySelector(".coin");
                point.classList.remove("coin");
                this.score++;

                document.querySelector("strong").innerText = this.score;
                this.coin = new Coin();
                newGame.showCoin();
            }
        };
        this.gameOver = function () {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {


                clearInterval(this.interval);
                this.hideVisibleFurry();


               var end = document.querySelector("#over");
               end.classList.add('invisible');
                document.querySelector(".score").innerText = "Coins get: " + this.score;


            }
        };
        this.startGame = function () {
            var self = this;
            this.interval = setInterval(function () {
                self.moveFurry()
            }, 300);
        };
    };

    document.addEventListener('keydown', function (event) {
        newGame.turnFurry(event);
    });


    var newGame = new Game();
    newGame.showCoin();
    newGame.showFurry();
    newGame.startGame();

});