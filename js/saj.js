"use strict";

$(document).ready(function() {

  var $container = $('#text').masonry({
    columnWidth: 50,
  });
  $container.imagesLoaded( function() {
    $container.masonry();
  });

  var w = $(window).width();
  //var h = $(document).height();
  var h = 900;

  var art = [
    lines
    , letters
    , squares
    , squaresIpodVersion
    , squaresTetrisVersion
    , circles
  ];
  //art[rand(art.length)-1](w,h);
  var bgcolor = circles(w,h);
 console.log(bgcolor); 
  $('body').css('background-color', bgcolor);

  // class="canvas-container" is created by fabric and has
  // a default postion of relative
  $('.canvas-container').css('position', 'fixed'); 
});

function squares(w,h) {
  // √ http://serth.org/cgi-bin/maps/gdii.cgi
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(h - 20);
  canvas.setWidth(w - 20);
  var bgcolor = rand_hex_color();
  canvas.backgroundColor = bgcolor;

  var num = rand( (h + w) /  10)
  var x = rand(w);
  var y = rand(h);

  for (var i=1; i < num; i++) {
    var x1 = rand(w);
    var y1 = rand(h);
    var rect = new fabric.Rect({
      left: x,
      top: y,
      fill: rand_hex_color(),
      width: x1,
      height: y1
    });
    canvas.add(rect);
    if (rand(2) == 1) {
      x = x1;
      y = y1;
    }
  }
  return bgcolor;
}

function squaresIpodVersion(w,h) {
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(h - 20);
  canvas.setWidth(w - 20);
  canvas.backgroundColor = rand_hex_color();
    var num = 10
    var x = rand(w);
    var y = rand(h);
  for (var i=1; i < num; i++) {
    var x1 = rand(w);
    var y1 = rand(h);
    var rect = new fabric.Rect({
      left: x,
      top: y,
      fill: 'black',
      width: x1,
      height: y1
    });
    canvas.add(rect);
  }
}

function squaresTetrisVersion(w,h) {
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(h - 20);
  canvas.setWidth(w - 20);
  canvas.backgroundColor = rand_hex_color();
    var num = 5;
    var x = rand(w);
    var y = rand(h);
  var color = rand_hex_color();
  for (var i=1; i < num; i++) {
    var x1 = rand(w);
    var y1 = rand(h);
    var rect = new fabric.Rect({
      left: x,
      top: y,
      fill: color,
      width: x1,
      height: y1
    });
    canvas.add(rect);
  }
}

function circles(w,h) {
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(h - 5);
  canvas.setWidth(w - 20);
  var bgcolor = rand_hex_color();
  canvas.backgroundColor = bgcolor;
  var num = 10;
  //var x = rand(w / 2);
  //var y = rand(h / 2);
  for (var i=1; i < num; i++) {
    var x1 = rand(w / 2);
    var y1 = rand(h / 2);

    var color = new fabric.Color.fromHex(rand_hex_color());
    color.setAlpha(Math.random());
    var rgba = color.toRgba();

    var circ = new fabric.Circle({
      //left: x,
      //top: y,
      //left: x1 % 2 ? x1 : x,
      //top:  y1 % 2 ? y1 : y,
      left: x1,
      top:  y1,
      fill: rgba,
      radius: rand(( h + w ) / 4)
    });
    canvas.add(circ);

    // Some animation
    // Makes things very slow and crashes some browsers!
    // Need to fix. Sorry! :(

    var dir = ['left', 'top'];
    var amt = ['-=' + rand(h), '+=' + rand(h)];

    circ.animate(dir[rand(dir.length)-1], amt[rand(amt.length)-1], { 
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000000, 
      easing: fabric.util.ease.easeOutBounce
    });
    circ.animate(dir[rand(dir.length)-1], amt[rand(amt.length)-1], {
      onChange: canvas.renderAll.bind(canvas),
      duration: 1000000,
      easing: fabric.util.ease.easeOutElastic,
    });
  }
  return bgcolor;
}

function letters(w,h) {
  // √ http://serth.org/cgi-bin/maps/patterns.cgi
  for (var i=0; i < 800; i++) {
    $('#canvas').css({ 
      'position': 'absolute', 
      'width': w, 
      'height': h, 
      'background-color': rand_hex_color(), 
    });
    var char = String.fromCharCode(rand(255))
    var x = rand(w / 1.1)
    var y = rand(h / 1.2)
    var size = rand(200);
      for (var j=0; j < 3; j++) {
        $('#canvas').append('<div style="position:absolute; left:'+ (x-j) +'px; top:'+ (y-j) +'px; color:'+rand_hex_color()+'; font-size:'+size+'px;">'+char+'</div>');
      }
  }
} 

function lines(w, h) {
  // √ http://serth.org/cgi-bin/maps/maps.cgi
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(h - 20);
  canvas.setWidth(w - 20);
  canvas.backgroundColor = rand_hex_color();

  var x = rand(w)
    , y = rand(h);

  for (var i=0; i < rand(99); i++) {
    var x1 = rand(w)
      , y1 = rand(h);
    var path = new fabric.Path('M' + x + ' ' + y + ' L' + x1 + ' ' + y1 + ' z');
    path.set({ stroke: rand_hex_color() });
    canvas.add(path);

    x = x1;
    y = y1;
  }
}

function rand (n) {
  return (Math.floor (Math.random()*n+1));
}

function rand_hex_color() {
  // http://paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+ ('000000' + rand(16777215).toString(16)).slice(-6);
}
