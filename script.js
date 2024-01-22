// Load your CSV file
d3.csv("boston_311_2023_by_reason.csv").then(function(data) {

    // Log the loaded data to the console
    console.log("Loaded data:", data);

    // Sort the data by Count in descending order
    data.sort(function(a, b) {
        return b.Count - a.Count;
    });

    // Log the sorted data to the console
    console.log("Sorted data:", data);

    // Take the top 10 records
    data = data.slice(0, 10);

    // Log the top 10 records to the console
    console.log("Top 10 records:", data);

    // Set up initial dimensions (can be adjusted based on your needs)
    var margin = { top: 60, right: 20, bottom: 60, left: 200 }, // Increase the left margin
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Create the SVG container
    var svg = d3.select("body").append("svg")
        .attr("class", "chart-svg")  // Add a class for styling
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define the scales for a horizontal bar chart
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) { return +d.Count; })]);

    var y = d3.scaleBand()
        .range([height, 0])
        .domain(data.map(function (d) { return d.reason; }))
        .padding(0.1);

    // Create the bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) { return x(+d.Count); })
        .attr("y", function (d) { return y(d.reason); })
        .attr("height", y.bandwidth())
        .style("fill", "purple");

    // Add the X Axis at the bottom
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px"); // Adjust font size

    // Add title to the chart
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .text("Top 10 Reasons for 311 Requests in Boston (2023)");

    // Add footnote
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Source: data.boston.gov/dataset/311-service-requests");

    // Adjust SVG container dimensions based on content
    var svgBounds = document.querySelector('.chart-svg').getBBox();
    svg.attr("width", svgBounds.width + margin.left + margin.right)
       .attr("height", svgBounds.height + margin.top + margin.bottom);
});
