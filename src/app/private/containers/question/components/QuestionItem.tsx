import { IQuestion } from '../../../../../types/Questions';
import {
  Avatar,
  Badge,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { dateFormatter } from '../../../../../utils/dateFormatter';

interface ICreateAnswerProps {
  handleClickQuestion: (questionId: string) => void;
  question: IQuestion;
}

const QuestionItem: React.FC<ICreateAnswerProps> = ({
  handleClickQuestion,
  question,
}) => {
  return (
    <ListItemButton onClick={() => handleClickQuestion(question.id)}>
      <ListItemAvatar>
        <Tooltip
          title={
            question.answerCounts > 0
              ? 'This question had been answered'
              : 'No answer yet'
          }
          placement="top"
        >
          <Badge
            badgeContent={question.answerCounts}
            color="error"
            overlap="circular"
          >
            <Avatar
              sx={{
                bgcolor:
                  question.answerCounts > 0
                    ? (theme) => theme.palette.success.light
                    : (theme) => theme.palette.grey[500],
              }}
            >
              <QuestionAnswerIcon />
            </Avatar>
          </Badge>
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={question.content}
        secondary={`Created at ${dateFormatter(question.createdAt)}`}
      />
    </ListItemButton>
  );
};

export default QuestionItem;
