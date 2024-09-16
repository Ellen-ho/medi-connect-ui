import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getDoctorList } from '../../../../../services/DoctorServices';
import { useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import useSWR from 'swr';
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { MedicalSpecialtyType } from '../../../../../types/Share';
import CancelIcon from '@mui/icons-material/Cancel';

const DoctorList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    MedicalSpecialtyType | 'All'
  >('All');
  const { data, isLoading } = useSWR(
    `getDoctorList?q=${page}${selectedSpecialty}`,
    () =>
      getDoctorList({
        query: {
          limit: 9,
          page: page,
          specialties:
            selectedSpecialty === 'All' ? undefined : selectedSpecialty,
        },
      }),
  );

  const handleSpecialtySelect = (
    event: SelectChangeEvent<{ value: MedicalSpecialtyType | 'All' }>,
  ) => {
    // @ts-expect-error
    setSelectedSpecialty(event.target.value);
  };

  const handleFilterReset = () => {
    setSelectedSpecialty('All');
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <PrimaryPageTop pageTitle="Doctors" />
        <Box display="flex" alignItems="center">
          <Select
            // @ts-expect-error
            value={selectedSpecialty}
            onChange={handleSpecialtySelect}
            style={{ width: '280px' }}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={MedicalSpecialtyType.INTERNAL_MEDICINE}>
              Internal Medicine
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.SURGERY}>Surgery</MenuItem>
            <MenuItem value={MedicalSpecialtyType.OBSTETRICS_AND_GYNECOLOGY}>
              Obstetrics and Gynecology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.PEDIATRICS}>
              Pediatrics
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.OPHTHALMOLOGY}>
              Ophthalmology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.OTORHINOLARYNGOLOGY}>
              Otorhinolaryngology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.DERMATOLOGY}>
              Dermatology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.PSYCHIATRY}>
              Psychiatry
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.DENTISTRY}>
              Dentistry
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.ORTHOPEDICS}>
              Orthopedics
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.UROLOGY}>Urology</MenuItem>
            <MenuItem value={MedicalSpecialtyType.NEUROLOGY}>
              Neurology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.NEUROSURGERY}>
              Neurosurgery
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.CARDIOLOGY}>
              Cardiology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.CARDIOTHORACIC_SURGERY}>
              Cardiothoracic Surgery
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.ONCOLOGY}>Oncology</MenuItem>
            <MenuItem value={MedicalSpecialtyType.NEPHROLOGY}>
              Nephrology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.PULMONOLOGY}>
              Pulmonology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.GASTROENTEROLOGY}>
              Gastroenterology
            </MenuItem>
            <MenuItem value={MedicalSpecialtyType.PULMONARY_MEDICINE}>
              Pulmonary Medicine
            </MenuItem>
          </Select>
          <Box
            sx={{
              display: selectedSpecialty === 'All' ? 'none' : 'flex',
              marginLeft: '1rem',
            }}
          >
            <Tooltip title="Reset filter">
              <IconButton onClick={handleFilterReset}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {data &&
            data.data.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={doctor.id}>
                <DoctorCard data={doctor} />
              </Grid>
            ))}
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Pagination
            count={data?.pagination.totalPage || 1}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
          />
        </div>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default DoctorList;
