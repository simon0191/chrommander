import * as React from 'react'
import {KeyboardEvent, ChangeEvent} from 'react';
import * as classnames from 'classnames'

export interface ItemProps {
    id?: number | string
    selected: boolean
    favIconUrl: string
    title: string
    url: string
    itemType: ItemType
}
  
export interface ItemState {}

export default class Item extends React.Component<ItemProps, ItemState> {

    element: HTMLElement

    static buildFromTab(item: chrome.tabs.Tab, isSelected: boolean): JSX.Element {
        return this.build(item, ItemType.Tab, isSelected);
    }

    static buildFromBookmark(item: chrome.bookmarks.BookmarkTreeNode, isSelected: boolean) {
        return this.build(item, ItemType.Bookmark, isSelected);
    }

    private static build(item: chrome.bookmarks.BookmarkTreeNode | chrome.tabs.Tab, itemType: ItemType, isSelected: boolean): JSX.Element {
        return (
            <Item
                id={item.id}
                selected={isSelected}
                favIconUrl={this.getFavIconUrl(item, itemType)}
                title={item.title}
                url={item.url}
                itemType={itemType}
            />
        )
    }

    private static getFavIconUrl(item: chrome.tabs.Tab | chrome.bookmarks.BookmarkTreeNode, itemType: ItemType): string {
        switch (itemType) {
            case ItemType.Tab:
                return (item as chrome.tabs.Tab).favIconUrl;
            case ItemType.Bookmark:
                return "chrome://favicon/" + (item as chrome.bookmarks.BookmarkTreeNode).url;
        }
        return ""
    }

    private constructor(props: ItemProps) {
        super(props)
        this.state = props
    }

    componentDidUpdate() {
        if(this.props.selected) {
            this.element.scrollIntoView({block: 'end'})
        }
    }
    
    onClick() {
        switch (this.props.itemType) {
            case ItemType.Tab:
                chrome.tabs.update((this.props.id as number), {active: true})
            break
            case ItemType.Bookmark:
                chrome.tabs.create({url: this.props.url, active: true})
            break
        }
    }

    render() {
        return (
            <li
            ref={(el) => this.element = el}
            onClick={this.onClick.bind(this)}
            className={classnames('Tab', {selected: this.props.selected})}>
            <div className='img-container'>
                <img src={this.props.favIconUrl} />
            </div>
            <div className='info-container'>
                <div>{ this.props.title }</div>
                <span>{ this.props.url }</span>
            </div>
            </li>
        )
    }
}

enum ItemType {
    Tab,
    Bookmark,
}