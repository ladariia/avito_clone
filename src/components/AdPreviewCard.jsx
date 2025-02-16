import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const placeholderImage = 'https://placehold.co/150';

const AdPreviewCard = ({ item }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150 }}
        image={item.image || placeholderImage}
        alt={item.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.location} - {item.type}
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        component={Link}
        to={`/item/${item.id}`}
        sx={{ alignSelf: 'flex-start' }}
      >
        Открыть
      </Button>
    </Card>
  );
};

AdPreviewCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default AdPreviewCard;
