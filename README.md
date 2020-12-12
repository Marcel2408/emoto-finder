# eMoto

![eMoto-logo](https://github.com/Marcel2408/emoto-finder/blob/main/client/src/assets/readme/eMotoLogo.png)

Nowadays our cities are full of companies offering electric moto sharing services. Users have to spend time switching apps to find motos around and don't have the possibility to compare and know what's the fastest option.

eMoto is the solution for that. Users can see all the available motos in just one map, and quickly know which moto is gonna take them faster to the destination.

But that's not all, with eMoto users can also see the future!

Even in the case of not having any motos around, they can see the incoming ones in the area!

![eMoto show](https://github.com/Marcel2408/emoto-finder/blob/main/client/src/assets/readme/eMoto-show.png)

![eMoto-gif](https://github.com/Marcel2408/emoto-finder/blob/main/client/src/assets/readme/eMotoLogo.png)

![eMoto-gif](https://github.com/Marcel2408/emoto-finder/blob/main/client/src/assets/readme/eMotoLogo.png)

## Description

Client side for the eMoto app. Find the server side on this repo: [emoto-server](https://github.com/EwaRas/emoto-server)

Our client is built using [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/), and [Redux](https://redux.js.org/) as a state management tool.

For the styling of the app we opted for [Styled-Components](https://styled-components.com/) and [Material UI](https://material-ui.com/).

Since our client works with the [Mapbox](https://www.mapbox.com/) API, you will need a token to be able to  to render the map component.

## Installation

Clone the repo:

```bash
$ git clone https://github.com/Marcel2408/emoto-finder.git
$ cd emoto-finder
```

Install dependencies:

```bash
$ cd client
$ npm install
```
Create a ```.env``` in the root level of this repo.

Fill the file with the following info:
```
REACT_APP_MAPBOX_TOKEN=<replace this with your Mapbox token>
REACT_APP_MAPBOX_STYLE=mapbox://styles/mapbox/streets-v11
REACT_APP_BASE_URL=http://localhost:4000
```

## Running the app

```bash
$ cd client
```

```bash
$ npm start
```

The client will run on localhost:3000

## Developers

- Ewa Rasala - [Github](https://github.com/ewaras) - [LinkedIn](https://www.linkedin.com/in/ewa-rasala)
- Carlos De Sousa - [Github](https://github.com/carlosdsv) - [LinkedIn](https://www.linkedin.com/in/carlosdsv/)
- Rafał Witczak [Github](https://github.com/rafwit/) - [LinkedIn](https://www.linkedin.com/in/rafalwitczak/)
- Marcel Subirana - [Github](https://github.com/marcel2408) - [LinkedIn](https://www.linkedin.com/in/marcel-subirana-campanera/)