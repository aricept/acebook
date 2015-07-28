/*document.addEventListener('DOMContentLoaded', function(){
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
});*/

var Kudos = function(kudo) {
  var self = this;
  self.name = ko.observable('Agent Name');
  self.img = ko.observable('');
  self.quote = ko.observable('A quote from the customer');
  self.mgr = ko.observable('Manager Name');
  self.pat = ko.observable('Commentary goes here');
  self.likes = ko.observable(51);
  self.editName = ko.observable(false);
  self.editQuote = ko.observable(false);
  self.editMgr = ko.observable(false);
  self.editPat = ko.observable(false);
  self.editImg = ko.observable(false);
  self.imgLoaded = ko.observable(false);
};

var acebook = function() {
  var self = this;
  var kudo = {};

  self.replist = ko.observableArray();
  window.replist = self.replist;

  self.lastItem = function(index) {
    console.log(index);
    console.log(self.replist().length - 1);
    return index === self.replist().length - 1;
  };

  window.lastItem = self.lastItem;

  kudo.lastItem = self.lastCheck;

  self.replist().push(new Kudos(kudo));

  self.currKudo = ko.observable();

  self.editName = function(kudo) {
    kudo.editName(!kudo.editName());
  };

  self.editMgr = function(kudo) {
    kudo.editMgr(!kudo.editMgr());
  };

  self.editPat = function(kudo) {
    kudo.editPat(!kudo.editPat());
  };

 self.editQuote = function(kudo) {
    kudo.editQuote(!kudo.editQuote());
  };

  self.editImg = function(kudo) {
    self.currKudo(kudo);
    kudo.editImg(!kudo.editImg());
  };

  self.newKudo = function() {
    self.replist.push(new Kudos());
  };

  self.removeKudo = function(kudo) {
    // self.replist.splice(index, 1);
    self.replist.remove(kudo);
  };

  self.likeClick = function(kudo) {
    kudo.likes(kudo.likes() + 1);
  };

  self.selectImg = function(data, evt) {
    self.editImg(data);
    var file = document.getElementById('file' + evt.target.id);
    file.click();
  };

  self.loadImg = function(data, evt) {
    var imgElem = document.getElementById('canvas');
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        imgElem.src = e.target.result;
        self.resizeableImage(imgElem, data, self.imgLoaded);
      };
      img.src = e.target.result;
      // data.img(e.target.result);

      // self.editImg(data);
    };
    reader.readAsDataURL(file);
  };

  self.imgLoaded = function(kudo, imgData) {
    self.editImg(kudo);
    kudo.img(imgData);
    self.currKudo(null);
    kudo.imgLoaded(true);
  };

  self.resizeableImage = function(image_target, kudo, cb) {
  // Some variable and settings
  var $container,
      orig_src = new Image(),
      image_target = $(image_target).get(0),
      event_state = {},
      constrain = true,
      min_width = 150, // Change as required
      min_height = 150,
      max_width = 800, // Change as required
      max_height = 900,
      resize_canvas = document.createElement('canvas');

  init = function(){

    // When resizing, we will always use this copy of the original as the base
    orig_src.src=image_target.src;

    // Wrap the image with the container and add resize handles
    $(image_target).wrap('<div class="resize-container"></div>')
    .before('<span class="resize-handle resize-handle-nw"></span>')
    .before('<span class="resize-handle resize-handle-ne"></span>')
    .after('<span class="resize-handle resize-handle-se"></span>')
    .after('<span class="resize-handle resize-handle-sw"></span>');

    // Assign the container to a variable
    $container =  $(image_target).parent('.resize-container');

    // Add events
    $container.on('mousedown touchstart', '.resize-handle', startResize);
    $container.on('mousedown touchstart', 'img', startMoving);
    $('.canvas-done').on('click', crop);
  };

  startResize = function(e){
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', resizing);
    $(document).on('mouseup touchend', endResize);
  };

  endResize = function(e){
    e.preventDefault();
    $(document).off('mouseup touchend', endResize);
    $(document).off('mousemove touchmove', resizing);
  };

  saveEventState = function(e){
    // Save the initial event details and container state
    event_state.container_width = $container.width();
    event_state.container_height = $container.height();
    event_state.container_left = $container.offset().left;
    event_state.container_top = $container.offset().top;
    event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
    event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

  // This is a fix for mobile safari
  // For some reason it does not allow a direct copy of the touches property
  if(typeof e.originalEvent.touches !== 'undefined'){
    event_state.touches = [];
    $.each(e.originalEvent.touches, function(i, ob){
      event_state.touches[i] = {};
      event_state.touches[i].clientX = 0+ob.clientX;
      event_state.touches[i].clientY = 0+ob.clientY;
    });
  }
    event_state.evnt = e;
  };

  resizing = function(e){
    var mouse={},width,height,left,top,offset=$container.offset();
    mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

    // Position image differently depending on the corner dragged and constraints
    if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
      width = mouse.x - event_state.container_left;
      height = mouse.y  - event_state.container_top;
      left = event_state.container_left;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-sw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = mouse.y  - event_state.container_top;
      left = mouse.x;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-nw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = mouse.x;
      top = mouse.y;
      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    } else if($(event_state.evnt.target).hasClass('resize-handle-ne') ){
      width = mouse.x - event_state.container_left;
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = event_state.container_left;
      top = mouse.y;
      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    }

    // Optionally maintain aspect ratio
    if(constrain || e.shiftKey){
      height = width / orig_src.width * orig_src.height;
    }

    if(width > min_width && height > min_height && width < max_width && height < max_height){
      // To improve performance you might limit how often resizeImage() is called
      resizeImage(width, height);
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      $container.offset({'left': left, 'top': top});
    }
  }

  resizeImage = function(width, height){
    resize_canvas.width = width;
    resize_canvas.height = height;
    resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
    $(image_target).attr('src', resize_canvas.toDataURL("image/png"));
  };

  startMoving = function(e){
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', moving);
    $(document).on('mouseup touchend', endMoving);
  };

  endMoving = function(e){
    e.preventDefault();
    $(document).off('mouseup touchend', endMoving);
    $(document).off('mousemove touchmove', moving);
  };

  moving = function(e){
    var  mouse={}, touches;
    e.preventDefault();
    e.stopPropagation();

    touches = e.originalEvent.touches;

    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
    $container.offset({
      'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
      'top': mouse.y - ( event_state.mouse_y - event_state.container_top )
    });
    // Watch for pinch zoom gesture while moving
    if(event_state.touches && event_state.touches.length > 1 && touches.length > 1){
      var width = event_state.container_width, height = event_state.container_height;
      var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
      a = a * a;
      var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
      b = b * b;
      var dist1 = Math.sqrt( a + b );

      a = e.originalEvent.touches[0].clientX - touches[1].clientX;
      a = a * a;
      b = e.originalEvent.touches[0].clientY - touches[1].clientY;
      b = b * b;
      var dist2 = Math.sqrt( a + b );

      var ratio = dist2 /dist1;

      width = width * ratio;
      height = height * ratio;
      // To improve performance you might limit how often resizeImage() is called
      resizeImage(width, height);
    }
  };

  crop = function(){
    //Find the part of the image that is inside the crop box
    var crop_canvas,
        left = $('.overlay').offset().left - $container.offset().left,
        top =  $('.overlay').offset().top - $container.offset().top,
        width = $('.overlay').width(),
        height = $('.overlay').height();

    crop_canvas = document.createElement('canvas');
    crop_canvas.width = width;
    crop_canvas.height = height;

    var cropctx = crop_canvas.getContext('2d');
    console.log(image_target);
    cropctx.drawImage(image_target, left, top, width, height, 0, 0, width, height);
    // window.open(crop_canvas.toDataURL("image/png"));
    cb(kudo, crop_canvas.toDataURL("image/png"));
  }

  init();
};

};




ko.applyBindings(new acebook());