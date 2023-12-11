const board = document.getElementById("board");
const context = board.getContext("2d");

let ship = {
    x : 224,//224
    y : 450,
    width : 64,
    height : 32
}
let alien = {
    x : 100,
    y : 200, //-40
    width : 64,
    height : 32
}
let touch  = false;
let bulletArray = [];
let alienArray = [] 
let shipVelocityX = 32
let alienVelocityY = 1;
let score = 0;
shipImg = new Image();
shipImg.src = "photos/ship.png"
alienImg = new Image();
context.fillStyle="white";

alienImg.src = "photos/alien.png";


const myInterval =  setInterval(() =>{
   
    const alien = {
        x :  Math.floor(Math.random() * 443),
        y : -20, 
        width : 64,
        height : 32,
        collision : false
    }
     alienArray.push(alien);
},2000)
shipImg.onload = function(){

    context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height)
    context.drawImage(alienImg,alien.x,alien.y,alien.width,alien.height)

}

requestAnimationFrame(update)


document.addEventListener("keydown",moveShip);
document.addEventListener("keyup",shoot)
function update(){
   context.clearRect(0,0,board.width,board.height)
   context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height)
    for(let i = 0; i < alienArray.length; i++){
        if(alienArray[i].collision !== true){
            context.drawImage(alienImg,alienArray[i].x,alienArray[i].y,alienArray[i].width,alienArray[i].height)
            alienArray[i].y += alienVelocityY

        }
    }
 
    bulletArray.forEach(bullet =>{
        bullet.y += -10
        context.fillStyle = "white";
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height)

        for(let i = 0; i < alienArray.length; i++){
            if(bullet.x < alienArray[i].x + alienArray[i].width && bullet.x + bullet.width > alienArray[i].x && bullet.y < alienArray[i].y + alienArray[i].height && bullet.y + bullet.height > alienArray[i].y){
             
                alienArray[i].collision = true;
                alienArray = alienArray.filter(arr => arr.collision !== true);

         //    console.log(alienArray)
             score += 10;
           /*  if(/00/.test(score)){
                alienVelocityY += 1
                console.log(alienVelocityY)
            }
            */
            }
         /*  else if(alienArray[i].y > 512){
            console.log("buraya girdi")
            alienArray[i].collision = true;
            alienArray = alienArray.filter(arr => arr.collision !== true);
                if(score !== 0){
                    score -= 10;

                }
             }*/
        }
       
       
      
        
        

    })
    for(let i = 0; i < bulletArray.length; i++){
        if(bulletArray[i].y < -40){
            bulletArray[i].off = true;
        }
        bulletArray = bulletArray.filter(bullet => bullet.off !== true)
    }



    for(let i = 0; i < alienArray.length; i++){
        if(alienArray[i].y > 512){ // 422
           alienArray[i].collision = true;
           alienArray = alienArray.filter(arr => arr.collision !== true);
               if(score !== 0){
                   score -= 10;

               }
            }
   }

 
     context.font = "30px Arial";
     context.fillText(`Score : ${score}`,10, 30);
     
    
    requestAnimationFrame(update)

}



function moveShip(e){

        if(e.code === "ArrowRight" && !(ship.x > 438)){
            ship.x += 10
         }
         else if(e.code === "ArrowLeft" && !(ship.x <= 10)){
     
             ship.x -= 10    
    }   
    
   
   
   
   
}

function shoot(e){

    if(e.code === "Space"){    
        let bullet = { 
            x:ship.x + ship.width*15/32,
            y:ship.y,
            width: 32/8,
            height: 32/2,
            off: false
        }
        bulletArray.push(bullet)
    }

}

//256 

//


/* bullet,alien

bullet.x < alien.x + alien.width

          a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y; 

if(bullet.x < alien.x + alien.width && bullet.x + bullet.widht > alien.x && bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y)

*/


/*

 /*  if(!touch){
        context.drawImage(alienImg,alien.x,alien.y,alien.width,alien.height)

    }
   alien.y += alienVelocityY




                // console.log(alienArray.filter(arr => arr.collision !== true))


                /*   if(bullet.x < alienArray[i].x + alienArray[i].width && bullet.x + bullet.width > alienArray[i].x && bullet.y < alienArray[i].y + alienArray[i].height && bullet.y + bullet.height > alienArray.y){
        // touch = true
        console.log("dsfds")
     }*/

