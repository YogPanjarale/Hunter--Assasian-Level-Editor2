
class Enemy {
	constructor(i,j,arr){
		this.sprite =createSprite((i+1)*gb,(j+1)*gb,gb*0.5,gb*0.5); 
		this.sprite.shapeColor = rgb(200,100,0)
		this.target={x:this.sprite.x,y:this.sprite.y,r:this.sprite.rotation}
		this.arr=arr
		this.idx=0
		this.i=int((1/gb)*this.sprite.y -1)
		this.j=int((1/gb)*this.sprite.x -1)
		this.pth=[[1,14],[1,13],[1,12],
				 [1,11],[2,11],[3,11],
				 [3,10],[3,9],[3,8],
				 [3,7],[4,7],[5,7],
				 [6,7],[6,8],[6,9],[5,9],
				 [5,10],[5,11],[4,11],
				 [4,12],[4,13],[5,13],
				 [5,14],[5,15],

				]
		this.bulletGroup = new Group()
	this.time={lastRoam:frameCount,wait:int(random(50,100))}
	 this.state="roam"
	 this.pth=level.path(this.arr,{i:this.i,j:this.j},
		{i:int(random(0,this.arr.length-6)),j:int(random(0,this.arr[0].length-1))})
	 while(this.pth.length<1) this.pth=level.path(this.arr,{i:this.i,j:this.j},
		{i:int(random(0,this.arr.length-3)),j:int(random(0,this.arr[0].length-1))})
	
			//console.log(this.i,this.j)
				// this.pth=level.path(this.arr,{i:this.i,j:this.j},{i:1,j:6})
				// console.log(this.pth)
	}
	display(){
		drawSprites();
		if(this.state!="dead")
		{this.i=int((1/gb)*this.sprite.y -1)
			this.j=int((1/gb)*this.sprite.x -1)
		 this.move()
		 this.sprite.collide(player.sprite,()=>{this.die()})
		 this.bulletGroup.collide(player.sprite,()=>{player.health--})
		 this.bulletGroup.displace(level.wallsGroup)
		 if(this.state=="found"){
			this.pth=level.path(this.arr,{i:this.i,j:this.j},
				{i:player.i,j:player.j})
				 
		 }
	     if(this.state=="roam")
		 {if(this.pth.length<1){
			 if(frameCount>=this.time.lastRoam+this.time.wait){
			// console.log("pathCalculated")
			 this.pth=level.path(this.arr,{i:this.i,j:this.j},
			{i:int(random(0,this.arr[0].length-1)),j:int(random(0,this.arr[0].length-1))})
			   
			 }
			 if(this.target.r<=360)this.target.r+=5
			 else if(this.target.r>=360) this.target.r=0
		 }else
		 	this.time.lastRoam=frameCount
		}
		//if(this.state="found"){}
	}
	
		//if(this.time.lastRoam!=frameCount)console.log(true)

	}
	die(){
		console.log("dead")
		this.sprite.destroy();
		this.state="dead";
		this.i=0
		this.j=0
	}
	move(){
		
		var pth=this.pth,idx=this.idx
		if(pth){
			if(idx<pth.length){
				this.moveTo(pth[0][0],pth[0][1])
		   }
		   else{this.idx;}
		   }
	   
		   var t=this.target;var s =this.sprite;var speed=gb/20
	   //console.log(gi(s.x,s.y),gi(t.x,t.y))
	   //var gs=gi(s.x,s.y),gt=gi(t.x,t.y)
	   this.cone(s.x,s.y,s.rotation)
		   s.setVelocity(0,0)
		   if(t.x>s.x){s.velocity.x=speed;}
		   else if(t.x<s.x){s.velocity.x=-speed;}
		   else if(t.y>s.y){s.velocity.y=speed;}
		   else if(t.y<s.y){s.velocity.y=-speed;}
		   if(t.x==s.x&&t.y==s.y&&idx<pth.length){this.pth.shift();}
		   var h=s.velocity.heading()
		   if(s.velocity.x==0&&s.velocity.y==0)h=this.target.r
		   var rspeed=5
		  //if(this.state=="rotate")h=s.rotation+=2
		   if(s.rotation-h>180)h=360+h
		   if(s.rotation>h){
		  s.rotation-=rspeed
		}   else if(s.rotation<h){
		   s.rotation+=rspeed
		}
		if(s.rotation==360)s.rotation=0
		//console.log("rotation: "+s.rotation,"heading: "+s.velocity.heading(),"idx:"+this.idx)
		   this.sprite=s;
		 
	}
	cone(x,y,a){		
		var da=44
		var result=(isInsideSector({x:player.sprite.x,
			y:player.sprite.y},{x:x,y:y},a+da,a-da,gb*1.75))
   push()
		fill(250,125)
		  if(result==true){fill(255,100,100,200)
			this.fire()
			this.target.r=angleBetwn(this.sprite.x,this.sprite.y,player.sprite.x,player.sprite.y)
	}  
		noStroke();
		arc(x, y, gb*3.75, gb*3.75, a-da,a+da, PIE);
   pop()
	}
	moveTo(i,j){
	  this.target.x=(i+1)*gb
	  this.target.y=(j+1)*gb
	  //this.moveToPos(player.sprite.x,player.sprite.y)
	}
	moveToPos(x=camera.mouseX,y=camera.mouseY){
	    x+=gb/2;y+=gb/2
		var i=int((1/gb)*y -1)
	    if(player.i==i&&player.j==i){return}
		var j=int((1/gb)*x -1)
		if(i>this.arr.length)return
		if(j>this.arr[0].length)return
		this.pth=level.path(this.arr,{i:this.i,j:this.j},{i:i,j:j})
	   this.idx=0
	   console.log(i,j)
	   fill(255)
	   click.i=i;click.j=j
	}
	fire(){
		if(frameCount%2==0)
	{	var bullet=createSprite(this.sprite.x,this.sprite.y,gb/5,gb/15)
		
		bullet.lifetime=int(frameRate()*2)
		bullet.depth=this.sprite.depth-1
		bullet.shapeColor="yellow"
		var a= angleBetwn(bullet.x,bullet.y,player.sprite.x,player.sprite.y)
		bullet.setSpeedAndDirection(gb/4,a)
		bullet.rotation=bullet.velocity.heading()
		this.bulletGroup.add(bullet)}
	}	
}
function isInsideSector(p,c,sa,ea,r){
	var relative=cartesian2Polar(p.x-c.x,p.y-c.y)
   if(relative.distance<=r&&
	 ( (relative.angle>=sa&&relative.angle<=ea)||
	  (relative.angle<=sa&&relative.angle>=ea))
	   )return true
	return false
 }
 function cartesian2Polar(x, y){
   push()
   //angleMode(RADIANS)
	 di = sqrt(x*x + y*y)
	 rad = atan2(y,x) //This takes y first
	 polarCoor = { distance:di, angle:rad }
   pop()
	 return polarCoor
 }
 function angleBetwn(cx, cy, ex, ey) {
	var dy = ey - cy;
	var dx = ex - cx;
	var theta = atan2(dy, dx); // range (-PI, PI]
//	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	//if (theta < 0) theta = 360 + theta; // range [0, 360)
	return theta;
  }
