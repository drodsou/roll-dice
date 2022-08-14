
// -- data
const data = {
  min: 0,
  max:4,
  value : 0
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
  elValue.innerText = data.value;
}

//  -- actions
function doUpdateData() {
  console.log('updateData');
  data.min = parseInt(elMin.value)
  data.max = parseInt(elMax.value)
  render();
}

function doNewValue() {
  elValue.innerText = '';
  setTimeout(()=>{
    data.value = Math.floor( (Math.random()) * (data.max -  data.min + 1))  + data.min
    render();
  },300);
}

// -- events
elValue.addEventListener('click',doNewValue);
elMin.addEventListener('change', doUpdateData);
elMax.addEventListener('change', doUpdateData);

// -- start
render();
