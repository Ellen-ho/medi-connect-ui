import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        We value your privacy. This Privacy Policy explains how we collect, use,
        and protect your personal information.
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          1. Data Collection
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following types of personal information when you
          use our website: your name, email address, and any other information
          you voluntarily provide.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          2. Data Usage
        </Typography>
        <Typography variant="body1" paragraph>
          We use your personal information to provide and improve our services,
          communicate with you, and protect our legal rights as required by law.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          3. Data Protection
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate security measures to prevent unauthorized
          access, disclosure, modification, or deletion of your personal
          information.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          4. Changes to the Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Please review it
          periodically to ensure you are aware of any changes.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="body2">
          If you have any questions regarding this Privacy Policy, please
          contact us at:
          <Typography
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            support@mediconnect.com
          </Typography>
          .
        </Typography>
      </Box>

      <Box mt={2} display="flex" justifyContent="flex-start">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'primary.main' }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default PrivacyPage;
