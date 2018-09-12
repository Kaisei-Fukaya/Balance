var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var levels = [
    {n: 0, bkColour: "blue", apex: 40, nadir: 40, bounce: 0.8, obstructions: 0, nOf: 0},
    {n: 1, bkColour: "blue", apex: 50, nadir: 50, bounce: 1, obstructions: 1, nOf: 5},
    {n: 2, bkColour: "red", apex: 60, nadir: 60, bounce: 1, obstructions: 3, nOf: 4},
    {n: 3, bkColour: "green", apex: 80, nadir: 80, bounce: 2, obstructions: 2, nOf: 5},
    {n: 4, bkColour: "blue", apex: 60, nadir: 60, bounce: 1.5, obstructions: 1, nOf : 4},
    {n: 5, bkColour: "#f9ffad", apex: 50, nadir: 50, bounce: 1.5, obstructions: 3, nOf : 5},
];
var endLevels = [{bkColour: "green", apex: 70, nadir: 70, bounce: 1, obstructions: 0, nOf: 0}];
var colours = ["blue", "green", "red", "#f9ffad", "#6fad3c", "#c27ed6", "#e56b98", "#a7f9e8"];

            
//Generate Level
let genLevel = function(distance){
    let difficulty = Math.floor(distance/50);
    if(difficulty > 20){
    difficulty = 20;
    }
    let level = endLevels[0];
    level.apex = 20;
    level.nadir = 20;
    level.bounce = 1;
    level.obstructions = 0;
    level.nOf = 0;
    for(var i = 0; i < difficulty; i++){
        let randomN = Math.floor(Math.random()*3);
        console.log("randomN"+" "+randomN);
        switch(randomN){
        case 0:
            level.apex += 10;
            level.nadir += 10;
            if(level.apex > 100 || level.nadir > 100){
                level.apex = 50;
                level.nadir = 50;
            }
                console.log("adding height");
            break;
        case 1:
            if(level.bounce < 3){
                level.bounce += 0.2;
            }else{
                level.bounce = 0.8;
            }
                console.log("adding speed");
            break;
        case 2:
            if(level.nOf >= 5){
                level.nOf = 1+Math.floor(Math.random()*3);
            }
            else{
                level.nOf +=1;
            }
            let obst = Math.floor(Math.random()*4);
                console.log("obst"+" "+obst);
            level.obstructions = obst;
                console.log("adding obst");
            break;
        }
    }
    //Prevent impossible levels
    if(level.nadir < 40 || level.bounce > 1.5){
        level.obstructions = 0;
    }
    if(difficulty == 0){
        level.apex = 40;
        level.nadir = 40;
    }
    level.bkColour = colours[Math.floor(Math.random()*colours.length)];
    endLevels[0] = level;
}

var obstructions = [
    {
        //No Obstructions
        n: 0,
        nOf: 0,
        init: function(nOf){
            //Do nothing
            return;
        },
        draw: function(){
            //Do nothing
            return;
        },
        updateAll: function(){
            //Do nothing
            return;
        }
    },
    {
        //Pillars
        n: 1,
        nOf: 3,
        pillars: [this.nOf],
        init: function(nOf){
            this.pillars = [nOf];
            let width = canvas.width/10;
            let height = (canvas.height/10)*4;
            let firstPosX = canvas.width/2 - width/2;
            let posLeft = canvas.width/2 - width/2;
            let posRight = canvas.width/2 - width/2;
            let leftTop = false;
            let rightTop = false;
            
            for(var i = 0; i<nOf; i++){
                if(i == 0){
                    obstructions[1].pillars[i] = kontra.sprite({
                        x: firstPosX,
                        y: 0,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    posRight += 50;
                    posLeft -= 50;
                };
                if(i != 0 && i%2 == 1){
                    let newOb = kontra.sprite({
                        x: posRight,
                        y: canvas.height - height,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    if(rightTop){
                        newOb.y = 0;
                    };
                    obstructions[1].pillars[i] = newOb;
                    posRight += 50;
                    rightTop = !rightTop;
                };
                if(i != 0 && i%2 == 0){
                    let newOb = kontra.sprite({
                        x: posLeft,
                        y: canvas.height - height,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    if(leftTop){
                        newOb.y = 0;
                    };
                    obstructions[1].pillars[i] = newOb;
                    posLeft -= 50;
                    leftTop = !leftTop;
                };
            };
        },
        draw: function(){
            for(var i = 0; i < this.pillars.length; i++){
                obstructions[1].pillars[i].render();
            }
        },
        updateAll: function(){
            //Do nothing
            return;
        }
    },
    
    {
        //Dropping ball
        n: 2,
        nOf: 1,
        balls: [this.nOf],
        init: function(nOf){
            this.balls = [nOf];
            let radius = 6;
            let firstPosX = canvas.width/2 - radius;
            let posLeft = canvas.width/2 - radius;
            let posRight = canvas.width/2 - radius;
            
            for(var i = 0; i<nOf; i++){
                if(i == 0){
                    obstructions[2].balls[i] = kontra.sprite({
                        x: firstPosX,
                        y: 0,
                        radius: radius,
                        color: "black",
                        speed: Math.floor(Math.random()*3),
                        width: radius*2,
                        height: radius*2,
                        render: function(){
                            ctx.fillStyle = this.color;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
                            ctx.fill();
                        },
                        update: function(){
                            if(this.y < canvas.height){
                                this.y += this.speed+1;
                            }else{
                                this.y = 0;
                            };
                        },
                        hitBox: kontra.sprite({
                            x: 0,
                            y: 0,
                            width: 12,
                            height: 12,
                            color: "red",
                            update: function(n){
                                this.x = obstructions[2].balls[n].x - obstructions[2].balls[n].radius,
                                this.y = obstructions[2].balls[n].y - obstructions[2].balls[n].radius
                            }    
                        })
                    })
                    posRight += 50;
                    posLeft -= 50;
                };
                if(i != 0 && i%2 == 1){
                    obstructions[2].balls[i] = kontra.sprite({
                        x: posRight,
                        y: 0,
                        radius: radius,
                        color: "black",
                        speed: Math.floor(Math.random()*3),
                        width: radius*2,
                        height: radius*2,
                        render: function(){
                            ctx.fillStyle = this.color;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
                            ctx.fill();
                        },
                        update: function(){
                            if(this.y < canvas.height){
                                this.y += this.speed+1;
                            }else{
                                this.y = 0;
                            };
                        },
                        hitBox: kontra.sprite({
                            x: 0,
                            y: 0,
                            width: 12,
                            height: 12,
                            update: function(n){
                                this.x = obstructions[2].balls[n].x,
                                this.y = obstructions[2].balls[n].y
                            }    
                        })
                    })
                    posRight += 50;
                };
                if(i != 0 && i%2 == 0){
                    obstructions[2].balls[i] = kontra.sprite({
                        x: posLeft,
                        y: 0,
                        radius: radius,
                        color: "black",
                        speed: Math.floor(Math.random()*3),
                        width: radius*2,
                        height: radius*2,
                        render: function(){
                            ctx.fillStyle = this.color;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
                            ctx.fill();
                        },
                        update: function(){
                            if(this.y < canvas.height){
                                this.y += this.speed+1;
                            }else{
                                this.y = 0;
                            };
                        },
                        hitBox: kontra.sprite({
                            x: 0,
                            y: 0,
                            width: 12,
                            height: 12,
                            update: function(n){
                                this.x = obstructions[2].balls[n].x,
                                this.y = obstructions[2].balls[n].y
                            }    
                        })
                    });
                    posLeft -= 50;
                };
            }
        },
        draw: function(){
            for(var i = 0; i < this.balls.length; i++){
                obstructions[2].balls[i].render();
            };
        },
        updateAll: function(){
            for(var i = 0; i < this.balls.length; i++){
                obstructions[2].balls[i].update();
                obstructions[2].balls[i].hitBox.update(i);
            }
        }
    },
    {
        //Blocks
        n: 3,
        nOf: 3,
        blocks: [this.nOf],
        init: function(nOf){
            this.blocks = [nOf];
            let width = 20;
            let height = 20;
            let firstPosX = canvas.width/2 - width/2;
            let posLeft = canvas.width/2 - width/2;
            let posRight = canvas.width/2 - width/2;
            let leftTop = false;
            let rightTop = false;
            
            for(var i = 0; i<nOf; i++){
                if(i == 0){
                    obstructions[3].blocks[i] = kontra.sprite({
                        x: firstPosX,
                        y: 100,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    posRight += 50;
                    posLeft -= 50;
                };
                if(i != 0 && i%2 == 1){
                    let newOb = kontra.sprite({
                        x: posRight,
                        y: (canvas.height - height)-100,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    if(rightTop){
                        newOb.y = 100;
                    };
                    obstructions[3].blocks[i] = newOb;
                    posRight += 50;
                    rightTop = !rightTop;
                };
                if(i != 0 && i%2 == 0){
                    let newOb = kontra.sprite({
                        x: posLeft,
                        y: (canvas.height - height)-100,
                        width: width,
                        height: height,
                        color: "black",
                    });
                    if(leftTop){
                        newOb.y = 100;
                    };
                    obstructions[3].blocks[i] = newOb;
                    posLeft -= 50;
                    leftTop = !leftTop;
                };
            };
        },
        draw: function(){
            for(var i = 0; i < this.blocks.length; i++){
                obstructions[3].blocks[i].render();
            }
        },
        updateAll: function(){
            //Do nothing
            return;
        }
    }
]