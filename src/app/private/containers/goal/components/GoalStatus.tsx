import { Chip } from '@mui/material';
import { HealthGoalStatus } from '../../../../../types/Goals';
import { toSentenceCaseFormat } from '../../../../../utils/sentenceCaseFormat';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface IStatusStyle {
  status: HealthGoalStatus;
  text: string;
  color: 'primary' | 'warning' | 'success' | 'error' | 'secondary';
  icon: JSX.Element;
}

interface IGoalStatusProps {
  status: HealthGoalStatus;
}
const GoalStatus: React.FC<IGoalStatusProps> = ({ status }) => {
  const getCorrespondingStyle = (status: HealthGoalStatus): IStatusStyle => {
    const statusStyleMapping: IStatusStyle[] = [
      {
        status: HealthGoalStatus.PENDING,
        text: toSentenceCaseFormat(HealthGoalStatus.PENDING),
        color: 'secondary',
        icon: <AccessTimeIcon />,
      },
      {
        status: HealthGoalStatus.IN_PROGRESS,
        text: toSentenceCaseFormat(HealthGoalStatus.IN_PROGRESS),
        color: 'primary',
        icon: <RocketLaunchIcon />,
      },
      {
        status: HealthGoalStatus.GOAL_FAILED,
        text: toSentenceCaseFormat(HealthGoalStatus.GOAL_FAILED),
        color: 'warning',
        icon: <SentimentDissatisfiedOutlinedIcon />,
      },
      {
        status: HealthGoalStatus.PARTIAL_GOALS_ACHIEVED,
        text: toSentenceCaseFormat(HealthGoalStatus.PARTIAL_GOALS_ACHIEVED),
        color: 'success',
        icon: <ThumbUpAltOutlinedIcon />,
      },
      {
        status: HealthGoalStatus.ALL_GOALS_ACHIEVED,
        text: toSentenceCaseFormat(HealthGoalStatus.ALL_GOALS_ACHIEVED),
        color: 'success',
        icon: <EmojiEventsIcon />,
      },
    ];

    const result = statusStyleMapping.find((item) => item.status === status);

    return {
      ...statusStyleMapping[0],
      ...(result ? result : {}),
    };
  };

  const { text, color, icon } = getCorrespondingStyle(status);

  return (
    <Chip
      icon={icon}
      label={text}
      color={color}
      variant="outlined"
      sx={{ px: '.4rem' }}
    />
  );
};

export default GoalStatus;
