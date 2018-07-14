import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'

interface TabProps {
  selected: boolean
  bookmark: chrome.bookmarks.BookmarkTreeNode
  onClick?: () => void
}

export default class Bookmark extends React.Component<TabProps, {}> {
  element: HTMLElement

  constructor(props: TabProps) {
    super(props)
  }

  componentDidUpdate() {
    if(this.props.selected) {
      this.element.scrollIntoView({block: 'end'})
    }
  }

  render() {
    let iconUrl = this.props.bookmark.url? "chrome://favicon/" + this.props.bookmark.url : "chrome://favicon/https://www.google.com"
    return (
      <li
        ref={(el) => this.element = el}
        onClick={this.props.onClick}
        className={classnames('Tab', {selected: this.props.selected})}>
        <div className='img-container'>
          <img src={iconUrl} />
        </div>
        <div className='info-container'>
          <div>{ this.props.bookmark.title }</div>
          <span>{ this.props.bookmark.url }</span>
        </div>
      </li>
    )
  }
}
