import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { IField, IRecordCategory } from '../types/Record.type';
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
              {recordCategory.subCategories.map((subCategory) =>
                subCategory.fields.map((field: IField) =>
                  field.type === 'date' ? (
                    <Typography gutterBottom variant="h6" component="div">
                      {dateFormatter(record[field.id])}
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
