import React, { Component } from 'react';
import '../styles/Title.scss'
import ProjectOverview from './ProjectOverview'

export default class Title extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-effect">
          <div>
            <span>R</span>
            <span>E</span>
            <span>B</span>
            <span>E</span>
            <span>L</span>
          </div>

          <div>
            <span>L</span>
            <span>E</span>
            <span>A</span>
            <span>D</span>
            <span>E</span>
            <span>R</span>
          </div>

          <div>
            <span>A</span>
            <span>T</span>
            <span>T</span>
            <span>R</span>
            <span>I</span>
            <span>B</span>
            <span>U</span>
            <span>T</span>
            <span>E</span>
            <span>S</span>
          </div>

          <div>
            <span>I</span>
            <span>N</span>
          </div>

          <div>
            <span>A</span>
            <span>R</span>
            <span>M</span>
            <span>E</span>
            <span>D</span>
          </div>

          <div>
            <span>C</span>
            <span>O</span>
            <span>N</span>
            <span>F</span>
            <span>L</span>
            <span>I</span>
            <span>C</span>
            <span>T</span>
          </div>


          <div> 
            <span>1</span>
            <span>9</span>
            <span>8</span>
            <span>4</span>
            <span>-</span>
            <span>2</span>
            <span>0</span>
            <span>1</span>
            <span>1</span>
          </div> 

        </div>
        <ProjectOverview/>
      </div>
    )
  }
}
