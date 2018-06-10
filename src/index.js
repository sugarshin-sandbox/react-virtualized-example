import 'react-virtualized/styles.css';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const main = () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
}

main()
