/*global Vibrant*/
/* global $ */
// "d3" is globally available
// because we have the d3 code
// in our index.html file
var allColorPalette = [];

function loadImage(artist) {
  // load JSON using d3.json
d3.json('./' + artist + '_object.json')
  .then( json => {
      // execute our 
      // display images function
      displayImagesJS(json, artist);
  });   
}


function displayImagesJS(json, artist) {
    var root = document.getElementById(artist + "_gallery");
    var vibrantPalate = [];
    var colorPalateNode = document.getElementById(artist + "_paletteBar");
    vibrantPalate.className = 'swatches';
    
    json.map(item => {
        if (item.medium == "Oil on canvas" || item.medium == "Oil on wood") {
            var imageCard = document.createElement('div');
            imageCard.className = 'imgSwatch';
            var img = document.createElement('img');
            img.setAttribute('src', './' + artist + '_downloads/' +item.primaryImageSmall.substring(item.primaryImageSmall.lastIndexOf("/") + 1));
            imageCard.appendChild(img);
            root.appendChild(imageCard);
            img.addEventListener('load', function() {
                var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches();
                
                var swatchesNode = document.createElement('div');
                swatchesNode.className = 'swatches';
                imageCard.appendChild(swatchesNode);
                        
                for (var swatch in swatches)
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                        var swatchNode = document.createElement('div');
                        swatchNode.className = 'swatch';
                        swatchNode.id = swatch;
                        swatchNode.style.backgroundColor = swatches[swatch].getHex();
                        swatchesNode.appendChild(swatchNode);
                        vibrantPalate.push(swatches[swatch]);
                        
                        var color = {};
                        var hsl = swatches[swatch].getHsl();
                        color.artist = artist;
                        color.hue = hsl[0];
                        color.saturation = hsl[1];
                        color.lightness = hsl[2];
                        color.hex = swatches[swatch].getHex();
                        allColorPalette.push(color);
                    }
                /*
                 * Results into:
                 * Vibrant #7a4426
                 * Muted #7b9eae
                 * DarkVibrant #348945
                 * DarkMuted #141414
                 * LightVibrant #f3ccb4
                 */

            });
        }
    });
    
//   var node = document.getElementById("myList2").lastChild;
//   var list = document.getElementById("myList1");
//   list.insertBefore(node, list.childNodes[0]);
  
    setTimeout(() => {
        
        
        var red = document.createElement('div');
        red.className = 'red';
        colorPalateNode.appendChild(red);
        var labelR = document.createElement('div');
        labelR.className = 'label';
        labelR.innerHTML += 'RED';
        var parentR = red.parentElement;
        parentR.prepend(labelR);
        
        var yellow = document.createElement('div');
        yellow.className = 'yellow';
        colorPalateNode.appendChild(yellow);
        var labelY = document.createElement('div');
        labelY.className = 'label';
        labelY.innerHTML += 'YELLOW';
        yellow.before(labelY);
        
        var green = document.createElement('div');
        green.className = 'green';
        colorPalateNode.appendChild(green);
        var labelG = document.createElement('div');
        labelG.className = 'label';
        labelG.innerHTML += 'GREEN';
        green.before(labelG);
        
        var cyan = document.createElement('div');
        cyan.className = 'cyan';
        colorPalateNode.appendChild(cyan);
        var labelC = document.createElement('div');
        labelC.className = 'label';
        labelC.innerHTML += 'CYAN';
        cyan.before(labelC);
        
        var blue = document.createElement('div');
        blue.className = 'blue';
        colorPalateNode.appendChild(blue);
        var labelB = document.createElement('div');
        labelB.className = 'label';
        labelB.innerHTML += 'BLUE';
        blue.before(labelB);
        
        var magenta = document.createElement('div');
        magenta.className = 'magenta';
        colorPalateNode.appendChild(magenta);
        var labelM = document.createElement('div');
        labelM.className = 'label';
        labelM.innerHTML += 'MAGENTA';
        magenta.before(labelM);

        // console.log(artist + ": " + vibrantPalate);

        vibrantPalate.sort((a, b) => a.getHsl()[2] - b.getHsl()[2]);
        
        vibrantPalate.map(item => {
            
            var colorNode = document.createElement('div');
            colorNode.className = 'swatch';
            colorNode.style.backgroundColor = item.getHex();
            var hue = Math.floor(item.getHsl()[0] * 360);
          
            if (hue <= 30 || hue > 330) {
                red.appendChild(colorNode);
            } else if (hue <= 65) {
                yellow.appendChild(colorNode);
            } else if ( hue <= 150) {
                green.appendChild(colorNode);
            } else if ( hue <= 200) {
                cyan.appendChild(colorNode);    
            } else if ( hue <= 270) {
                blue.appendChild(colorNode);
            } else if ( hue <= 330) {
                magenta.appendChild(colorNode);
            }
        });
       
    },
        3000);
    
}

// var artist = document.querySelector('input[name="radioFruit"]:checked').value;


function showD3(data, artist) {
    // set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 60, left: 90},
        width = 960 - margin.left - margin.right,
        height = 660 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
    var parent = document.getElementById("plot");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    
const svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .style("background-color","#fff")


    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 1])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .attr("color", "#9194AB")
    .style("font-family","Montserrat")
    .style("font-size","1em");

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y))
    .attr("color", "#9194AB")
    .style("font-family","Montserrat")
    .style("font-size","1em");

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("cx", function (d) { 
            console.log(d);
            return x(d.saturation); } )
        .attr("cy", function (d) { return y(d.lightness); } )
        .attr("r", function(d){
            if (d.artist == artist) {
                return 10;
            } else {
                return 5;
            }
        })
        .classed("top", function(d){
            if (d.artist == artist) {
                return true;
            } else {
                return false;
            }
        })
        .style("opacity", function(d){
            if (d.artist == artist){
                return 1;
            } else {
                return 0.5;
            }
        })
        .style("fill", function(d) {return d.hex});
     
    svg.append("text")
        .attr("transform", "translate(725,560)")
        .style("text-anchor", "middle")
        .attr("fill", "#4E5878")
        .text("Low <- Saturation -> High")
        .style("font-family","Montserrat")
        .style("font-weight","500");
        
    svg.append("text")
        // .style("text-anchor", "start")
        .text("High")
        .text("Lightness")
        .attr("fill", "#4E5878")
        .style("font-family","Montserrat")
        .style("font-weight","500")
        .attr("transform", "rotate(90)")
        .attr("transform", "translate(15,10)");
        
    d3.selectAll('g.tick')
    .select('line')
        .remove()


}






function handleClick(radio) {
    showD3(allColorPalette, radio.value);
}

loadImage('gs');
loadImage('pc');
loadImage('pg');
loadImage('vg');

var artist = "all";
setTimeout(() => {
    //use d3 to show
    showD3(allColorPalette, artist);
}, 5000);
