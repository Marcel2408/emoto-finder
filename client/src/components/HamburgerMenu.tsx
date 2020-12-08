import { Button, Menu, MenuItem } from '@material-ui/core';
import * as React from 'react';
import { MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { CircleIcon } from './MapStyle';

interface IHamburgerMenuProps {}

const HamburgerMenu: React.FC<IHamburgerMenuProps> = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProviders = () => {
    history.push('/providers');
  };
  const handleDestination = () => {
    history.push('/favourites');
  };
  const handleLogout = () => {
    history.push('/');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <CircleIcon>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon color="primary" fontSize="large" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDestination}>Favorites</MenuItem>
          <MenuItem onClick={handleProviders}>Providers</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </CircleIcon>
    </>
  );
};

export default HamburgerMenu;
