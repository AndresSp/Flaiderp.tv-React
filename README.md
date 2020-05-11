# Flaiderp.tv

Flaiderp.tv is a chrome extension that notifies you if [Flaiveth](https://www.twitch.tv/flaiveth) (a twitch streamer) and her friends are live. You could see a preview of what they are doing instantly.

## Requirements
- Node 8+
- This was developed on Mac ecosystem, but you can change some npm scripts to run on Windows

## Installation

Clone repository:

```
git clone https://github.com/AndresSp/Flaiderp.tv-React.git
```

Install library dependencies:

```
npm install
```

You will need to register the app in [Twitch Developers](https://dev.twitch.tv/) to get a client ID and authenticate under user permissions (OAuth, Implicit Flow). After that you can include a env.json file (follow env.example.json)

Use a browser to test the extension:

(Chrome) More Tools > Extensions > Enable Developer Mode > Load unpacked (Load project's directory)

(Firefox) about:addons > Debug Addons > Load Temporary Add-on... > Select manifest's project directory

## Development
This repository includes scripts to enable easier development and testing of the extension. To start the whole application ecosystem for development,  run the following command

```
npm start
```

## Build

You can build a production release with this command

```
npm run build
```

## Running tests
To run the tests, make sure you are in the repository directory:

```
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author
[AndresSp](https://github.com/AndresSp)

## License
[MIT](https://github.com/AndresSp/Flaiderp.tv/blob/master/LICENSE)
