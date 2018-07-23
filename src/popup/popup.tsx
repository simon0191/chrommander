import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'
import Item from './components/Item/index';

interface PopupProps {
  tabs: Array<chrome.tabs.Tab>
  bookmarks: Array<chrome.bookmarks.BookmarkTreeNode>
  queryHandler: (query: string) => void
}

interface PopupState {
  query: string
  selectedTab?: number
  clickedItem?: number
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
        this.setState({...this.state, clickedItem: this.state.selectedTab})
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
            return Item.buildFromTab(tab, this.state.selectedTab === i, this.state.clickedItem == i);
          })}
          {this.state.currentBookmarks.map((bookmark, i) => {
            return Item.buildFromBookmark(bookmark, this.state.selectedTab === i, this.state.clickedItem == i);
          })}
        </ul>
      </div>
    )
  }
  
}
