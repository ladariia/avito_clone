import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Категория"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilterSelect;
