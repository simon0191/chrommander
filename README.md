# Chrommander

Chrome extension to make your life easier. Use Chrommander's search box to quickly jump to any open tab or bookmark.

Install from the Chrome Web Store: https://chrome.google.com/webstore/detail/chrommander/ebbmganccobhlpcbkmodhiclngkbkcci

![Demo](/releases/assets/demo.gif "demo")

## Features

- Press `Ctrl+P` in MacOS or `Ctrl+Shift+P` in the rest of operating systems, and you'll see a list with all the currently opened tabs.
- Move within the list of results using the up and down arrow keys or the mouse
- Type in the search box to filter the results
- Search for bookmarks by typing "b\<space>" at the beginning and then the name of the bookmark that you want to open
- Select the tab or bookmark that you want to open and press enter or click on it

- Navigate to opened tabs
- Search and open bookmarks by typing `b<space><your query>`. i.e. `b facebook`

Comming soon:

- Search and open pages in your history

## Develop

  1. install node 9
  1. npm install
  1. npm run build
  1. install the extension in chrome pointing to the root of this repository
  1. enjoy

## Prepare for distribution

  For development the root of the project is used as the root of the extension, but for distribution, the contents  of `dist` forlder are the only ones that should be uploaded to the Chrome Web Store, therefore take into account the following steps:

  1. Upgrade the version in `manifest.json`
  1. Run `npm run release` to create the zip inside the `releases/` folder
