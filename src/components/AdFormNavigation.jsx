import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

const AdFormNavigation = ({ step, setStep }) => (
  <Stack
    direction="row"
    spacing={2}
    justifyContent="space-between"
    sx={{ m: 2, mx: 0 }}
  >
    {step > 1 ? (
      <Button onClick={() => setStep(step - 1)}>Назад</Button>
    ) : (
      <div />
    )}
    <Button type="submit">{step === 2 ? 'Отправить' : 'Далее'}</Button>
  </Stack>
);

AdFormNavigation.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default AdFormNavigation;
