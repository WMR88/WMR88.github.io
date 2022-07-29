var canvas = document.getElementById("MainWeekZeroCanvas");
var ctx = canvas.getContext("2d");


const runButton = document.getElementById("runButton");
const stopButton = document.getElementById("stopButton");
 
class Walker {
    constructor() {
        this.xPosition = canvas.width /2;
        this.yPosition = canvas.height /2;
    }

    getRandomInt() {
        return Math.floor(Math.random() * 9);
    }
        
    Step() {
        var choice = this.getRandomInt();
        switch (choice) {
            case 0:
                this.xPosition--;
                this.yPosition--;
                break;
            case 1:
                this.yPosition--;
                break;
            case 2:
                this.xPosition++;
                this.yPosition--;
                break;
            case 3:
                this.xPosition--;
                break;
            case 4:
                console.log("No Movement")
            case 5:
                this.xPosition++;
                break;
            case 6:
                this.xPosition--;
                this.yPosition++;
                break;
            case 7:
                this.yPosition++;
                break;
            case 8:
                this.xPosition++;
                this.yPosition++;
                break;       
            default:
                console.log("Default");
        }
    }
}

const walker = new Walker();

function animate() {
    id = requestAnimationFrame(animate) 
    
    ctx.beginPath(); 
    ctx.fillRect(walker.xPosition, walker.yPosition, 1, 1)

    if (walker.xPosition < 0 || walker.xPosition > canvas.width || walker.yPosition < 0 || walker.yPosition > canvas.height)
    {
        walker.xPosition = canvas.width / 2;
        walker.yPosition = canvas.height /2;
    }

    walker.Step();  
}

runButton.addEventListener("click", ()=> {
    animate();
})

stopButton.addEventListener("click", ()=> {
    cancelAnimationFrame(id);
})
