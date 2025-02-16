import PropTypes from 'prop-types';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import useStore from '../store/store';
import { getValidationSchema } from '../utils/validationSchemas';
import {
  formSteps,
  getCategoryFields,
  getInitialValues,
} from '../utils/formFields';
import AdFormStep from './AdFormStep';
import AdFormNavigation from './AdFormNavigation';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const AdForm = ({ isEditing, adData }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(adData?.type || '');
  const { addAd, updateAd } = useStore();
  const navigate = useNavigate();

  const currentStep = formSteps.find((s) => s.step === step);
  const categoryFields = getCategoryFields(type);

  const initialValues = getInitialValues(adData);

  const handleSubmit = async (values, actions) => {
    try {
      const filteredValues = {
        name: values.name,
        description: values.description,
        location: values.location,
        image: values.image,
        type: values.type,
        ...Object.fromEntries(
          categoryFields.map((field) => [field.name, values[field.name] || ''])
        ),
      };

      if (isEditing) {
        await updateAd(adData.id, filteredValues);
      } else {
        await addAd(filteredValues);
      }

      navigate('/list');
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.error(error.message);
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={getValidationSchema(step, type)}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values, actions) => {
        if (step < formSteps.length) {
          setStep(step + 1);
        } else {
          handleSubmit(values, actions);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <Typography variant="h4" component="h1" gutterBottom>
            {`${isEditing ? 'Редактировать' : 'Создать'} объявление`}
          </Typography>
          {currentStep && (
            <AdFormStep
              fields={
                currentStep.categories
                  ? getCategoryFields(values.type)
                  : currentStep.fields
              }
              setType={!currentStep.categories ? setType : undefined}
            />
          )}
          <AdFormNavigation step={step} setStep={setStep} />
        </Form>
      )}
    </Formik>
  );
};

AdForm.propTypes = {
  isEditing: PropTypes.bool,
  adData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default AdForm;
