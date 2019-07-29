import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Problem from './Problem'
import Comments from './Comments'
import CodeEmbeded from './CodeEmbeded'

export default class TabView extends Component {
    render() {
        return(
            <Tab className='tabView' panes={[
                {menuItem: 'Problem', render: () => <Tab.Pane><Problem {...this.props} /></Tab.Pane>},
                {menuItem: 'Code', render: () => <Tab.Pane><CodeEmbeded {...this.props} /></Tab.Pane>},
                {menuItem: 'Comments', render: () => <Tab.Pane><Comments {...this.props} /></Tab.Pane>},
                ]}
            />
        )
    }
}


