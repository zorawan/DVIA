/*global Vibrant*/
/* global $ */
// "d3" is globally available
// because we have the d3 code
// in our index.html file

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
        if (item.medium == "Oil on canvas") {
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

        console.log(artist + ": " + vibrantPalate.length);

        vibrantPalate.sort((a, b) => a.getHsl()[2] - b.getHsl()[2]);
        
        vibrantPalate.map(item => {
            
            var colorNode = document.createElement('div');
            colorNode.className = 'swatch';
            colorNode.style.backgroundColor = item.getHex();
            var hue = Math.floor(item.getHsl()[0] * 360);
            console.log('hue: ' + hue + "; hex: " + item.getHex());
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

loadImage('gs');
loadImage('pc');
loadImage('pg');
loadImage('vg');