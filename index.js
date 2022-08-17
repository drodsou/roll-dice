const sounds = {
  roll: new Audio("sounds/roll.mp3"),
  normal: new Audio("sounds/normal.mp3"),
  fail: new Audio("sounds/fail.mp3"),
  success: new Audio("sounds/success.mp3"),
}


// -- data
const data = {
  min: 0,
  max:4,
  value : 0,
  rolling : false
}

window.data = data; // debug


// -- elements
const elValue = document.querySelector('#value');
const elMin = document.querySelector('#min');
const elMax = document.querySelector('#max');


// -- render
function render() {
  elMin.value = data.min;
  elMax.value = data.max;
  if (data.rolling) {
    elValue.innerText = '...';
    elValue.classList.add('rolling');
  } else {
    elValue.innerText = data.value;
    elValue.classList.remove('rolling');
  }
}

//  -- actions
function doUpdateData() {
  console.log('updateData');
  data.min = parseInt(elMin.value)
  data.max = parseInt(elMax.value)
  render();
}

async function doNewValue() {
  data.rolling = true;
  sounds.roll.play();
  render();

  await wait(500);
  data.value = Math.floor( (Math.random()) * (data.max -  data.min + 1))  + data.min
  if (data.value === data.min) { sounds.fail.play() }
  else if (data.value === data.max) { sounds.success.play() }
  else { sounds.normal.play() }

  if (window.innerHeight > window.innerWidth) {
    // on my mobile there is a little delay playing sounds
    await wait(100);
  }
  data.rolling = false;
  render();
}

// -- events
elValue.addEventListener('click',doNewValue);
elMin.addEventListener('change', doUpdateData);
elMax.addEventListener('change', doUpdateData);

// -- start
render();


// -- helper 

function wait(ms) {
  return new Promise(resolve=>setTimeout(resolve,ms));
}


