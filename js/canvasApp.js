
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particalsArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener("mousemove",
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }

)

class Particle {
    constructor(x, y, directionX, directionY, size, color, tag) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.tag = Math.floor(Math.random(10) * 100);
    }

    draw()  {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#8C5523";
        ctx.fill();
    }

    update() {

        if(this.x > canvas.width || this.x < 0) {      //canvas.width
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {      //canvas.height
            this.directionY = -this.directionY;
        }

        // Move Particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particalsArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {                                       // can add particals here.
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#8C5523";

        particalsArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particalsArray.length; a++) {
        for (let b = a; b < particalsArray.length; b++) {
            let distance = ((particalsArray[a].x - particalsArray[b].x) 
            * (particalsArray[a].x - particalsArray[b].x)) 
            + ((particalsArray[a].y - particalsArray[b].y) * 
            (particalsArray[a].y - particalsArray[b].y));

            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000)
                ctx.strokeStyle = "rgba(140, 85, 31," + opacityValue + ")";
                ctx.beginPath();
                ctx.moveTo(particalsArray[a].x, particalsArray[a].y);
                ctx.lineTo(particalsArray[b].x, particalsArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
    }
    connect();
}

//Resize Event
window.addEventListener("resize", 
    function() {
        canvas.width = innerWidth;  
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.width/80));
        init();
    }
);

//Mouse Out Event
window.addEventListener("mouseout", 
    function() {
        mouse.x = undefined;
        mouse.y = undefined; // use mouse.x twice?
    }
)

init();
animate();




