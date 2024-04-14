import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { useContext } from 'react';
import RecordEntrance from '../components/RecordEntrance';
import { recordCategories } from '../types/Record.type';
import { AuthContext } from '../../../../../context/AuthContext';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { mq } from '../../../../../styles/media-query';

const RecordHome: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetPatientId = searchParams.get('targetPatientId');

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop pageTitle="Records" />
          {recordCategories.map((category) => (
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', my: '.5rem' }}
              >
                {category.title}
              </Typography>
              <Divider sx={{ marginBottom: '10px' }} />
              <Box
                sx={mq({
                  display: 'flex',
                  flexDirection: ['column', 'column', 'row', 'row'],
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px',
                  boxSizing: 'border-box',
                })}
              >
                {category.subCategories.map((subCategory) => (
                  <RecordEntrance
                    key={subCategory.urlPath}
                    title={subCategory.name}
                    subtitle={subCategory.subtitle}
                    sx={{
                      height: '120px',
                      flexGrow: '0',
                      flexShrink: '0',
                      flexBasis: 'calc(50% - 5px)',
                    }}
                    onClick={() =>
                      navigate({
                        pathname: `/record/${subCategory.urlPath}`,
                        search: isDoctor
                          ? `?targetPatientId=${targetPatientId}`
                          : '',
                      })
                    }
                  />
                ))}
              </Box>
            </Box>
          ))}
        </CommonWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default RecordHome;
