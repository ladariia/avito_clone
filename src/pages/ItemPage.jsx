import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@mui/material';
import useStore from '../store/store.js';
import AdCard from '../components/AdCard.jsx';

const ItemPage = () => {
  const { id } = useParams();
  const { ad, fetchAd, loading, error } = useStore();

  useEffect(() => {
    fetchAd(id);
  }, [id, fetchAd]);

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

  if (!ad) {
    return (
      <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
        Объявление не найдено
      </Typography>
    );
  }

  return (
    <Container sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <AdCard ad={ad} />
    </Container>
  );
};

export default ItemPage;
