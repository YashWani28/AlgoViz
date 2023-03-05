(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Q = require("./queue.js");
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
class Stack {
 
    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }
 
    // Functions to be implemented
    push(element)
    {
        this.items.push(element);
    }
    pop()
    {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek()
    {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }
    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}
var click = document.querySelector(".generateGridbtn");
var container = document.querySelector(".grid-container");
var clear = document.querySelector(".clear");
var start = document.querySelector(".start");
var destination = document.querySelector(".destination");
var BFS = document.querySelector(".BFS");
var random = document.querySelector('.random');
var DFS = document.querySelector(".DFS");
var removeMark = document.querySelector(".RemoveMarkings");
var maze = document.querySelector(".maze");
var contentbox = document.querySelector(".hellocontent");
var tobedisabled = document.querySelectorAll(".btn");
var dfsmodal = document.querySelector(".dfsmodal_container");
var dfsmodalbody = document.querySelector(".dfsmodalbody");
var dfsmodalheader = document.querySelector(".dfsmodalheader");
var translayer = document.querySelector(".searchtrans_layer");
var dfsmodalclosebtn = document.querySelector(".dfsclosebtn");
var startclickedonce =false;
var destclickedonce = false;
var userInput = [];

window.addEventListener("load",function(){
    initialize();
    hidedfsInfo();
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";
    for(let i=0;i<990;i++)//should be multiple of 45
    {

        const box = document.createElement('div');
        box.setAttribute('x',`${i%45}`);//horizontal is X
        box.setAttribute('y',`${Math.floor(i/45)}`);//vertical is y..both are (0,0) ay upper left corner
        box.classList.add('grid-item'); 
        container.appendChild(box);
    }
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.addEventListener("click",event=>{
            let currbar = event.currentTarget;
            // if(currbar.classList.contains("startnode"))
            // {
            //     alert("marked as start already!!");
            //     return;
            // }
            currbar.classList.toggle("black");
        })
    });
    initialize();

})
function initialize()
{
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";


    userInput = [];
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    let gridlen = 45;
    let gridwid = 22;
    // createlist(gridlen,gridwid);
   
    
    for(let i=0;i<gridlen*gridwid;i++)//should be multiple of 45
    {

        let box = document.createElement('div');
        box.id = `${i}`;
        // box.innerHTML=`${i}`;
        // box.setAttribute('id',`${i%45}`);
        box.setAttribute('x',`${i%45}`);//horizontal is X
        box.setAttribute('y',`${Math.floor(i/45)}`);//vertical is y..both are (0,0) ay upper left corner
        box.classList.add('grid-item'); 
        // box.style.width="25px";
        
        
        container.appendChild(box);
    }
    var boxes=document.querySelectorAll('.grid-item');
    // boxes.forEach(element => {
    //     element.addEventListener("click",event=>{
    //         let currbar = event.currentTarget;
            
    //         currbar.classList.toggle("black");
    //     })
    // });
    boxes.forEach(element => {
        element.addEventListener("click",toggleblack);
    });
}
function toggleblack(event)
{
    let currbar = event.currentTarget;
    currbar.classList.toggle("black");
}
click.addEventListener("click",initialize);
/*clear.addEventListener("click",function(){
    var boxes=document.querySelectorAll('.grid-item');
    startclickedonce=false;
    destclickedonce=false;
    boxes.forEach(element=>{
        element.classList.remove("black");
        element.classList.remove("startnode");
        element.classList.remove("destnode");
        
        element.innerHTML="";
    })
})*/
destination.addEventListener("click",function(){
    if(destclickedonce)
    {
        alert("You have already assigned a destination node!!!");
        return;
    }
    var boxes=document.querySelectorAll('.grid-item');
    disable();
    contentbox.innerHTML="Please click any one of the boxes to assign it as destination node";
    boxes.forEach(function(element){
        element.addEventListener("click",function(events){
            if(startclickedonce==true)
            {
                contentbox.innerHTML="Now you can add some obstacles or click on BFS or DFS to see the cool animations";

            }
            else{
                contentbox.innerHTML="Dest node assigned successfully! Please now assign a start node ";
            }
            // contentbox.innerHTML="Destination node assigned successfully!!!";
            enable();
            if(destclickedonce)
            {
                return;
            }
            events.currentTarget.classList.remove("black");
            events.currentTarget.innerHTML="D";
            events.currentTarget.classList.add("destnode");
            destclickedonce = true;
        })
    })
})
start.addEventListener("click",function(){
    if(startclickedonce)
    {
        alert("You have already assigned a start node!!!");
        return;
    }
    var boxes=document.querySelectorAll('.grid-item');
    disable();
    contentbox.innerHTML="Please click any one of the boxes to assign it as start node";
    boxes.forEach(function(element){
        element.addEventListener("click",function(evente){
            if(destclickedonce==true)
            {
                contentbox.innerHTML="Now you can add some obstacles or click on BFS or DFS to see the cool animations!!!";

            }
            else{
                contentbox.innerHTML="Startnode assigned successfully! Please now assign a destination node ";

            }
            enable();  
            
            if(startclickedonce)
            {
                return;
            }
            evente.currentTarget.classList.remove("black");
            evente.currentTarget.innerHTML="S";
            evente.currentTarget.classList.add("startnode");
            startclickedonce = true;
        })
    })
})
BFS.addEventListener("click",function(){
    if(startclickedonce===false || destclickedonce===false)
    {
        alert("Please assign start and destination nodes first");
        return;
    }
    contentbox.innerHTML=`Breadth-first search is an unweighted search technique and guarantees shortest path<br><br>Time Complexity:O(V+E) || Auxillary Space:O(V)<br> `;
    disable();
    //?to disable stop the boxes from being clicked during execution, we will remove their event listners. Highlight path function will add it back
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.removeEventListener("click",toggleblack);
    });
    let start = document.querySelector(".startnode");
    let dest = document.querySelector(".destnode");
    start = parseInt(start.id);
    dest = parseInt(dest.id)
    let gridlen = 45;
    let gridwid = 22;
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let box = document.getElementById(i);
        box.classList.remove("yellow");
        box.classList.remove("maroon2");

    }
    createlist(gridlen,gridwid);
    let adj = adjlist();
    let V = 990;
    let answer = shortestPath(V,adj,start,dest);
    
  
    // highlightPath(answer[0]);
    animatetraveral(answer[1],answer[0]);
})
DFS.addEventListener("click",function(){
    if(startclickedonce===false || destclickedonce===false)
    {
        alert("Please assign start and destination nodes first");
        return;
    }
    contentbox.innerHTML=`Depth-first search is an unweighted search technique but DOES NOT guarantee shortest path<br><br>Time Complexity:O(V+E) || Auxillary Space:O(V)<br> `;
    disable();
    //?to disable stop the boxes from being clicked during execution, we will remove their event listners. Highlight path function will add it back
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.removeEventListener("click",toggleblack);
    });
    let start = document.querySelector(".startnode");
    let dest = document.querySelector(".destnode");
    start = parseInt(start.id);
    dest = parseInt(dest.id)
    let gridlen = 45;
    let gridwid = 22;
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let box = document.getElementById(i);
        box.classList.remove("yellow");
        box.classList.remove("maroon2");

    }
    createlist(gridlen,gridwid);
    let adj = adjlist();
    let V = 990;
    let answer = dfs(V,adj,start,dest);
    
  
    // highlightPath(answer[0]);
    animatetraveral(answer[1],answer[0]);
})
removeMark.addEventListener("click",function(){
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";


    gridlen=45;
    gridwid=22;
    let blackarr=[];
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let temp = document.getElementById(i);
        if(temp.classList.contains("black"))
        {
            blackarr.push(i);
        }  
    }
    initialize();
    blackarr.forEach(element => {
        let temp = document.getElementById(element);
        temp.classList.add("black");
    });
    
})
random.addEventListener("click",function(){
    let grid = generateMaze(22,45);
    console.log(grid);
})
maze.addEventListener("click",async function()
{
    initialize();
    let gridlen = 45;
    let gridwid = 22;
    let n = gridlen*gridwid;
    for(let i=0;i<gridlen;i++)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=gridlen-1;i<n;i+=gridlen)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=n-1;i>n-gridlen;i--)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=n-gridlen;i>0;i-=gridlen)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=0;i<gridlen;i+=2)
    {

        for(let j =i;j<n;j+=gridlen)
        {
            let temp  = document.getElementById(j);
            let todo = Math.random();
            if(todo>0.3)
            {
                temp.classList.add("black");

            }
            await sleep(1);

        }
        
    }
    // for(let i=2;i<gridlen-1;i+=2)
    // {
    //     for(let k=0;k<5;k++)
    //     {
          
    //         let id = (Math.floor(Math.random()*100)%gridwid)*gridlen + i;
    //         if(id==0 || id==gridwid-1)
    //         {
    //             k--;
    //         }
    //         else{

    //             let temp = document.getElementById(id);
    //             temp.classList.remove("black");
    //             await sleep(20);
    //         }
    //     }
    // }
})
contentbox.addEventListener("click",function(event){
    if(event.target.tagName=="BUTTON")
    
    {
        if(event.target.id==="dfsinfobtn")
        {
            showdfsInfo();
        }
        if(event.target.id==="bfsinfobtn")
        {
            showbfsInfo();
        }
    }
})
dfsmodalclosebtn.addEventListener("click",hidedfsInfo);

translayer.addEventListener("click",hidedfsInfo);


 

async function highlightPath(path)
{
    for(let i=1;i<path.length-1;i++)
    {
        let tempid = path[i];
        let tempbox = document.getElementById(tempid);
        tempbox.classList.remove('maroon2');
        tempbox.classList.add('yellow');
        await sleep(40);

    }
    enable();
    //?adding the event listners back to grid items to allow them to turn black upon clicking after the current execution is finished.
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.addEventListener("click",toggleblack);
    });
}
async function animatetraveral(traversal,path)
{
    for(let i=1;i<traversal.length;i++)
    {
        let interval = setspeed();
        let temp = document.getElementById(traversal[i]);
        if(!temp.classList.contains("black"))
        {

            temp.classList.add("maroon");
        }
        await sleep(interval);
        temp.classList.remove("maroon");
        temp.classList.add("maroon2");
        await sleep(0.1);     
    }
    if(!(path==-1))
    {

        highlightPath(path);
    }
    else{
        alert("no path exists!!");
        enable();
        //?adding the event listners back to grid items to allow them to turn black upon clicking after the current execution is finished.
        var boxes=document.querySelectorAll('.grid-item');
        boxes.forEach(element => {
            element.addEventListener("click",toggleblack);
        });
    }

}
//* createlist is responsible for creating edges 
function createlist(len,wid)
{
    console.log("hi");
    let n = len*wid;
    //* adding horizontal connections
    // for(let i=0;i<n-1;i++)
    // {
    //     let temp = document.getElementById(i);
    //     if(temp.classList.contains("black"))
    //     {
    //         console.log(temp);
    //         userInput.pop();
    //         userInput.pop()
    //         continue;
    //     }
    //     else if(!(i===(Math.floor(i/len)+1)*len-1))
    //     {
    //         userInput.push(i);
    //         userInput.push(i+1); 
            
    //     }
        
    // }
    for(let i=0;i<wid;i++)
    {
        let temp1=i*len;
        let temp2=temp1+1;
        while(temp2<(i+1)*len)
        {
            let tempa = document.getElementById(temp1);
            let tempb = document.getElementById(temp2);
            if(tempa.classList.contains("black") || tempb.classList.contains("black"))
            {
                temp1++;
                temp2++;

            }
            else{
                userInput.push(temp1);
                userInput.push(temp2);
                
                // temp1= temp2;
                // temp2=temp2+len;
                temp1++;
                temp2++;
            }
        }
    }
    //* adding vertical connections
    for(let i=0;i<len;i++)//((i+1)*len)-1
    {
        let temp1 = i;
        let temp2 = i+len;
        while(temp2<n){
            let tempa = document.getElementById(temp1);
            let tempb = document.getElementById(temp2);

            if(tempa.classList.contains("black") || tempb.classList.contains("black"))
            {
                temp1+=len;
                temp2+=len;

            }
            else{
                userInput.push(temp1);
                userInput.push(temp2);
                
                // temp1= temp2;
                // temp2=temp2+len;
                temp1+=len;
                temp2+=len;
            }
        }
    }
    // console.log(userInput);
}
function setspeed()
{
    var speedtoggle = document.getElementById("gridspeedtoggle");

    if(speedtoggle.value==="FAST")
    {
 
        return 7;
    }
    else if(speedtoggle.value==="MEDIUM")
    {


        return 20;

    }
    else if(speedtoggle.value==="SLOW")
    {
        return 150;
    }
    else if(speedtoggle.value==="VSLOW")
    {
        return 400;
    }

}
function disable()
{

    tobedisabled.forEach(element => {
        element.disabled = true;
        element.classList.add("disable")
    });
}
function enable()
{
    tobedisabled.forEach(element => {
        element.disabled = false;
        element.classList.remove("disable")

    });
}
function showdfsInfo()
{
    dfsmodalbody.innerHTML=`SO DFS IS A GRAPH TRAVERSING SEARCHING ALGORITHM WHICH IS BASED ON SEARCHING THROUGH DEPTH MEANS EDGES OR NODES OF GRAPH.
    IT STARTS FROM SEARCHING THE STARTING NODE STRAIGHT TO THE END NODE IN DEPTH WISE AND IT GOES  CONTINUOUSLY UNTIL IT REACHED THE LAST NODE THEN IT BACKTRACKS MEANS RETURNS TO THE PREVIOUS NODE
    BY CHECKING THE NODES PRESENT INSIDE THE STACK. SO STACK IS THE DATA STRUCTURE USED FOR THIS ALGORITHM AND DFS WORKS ON THE TECHNIQUE OF LIFO(LAST IN FIRST OUT) AND IT IS A RECURSIVE ALGORITHM USING BACKTRACKING TECHNIQUE.
    WHEN WE HAVE REACHED THE LAST ELEMENT WE CHECK THE LAST ELEMENT PRESENT IN THE STACK AND ACCORDING TO IT WE BACKTRACKS TO THAT NODE AND REMOVE THAT NODE FROM STACK AND CHECK THE OTHER UNVISITED NODES AND 
    THEN WE CONTINUOUSLY SEARCHING IN THE SAME MANNER ACCORDINGLY AND ALSO THERE IS NO PRIMARY OR ROOT NODE PRESENT IN DFS IF NOT MENTIONED AND IF ONE NODE IS VISITED AND CHECKED THEN WE DON'T CHECK IT FOR ANOTHER TIME.
    EVERY NODE CHECKED ONLY ONCE.AS EVERY NODE VISITED ONCE ONLY SO IT REQUIRES LESS SPACE COMPLEXITY THE TIME COMPLEXITY OF DFS IS O(V+E), WHERE V IS VERTEX AND E IS EDGES OF GIVEN GRAPH.
    WE OFTEN USE THIS TECHNIQUE FOR PATH FINDING,PUZZLE SOLVING WHERE SOURCE IS MUCH AWAY FROM DESTINATION AND AND WE MAKE DECISION AND EXPLORE ALL PATHS AND WE REACHED DESTINATION.`;
    dfsmodalheader.innerHTML="Depth First Search";
    dfsmodal.classList.remove("hide_display");
    translayer.classList.remove("hide_display");
    document.body.style.overflow="hidden";
    // let dfsmodalbody = document.querySelector(".dfsmodalbody");
    
}
function hidedfsInfo()
{
    dfsmodal.classList.add("hide_display");
    translayer.classList.add("hide_display");
    document.body.style.overflow="auto";

}
function showbfsInfo()
{
    dfsmodalbody.innerHTML=`SO BFS IS AN ANOTHER GRAPH TRAVERSING SEARCHING ALGORITHM WHICH IS BASED ON SEARCHING THROUGH BREADTH WISE MEANS LEVEL WISE SO IT IS  ALSO CALLED LEVEL ORDER TRAVERSAL . WE USE QUEUE DATA STRUCTURE IN BFS.
    SO IN BFS WE FIRST CONSIDERS A NODE AS PRIMARY NODE OR ROOT NODE THEN WE SEARCH ALL THE ADJACENT NODES OF THAT NODE MEANS ALL OTHER NODES PRESENT IN THE LEVEL OF THAT PRIMARY OR ROOT NODE  AND ONLY AFTER VISITING EVERY NODES IN THAT LEVEL  WE PROCEEDS
    TO THE NEXT LEVEL AND CONTINUE SEARCHING IN THE SAME MANNER. SO IN BFS WE FIRST  STORE ALL UNVISITED NODES IN QUEUE AND AFTER VISITING THAT NODE WE REMOVES  IT FROM QUEUE AND WE HAVE TO FOLLOW THE SAME
    PROCEDURE THAT IS INSERTING AND REMOVING THE NODE FOR ALL ADJACENT NODES OF ONE LEVEL IN QUEUE BUT ONLY UNVISITED NODE SHOULD BE INSERTED AND AFTER VISITING THAT NODE HAVE TO BE REMOVED THEN WE SEARCH ACCORDINGLY AND CONTINUOUSLY 
    IN THE SAME MANNER IN ALL DIFFERENT LEVELS AND FINDS OUR FINAL DESTINATION. IT IS MOSTLY USED WHERE WE WE HAVE TO FIND SHORT DESTINATION FROM SOURCE AND MOSTLY IN UNWEIGHTED GRAPHS WHICH HAVE LESS VERTEX.
    IT REQUIRES MORE SPACE AS WE MAY NODES ARE DELETED AND INSERTED IN QUEUE SEVERAL TIMES.THE TIME COMPLEXITY OF DFS IS O(V+E), WHERE V IS VERTEX AND E IS EDGES OF GIVEN GRAPH.
    WE USE THIS ALGORITHM TO FIND THE OPTIMAL SHORTEST PATH FROM SOURCE TO DESTINATION.
    `;
    dfsmodalheader.innerHTML="Breadth First Search";
    dfsmodal.classList.remove("hide_display");
    translayer.classList.remove("hide_display");
    document.body.style.overflow="hidden";
}


//* shortest path is nothing but the BFS function
function shortestPath(V,adj,src,dest)
{
    let where = new Array(V);
    let cost = new Array(V);
    var q = Q.createQueue(5);
    let traversal  = [];
    let visited = new Array(V).fill(0);
    visited[src]=1;
    cost[src]=0;
    where[src]=-1;
    q.push(src);
    let found=0;
    while(!q.isEmpty())
    {
        if(found)
        {
            break;
        }
        let Y = q.shift() // in this queue implementation, the popped element is returned as well
        // if(!found)
        // {

        traversal.push(Y);
        // }

        adj[Y].forEach(it => {
            if(!visited[it])
            {
                visited[it]=1;
                q.push(it);
                where[it] = Y;
                cost[it] = cost[Y] + 1;
            }
            if(it==dest)
            {
                found=1;
                
            }
        });
    }
    if(!found)
    {
        return [-1,traversal];
        
    }
    let next = dest;
    var path = [];
    while(where[next]!=-1)
    {
        path.push(next);
        next=where[next];

    }
    path.push(src);
    path.reverse();
    console.log(path);
    return [path,traversal];

}

function adjlist()
{

    let V= 990;
    let E=1913;//edges = (len-1)*wid + (wid-1)*len
    let adj = new Array;
    for(let i=0;i<V;i++)
    {
        let temp = new Array;
        temp.push(i);
        adj.push(temp);
    }
    for(let i=0;i<userInput.length;i+=2)
    {
        let u = userInput[i];
        let v = userInput[i+1];
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
    // console.log(adj);
    // shortestPath(V,adj,start,dest);

}
//* generate maze actually generatese random obstacles...the function which is generating the vertical maze is coded right in the Maze.eventlistner..
function generateMaze(rows, cols) {
    initialize();
    let n = rows*cols;
    for(let i=0;i<n;i++)
    {
        let box=document.getElementById(i);
        if(Math.random()>0.7)
        {
            box.classList.add("black");
        }
    }
  }
function dfs(V,adj,src,dest)
{
    console.log(adj);
    let where = new Array(V);
    let cost = new Array(V);
    var stk = new Stack();
    let traversal  = [];
    let visited = new Array(V).fill(0);
    visited[src]=1;
    cost[src]=0;
    where[src]=-1;
    stk.push(src);
    let found=0;
    while(!stk.isEmpty())
    {
        if(found)
        {
            break;
        }
        let Y = stk.pop() // in this queue implementation, the popped element is returned as well
        // traversal.push(Y);
       console.log(adj[Y].length);
        // adj[Y].forEach(it => {
        //     if(!visited[it] )
        //     {   
                
                
        //         visited[it]=1;
        //         stk.push(it);
        //         traversal.push(it);
        //         where[it] = Y;
        //         cost[it] = cost[Y] + 1;
        //     }
            
        //     if(it==dest)
        //     {
        //         found=1;
               
        //     }
        // });
        if(visited[Y] == 0)
        {
            traversal.push(Y);
            visited[Y] = 1;
        }
        for(let i=0;i<adj[Y].length;i++)
        {
            if(!visited[adj[Y][i]])
            {
                // visited[adj[Y][i]]=1;
                stk.push(adj[Y][i]);
                // traversal.push(adj[Y][i]);
                where[adj[Y][i]]=Y;
                cost[adj[Y][i]]=cost[Y]+1;
               
            }
            if(adj[Y][i]==dest)
            {
                found=1;
            
            }
        }
    }
    let next = dest;
    var path = [];
    while(where[next]!=-1)
    {
        path.push(next);
        next=where[next];

    }
    path.push(src);
    path.reverse();
    console.log(path);
    console.log(traversal);
    return [path,traversal];
}

  




    

},{"./queue.js":2}],2:[function(require,module,exports){
function createQueue(intialCapacity) {
	var that = {};
	var head = 0;
	var tail = 0;
	var length = 0;
	var initialCapacity = initialCapacity;
	var currentSize = (typeof initialCapacity === undefined) ? initialCapacity : 200;
	var container = [];
	container.length=currentSize;

	function doubling() {
		var currentSource = head;
		var currentTarget = 0;
		var newContainer = [];
		newContainer.length = 2*currentSize;

		while (currentTarget < currentSize) {
			newContainer[currentTarget] = container[currentSource];
			currentSource++;
			currentTarget++;
			if (currentSource == currentSize) {
				currentSource = 0;
			}
		}
		container = newContainer;
		head = 0;
		tail = currentSize;
		currentSize *= 2;
	}

	function shrink() {
		var currentSource = head;
		var currentTarget = 0;
		var newContainer = [];
		newContainer.length = currentSize/4;

		while (currentTarget < currentSize) {
			newContainer[currentTarget] = container[currentSource];
			currentSource++;
			currentTarget++;
			if (currentSource == currentSize) {
				currentSource = 0;
			}
		}
		container = newContainer;
		head = 0;
		tail = currentSize;
		currentSize /= 4;
	}

	that.push = function(element) {
		if (length == currentSize) {
			doubling();
		}
		container[tail] = element;
		length++;
		tail++;
		if (tail == currentSize) {
			tail = 0;
		}
	};

	that.shift = function() {
		if (length === 0) {
			return null;
		}
		tmp = container[head];
		head++;
		length--;
		if (head == currentSize) {
			head = 0;
		}
		if (length == currentSize/4 && length > initialCapacity) {
			shrink();
		}
		return tmp;
	};


	that.front = function() {
		if (length === 0) {
			return null;
		}
		return container[head];
	};

	that.length = function() {
		return length;
	};

	that.isEmpty = function() {
		return length === 0;
	};

	return that;
}

module.exports = {
	createQueue : createQueue
};
},{}]},{},[1]);
