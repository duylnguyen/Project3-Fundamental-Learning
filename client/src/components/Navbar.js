import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item
            name='Create New Problem'
            as={Link}
            to='/NewProblemForm'
            active={activeItem === 'Create New Problem'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

{/* <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/NewProblemForm">Create New Problem</Link></li>
            </ul>
        </nav>
    </div> */}