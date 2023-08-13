import { useNavigate } from 'react-router-dom';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';

import { CommonWrapper } from '../../../layout/CommonWrapper.styled';
import { useContext, useEffect } from 'react';
import { getOAuthAccessToken } from '../../../../services/UserService';
import { AuthContext } from '../../../../context/AuthContext';

const OAuth: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function getAccessToken() {
      const response = await getOAuthAccessToken();

      dispatch({
        type: 'LOG_IN',
        payload: {
          token: response.token,
          currentUser: {
            id: response.user.id,
            displayName: response.user.displayName,
            role: response.user.role,
            avatar: response.user.avatar,
          },
          patientId: response.patientId,
          doctorId: response.doctorId,
          hasProfile: response.hasProfile,
        },
      });
      navigate('/');
    }
    getAccessToken();
  }, []);

  return (
    <PrimaryPageContent>
      <CommonWrapper>LOADING....</CommonWrapper>
    </PrimaryPageContent>
  );
};

export default OAuth;
