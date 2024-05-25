// window.onload = function () {
//   var merrywrap = document.getElementById("merrywrap");
//   var box = merrywrap.getElementsByClassName("giftbox")[0];
//   var step = 1;
//   var stepMinutes = [1500, 1500, 750, 750];

//   function init() {
//     box.addEventListener("click", openBox, false);
//   }

//   function stepClass(step) {
//     merrywrap.className = "merrywrap";
//     merrywrap.className = "merrywrap step-" + step;
//   }

//   function openBox() {
//     if (step === 1) {
//       box.removeEventListener("click", openBox, false);
//     }

//     stepClass(step);

//     if (step === 3) {
//     }

//     if (step === 4) {
//       document.querySelector(".container").style.display = "flex";
//       merrywrap.style.display = "none";
//       return;
//     }

//     setTimeout(openBox, stepMinutes[step - 1]);
//     step++;
//   }

//   init();
// };

var myAudio = document.getElementById("myAudio");
var playIcon = document.getElementById("playIcon");
var pauseIcon = document.getElementById("pauseIcon");

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
    playIcon.classList.remove("cursorPointer");
    pauseIcon.classList.add("cursorPointer");
  } else {
    myAudio.pause();
    pauseIcon.classList.remove("cursorPointer");
    playIcon.classList.add("cursorPointer");
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
    cloud1AudioContainer.insertBefore(cloudImg, cloud1AudioContainer.firstChild);
 } else {
    var contentContainer = document.querySelector(".content");
    contentContainer.insertBefore(cloudImg, contentContainer.firstChild);
  }
}


function flyBalloon() {
  var balloon = this;
  balloon.classList.remove("hover-animation");
  balloon.classList.add("float-animation");
  // newBalloonInPlace(balloon);
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
