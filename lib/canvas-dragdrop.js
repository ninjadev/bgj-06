function CanvasDragDrop(canvas){
    this.canvas = canvas;
    this.draggables = [];
    this.droppables = [];
    this.dragged = undefined;
    this.xoffset = 0;
    this.yoffset = 0;

    this.cached_coords = {x:0,y:0};

    var that = this;
    this.callbacks = {};
    this.callbacks["start"] = function(e){
        /* find element under mouse position */
        var coords = that.relMouseCoords(e);
        /* if there is an element, set as only item being dragged */
        for(var i=0;i<that.draggables.length;i++){
            var draggable = that.draggables[i];
            if(that.contains(draggable.obj, coords)){
                /* defensively check if anything is already being dragged */
                if(that.dragged){
                    e.draggable = that.dragged.obj;
                    (that.dragged.callbacks.dragend||function(){}).call(that.dragged.obj,e);
                }
                e.preventDefault();
                that.dragged = draggable;
                that.xoffset = -draggable.obj.position.x + coords.x;
                that.yoffset = -draggable.obj.position.y + coords.y;
                e.draggable = that.dragged.obj;
                (that.dragged.callbacks.dragstart||function(e){}).call(draggable.obj,e);
                break;
            }
        }
    };

    this.callbacks["move"] = function(e){
        /* do not prevent zooming */
        if((e.touches||[]).length > 1) return;
        /* if any element is being dragged, update position */
        if(that.dragged){
            e.preventDefault();
            e.draggable = that.dragged.obj;
            var coords = that.relMouseCoords(e);
            that.cached_coords = coords;
            that.dragged.obj.position.x = coords.x-that.xoffset;
            that.dragged.obj.position.y = coords.y-that.yoffset;
            (that.dragged.callbacks["dragmove"]||function(e){}).call(that.dragged.obj,e);
        }
    };

    this.callbacks["end"] = function(e){
        /* if any element is being dragged, set as undragged, and see if any element has been dropped upon */
        if(that.dragged){
            var coords = that.relMouseCoords(e);
            e.draggable = that.dragged.obj;
            (that.dragged.callbacks["dragend"]||function(){}).call(that.dragged.obj,e);
            for(var i=0;i<that.droppables.length;i++){
                var droppable = that.droppables[i];
                if(that.contains(droppable.obj, coords)){
                    (droppable.callbacks["drop"]||function(){}).call(droppable.obj,e); 
                }
            }
            that.dragged = undefined;
        }
    };

    this.canvas.addEventListener("mousedown",this.callbacks["start"]);
    this.canvas.addEventListener("touchstart",this.callbacks["start"]);
    this.canvas.addEventListener("mousemove",this.callbacks["move"]);
    this.canvas.addEventListener("touchmove",this.callbacks["move"]);
    this.canvas.addEventListener("mouseup",this.callbacks["end"]);
    this.canvas.addEventListener("touchend",this.callbacks["end"]);
}

CanvasDragDrop.prototype.contains = function(obj, point){
    /* simple AABB */
    var x = obj.position.x; var y = obj.position.y;
    var w = obj.size.w; var h = obj.size.h;
    return w>0&&h>0&&point.x>=x&&point.x<x+w&&point.y>=y&&point.y<y+h;
}


CanvasDragDrop.prototype.makeDroppable = function(obj, callbacks){
    /* check if obj is not already droppable */
    for(var i=0;i<this.droppables.length;i++){
        if(obj == this.droppables[i].obj) return;
    }
    this.droppables.push({obj:obj, callbacks:callbacks||{}});
}

CanvasDragDrop.prototype.makeDraggable = function(obj, callbacks){
    /* check if object already draggable */
    for(var i=0;i<this.draggables.length;i++){
        if(obj == this.draggables[i].obj) return;
    }
    this.draggables.push({obj:obj, callbacks:callbacks||{}});
}

CanvasDragDrop.prototype.remove = function(obj){
    for(var i=0;i<this.draggables.length;i++){
        if(obj == this.draggables[i].obj){
            for(var j in this.draggables[i].callbacks){
                this.canvas.removeEventListener(j,this.draggables[i].callbacks[j]);
            }
            Array.remove(this.draggables,i--);
            break;
        }
    }
    for(var i=0;i<this.droppables.length;i++){
        if(obj == this.droppables[i].obj){
            for(var j in this.droppables[i].callbacks){
                this.canvas.removeEventListener(j,this.droppables[i].callbacks[j]);
            }
            Array.remove(this.droppables,i--);
            break;
        }
    }
}

/* adapted from http://stackoverflow.com/a/5932203/1083927 */
CanvasDragDrop.prototype.relMouseCoords = function(e){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this.canvas;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent);

    var event = e;
    canvasX = (event.pageX||(event.touches[0]&&event.touches[0].pageX)||(GU*this.cached_coords.x+totalOffsetX)) - totalOffsetX;
    canvasY = (event.pageY||(event.touches[0]&&event.touches[0].pageY)||(GU*this.cached_coords.y+totalOffsetY)) - totalOffsetY;

    return {x:canvasX/GU, y:canvasY/GU}
}

CanvasDragDrop.prototype.reset = function(){
    this.draggables = [];
    this.droppables = [];
    this.dragged = undefined;
}


/* added for convenience */

// Array Remove - By John Resig (MIT Licensed)
// Array.remove = function(array, from, to) {
//       var rest = array.slice((to || from) + 1 || array.length);
//               array.length = from < 0 ? array.length + from : from;
//                         return array.push.apply(array, rest);
//                         };
