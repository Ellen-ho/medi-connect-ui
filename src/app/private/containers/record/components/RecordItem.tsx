import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IRecordCategory } from '../types/Record.type';
import { dateFormatter } from '../../../../../utils/dateFormatter';

interface IRecordItemProps {
  record: any;
  recordCategory: IRecordCategory;
  onClick: (recordId: string) => void;
}

const RecordItem: React.FC<IRecordItemProps> = ({
  record,
  recordCategory,
  onClick,
}) => {
  return (
    <Card>
      <CardActionArea onClick={() => onClick(record.id)}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Grid container direction="column">
              {recordCategory.fields.map((field) =>
                field.type === 'date' ? (
                  <Typography gutterBottom variant="h6" component="div">
                    {dateFormatter(record.date)}
                  </Typography>
                ) : (
                  record[field.id] && (
                    <Grid item xs={12} key={field.id}>
                      <Grid container>
                        <Grid item>
                          <Typography variant="body2">
                            {field.name}
                            {': '}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="text.secondary">
                            {record[field.id]}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                ),
              )}
            </Grid>
          </CardContent>
        </Box>
      </CardActionArea>
      {/* <CardActions>
        <Tooltip title="Edit" placement="top">
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions> */}
    </Card>
  );
};

export default RecordItem;
