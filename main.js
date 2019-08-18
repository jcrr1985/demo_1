var closePage = $('.closePage');


$(".map-marker").hover(
    function() {
        $(".map-marker").removeClass(".map-marker .dot")
        $(this).addClass("boom");
    },
    function() {
        $(this).addClass("boom");
    }
);

var map = AmCharts.makeChart("chartdiv", {
    "type": "map",
    "theme": "light",
    "projection": "miller",
    "areasSettings": {
        outlineColor: "#000000",
        "rollOverOutlineColor": "#FFFFFF",
        "unlistedAreasColor": "#c9c9c9",
        "rollOverColor": "##333333",

    },



    "dataProvider": {
        "map": "worldLow",
        "getAreasFromMap": true,
        "images": [{
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Canada 4%",
            "latitude": 62.425533,
            "longitude": -120.692482
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "US 49%",
            "latitude": 34.751076,
            "longitude": -97.740135
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Other Americas 1%",
            "latitude": 0,
            "longitude": -63.682365
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Paraguay 1%",
            "latitude": -25.30066,
            "longitude": -57.63591
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "UK 4%",
            "latitude": 51.509865,
            "longitude": -0.118092
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Ireland 1%",
            "latitude": 53.350140,
            "longitude": -6.266155
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Belgium 1%",
            "latitude": 51.260197,
            "longitude": 4.402771,
            "url": "http://www.google.co.uk"
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "France 1%",
            "latitude": 45.864716,
            "longitude": 1.349014
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Spain 3%",
            "latitude": 38.7,
            "longitude": -2.703790
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Luxembourg 1%",
            "latitude": 49.611622,
            "longitude": 6.131935,
            "url": "http://www.google.co.jp"
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Switzerland 6%",
            "latitude": 46.204391,
            "longitude": 6.143158
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Norway 2%",
            "latitude": 59.911491,
            "longitude": 10.757933
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Finland 2%",
            "latitude": 64.792059,
            "longitude": 28.945831
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Germany 14%",
            "latitude": 52.520008,
            "longitude": 13.404954
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Netherlands 2%",
            "latitude": 52.370216,
            "longitude": 4.895168
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Saudi Arabia 2%",
            "latitude": 24.774265,
            "longitude": 46.738586
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "South Africa 1%",
            "latitude": -30.378272,
            "longitude": 25.913711
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "India 1%",
            "latitude": 25.644800,
            "longitude": 77.216721
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Singapore 1%",
            "latitude": 1.290270,
            "longitude": 103.851959
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Australia 2%",
            "latitude": -23.865143,
            "longitude": 139.209900
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "New Zealand 2%",
            "latitude": -44.848461,
            "longitude": 170.763336
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "South Korea 1%",
            "latitude": 37.532600,
            "longitude": 127.024612
        }, {
            "zoomLevel": 5,
            "scale": 0.5,
            "title": "Japan 2%",
            "latitude": 35.652832,
            "longitude": 139.839478
        }]
    }
});

// add events to recalculate map position when the map is moved or zoomed
map.addListener("positionChanged", updateCustomMarkers);

function toggleMapObjectAlpha(e) {
    var alpha = e.type == "rollOverMapObject" ? .3 : .8;
    e.event.target.setAttribute("fill-opacity", alpha);
}
map.addListener('rollOverMapObject', toggleMapObjectAlpha);
map.addListener('rollOutMapObject', toggleMapObjectAlpha);

// this function will take current images on the map and create HTML elements for them
function updateCustomMarkers(event) {
    // get map object
    var map = event.chart;

    // go through all of the images
    for (var x in map.dataProvider.images) {
        // get MapImage object
        var image = map.dataProvider.images[x];

        // check if it has corresponding HTML element
        if ('undefined' == typeof image.externalElement)
            image.externalElement = createCustomMarker(image);

        // reposition the element accoridng to coordinates
        var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
        image.externalElement.style.top = xy.y + 'px';
        image.externalElement.style.left = xy.x + 'px';
    }
}

// this function creates and returns a new marker element
function createCustomMarker(image) {
    // create holder
    var holder = document.createElement('div');
    holder.className = 'map-marker';
    holder.title = image.title;
    holder.style.position = 'absolute';

    // maybe add a link to it?
    if (undefined != image.url) {
        holder.onclick = function() {
            window.location.href = image.url;
        };
        holder.className += ' map-clickable';
    }

    // create dot
    var dot = document.createElement('div');
    dot.className = 'dot';
    holder.appendChild(dot);

    // create pulse
    var pulse = document.createElement('div');
    pulse.className = 'pulse';
    holder.appendChild(pulse);

    // append the marker to the map container
    image.chart.chartDiv.appendChild(holder);

    return holder;
}

var myGroup = '';

var dntsTitleArr = ["GAMMA", "SIGMA", "OMEGA"]

var dataObj = {

    data1: [16, 84],
    data2: [43, 57],
    data3: [66, 34],
};


var width = 150,
    height = 170,
    radius = (Math.min(width, height) / 2.3);

//drawing function declaration

function drawDonut(data, divchart) {


    var color = ["#0091DA", "#7fb6d4"];

    var pie = d3.pie()
        .sortValues(null)
        .value(function(d) {
            return d
        })(data);

    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius / 1.9));

    var labelArc = d3.arc()
        .outerRadius(radius - 31)
        .innerRadius(radius - 31);

    var svg = d3.select(divchart)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .style("background-color", "#F8F8F8")
        .append("g")
        .attr("class", "TheMainGroup")
        .attr("transform", "translate(" + 180 + "," + 95 + ")");

    var g = svg.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("class", "arc");


    function easeInverse(ease) {
        return function(e) {
            var min = 0,
                max = 1;
            while (max - min > 1e-3) {
                var mid = (max + min) * 0.5;
                emid = ease(mid);
                if (emid > e) {
                    max = mid;
                } else {
                    min = mid;
                }
            }
            return max;
        };
    }
    var inverseCubic = easeInverse(d3.easeCubic);
    var oneOver2Pi = 1.0 / (2 * Math.PI);
    var total_msec = 2500;

    g.append("path")
        .style("fill", function(d, i) {
            return color[i];
        })
        .transition()
        .ease(d3.easeLinear)
        .delay(function(d) {
            return total_msec * inverseCubic(d.startAngle * oneOver2Pi);
        })
        .duration(function(d) {
            return total_msec * (inverseCubic(d.endAngle * oneOver2Pi) - inverseCubic(d.startAngle * oneOver2Pi));
        })
        .attrTween("d", arcTween);

    function arcTween(d) {
        var i = d3.interpolate(inverseCubic(d.startAngle * oneOver2Pi), inverseCubic(d.endAngle * oneOver2Pi));
        return function(t) {
            d.endAngle = 2 * Math.PI * d3.easeCubic(i(t));
            return arc(d);
        };
    }


    g.append("text")
        .attr("transform", "translate(-10,-55) scale(1.3)")
        .attr("dy", -13)
        .attr("dx", 7)
        .attr("text-anchor", "middle")
        .attr("color", "#444")
        .html(function(d, i) {
            return dntsTitleArr[1];
        })
        .attr("color", "#545454");

}

//function  declaration


/*========================================== BAR CHART ==============================================*/

var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
};

var barTitleArr = ["United Kingdom", "United States", "France", "Spain"];

var barTitleArr2 = ["Ireland", "Germany", "Canada", "Belgium"];

var width = ($(window).width() / 2),
    height = 200,
    barHeight = 15;

var data = [75, 9, 11, 18];

var data2 = [32, 3, 52, 34];

var scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, (width - (margin.left + margin.right)) * .9]);

var svg = d3.select("#bardiv")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length + (barTitleArr.length * 25))
    .attr("class", "theSvg")
    .append("g")
    .attr("class", "barG")
    .attr("transform", "translate(0,30)");

var svg2 = d3.select("#bardiv2")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length + 120)
    .attr("class", "theSvg2")
    .append("g")
    .attr("class", "barG2")
    .attr("transform", "translate(0,30)");


function renderBars(svgDiv, dataArray, countryArray) {
    var bars = svgDiv.selectAll(".bars")
        .data(dataArray)
        .enter()
        .append("rect")
        .transition()
        .duration(1600)
        .attr("width", function(d) {
            return scale(d)
        })
        .attr("height", barHeight / 2)
        .attr("class", "bar")
        .attr("fill", "#0091DA")
        .attr("y", function(d, i) {
            return i * 35;
        })
        .attr("x", 30);

    var labels = svgDiv.selectAll(".labels")
        .data(countryArray)
        .enter()
        .append("text")
        .attr("color", "#545454")
        .text(function(d, i) {
            return d + " " + dataArray[i] + "%";
        })
        .attr("font-size", 13)
        .attr("y", function(d, i) {
            return i * 35;
        })
        .attr("dy", function(d, i) {
            return -5;
        })
        .attr("dx", 30)
        .attr("font-weight", "bold")
        .attr("class", " labelitas opa0")
}

function animateCSS(element, animationName, animationName2) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName, animationName2)



}


animateCSS('.upper-wrapper', 'fadeIn', 'slow')



var waypoint = new Waypoint({
    element: document.getElementsByClassName('barSection'),
    handler: function(direction) {
        if (direction === 'down') {
            renderBars(svg, data, barTitleArr);
            renderBars(svg2, data2, barTitleArr2);
        }

        this.destroy();


    },
    offset: '75%'
});

var waypoint2 = new Waypoint({
    element: document.getElementsByClassName('donutsSection'),
    handler: function(direction) {

        $(".labelitas").removeClass("opa0").addClass("opa1");
        Object.keys(dataObj).forEach(function(d, i) {
            drawDonut(dataObj[d], '#pie' + (i + 1));

        });


        this.destroy();
    },
    offset: '100%'
});