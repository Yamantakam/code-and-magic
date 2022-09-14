var NAMES = ["Иван", "Хуан Себастьян", "Мария", "Кристоф", "Виктор", "Юлия", "Люпита", "Вашингтон"];
var SURNAMES = ["да Марья", "Верон" , "Мирабелла" , "Вальц", "Онопко", "Топольницкая", "Нионго", "Ирвинг"];
var COATS = ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)", "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"];
var EYES = ["black", "red", "blue", "yellow", "green"];
var FIREBALLS = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];
var wizardsQuantity = 4;
var wizards = [];



var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMixedArray = function(array) {
  for(var i = 0; i < array.length; i++) {
    var isUnique = true;
    while(isUnique) {
      var index = getRandomNumber(0, array.length - 1);
      if(array[index] != array[i]) {
        isUnique = false;
      }
    }
    var swap = array[i];
    array[i] = array[index];
    array[index] = swap;
  }
  return array;
};



var getWizards = function(quantity) {
  var names = getMixedArray(NAMES);
  var surnames = getMixedArray(SURNAMES);
  var coats = getMixedArray(COATS);
  var eyes = getMixedArray(EYES);
  for(var i = 0; i < quantity; i++) {
    var toss = getRandomNumber(0, 1);
    var name = names[i];
    var surname = surnames[i];
    var wizardName = name + " " + surname;
    if(!(toss)) {
      wizardName = surname + " " + name;
    }
    wizards[i] = {
      name: wizardName,
      coatColor: coats[i],
      eyesColor: eyes[i]
    };
  }
};



var renderWizards = function(quantity) {
  getWizards(quantity);
  var wizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");
  var wizardsWindow = document.querySelector(".setup-similar-list");
  var wizardsGroup = document.createDocumentFragment();
  for(var i = 0; i < wizards.length; i++) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector(".setup-similar-label").textContent = wizards[i].name;
    wizard.querySelector(".wizard-coat").style.fill = wizards[i].coatColor;
    wizard.querySelector(".wizard-eyes").style.fill = wizards[i].eyesColor;
    wizardsGroup.appendChild(wizard);
  }
  wizardsWindow.appendChild(wizardsGroup);
};

renderWizards(wizardsQuantity, NAMES, SURNAMES, COATS, EYES);



var showItem = function(element) {
  var item = document.querySelector(element);
  item.classList.remove("hidden");
};

showItem(".setup-similar");





var ESC_CODE = 27;
var ENTER_CODE = 13;
var setup = document.querySelector(".setup");
var setupOpenBtn = document.querySelector(".setup-open");
var setupCloseBtn = setup.querySelector(".setup-close");
var setupUsername = setup.querySelector(".setup-user-name");



var setupOpenHandler = function() {
  setup.classList.remove("hidden");
  document.addEventListener("keydown", setupEscPressHandler);
};

var setupCloseHandler = function() {
  setup.classList.add("hidden");
  document.removeEventListener("keydown", setupEscPressHandler);
};

var setupEscPressHandler = function(evt) {
  var activeElement = document.activeElement;
  if(evt.keyCode === ESC_CODE && activeElement != setupUsername) {
    setupCloseHandler();
  }
};



setupOpenBtn.addEventListener("click", function() {
  setupOpenHandler();
});

setupOpenBtn.addEventListener("keydown", function(evt) {
  if(evt.keyCode === ENTER_CODE) {
    setupOpenHandler();
  }
});

setupCloseBtn.addEventListener("click", function() {
  setupCloseHandler();
});

setupCloseBtn.addEventListener("keydown", function(evt) {
  if(evt.keyCode === ENTER_CODE) {
    setupCloseHandler();
  }
});



var setupCoatInput = setup.querySelector("input[name=coat-color]");
var setupEyesInput = setup.querySelector("input[name=eyes-color]");
var setupFireballInput = setup.querySelector("input[name=fireball-color]");
var userWizard = document.querySelector(".setup-wizard");
var wizardCoat = userWizard.querySelector(".wizard-coat");
var wizardEyes = userWizard.querySelector(".wizard-eyes");
var wizardFireball = setup.querySelector(".setup-fireball-wrap");
var wizardCoats = getMixedArray(COATS);
var wizardCoatsCount = 0;
var wizardEyesAll = getMixedArray(EYES);
var wizardEyesCount = 0;
var fireballs = getMixedArray(FIREBALLS);
var fireballsCount = 0;



var wizardCoatChangeHandler = function() {
  wizardCoat.style.fill = wizardCoats[wizardCoatsCount];
  setupCoatInput.value = wizardCoats[wizardCoatsCount];
  wizardCoatsCount++;
  if(wizardCoatsCount == wizardCoats.length) {
    wizardCoatsCount = 0;
  }
};

var wizardEyesChangeHandler = function() {
  wizardEyes.style.fill = wizardEyesAll[wizardEyesCount];
  setupEyesInput.value = wizardEyesAll[wizardEyesCount];
  wizardEyesCount++;
  if(wizardEyesCount == wizardEyesAll.length) {
    wizardEyesCount = 0;
  }
};

var wizardFireballChangeHandler = function() {
  wizardFireball.style.background = fireballs[fireballsCount];
  setupFireballInput.value = fireballs[fireballsCount];
  fireballsCount++;
  if(fireballsCount == fireballs.length) {
    fireballsCount = 0;
  }
};



wizardCoat.addEventListener("click", wizardCoatChangeHandler);
wizardEyes.addEventListener("click", wizardEyesChangeHandler);
wizardFireball.addEventListener("click", wizardFireballChangeHandler);
