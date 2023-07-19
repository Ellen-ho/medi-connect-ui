// import { Avatar, Button, Card, CardContent, Divider, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
// import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
// import { useNavigate } from 'react-router-dom';
// import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
// import { useEffect, useState } from 'react';
// import { IQuestion } from '../../../../../types/Questions';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
// import { dateFormatter } from '../../../../../utils/dateFormatter';


// const AppointmentList: React.FC = () => {
//   const [appointments, setAppointments] = useState<IAppointment[]>([]);
//   const navigate = useNavigate();

//   const handleClickNewAppointment = () => {
//     navigate('/appointment/new');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, pagination } = await getAppointments({
//       });
//       setQuestions(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <PrimaryPageTop
//         pageTitle="Appointment"
//         leftElement={
//           <Button onClick={handleClickNewAppointment} variant="contained">
//             Make Appointment
//           </Button>
//         }
//       />
//       <PrimaryPageContent>
//         <CommonWrapper>
//           <Card>
//             <CardContent>
//               <List
//                 sx={{
//                   width: '100%',
//                   bgcolor: 'background.paper',
//                 }}
//               >
//                  {data?.data.map((appointment) => (
//                   <>
//                     <ListItemButton
//                       onClick={() => handleClickAppointment(appointment.id)}
//                     >
//                       <ListItemAvatar>
//                         <Avatar>
//                            <CalendarMonthIcon/>
//                         </Avatar>
//                      </ListItemAvatar>
//                       <ListItemText
//                         primary={appointment.status}
//                         secondary={`Created at ${dateFormatter(
//                           appointment.createdAt,
//                         )}`}
//                       />
//               </ListItemButton>
//                     <Divider />
//                   </>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </CommonWrapper>
//       </PrimaryPageContent>
//     </>
//   );
// };

// export default AppointmentList;


import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PrimaryPageTop from "../../../../layout/PrimaryPageTop";
import PrimaryPageContent from "../../../../layout/PrimaryPageContent";
import { getPatientConsultAppointments, IGetPatientConsultAppointmentsResponse } from "../../../../../services/ConsultationService";
import { ConsultAppointmentDatas } from "../../../../../types/Consultations";

const AppointmentList: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<ConsultAppointmentDatas[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IGetPatientConsultAppointmentsResponse = await getPatientConsultAppointments();
        const allAppointments = [
          ...response.upcomingAppointments,
          ...response.completedAppointments,
          ...response.canceledAppointments
        ];
        setAppointments(allAppointments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleClickNewAppointment = () => {
    navigate('/appointment/new');
  };

  const handleClickAppointment = (appointmentId: string) => {
    navigate(`/appointment/${appointmentId}`);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log(`Cancel appointment with ID: ${appointmentId}`);
  };

  return (
    <>
      <PrimaryPageTop
        pageTitle="Appointment"
        leftElement={
          <Button onClick={handleClickNewAppointment} variant="contained">
            Create Appointment
          </Button>
        }
      />
      <PrimaryPageContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Appointment Status</TableCell>
                <TableCell>Appointment Time Slot</TableCell>
                <TableCell>Appointed Doctor</TableCell>
                <TableCell>Meeting Link</TableCell>
                <TableCell>Cancel Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.patientId}>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{`${appointment.doctorTimeSlot.startAt} - ${appointment.doctorTimeSlot.endAt}`}</TableCell>
                  <TableCell>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</TableCell>
                  <TableCell>{appointment.meetingLink}</TableCell>
                  <TableCell>
                    {appointment.cacelAvailability ? (
                      <Button onClick={() => handleCancelAppointment(appointment.patientId)} variant="contained">
                        I Want to Cancel
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PrimaryPageContent>
    </>
  );
}

export default AppointmentList;