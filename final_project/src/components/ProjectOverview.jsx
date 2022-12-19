import React, { Component } from 'react'
import '../styles/ProjectOverview.scss'

export default class ProjectOverview extends Component {
  render() {
    return (
      <div className="overview">
        <p>

        This project aims to explore attributes of rebel organizations between 1980 - 2011 by region. Click on any attribute you are interested in and hover over the icons. Further information about the name of organization, area of operation, and the outcome goal will appear. The region with the most organization for attributed are colored in red.
        </p>

        <p id='data-source'>
          Data Source: <a href='https://www.rebelleaders.org/'> Rebel Organization Leaders (ROLE) Database</a> <br/>
          Citation: Acosta, Benjamin, Reyko Huang, and Daniel Silverman. "Introducing ROLE: A Database of Rebel Leader Attributes in Armed Conflict." Journal of Peace Research. Online First.
        </p>

      </div>
    )
  }
}
