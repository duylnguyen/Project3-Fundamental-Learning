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
          <Menu.Item 
            name='home' 
            as={Link} 
            to='/' 
            active={activeItem === 'home'} 
            onClick={this.handleItemClick} 
            style={{ fontSize: '18px'}}
            />
          <Menu.Item
            name='Create New Problem'
            as={Link}
            to='/problems/new'
            active={activeItem === 'Create New Problem'}
            onClick={this.handleItemClick}
            style={{ fontSize: '18px'}}
          />
        </Menu>
      </Segment>
    )
  }
}

