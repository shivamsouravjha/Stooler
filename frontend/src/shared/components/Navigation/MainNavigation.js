import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';
import Logo from '../../../images/stool_logo.png';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
 
  return (
    <React.Fragment>
{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        > 
          <span />
          <span />
          <span />
        </button>
        <img src={Logo} className="mobileview_logo"/>
        <h1 className="main-navigation__title">
          <Link to="/">NIVESH <img src={Logo} className="nav_logo"></img> </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>

    </React.Fragment>
  );
};

export default MainNavigation;
