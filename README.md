### Circular gauge
Circular gauge is a JQuery and css based lightweight component for visualizing data on dashboards.

### API and Options
CircularGauge can be instantiated via plugin facade.
```javascript
        // Create a Div tag with class name c-gauge
        <div id="example_ID" class="c-gauge"></div>

        // Initialize the Gauge
        $("#example_ID").circularGauge()

        // Or instantiate with options
        $("#example_ID").circularGauge(options)
```
### Default Options
The default options are listed below. you can specify the values when you instantiate the gauge
```javascript
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
```
### Functions
The you can change the appearence/behaviour after instatiation. The list of functions are given below along with the funcion parameter type

```javascript
        setMin(value) // number
        setMax(value) // number
        setSize(value) // px value ex: 200px
        setSpeed(value) // a number in milliseconds ex: 500
        setColor(value) // a color ex: "red" or "#FF0000"
        setBackGroundColor(value) // a color ex: "red" or "#FF0000"
        setTextColor(value) // a color ex: "red" or "#FF0000"
        setValue(value) // number
        
        // exmaple usage
        var a  = $("#example_ID").circularGauge()
        a.gauge.setBackGroundColor("yellow");
        a.gauge.setSize("200px");
        a.gauge.setSpeed("500");
        a.gauge.setColor("blue");
        a.gauge.setTextColor("green");
        a.gauge.setMax(200);
```

### Installation
Simply Load either the minified or unminified JS and CSS files to your project and you are good to go.!
