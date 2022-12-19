import React, { Component } from 'react';
import '../styles/Viz.scss'
import data from '../data/original_df.csv';
import * as d3 from 'd3';
import {selectAll} from "https://cdn.skypack.dev/d3-selection@3";


export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle1: false
    }
  }

  render() {

    // SVG PATH
    const rebel_icon = ['M 0 0 A 1 1 0 0 0 5 0 A 1 1 0 0 0 0 0 Z M -15 0 A 1 1 0 0 0 2 0 A 1 1 0 0 0 -10 0 Z']

    // RENDER DATA
    d3.csv(data).then(showData)


    // ICONS GRID
    const perRow = 10;
    const size = 14;
    const sizeY= 14;


    // FUNCTION TO DISPLAY DATA TO THE DOM
    function showData(data) {


    // SELECTING ATTRIBUTES AND REBEL ORG INFORMATION
    data.forEach(d => {
        // console.log("wgattss this",d)
        d.english_translation = d.english_translation;
        d.area_of_operation = d.area_of_operation;
        d.foughtincivilwar = d.foughtincivilwar;
        d.transitioned_to_organized_crime = d.transitioned_to_organized_crime;
        d.transitioned_from_organized_crime_to_resistance = d.transitioned_from_organized_crime_to_resistance;
        d.drugtrade = d.drugtrade;
        d.outcome_goal = d.outcome_goal;
        d.leader_s = d.leader_s;

    })

    // MAKING SURE THE DATA WAS RENDERED
    // console.log('the data',data)
    

    // COUNT NUMBER FOR REBEL GROUPS THAT MEET EACH ATTRIBUTE
    let count = 0;
    

    // __________________________________________________________
    // - - - - - - - - - - - - 
    // REGIONS
    // - - - - - - - - - - - - 



    // 1. Mapping through data to only render latin america regions
    window.latinAmericaData = data.map((key,value) => {
      if(key['latinamerica'] == 1){
        count++;
        // console.log("Latin America:",count)
        return key;
      }
    })
    
    // 2. Mapping through data to only render africa regions
    window.africaData = data.map((key,value) => {
      if(key['africa'] == 1){
        console.log("Africa:",key) 
        return key;
      }
    })

    // 3. Mapping through data to only render Mid Eastern Africa regions
    window.midEastnAfricaData = data.map((key,value) => {
      if(key['mideastnafrica'] == 1){
        // console.log("Mid Eastern Africa:",key) 
        return key;
      }
    })

    // 4. Mapping through data to only render West regions
    window.westData = data.map((key,value) => {
      if(key['west'] == 1){
        // console.log("West:",key) 
        return key;
      }
    })

    // 5. Mapping through data to only render Central Eurasia regions
    window.centralEurasiaData = data.map((key,value) => {
      if(key['centraleurasia'] == 1){
        // console.log("Central Eurasia:",key) 
        return key;
      }
    })

    // 6. Mapping through data to only render South Asia regions
    window.southAsiaData = data.map((key,value) => {
      if(key['southasia'] == 1){
        // console.log("South Asia:",key) 
        return key;
      }
    })  

    // 7. Mapping through data to only render South East Asia regions
    window.southEastAsiaData = data.map((key,value) => {
      if(key['seasia'] == 1){
        // console.log("South East Asia:",key) 
        return key;
      }
    })

    // 8. Mapping through data to only render East Asia regions
    window.eastAsiaData = data.map((key,value) => {
      if(key['eastasia'] == 1){
        // console.log("East Asia:",key) 
        return key;
      }
    })



    // __________________________________________________________
    // - - - - - - - - - - - - - - - - -
    // ATTRIBUTE: FOUGHT IN CIVIL WAR
    // - - - - - - - - - - - - - - - - - 



    // 2. Testing filter method on the data to remove regions that are not from latin america
    // console.log("data with undefined objects:",latinAmericaData.filter(Boolean))

  
    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ATTRIBUTE 1

    // FUNCTION TO GET REBEL GROUPS THAT FOUGHT IN CIVIL WAR BY REGION
    let foughtinCivilWar = (region) => {
          // - - - - - - - - - - - - - - - - - - - - - - - - - -
          //  Cross reference with jupyter notebook analysis 
          // 
          //  Latin America = 24 cases 
          //  Africa        = 20 cases
          //  Mid Eastern Africa = 59 cases
          //  West          = 12 cases
          //  Central Eurasia = 7 cases
          //  South East Asia = 15 cases
          //  East Asia = 0 cases 
          // - - - - - - - - - - - - - - - - - - - - - - - - - -
      let dataForRegion = []
      let updatedData = region.filter(Boolean) //// the filter boolean removes all undefined objects within the array 

      updatedData.map((key, value) => {
        if(key['foughtincivilwar'] == 1 ){
          // console.log("fought in civil war: ", key)
          dataForRegion.push(key) // pushing the objects into a new array \
        }
      })

      // console.log(dataForRegion)
      return dataForRegion // returning the array of objects 
    }



    // FUNCTION TO DISPLAY FOUGHT IN CIVIL WAR TO THE DOM
    let foughtCivilWar = () => {
      // TOOOL TIP
      const toolTip = d3.select('body')
      .append('div')
      .attr('class','tooltip')
      .style('background-color','#F3F3F1')
      .style('opacity','0')
      .style('position','absolute')
      .style('display','none')


      // LATIN AMERICA
      const latinAmericaSvg = 
      d3.select('#c2-r2')
      .selectAll('#c2-r2')
      .data(foughtinCivilWar(window.latinAmericaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      latinAmericaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

      // AFRICA
      const africaSvg = 
      d3.select('#c2-r3')
      .selectAll('#c2-r3')
      .attr("id","c2-r3")
      .data(foughtinCivilWar(window.africaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      africaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // MID EASTERN AFRICA
      const midEasternafricaSvg = 
      d3.select('#c2-r4')
      .selectAll('#c2-r4')
      .attr("id","c2-r4")
      .data(foughtinCivilWar(window.midEastnAfricaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      midEasternafricaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "red") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // WEST
      const westSvg = 
      d3.select('#c2-r5')
      .selectAll('#c2-r5')
      .attr("id","c2-r5")
      .data(foughtinCivilWar(window.westData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      westSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // CENTRAL EURASIA
      const centralEurasiaSvg = 
      d3.select('#c2-r6')
      .selectAll('#c2-r6')
      .attr("id","c2-r6")
      .data(foughtinCivilWar(window.centralEurasiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      centralEurasiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // SOUTH ASIA
      const southAsiaSvg = 
      d3.select('#c2-r7')
      .selectAll('#c2-r7')
      .attr("id","c2-r7")
      .data(foughtinCivilWar(window.southAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")    
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // SOUTH EAST ASIA
      const southEastAsiaSvg = 
      d3.select('#c2-r8')
      .selectAll('#c2-r8')
      .attr("id","c2-r8")
      .data(foughtinCivilWar(window.southEastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southEastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

      // SOUTH ASIA
      const eastAsiaSvg = 
      d3.select('#c2-r9')
      .selectAll('#c2-r9')
      .attr("id","c2-r9")
      .data(foughtinCivilWar(window.eastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      eastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });
    }

    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ATTRIBUTE 2

    // FUNCTION TO GET REBEL GROUPS THAT HAVE TRANSITIONED TO ORGANIZED CRIME
    let transitionedToOrgCrime = (region) => {
      let dataforRegion = []
      let updatedData = region.filter(Boolean);

      updatedData.map((key,value) => {
        if(key['transitioned_to_organized_crime'] == 1){
          // console.log('transition to org crime',key)
          dataforRegion.push(key)
        }
      })
      return dataforRegion;
    }

    // TESTING A REGION
    // transitionedToOrgCrime(window.latinAmericaData)

    let transToOrgCrime = () => {
      // TOOOL TIP
      const toolTip = d3.select('body')
      .append('div')
      .attr('class','tooltip')
      .style('background-color','#F3F3F1')
      .style('opacity','0')
      .style('position','absolute')
      .style('display','none')


      // LATIN AMERICA
      const latinAmericaSvg = 
      d3.select('#c3-r2')
      .selectAll('#c3-r2')
      .data(transitionedToOrgCrime(window.latinAmericaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      latinAmericaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // AFRICA
      const africaSvg = 
      d3.select('#c3-r3')
      .selectAll('#c3-r3')
      .attr("id","c3-r3")
      .data(transitionedToOrgCrime(window.africaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      africaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // MID EASTERN AFRICA
      const midEasternafricaSvg = 
      d3.select('#c3-r4')
      .selectAll('#c3-r4')
      .attr("id","c3-r4")
      .data(transitionedToOrgCrime(window.midEastnAfricaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      midEasternafricaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // WEST
      const westSvg = 
      d3.select('#c3-r5')
      .selectAll('#c3-r5')
      .attr("id","c3-r5")
      .data(transitionedToOrgCrime(window.westData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      westSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // CENTRAL EURASIA
      const centralEurasiaSvg = 
      d3.select('#c3-r6')
      .selectAll('#c3-r6')
      .attr("id","c3-r6")
      .data(transitionedToOrgCrime(window.centralEurasiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      centralEurasiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });    

      // SOUTH ASIA
      const southAsiaSvg = 
      d3.select('#c3-r7')
      .selectAll('#c3-r7')
      .attr("id","c3-r7")
      .data(transitionedToOrgCrime(window.southAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "red")    
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });
        
        

      // SOUTH EAST ASIA
      const southEastAsiaSvg = 
      d3.select('#c3-r8')
      .selectAll('#c3-r8')
      .attr("id","c3-r8")
      .data(transitionedToOrgCrime(window.southEastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southEastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // SOUTH ASIA
      const eastAsiaSvg = 
      d3.select('#c3-r9')
      .selectAll('#c3-r9')
      .attr("id","c3-r9")
      .data(transitionedToOrgCrime(window.eastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      eastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

    }
    
    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ATTRIBUTE 3

    // FUNCTION TO GET ATTRIBUTE FROM REGIONS
    let orgCrimeToRes = (region) => {
      let dataforRegion = []
      let updatedData = region.filter(Boolean);

      updatedData.map((key,value) => {
        if(key['transitioned_from_organized_crime_to_resistance'] == 1){
          // console.log('transition from org crime to resistence:',key)
          dataforRegion.push(key)
        }
      })
      return dataforRegion;
    }

    // TESTING
    // orgCrimeToRes(window.latinAmericaData)

    let transCrimetoRes = () => {
      // TOOOL TIP
      const toolTip = d3.select('body')
      .append('div')
      .attr('class','tooltip')
      .style('background-color','#F3F3F1')
      .style('opacity','0')
      .style('position','absolute')
      .style('display','none')


      // LATIN AMERICA
      const latinAmericaSvg = 
      d3.select('#c4-r2')
      .selectAll('#c4-r2')
      .data(orgCrimeToRes(window.latinAmericaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      latinAmericaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

      // AFRICA
      const africaSvg = 
      d3.select('#c4-r3')
      .selectAll('#c4-r3')
      .attr("id","c4-r3")
      .data(orgCrimeToRes(window.africaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      africaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // MID EASTERN AFRICA
      const midEasternafricaSvg = 
      d3.select('#c4-r4')
      .selectAll('#c4-r4')
      .attr("id","c4-r4")
      .data(orgCrimeToRes(window.midEastnAfricaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      midEasternafricaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "red") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // WEST
      const westSvg = 
      d3.select('#c4-r5')
      .selectAll('#c4-r5')
      .attr("id","c4-r5")
      .data(orgCrimeToRes(window.westData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      westSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "red") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // CENTRAL EURASIA
      const centralEurasiaSvg = 
      d3.select('#c4-r6')
      .selectAll('#c4-r6')
      .attr("id","c4-r6")
      .data(orgCrimeToRes(window.centralEurasiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      centralEurasiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
          .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

      // SOUTH ASIA
      const southAsiaSvg = 
      d3.select('#c4-r7')
      .selectAll('#c4-r7')
      .attr("id","c4-r7")
      .data(orgCrimeToRes(window.southAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")    
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });
        
        

      // SOUTH EAST ASIA
      const southEastAsiaSvg = 
      d3.select('#c4-r8')
      .selectAll('#c4-r8')
      .attr("id","c4-r8")
      .data(orgCrimeToRes(window.southEastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southEastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // SOUTH ASIA
      const eastAsiaSvg = 
      d3.select('#c4-r9')
      .selectAll('#c4-r9')
      .attr("id","c4-r9")
      .data(orgCrimeToRes(window.eastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      eastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });
    }

    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ATTRIBUTE 4 


    let inDrugTrade = (region) => {
      let dataforRegion = []
      let updatedData = region.filter(Boolean);

      updatedData.map((key,value) => {
        if(key['drugtrade'] == 1){
          // console.log('drug trade:',key)
          dataforRegion.push(key)
        }
      })
      return dataforRegion;
    }

    // TESTING
    // inDrugTrade(window.latinAmericaData)

    let drugTrade = () => {
      // TOOOL TIP
      const toolTip = d3.select('body')
      .append('div')
      .attr('class','tooltip')
      .style('background-color','#F3F3F1')
      .style('opacity','0')
      .style('position','absolute')
      .style('display','none')


      // LATIN AMERICA
      const latinAmericaSvg = 
      d3.select('#c5-r2')
      .selectAll('#c5-r2')
      .data(inDrugTrade(window.latinAmericaData)) 
      .enter()
      .append('g')
      .attr("fill", "#CBC7CF") 
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      latinAmericaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

      

      
      

      // AFRICA
      const africaSvg = 
      d3.select('#c5-r3')
      .selectAll('#c5-r3')
      .attr("id","c5-r3")
      .data(inDrugTrade(window.africaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });
      

      africaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // MID EASTERN AFRICA
      const midEasternafricaSvg = 
      d3.select('#c5-r4')
      .selectAll('#c5-r4')
      .attr("id","c5-r4")
      .data(inDrugTrade(window.midEastnAfricaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      midEasternafricaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // WEST
      const westSvg = 
      d3.select('#c5-r5')
      .selectAll('#c5-r5')
      .attr("id","c5-r5")
      .data(inDrugTrade(window.westData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      westSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "red") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });



      // CENTRAL EURASIA
      const centralEurasiaSvg = 
      d3.select('#c5-r6')
      .selectAll('#c5-r6')
      .attr("id","c5-r6")
      .data(inDrugTrade(window.centralEurasiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      centralEurasiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });
    

      // SOUTH ASIA
      const southAsiaSvg = 
      d3.select('#c5-r7')
      .selectAll('#c5-r7')
      .attr("id","c5-r7")
      .data(inDrugTrade(window.southAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")  
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });  
      

      // SOUTH EAST ASIA
      const southEastAsiaSvg = 
      d3.select('#c5-r8')
      .selectAll('#c5-r8')
      .attr("id","c5-r8")
      .data(inDrugTrade(window.southEastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      southEastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF") 
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });


      // SOUTH ASIA
      const eastAsiaSvg = 
      d3.select('#c5-r9')
      .selectAll('#c5-r9')
      .attr("id","c5-r9")
      .data(inDrugTrade(window.eastAsiaData)) 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")"
      });

      eastAsiaSvg.append('path')
      .attr("d", rebel_icon)
      .attr("width", 600)
      .attr("height", 600)
      .attr("fill", "#CBC7CF")
      .on('mouseover', function(event,d){
        toolTip.transition()
        .duration(200)
        .style('display','block')
        .style('opacity','.9')
        .attr('z-index','1000')
        toolTip.html( "<span class=tooltip-title> NAME</span>" + ":  "+  '<br/>' +  d.english_translation + "<br/> <br/>" +
                       "<span class=tooltip-title> AREA OF OPERATION</span>" + ":  "+  '<br/>' + d.area_of_operation + "<br/>" + "<br/>"
                     + "<span class=tooltip-title> GOALS</span>" + ":  "+  '<br/>' + d.outcome_goal)
        .style("left", (event.pageX + 100) + "px")
        .style("top", (event.pageY - 120) + "px")
      })
      .on("mouseout", function(d) {
        toolTip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('display','none');
        });

    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // ATTRIBUTE 1: FOUGHT IN A CIVIL WAR
    d3.select('#c1-r1')
    .attr('class','attr-1')
    .on('click',function(){
      console.log("fought in civil war btn clicked!")
      foughtCivilWar()
    })

    // ATTRIBUTE 2: TRANSITIONED TO ORGANIZED CRIME
    d3.select('#c2-r1')
    .attr('class','attr-2')
    .on('click',function(){
      console.log("transitioned to organized crime btn clicked!")
      transToOrgCrime()
    })

    // ATTRIBUTE 3: TRANSITIONED FROM ORGANIZED CRIME TO RESISTENCE
    d3.select('#c3-r1')
    .attr('class','attr-3')
    .on('click',function(){
      console.log("attr3 clicked!")
      transCrimetoRes()
    })

    // ATTRIBUTE 4: DRUGTRADE
    d3.select('#c4-r1')
    .attr('class','attr-4')
    .on('click',function(){
      console.log("attr4 clicked!")
      drugTrade()
    })



    // __________________________________________________________
    }

    return (
      <section className="grid-viz" >
        {/* REGIONS */}
        <div id="c1-r2">
          <h5 className="region-title"> LATIN AMERICA</h5>
        </div>
       
        <div id="c1-r3"> 
        <h5 className="region-title"> AFRICA </h5>
        </div>
        
        <div id="c1-r4">
        <h5 className="region-title" > MID EASTERN AFRICA </h5>
        </div>

        <div id="c1-r5">
        <h5 className="region-title" > WEST </h5>
        </div>
        
        <div id="c1-r6">
        <h5 className="region-title" > CENTRAL EURASIA </h5>
        </div>
        
        <div id="c1-r7">
        <h5 className="region-title" > SOUTH ASIA </h5>
        </div>
        
        <div id="c1-r8">
        <h5 className="region-title"> SOUTH EAST ASIA </h5>
        </div>
        
        <div id="c1-r9">
        <h5 className="region-title" > EAST ASIA </h5>
        </div>
        

        {/* ATTRIBUTES */}
        <div id="c1-r1">
        <h5 className="attr-title"> FOUGHT IN CIVIL WAR</h5>
        </div>
        
        <svg 
          id='c2-r2'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r3'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r4'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r5'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r6'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r7'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r8'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c2-r9'
          height='100%'
          width='100%'> 
        </svg>
        
        <div id="c2-r1">
        <h5 className="attr-title"> TRANSITIONED TO ORGANIZED CRIME</h5>
        </div>

        <svg 
          id='c3-r2'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r3'
          height='100%'
          width='100%'> 
        </svg>


        <svg 
          id='c3-r4'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r5'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r6'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r7'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r8'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c3-r9'
          height='100%'
          width='100%'> 
        </svg>


        <div id="c3-r1">
        <h5 className="attr-title"> TRANSITIONED FROM ORGANIZED CRIME TO RESISTENCE</h5>
        </div>

        <svg 
          id='c4-r2'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r3'
          height='100%'
          width='100%'> 
        </svg>


        <svg 
          id='c4-r4'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r5'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r6'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r7'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r8'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c4-r9'
          height='100%'
          width='100%'> 
        </svg>

        <div id="c4-r1">
        <h5 className="attr-title"> DRUGTRADE</h5>
        </div>

        <svg 
          id='c5-r2'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r3'
          height='100%'
          width='100%'> 
        </svg>


        <svg 
          id='c5-r4'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r5'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r6'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r7'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r8'
          height='100%'
          width='100%'> 
        </svg>

        <svg 
          id='c5-r9'
          height='100%'
          width='100%'> 
        </svg>        




      </section>
    )
  } 
}
