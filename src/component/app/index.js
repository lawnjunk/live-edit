import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import speachToText from '../../lib/speach-to-text.js'
import AceEditor from 'react-ace'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      statements: [],
      text: '',
      fragment: '',
    }
  }

  handleChange = (value) => {
    this.setState({text: value})
  }

  componentDidMount(){
    speachToText({
      onNext: (data) => {
        console.log('final', data)
        this.setState(state => ({
          statements: [...state.statements, data.transcript],
          text: state.text + data.transcript,
          fragment: '',
        }))
      },
      onFragment: (data) => {
        console.log('fragment', data)
        this.setState({fragment: data.transcript})
      },
      onError: console.error,
    })
    .start()
  }

  render(){
    return (
      <div className='app'>

      <AceEditor
        width='100%'
        onChange={this.handleChange}
        setOptions={{
          wrap: true,
          maxLines: Infinity,  
          useWrapMode: true,   
          indentedSoftWrap: false, 
          behavioursEnabled: false,
          showGutter: false,
          showLineNumbers: false,
        }}
        value={this.state.text} 
      />
      <span 
        style={{
          background: '#afeaf7',
        }}> 
        {this.state.fragment} 
      </span>
      </div>
    )
  }
}

export default App
