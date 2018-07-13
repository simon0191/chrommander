//WIP: extract SearchBox as a component
import * as React from 'react'
import {KeyboardEvent, ChangeEvent} from 'react';

export interface SearchBoxChangeEvent {
  mode: string
  query: string
}

export interface SearchBoxProps {
  placeholder: string
  currMode: string
  modes: Array<string>
  query: string
  onChange: (ev: SearchBoxChangeEvent) => void
}

export interface SearchBoxState extends SearchBoxChangeEvent {}

class Helper {
  static uniqueModes(props: SearchBoxProps): Array<string> {
    let memo: {[s: string]: number} = {}
    memo = props.modes.concat(props.currMode).reduce((memo, mode) => { 
      memo[mode] = 0
      return memo
    }, memo)

    return Object.keys(memo).filter((x) => x != null && x != undefined)
  }
}

export default class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {

  constructor(props: SearchBoxProps) {
    super(props)
    this.state = {
      mode: this.props.currMode || '',
      query: this.props.query || ''
    }
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  componentWillReceiveProps(nextProps: SearchBoxProps) {
    this.setState({
      ...this.state,
      mode: nextProps.currMode || '',
      query: nextProps.query || ''
    })
  }

  handleModeChange(ev: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      ...this.state,
      mode: ev.target.value
    })
    if(this.props.onChange) {
      this.props.onChange(this.state)
    }
  }
  
  handleQueryChange(ev: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      query: ev.target.value
    })
    if(this.props.onChange) {
      this.props.onChange(this.state)
    }
  }

  render() {

    return (
      <div className='SearchBox'>
        <form>
            {this.props.currMode &&
              <select
                onChange={this.handleModeChange}
                value={this.state.mode}
                className='Mode'
                >
                {Helper.uniqueModes(this.props).map((mode) => <option key={mode} >{mode}</option>)}
              </select>
            }
            <input
              onChange={this.handleQueryChange}
              value={this.state.query}
              className='Query'
              type='text'
              />
          </form>
      </div>
    )
  }
}
