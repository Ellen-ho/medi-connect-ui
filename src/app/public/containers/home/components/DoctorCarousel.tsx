import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import doctor1Url from '/src/assets/doctor1.webp';

const doctors = [
  {
    id: '1',
    avatar: doctor1Url,
    firstName: 'A',
    lastName: 'Do',
    specialties: ['Cardiology', 'Pediatrics'],
    gender: 'Male',
  },
  {
    id: '2',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'B',
    lastName: 'Do',
    specialties: ['Dermatology'],
    gender: 'Female',
  },
  {
    id: '3',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'C',
    lastName: 'Do',
    specialties: ['Neurology'],
    gender: 'Female',
  },
  {
    id: '4',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'D',
    lastName: 'Do',
    specialties: ['Cardiology', 'Pediatrics'],
    gender: 'Male',
  },
  {
    id: '5',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'E',
    lastName: 'Do',
    specialties: ['Dermatology'],
    gender: 'Female',
  },
  {
    id: '6',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'F',
    lastName: 'Do',
    specialties: ['Neurology'],
    gender: 'Female',
  },
  {
    id: '7',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'G',
    lastName: 'Do',
    specialties: ['Dermatology'],
    gender: 'Female',
  },
  {
    id: '8',
    avatar: 'https://via.placeholder.com/150',
    firstName: 'H',
    lastName: 'Do',
    specialties: ['Neurology'],
    gender: 'Female',
  },
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#9E9E9E',
        borderRadius: '10px',
        right: '-25px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#9E9E9E',
        borderRadius: '10px',
        left: '-25px',
      }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    // 576, 768, 992, 1200
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DoctorCarousel: React.FC = () => {
  return (
    <div className="slider-container" style={{ margin: '50px 0' }}>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Our medical team
      </Typography>
      <Slider {...settings}>
        {doctors.map((doctor, index) => (
          <div key={doctor.id} style={{ margin: '2px 5px' }}>
            {' '}
            {/* Reduced margin around cards for less spacing */}
            <Card
              style={{
                margin: 'auto',
                width: '90%', // Reduced width to make card more compact
                maxWidth: '500px', // Lower maximum width
                height: '300px', // Smaller card height
                boxSizing: 'border-box',
                backgroundColor: ['#E4F9E8', '#FFFEF5', '#FFF5F5'][index % 3], // Rotate background colors
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                style={{
                  width: '150px', // Smaller avatar width
                  height: '150px', // Smaller avatar height
                  objectFit: 'cover', // Maintain aspect ratio without distortion
                  borderRadius: '50%', // Keeps the avatar circular
                  margin: '10px auto 0', // Center avatar horizontally with margin top and auto for left/right
                  flex: '0 0 auto', // Set flex-grow to 0 to keep size consistent
                }}
                image={doctor.avatar}
                alt={`${doctor.firstName} ${doctor.lastName}`}
              />
              <CardContent
                style={{
                  flex: '1',
                  padding: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center', // Aligns text elements to the center horizontally
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Specialties: {doctor.specialties.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DoctorCarousel;
