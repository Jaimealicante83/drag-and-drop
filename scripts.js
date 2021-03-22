//Variables that will be used insid the functions below:
var sound1 = document.getElementById("myAudio");
var soundSuccess = document.getElementById("audio_success");
var counter = 0; 

var startOverlayScreen = document.getElementById("start_overlay_screen");
var instructionsOverlayText = document.getElementById("instructions_starting_overlay");
var startButton = document.getElementById("button_start_program");
var startBackground = document.getElementById("starting_overlay_background");
var startSmallScreen = document.getElementById("start_overlay_small");
var startMediumScreen = document.getElementById("start_overlay_medium");

var endOverlay = document.getElementById("ending_overlay_screen");
var endSmallOverlay = document.getElementById("end_overlay_small");
var endMediumOverlay = document.getElementById("end_overlay_medium");
var textEnding = document.getElementById("text_ending_overlay");

var endBackground = document.getElementById("ending_overlay_background");

//Functions that play audio files:
function playAudio() { 
  sound1.play(); 
} 

function successSound() { 
  soundSuccess.play(); 
} 

//this function will remove the initial Screen
function deleteInitialScreen(){
  startBackground.style.display = "none";
  startButton.style.display = "none";
  startOverlayScreen.style.display = "none";
  startSmallScreen.style.display = "none";
  startMediumScreen.style.display = "none";
  instructionsOverlayText.style.display = "none";
}

//This function will remove the initial screen, the button and the small and medium screen after pressing the Start button
function startProgram(){
  sound1.play(); 
  startOverlayScreen.classList.add('hide_object');
  instructionsOverlayText.classList.add('hide_object');
  setTimeout(function(){startButton.classList.add('hide_object'); }, 100);
  setTimeout(function(){startSmallScreen.classList.add('hide_object'); }, 450);
  setTimeout(function(){startMediumScreen.classList.add('hide_object'); }, 700);
  setTimeout(function(){startBackground.classList.add('hide_object'); }, 960);
  setTimeout(function(){deleteInitialScreen()}, 1400);
}


//This is a premade function from Interact.js (a JavaScript library)
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        /*var textEl = event.target.querySelector('p')*/

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */


function dropDraggable(element, zone){
  // enable draggables to be dropped into this
  interact(element).dropzone({
    // only accept elements matching this CSS selector
    accept: zone,
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target

      // feedback the possibility of a drop
      /*dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')*/
      /*draggableElement.textContent = 'Elemento seleccionado'*/
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      /*event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')*/
      /*event.relatedTarget.textContent = 'Dragged out'*/
    },
    ondrop: function (event) {
    /* event.relatedTarget.textContent = 'Elemento conectado'*/
      /*REPRODUCIR AUDIO CUANDO SE CONECTE */
      playAudio();
      event.relatedTarget.classList.remove('drag-drop')
      event.relatedTarget.classList.remove('can-drop')
      counter = counter + 1;
      console.log('The counter is now ' + counter);
      if (counter >= 6){
        finalScreen();
      }
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      /*event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')*/
    }
  })
}

//Function dropDraggable allows us to drop the pieces in the right dropzones 
dropDraggable('.dropzone_head', '#yes-drop-head')
dropDraggable('.dropzone_chest', '#yes-drop-chest')
dropDraggable('.dropzone_left_leg','#yes-drop-left-leg');
dropDraggable('.dropzone_right_leg','#yes-drop-right-leg')
dropDraggable('.dropzone_left_arm', '#yes-drop-left-arm')
dropDraggable('.dropzone_right_arm', '#yes-drop-right-arm')

interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })

//After building the robot the finalScreen will appear:
function finalScreen(){
  successSound();
  endBackground.classList.add('show_up')
  setTimeout(function(){
    endOverlay.classList.add('show_ending_overlay');
    textEnding.classList.add('show_ending_overlay');
  }, 360);

  setTimeout(function(){
    endMediumOverlay.classList.add('show_ending_overlay');
  }, 660);

  setTimeout(function(){
    endSmallOverlay.classList.add('show_ending_overlay');
    endSmallOverlay.classList.add('show_ending_z_index');
  }, 660);
}
