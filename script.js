const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let snake;
let food;
let dx;
let dy;
let score;
let timer;

let audioCtx;


function sound(freq,time){

if(!audioCtx){
audioCtx=new AudioContext();
}

let osc=audioCtx.createOscillator();

osc.frequency.value=freq;
osc.type="square";

osc.connect(audioCtx.destination);

osc.start();

osc.stop(audioCtx.currentTime+time);

}



function startGame(){

document.getElementById("start").style.display="none";
canvas.style.display="block";


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


document.getElementById("score").innerHTML=0;


let speed=Number(document.getElementById("level").value);


clearInterval(timer);

timer=setInterval(loop,speed);


sound(500,0.1);

}



function loop(){

ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);



let head={
x:snake[0].x+dx,
y:snake[0].y+dy
};



if(
head.x<0||
head.y<0||
head.x>=400||
head.y>=400
){

gameOver();
return;

}



for(let s of snake){

if(head.x==s.x&&head.y==s.y){

gameOver();
return;

}

}



snake.unshift(head);



if(head.x==food.x&&head.y==food.y){

score++;

document.getElementById("score").innerHTML=score;


sound(900,0.15);



food={
x:Math.floor(Math.random()*20)*20,
y:Math.floor(Math.random()*20)*20
};


}else{

snake.pop();

}



ctx.fillStyle="lime";

snake.forEach(s=>{

ctx.fillRect(s.x,s.y,18,18);

});


ctx.fillStyle="red";

ctx.fillRect(food.x,food.y,18,18);

}



document.addEventListener("keydown",e=>{


if(e.key=="ArrowUp"&&dy==0){

dx=0;
dy=-20;

}


if(e.key=="ArrowDown"&&dy==0){

dx=0;
dy=20;

}


if(e.key=="ArrowLeft"&&dx==0){

dx=-20;
dy=0;

}


if(e.key=="ArrowRight"&&dx==0){

dx=20;
dy=0;

}


});



function gameOver(){

clearInterval(timer);

sound(200,0.3);


alert("ゲームオーバー！\nスコア："+score);


location.reload();

}
