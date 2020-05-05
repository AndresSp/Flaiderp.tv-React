import React, { Fragment } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import CancelledModal from './CancelledModal'

class OauthModal extends React.PureComponent {
  constructor(props) {
    super(props)

    const { hasAccessToken } = this.props

    this.state = {
      open: !hasAccessToken,
      cancelled: false
    }
  }

  close = () => {
    this.setState({ 
      open: false,
      cancelled: true 
    })
  }

  open = () => {
    this.setState({ 
      open: true,
      cancelled: false 
    })
  }

  render() {
    const { hasAccessToken, pending, onAuth } = this.props
    return (
      <Fragment>
        <CancelledModal open={ this.state.cancelled } onReturn={ this.open }></CancelledModal>
        <Modal open={ this.state.open && !hasAccessToken } basic size='small'>
          <Header icon='twitch' color='violet' inverted content='No Autorizado' />
          <Modal.Content>
            <p style={{textAlign:'justify'}}>
              Flaiderp.tv debe ser autorizado para obtener la información y estado de tus streamers favoritos.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.close()} disabled={ pending } basic color='grey' inverted>
              <Icon name='remove' /> Cancelar
            </Button>
            <Button onClick={() => onAuth() } loading={ pending } disabled={ pending } color='violet' inverted>
              <Icon name='checkmark' /> Autorizar
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    )
  }
}

export default OauthModal