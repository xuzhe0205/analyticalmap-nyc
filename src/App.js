import React, { Component } from 'react'
import './index.less'
import CustomHeader from './components/CustomHeader'
import Router from './router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomHeader />
        <Router />
      </div>
    )
  }
}

export default App
