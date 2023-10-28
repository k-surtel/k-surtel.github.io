let windows = document.getElementById('windows');

let draggableElements = document.getElementsByClassName("draggable");
for (let elem of draggableElements) {
  dragElement(elem);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let header = elmnt.querySelector('.draggableheader');
  if (header) {
    // if present, the header is where you move the DIV from:
    header.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function info_window() {
  if (document.getElementById('info')) return;

  var draggableElement = document.createElement('div');
  draggableElement.className = 'draggable';
  draggableElement.id = 'info';

  var draggableElementHeader = document.createElement('div');
  draggableElementHeader.className = 'draggableheader';
  draggableElementHeader.innerHTML = 'Info';

  var closeButton = document.createElement('button');
  closeButton.id = 'info_x';
  closeButton.onclick = function() { close_window(closeButton.id); }
  closeButton.innerHTML = 'X';

  var windowContent = document.createElement('div');
  windowContent.className = 'draggablecontent';
  windowContent.innerHTML = 'Hello world, this is my portfolio';

  draggableElementHeader.appendChild(closeButton);
  draggableElement.appendChild(draggableElementHeader);
  draggableElement.appendChild(windowContent);
  windows.appendChild(draggableElement);
  dragElement(draggableElement);
}

function close_window(id) {
  let windowId = id.slice(0, -2);
  let window = document.getElementById(windowId);
  windows.removeChild(window);
}