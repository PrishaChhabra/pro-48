
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;




var engine, world,rand;
var backgroundImg,blackImg,greenImg,octopusImg,orangeImg,pinkImg,purpleImg,redImg,wormImg;
var tb,tbImg;
var themeS;
var score=0;
var bacteriaCreatedFrame=0;
var score=0;
var bacteriaGroup;
var gameState="wait";
var timer=30;
var button,msg='';
var random2;
var restartB;



function preload(){
  waitImg=loadImage("LOGO_FINAL.png")
  backgroundImg=loadImage("Bg.jpg")
  clean_tooth=loadImage("clean-tooth.png")
  dirty_bg=loadImage("Decay_bg.jpg");
  blackImg=loadImage("Bacteria_img/Black.png")
  greenImg=loadImage("Bacteria_img/Green.png")
  octopusImg=loadImage("Bacteria_img/Octopus.png")
  orangeImg=loadImage("Bacteria_img/Orange.png")
  pinkImg=loadImage("Bacteria_img/Pink.png")
  purpleImg=loadImage("Bacteria_img/Purple.png")
  redImg=loadImage("Bacteria_img/Red.png")
  wormImg=loadImage("Bacteria_img/Worm.png")
  tbImg=loadImage("Toothbrush.png")
  themeS=loadSound("sounds/theme_song.mp3")
  popS=loadSound("sounds/pop.wav")
  victoryS=loadSound("sounds/victory.mp3")
  defeatS=loadSound("sounds/defeat.wav")
  
  

}

function setup(){
  engine = Engine.create();
  world = engine.world;
  createCanvas(windowWidth,windowHeight);
  

   tb=createSprite(width-300,height-300,60,80);
   tb.addImage(tbImg);
   tb.scale=0.2
   tb.visible=false
   bacteriaGroup=new Group();

   restartB= createImg("restart.png")
      restartB.position(width/2-10,height-90)
      restartB.size(120,100);
   
 
   
  
}

function draw(){
  Engine.update(engine)
    background("white")
   restartB.hide();
  
    if(gameState==="wait"){
      console.log("waitState")
          background(waitImg);
          if (!button) { 
            button = createImg("Button.png");  
            button.position(width/2-150,height-170)
            button.size(260,70);
          }
            button.mousePressed(()=>{
            gameState="play"
         
          })
    }
        
    else if(gameState==="play"){
              clear();
              restartB.hide();
             console.log(gameState)
              tb.visible=true;
              button.hide();
              button.style('background-color',"green");
              image(backgroundImg,width-1150,height-650,650,650);
              textSize(100)
              fill("black")
              text(score,width-850,height-280);
              tb.x=mouseX
              tb.y=mouseY
              textSize(50);
              text(timer,width-840,height-650);
              if (frameCount % 60 == 0 && timer > 0) { 
                 timer --;}
              for(var i=0;i<bacteriaGroup.length; i++ ){
                if(bacteriaGroup.get(i).x>140 && bacteriaGroup.get(i).x<550){
                    bacteriaGroup.get(i).visible=true
                }
                else{
                  bacteriaGroup.get(i).velocityX=0
                    bacteriaGroup.get(i).velocityY=0
                    //console.log(bacteriaGroup.get(i).x)
                    //console.log(bacteriaGroup.get(i).y)
                }
                if(bacteriaGroup.get(i).y>200 && bacteriaGroup.get(i).y<400){
                  bacteriaGroup.get(i).visible=true
              }
              else{
                bacteriaGroup.get(i).velocityX=0
                    bacteriaGroup.get(i).velocityY=0
                    //console.log(bacteriaGroup.get(i).x)
                    //console.log(bacteriaGroup.get(i).y)
              }
              // console.log(bacteriaGroup.get(i))
                if((touches.length > 0 || bacteriaGroup.get(i).isTouching(tb))){
                      score=score+1
                      bacteriaGroup.get(i).destroy();
                      popS.play();
                      touches = [];
                      random2 = Math.floor(random(1,4));
                      
                     switch(random2){
                        case 1: msg='You have killed a devil:)'
                        break;
                        case 2: msg='Congratulations Champ!!'
                        break; 
                        case 3: msg='You are one step closer to victory'
                        break;
                        case 4: msg='Hurray! Good job'
                        default:break;
                      }
                }   
              } 
              var pl=themeS.isPlaying()
              if(pl!==true){
                  themeS.play();
              }
          

              spawnBacteria();
              if(timer===0){
                gameState="end"
              }
    }
    else if(gameState==="end"){
      button.hide();
      tb.visible=false
      restartB.show();
      bacteriaGroup.destroyEach();
      msg=" "

      if(score>=60 ){
       
        background("cyan")
         image(clean_tooth,width-880,height-650,600,500);
        textSize(30)
          fill("purple")
          text("YOUR TEETH ARE PERFECTLY CLEAN",width-900,height-200);
           themeS.stop();
          victoryS.play();
        }
      else if(score<=60){
        image(dirty_bg,width-1280,height-650,width,height-1);
        textSize(90)
        fill("purple")
        text("Urgh!! Your teeth are gross",width-1250,height-650)
        themeS.stop();
        defeatS.play();
      }
      

      restartB.mousePressed(()=>{
        gameState="play"
        timer=3;
        score=0
        touches=[];
        restartB.hide();
        console.log(gameState)
     
      })
    }
       
    drawSprites();
    textSize(20)
    fill("blue")
    text(msg,width-940,height-600)

    
}  

function spawnBacteria(){
  rand = Math.floor(random(1,8));
  if(frameCount%15===0){
     bacteriaCreatedFrame=frameCount;
      var bacteria= createSprite(random(170,580), random(230,550), 10, 10);
      bacteria.velocityX=random(0.2,-0.2)
      bacteria.velocityY=random(0.5,-0.5);
      bacteria.lifetime=240
     

      switch(rand){
          case 1: bacteria.addImage(blackImg);
          break;
          case 2: bacteria.addImage(greenImg);
          break; 
          case 3: bacteria.addImage(octopusImg);
          break;
          case 4: bacteria.addImage(orangeImg);
          break;
          case 5: bacteria.addImage(pinkImg);
          break;
          case 6: bacteria.addImage(purpleImg);
          break;
          case 7 : bacteria.addImage(redImg);
          break;
          case 8: bacteria.addImage(wormImg);
          default: break;
      }
      bacteria.scale = random(0.15,0.2)
      bacteriaGroup.add(bacteria)
  }
  
}


 



