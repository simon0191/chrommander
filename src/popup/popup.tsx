import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'
import Tab from './tab'

interface PopupProps {
  tabs: Array<chrome.tabs.Tab>
  autoFocus?: boolean
}

interface PopupState {
  query: string
  selectedTab?: number
}

export default class Popup extends React.Component<PopupProps, PopupState> {

  constructor(props: PopupProps) {
    super(props)
    this.state = {
      query: '',
      selectedTab: 0
    }

    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  currentTabs(): Array<chrome.tabs.Tab> {
    if(this.state.query.trim() == '') {
      return this.props.tabs
    }
    const tokens = this.state.query.trim().split(' ').map((t) => new RegExp(t, 'i'))
    return this.props.tabs.filter((tab) => {
      return tokens.every((t) => !!tab.title.match(t) || !!tab.url.match(t))
    })
  }

  handleSearchKeyDown(e: KeyboardEvent<{}>) {
    switch(e.key) {
      case 'Enter':
        e.preventDefault()
        if(this.currentTabs().length > 0) {
          chrome.tabs.update(this.currentTabs()[this.state.selectedTab].id, {active: true})
        }
      break;
      case 'ArrowDown':
        if(this.state.selectedTab + 1 < this.currentTabs().length ) {
          this.setState({...this.state, selectedTab: this.state.selectedTab + 1})
        }
      break;
      case 'ArrowUp':
        if(this.state.selectedTab - 1 >= 0) {
          this.setState({...this.state, selectedTab: this.state.selectedTab - 1})
        }
      break;
    }
  }

  handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      query: e.target.value,
      selectedTab: 0
    })
  }

  render() {
    return (
      <div className='Popup'>
        <form>
          <input
            tabIndex={1}
            autoFocus={this.props.autoFocus}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleSearchKeyDown}
            type='text' placeholder='search...'/>
        </form>
        <ul>
          {this.currentTabs().map((tab, i) => <Tab selected={i === this.state.selectedTab} key={tab.id} tab={tab}/>)}
        </ul>
      </div>
    )
  }
}
