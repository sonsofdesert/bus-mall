'use strict';

TheProduct.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can',
  'wine-glass'];

TheProduct.all = [];
TheProduct.container = document.getElementById('image_container');
TheProduct.justViewed = [];
TheProduct.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
TheProduct.tally = document.getElementById('tally');
TheProduct.totalClicks = 0;

function TheProduct(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  TheProduct.all.push(this);
}
for(var i = 0; i < TheProduct.names.length; i++) {
  new TheProduct(TheProduct.names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * TheProduct.names.length);
}

function displayPics() {
  var currentlyDisiplaying = [];

  currentlyDisiplaying[0] = makeRandom();
  while (TheProduct.justViewed.indexOf(currentlyDisiplaying[0]) !== -1) {
    console.error('Duplicate, or in prior view! Re run!');
    currentlyDisiplaying[0] = makeRandom();
  }
  currentlyDisiplaying[1] = makeRandom();
  while(currentlyDisiplaying[0] === currentlyDisiplaying[1] || TheProduct.justViewed.indexOf(currentlyDisiplaying[1]) !== -1) {
    console.error('Duplicate at center, or in prior view! Re run!');
    currentlyDisiplaying[1] = makeRandom();
  }
  //the right image
  currentlyDisiplaying[2] = makeRandom();
  while(currentlyDisiplaying[0] === currentlyDisiplaying[2] || currentlyDisiplaying[1] === currentlyDisiplaying[2] || TheProduct.justViewed.indexOf(currentlyDisiplaying[2]) !== -1) {
    console.error('Duplicate at 3rd one! Re run it!');
    currentlyDisiplaying[2] = makeRandom();
  }

  for(var i = 0; i < 3; i++) {
    TheProduct.pics[i].src = TheProduct.all[currentlyDisiplaying[i]].path;
    TheProduct.pics[i].id = TheProduct.all[currentlyDisiplaying[i]].name;
    TheProduct.all[currentlyDisiplaying[i]].views += 1;
    TheProduct.justViewed[i] = currentlyDisiplaying[i];
  }
}
//click events
function click(event) {
  console.log(TheProduct.totalClicks, 'total clicks');
  if(TheProduct.totalClicks > 24) {
    TheProduct.container.removeEventListener('click', click);
    showTally();
  }
  if (event.target.id === 'image_container') {
    return alert('You need to click on an image.');
  }
  TheProduct.totalClicks += 1;
  for(var i = 0; i < TheProduct.names.length; i++) {
    if(event.target.id === TheProduct.all[i].name) {
      TheProduct.all[i].votes += 1;
      console.log(event.target.id + ' has ' + TheProduct.all[i].votes + ' votes in ' + TheProduct.all[i].views + ' views');
    }
  }
  displayPics();
}

function showTally() {
  for(var i = 0; i < TheProduct.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = TheProduct.all[i].name + ' has ' + TheProduct.all[i].votes + ' votes in ' + TheProduct.all[i].views + ' views';
    TheProduct.tally.appendChild(liEl);
  }
}

TheProduct.container.addEventListener('click', click);
displayPics();
