import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { 
    activeItem: 'challenges' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <div className="wrapper">
          <div className="nav">
            <Menu inverted pointing secondary>   
              <Image as={Link} to="/" src='https://scope.bccampus.ca/pluginfile.php/59270/mod_label/intro/FLO-FundamentalsH200.png' width="140" />
              <Menu.Item 
                name='challenges' 
                as={Link} 
                to='/' 
                active={activeItem === 'challenges'} 
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
          </div>

          <div className="dropDown">
          <Dropdown text='Method Libraries' icon='book' floating labeled button className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header icon='tags' content='Filter by method' />
              <Dropdown.Item>
                <a 
                  href="https://www.geeksforgeeks.org/javascript-match/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  match() Method
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a 
                  href="https://www.geeksforgeeks.org/map-in-javascript/" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  map() Method
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a 
                  href="https://www.geeksforgeeks.org/javascript-array-foreach/" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  forEach() Method
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      </Segment>
    )
  }
}

