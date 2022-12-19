import React, { Component } from 'react'
import '../styles/ProjectOverview.scss'

export default class ProjectOverview extends Component {
  render() {
    return (
      <div className="overview">
        <p>
        Existing literature on civil wars relies predominantly on state- and organization-level 
        variables to understand conflict dynamics and outcomes. Rebel leaders’ personal
        backgrounds and experiences are also key to explaining the behavior of the organizations they lead. Just as 
        scholars have long highlighted the importance of state leaders’ biographical characteristics in interstate 
        war and diplomacy, we argue that the attributes of rebel leaders affect their organizations’ decisions and actions in civil war.
        The Rebel Organization Leaders (ROLE) Database, which contains a wide range of 
        biographical information on all top rebel leaders in civil wars ongoing between 1980 and 2011. To illustrate its utility,
        we then examine the influence of rebel leaders’ attributes on their organizations’ use of terrorism in civil war. This work 
        encourages—and enables—a new research agenda that goes beyond rebel organizations and campaigns as units of analysis 
        and brings individual leaders more fully into modern conflict and peace studies. 
        The following tree map displays the top 40 highest GDP's made from groups.
        </p>

        <p id='data-source'>
          Data Source: <a href='https://www.rebelleaders.org/'> Rebel Organization Leaders (ROLE) Database</a> <br/>
          Citation: Acosta, Benjamin, Reyko Huang, and Daniel Silverman. "Introducing ROLE: A Database of Rebel Leader Attributes in Armed Conflict." Journal of Peace Research. Online First.
        </p>

      </div>
    )
  }
}
