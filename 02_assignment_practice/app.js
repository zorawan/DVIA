
/*
  Exercise 6
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for?
//The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents.

// Task
// Open the file index.html in AWS Cloud9. Click "Preview" > "Preview File index.html". (Note that you can open it in a new window). What do you see?

// Task
// Delete the div with the class rectangle from index.html and refresh the preview.

// Task
// What does the following code do?
const viz = document.body.querySelector(".viz");
console.log(viz, viz.children);


const colorArray = {"Iris-setosa":"#7277e0","Iris-versicolor": "#af72e0", "Iris-virginica": "#d968c1"};
const addChildToViz = (item) => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle";
  newChild.style.height =  item.area * 10 + "px";
  newChild.style.backgroundColor =  colorArray[item.class];
  viz.appendChild(newChild);
};

//var c = document.getElementById("legend");
//var ctx = c.getContext("2d");
//ctx.beginPath();
//ctx.fillStyle = "#7277e0";
//ctx.fillRect(20, 20, 20, 20);


//viz.addEventListener("click", addChildToViz);

// Task
// Where can you see the results of the console.log below? How is it different from in previous exercises?

function drawIrisData() {
  window
    .fetch("./iris.csv")
    .then(data => data.json())
    .then(data => {
      data.map(item => {
        item['area'] = item.sepallength * item.sepalwidth + item.petallength * item.petalwidth;
      });
      console.log(data);
      data.sort(function compareFn(firstEl, secondEl) {
        return secondEl.area - firstEl.area;
        
      });
      data.map(item =>{
         addChildToViz(item);
      });
     
      console.log(data);
    });
}

drawIrisData();

// Task
// Modify the code above to visualize the Iris dataset in the preview of index.html.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.