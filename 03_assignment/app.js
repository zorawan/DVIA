/* global XMLHttpRequest */

var reagan = "";
var TextFile = ["./Reagan_1982.txt", "./Reagan_1983.txt", "./Reagan_1984.txt", "./Reagan_1985.txt", "./Reagan_1986.txt", "./Reagan_1987.txt", "./Reagan_1988.txt"];
var current = 0;
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                reagan += rawFile.responseText;
                current++;
                if (current < TextFile.length){
                   readTextFile(TextFile[current]);
                }
                else{
                //console.log(reagan);
            }
            }
        }
    };
    rawFile.send(null);
}

readTextFile(TextFile[current]);

const blackList = ["THE", "TO", "OF","AND","IN","A", "THAT","", "IS", "BE", "ON", "THIS", "HAVE", "NOT", "WITH", "ARE", "FOR", "WILL", "AS", "BY", "IT", "FROM","HAS","AN","AT", "WAS", "OR", "SO", "IF", "IT'S","WERE", "BECAUSE","HAD","WHICH", "THERE", "HERE", "THESE", "THOSE", "ITS", "BUT", "THEN", "ALSO", "ABOUT", "BEFORE", "YOU,", "SO,", "AND,", "THAN", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function wordFreq(string) {
    var words = string.replace(/[.]/g, '').toUpperCase().split(/\s/);
    var freqMap = new Map();
    words.forEach(function(w) {
        if (!blackList.includes(w)){
            if (!freqMap.get(w)) {
                freqMap.set(w, 0);
            }
            freqMap.set(w, freqMap.get(w)+1);
        }
        
    });

    return freqMap;
}

const freq = wordFreq(reagan);
const wordOrder = new Map([...freq.entries()].sort((a, b) => b[1] - a[1]));
console.log(wordOrder);

let printWords = [...wordOrder.entries()]
        .slice(0, 1000)
        .map(([k]) => k)
        .join(' ');
console.log(printWords);

document.getElementById("mytext").innerHTML = printWords.replace(/([\w]+)/g, '<span>$1</span>');
const parentElement = document.getElementById('mytext');
parentElement.onmouseover = e => {
  const tooltipText = document.getElementById('tooltip');
  tooltipText.innerHTML = wordOrder.get(e.target.innerHTML);
  tooltipText.style.position = "absolute";
  tooltipText.style.left = e.clientX +5 + "px";
  tooltipText.style.top = e.clientY - 46 + "px";
  console.log(e.clientX + ":" + e.clientY + ";" + e.target.innerHTML);
};