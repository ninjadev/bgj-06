Toast = (function(){
    var toast_template;
    $(function(){
        toast_template = $('.toast.template');
    });

    function Toast(message){
        console.log(toast_template, message);
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
            toast.fadeOut(500, function(){
                toast.remove();
            });
        }, 3000);
    }

    return Toast;
})();
