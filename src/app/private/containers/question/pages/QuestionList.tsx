import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { getQuestions } from '../../../../../services/QuestionService';
import useSWR, { mutate } from 'swr';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import SearchBar from '../../../../../components/search/Search';
import QuestionItem from '../components/QuestionItem';
import {
  MedicalSpecialtyType,
  medicalSpecialties,
} from '../../../../../types/Share';
import CancelIcon from '@mui/icons-material/Cancel';

const QuestionList: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    MedicalSpecialtyType | 'All'
  >('All');

  const handleSpecialtySelect = (
    event: SelectChangeEvent<{ value: MedicalSpecialtyType | 'All' }>,
  ) => {
    // @ts-expect-error
    setSelectedSpecialty(event.target.value);
  };

  const handleFilterReset = () => {
    setSelectedSpecialty('All');
  };

  const handleClickNewQuestion = () => {
    navigate('/question/new');
  };

  const handleClickQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  const handleSearch = (searchString: string) => {
    setSearchKeyword(searchString);
  };

  const handleClickViewAnswer = () => navigate('/question/answer');

  const { data } = useSWR(
    `getQuestions?q=${page}?q=${searchKeyword}?q=${selectedSpecialty}`,
    () =>
      getQuestions({
        query: {
          limit: 10,
          page: page,
          searchKeyword: searchKeyword === '' ? undefined : searchKeyword,
          medicalSpecialty:
            selectedSpecialty === 'All' ? undefined : selectedSpecialty,
        },
      }),
  );

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop
            pageTitle="Question"
            rightElement={
              isDoctor ? (
                <Button onClick={handleClickViewAnswer} variant="contained">
                  View Your Answers
                </Button>
              ) : (
                <Button onClick={handleClickNewQuestion} variant="contained">
                  Ask Question
                </Button>
              )
            }
          />
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
              <MenuItem value={MedicalSpecialtyType.ONCOLOGY}>
                Oncology
              </MenuItem>
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
          <Card>
            <CardContent>
              <Box sx={{ paddingLeft: '6px' }}>
                <SearchBar onSearch={handleSearch} />
              </Box>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                {data?.data
                  .filter((question) => {
                    if (searchKeyword === '') {
                      return true;
                    }
                    return question.content
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase());
                  })
                  .map((question) => (
                    <Box key={question.id}>
                      <QuestionItem
                        handleClickQuestion={handleClickQuestion}
                        question={question}
                      />
                      <Divider />
                    </Box>
                  ))}
              </List>
            </CardContent>
          </Card>
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
    </>
  );
};

export default QuestionList;
