## Visualizing Major Wars and Revolutions Casualties between 1900-2017
###### Visualization with D3.js Final Project

Udacity-DAND  
Shahrooz Govahi

**Summary**  
In this project I visualized the number of casualties in major wars and revolutions in all over the world after year 1900 till 2017. By 'major' I mean more than 100,000 death tolls. First audiance will see all data points together and then the animation will show different regions related data points and at the end the audiance has the option to choose a region and see what was the casualties in that region in this time period. I found out there is 3 different time intervals: 1900-1930; 1930-1975; 1975-2017

**Design**  
First sketch(index1.html) was a scatter plot that shows all data points as a time series. This version created with dimple.js; After getting feedback I understand this scatter plot is not so clear and it can not convey a feeling about how big and important are the number of casualties.
So I decided to use D3.js to have more options and create a more attractive bubble chart. In the second sketch(index2.html) I create a static bubble chart that shows different regions with different colors. Getting feedback helps me to decide I should add animation and interaction to the chart.
The third and final version(index4.html) was built on the second version. The encodings for this visualization are:  
1. Regions ----> Color
2. Years ----> Position x
3. Number of casualties ----> Position y, Size of bubble
4. Important time intervals ----> Vertical colored background rigions on chart  

I choose to use a unique scale for number of casualties. The other option was chnaging scale for each region. I tried it and I learned it will create confusion. It will create bigger bubbles for each region but at the end I want to show all regions together and this variable scaling will not provide a solid comparisson between different data points. In this case many bubbles sizes are very small, by all over the visualization there is only one scale.
Another decision was about focusing on major wars and revolutions. The original data set contains some data points with very small number of casualties. I tried to put all data points at the same chart and it doesn't work. There are some data points with less than 5,000 as value for casualties and there is world war II with value equal to 60,000,000; So I only focus on data points with casualties value more than or equal to 100,000;
Another design choice was about sharpness of colors I used for regions. In the second version I used bright colors and I realized it's not very good use of colors so I choose less bright colors and I tried to differentiate regions with different color hues.

**Feedback**  
After finishing each version I showd the result to three different persons and I summerize their feedback and use them for next version.

*First Sketch Feedback*: "It's very vague and I don't get a special concept here. It's more like stock market charts. There is not distinction between different countries in this chart. The main takeaway from this chart is that World War II was a very bloody war and other wars are not look like very important base on your chart".

*Second Sketch Feedback*: "It's a clear chart and as I understand there are many many wars in 20th centry and casualties are more that what I thaught. I would like to see sum of casualties for each region and see the total casualties in all regions and wars. And a small point about colors; The color for "South and Central America" region is similar to "Europe" region color. It's good to use more distinctive colors. More over if I want to focus only on one region, I can not and the only choice I have is looking at all regions together. Is there any way to give me the option to choose one region at a time?"

*Third Sketch Feedback*: "I like the animation part and the buttons that give me the opportunity to choose each region at a time. I realizaed that there are many death tolls related to wars in 20th century that I was not aware of them. That's really shocking. The total number of casualties is more than 200 Million! Overall I like this chart. It teaches me a very important fact. I learned Africa has the most wars and revolutions between all regions and China had a very bloody century after 1910; I don't know how you can fix this, but I have a problem with very small bubbles at the bottom of chart. Can you find a way to zoom in them?"

*Forth Sketch Feedback*: "You've done really well so far with this section. You've found your own dataset and analysed it to focus on a clear area of the data. However, the rubric asks specifically for an EXPLANATORY visualisation and at the moment, yours is more on the EXPLORATORY side. This is easily solved. All you need to do is look at your visualisation draw some conclusions - for example - what were the major trends for each region. I have a suggestion regarding your legend and buttons. Why not combine them?
I'd suggest to have a textbox that changes for each region."

In respond to these feedbacks I merge the legend and buttons part. So I save some space and create a more clear picture. Moreover I found out the 20th centurey first 30 years is like a starting point for many conflicts and revolutions. Years between 1930 and 1975 are the worst years and 72% of all casualties happened in this 45 years. It seems after that world understand war and revolution is not an appropriate way for change, so in the recent 42 years only 10% of total casualties happened. Unfortunately the most damaged region in the third interval is Africa. You can see after 1975 there are no war or revolution in many regions.
I didn't add a textbox for each region, because I beleive the visualization should talk itself and adding text to it is not an appropriate way, unless that's the only way we can convey an idea. By adding the vertical dashed lines, I draw my audiance attention to a story about the whole world and not specific regions. It shows there is trend all over the world in three different time periods.

In final version I added three vertical background colors for three significant time intervals. I've added a simple text above each shaded region on the chart to show the big difference between share of each of them in total casualties.  

**Resources**  
1. Data Set resource:
 http://www.scaruffi.com/politics/massacre.html
2. Data Set resource:
https://www.wikipedia.org
2. Data Visualization Codes-Udacity
https://classroom.udacity.com/nanodegrees/nd002/parts/00213454010/modules/318423863275460/lessons/3066258748/concepts/31058086880923
3. Code snippets:
https://bl.ocks.org/mbostock
