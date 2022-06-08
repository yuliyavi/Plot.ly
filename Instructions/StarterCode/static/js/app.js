// read JSON file
function init() {
  d3.json("samples.json").then((data) => {
    console.log("read samples file");
    console.log(data);
  });
}

init();

function optionChanged(value) {
  horizontal_graph(value);
  console.log(value);
}

function init() {
  var dropdownMenu = (dropdownMenu = d3.select("#selDataset"));
  d3.json("samples.json").then((data) => {
    var default_info = data.names;
    default_info.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value");
    });
    var default_name = default_info[0];
    horizontal_graph(default_name);
    drop_down_id(default_name);
    demo_box(default_name);
    bubblely_chart(default_name);
  });
}

function drop_down_id(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var results = metadata.filter((entry) => entry.id == sample);
    var result = results[0];
    var box = d3.select("#sample-metadata");

    Object.entries(result).forEach(([key, value]) => {
      box.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
d3.selectAll("#sample-metadata").on("change", demo_box);

function demo_box(id) {
  d3.json("samples.json").then((data) => {
    const filteredData = data.metadata.filter((sample) => {
      return sample.id == id;
    });
    var box = d3.select("#sample-metadata");
    var sam_vals = filteredData[0].sample_values.slice(0, 10);
    var otu_idents = filteredData[0].otu_ids.slice(0, 10);
    var otu_labs = filteredData[0].otu_labels.slice(0, 10);
    console.log(sam_vals, otu_idents, otu_labs);

    var metadata = data.metadata;
    var results = metadata.filter((entry) => entry.id == sample);
    var result = results[0];

    Object.entries(data).forEach(([key, value]) => {
      box.append("h6").text(`${key.toUpperCase()}: ${value}`);
      updatePlotly(data);
    });
  });
}

function horizontal_graph(id) {
  d3.json("samples.json").then((data) => {
    const filteredData = data.samples.filter((sample) => {
      return sample.id == id;
    });

    var sam_vals = filteredData[0].sample_values.slice(0, 10);
    var otu_idents = filteredData[0].otu_ids.slice(0, 10);
    var otu_labs = filteredData[0].otu_labels.slice(0, 10);
    console.log(sam_vals, otu_idents, otu_labs);

    var data = [
      {
        type: "bar",
        y: otu_idents,
        x: sam_vals,

        orientation: "h",
      },
    ];

    Plotly.newPlot("bar", data);
  });
}

function bubblely_chart(id) {
  var trace1 = {
    x: otu_idents,
    y: sam_vals,

    mode: "markers",
    marker: {
      color: ["rgb(93, 164, 214)", "rgb(255, 144, 14)"],
      size: [40, 60],
    },
  };

  var data = [trace1];

  var layout = {
    title: "Bubble Chart Hover Text",
    showlegend: false,
    height: 600,
    width: 600,
  };

  Plotly.newPlot("bubble", data, layout);
}
