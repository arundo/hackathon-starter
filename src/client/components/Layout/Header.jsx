import React from 'react'
import { useAuth, axios } from '@arundo/react-auth'
import classNames from 'classnames'
import { ProfileLink } from './ProfileLink'
import './Header.scss'
import logo from '../../images/arundo-logo-white.svg'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export const Header = ({ className }) => {
  let { isLoggedIn, loginAction } = useAuth()

  return (
    <AppBar position="fixed" className={classNames('header', className)}>
      <Toolbar variant="dense" className="toolbar">
        <img className="logo" src={logo} />

        {
          isLoggedIn
          ? <ProfileLink />
          : <Button color="inherit" onClick={loginAction}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

