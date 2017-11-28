// data from https://www.cbo.gov/system/files/115th-congress-2017-2018/costestimate/reconciliationrecommendationssfc.pdf
'use strict';

// Chart.js does not have a way to load JSON
// load the JSON data
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'data.json', true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4) {
          if(xobj.status == '200') {
            var data = JSON.parse(xobj.responseText);
            callback(data);
          } else {
            console.warn('problem loading data')
          }
        }
  };
  xobj.send(null);  
}

loadJSON(drawChart);

function drawChart(jsonData) {
  var ctx = document.getElementById('CBOchart').getContext('2d');

  var colors = ['#fdff1f', '#f7b51b', '#ef6c17', '#e72614', '#df113e', '#d80e78', '#d00baf', '#ad08c8', '#6d06c0', '#3004b8', '#020db1']

  var dsets = [];
  jsonData.datasets.forEach(function(set, i) {
    //change to negative to show money saved
    set.data = set.data.map(function(v) {
      return -v;
    })
    dsets.push({
      backgroundColor: colors[i],
      borderColor: '#000000',
      borderWidth: 1,
      data: set.data,
      label: set.name
    }) 
  })

  var data = {
    labels: jsonData.years,
    datasets: dsets
  };

  var chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return "$" + Number(tooltipItem[0].yLabel).toFixed(0).replace(/./g, function(c, i, a) {
              return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
            });
          },
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label;
          }
        }
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Millions of Dollars'
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Year'
            }
          }
        ]
      },
      title: {
        display: true,
        text: 'Allocation of Changes in Net Federal Revenues and Spending Under the Tax Cuts and Jobs Act'
      },
      legend: {
        position: 'bottom'
      }
    }
  });
};

