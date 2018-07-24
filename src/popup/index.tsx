import * as React from 'react'
import { render } from 'react-dom'
import Popup from './popup'

interface AppState {
  tabs: Array<chrome.tabs.Tab>
  currentTabs: Array<chrome.tabs.Tab>
  bookmarks: Array<chrome.bookmarks.BookmarkTreeNode>
}

class MainContainer extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      tabs: [],
      currentTabs: [],
      bookmarks: [],
    }

    this.handleQuery = this.handleQuery.bind(this)
    this.handleTabsQuery = this.handleTabsQuery.bind(this)
    this.handleBookmarksQuery = this.handleBookmarksQuery.bind(this)
    this.filterTabs = this.filterTabs.bind(this)
  }

  componentDidMount() {
    chrome.tabs.query({currentWindow: true}, (tabs) => {
      this.setState({...this.state, tabs, currentTabs: tabs})
    })
  }

  render() {
    return (
      <div className='Chrommander'>
        <Popup tabs={this.state.currentTabs} bookmarks={this.state.bookmarks} queryHandler={this.handleQuery}/>
      </div>
    )
  }

  handleQuery(query: string) {
    var command = Command.Tabs
    if (query.substr(0, 2) === "b ") {
      command = Command.Bookmarks
    }

    switch(command) {
      case Command.Tabs:
      this.handleTabsQuery(query)
      break;
      case Command.Bookmarks:
      this.handleBookmarksQuery(query.substring(2))
      break;
    }
  }

  private handleTabsQuery(query: string) {
    this.setState({...this.state, currentTabs: this.filterTabs(this.state.tabs, query), bookmarks: []})
  }

  private filterTabs(tabs: Array<chrome.tabs.Tab>, query: string): Array<chrome.tabs.Tab> {
    query = query.trim()
    if(query == '') {
      return tabs
    }
    const tokens = query.split(' ').map((t) => new RegExp(t, 'i'))
    return tabs.filter((tab) => {
      return tokens.every((t) => !!tab.title.match(t) || !!tab.url.match(t))
    })
  }

  private handleBookmarksQuery(query: string) {
    chrome.bookmarks.search(query, (bookmarks) => {
      bookmarks = bookmarks.filter((b) => b.url != null)
      this.setState({...this.state, bookmarks, currentTabs: []})
    })
  }
}

console.log('Hello Chrommander - popup')
setTimeout(() => {
  render(
    <MainContainer/>,
    document.getElementById('root')
  )
}, 100)

enum Command {
  Tabs,
  Bookmarks,
}