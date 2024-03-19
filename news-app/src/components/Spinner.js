import React, { Component } from 'react'
import giphy from './giphy.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">

        <img src={giphy} alt='loading' height={550} width={1200}/>
      </div>
    )
  }
}

export default Spinner