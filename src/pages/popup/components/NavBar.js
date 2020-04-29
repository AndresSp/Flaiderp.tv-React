import React from 'react';
import { Menu, Header, Image, Icon } from 'semantic-ui-react';

const NavBar = (props) => (
    <Menu fixed='top' borderless>
      <Menu.Item>
        <Header>
          <Image size='mini'
          src='./../../../assets/icon/48.png'
           rounded />
          <Header.Content>Flaiderp.tv</Header.Content>
        </Header>
      </Menu.Item>
      <Menu.Item position='right'>
        <Icon name='ellipsis vertical' />
      </Menu.Item>
    </Menu>
)

export default NavBar