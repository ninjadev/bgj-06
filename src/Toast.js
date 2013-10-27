Toast = (function(){
    var toast_template;
    var active_toast;
    var toast_queue = [];
    $(function(){
        toast_template = $('.toast.template');
    });

    function Toast(message){
        console.log(toast_template, message);
        toast_queue.push(message);
        if (active_toast == undefined) {
          printMessage(toast_queue.shift());
        }
    }

    function printMessage(message) {
        active_toast = message;
        var toast = toast_template.clone()
            .removeClass('template');
        toast.find('.message').html(message);
        $('body').append(toast);
        toast.fadeIn();
        toast.animate({
            'margin-top':'-20px'
        },{
            duration: 300,
            queue: false
        }, 'easeinout');
        setTimeout(function(){
            toast.animate({
                'margin-top':'-=20px'
            },{
                duration: 500,
                queue: false
            }, 'easeinout');
            active_toast = undefined;
            if (toast_queue.length > 0) {
              printMessage(toast_queue.shift());
            }
            toast.fadeOut(500, function(){
                toast.remove();
            });
        }, 3000);
    }

    return Toast;
})();
