import { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useStore from '../store/store';
import AdForm from '../components/AdForm';

const FormPage = () => {
  const { id } = useParams();
  const { fetchAd, ad, loading, error } = useStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAd(id);
      setIsEditing(true);
    }
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

  return (
    <Container sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <AdForm isEditing={isEditing} adData={isEditing && ad} />
    </Container>
  );
};

export default FormPage;
