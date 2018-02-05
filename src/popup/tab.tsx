import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'

interface TabProps {
  selected: boolean
  tab: chrome.tabs.Tab
  onClick?: () => void
}

export default class Tab extends React.Component<TabProps, {}> {
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
    return (
      <li
        ref={(el) => this.element = el}
        onClick={this.props.onClick}
        className={classnames('Tab', {selected: this.props.selected})}>
        <div className='img-container'>
          <img src={this.props.tab.favIconUrl} />
        </div>
        <div className='info-container'>
          <div>{ this.props.tab.title }</div>
          <span>{ this.props.tab.url }</span>
        </div>
      </li>
    )
  }
}
