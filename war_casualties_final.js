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
                           .attr('transform', "translate(10," + (height + 72) + ")")

          footnote.append('text')
                  .text("*More than 100,000 Casualties")


        function draw_all(data){

           d3.select('h2')
             .html("Major* Wars & Revolutions Casualties (1900 - 2017)" +
                   "<br/>" + "Total: ~ 217 Million");

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

          svg.append('g')
             .selectAll('rect')
             .attr("class", "rect")
             .data(rect_final)
             .enter()
             .append('rect')
             .attr("x", function(d){ return d["x"]})
             .attr("y", function(d){ return d["y"]})
             .attr("width", function(d){ return d["width"]})
             .attr("height", function(d){ return d["height"]})


          draw_all(data)

          // Story descriptions
          var discrip1 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 88) + ",275)")
              discrip1.append('text')
                      .text("18% of Total Casualties")

          var discrip2 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 558) + ",11)")
              discrip2.append('text')
                      .text("72% of Total Casualties")

          var discrip3 = svg.append("g")
                            .attr('class', 'discrip percent')
                            .attr('transform', "translate(" + (margin + 970) + ",395)")
              discrip3.append('text')
                      .text("10% of Total Casualties")
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

         var time_scale = d3.scale.linear()
                            .range([margin, width])
                            .domain(time_extent);

         var time_axis = d3.svg.axis()
                           .scale(time_scale)
                           .orient("bottom")
                           .tickFormat(d3.format("d"))

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

        var rect_final = [{"x": time_scale(1900),
                           "y": count_scale(28),
                           "width": (time_scale(1926) - time_scale(1900)),
                           "height": (count_scale(0)-count_scale(29))},
                          {"x": time_scale(1929),
                           "y": count_scale(72.5),
                           "width": (time_scale(1975) - time_scale(1929)),
                           "height": (count_scale(0)-count_scale(73.5))},
                          {"x": time_scale(1976.5),
                           "y": count_scale(7.5),
                           "width": (time_scale(2018.5) - time_scale(1977)),
                           "height": (count_scale(0)-count_scale(8.5))}];

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

        function update(regions){
            var filtered = data.filter(function(d) {
                return d['region'] === regions['name'];
            });

            d3.select("h2")
              .html("Major* Wars & Revolutions Casualties (1900 - 2017)"+
                    "<br/>" + regions['name'] + regions['tot']);

            var discrip = svg.selectAll('.discrip')
            discrip.remove();

            var rect = svg.selectAll('rect')
            rect.remove()

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

        var regions = [{"name": "South America", "tot": " : 1  Million"},
                       {"name": "Middle East", "tot": " : 5 Million"},
                       {"name" : "Asia", "tot": " : 15 Million"},
                       {"name": "Europe", "tot": " : 17 Million"},
                       {"name": "Russia", "tot": " : 19 Million"},
                       {"name": "Africa", "tot": " : 24 Million"},
                       {"name": "China", "tot": " : 56 Million"},
                       {"name": "World War I,II", "tot": " : 80 Million"},
                       {"name": "Total", "tot": " : ~ 217 Million"}];

        var region_interval = setInterval(function(){
          update(regions[region_idx]);

          region_idx++;

          if(region_idx >= regions.length){
            clearInterval(region_interval);
            draw_all_final(data);

          var buttons = d3.select('body')
                            .append('div')
                            .attr('class', 'region_buttons')
                            .selectAll('div')
                            .data(regions)
                            .enter()
                            .append('div')
                            .style('background', function(d){
                                    return continent_color(d['name'])})
                            .style("color", "white")
                            .text(function(d){
                                   return d['name'];
                                   });

           var totals = d3.select('body')
                          .append('div')
                          .attr("class", "regions_total")
                          .selectAll("div")
                          .data(regions)
                          .enter()
                          .append("div")
                          .text(function(d){
                                 return d["tot"];
                          });

                buttons.on("click", function(d){
                    d3.select('.region_buttons')
                      .selectAll('div')
                      .transition()
                      .duration(100)
                      .style("color", "white")
                      .style("background", function(d){
                        return continent_color(d['name'])})

                    d3.select(this)
                      .transition()
                      .duration(100)
                      .style("background", "white")
                      .style("color", "black")
                    if(d['name'] !== "Total"){
                      update(d)
                      }else{
                        draw_all_final(data)
                      };
                });
          }
        }, 1000)
      };