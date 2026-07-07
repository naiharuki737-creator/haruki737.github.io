const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake;
let food;
let dx;
let dy;
let score;
let timer;
let speed;


function startGame(){

document.getElementById("start").style.display="none";
canvas.style.display="block";

speed = Number(document.getElementById("level").value);

snake=[
{x:200,y:200}
];

food={
x:Math.floor(Math.random()*20)*20,
y:Math.floor(Math.random()*20)*20
};

dx=20;
dy=0;
score=0;

document.getElementById("score").innerHTML=score;

clearInterval(timer);
timer=setInterval(gameLoop,speed);

}



function gameLoop(){

ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);


// ヘビ移動
let head={
x:snake[0].x+dx,
y:snake[0].y+dy
};


// 壁に当たる
if(
head.x<0 ||
head.y<0 ||
head.x>=400 ||
head.y>=400
){
gameOver();
return;
}


// 自分に当たる
for(let i=0;i<snake.length;i++){
if(head.x==snake[i].x &&
head.y==snake[i].y){
gameOver();
return;
}
}


snake.unshift(head);


// 食べた
if(
head.x==food.x &&
head.y==food.y
){

score++;

document.getElementById("score").innerHTML=score;

food={
x:Math.floor(Math.random()*20)*20,
y:Math.floor(Math.random()*20)*20
};

}else{

snake.pop();

}


// 描画

ctx.fillStyle="lime";

snake.forEach(part=>{
ctx.fillRect(part.x,part.y,18,18);
});


ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,18,18);

}



// 操作

document.addEventListener("keydown",function(e){

if(e.key=="ArrowUp" && dy==0){
dx=0;
dy=-20;
}

if(e.key=="ArrowDown" && dy==0){
dx=0;
dy=20;
}

if(e.key=="ArrowLeft" && dx==0){
dx=-20;
dy=0;
}

if(e.key=="ArrowRight" && dx==0){
dx=20;
dy=0;
}

});



// ゲーム終了

function gameOver(){

clearInterval(timer);

let best=localStorage.getItem("best") || 0;

if(score>best){

best=score;
localStorage.setItem("best",score);

}

document.getElementById("best").innerHTML=best;

alert("ゲームオーバー！ スコア："+score);

location.reload();

}
