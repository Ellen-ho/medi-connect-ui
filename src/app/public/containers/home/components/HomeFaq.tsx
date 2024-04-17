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
      'Currently, Medi Connect serves to augment the physical healthcare provided by medical teams. It enables our doctors to offer additional medical assistance beyond in-person consultations, such as health advice and customized health education. However, prescriptions are issued during in-person visits to the clinic.',
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
      'At Medi Connect, we have licensed doctors who have undergone extensive medical training. Each holds a nationally recognized medical diploma and brings years of practical experience to their role. Our physicians specialize in various fields, offering a diverse range of expertise. Detailed profiles for each doctor are available on MediConnect, providing comprehensive insights into their backgrounds.',
  },
  {
    question: 'What kind of health assistance can I receive on MediConnect?',
    answer:
      'Medi Connect offers two primary types of records—Health Matrix and Lifestyle—which enable users to effortlessly track their daily health data. The platform analyzes your health status using data collected over a consecutive 14-day period. Should your health be deemed critical, we will prompt you to seek further medical examination. For those with suboptimal health, we customize health goals tailored to individual needs. You can discuss these with your doctor in person or ask questions on the platform. Additionally, you can schedule online consultations with our physicians, helping you achieve your health goals more consistently.',
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
