import * as React from 'react'
import { render } from 'react-dom'
import Popup from './popup'

interface AppState {
  tabs: Array<chrome.tabs.Tab>
}

class MainContainer extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      tabs: []
    }
  }

  componentDidMount() {
    chrome.tabs.query({currentWindow: true}, (tabs) => {
      this.setState({...this.state, tabs})
    })
  }

  render() {
    return (
      <div className='Chrommander'>
        <Popup tabs={this.state.tabs}/>
      </div>
    )
  }
}

console.log('Hello Chrommander - popup')
render(
  <MainContainer/>,
  document.getElementById('root')
)
