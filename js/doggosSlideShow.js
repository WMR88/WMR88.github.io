const buttonRight = document.getElementById("buttonRight");
const buttonLeft = document.getElementById("buttonLeft");
const imageArray = ["/assets/doggosCapture1.JPG","/assets/doggosCapture2.JPG","/assets/doggosCapture3.JPG","/assets/doggosCapture4.JPG"];
let currentImage = 0;

buttonRight.addEventListener('click', () => {
    if (currentImage === 3) {
        currentImage = 0;
    } else {
        currentImage += 1;
    }
    
    document.getElementById("projectDoggosPictureDiv").style.backgroundImage = "url(" + imageArray[currentImage] + ")";
    console.log("Clicked");
})

buttonLeft.addEventListener('click', () => {
    if (currentImage === 0) {
        currentImage = 3;
    } else {
        currentImage -= 1;
    }
    
    document.getElementById("projectDoggosPictureDiv").style.backgroundImage = "url(" + imageArray[currentImage] + ")";
    console.log("Clicked");
})