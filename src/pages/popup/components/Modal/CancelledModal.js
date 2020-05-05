import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { uninstall } from '../../../../modules/apis/extension';

class CancelledModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { uninstall: false }
  }
  
  async onUninstall(){
    this.setState({ uninstall: true })
    try {
      await uninstall()
    } catch (error) {
      this.setState({ uninstall: false })
    }
    // console.log(this.refs)
  }

  render() {
    return (
        <Modal open={ this.props.open } basic size='small'>
          <Header icon='twitch' color='violet' inverted content='No Autorizado' />
          <Modal.Content>
            <p>
              Flaiderp.tv no podrá ejecutarse; ya que fue inautorizado para utilizar los servicios de Twitch.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button 
            onClick={ () => this.props.onReturn() }
            disabled={ this.state.uninstall } 
            color='violet' fluid inverted>
              Regresar <Icon name='arrow right' /> 
            </Button>
            <Button 
            onClick={ () => this.onUninstall() } 
            loading={ this.state.uninstall } 
            disabled={ this.state.uninstall } 
            fluid basic color='red' inverted>
            <Icon name='trash alternate outline' /> Desinstalar
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
  
}

export default CancelledModal