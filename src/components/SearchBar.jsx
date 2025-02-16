import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const SearchBar = ({ value, onChange, label }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
