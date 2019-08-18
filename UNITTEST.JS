		function draw() {

		  var width = $(".chartDivs1").width();
		  var height = $(".chartDivs1").height();
			

		  var data = [
			{country: "myHouse",growth: 45},
			{ country: "Moon",growth: 40},
			{ country: "India", growth: 35},
			{country: "Indonesia",growth: 30},
			{country: "Russia",growth: 25},
			{country: "Mars",growth: 20},
			{country: "Pluton",growth: 15},
			{country: "Earth",growth: 10},
			{country: "Neptune",growth: 5}
		  ];

		  //set margins
		  var margin = {
			top: 20,
			right: 30,
			bottom: 30,
			left: 40
		  };
		  
		  var width = width - margin.left - margin.right * 2.5;
		  var height = height - margin.top - margin.bottom;

		  //set scales & ranges

		  var xScale = d3.scaleLinear()
			.range([0, width * 1.1 ])

		  var yScale = d3.scaleBand()
			.range([30, height]).padding(.3)

		  //draw the svg

		  var svg = d3.select(".chartDivs1")
			.append("svg")
			.attr("width", width + margin.left + margin.right * 3)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left *1.4  + "," + margin.top + ")")
		  
		  		   //Add a Title
		  svg.append("text")
			.attr("x", (width / 2))             
			.attr("y", 11 )
			.attr("text-anchor", "middle")  
			.style("font-size", "16px") 
			.style("text-decoration", "underline")  
			.text("Title");

		  //force data

		  data.forEach(function(d) {
			return d.growth = +d.growth;
		  });

		  //set domains

		  yScale.domain(data.map(d => d.country))

		  xScale.domain([0, d3.max(data, d => d.growth)])

		  //add X & Y axes and append the bars to Y axis

		  var xAxis = svg.append("g")
			.attr("class", xAxis)
			.attr("transform", "translate(" + 0 + "," + height + ")")
			.call(d3.axisBottom(xScale))

		  var yAxis = svg.append("g")
			.attr("class", yAxis)
			.call(d3.axisLeft(yScale))
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("stroke", "transparent")
			.attr("stroke-width", 4)
			.attr("class", "bar")
			.attr("height", yScale.bandwidth())
			.attr("x", 0.5)
			.attr("y", function(d) {
			  return yScale(d.country)
			})
			.attr("width", 0)
			.transition()
			.duration(3800)
			.delay((d, i) => (i + 1) * 200)
			.ease(d3.easeElastic)
			.attr("width", function(d) {
			  return xScale(d.growth)
			})
			.style("fill", "#00338D")
			.on('end', function() {
			  d3.select(this)
				.on("mouseover", function() {
				  d3.select(this)
					.transition().duration(600)
					.attr("stroke", "#6D2077")
					.attr("stroke-width", 3)
					.style("fill", "#6D2077")
				  d3.selectAll(".textCircle")
					.transition().duration(600)
					.attr("r", yScale.bandwidth() / 1.9)
					.attr("stroke", "#6D2077")
					.attr("stroke-width", 1)
				})
				.on("mouseout", function() {
				  d3.select(this)
					.transition()
					.duration(600)
					.attr("stroke", "transparent")
					.attr("stroke-width", 0)
					.style("fill", "#00338D")
				  d3.selectAll(".textCircle")
					.transition().duration(600)
					.attr("r", yScale.bandwidth() / 2)
					.attr("stroke", "transparent")
					
				})

			})

		  var newG = svg.append("g")

		  newG.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "textCircle")
			.attr("cx", d => xScale(d.growth))
			.attr("cy", d => yScale(d.country) + yScale.bandwidth() / 2)
			.attr("r", 0)
			.transition()
			.duration(1200)
			.delay((d, i) => (i + 1) * 450)
			.attr("r", yScale.bandwidth() / 2)
			.attr("opacity", 1)
			.style("fill", "#005EB8")
			.attr("stroke", "transparent")
			.ease(d3.easeElastic)


						
		  var newG4text = svg.append("g").attr("class","newG4text")
			
			newG4text.selectAll(".text").data(data)
			.enter()
			.append("text")
			.attr("x", d => xScale(d.growth))
			.attr("y", d => yScale(d.country) + yScale.bandwidth()/2)
			.attr("dx","-.45em")
			.attr("dy",".4em")
			.style("font-size",".8em")
			.style("fill","#FFF")
			.text(d=>d.growth)	.on("end", draw2());


	
		}