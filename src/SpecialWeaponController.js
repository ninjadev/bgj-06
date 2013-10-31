function SpecialWeaponController() {
  this.weapons = [];
  this.cooldown = [];
  var that = this;

  var source = $("#weapons-list-template").html();
  this.template = Handlebars.compile(source);
  this.$weapons_container = $('.weapons.template').clone()
    .removeClass('template');
  $('#wrapper').append(this.$weapons_container);
  $("body").on("click touchstart", ".weapon-image", function() {
    var weapon = $(this).parent('.weapon');
    that.activate(weapon, weapon.data('id'));
  });
}

SpecialWeaponController.prototype.add = function(weapon) {
  this.weapons.push(weapon);
  this.renderList();
};

SpecialWeaponController.prototype.update = function() {
  for (var i = 0; i < this.weapons.length; i++) {
    var weapon = this.weapons[i];
    if (weapon.active) {
      if (!weapon.update()) {
        weapon.active = false;
        weapon.reset();
      }
    }
  }
  if (KEYS[49] && this.weapons[0]) {
    var weapon = $('.weapons').find("[data-id='" + 0 + "']");
    this.activate(weapon, 0);
  }
  if (KEYS[50] && this.weapons[1]) {
    var weapon = $('.weapons').find("[data-id='" + 1 + "']");
    this.activate(weapon, 1);
  }
  if (KEYS[51] && this.weapons[2]) {
    var weapon = $('.weapons').find("[data-id='" + 2 + "']");
    this.activate(weapon, 2);
  }

};

SpecialWeaponController.prototype.render = function() {
  for (var i = 0; i < this.weapons.length; i++) {
    var weapon = this.weapons[i];
    if (weapon.active) {
      weapon.render();
    }
  }
};


SpecialWeaponController.prototype.renderList = function() {
  this.$weapons_container.html(this.template({weapons: this.weapons})).show();
};

SpecialWeaponController.prototype.activate = function(weaponDOM, index) {
  var weapon = this.weapons[index];
  if (weapon.loading) {
    return;
  }
  weapon.loading = true;
  weaponDOM.addClass('loading');
  clearTimeout(this.cooldown[index]);
  this.cooldown[index] = setTimeout(function() {
    weapon.loading = false;
    weaponDOM.removeClass('loading');
  }, 10000);
  this.weapons[index].active = true;
};
