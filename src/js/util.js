// var getWizards = function(quantity) {
//   var names = getMixedArray(NAMES);
//   var surnames = getMixedArray(SURNAMES);
//   var coats = getMixedArray(COATS);
//   var eyes = getMixedArray(EYES);
//   for(var i = 0; i < quantity; i++) {
//     var toss = getRandomNumber(0, 1);
//     var name = names[getRandomNumber(0, names.length - 1)];
//     var surname = surnames[getRandomNumber(0, surnames.length - 1)];
//     var wizardName = name + " " + surname;
//     if(!(toss)) {
//       wizardName = surname + " " + name;
//     }
//     wizards[i] = {
//       name: wizardName,
//       coatColor: coats[getRandomNumber(0, coats.length - 1)],
//       eyesColor: eyes[getRandomNumber(0, eyes.length - 1)]
//     };
//   }
// }; - старая функция генерации волшебников, каждый параметр каждый раз генерировался случайно, были возможны редкие совпадения
// и прочее, но сейчас используется функция, в которой массивы с параметрами вроде глаз и прочего просто перемешиваются, а потом
// по порядку достаются для каждого волшебника, лучше и оптимизированней, но как то стирильно, что ли