import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSWR from 'swr';
import { getDoctors } from '../../../../../services/ShareService';

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
  const { data, isLoading } = useSWR('getDoctors', () => getDoctors());
  const formatText = (text: string) => text.replace(/_/g, ' ');

  return (
    <div className="slider-container" style={{ margin: '50px 0' }}>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Our medical team
      </Typography>
      <Slider {...settings}>
        {data?.doctorData.map((doctor) => (
          <div key={doctor.id} style={{ margin: '2px 5px' }}>
            <Card
              style={{
                margin: 'auto',
                width: '90%',
                maxWidth: '500px',
                height: '300px',
                boxSizing: 'border-box',
                backgroundColor: ['#E4F9E8', '#FFFEF5', '#FFF5F5'][
                  Math.floor(Math.random() * 3)
                ],
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  margin: '10px auto 0',
                  flex: '0 0 auto',
                }}
                image={doctor.avatar || 'https://via.placeholder.com/150'}
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
                  textAlign: 'center',
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {formatText(doctor.firstName)} {formatText(doctor.lastName)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.specialties?.length > 0
                    ? doctor.specialties
                        .map((specialty) => formatText(specialty))
                        .join(', ')
                    : 'No specialties available'}
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
