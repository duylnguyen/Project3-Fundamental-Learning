import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Problem from './Problem'
import Comments from './Comments'

export default class TabView extends Component {
    render() {
        return(
            <Tab className='tabView' panes={[
                {menuItem: 'Problem', render: () => <Problem {...this.props} />},
                {menuItem: 'Comments', render: () => <Comments {...this.props} />}
                ]}
            />
        )
    }
}


