import React from 'react';
import { Menu, Header, Image, Icon } from 'semantic-ui-react';

const styles = {
  header: {
    display: 'flex',
    margin: 'auto',
    content: {
      margin: 'auto'
    }
  }
}

const NavBar = (props) => (
    <Menu id='navbar' fixed='top' inverted borderless>
      <Menu.Item>
        <Header inverted size='medium' style={styles.header}>
          <Image id='logo' src='./../../../assets/wing.png' size='mini' rounded/>
          <Header.Content style={styles.header.content}>Flaiderp.tv</Header.Content>
        </Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item icon>
          <Icon link name='bell' size='large'/>
        </Menu.Item>
        <Menu.Item icon>
          <Icon link name='ellipsis vertical' size='large'/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
)

export default NavBar