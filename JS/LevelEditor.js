var edit=false;

  function levelEditorRun(){
    var i=gi(mouseX, mouseY)
    if(i) level.highlight(i.x, i.y) 
      var pos={x:600,y:camera.y-250}
      //
      var s={t:0,b:0,r:0,l:0}
      switch (activeBlock) {
          case 10:
            level.t.wall1(pos.x,pos.y,s)
              break;
          case 11: 
            level.t.wall2(pos.x,pos.y,s)
            break;
          case 12: 
            level.t.wall3(pos.x,pos.y,s)
            break;
          case 13:
              level.t.wall4(pos.x,pos.y,s)
              break;
          case 1: 
            noFill()
            ellipse(pos.x,pos.y-gb,20,40)
            level.t.ground1(pos.x,pos.y,s)
            break;
        case 2: 
            noFill()
            ellipse(pos.x,pos.y-gb,20,40)
            level.t.ground2(pos.x,pos.y,s)
            break;
        case 101:
            strokeWeight(0)
            fill(255,0,0,100)
            ellipse(pos.x,pos.y,gb*0.5,gb*0.5);
            text(level.spawnPoints.length+" Enemies", pos.x-gb,pos.y-gb,pos.x+gb,pos.y+gb)
            break;
        case 88://x key delete spawnPoint;
        console.log("poped")

            level.spawnPoints.pop();
            console.log("poped")
            break;
          default:
              break;
      }
      
  }
  
  function keyPressed(){
      if(edit)
     { switch (keyCode) {
          case 49:
              activeBlock=1
              break;
          case 50:
              activeBlock=2
              break;
          case 51:
              activeBlock=10
              break;
          case 52:
              activeBlock=11
              break;
          case 53:
              activeBlock=12
              break;
          case 54:
              activeBlock=13
              break;
          case 38:
              camera.y-=50
              break;
          case 40:
              camera.y+=50
              break;
          case 83://s key
              activeBlock=101
              break;
          
          default:
              break;
      }}
  }
function createEditor(){
    edit=true
    saveButton=createButton('Save');
    newColumn =createButton("Add Column")
    newRow =createButton("Add Row")
    removeCol =createButton("Remove Column")
    removeRow =createButton("Remove Row")
    clearInside =createButton("Clear Inside")
    clearEnemies =createButton("Clear Enemey")
}
var savingPath='Levels'
var saveButton,newColumn,newRow,removeCol,removeRow,clearInside,clearEnemies;
  function saveLevel(name){
      database.ref(savingPath+'/'+name).update({
          data:level.data,
          spawnPoints:level.spawnPoints
      })
  }
 function showButtons(){
     var xpos=500
     var ypos=camera.y
    saveButton.style('width', '200px');
    saveButton.style('height', '40px');
    saveButton.style('background', 'lightblue');
    saveButton.position(xpos,ypos-100)
    saveButton.mousePressed(()=>{
        var name=prompt("Name The Level")
        saveLevel(name)
    })
    if(true){
    newColumn.style('width', '100px');
    newColumn.style('height', '40px');
    newColumn.style('background', 'lightblue');
    newColumn.position(xpos,ypos)
    newColumn.mousePressed(()=>{
       addColumn()
    })
    }
    if(true){
        newRow.style('width', '100px');
        newRow.style('height', '40px');
        newRow.style('background', 'lightblue');
        newRow.position(xpos,ypos+150)
        newRow.mousePressed(()=>{
           addRow()
        })
        }
    if(true){
        removeRow.style('width', '100px');
        removeRow.style('height', '40px');
        removeRow.style('background', 'lightblue');
        removeRow.position(xpos,ypos+100)
        removeRow.mousePressed(()=>{
           subractRow()
        })
        }
    if(true){
        removeCol.style('width', '100px');
        removeCol.style('height', '40px');
        removeCol.style('background', 'lightblue');
        removeCol.position(xpos,ypos+50)
        removeCol.mousePressed(()=>{
           subtractColumn()
        })
        }
    if(true){
        clearInside.style('width', '100px');
        clearInside.style('height', '40px');
        clearInside.style('background', 'lightblue');
        clearInside.position(xpos,ypos-200)
        clearInside.mousePressed(()=>{
           clearinside()
        })
        }
    if(true){
        clearEnemies.style('width', '100px');
        clearEnemies.style('height', '40px');
        clearEnemies.style('background', 'lightblue');
        clearEnemies.position(xpos+100,ypos-200)
        clearEnemies.mousePressed(()=>{
            console.log("poped")

            level.spawnPoints.pop();
            console.log("poped")
        })
        }
}
function addRow(){
    var row=[]
    for(let i=0;i<level.data[0].length;i++){ 
        row.push(1)
    }

    level.data.push(row)
}
function subractRow(){ 
    level.data.pop()
}
function addColumn(){ 
   for(var i=0; i<level.data.length; i++){
       level.data[i].push(10)
   }
}
function subtractColumn(){
    for(var i=0; i<level.data.length; i++){
        level.data[i].pop()
    }
}
function clearinside(){
    for(var i=1; i<level.data.length-1; i++){
        for(var j=1; j<level.data[0].length-1; j++){
            level.data[i][j]=1
        }
    }
}