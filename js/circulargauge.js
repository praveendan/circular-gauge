/* Copyright (c) 2019 Praveen Dhanansekara */
(function( $ ){
    var gaugeConstants = {
        HALF_GAUGE : 180
    };  

    gaugeDefaults = {
        min: 0,
        max: 100,
        size: "200px",
        speed: "1000",
        fillColor: "#307bbb",
        hoverTextColor: "#307bbb",
        gaugeColor: "#cccccc",
        units: "",
        isInvert: false,
        responsive: false,
    }

    $.fn.circularGauge = function(settings) {
        if(!this.children(".circular-gauge").length) {
            var element = this;
            var prevState = 0;
            var currentValue = 0;
            var gaugeSettings = $.extend({}, gaugeDefaults, settings);
        
            let outerClass = "circular-gauge";
            let sliceClass = "slice";
            let barClass = "bar";
            let fillClass = "fill";
            let circularGaugeValuesClass = "circular-gauge-values";

            let core = $("<div/>").addClass(outerClass);
            let percentageValue = $("<span/>").prop("id", "percentageValue").addClass(circularGaugeValuesClass).appendTo(core);
            let realValue = $("<span/>").prop("id", "realValue").addClass(circularGaugeValuesClass).appendTo(core);
            let slice = $("<div/>").addClass(sliceClass).appendTo(core);
            let bar = $("<div/>").addClass(barClass).appendTo(slice);
            let fill = $("<div/>").addClass(fillClass).appendTo(slice);

            element.append(core);

            /*-------------------------------initialization----------------------------------*/

            element.find(".bar").css("transition", "transform " + gaugeSettings.speed).css("border-color", gaugeSettings.fillColor);
            element.find(".fill").css("border-color", gaugeSettings.fillColor);
            element.children(".circular-gauge").css("background-color", gaugeSettings.gaugeColor);
            element.find("#percentageValue").css("color", gaugeSettings.gaugeColor);
            element.css("width", gaugeSettings.size).css("height", gaugeSettings.size);
            element.children(".circular-gauge").css("font-size", gaugeSettings.size);
            element.find("#realValue").css("color", gaugeSettings.hoverTextColor);

            /*--------------------------------Functions---------------------------------------*/
            element.gauge = {
                setMin: function(min){
                    gaugeSettings.min = min;
                },
                setMax: function(max){
                    gaugeSettings.max = max;
                    this.setValue(currentValue);
                },
                setSize: function(size){
                    element.css("width", size).css("height", size);
                    element.children(".circular-gauge").css("font-size", size);
                },
                setSpeed: function(speed){
                    element.find(".bar").css("transition", "transform " + speed);
                },
                setColor: function(color){
                    element.find(".bar").css("border-color", color);
                    element.find(".fill").css("border-color", color);
                    element.find("#realValue").css("color", color);
                },
                setBackGroundColor: function(color){
                    element.children(".circular-gauge").css("background-color", color);
                },
                setTextColor: function(color){
                    element.find("#realValue").css("color", color);
                },
                setValue: function(value){ 
                    currentValue = value;
                    let fraction = value / gaugeSettings.max;
                    let angle = fraction * 360;
                    let percentage = fraction * 100;
                    
                    $(element.find(".bar")).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd');
                    setRotation(angle, element, prevState);
                    prevState = angle;
                    $(element.find("#percentageValue")).html(percentage + "%");

                    if(gaugeSettings.isInvert === true) 
                        value = gaugeSettings.max - value;                   
                    $(element.find("#realValue")).html(value + "/" + gaugeSettings.max + gaugeSettings.units);
                },            
            }
            return element;
        } else
            console.error("A Gauge has already been initialized");
    }; 

    var setRotation = function(angle, element, prevState) {
        if(angle <= gaugeConstants.HALF_GAUGE){
            if(gaugeConstants.HALF_GAUGE < prevState){
                rotateBar(gaugeConstants.HALF_GAUGE, element);
                $(element.find(".bar")).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                    function() {
                        $(element.children(".circular-gauge")).removeClass("upperHalf");
                        rotateBar(angle, element);
                    }
                );
            } else
                rotateBar(angle, element);
        } else{  
            if(prevState < gaugeConstants.HALF_GAUGE){
                rotateBar(gaugeConstants.HALF_GAUGE, element);
                $(element.find(".bar")).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
                    function() {
                        $(element.children(".circular-gauge")).addClass("upperHalf");
                        rotateBar(angle, element);
                    }
                );
            } else if(prevState === gaugeConstants.HALF_GAUGE){
                $(element.children(".circular-gauge")).addClass("upperHalf");
                rotateBar(angle, element);
            }
            else 
                rotateBar(angle, element);
        }
    };
    var rotateBar = function(angle, element) {
        element.find(".bar").css("transform", "rotate(" + angle + "deg)");
    };
})( jQuery );