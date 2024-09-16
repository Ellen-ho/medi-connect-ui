import React, { useState } from 'react';
import {
  MenuList,
  MenuItem,
  Button,
  Collapse,
  List,
  ListItemButton,
  Popover,
  Link,
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
        Knowledge
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
          <Link href="/article/health-matrix" underline="none" sx={{ pl: 4 }}>
            <ListItemButton>Health Matrix Data Types</ListItemButton>
          </Link>
          <Link href="/article/life-style" underline="none" sx={{ pl: 4 }}>
            <ListItemButton>Life Style Data Types</ListItemButton>
          </Link>
        </List>
      </Popover>

      <Button onClick={toggleAboutUs} sx={{ color: 'white' }}>
        <span style={{ marginRight: '3px' }}>About</span>
        <span>Us</span>
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
          <Link href="/team" underline="none" sx={{ pl: 4 }}>
            <ListItemButton>Who We Are</ListItemButton>
          </Link>
          <Link href="/signup-doctor" underline="none" sx={{ pl: 4 }}>
            <ListItemButton>Join as a Doctor</ListItemButton>
          </Link>
        </List>
      </Popover>
    </div>
  );
};

export default NestedMenu;
