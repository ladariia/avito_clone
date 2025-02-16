import PropTypes from 'prop-types';
import {
  CircularProgress,
  Typography,
  Pagination,
  Button,
  Box,
  Stack,
} from '@mui/material';
import useStore from '../store/store.js';
import AdPreviewCard from './AdPreviewCard.jsx';
import { Link } from 'react-router-dom';

const AdsList = ({ ads, loading, error }) => {
  const { page, setPage, itemsPerPage } = useStore();
  const totalPages = Math.ceil(ads.length / itemsPerPage);
  const displayedAds = ads.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <Button variant="contained" color="primary" component={Link} to="/form">
          Разместить объявление
        </Button>
      </Box>
      <Stack spacing={2}>
        {displayedAds.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            Нет объявлений
          </Typography>
        ) : (
          displayedAds.map((item) => (
            <AdPreviewCard key={item.id} item={item} />
          ))
        )}
      </Stack>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
        />
      )}
    </>
  );
};

AdsList.propTypes = {
  ads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default AdsList;
