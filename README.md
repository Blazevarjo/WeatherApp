# WeatherApp [![GitHub license](https://img.shields.io/github/license/Blazevarjo/Pokedex.Api)](https://github.com/Blazevarjo/Pokedex.Api/blob/master/LICENSE)


[WeatherApp](https://github.com/Blazevarjo/WeatherApp) is a simple mobile app that displays current information about weather in your current or given location. Information about weather is provided through REST Api by [OpenWeather](https://openweathermap.org/).

# Table of contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Context](#usage)
- [Status](#status)
- [License](#license)

# Technologies

- JavaScript
- React Native
- React Native Paper (Material Design)
- Styled Components


## Installation

### Prerequisites

Node is required. 
Account and api key from [OpenWeather](https://openweathermap.org/) is needed.

#### Windows

to run the app you need to have android studio and android device which can be either emulator or android device.

#### macOS

to run the app you need to have android studio and android device which can be either emulator or android device. Or for running app on iOS you need to have Xcode and iOS device which can be either emulator or iOS device.

### Setup

1. Create .env file in the root directory with the config of environment variables. [Here](.env-example) you can check the example of the configuration.
2. Install dependecies
```bash
yarn install
```
3. Run application
```bash
yarn react-native run-android
```
or
```bash
yarn react-native run-ios
```

App is now available at http://127.0.0.1:8000/.
## Usage
<div align="center">
  <img src="https://user-images.githubusercontent.com/46849151/120850175-5ef7a480-c577-11eb-9c77-9294d28fa8de.gif" width=310/>
  <img src="https://user-images.githubusercontent.com/46849151/120850183-6028d180-c577-11eb-876b-c6eea72fe504.gif" width=310/> 
  <img src="https://user-images.githubusercontent.com/46849151/120850187-6159fe80-c577-11eb-9d22-2a4cd175bda4.gif" width=310/>
</div>

## Context

Mainly purpose of this app was to get familiar with react native and material design principles.


## Status

Currently, the app is considered as finished and there are no plans to do any updates on it.

## License

[MIT](LICENSE)
