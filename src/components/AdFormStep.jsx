import PropTypes from 'prop-types';
import AdFormField from './AdFormField';
import { Stack } from '@mui/material';

const AdFormStep = ({ fields, setType }) => (
  <Stack spacing={2}>
    {fields.map((field) => (
      <AdFormField key={field.name} field={field} setType={setType} />
    ))}
  </Stack>
);

AdFormStep.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setType: PropTypes.func,
};

export default AdFormStep;
