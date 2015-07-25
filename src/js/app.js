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

var Kudos = function() {
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

};

var acebook = function() {
  var self = this;

  self.replist = ko.observableArray();

  self.replist().push(new Kudos());

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

  self.newKudo = function() {
    self.replist.push(new Kudos());
    console.log(self.replist().length, self.replist().indexOf(this));
  };

  self.likeClick = function(kudo) {
    kudo.likes(kudo.likes() + 1);
  };

  self.selectImg = function() {
    var file = document.getElementById('file');
    file.click();
  };

};

ko.applyBindings(new acebook());