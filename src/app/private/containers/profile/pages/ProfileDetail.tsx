import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { ProfileDetailWrapper } from './ProfileDetail.styled';
import { Card, CardContent } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';



const ProfileDetail: React.FC = () => {
  const generateFallbackAvatar = (alt: string) => {
    const initials = alt.substring(0, 1).toUpperCase();
    return (
      <Avatar sx={{ bgcolor: deepOrange[500] }} alt={alt}>
        {initials}
      </Avatar>
    );
  };

  return (
    <>
      <PrimaryPageTop pageTitle="Profile" />
      <PrimaryPageContent>
        <ProfileDetailWrapper>
          <Card>
            <CardContent>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}
        >
          R
        </Avatar>
        {generateFallbackAvatar('Remy Sharp')}
      <div>
        <TextField
          label="First Name"
          id="first-name"
          size="small"
          // error={!!errors[field.id]}
          // helperText={<>{errors[field.id]?.message}</>}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          id="last-name"
          size="small"
          // error={!!errors[field.id]}
          // helperText={<>{errors[field.id]?.message}</>}
        />
      </div> 
       <div>
        <DatePicker label={'"year"'} openTo="year" />
        </div>
        {/* <TextField
                  select
                  label="Select"
                  size="small"
                  helperText="Select Gender"
                  {...register('genderType')}
                ></TextField> */}
          </CardContent>
         </Card>
        </ProfileDetailWrapper>
      </PrimaryPageContent>
    </>
  );
};

export default ProfileDetail;

