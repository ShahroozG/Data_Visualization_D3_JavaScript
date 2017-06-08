      // the main function for drawing chart

      function draw(data) {

        //D3.js setup code

          "use strict";
          var margin = 88,
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

          //building the svg part as a container
          var svg = d3.select("body")
                      .append("svg")
                      .attr("width", width + margin)
                      .attr("height", height + margin)
                      .append('g')
                      .attr('class','chart');

         // adding footnote
          var footnote = svg.append("g")
                           .attr('class', 'footnote')
                           .attr('transform', "translate(10," + (height + 68) + ")")

          footnote.append('text')
                  .text("*More than 100,000 Casualties")


        function draw_all(data){

              d3.select('h2')
                .text("Major* Wars & Revolutions Casualties (1900 - 2017)");

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

        // draw bubbles with rectangles for telling the story
        function draw_all_final(data){

          draw_all(data)

          svg.append('g')
             .selectAll('line')
             .attr("class", "line")
             .data(line_final)
             .enter()
             .append('line')
             .attr("x1", function(d){return d["x1"]})
             .attr("y1", function(d){return d["y1"]})
             .attr("x2", function(d){return d["x2"]})
             .attr("y2", function(d){return d["y2"]})
             .attr("stroke-dasharray", "10, 5")

          // Story descriptions
          var discrip1 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 28) + ",300)")
              discrip1.append('text')
                      .text("18%")

          var discrip2 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 642) + ",30)")
              discrip2.append('text')
                      .text("72%")

          var discrip3 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 1092) + ",400)")
              discrip3.append('text')
                      .text("10%")

          var percentage = svg.append("g")
                           .attr('class', 'discrip')
                           .attr('transform', "translate(10," + (height + 85) + ")")

          percentage.append('text')
                    .text("% The percentage of total casualties in 3 intervals")
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
                  return '#696969';
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
             // as the transform is applied to the anchor, it is easier to centre
             //the text
            .attr("text-anchor", "middle")
            // rotate the text
            .attr("transform", "translate("+ (margin - 60) +
                  ","+(height/2 + 25)+")rotate(-90)")
            .text("Death tolls in Millions");

        // adding label for x axis
        svg.append("text")
           .attr("text-anchor", "middle")
           // centre below axis
           .attr("transform", "translate("+ (width/2 + 50) + "," + (height + 80)+")")
           .text("Years");

          function key_func(d){
            return d['title'];
          }

        draw_all(data);

        var line_final = [{"x1": 345, "y1": count_scale(27.5),
                           "x2": 345, "y2": count_scale(0)},
                          {"x1": 814, "y1": count_scale(72),
                           "x2": 814, "y2": count_scale(0)}];

        function update(region){
            var filtered = data.filter(function(d) {
                return d['region'] === region;
            });

            d3.select("h2")
              .html("Major* Wars & Revolutions Casualties (1900 - 2017)"+
                    "<br/>" + region);

            var discrip = svg.selectAll('.discrip')
            discrip.remove();

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
               .text(function(d){return d['title'] + ":" + d['casualty_million'] + " Million"})
        }


        //adding animation

        var region_idx = 0

        var regions = ["South America", "Middle East", "Asia", "Europe",
                       "Russia", "Africa", "China", "World War I,II", "Total"];

        var regions_total = [" : 1  Million", " : 5 Million", " : 15 Million",
                             " : 17 Million", " : 19 Million", " : 24 Million",
                             " : 56 Million", " : 80 Million", " : ~ 217 Million"];

        var region_interval = setInterval(function(){
          update(regions[region_idx]);

          region_idx++;

          if(region_idx >= regions.length){
            clearInterval(region_interval);

            draw_all_final(data);

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
                    if(d !== "Total"){
                      update(d)
                      }else{
                        draw_all_final(data)
                      };
                });
          }
        }, 1000)

      };