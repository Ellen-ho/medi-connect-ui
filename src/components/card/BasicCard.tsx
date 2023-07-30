import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface IBasicCardProps {
  startTitleAdornment?: React.ReactNode;
  title: string;
  titleLeftElement?: React.ReactNode;
  children: React.ReactNode;
}

interface IBasicCardProps {
  startTitleAdornment?: React.ReactNode;
  title: string;
  titleLeftElement?: React.ReactNode;
  children: React.ReactNode;
}

const BasicCard: React.FC<IBasicCardProps> = ({
  startTitleAdornment,
  title,
  titleLeftElement,
  children,
}) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }}
          >
            {startTitleAdornment} {title}
          </Typography>
          {titleLeftElement}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

export default BasicCard;
