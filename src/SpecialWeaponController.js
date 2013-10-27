function SpecialWeaponController(){
  this.weapons = [];
  var that = this;

  var source = $("#weapons-list-template").html();
  this.template = Handlebars.compile(source);
  this.weapons_container = $('.weapons.template').clone()
    .removeClass('template');
  $('#wrapper').append(this.weapons_container);
  $("body").on("click", ".weapon-image", function(){
    var weapon = $(this).parent('.weapon');
    if (weapon.hasClass('loading')) {
      return;
    }
    var index = weapon.data('id');
    that.activate(index);
    weapon.addClass('loading');
    setTimeout(function(){
      weapon.removeClass('loading');
    }, 10000);
  });
}

SpecialWeaponController.prototype.add = function(weapon){
  this.weapons.push(weapon);
  this.renderList();
};

SpecialWeaponController.prototype.update = function(){
  for (var i=0;i<this.weapons.length;i++) {
    var weapon = this.weapons[i];
    if (weapon.active) {
      if (!weapon.update()) {
        weapon.active = false;
        weapon.reset();
      }
    }
  }
};

SpecialWeaponController.prototype.render = function(){
  for (var i=0;i<this.weapons.length;i++) {
    var weapon = this.weapons[i];
    if (weapon.active) {
      weapon.render();
    }
  }
};


SpecialWeaponController.prototype.renderList = function() {
  this.weapons_container.html(this.template({weapons: this.weapons}));
};

SpecialWeaponController.prototype.activate = function(index) {
  console.log("index", index);
  this.weapons[index].active = true;
};
