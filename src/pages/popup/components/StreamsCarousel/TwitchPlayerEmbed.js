import React from 'react';
import { Embed } from 'semantic-ui-react';

const TwitchPlayerEmbed = ({ channel, preview }) => (
    <Embed
    icon='play'
    placeholder={preview}
    url={`https://player.twitch.tv/?channel=${String(channel).toLowerCase()}&autoplay=true&muted=false&parent=${["chromiumapp.org"]}`}
    />
)

export default TwitchPlayerEmbed