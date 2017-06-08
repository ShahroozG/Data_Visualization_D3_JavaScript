      // the main function for drawing chart
      function draw(data) {
      /*
        D3.js setup code
      */

          "use strict";
          var margin = 80,
              width = 1330 - margin,
              height = 530 - margin;

          var casualty_max = d3.max(data, function(d){
            return d['casualty_million'];
          });

          var radius = d3.scale.sqrt()
                         .domain([0, casualty_max])
                         .range([0, 70]);


          //adding title to graph
          d3.select('body')
            .append('h2')
            .text("Major Wars & Revolutions Casualties (1900 - 2017)")


          //building the svg part as a container
          var svg = d3.select("body")
                      .append("svg")
                      .attr("width", width + margin)
                      .attr("height", height + margin)
                      .append('g')
                      .attr('class','chart');

        function draw_all(data){

              d3.select('h2')
                .text("Major Wars & Revolutions Casualties (1900 - 2017)");

           svg.append('g')
              .selectAll('circle')
              .attr("class", "bubble")
              .data(data.sort(function(a, b) {
                 return b['casualty_million'] - a['casualty_million'];
               }), key_func)
              .enter()
              .append('circle')
              .attr('cx', function(d){return time_scale(d['end_year']);})
              .attr('cy', function(d){return count_scale(d['casualty_million']);})
              .attr('r', function(d){return radius(d['casualty_million']);})
              .attr('fill', function(d){return continent_color(d['region']);})
              .append('svg:title')
              .text(function(d){return d['title'] + ":" + d['casualty_million']
                    + " Million"})
            }

        // Circles Colors base on region
        function continent_color(d){
                if (d == "Africa"){
                  return 'Orange';
                } else if (d == "Asia"){
                  return 'Indigo';
                } else if (d == "South America"){
                  return '#186A3B';
                } else if (d == "Russia"){
                  return '#ffb3b3';
                } else if (d == "China"){
                  return '#0080ff';
                } else if (d == "Middle East"){
                  return '#ff0080';
                } else if (d == "Europe"){
                  return '#80ff00';
                } else if (d == "World War I,II"){
                  return 'red';
                } else {
                  return '#009933';
                }
        };

        // defining time_axis and adding it to the page
         var time_extent = d3.extent(data, function(d){
              return d['end_year'];
         });

         var time_scale = d3.time.scale()
             .range([margin, width])
             .domain(time_extent);

         var time_axis = d3.svg.axis()
                           .scale(time_scale)
                           .ticks(d3.time.years, 10)

         d3.select("svg")
           .append('g')
           .attr('class', 'x axis')
           .attr('transform', "translate(0," + (height + 20) + ")")
           .call(time_axis);

        // defining count_axis and adding it to the page
         var count_extent = d3.extent(data, function(d){
              return d['casualty_million'];
         });

         var count_scale = d3.scale.linear()
                             .range([height, margin])
                             .domain(count_extent);

         var count_axis = d3.svg.axis()
                            .scale(count_scale)
                            .orient("left")
                            .tickFormat(d3.format("s"));
        d3.select("svg")
          .append('g')
          .attr('class', 'y axis')
          .attr('transform', "translate(" + (margin - 10) + ",0)")
          .call(count_axis);

        // adding label for y axis
        svg.append("text")
             // this makes it easy to centre the text as the transform is applied to
             //the anchor
            .attr("text-anchor", "middle")
            // text is drawn off the screen top left, move down and out and rotate
            .attr("transform", "translate("+ (margin - 60)
                  +","+(height/2 + 25)+")rotate(-90)")
            .text("Death tolls in Millions");

        // adding label for x axis
        svg.append("text")
            // this makes it easy to centre the text as the transform is applied to
            //the anchor
           .attr("text-anchor", "middle")
           // centre below axis
           .attr("transform", "translate("+ (width/2 + 50) + "," + (height + 80)+")")
           .text("Years");

          function key_func(d){
            return d['title'];
          }

        draw_all(data);


        function update(region){
            var filtered = data.filter(function(d) {
                return d['region'] === region;
            });

            d3.select("h2")
              .html("Major Wars & Revolutions Casualties (1900 - 2017)"+
                    "<br/>" + region);

            var circles = svg.selectAll('circle')
                             .data(filtered, key_func)

            circles.exit().remove();

            svg.append('g')
               .selectAll('circle')
               .attr("class", "bubble")
               .data(filtered, key_func)
               .enter()
               .append('circle')
               .attr('cx', function(d){return time_scale(d['end_year']);})
               .attr('cy', function(d){return count_scale(d['casualty_million']);})
               .attr('r', function(d){return radius(d['casualty_million']);})
               .attr('fill', function(d){return continent_color(d['region']);})
               .append('svg:title')
               .text(function(d){return d['title'] + ":" + d['casualty_million']
                     + " Million"})
        }


        //adding animation

        var region_idx = 0

        var regions = ["South America", "Middle East", "Asia", "Europe",
                       "Russia", "Africa", "China", "World War I,II", "All"];

        var regions_total = [" : 0.9  Million", " : 5.1 Million", " : 14.9 Million",
                             " : 17 Million", " : 19.2 Million", " : 24.3 Million",
                             " : 56 Million", " : 80 Million", " : ~ 210 Million"];

        var region_interval = setInterval(function(){
          update(regions[region_idx]);

          region_idx++;

          if(region_idx >= regions.length){
            clearInterval(region_interval);

            draw_all(data);

            var buttons = d3.select('body')
                            .append('div')
                            .attr("class", "region_buttons")
                            .selectAll("div")
                            .data(regions)
                            .enter()
                            .append("div")
                            .style("background", function(d){return continent_color(d)})
                            .style("color", "white")
                            .text(function(d){
                                   return d;
                                   });

           var totals = d3.select('body')
                          .append('div')
                          .attr("class", "regions_total")
                          .selectAll("div")
                          .data(regions_total)
                          .enter()
                          .append("div")
                          .text(function(d){
                                 return d;
                          });

                buttons.on("click", function(d){
                    d3.select('.region_buttons')
                      .selectAll('div')
                      .transition()
                      .duration(1000)
                      .style("color", "white")
                      .style("background",  function(d){return continent_color(d)})

                    d3.select(this)
                      .transition()
                      .duration(100)
                      .style("background", "white")
                      .style("color", "black")
                    if(d !== "All"){
                      update(d)
                      }else{
                        draw_all(data)
                      };
                });
          }
        }, 2000)

      };