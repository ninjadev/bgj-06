Toast = (function() {
  var toast_template;
  var active_toast;
  var active_toast_container;
  var toast_queue = [];
  $(function() {
    toast_template = $('.toast.template');
  });

  function Toast(message) {
    toast_queue.push(message);
    if (active_toast_container != undefined) {
      active_toast_container.hide().remove();
    }
    printMessage(toast_queue.shift());
  }

  function printMessage(message) {
    active_toast = message;
    var toast = toast_template.clone()
      .removeClass('template');
    toast.find('.message').html(message);
    $('#wrapper').append(toast);
    active_toast_container = toast;
    toast.fadeIn();
    toast.animate({
      'margin-top': '-20px'
    }, {
      duration: 300,
      queue: false
    }, 'easeinout');
    setTimeout(function() {
      toast.animate({
        'margin-top': '-=20px'
      }, {
        duration: 500,
        queue: false
      }, 'easeinout');
      active_toast = undefined;
      active_toast_container = undefined;
      if (toast_queue.length > 0) {
        printMessage(toast_queue.shift());
      }
      toast.fadeOut(500, function() {
        toast.remove();
      });
    }, 3200 + 35 * (message.length - 200));
  }

  return Toast;
})();
