window.onload = function () {
  var merrywrap = document.getElementById("merrywrap");
  var box = merrywrap.getElementsByClassName("giftbox")[0];
  var step = 1;
  var stepMinutes = [1500, 1500, 750, 750];

  function init() {
    box.addEventListener("click", openBox, false);
  }

  function stepClass(step) {
    merrywrap.className = "merrywrap";
    merrywrap.className = "merrywrap step-" + step;
  }

  function openBox() {
    if (step === 1) {
      box.removeEventListener("click", openBox, false);
    }

    stepClass(step);

    if (step === 3) {
    }

    if (step === 4) {
      document.querySelector(".container").style.display = "flex";
      merrywrap.style.display = "none";
      return;
    }

    setTimeout(openBox, stepMinutes[step - 1]);
    step++;
  }

  init();
};

var myAudio = document.getElementById("myAudio");
var playIcon = document.getElementById("playIcon");
var pauseIcon = document.getElementById("pauseIcon");
var playBtn = document.getElementById("playBtn");
var pauseBtn = document.getElementById("pauseBtn");

var balloonSrcList = [
  "/img/red.png",
  "/img/blue.png",
  "/img/yellow.png",
  "/img/green.png",
  "/img/purple.png",
];

function togglePlayPause() {
  if (myAudio.paused) {
    myAudio.play();
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseIcon.style.color = "red";
    playIcon.style.color = "#B7B7B7";
  } else {
    myAudio.pause();
    pauseBtn.disabled = true;
    playBtn.disabled = false;
    playIcon.style.color = "red";
    pauseIcon.style.color = "#B7B7B7";
  }
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function textOnCreatedClouds(cloud) {
  var cloudImg = document.createElement("img");
  // cloudImg.classList.add("cloud-img");
  cloudImg.classList.add(`${cloud}`);

  cloudImg.src = `/img/${cloud}.png`;

  if (cloud == "cloud1") {
    var cloud1AudioContainer = document.getElementById(
      "cloud1-audio-container"
    );
    cloud1AudioContainer.insertBefore(
      cloudImg,
      cloud1AudioContainer.firstChild
    );
  } else if (cloud == "cloud4") {
    var cloud4Container = document.getElementById(
      "cloud4-paper-airplane-container"
    );
    cloud4Container.appendChild(cloudImg);
  } else {
    var contentContainer = document.querySelector(".content");
    contentContainer.insertBefore(cloudImg, contentContainer.firstChild);
  }
}

let balloonCounter = 0;
let numberElement = null;
let isBalloonFloating = false;

function flyBalloon() {
  var balloon = this;

  if (isBalloonFloating) {
    return;
  }

  isBalloonFloating = true;

  balloon.classList.remove("hover-animation");
  balloon.classList.add("float-animation");
  // newBalloonInPlace(balloon);

  balloon.addEventListener("animationend", function (event) {
    if (event.animationName == "floatUp") {
      balloon.remove();
      isBalloonFloating = false;
    }
  });

  balloonCounter++;

  if (balloonCounter == 2) {
    displayNumber(balloonCounter);
    var balloonContainer = document.querySelector("#balloon-container");
    balloonContainer.classList.remove("balloon-sticker");
    setTimeout(function () {
      getAirplane();
    }, 1800);
  } else {
    displayNumber(balloonCounter);
  }
}

var birthdayMessage =
  "Gratulerer med dagen, Malin 🎉 \n Jeg sender deg et Steam-gavekort senere, \n så du kan lage enda flere spillvideoer!";

function showTextOnPaper(paper) {
  var textDiv = document.createElement("div");
  textDiv.innerText = birthdayMessage;
  textDiv.classList.add("textOnPaper");

  var airplaneContainer = document.querySelector(".airplane-container");

  var exitBtn = document.createElement("button");
  exitBtn.textContent = "Lukk brevet";
  exitBtn.classList.add("exitBtn");
  exitBtn.addEventListener("click", function () {
    airplaneContainer.removeChild(paper);
    airplaneContainer.removeChild(textDiv);
  });

  textDiv.appendChild(exitBtn);

  airplaneContainer.insertBefore(textDiv, airplaneContainer.firstChild);
}

function openAirplane() {
  this.remove();
  var airplaneContainer = document.querySelector(".airplane-container");
  airplaneContainer.classList.remove("airplane-sticker");
  var paper = document.createElement("img");
  paper.src = "/img/paper.png";
  paper.classList.add("paper");
  paper.classList.add("paper-animation");
  airplaneContainer.appendChild(paper);

  setTimeout(function () {
    showTextOnPaper(paper);
  }, 2500);
}

function getAirplane() {
  if (numberElement) {
    numberElement.remove();
  }

  if (glitterImg) {
    glitterImg.remove();
  }

  var airplane = document.createElement("img");
  airplane.src = "/img/paperplane.png";
  airplane.classList.add("paper-airplane");

  var contentContainer = document.querySelector(".content");
  document.querySelector("#balloon-container").textContent = "";

  contentContainer.appendChild(airplane);

  setTimeout(function () {
    airplane.classList.add("airplane-animation");
    airplane.classList.add("cursorPointer");

    setTimeout(function () {
      // contentContainer.removeChild(airplane);

      var airplaneContainer = document.createElement("div");
      airplaneContainer.classList.add("airplane-container");

      var cloud4Container = document.querySelector(
        "#cloud4-paper-airplane-container"
      );

      cloud4Container.appendChild(airplaneContainer);
      // var newAirplane = document.createElement("img");
      // newAirplane.src = "/img/paperplane.png";

      // airplaneContainer.appendChild(newAirplane);

      // newAirplane.classList.add("airplane-cloud4");
      airplaneContainer.classList.add("airplane-sticker");

      airplane.addEventListener("click", openAirplane);
    }, 2000);
  }, 1000);
}

function displayNumber(balloonCounter) {
  if (!numberElement) {
    numberElement = document.createElement("p");
    glitterImg = document.createElement("img");
    glitterImg.src = "/img/glitterrays.png";
    numberElement.classList.add("number-appears");
    numberElement.classList.add("glittering-number-animation");

    glitterImg.classList.add("glitter");
    glitterImg.classList.add("glittering-animation");

    var contentContainer = document.querySelector(".content");
    contentContainer.appendChild(numberElement);
    contentContainer.appendChild(glitterImg);
  }
  numberElement.textContent = `${balloonCounter}`;
}

// function newBalloonInPlace(oldBalloon) {
//   var balloonContainer = document.getElementById("balloon-container");
//   var balloonImage = document.getElementById("balloon-image");

//   // Get the computed style of the old balloon
//   var oldBalloonStyle = window.getComputedStyle(oldBalloon);
//   var oldBalloonLeft = oldBalloonStyle.getPropertyValue("left");

//   setTimeout(function () {
//     var balloon = document.createElement("img");
//     balloon.classList.add("balloon");
//     balloon.classList.add("hover-animation");
//     balloon.addEventListener("click", flyBalloon);
//     balloon.src =
//       balloonSrcList[Math.floor(Math.random() * balloonSrcList.length)];
//     // Set the position of the new balloon
//     balloon.style.left = oldBalloonLeft;

//     balloonContainer.appendChild(balloon);
//   }, 1500);
// }

function populateBalloons() {
  var balloonContainer = document.getElementById("balloon-container");
  var containerWidth = 90;
  var numberOfBalloons = 25;
  var balloonWidth = 5;
  var spreadBalloons = 13;

  balloonContainer.classList.add("balloon-sticker");

  var roomForEachBalloon =
    (containerWidth - balloonWidth * spreadBalloons) / (spreadBalloons + 1);

  var maxRightPosition = containerWidth - balloonWidth;

  for (let i = 0; i < numberOfBalloons; i++) {
    var balloon = document.createElement("img");
    balloon.classList.add("balloon");
    balloon.style.setProperty("--bottom-height", Math.random() * 1.5 + "vh");
    balloon.classList.add("hover-animation");
    balloon.addEventListener("click", flyBalloon);
    balloon.src =
      balloonSrcList[Math.floor(Math.random() * balloonSrcList.length)];

    if (i < spreadBalloons) {
      balloon.style.right = `calc(${roomForEachBalloon}vw + ${
        i * (roomForEachBalloon + balloonWidth) - balloonWidth / 2
      }vw)`;
    } else {
      var randomRight = Math.floor(
        Math.random() * maxRightPosition - balloonWidth / 2
      );
      balloon.style.right = `${randomRight}vw`;
    }

    balloon.style.setProperty("--hover-duration", Math.random() * 3 + 5 + "s"); // Random duration between 3s and 4s
    balloon.style.setProperty(
      "--hover-height",
      Math.random() * -15 - 10 + "px"
    ); // Random height between -10px and -25px
    balloonContainer.appendChild(balloon);
  }
}

populateBalloons();
textOnCreatedClouds("cloud1");
textOnCreatedClouds("cloud2");
textOnCreatedClouds("cloud3");
textOnCreatedClouds("cloud4");
textOnCreatedClouds("cloud5");

// function populateBalloons() {
//   var balloonContainer = document.getElementById("balloon-container");
//   var containerWidth = balloonContainer.offsetWidth;
//   var balloonImage = document.getElementById("balloon-image");
//   var numberOfBalloons = 25;
//   var balloonWidth = 30;

//   // var roomforeachballoon =
//   //   (containerWidth - balloonWidth * numberOfBalloons) / (numberOfBalloons + 1);

//   for (let i = 0; i < numberOfBalloons; i++) {
//     var balloon = document.createElement("img");
//     balloon.classList.add("balloon");
//     balloon.classList.add("hover-animation");
//     balloon.addEventListener("click", flyBalloon);
//     balloon.src = balloonImage.src;
//     // balloon.style.left = String(roomforeachballoon + i * balloonWidth) + "px";
//     var randomLeft = Math.floor(
//       Math.random() * (containerWidth - balloonWidth)
//     );

//     balloon.style.left = String(randomLeft) + "px";

//     balloon.style.setProperty("--hover-duration", Math.random() * 3 + 5 + "s"); // Random duration between 3s and 4s
//     balloon.style.setProperty(
//       "--hover-height",
//       Math.random() * -15 - 10 + "px"
//     ); // Random height between -10px and -25px
//     balloonContainer.appendChild(balloon);
//   }
// }

// populateBalloons();
