import React, { useState, useEffect, useLayoutEffect, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';


const StylishSidebar = forwardRef((props, ref) => {
  const { 
    backgroundImage = 'https://eugeville.files.wordpress.com/2015/03/mount.jpg', 
    header = {
      fullName: 'Your Sidebar',
      shortName: 'SS'
    },
    menuItems = [
      {name: 'Item1', to: '/item1', icon: 'https://eugeville.files.wordpress.com/2015/03/home.png', subMenuItems: [] },
      {name: 'Item2', to: '/item2', icon: 'https://eugeville.files.wordpress.com/2015/03/plane.png', 
        subMenuItems: [
          { name: 'Sub1', to: '/sub1'},
          { name: 'Sub2', to: '/sub2'}, 
          { name: 'Sub3', to: '/sub3'}]
      }
    ],
    fonts = {
      header: 'Poppins',
      menu: 'Poppins'
    },
    colorPalette = {
      bgColor1: 'rgba(67, 67, 67, 0.8)',
      bgColor2: 'rgba(0, 0, 0, 0.8)',
      fontColor: 'rgba(161, 161, 161)',
      fontColorSelected: 'rgba(255, 255, 255)',
      dividerColor: 'rgba(48, 48, 48)',
      selectedBackgroundCollapsedMode: 'light'
    },
    presetPalette = '',
    widthExpanded = '20%',
    widthCollapsed = '5%',
    minWidth = '80px',
    maxWidth = '280px',
    className = {},
    isOpen = true,
    showToggler = true,
    onTogglerClick = null,
    onHeaderClick = null,
    onMenuItemClick = null,
    onSubMenuItemClick = null
  } = props;

  
  // State
  const [selected, setSelectedMenuItem] = useState(menuItems[0] ? menuItems[0].name : null);
  const [isSidebarOpen, setSidebarState] = useState(isOpen);
  const [headerState, setHeader] = useState(header.fullName);
  const [subMenusStates, setSubmenus] = useState({});
  const [currentPalette, setPalette] = useState({})

  
  // Effects

  // Set color palette (preset or custom)
  useLayoutEffect(() => {
    const presetPalettesList = ['dejaVu', 'swampyGreen', 'pinkAndBlue', 'julyBlue', 'gothicDark', 'ashes', 'beaverBrown', 'oceanBlue', 'saltNPepper'];
    if (presetPalette && presetPalettesList.indexOf(presetPalette) > -1) {
      setPalette(Colors[`${presetPalette}`])
    }

    else Object.keys(currentPalette).length === 0 && setPalette(colorPalette);
  }, [colorPalette, currentPalette, presetPalette])


  // Set selected menu item based on URL pathname
  useLayoutEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');

    if (path !== '/' && parts[1].charAt(0).toUpperCase() !== menuItems[0].name) {
      const selectedItem = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      setSelectedMenuItem(selectedItem)
    }
  }, [menuItems])

  // Update of header state
  useEffect(() => {
    isSidebarOpen ? setTimeout(() => setHeader(header.fullName), 200) : setHeader(header.shortName);
  }, [isSidebarOpen, header]);


  // Update of sidebar state
  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth < 1280) setSidebarState(false);
      else setSidebarState(true)
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [isSidebarOpen]);


  // Add index of items that contain sub menu items
  useEffect(() => {
    const newSubmenus = {};

    menuItems.forEach((item, index) => {
      const hasSubmenus = !!item.subMenuItems.length;

      if (hasSubmenus) {
        newSubmenus[index] = {};
        newSubmenus[index]['isOpen'] = false;
        newSubmenus[index]['selected'] = null;
      }
    })

    // Set selected submenu if user landed on one
    const path = window.location.pathname;
    const parts = path.split('/');

    if (parts.length === 3) {
      const selectedItem = parts[1].toLowerCase();
      const selectedSubItem = parts[2].toLowerCase()
      const selectedItemIndex = menuItems.findIndex(item => item.name.toLowerCase() === selectedItem);
      const selectedSubItemIndex = menuItems[selectedItemIndex] ? menuItems[selectedItemIndex].subMenuItems.findIndex(subItem => subItem.name.toLowerCase() === selectedSubItem) : null;

      if (selectedItemIndex !== -1) newSubmenus[selectedItemIndex]['isOpen'] = true;
      if (selectedItemIndex !== -1 && selectedSubItemIndex !== -1) newSubmenus[selectedItemIndex]['selected'] = selectedSubItemIndex;
    }

    Object.keys(subMenusStates).length === 0 && setSubmenus(newSubmenus);
  }, [menuItems, subMenusStates]);

  const handleMenuItemClick = (event, name, index) => {
    if (onMenuItemClick) onMenuItemClick(event, index);
    setSelectedMenuItem(name);

    const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

    if (subMenusStates.hasOwnProperty(index)) { 
      subMenusCopy[index]['isOpen'] = !subMenusStates[index]['isOpen'] 
      setSubmenus(subMenusCopy)
    }
    else {
      for (let item in subMenusStates) {
        subMenusCopy[item]['isOpen'] = false;
        subMenusCopy[item]['selected'] = null
      }
      setSubmenus(subMenusCopy);
    }
  }

  const handleSubMenuItemClick = (event, menuItemIdx, subMenuItemIdx) => {
    if (onSubMenuItemClick) onSubMenuItemClick(event, menuItemIdx, subMenuItemIdx);
    const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

    subMenusCopy[menuItemIdx]['selected'] = subMenuItemIdx;
    setSubmenus(subMenusCopy);
  }


  const handleToggler = () => {
    if (onTogglerClick) onTogglerClick();
    setSidebarState(!isSidebarOpen)
  }


  const handleHeaderClick = () => {
    if (onHeaderClick) onHeaderClick();
  }


  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;

    const hasSubmenus = !!item.subMenuItems.length;
    const isOpen = subMenusStates[index] ? subMenusStates[index].isOpen : false;

    const subMenusJSX = item.subMenuItems.map((subMenuItem, subMenuItemIndex) => {
      const isSubmenuItemSelected = subMenusStates[index] ? subMenusStates[index].selected === subMenuItemIndex : false;

      return (
        <SubMenuItem
          key={subMenuItemIndex}
          font={fonts.menu}
          onClick={e => handleSubMenuItemClick(e, index, subMenuItemIndex)}
          selected={isSubmenuItemSelected}
          colorPalette={currentPalette}
        >
          {subMenuItem.name}
        </SubMenuItem>
      )
    })

    return (
      <ItemContainer key={index}>
        <MenuItem
          font={fonts.menu}
          selected={isItemSelected}
          onClick={e => handleMenuItemClick(e, item.name, index)}
          isSidebarOpen={isSidebarOpen}
          isOpen={isOpen}
          colorPalette={currentPalette}
        >
          <Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
          <Text isSidebarOpen={isSidebarOpen}>{item.name}</Text>
          {hasSubmenus && isSidebarOpen && (
            <DropdownIcon selected={isItemSelected} isOpen={isOpen} colorPalette={currentPalette} />
          )}
        </MenuItem>

        {/* Display submenus if they exist  */}
        <AnimatePresence>
          {hasSubmenus && isOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <SubMenuItemContainer isSidebarOpen={isSidebarOpen} colorPalette={currentPalette}>{subMenusJSX}</SubMenuItemContainer>
            </motion.nav>
          )}
        </AnimatePresence>
      </ItemContainer>
    )
  });

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
          body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins';
            h1,h2,h3,h4,h5,h6,p { margin: 0 };
          }
        `}
      />

      <SidebarContainer 
        backgroundImage={backgroundImage}
        isSidebarOpen={isSidebarOpen} 
        colorPalette={currentPalette}
        widthCollapsed={widthCollapsed}
        widthExpanded={widthExpanded}
        minWidth={minWidth}
        maxWidth={maxWidth}
        ref={ref}
        style={{...className}}
      >
          <SidebarHeader 
            font={fonts.header}
            hasHeaderClick={!!onHeaderClick}
            onClick={() => handleHeaderClick()}
          >{headerState}
          </SidebarHeader>

          <MenuItemContainer>{menuItemsJSX}</MenuItemContainer>

          {showToggler && (
            <TogglerContainer onClick={() => handleToggler()}>
              <Toggler />
            </TogglerContainer>
          )}
      </SidebarContainer>
    </>
  )
});

export default StylishSidebar


const Colors = {
  dejaVu: {
    bgColor1: '#fc5296CC',
    bgColor2: '#f67062CC',
    fontColor: '#130f40',
    fontColorSelected: '#ffffff',
    dividerColor: '#e17055',
    selectedBackgroundCollapsedMode: 'dark'
  },
  swampyGreen: {
    bgColor1: '#0bab64CC',
    bgColor2: '#3bb78fCC',
    fontColor: '#162e27',
    fontColorSelected: '#ffffff',
    dividerColor: '#7accb2',
    selectedBackgroundCollapsedMode: 'dark'
  },
  pinkAndBlue: {
    bgColor1: '#7ee8faCC',
    bgColor2: '#eec0c6CC',
    fontColor: '#965d69',
    fontColorSelected: '#211618',
    dividerColor: '#e8d5d8',
    selectedBackgroundCollapsedMode: 'dark'
  },
  julyBlue: {
    bgColor1: '#647deeCC',
    bgColor2: '#7f53acCC',
    fontColor: '#130f40',
    fontColorSelected: '#ffffff',
    dividerColor: '#a98bc7',
    selectedBackgroundCollapsedMode: 'dark'
  },
  gothicDark: {
    bgColor1: '#434343CC',
    bgColor2: '#000000CC',
    fontColor: 'rgba(161, 161, 161)',
    fontColorSelected: '#ffffff',
    dividerColor: '#303030',
    selectedBackgroundCollapsedMode: 'light'
  },  
  ashes: {
    bgColor1: '#e6eaf0CC',
    bgColor2: '#B8C6DBCC',
    fontColor: '#616469',
    fontColorSelected: '#000000',
    dividerColor: '#a4a7ab',
    selectedBackgroundCollapsedMode: 'dark'
  },
  beaverBrown: {
    bgColor1: '#953b20CC',
    bgColor2: '#570f0aCC',
    fontColor: '#f0b2af',
    fontColorSelected: '#ffffff',
    dividerColor: '#78403d',
    selectedBackgroundCollapsedMode: 'dark'
  },
  oceanBlue: {
    bgColor1: '#0ABCF9CC',
    bgColor2: '#2C69D1CC',
    fontColor: '#023040',
    fontColorSelected: '#ffffff',
    dividerColor: '#136d8a',
    selectedBackgroundCollapsedMode: 'dark'
  },
  saltNPepper: {
    bgColor1: '#5b6467CC',
    bgColor2: '#2f4353CC',
    fontColor: '#b0b0b0',
    fontColorSelected: '#ffffff',
    dividerColor: '#5e686b',
    selectedBackgroundCollapsedMode: 'dark'
  }
}


const SidebarContainer = styled.div`
  width: ${p => p.isSidebarOpen ? p.widthExpanded : p.widthCollapsed};
  height: 100vh;
  max-width: ${p => p.maxWidth};
  min-width: ${p => p.minWidth};
  background-image: linear-gradient(
    315deg,
    ${p => p.colorPalette.bgColor1} 0%,
    ${p => p.colorPalette.bgColor2} 74%),
    url(${p => p.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: ${p => p.colorPalette.fontColorSelected};
  position: relative; // Toggler
  transition: .2s ease-in all;
`

const SidebarHeader = styled.h3`
  padding: 20px 0;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 6px;
  font-family: ${p => p.font};
  font-weight: 300;
  ${p => p.hasHeaderClick && 'cursor: pointer'}
`

const MenuItemContainer = styled.div``;
const ItemContainer = styled.div``;

// Menu items -------------------------------------------------------------
const MenuItem = styled.div`
  ${p => !p.isSidebarOpen && `
    text-align: center;
    ${p.selected && `background-color: ${p.colorPalette.selectedBackgroundCollapsedMode === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`};
  `};

  padding: 6px 20px;
  font-weight: 300;
  cursor: pointer;
  color: ${p => p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor} ;
  font-family: ${p => p.font};
  white-space: nowrap;
  position: relative; // Dropdown Icon
  transition: .2s ease-in all;

  &:hover {
    color: ${p => p.colorPalette.fontColorSelected};
    transition: .1s ease-in all;
  }

  &:after {
    content: '';
    border: 1px solid ${p => p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.dividerColor};
    display: ${p => p.isSidebarOpen && p.selected && p.isOpen ? 'none' : 'block'};
    margin: 8px 0 4px;    
    transition: .1s ease-in all;
  };

  ${p => !p.selected && `
    &:hover {
      &:after {
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: .1s ease-in all;
      }
    }
  `}
`;

const Text = styled.p`
  display: ${p => p.isSidebarOpen ? 'inline' : 'none'};
`

const Icon = styled.img`
  ${p => p.isSidebarOpen && `padding-right: 20px; transition: .2s ease-in padding-right`};
  height: 16px;
  width: 16px;
`

// Sub menu items -------------------------------------------------------------------------
const SubMenuItemContainer = styled.div`
  font-size: 14px;
  ${p => p.isSidebarOpen && 'padding-left: 15%'};  
  ${p => !p.isSidebarOpen && 'text-align: center'};

`;
const SubMenuItem = styled.p`
  color: ${p => p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor};
  font-family: ${p => p.font};
  font-weight: 300;
  cursor: pointer;
  ${p => p.selected && 'font-weight: 400; letter-spacing: 2px;'};
  transition: .2s;

  &:hover {
    color: ${p => p.colorPalette.fontColorSelected}
  }
`;


// Dropdown icon ----------------------------------------------------------------------
const DropdownIcon = styled.span`
  position: absolute;
  top: ${p => p.isOpen ? '16px' : '12px'};
  right: 24px;
  border: solid ${p => p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor};
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: ${p => p.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
  transition: .4s;
`;

// Toggler -----------------------------------------------------------------------------
const TogglerContainer = styled.div`
  position: absolute;
  width: 30%;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const Toggler = styled.div`
    height: 40px;
    cursor: pointer;
    position: relative; // horizontal lines

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: .25em;
      height: .1em;
      width: 100%;
      background: #fff;
      box-shadow: 
        0 .75em 0 0 #fff,
        0 1.5em 0 0 #fff;        
    }
`