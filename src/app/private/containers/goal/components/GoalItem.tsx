import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import GoalStatus from './GoalStatus';
import { IHealthGoal } from '../../../../../types/Goals';

interface IGoalStatusProps {
  goal: IHealthGoal;
  handleClickGoal: (id: string) => void;
}
const GoalItem: React.FC<IGoalStatusProps> = ({ goal, handleClickGoal }) => {
  return (
    <ListItemButton onClick={() => handleClickGoal(goal.id)}>
      <ListItemAvatar>
        <Avatar>
          <FlagCircleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            Health Goal: {dateFormatter(goal.startAt.toString(), 'YYYY/M/D')} -{' '}
            {dateFormatter(goal.endAt.toString(), 'YYYY/M/D')}{' '}
            <GoalStatus status={goal.status} />
          </>
        }
        secondary={`Created At: ${dateFormatter(goal.createdAt.toString())}`}
      ></ListItemText>
    </ListItemButton>
  );
};

export default GoalItem;
