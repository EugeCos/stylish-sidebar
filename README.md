<p align="center">
  <img width="150" src="https://eugeville.files.wordpress.com/2015/03/logo.png" alt="Stylish Sidebar logo">
</p>

<h1 align="center">Stylish React Sidebar</h1>

<div align="center">

[Stylish Sidebar][2] - start your React project with an elegant super-easy-to-implement sidebar.

[![npm latest package](https://img.shields.io/npm/v/stylish-sidebar)](https://www.npmjs.com/package/stylish-sidebar)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/EugeCos/stylish-sidebar-npm/blob/master/license)
</div>

Stylish Sidebar is an open source, production-ready React sidebar component that can be quickly implemented into any desktop dashboard.

## Demo

Looking for an example to play around with?
[Check this out][2].

## Get started

### Installation

```sh
npm install stylish-sidebar
yarn add stylish-sidebar
```

### Usage

Here is a quick example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import StylishSidebar from 'stylish-sidebar';

function App() {
  return (
    <AppContainer>  // make sure this parent includes 'display: flex' property
      <StylishSidebar />
      <MainView />
    </AppContainer>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Yes, it is that simple.

## Documentation

Check out our [documentation][5] for guides and a full API reference.

## Community

Get help or stay up to date.</br>
If you have questions [feel free to reach out][4].

Created by [@EugeCos][1] sometime in 2020

## License

This project is licensed under the terms of the [MIT license][3].

[1]: https://github.com/EugeCos
[2]: https://sidebar.studio/
[3]: https://github.com/EugeCos/stylish-sidebar/blob/master/license
[4]: https://eugeville.com/you-used-to-call-me-on-my-cell-phone
[5]: https://github.com/EugeCos/stylish-sidebar/