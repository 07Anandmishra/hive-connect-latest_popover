// import React from 'react'
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { DrawerHeader } from './Sidebarheader.js';
// import { Drawer } from './Sidebarheader.js';
// import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

// export default function SeperateDrawer({open}) {

//   const sidebarData = [
//     {
//       icon: <CottageOutlinedIcon />,
//       text: 'Home'
//     },
//     {
//       icon: <CottageOutlinedIcon />,
//       text: 'Home'
//     }
//   ]
//   return (
//     <>
// 			<Drawer className='sidebar' variant="permanent" open={open}>
//         <DrawerHeader />
//         <Divider />
//         <List>
//           {sidebarData.map((data, index) => (
//               <ListItem key={index} disablePadding  sx={{ display: 'block' }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? 'initial' : 'center',
//                     px: '10.5px',
//                   }}
//                   disableRipple
//                 >
//                   <ListItemIcon sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : 'auto',
//                       justifyContent: 'center',
//                     }}
//                     className='menu-icon'
//                   >{data.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={data.text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </>
//   )
// }








"use client"
import React,{useState} from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DrawerHeader } from "../Sidebar/Sidebarheader";
import { Drawer } from "../Sidebar/Sidebarheader";


import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
//  import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';  
 import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
 import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
 import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
 import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
 import ScaleIcon from '@mui/icons-material/Scale';
 import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
 import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';



 
 interface SeperateDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  theme: any;

}

export default function SeperateDrawer({ open ,handleDrawerClose,theme}:SeperateDrawerProps) {
  
  const sidebarData = [
    {
      icon: <CottageOutlinedIcon />,
      text: "Home",
    },
    {
      icon: <AssignmentIndOutlinedIcon />,
      text: "Assignment",
    },
    {
      icon: <MonetizationOnOutlinedIcon />,
      text: "Monetization",
    },
    {
      icon: <BadgeOutlinedIcon />,
      text: "Badge",
    },
    {
      icon: <ShoppingCartOutlinedIcon />,
      text: "ShoppingCart",
    },
    {
      icon: <FormatListBulletedOutlinedIcon />,
      text: "FormatListBullet",
    },
    {
      icon: <MarkEmailUnreadOutlinedIcon />,
      text: "MarkEmail",
    },
    {
      icon: <LocationOnOutlinedIcon />,
      text: "Location",
    },
    {
      icon: <ScaleIcon />,
      text: "Scale",
    },
    {
      icon: <LibraryBooksOutlinedIcon />,
      text: "LibraryBooks",
    },
  ];



  return (
    <>
      <Drawer className="sidebar" variant="permanent" open={open} theme={theme}   >
        <DrawerHeader />
        <Divider />
        <List className="List-menu-sidebar">
          {sidebarData.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: "10.5px",
                }}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                  className="menu-icon"
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
