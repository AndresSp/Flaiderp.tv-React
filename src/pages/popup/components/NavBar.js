import React from 'react';
import { Menu, Header, Image, Icon, Dropdown, Modal, Segment, Button } from 'semantic-ui-react';

class NavBar extends React.PureComponent {
  constructor(props){
    super(props)

    this.state = {
      modalOpen: false
    }
  }
  styles = {
    header: {
      display: 'flex',
      margin: 'auto',
      content: {
        margin: 'auto'
      }
    }
  }

  onOpen = () => this.setState({ modalOpen: true })

  onClose = () => this.setState({ modalOpen: false })

  render(){
    const { status, onToggleStatus } = this.props

    return (
        <Menu id='navbar' fixed='top' inverted borderless>
          <Menu.Item>
            <Header inverted size='medium' style={this.styles.header}>
              <Image id='logo' src='./../../../assets/wing.png' size='mini' rounded/>
              <Header.Content style={this.styles.header.content}>Flaiderp.tv</Header.Content>
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item icon onClick={ () => onToggleStatus() }>
              <Icon  link name={ status ? 'bell' : 'bell slash' } size='large'/>
            </Menu.Item>
            <Menu.Item>
                <Dropdown icon='ellipsis vertical' style={{fontSize: '1.1rem'}} simple>
                  <Dropdown.Menu>
                  <Dropdown.Item text='Info' icon='info' onClick={ () => this.onOpen() }/>
                  <Modal
                  basic
                  open={ this.state.modalOpen }>
                    <Modal.Header>Flaiderp.tv { chrome.runtime.getManifest().version }</Modal.Header>
                    <Modal.Content>
                      <Segment style={{display: 'flex'}} inverted>
                        <Image style={{
                          alignSelf: 'center', 
                          border: '1px solid white',
                          marginRight: '25px'
                          }} verticalAlign='middle' size='tiny' rounded src='./../../../assets/andressp.jpg' />
                        <Button.Group inverted vertical labeled icon>
                          <Button icon='github' content='@AndresSp' fluid color='green' inverted href='https://github.com/AndresSp' target="_blank"/>
                          <Button icon='linkedin' content='Andrés Tuñón' color='violet' inverted fluid href='https://www.linkedin.com/in/andresspit/' target="_blank"/>
                          <Button icon='twitter' content='@AndresSpDev' color='blue' inverted fluid href='https://twitter.com/AndresSpDev' target="_blank"/>
                          <Button icon='twitter' content='@MrDinoDev' color='blue' inverted fluid href='https://twitter.com/MrDinoDev' target="_blank"/>
                        </Button.Group>
                      </Segment>
                      <Button inverted color='green' fluid onClick={() => this.onClose()}>Cerrar</Button>
                    </Modal.Content>
                  </Modal>
                  </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    )
  }
}




export default NavBar