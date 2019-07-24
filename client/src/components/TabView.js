import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Problem from './Problem'
import Comments from './Comments'

export default class TabView extends Component {
    render() {
        return(
            <Tab panes={[
                {menuItem: 'Problem', render: () => <Problem {...this.props} />},
                {menuItem: 'Comments', render: () => <Comments {...this.props} />}
                ]}
            />
        )
    }
}


// const panes = [
//   { menuItem: 'Tab 1', pane: 'Tab 1 Content' },
//   { menuItem: 'Tab 2', pane: 'Tab 2 Content' },
//   { menuItem: 'Tab 3', pane: 'Tab 3 Content' },
// ]

// const TabExampleBasicAll = () => <Tab panes={panes} renderActiveOnly={false} />

// export default TabExampleBasicAll

