import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formSteps, getCategoryFields } from '../utils/formFields';

const AdCard = ({ ad }) => {
  const navigate = useNavigate();
  const placeholderImage = 'https://placehold.co/300';

  const commonFields = formSteps.find((step) => step.key === 'main').fields;
  const categoryFields = getCategoryFields(ad.type);
  const allowedFields = [...commonFields, ...categoryFields];

  const fieldLabels = Object.fromEntries(
    allowedFields.map(({ name, label }) => [name, label.replace(/\*$/, '')])
  );

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {ad.name}
        </Typography>
        <Stack direction="row" spacing={2}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 300 }}
            image={ad.image || placeholderImage}
            alt={ad.name}
          />
          <Box>
            {Object.entries(ad)
              .filter(([key]) => key !== 'image' && fieldLabels[key])
              .map(([key, value]) => (
                <Typography key={key} variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ color: '#757575' }}>{fieldLabels[key]}:</span>{' '}
                  {value || '-'}
                </Typography>
              ))}
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={() => navigate(`/form/${ad.id}`)}
            >
              Редактировать
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

AdCard.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default AdCard;
