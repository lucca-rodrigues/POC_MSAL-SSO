import { Box, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '@root/contexts/globalContext/useGlobalContext';
import { useState } from 'react';

export function SidebarMenu() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const { theme, lightenColor } = useGlobalContext();

  const menuOptions = [
    {
      title: 'Dashboard',
      icon: <PaidIcon />,
      action: () => {
        setSelectedItem('Dashboard');
        navigate('/dashboard');
      },
    },
  ];

  return (
    <Stack
      height="100vh"
      width="100%"
      p={3}
      sx={{
        color: '#fff',
      }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
      >
        {menuOptions?.map((item, index) => (
          <Box mb={0.5} key={index}>
            <ListItemButton
              onClick={item?.action}
              sx={{
                borderRadius: 1,
                background: selectedItem === item?.title ? '#fff' : 'transparent',
                color: selectedItem === item?.title ? theme?.defaultColor : '#fff',

                '& svg': {
                  fill: selectedItem === item?.title ? theme?.defaultColor : '#fff',
                },

                '&:hover': {
                  color: selectedItem === item?.title ? theme?.defaultColor : '#fff',
                  background:
                    selectedItem === item?.title ? '#fff' : lightenColor(theme?.defaultColor, 0.5),

                  '& svg': {
                    fill: selectedItem === item?.title ? theme?.defaultColor : '#fff',
                  },
                },
              }}
            >
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary={item?.title} />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Stack>
  );
}
