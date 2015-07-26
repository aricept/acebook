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

  self.removeKudo = function(index) {
    self.replist.splice(index, 1);
  };

  self.likeClick = function(kudo) {
    kudo.likes(kudo.likes() + 1);
  };

  self.selectImg = function(data, evt) {
    var file = document.getElementById('file' + evt.target.id);
    file.click();
  };

};

ko.applyBindings(new acebook());