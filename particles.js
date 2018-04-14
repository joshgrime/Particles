$(document).ready(function(e){

var keys = {};

  $(document).keydown(function(event){
    keys[event.which] = true;
  }).keyup(function(event){
    var key = event.which;
    delete keys[key];
  });

  function gameLoop() {
    var speed = 25;
    if (keys[37]) {
      var current = $('#player').css('left');
      var left0 = current.substring(0,(current.length-2));
        if (left0 <= 40) {
          $('#player').css('left', '0px');
        }
        else {
      var left1 = current.substring(0,(current.length-2)) - speed;
      var left2 = left1 + 'px';
      $('#player').css('left', left2);
    }
  }
    if (keys[39]) {
      var current = $('#player').css('left');
      var left0 = current.substring(0,(current.length-2));
      if (left0 >= 710) {
        $('#player').css('left', '760px');
      }
      else {
      var left1 = Number(current.substring(0,(current.length-2))) + speed;
      var left2 = left1 + 'px';
      $('#player').css('left', left2);
      }
      }

    setTimeout(gameLoop, 30);
  }
  gameLoop();
});

function particles (speeder) {

var d = new Date;
var dt = d.getTime();

class Particle {
    constructor(time, speed, lifespan){
    this.id = time;
    this.colour = function () {
      var colours = ['#7aadff', '#79ffcc', '#ff79ac', '#ff5959', '#ffbf59', '#62ba97', '#5ff442', '#8e1169', '#ffd000', '#47f5ff', '#ffffff'];
      var chosenColour = colours[Math.floor(Math.random() * colours.length)];
      return chosenColour;
    };
    this.timeout = lifespan;

    this.speed = speed;

    this.pos = function () {
      var left = (Math.floor(Math.random() * 700) + 1);
      return left;
    };
    this.alive = function () {
      var id = this.id;
      var current = $('#'+id).css('top');
      var check = Number(current.substring(0,(current.length-2)));

      if (check >= 400) {
        this.end(id);
      }
      else if (check < 400 && check > 380) {
        this.collision(id);
      }
      else {
        this.move(id);
      }
    }
    this.move = function (id) {
      var current = $('#'+id).css('top');
      var top1 = Number(current.substring(0,(current.length-2))) + this.speed;
      var top2 = top1 + 'px';
      $('#'+id).css('top', top2);
      setTimeout(function(){particle.alive();}, 10);
    };
    this.end = function (id) {
      $('#'+id).remove();
      miss();
    };
    this.hit = function (id) {
      $('#'+id).remove();
      score();
    };
    this.collision = function (id) {
      var pp1 = $('#player').css('left');
      var playerPos = Number(pp1.substring(0,(pp1.length-2)));
      var pp2 = $('#'+id).css('left');
      var particlePos = Number(pp2.substring(0,(pp2.length-2)));

      if (particlePos > playerPos  && particlePos < (playerPos + 40)) {
        console.log('hit!');
        this.hit(id);
      }
      else {setTimeout(function(){particle.move(id);}, 10);}
    };
  }
}


var lifespan = (Math.floor(Math.random() * 5000) + speeder);
var speed = (400 / (lifespan/1000)) / 10;

var particle = new Particle(dt, speed, lifespan);

var colour = particle.colour();
var pos = particle.pos();


$('#canvas').append('<div class="particle" id="'+particle.id+'" style="background-color:'+colour+'; left:'+pos+'px; top: -10px;"></div>');

particle.alive();

var counter = $('#counter2').text();
var newCounter = parseInt(counter) + 1;
$('#counter2').text(newCounter);

}

function score () {
  var score = $('#score').text();
  var newScore = parseInt(score) + 10;
  $('#score').text(newScore);

  var counter = $('#counter1').text();
  var newCounter = parseInt(counter) + 1;
  $('#counter1').text(newCounter);

  var hiScore = $('#hiScore').text();
  var newHiScore = parseInt(hiScore);

  if (newHiScore < newScore) {
    $('#hiScore').text(newScore);
  }

}

function miss () {
  var counter = $('#counter3').text();
  var newCounter = parseInt(counter) + 1;
  $('#counter3').text(newCounter);
}
