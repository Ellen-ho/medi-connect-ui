import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

interface IRecordEntranceProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  icon?: React.FC;
  sx?: SxProps<Theme>;
}

const RecordEntrance: React.FC<IRecordEntranceProps> = ({
  title,
  subtitle,
  onClick,
  icon,
  sx,
}) => {
  return (
    <Card sx={sx}>
      <CardActionArea onClick={onClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default RecordEntrance;
