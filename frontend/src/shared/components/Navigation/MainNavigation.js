import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import MainHeader from './MainHeader'
import SideDrawer from './SideDrawer'

import './MainNavigation.css'
import NavLinks from './NavLinks'
import Backdrop from '../UIelements/Backdrop'

function MainNavigation(props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    function drawerHandler(){
        setIsDrawerOpen(!isDrawerOpen)
    }
    function closeDrawer(){
        setIsDrawerOpen(false)
    }
    return (
        <>
           { isDrawerOpen && (<Backdrop  onClick={closeDrawer} />)}
           {isDrawerOpen ? (<SideDrawer  onClick={closeDrawer}>
            <nav className='main-navigation__drawer-nav'>
                <NavLinks />
            </nav>
            </SideDrawer>) : null}
            <MainHeader>
                <button onClick={drawerHandler} className='main-navigation__menu-btn'>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to='/`'>YourPlaces</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    ) 
}

export default MainNavigation
