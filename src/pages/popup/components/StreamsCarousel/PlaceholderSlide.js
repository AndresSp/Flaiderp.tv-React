import React from 'react';
import { Card, Placeholder, Icon } from "semantic-ui-react"

const PlaceholderSlide = () => (
    <Card fluid>
        <Placeholder inverted>
            <Placeholder.Image className='carousel-image-placeholder' />
        </Placeholder>
        <Card.Content className='carousel-content'>
            <Placeholder inverted className='placeholder-line'>
                <Placeholder.Header className='placeholder-line'>
                    <Placeholder.Line className='placeholder-line' length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph >
                    <Placeholder.Line className='placeholder-line' />
                    <Placeholder.Line className='placeholder-line' />
                    <Placeholder.Line className='placeholder-line' />
                </Placeholder.Paragraph>
            </Placeholder>
        </Card.Content>
        <Card.Content className='carousel-extra' extra>
        </Card.Content>
    </Card>
)

export default PlaceholderSlide