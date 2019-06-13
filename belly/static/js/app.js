function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var meta = d3.select("#sample-metadata");

    // Use the list of sample names to populate the select options
    d3.json("/metadata/"+ sample).then((samples) => {
      console.log(samples);
      var meta = d3.select("#sample-metadata");
      meta.html("");
      var metaVar=Object.entries(samples);
      metaVar.forEach((metaSample) => {
        meta
          .append("h5")
          .text(metaSample [0] + ": " + metaSample[1])
      });
      });
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("/samples/"+ sample).then((charts) => {
    console.log(charts);
    var trace1 = {
      labels: charts.otu_ids.slice(0,10),
      values: charts.sample_values.slice(0,10),
      type: 'pie'
       };
      
       var data = [trace1];
      
      var layout = {
       title: "'Pie' Chart",
       };
      
      Plotly.newPlot("pie", data, layout);
  });
    // @TODO: Build a Bubble Chart using the sample data
    d3.json("/samples/"+ sample).then((charts) => {
      console.log(charts);
      var trace2 = {
        x: charts.otu_ids,
        y: charts.sample_values,
        text: charts.otu_labels,
        mode: 'markers',
        marker: {
          color: charts.otu_ids,
        
          size: charts.sample_values
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Bubble Chart',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data2, layout2);

      
 
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
