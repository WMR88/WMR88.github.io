const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
ctx2.canvas2.width = window.innerWidth;
ctx2.canvas2.height = window.innerHeight;

let particalsArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas2.height/80) * (canvas2.width/80)
}

window.addEventListener("mousemove",
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }

)

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw()  {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx2.fillStyle = "#8C5523";
        ctx2.fill();
    }

    update() {

        if(this.x > canvas2.width || this.x < 0) {      //canvas2.width
            this.directionX = -this.directionX;
        }
        if(this.y > canvas2.height || this.y < 0) {      //canvas2.height
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
    let numberOfParticles = (canvas2.height * canvas2.width) / 9000;
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

            if (distance < (canvas2.width/7) * (canvas2.height/7)) {
                opacityValue = 1 - (distance/20000)
                ctx2.strokeStyle = "rgba(140, 85, 31," + opacityValue + ")";
                ctx2.beginPath();
                ctx2.moveTo(particalsArray[a].x, particalsArray[a].y);
                ctx2.lineTo(particalsArray[b].x, particalsArray[b].y);
                ctx2.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx2.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
    }
    connect();
}

//Resize Event
window.addEventListener("resize", 
    function() {
        canvas2.width = innerWidth;  
        canvas2.height = innerHeight;
        mouse.radius = ((canvas2.height/80) * (canvas2.width/80));
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