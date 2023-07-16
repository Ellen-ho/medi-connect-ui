import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface IBasicCardProps {
  title: string;
  children: React.ReactNode;
}

const BasicCard: React.FC<IBasicCardProps> = ({ title, children }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default BasicCard;
