import React from 'react';
import { Container, Typography, Box, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to Medi Connect! These Terms of Service outline the rules and
        regulations for using the Medi Connect platform. By accessing our
        website or services, you agree to be bound by these terms.
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          1. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          Users must ensure that their use of Medi Connect complies with all
          applicable laws and regulations. Users are responsible for keeping
          their account information confidential and for any activities that
          occur under their account.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          2. Account Registration
        </Typography>
        <Typography variant="body1" paragraph>
          To access certain features of our services, you must register for an
          account. You agree to provide and maintain accurate, up-to-date, and
          complete information. Medi Connect reserves the right to suspend or
          terminate your account if any information is inaccurate or incomplete.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          3. Data Use and Consent
        </Typography>
        <Typography variant="body1" paragraph>
          By using our services, you agree to the collection and use of your
          data in accordance with our Privacy Policy.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          4. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          Medi Connect is not liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits, revenue,
          data, or goodwill, whether direct or indirect, arising from
          unauthorized access or use of our services and/or any personal
          information stored therein.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          5. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These terms and conditions are governed by and interpreted in
          accordance with healthcare regulations.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          6. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms at any time. You will be
          notified of any changes through the posting of updated terms on our
          website. Your continued use of the services following any changes
          indicates your acceptance of the new terms.
        </Typography>
      </Box>

      <Box mt={3} display="flex" alignItems="center">
        <Typography variant="body2">
          If you have any questions about these terms, please contact us at:
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

export default TermsPage;
