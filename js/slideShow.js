const buttonRight = document.getElementById("buttonRight");
const buttonLeft = document.getElementById("buttonLeft");
const imageArray = ["/assets/conusCapture1.JPG","/assets/conusCapture2.JPG","/assets/conusCapture3.JPG","/assets/conusCapture4.JPG","/assets/conusCapture5.JPG"];
let currentImage = 0;

buttonRight.addEventListener('click', () => {
    if (currentImage === 4) {
        currentImage = 0;
    } else {
        currentImage += 1;
    }
    
    document.getElementById("projectCONUSPictureDiv").style.backgroundImage = "url(" + imageArray[currentImage] + ")";
    console.log("Clicked");
})

buttonLeft.addEventListener('click', () => {
    if (currentImage === 0) {
        currentImage = 4;
    } else {
        currentImage -= 1;
    }
    
    document.getElementById("projectCONUSPictureDiv").style.backgroundImage = "url(" + imageArray[currentImage] + ")";
    console.log("Clicked");
})
