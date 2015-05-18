        
//RANDOM BACKGROUND COLOR
            function ran_col() { //function name
                var color = '#'; // hexadecimal starting symbol
                var letters = ['DC3F1C','448D7A','D8A027','88A764','62746B','007B8B','F15D42','706F8C']; //Set your colors here
                color += letters[Math.floor(Math.random() * letters.length)];
                document.getElementById('posts').style.backgroundColor = color; // Setting the random color on your div element.
            }
    
//TEXT ANIMATION SCRIPT

//Animates Lower Text
var myString1 = "Click, Drag, and Drop to Create";
var myArray1 = myString1.split("");
var mytext1 = "myTypingText1";
var loopTimer1;
function frameLooper1() {
    if(myArray1.length > 0) {
        document.getElementById(mytext1).innerHTML += myArray1.shift();
    } 
    
    loopTimer1 = setTimeout('frameLooper1()',70);   
}
frameLooper1();


//BALL PHYSICS AND DRAWING SCRIPT 

/* Physics bouncing ball code found at http://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/ */
var width = 500;
var height = 500;
var canvas = ctx = false;
var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;

// Mode Variables    
var colorful = false;    
var bwcolor = false;
var nodrip = false;
var ballSize =0;
    
/*Creation of Ball*/
var ball = {
    position: {y: 0},
    velocity: {x: 0, y: -6},
    mass: 0.1, //kg
    radius: 0, // 1px = 1cm
    restitution: -0.6
    };

var Cd = 0.47;  // Dimensionless
var rho = 1.22; // kg / m^3
var A = Math.PI * ball.radius * ball.radius / (10000); // m^2
var ag = 9.81;  // m / s^2
var mouse = {x: 0, y: 0, isDown: false};

function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}

var mouseDown = function(e) {
    if (e.which == 1) {
        getMousePosition(e);
        mouse.isDown = true;
        ball.position.x = mouse.x;
        ball.position.y = mouse.y;
    }
}
var mouseUp = function(e) { 
    if (e.which == 1) {
        if (nodrip == false){
        ball.radius = 4.5+ballSize;
        mouse.isDown = false;        
        ball.velocity.y = (ball.position.y - mouse.y) /10;
        ball.velocity.x = (ball.position.x - mouse.x) / 10;
        }
    }
}

//SUPER COLOR TRIGGER
function colors(){
 ran_col();
 if(colorful == true){
     colorful = false;
 } else if (colorful == false){
     colorful = true;
}
}
//BLACK WHITE TRIGGER   
function bwMode(){
if(bwcolor == true){
     bwcolor = false;
    alert("Black & White Mode: OFF");
 } else if (bwcolor == false){
     bwcolor = true;
      alert("Black & White Mode: ON");
}
}
//NO DRIP TRIGGER
function nodripMode(){
if(nodrip == true){
     nodrip = false;
    alert("Drips: ON");
 } else if (nodrip == false){
     nodrip = true;
      alert("Drips: OFF");
 }
}
/*var mousedblClick = function(e) {
    ball.radius = 2;
    return ran_col();
}*/

//GENERATES RANDOM COLOR
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
//CANVAS AND MOUSE SET UP
var setup = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
  //  canvas.ondblclick = mousedblClick;
    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    /*ctx.strokeStyle = getRandomColor();*/
    loopTimer = setInterval(loop, frameDelay);
}
//PHYSICS CODE
var loop = function() {
    if ( ! mouse.isDown) {
        // Do physics
        // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
        var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
        
        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);
        
            // Calculate acceleration ( F = ma )
        var ax = Fx / ball.mass;
        var ay = ag + (Fy / ball.mass);
            // Integrate to get velocity
        ball.velocity.x += ax*frameRate;
        ball.velocity.y += ay*frameRate;
        
            // Integrate to get position
        ball.position.x += ball.velocity.x*frameRate*100;
        ball.position.y += ball.velocity.y*frameRate*100;
        
            //Determines if ball is random color or not
        if (colorful == true & bwcolor == false){
        ctx.fillStyle = getRandomColor();
        }
    }
    
// COLLISION HANDLING
    
    if (ball.position.y > height - ball.radius) {
        ball.velocity.y *= ball.restitution;
        ball.position.y = height - ball.radius;
        ball.radius = 8+ballSize; //makes it bigger
        

    }
    if (ball.position.x > width - ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = width - ball.radius;
       if (bwcolor == false){
        ctx.fillStyle = getRandomColor();
       }

    }
    if (ball.position.x < ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = ball.radius;
        
       if (bwcolor == false){
        ctx.fillStyle = getRandomColor();
       }
     
    }
    

// DRAWS BALL WHEN IN MOTION
  /*  if (nodrip == true){
    ctx.clearRect(0,0,width,height);
    }*/
    ctx.save();    
    ctx.translate(ball.position.x, ball.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

// DRAWS STEMS WHEN MOUSE DOWN
    if (mouse.isDown) {
        ball.radius = 13+ballSize;
       	ctx.beginPath();
        ctx.moveTo(ball.position.x, ball.position.y);
        //Regular Mode
        if (nodrip == false){
        
        if (colorful == false & bwcolor == false){
        ctx.fillStyle = getRandomColor();
        ctx.lineWidth = 2;
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "white";
        ctx.stroke();
        } 
        // Rainbow Mode
        if (colorful == true & bwcolor == false){
        //ball.radius =20;
        ctx.fillStyle = getRandomColor();
        ctx.lineWidth = 3;
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = getRandomColor();
        ctx.stroke();
        }         
    }
       ctx.fillStyle = getRandomColor();  
         //BW Mode
        if (bwcolor == true){
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        if (nodrip == false){
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "gray";
        }
        ctx.stroke();
        } 
    }
    
    
}
    setup();

//CLEARS THE CANVAS	
	function clearCanvas()
{
	ctx.fillStyle = "#242323";
	ctx.clearRect(0,0,width,height);
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    ball.position.x = 250;
    ball.position.y = 550;
	
}
    
    
//SAVES THE DRAWING TO DATABASE
/* Sends your image to the server-side script which will 
save it to the database or where ever you want it saved.
 */
function saveDrawing(frm)
{
    // converting the canvas to data URI
   var strImageData = canvas.toDataURL();  
     //var file = btoa(strImageData);
    $.ajax({
        url: "insert2.php", /* You need to enter the URL of your server side script*/
        type: "post",
          /* add the other variables here or serialize the entire form. 
          Image data must be URI encoded */
        data: "save=1&pic="+encodeURIComponent(strImageData)+"&title="+frm.title.value+"&type=image/png", 
        success: function(msg)
        {
			alert("Your Work has been added to the Gallery: "+msg+"    Please visit the Lolli-Popz Gallery to view your entry");
        }
    });
}

// BLACK WHITE MODE ACTIVATION, Press 'Enter' letter on keyboard    
$(document).keydown(function(e){
    if (e.keyCode == 13) { 
       bwMode();
    }
});

// INCREASE BALL SIZE   
$(document).keydown(function(e){
    if (e.keyCode == 39) { 
       ballSize++;
    }
});

//DECREASE BALL SIZE    
$(document).keydown(function(e){
    if (e.keyCode == 37 && ballSize > 0) { 
       ballSize--;
    }
});
    
//NO DRIPZ    
    $(document).keydown(function(e){
    if (e.keyCode == 17) { 
       nodripMode();
    }
});

//Features
function feature(){
       alert("MODE ACTIVATIONS: \n \nBlack White Mode: Press 'Enter'\nRainbow Mode: Click 'Lolli-Popz' \nIncrease/Decrease Size: Hold 'L/R Arrow keys' \nNo Dripz: Press 'Control'");
    }

