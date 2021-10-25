# Air Pollution App

<br />
<div align="center">
  <a href="https://nicolasricardi.com">
    <img src="https://nicolasricardi.com/assets/images/logo.png" alt="Logo Nicolas Ricardi" width="80" height="80">
  </a>

  <h3 align="center">Nicolas Ricardi - Javascript Advanced Project</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project
Air-pollution is the project of Start2Impact's Javascript Advanced guide.

This application allows you to search for a city and view data relating to the air pollution present in that area.

[![Air Pollution App Screenshot](https://www.nicolasricardi.com/assets/images/air-pollution.png)](https://eager-neumann-565bb7.netlify.app/)

### Built With
This project is built with javascript and deployed on Netlify.


## Getting Started

### Installation

1. First of all you need to download the package or clone the repository:

HTTPS
```sh
  https://github.com/NickEagle2400/air-pollution.git
```
SSH
```sh
  git@github.com:NickEagle2400/air-pollution.git
```
GitHub CLI
```sh
  gh repo clone NickEagle2400/air-pollution
```
<br>

2. Install npm package
```sh
  npm install
```
<br>

3. Install Dependencies (See the links below)
4. Create `dist` directory in the main folder
4. Enter your API in `.env.example` and rename it `.env`

   ```js
   API_KEY = YourAPIKey;
   ```


## Dependencies
[webpack](https://webpack.js.org/): "^5.59.1",<br>
[webpack-cli](https://webpack.js.org/api/cli/): "^4.9.1",<br>
[css-loader](https://webpack.js.org/loaders/css-loader/): "^3.6.0",<br>
[dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack): "^7.0.3",<br>
[inject-body-webpack-plugin](https://www.npmjs.com/package/inject-body-webpack-plugin): "^1.3.0",<br>
[style-loader](https://webpack.js.org/loaders/style-loader/): "^1.3.0",<br>
[@googlemaps/js-api-loader](https://www.npmjs.com/package/@googlemaps/js-api-loader): "^1.12.7",<br>
[axios](https://axios-http.com/docs/intro): "^0.23.0",<br>
[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/): "^5.4.0"<br>
[Netflify-cli](https://docs.netlify.com/cli/get-started/): "^6.14.4"<br>


## Usage
This application has two basic use cases:
1. Search cities in the input field.
2. Click on "Use My Position" for the nearest station.

Try app [Here](https://eager-neumann-565bb7.netlify.app/)

## License
Distributed under the MIT License. See LICENSE.txt for more information.

## Contact

Author: [Nicolas Ricardi](www.nicolasricardi.com) <br />
Email: [info@nicolasricardi.com](mailto:info@nicolasricardi.com)<br />
[LinkedIn](https://www.linkedin.com/in/nicolasricardi/) - [Twitter](https://twitter.com/nick_ricardi00) - [GitHub](https://github.com/NickEagle2400)

