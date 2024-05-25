import { Box, Typography } from '@mui/material';

interface SectionProps {
  title: string;
  content: string[];
}

const Section: React.FC<SectionProps> = ({ title, content }) => (
  <Box style={{ marginBottom: 16 }}>
    <Typography variant="h5" component="div" sx={{ mb: '1rem' }}>
      {title}
    </Typography>
    {content.map((text, index) => (
      <Typography
        variant="body1"
        paragraph
        key={index}
        sx={{
          lineHeight: '2.5rem',
        }}
      >
        {text}
      </Typography>
    ))}
  </Box>
);

export default Section;
