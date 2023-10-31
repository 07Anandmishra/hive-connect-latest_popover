'use client';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
// ===================
import SeperateAppBar from './SeperateAppBar';
import SeperateDrawer from './SeperateDrawer';
import { Theme } from '@mui/system';

import Workcategories from '../Childcomponent/Workcategories';
import Allviews from '../Childcomponent/Allviews';
import AllProjecttable from '../Childcomponent/AllProjecttable';
import Mytodos from '../Childcomponent/Mytodos';
import PMIfollowups from '../Childcomponent/PMIfollowups';
import Vendorfallowups from '../Childcomponent/Vendorfallowups';
import TableComp from '../../hive/pages/TableComp';
import { Provider } from 'react-redux';
import store from '../../app/Redux/Store/index'


export const drawerWidth = 200;

interface MainProps {
  theme: Theme;
  open: boolean;
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<MainProps>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}px`,
  width: 'calc(100% - 65px)',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 'calc(100% - 240px)',
  }),
  overflow: 'hidden',
  margin: 0,
}));

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden' as 'hidden', // Explicitly type the overflowX property
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden' as 'hidden', // Explicitly type the overflowX property
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps {
  theme: Theme;
  open: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: `100%`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface DrawerProps {
  theme: Theme;
  open: boolean;
}

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebarheader() {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box className="box" sx={{ display: 'flex' }}>
      <CssBaseline />
      <SeperateAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        theme={undefined}
      />

      <SeperateDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />

      <Main theme={theme} className="main-content" open={open}>
        {/* <Workcategories />
        <Allviews />
        <Mytodos />
        <PMIfollowups />
        <Vendorfallowups />
        <AllProjecttable /> */}
    
            <TableComp />
       
      </Main>
    </Box>
  );
}
