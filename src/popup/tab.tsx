import * as React from 'react';
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'

interface TabProps {
  selected: boolean
  tab: chrome.tabs.Tab
}

export default class Tab extends React.Component<TabProps, {}> {
  element: HTMLLIElement

  constructor(props: TabProps) {
    super(props)
  }

  componentDidUpdate() {
    if(this.props.selected) {
      this.element.scrollIntoView()
    }
  }

  render() {
    return (
      <li ref={(el) => this.element = el } className={classnames('Tab', {selected: this.props.selected})}>
        <div>
          <img src={this.props.tab.favIconUrl} alt={this.props.tab.title} />
        </div>
        <div>{ this.props.tab.title }</div>
        <span>{ this.props.tab.url }</span>
      </li>
    )
  }
}
