import React from 'react';
import { Card, Placeholder, Icon } from "semantic-ui-react"

const PlaceholderSlide = () => (
    <Card fluid>
        <Placeholder>
            <Placeholder.Image className='carousel-image-placeholder' />
        </Placeholder>
        <Card.Content className='carousel-content'>
            <Placeholder>
                <Placeholder.Header>
                    <Placeholder.Line length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
    </Card>
)

export default PlaceholderSlide