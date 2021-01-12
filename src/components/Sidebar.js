import React, { useState, useEffect, useLayoutEffect, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Global, css } from '@emotion/core';
import * as s from './styles.js';
import Colors from './colors'

const StylishSidebar = forwardRef((props, ref) => {
  const { 
    backgroundImage = 'https://eugeville.files.wordpress.com/2015/03/mount.jpg', 
    header = {
      fullName: 'Your Sidebar',
      shortName: 'SS'
    },
    menuItems = [
      {name: 'Item1', to: '/item1', icon: 'https://icon-library.com/images/white-home-icon-png/white-home-icon-png-21.jpg', subMenuItems: [] },
      {name: 'Item2', to: '/item2', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/White_plane_icon.svg/1024px-White_plane_icon.svg.png', 
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
        <s.SubMenuItem
          key={subMenuItemIndex}
          font={fonts.menu}
          onClick={e => handleSubMenuItemClick(e, index, subMenuItemIndex)}
          selected={isSubmenuItemSelected}
          colorPalette={currentPalette}
        >
          {subMenuItem.name}
        </s.SubMenuItem>
      )
    })

    return (
      <s.ItemContainer key={index}>
        <s.MenuItem
          font={fonts.menu}
          selected={isItemSelected}
          onClick={e => handleMenuItemClick(e, item.name, index)}
          isSidebarOpen={isSidebarOpen}
          isOpen={isOpen}
          colorPalette={currentPalette}
        >
          <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
          <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
          {hasSubmenus && isSidebarOpen && (
            <s.DropdownIcon selected={isItemSelected} isOpen={isOpen} colorPalette={currentPalette} />
          )}
        </s.MenuItem>

        {/* Display submenus if they exist  */}
        <AnimatePresence>
          {hasSubmenus && isOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <s.SubMenuItemContainer isSidebarOpen={isSidebarOpen} colorPalette={currentPalette}>{subMenusJSX}</s.SubMenuItemContainer>
            </motion.nav>
          )}
        </AnimatePresence>
      </s.ItemContainer>
    )
  });

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            h1,h2,h3,h4,h5,h6,p { margin: 0 };
          }
        `}
      />

      <s.SidebarContainer 
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
          <s.SidebarHeader 
            font={fonts.header}
            hasHeaderClick={!!onHeaderClick}
            onClick={() => handleHeaderClick()}
          >{headerState}
          </s.SidebarHeader>

          <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>

          {showToggler && (
            <s.TogglerContainer onClick={() => handleToggler()}>
              <s.Toggler />
            </s.TogglerContainer>
          )}
      </s.SidebarContainer>
    </>
  )
});

export default StylishSidebar