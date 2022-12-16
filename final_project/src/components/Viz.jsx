import React, { Component } from 'react';
import '../styles/Viz.scss'
import data from '../data/original_df.csv';
import * as d3 from 'd3';

export default class Viz extends Component {
  render() {

    //  SVG PATH
    const rebel_icon = ['M 0 0 A 1 1 0 0 0 5 0 A 1 1 0 0 0 0 0 Z M -15 0 A 1 1 0 0 0 2 0 A 1 1 0 0 0 -10 0 Z']

    // RENDER DATA
    d3.csv(data).then(showData)

    const perRow = 10;
    const size = 20;
    const sizeY= 20;



    // FUNCTION TO DISPLAY DATA TO THE DOM
    function showData(data) {

    // SELECTING ATTRIBUTES AND REBEL ORG INFORMATION
    data.forEach(d => {
        // console.log("wgattss this",d)
        d.english_translation = d.english_translation;
        d.area_of_operation = d.area_of_operation;
        d.foughtincivilwar = d.foughtincivilwar;

    })

    // MAKING SURE THE DATA WAS RENDERED
    // console.log('the data',data)
    
    // SETTING UP SVG FOR D3
    const svg = d3.select('svg')


    // COUNT NUMBER FOR REBEL GROUPS THAT MEET EACH ATTRIBUTE
    let count = 0;
    

    // __________________________________________________________
    // - - - - - - - - - - - - 
    // REGION: LATIN AMERICA 
    // - - - - - - - - - - - - 

    // 1. Mapping through data to only render latin america regions
    let latinAmericaData = data.map((key,value) => {
      if(key['latinamerica'] == 1){
        count++;
        // console.log("Latin America:",count)
        return key;
      }
    })

    // 2. Testing filter method on the data to remove regions that are not from latin america
    // console.log("data with undefined objects:",latinAmericaData.filter(Boolean))


    // 3. Default attribute is those fought in civil war by region
    let foughtinCivilWar = (region) => {
          // - - - - - - - - - - - - - - - - - - - - - - - - - -
          //  Cross reference with jupyter notebook analysis 
          //  Latin America = 24 cases 
          // - - - - - - - - - - - - - - - - - - - - - - - - - -
      let dataForRegion = []
      let updatedData = region.filter(Boolean)

      updatedData.map((key, value) => {
        if(key['foughtincivilwar'] == 1 ){
          // console.log("fought in civil war: ", key)
          dataForRegion.push(key)
        }
      })

      // console.log(dataForRegion)

      return dataForRegion
    }

    // 4. SVG select for Latin America


    const latinAmericaSvg = svg.selectAll('g')
      .data(foughtinCivilWar(latinAmericaData)) // the filter boolean removes all undefined objects within the array 
      .enter()
      .append('g')
      .attr("transform", (d,i) => {
        const x = (i % perRow + 2) * size;
        const y = (Math.floor(i/perRow) +.60) * sizeY;
        return "translate(" + [x,y] + ")";
    });



    // latinAmericaSvg.append('text')
    // .text("test")

    const LA = latinAmericaSvg.append('path')
    .attr("d", rebel_icon)
    .attr("width", 600)
    .attr("height", 600)
    // .attr("fill", "#CBC7CF");



    // __________________________________________________________
    }

    return (
      <section className="grid-viz" >
        <h4 id="c1-r2"> LATIN AMERICA</h4>
        <h4 id="c1-r1" > FOUGHT IN CIVIL WAR</h4>
        <svg 
          id='c2-r2'
          height='100%'
          width='100%'> 
        </svg>
        <h4 id="c2-r1"> DRUG TRADE</h4>
        <svg 
          id='c1-r2'
          height='100%'
          width='100%'> 
        </svg>


      </section>
    )
  } 
}
