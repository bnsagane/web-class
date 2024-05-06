
/*variables */
const itemClassName = "carousel__card";
const nextbtn = document.getElementById("next");
const prevbtn = document.getElementById("prev");
const dots = document.querySelectorAll(".dot");

let items = document.getElementsByClassName(itemClassName);
let totalItems = items.length;
let activeSlide = 0;
let moving = false;
let totalWidth = "";
let singleAmountToMoveHorizontally = "";
let positionX = "";
let storeOldIndex = "";
let differenceToMove = "";
let amountOfTimesToLoopLeft = 0;
let amountOfTimesToLoopRight = 0;

/*functions*/
function moveCardsHorizontally(amountToMove) {
  for (let key in items) {
    if (items.hasOwnProperty(key)) {
      value = items[key];
      //console.log(`items[${key}] = ${value}`);
      items[key].style.transform = `translate(${amountToMove}px)`;
    }
  }
}
function getNewPosition(direction) {
  totalWidth = items[0].parentElement.parentElement.parentElement.clientWidth; //1188  
  singleAmountToMoveHorizontally = items[0].offsetWidth;  //422
  console.log(
    `singleAmountToMoveHorizontally = totalWidth:${totalWidth} / totalItems:${totalItems} = ${singleAmountToMoveHorizontally}`
  );
  if (direction === "right") {
    console.log("parameter ->move right");
    //We need to add one because the array index is 0 to n
    positionX = Math.floor(singleAmountToMoveHorizontally * activeSlide + 1); //
    console.log(
      `positionX =  singleAmountToMoveHorizontally:${singleAmountToMoveHorizontally} * activeSlide:${
        activeSlide + 1
      } = ${positionX}`
    );
  } else if (direction === "left") {
    console.log("parameter <- move left");
    positionX = Math.floor(positionX - singleAmountToMoveHorizontally);
    console.log(
      `positionX = positionX - singleAmountToMoveHorizontally:${singleAmountToMoveHorizontally} = ${positionX}`
    );
  }
  return positionX;
}
function disableInteraction() {
  // Set 'moving' to true for the same duration as our transition.
  // (0.5s = 500ms)
  moving = true;
  // setTimeout runs its function once after the given time
  setTimeout(function () {
    moving = false;
  }, 500);
}
function toggleActiveClass(oldIndex, newIndex) {
  //remove all active class
  items[oldIndex].classList.remove("active");
  dots[oldIndex].classList.remove("active");
  //add active class to the one passed in by parameter
  items[newIndex].classList.add("active");
  dots[newIndex].classList.add("active");
}
function moveCardsDotsHorizontally(dir) {
  moveCardsHorizontally(-getNewPosition(dir));
  storeOldIndex = activeSlide;
  console.log(`storeOldIndex= ${storeOldIndex}`);
  if (dir === "left") {
    activeSlide = activeSlide - 1;
    console.log(`activeSlide - 1 = ${activeSlide}`);
  } else {
    activeSlide = activeSlide + 1;
    console.log(`activeSlide + 1 = ${activeSlide}`);
  }
  toggleActiveClass(storeOldIndex, activeSlide);
}

function determineDifference(initial, final) {  
  differenceToMove = Math.floor(final - initial);
  console.log(`differenceToMove = final:${final} - initial:${initial} = ${differenceToMove}`);
  return differenceToMove;
}
// Set event listeners
nextbtn.onclick = function () {
  // Check if carousel is moving, if not, allow interaction
  if (!moving) {
    console.log("next button clicked");
    // temporarily disable interactivity
    disableInteraction();
    if (activeSlide === totalItems-1) {
      console.log(
        `active slide is activeSlide:${activeSlide} = totalItems:${totalItems} cant go more to the right`
      );
    } else {
      moveCardsDotsHorizontally("right");
    }
  }
};
prevbtn.onclick = function () {
  if (!moving) {
    console.log("prev button clicked");
    // temporarily disable interactivity
    disableInteraction();
    if (activeSlide === 0) {
      console.log("active slide is 1 cant go more to the left");
    } else {
      moveCardsDotsHorizontally("left");
    }
  }
};
document.querySelectorAll(".dot").forEach((item, index) => {
  item.addEventListener("click", (e) => {
    console.log("clicked on dot");
    //check what index was selected
    console.log(`index:${index} and item:${item}`);
    //get current slide and determine if the difference is greater or less than
    if (index > activeSlide) {
      console.log(`index:${index} > activeSlide:${activeSlide} move right`);      
      amountOfTimesToLoopRight = Math.floor(determineDifference(index, activeSlide) * -1);
      console.log(`amountOfTimesToLoopRight=${amountOfTimesToLoopRight}`);
      for(var i=0;i<amountOfTimesToLoopRight;i++){
        moveCardsDotsHorizontally("right");
      }
    } else {
      console.log(`index:${index} < activeSlide:${activeSlide} move left`);
      amountOfTimesToLoopLeft = determineDifference(index, activeSlide);  
      console.log(`amountOfTimesToLoopLeft=${amountOfTimesToLoopLeft}`);    
      for(var j=0;j<amountOfTimesToLoopLeft;j++){
        moveCardsDotsHorizontally("left");
      }      
    }    
  });
});
