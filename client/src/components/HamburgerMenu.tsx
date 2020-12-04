import { Button, Menu, MenuItem } from '@material-ui/core';
import * as React from 'react';
import { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

interface IHamburgerMenuProps {}

const HamburgerMenu: React.FC<IHamburgerMenuProps> = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDestination = () => {
    history.push('/favourites');
  };
  const handleLogout = () => {
    history.push('/');
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDestination}>Favorites</MenuItem>
        <MenuItem onClick={handleClose}>Providers</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HamburgerMenu;
