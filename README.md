<p align="center">
  <img width="150" src="https://eugeville.files.wordpress.com/2015/03/logo.png" alt="Stylish Sidebar logo">
</p>

<h1 align="center">Stylish React Sidebar</h1>

<div align="center">

[Stylish Sidebar][2] - start your React project with an elegant super-easy-to-implement sidebar.</br>Open source and production-ready.

[![npm latest package](https://img.shields.io/npm/v/stylish-sidebar)](https://www.npmjs.com/package/stylish-sidebar)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/EugeCos/stylish-sidebar-npm/blob/master/license)
</div>

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

### Props:

|            Name | Type | Default | Description |
| ----------------: | :------: | :---------------------------------------------: | :-----------------------------------: |
|   backgroundImage | `string` |                   `'demo image'` |                      Background image url. |
|            header | `object` | `{ fullName: 'Your Sidebar', shortName: 'SS' }` | Header: full name and two letter short name. |
|   menuItems | `array` | Example prop* of two menu items, first one without submenus, second one - with submenus:</br></br>`[{ name: 'Item1', to: '/icon1', icon: 'demo SVG icon', subMenuItems: [] },`</br>`{ name: 'Item2', to: '/icon2', icon: 'demo SVG icon', subMenuItems: [`</br>`{ name: 'Sub1', to: '/sub1' },`</br>`{ name: 'Sub2', to: '/sub2' },`</br>`{ name: 'Sub3', to: '/sub3'}]`</br>`}]`</br>| Each menu item includes a name, icon url, url link and an array of sub-menu items. If submenus array is not empty, a down caret arrow will be displayed next to item name.</br></br>Page navigation can be done by using indexes of `menuItems` / `subMenus`. These indexes are provided by click event callbacks.</br>A potential navigation option is adding an optional [ `to` ] key to each menu item and using it with via clicking event and `useHistory` or `redirect` or another preffered navigation method (see [Demo][2] for a good example with `useHistory`, click on source code button `< >`).</br></br><i>* Once </i>`menuItems` <i>prop is provided, demo will be ovewritten. Empty </i>`menuItems`<i> array prop will result in an empty sidebar.</i></br></br><i>† Navigation will not work in the demo because you will have to setup your own preferred navigation.</i>  |
|   fonts  | `object` | `{ header: 'Poppins', menu: 'Poppins' }` | Header and menu fonts. |
|   colorPalette   | `object` | `{ bgColor1: '#434343CC',`</br>`bgColor2: '#000000CC',`</br>`fontColor: '#a1a1a1',`</br>`fontColorSelected: '#010101',`</br>`dividerColor: '#303030',`</br>`selectedBackgroundCollapsedMode: 'light' }` | Default background colors include opacity. For best experience, set the opacity of your background colors to 80%, by appending `'CC'` to hex code (`'CC'` is 80% opacity) or by adding `0.8` if you are using rgb.</br></br>Background for collapsed mode is either `'light'` or `'dark'`. |
|   presetPalette   | `string` |  | Stylish sidebar comes with a list of 'preset' color palettes. They can be added by providing one of below strings:</br>`'dejaVu'`</br>`'swampyGreen'`</br>`'pinkAndBlue'`</br>`'julyBlue'`</br>`'gothicDark'`</br>`'ashes'`</br>`'beaverBrown'`</br>`'oceanBlue'`</br>`'saltNPepper'`</br></br>To see these palettes in action, check the [demo][2].</br></br>If a string from above list is provided, `colorPalette` prop will be ignored. |
|   widthExpanded  | `string` |                   `'20%'` | Width applied to expanded state of the sidebar |
|   widthCollapsed   | `string` |                   `'5%'` | Width applied to collapsed state of the sidebar |
|   minWidth    | `string` |                   `'80px'` | Minimum sidebar width. |
|   maxWidth    | `string` |                   `'280px'` | Maximum sidebar width. |
|   isOpen      | `bool` |                  `true`  | If `true`, `StylishSidebar` is expanded. This prop is optional, it is only needed if you wish to lock the sidebar in expanded/collapsed state. If `isOpen` is not provided, open/close functionality is done inside the component.  |
|   showToggler      | `bool` |                `true`    | Show/hide sidebar state toggler (hamburger icon). |
|   onTogglerClick       | `func` |                    | Callback fired when toggler is clicked. |
|   onHeaderClick       | `func` |                    | Callback fired when sidebar header is clicked. |
|   onMenuItemClick       | `func` |                    | Callback fired when a menu item is clicked.</br>Typically `onMenuItemClick` is used to change url and/or to prompt user to save changes on the page prior to exiting. `index` parameter can be used for desired manipulations - index refers to position of the menu item in `menuItems` array.</br></br><b>Signature:</b></br>`function(event: object, index: number) => void`</br><i>event:</i> event source of the callback</br><i>index:</i> menu item index</br>See [Demo][2] for an example.    |
|   onSubMenuItemClick        | `func` |                    | Callback fired when a sub menu item is clicked.</br>Functionality is similar to that of `onMenuItemClick` except this callback returns indexes of both <b>menu item</b> and clicked <b>sub menu item</b>.</br></br><b>Signature:</b></br>`function(event: object, menuItemIndex: number, subMenuItemIndex: number) => void`</br><i>event:</i> event source of the callback</br><i>menuItemIndex:</i> menu item index </br><i>subMenuItemIndex:</i> sub menu item index</br>See [Demo][2] for an example.   |
|   className     | `object` |                    | Override or extend the styles applied to the component. |
|   ref     | `object` |                    | A ref that points to the first DOM node of the Sidebar. |

## License

This project is licensed under the terms of the [MIT license][3].

## Credit

Created by [@EugeCos][1] sometime in 2021

## Community

Get help or stay up to date.</br>
If you have questions or are interested in a customized Stylish Sidebar for your project, [feel free to reach out][4].

[1]: https://github.com/EugeCos
[2]: https://sidebar.studio/
[3]: https://github.com/EugeCos/sidebar-npm-test
[4]: https://eugeville.com/you-used-to-call-me-on-my-cell-phone