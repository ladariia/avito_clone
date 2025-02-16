import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';

const AdFormField = ({ field, setType }) => {
  const { values, handleChange, setFieldTouched, errors, touched } =
    useFormikContext();

  const handleTypeChange = (e) => {
    handleChange(e);
    setType(e.target.value);
  };

  return (
    <>
      {field.type === 'select' ? (
        <TextField
          select
          label={field.label}
          name={field.name}
          value={values[field.name] || ''}
          onChange={field.name === 'type' ? handleTypeChange : handleChange}
          onBlur={() => setFieldTouched(field.name, true)} // ✅ Фикс для фокуса
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
        >
          {field.options.map((option, index) => (
            <MenuItem
              key={option.value || index}
              value={option.value || option}
            >
              {option.label || option}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          label={field.label}
          name={field.name}
          value={values[field.name] || ''}
          onChange={handleChange}
          onBlur={() => setFieldTouched(field.name, true)} // ✅ Фикс для фокуса
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
        />
      )}
    </>
  );
};

AdFormField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'select']).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
      ])
    ),
  }).isRequired,
  setType: PropTypes.func,
};

export default AdFormField;
