// Set the number of images
const numImages = 4;

// Set the folder path
const folder = "images/";

// Initialize the current index
let currentIndex = 0;

// Function to display a random image on page load
function displayRandomImage() {
  const picture = document.getElementById("picture");
  const randomIndex = Math.floor(Math.random() * numImages);
  picture.src = folder + (randomIndex + 1) + ".jpg";
  currentIndex = randomIndex;
}

function updateButtonCounter() {
	document.getElementById('previous-button').innerHTML = currentIndex;
	document.getElementById('next-button').innerHTML = numImages-currentIndex-1;
}

// Function to handle previous button click
function previousButtonClicked() {
  const picture = document.getElementById("picture");
  console.log(currentIndex);
  if (currentIndex == 0) {
    currentIndex = 0;
  } else {
    currentIndex--;
  }
  picture.src = folder + (currentIndex + 1) + ".jpg";
  updateButtonCounter()
}

// Function to handle next button click
function nextButtonClicked() {
  const picture = document.getElementById("picture");
  if (currentIndex === numImages - 1) {
    currentIndex = numImages - 1;
  } else {
    currentIndex++;
  }
  picture.src = folder + (currentIndex + 1) + ".jpg";
  updateButtonCounter()
}

//  This function will handle the about button click event.
function aboutButtonClicked() {
  const aboutContainer = document.getElementById("about-container");
  aboutContainer.classList.toggle("show");
}

//  This function will handle the contact button click event.
function contactButtonClicked() {
  const contactContainer = document.getElementById("contact-container");
  contactContainer.classList.toggle("show");
}

//  This function will handle the home button click event.
function homeButtonClicked() {
  const contactContainer = document.getElementById("contact-container");
  contactContainer.classList.display("hide");
}


//  This function will handle the full screen button click event.
function fullScreenButtonClicked() {
  const picture = document.getElementById("picture");
  picture.requestFullscreen();
}

// Add event listeners to the buttons
document.getElementById("previous-button").addEventListener("click", previousButtonClicked);
document.getElementById("next-button").addEventListener("click", nextButtonClicked);
document.getElementById("picture").addEventListener("click", fullScreenButtonClicked);
document.getElementById("about-button").addEventListener("click", aboutButtonClicked);
document.getElementById("contact-button").addEventListener("click", contactButtonClicked);
document.getElementById("home-button").addEventListener("click", homeButtonClicked);

// Display a random image on page load
displayRandomImage();
updateButtonCounter();
