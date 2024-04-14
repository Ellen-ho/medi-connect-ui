import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Can doctors on MediConnect prescribe all medications?',
    answer:
      "Currently, doctors on Medi Connect do not directly issue prescriptions to patients. On Medi Connect, the emphasis lies in having doctors from various specialties available to offer unlimited, personalized consultations to each patient, unrestricted by space and time. It's akin to having a health mentor readily available to assist you whenever needed.",
  },
  {
    question: 'Can I review my health records over time?',
    answer:
      'Absolutely, you can review individual entries or comprehensive lists from any category in your health records to monitor changes in your health status.',
  },
  {
    question:
      'Why kind of technology or software do I need for an online doctor visit?',
    answer:
      "To have an online doctor visit, you'll need a Google account since we use Google Meet for the platform. Make sure you have a stable internet connection and that your microphone, camera, and screen are all working properly before the visit starts for the best experience.",
  },
  {
    question: 'What credentials do Medi Connect doctors have?',
    answer:
      'At Medi Connect, we have licensed doctors from around the world, each having received comprehensive medical education at top medical schools in their respective countries. They possess nationally recognized medical diplomas and have accumulated years of practical experience. Every physician specializes in different fields, and their detailed profiles on MediConnect provide comprehensive backgrounds.',
  },
  {
    question: 'What kind of health assistance can I receive on MediConnect?',
    answer:
      "MediConnect offers two main types of records: Health Matrix and Lifestyle, enabling users to easily track their daily health data. The platform also analyzes your health status based on your consecutive 14-day records. If your health is deemed critical, we'll remind you to seek further medical examination. For those in suboptimal health, we tailor health goals. Throughout your goal achievement journey, you can ask questions on the platform, and our professional physicians will provide answers. You can also schedule online consultations with physicians according to your needs, aiding you in achieving your health goals more steadily.",
  },
  {
    question:
      'Can people who are currently healthy participate on the platform? Or is there a need for them to join?',
    answer:
      "Of course, you're more than welcome to join, as long as you're invested in your health and willing to put in the effort. An important perspective to consider is that health isn't static; it's a dynamic equilibrium achieved through ongoing efforts. Therefore, we encourage everyone to cultivate healthy habits and achieve long-term health in a sustainable manner.",
  },
];

const FaqComponent: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        Frequently asked questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} style={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <PsychologyAltIcon
              style={{ color: '#abdbe3' }}
              sx={{ marginRight: '3px' }}
            />
            <Typography
              style={{
                fontFamily: 'sans-serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#143566',
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqComponent;
