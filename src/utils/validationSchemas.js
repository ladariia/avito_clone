import * as Yup from 'yup';
import { getCategoryFields } from './formFields';

export const getValidationSchema = (step, type) => {
  const baseSchema = {
    1: Yup.object({
      name: Yup.string().required('Название обязательно'),
      description: Yup.string().required('Описание обязательно'),
      location: Yup.string().required('Локация обязательна'),
      image: Yup.string().url('Некорректная ссылка на фото').nullable(),
      type: Yup.string().required('Выберите категорию'),
    }),
    2: Yup.object(
      getCategoryFields(type).reduce((schema, field) => {
        let fieldSchema = Yup.mixed();

        if (field.type === 'text' || field.type === 'select') {
          fieldSchema = Yup.string();
        } else if (field.type === 'number') {
          fieldSchema = Yup.number()
            .typeError('Введите число')
            .positive('Число должно быть положительным');
        }

        if (!field.optional) {
          fieldSchema = fieldSchema.required(`Обязательное поле`);
        }

        return { ...schema, [field.name]: fieldSchema };
      }, {})
    ),
  };

  return baseSchema[step] || Yup.object();
};
