const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const eatSound=document.getElementById("eatSound");
const bgm=document.getElementById("bgm");

let snake;
let food;
let dx;
let dy;
let score;
let timer;


function startGame(){

document.getElementById("start").style.display="none";
canvas.style.display="block";


bgm.volume=0.2;
bgm.play();


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
end();
return;
}


for(let s of snake){

if(head.x==s.x&&head.y==s.y){
end();
return;
}

}


snake.unshift(head);



if(head.x==food.x&&head.y==food.y){

score++;

document.getElementById("score").innerHTML=score;


eatSound.currentTime=0;
eatSound.play();


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



function end(){

clearInterval(timer);

let best=localStorage.getItem("best")||0;


if(score>best){
localStorage.setItem("best",score);
}


alert("ゲームオーバー！\nスコア："+score);

location.reload();

}
