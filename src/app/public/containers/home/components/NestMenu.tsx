import React, { useState } from 'react';
import {
  MenuList,
  MenuItem,
  Button,
  Collapse,
  List,
  ListItemButton,
  Popover,
} from '@mui/material';

const NestedMenu: React.FC = () => {
  const [openHealthKnowledge, setOpenHealthKnowledge] =
    useState<null | HTMLElement>(null);
  const [openAboutUs, setOpenAboutUs] = useState<null | HTMLElement>(null);

  const toggleHealthKnowledge = (event: React.MouseEvent<HTMLElement>) => {
    setOpenHealthKnowledge(openHealthKnowledge ? null : event.currentTarget);
  };

  const toggleAboutUs = (event: React.MouseEvent<HTMLElement>) => {
    setOpenAboutUs(openAboutUs ? null : event.currentTarget);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button onClick={toggleHealthKnowledge} sx={{ color: 'white' }}>
        Health Knowledge
      </Button>
      <Popover
        open={Boolean(openHealthKnowledge)}
        anchorEl={openHealthKnowledge}
        onClose={() => setOpenHealthKnowledge(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List component="nav" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>Blog</ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            Health Matrix Data Types
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>Life Style Data Types</ListItemButton>
        </List>
      </Popover>

      <Button onClick={toggleAboutUs} sx={{ color: 'white' }}>
        About Us
      </Button>
      <Popover
        open={Boolean(openAboutUs)}
        anchorEl={openAboutUs}
        onClose={() => setOpenAboutUs(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List component="nav" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>Who We Are</ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>Contact Us</ListItemButton>
        </List>
      </Popover>
    </div>
  );
};

export default NestedMenu;
