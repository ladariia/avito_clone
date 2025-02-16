import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import useStore from '../store/store.js';
import SearchBar from '../components/SearchBar.jsx';
import FilterSelect from '../components/FilterSelect.jsx';
import AdsList from '../components/AdsList.jsx';
import { formSteps } from '../utils/formFields.js';

const ListPage = () => {
  const {
    ads,
    loading,
    error,
    fetchAds,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    setPage,
  } = useStore();

  useEffect(() => {
    fetchAds();
  }, []);

  const categoryOptions = [
    { label: 'Все', value: 'Все' },
    ...formSteps
      .find((step) => step.key === 'main')
      .fields.find((f) => f.name === 'type').options,
  ];

  const filteredAds = ads.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === 'Все' || item.type === filter)
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
  };

  return (
    <Container sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Список объявлений
      </Typography>
      <SearchBar
        label="Поиск по названию"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FilterSelect
        label="Категория"
        options={categoryOptions}
        value={filter}
        onChange={handleFilterChange}
      />
      <AdsList ads={filteredAds} loading={loading} error={error} />
    </Container>
  );
};

export default ListPage;
