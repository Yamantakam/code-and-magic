"use strict";

var STAT_X = 100;
var STAT_Y = 10;
var STAT_WIDTH = 500;
var STAT_HEIGHT = 270;
var STAT_GAP = 10;
var STAT_FILL = "rgb(255, 255, 255)";

var FONT_SIZE = 16;
var FONT_FAMILY = "PT Mono";
var FONT = FONT_SIZE + "px " + FONT_FAMILY;
var FONT_COLOR = "rgb(0, 0, 0)";

var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var BAR_GAP = 70;
var BAR_FILL = "rgb(255, 0, 0)";

var CLOUD_X = 40;
var CLOUD_Y = -80;
var CLOUD_GAP = 5;
var CLOUD_FILL = "rgb(255, 255, 255)";



var renderObject = function(ctx, x, y, width, height, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
};

var renderText = function(ctx, text, x, y, font, color) {
  ctx.font = font;
  ctx.textBaseline = "hanging";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderCloud = function(ctx, x, y, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(300 + x, 360 + y);
  ctx.bezierCurveTo(276 + x, 375 + y, 98 + x, 383 + y, 39 + x, 351 + y);
  ctx.bezierCurveTo(22 + x, 342 + y, 3 + x, 309 + y, 23 + x, 286 + y);
  ctx.bezierCurveTo(31 + x, 277 + y, -11 + x, 240 + y, 4 + x, 184 + y);
  ctx.bezierCurveTo(25 + x, 107 + y, 119 + x, 115 + y, 132 + x, 108 + y);
  ctx.bezierCurveTo(240 + x, 46 + y, 312 + x, 113 + y, 355 + x, 99 + y);
  ctx.bezierCurveTo(396 + x, 86 + y, 539 + x, 97 + y, 580 + x, 125 + y);
  ctx.bezierCurveTo(625 + x, 156 + y, 580 + x, 223 + y, 586 + x, 243 + y);
  ctx.bezierCurveTo(600 + x, 287 + y, 623 + x, 331 + y, 523 + x, 363 + y);
  ctx.bezierCurveTo(495 + x, 372 + y, 412 + x, 375 + y, 300 + x, 360 + y);
  ctx.closePath();
  ctx.fill();
};



var getMaxElement = function(array) {
  var maxElement = array[0];
  for(var i = 0; i < array.length; i++) {
    array[i] = Math.round(array[i]);
    if(array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomColor = function(min, max) {
  return "rgb(" + getRandomNumber(min, max) + "," + getRandomNumber(min, max) + "," + "255)";
};

var sortPlayers = function(names, times) {
  var swap;
  for(var i = 0; i < names.length; i++) {
    if(names[i] == "Вы") {
      swap = names[0];
      names[0] = names[i];
      names[i] = swap;
      swap = times[0];
      times[0] = times[i];
      times[i] = swap;
      break;
    }
  }
};



var renderHistogram = function(ctx, names, times) {
  var maxTime = getMaxElement(times);
  sortPlayers(names, times);
  for(var i = 0; i < names.length; i++) {
    var barHeight = times[i] * BAR_HEIGHT_MAX / maxTime;
    var barX = STAT_X + (STAT_GAP * 5.5) + (BAR_WIDTH + BAR_GAP) * i;
    var barY = STAT_HEIGHT - STAT_GAP * 2 - barHeight;
    var fill = getRandomColor(150, 1);
    if(!(i)) {
      fill = BAR_FILL;
    }
    renderObject(ctx, barX, barY, BAR_WIDTH, barHeight, fill);
    renderText(ctx, times[i], barX, barY - FONT_SIZE, FONT, FONT_COLOR);
    renderText(ctx, names[i], barX, STAT_HEIGHT - FONT_SIZE, FONT, FONT_COLOR);
  }
};



var renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, "rgba(0, 0, 0, 0.4)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_FILL);
  renderText(ctx, "Ура вы победили!", STAT_X + FONT_SIZE * 2, STAT_Y + FONT_SIZE * 2, FONT, FONT_COLOR);
  renderText(ctx, "Список результатов:", STAT_X + FONT_SIZE * 2, STAT_Y + FONT_SIZE * 3, FONT, FONT_COLOR);
  renderHistogram(ctx, names, times);
};