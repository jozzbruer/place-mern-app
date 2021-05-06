import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

function SideDrawer(props) {
    const content = (
        <CSSTransition in={props.show} onClick={props.onClick} timeout={200} classNames='slide-in-left-enter' mountOnEnter unmountOnExit > 
            <aside className='side-drawer' >
                {props.children}
            </aside>
        </CSSTransition>
    )
    return (
        ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
    )
}

export default SideDrawer
