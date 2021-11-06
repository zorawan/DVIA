
d3.json("./Air_Quality_Adjust.json").then(data => {
  console.log(data);
  console.log("load finished");
  var barData = d3.rollup(data, v => d3.mean(v, d => d.FIELD9), d => d.FIELD8);
  console.log(barData);
  var array = Array.from(barData);
  for(var i=0; i<10; i++) {
      
      var bigger = array[i][1] > array[i+10][1];
      array[i].push(bigger);
      array[i+10].push(!bigger);
      
  }
  console.log(array);
  drawBar( array.slice(0, 10),true);
  drawBar(array.slice(10, 20), false);
});

function drawBar(data, isSummer){
    console.log(data);
    var svg = d3.select(isSummer ? "#summer": "#winter")
                .append('svg')
                .attr('width', 1200)
                .attr('height', 300),
    margin = 40,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;
        
    var xScale = d3.scaleBand()
                   .range ([0, width])
                   .paddingInner(0.6),
        yScale = d3.scaleLinear().range ([height,0]);
        
    var g = svg.append("g")
              .attr("transform", "translate(" + 10 + "," + 10 + ")")
              .style("color","B8B8C1");
    
    xScale.domain(data.map(function(d) { return d[0];}));
    yScale.domain([0, d3.max(data, function(d) { return d[1]; })]);
        
  if (isSummer){
        g.append("g")
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale))
        .attr("class", "Xaxis");
        g.select(".domain").remove();
        g.selectAll(".tick line").remove();
        //g.select("Summer").remove();
  } 

        g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .on("mouseover", (e,d)=>{
            tooldiv.style("visibility","visible")
            .text( d[0] + ": " + (d[1].toFixed(2)));
        })
        .on("mousemove", (e,d)=>{
            tooldiv.style('top',(e.pageY-50)+ 'px');
            tooldiv.style('left',(e.pageX-50)+ 'px');
        })
        .on("mouseout",()=>{
            tooldiv.style("visibility","hidden");
        })
        .style("fill",function(d) { return d[2] ? "#3347E6" : "#8881F1"; })
        .attr("x", function(d) { return xScale(d[0]); })
        .attr("y", function(d) { return isSummer ? yScale(d[1]): 0; })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d[1]); });
       

const tooldiv = 
        d3.select("#tooltip")
        .append("div")
        .style("visibility","hidden")
        .style("position","absolute")
        .style("background-color","#fff")
        .style("color", "#E688D6")
        .style("border-radius", "10px")
        .style("padding", "12px")
        .style("box-shadow", "0px 4px 14px #8a8ab5")
        .style("font-weight","500");
}