document.addEventListener('DOMContentLoaded', function(){
  console.log('Loaded');
  var tmplt = document.getElementsByClassName('acebook')[0];
  var bg = new Image();
  bg.onload = function() {
    console.log(bg.width, bg.height);
    tmplt.style.width = bg.width;
    tmplt.style.paddingTop = bg.height / bg.width * 100 + '%';
    tmplt.style.backgroundImage = 'url('+bg.src+')';
  };
  bg.src = 'img/acebook - template.png';
});