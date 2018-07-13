import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { configure } from '@storybook/react';
import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs/react';
import SearchBox from '../src/popup/components/SearchBox'

function loadStories() {  
  const stories = storiesOf('SearchBox', module)
    .addDecorator(withKnobs)
    .add('default', () => (
      <SearchBox onClick={action('clicked')}/>
    ))
    .add('with text', () => (
      <SearchBox 
        onChange={(ev) => action(ev)()}
        modes={array('Modes', ['Tabs', 'History', 'All'])}
        currMode={text('Current mode', 'Tabs')}
        query={text('Query', '')}
      />
    ))
}

configure(loadStories, module);
