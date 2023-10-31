let windows = document.getElementById('windows');
let maxZIndex = 1;
let zIndex = 2;

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

    if (elmnt.style.zIndex != maxZIndex) {
      elmnt.style.zIndex = zIndex;
      maxZIndex = zIndex;
      zIndex++;
    }
    //elementDrag.style.zIndex = zIndex;
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

function restartZIndex() {
    zIndex = 1;
}

function close_window(id) {
  let windowId = id.slice(0, -2);
  let window = document.getElementById(windowId);
  windows.removeChild(window);
  if (windows.children.length == 0) restartZIndex()
  
}

function moveElemToTop(elem) {
  elem.style.zIndex = zIndex;
  maxZIndex = zIndex;
  zIndex++;
}

function setupElements(id, window, header, closeBtn, body) {
  window.className = 'draggable';
  window.id = id;
  moveElemToTop(window);

  header.className = 'draggableheader';

  closeBtn.id = id + '_x';
  closeBtn.onclick = function() { close_window(closeBtn.id); }
  closeBtn.innerHTML = 'X';

  body.className = 'draggablecontent';

  header.appendChild(closeBtn);
  window.appendChild(header);
  window.appendChild(body);
  windows.appendChild(window);
  dragElement(window);
}

function info_window() {
  let elem = document.getElementById('info')
  if (elem) {
    moveElemToTop(elem);
    return;
  }

  var window = document.createElement('div');
  var windowHeader = document.createElement('div');
  var closeButton = document.createElement('button');
  var windowContent = document.createElement('div');

  windowHeader.innerHTML = 'Info';
  windowContent.innerHTML = 'Hello world! This is my portfolio';

  setupElements('info', window, windowHeader, closeButton, windowContent);
}

let andro_tab = 0;
let andro_tabs = `
<div id="tabs">
<button id="trackmytag" onclick="tmt()">TrackMyTag</button>
<button id="newsapp" onclick="news()">NewsApp</button>
<button id="heatmap" onclick="heatmap()">HeatMap</button>
</div>`;
let andro_tabs_content = [
  `
  <a href="https://github.com/k-surtel/TrackMyTag" target='_blank' rel='noopener noreferrer'><h2>TrackMyTag</h2></a>
  This app allows us to connect with Bluetooth beacon devices (iTags) and monitor their status. Attached to valuable items, the iTag along with the app may prove helpful in keeping those safe within the proximity of the owner, as well as providing the way of finding them if they are hidden and nowhere to be found.
  <h3>Preview</h3>
  <img src="https://github.com/k-surtel/TrackMyTag/raw/master/readme/preview1.jpg">
  <img src="https://github.com/k-surtel/TrackMyTag/raw/master/readme/preview2.jpg">
  <h3>Features</h3>
  <ul>
  <li>Connect, add to the database and manage owned iTags.</li>
  <li>Setup the distance at which you will be notified of missing beacon.</li>
  <li>Set off an alarm in the iTag device.</li>
  </ul>
  <h3>Built with</h3>
  <div class="icons">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kotlin_Icon_2021.svg/220px-Kotlin_Icon_2021.svg.png" alt="Kotlin" title="Kotlin">
  <img src="https://embetronicx.com/wp-content/uploads/2017/07/Bluetooth-Low-Energy-BLE-Introduction-1200x1200.png" alt="Bluetooth Low Energy" title="Bluetooth Low Energy">
  <img src="https://assets.carolus.kodeco.com/assets/murakami/category-icons/category-saving-data-persistence-android-9dc9eed34348d1d06a4365379fba3a54aa7aabd05d828dbb4de97349126d9718.svg" alt="Room Database" title="Room Database">
  </div>
  `, `
  <a href="https://github.com/k-surtel/NewsApp" target='_blank' rel='noopener noreferrer'><h2>NewsApp</h2></a>
  Simple, lightweight app delivering news to your phone.
  <h3>Features</h3>
  <ul>
  <li>Filter and browse news based on chosen criteria:
  <ul>
  <li>country,</li>
  <li>category,</li>
  <li>language,</li>
  <li>keywords,</li>
  <li>date,</li>
  <li>domain,</li>
  </ul>
  </li>
  <li>Easy access to the article source.</li>
  <li>Save interesting articles for later referencce.</li>
  </ul>
  <h3>Preview</h3>
  <img src="https://github.com/k-surtel/NewsApp/raw/master/readme/preview.gif">
  <h3>Built with</h3>
  <div class="icons">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kotlin_Icon_2021.svg/220px-Kotlin_Icon_2021.svg.png" alt="Kotlin" title="Kotlin">
  <img src="https://img.stackshare.io/service/2856/retrofit-logo.png" alt="Retrofit" title="Retrofit">
  <img src="https://global.discourse-cdn.com/couchbase/original/2X/0/086f8d94cff548f55e1ce7d8b6941244878fe4f3.png" alt="Couchbase Lite" title="Couchbase Lite">
  </div>
  `, `
  <a href="https://github.com/k-surtel/heat-map" target='_blank' rel='noopener noreferrer'><h2>HeatMap</h2></a>
  The library that provides a visual way of representing data in a form of daily heatmap.
  <h3>Preview</h3>
  <img src="https://github.com/kasiasurtel/heat-map/raw/master/preview/heat-map-previews.jpg" style="width:1000px;">
  <h3>Built with</h3>
  <div class="icons">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Kotlin_Icon_2021.svg/220px-Kotlin_Icon_2021.svg.png" alt="Kotlin" title="Kotlin">
  <img src="https://tabris.com/wp-content/uploads/2021/06/jetpack-compose-icon_RGB.png" alt="Jetpack Compose" title="Jetpack Compose">
  </div>
  `
];

function andro_window() {
  let elem = document.getElementById('andro')
  if (elem) {
    moveElemToTop(elem);
    return;
  }
  
  var window = document.createElement('div');
  var windowHeader = document.createElement('div');
  var closeButton = document.createElement('button');
  var windowContent = document.createElement('div');

  windowHeader.innerHTML = 'Android projects';
  windowContent.innerHTML = andro_tabs;
  windowContent.style.width = '1000px';

  var cntnt = document.createElement('div');
  cntnt.id = 'andro_content';
  cntnt.innerHTML = andro_tabs_content[andro_tab];
  windowContent.appendChild(cntnt);

  setupElements('andro', window, windowHeader, closeButton, windowContent);
}

function refresh_andro() {
  content = document.getElementById('andro_content');
  content.innerHTML = andro_tabs_content[andro_tab];
}

function tmt() {
  andro_tab = 0;
  refresh_andro();
}

function news() {
  andro_tab = 1;
  refresh_andro();
}

function heatmap() {
  andro_tab = 2;
  refresh_andro();
}