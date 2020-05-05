import React from 'react';
import { Card, Placeholder } from "semantic-ui-react"

const PlaceholderSlide = () => (
    <Card>
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
    </Card>
)

export default PlaceholderSlide