import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'
import Tab from './tab'
import Bookmark from './bookmark'

interface PopupProps {
  tabs: Array<chrome.tabs.Tab>
  bookmarks: Array<chrome.bookmarks.BookmarkTreeNode>
  queryHandler: (query: string) => void
}

interface PopupState {
  query: string
  selectedTab?: number
  currentTabs: Array<chrome.tabs.Tab>
  currentBookmarks: Array<chrome.bookmarks.BookmarkTreeNode>
}

export default class Popup extends React.Component<PopupProps, PopupState> {

  constructor(props: PopupProps) {
    super(props)
    this.state = {
      query: '',
      selectedTab: 0,
      currentTabs: props.tabs,
      currentBookmarks: props.bookmarks,
    }

    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentWillReceiveProps(nextProps: PopupProps) {
    this.setState({
      ...this.state,
      selectedTab: 0,
      currentTabs: nextProps.tabs,
      currentBookmarks: nextProps.bookmarks,
    })
  }

  handleSearchKeyDown(e: KeyboardEvent<{}>) {
    switch(e.key) {
      case 'Enter':
        e.preventDefault()
        this.openTab(this.state.selectedTab)
      break;
      case 'ArrowDown':
        if(this.state.selectedTab + 1 < this.state.currentTabs.length ) {
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
    this.props.queryHandler(e.target.value)
  }

  handleTabClick(index: number) {
    this.openTab(index)
  }

  render() {
    return (
      <div className='Popup'>
        <div className='form-wrapper'>
          <form>
            <input
              tabIndex={1}
              autoFocus={true}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleSearchKeyDown}
              type='text' placeholder='search...'/>
          </form>
        </div>
        <ul className='tab-list'>
          {this.state.currentTabs.map((tab, i) => {
            return <Tab 
                      onClick={this.handleTabClick.bind(this, i)} 
                      selected={i === this.state.selectedTab} 
                      key={tab.id} 
                      tab={tab}/>
            })}
            {this.state.currentBookmarks.map((bookmark, i) => {
            return <Bookmark
                      onClick={this.handleTabClick.bind(this, i)} 
                      selected={i === this.state.selectedTab} 
                      key={bookmark.id} 
                      bookmark={bookmark}/>
            })}
        </ul>
      </div>
    )
  }

  private openTab(index: number) {
    if(this.state.currentTabs.length > 0) {
      const selectedTab = this.state.currentTabs[index]
      if(selectedTab.active) {
        window.close();
      } else {
        chrome.tabs.update(selectedTab.id, {active: true})
      }
    }
  }

  private currentTabs(tabs: Array<chrome.tabs.Tab>, query: string): Array<chrome.tabs.Tab> {
    query = query.trim()
    if(query == '') {
      return tabs
    }
    const tokens = query.split(' ').map((t) => new RegExp(t, 'i'))
    return tabs.filter((tab) => {
      return tokens.every((t) => !!tab.title.match(t) || !!tab.url.match(t))
    })
  }
}
