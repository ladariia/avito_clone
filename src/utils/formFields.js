export const getInitialValues = (adData = {}) => ({
  name: adData.name || '',
  description: adData.description || '',
  location: adData.location || '',
  image: adData.image || '',
  type: adData.type || '',

  propertyType: adData.propertyType || '',
  area: adData.area || '',
  rooms: adData.rooms || '',
  price: adData.price || '',

  brand: adData.brand || '',
  model: adData.model || '',
  year: adData.year || '',
  mileage: adData.mileage || '',

  serviceType: adData.serviceType || '',
  experience: adData.experience || '',
  cost: adData.cost || '',
  workSchedule: adData.workSchedule || '',
});

export const formSteps = [
  {
    key: 'main',
    step: 1,
    label: 'Основные данные',
    fields: [
      { name: 'name', label: 'Название*', type: 'text' },
      { name: 'description', label: 'Описание*', type: 'text' },
      { name: 'location', label: 'Локация*', type: 'text' },
      { name: 'image', label: 'Ссылка на картинку/фото', type: 'text' },
      {
        name: 'type',
        label: 'Тип*',
        type: 'select',
        options: [
          { label: 'Недвижимость', value: 'Недвижимость' },
          { label: 'Авто', value: 'Авто' },
          { label: 'Услуги', value: 'Услуги' },
        ],
      },
    ],
  },
  {
    key: 'optional',
    step: 2,
    label: 'Дополнительные параметры',
    categories: [
      {
        value: 'Недвижимость',
        label: 'Недвижимость',
        fields: [
          {
            name: 'propertyType',
            label: 'Тип недвижимости*',
            type: 'select',
            options: ['Квартира', 'Дом', 'Коттедж'],
          },
          { name: 'area', label: 'Площадь (кв. м)*', type: 'number' },
          { name: 'rooms', label: 'Количество комнат*', type: 'number' },
          { name: 'price', label: 'Цена (₽)*', type: 'number' },
        ],
      },
      {
        value: 'Авто',
        label: 'Авто',
        fields: [
          {
            name: 'brand',
            label: 'Марка*',
            type: 'select',
            options: ['BMW', 'Mercedes', 'Audi'],
          },
          { name: 'model', label: 'Модель*', type: 'text' },
          { name: 'year', label: 'Год выпуска*', type: 'number' },
          { name: 'mileage', label: 'Пробег (км) ', type: 'number' },
        ],
      },
      {
        value: 'Услуги',
        label: 'Услуги',
        fields: [
          {
            name: 'serviceType',
            label: 'Тип услуги*',
            type: 'select',
            options: ['Ремонт', 'Уборка', 'Доставка'],
          },
          {
            name: 'experience',
            label: 'Опыт работы (в годах)*',
            type: 'number',
          },
          { name: 'cost', label: 'Стоимость (₽)*', type: 'number' },
          { name: 'workSchedule', label: 'График работы ', type: 'text' },
        ],
      },
    ],
  },
];

export const getCategoryFields = (type) => {
  const optionalStep = formSteps.find((step) => step.key === 'optional');
  return optionalStep?.categories.find((c) => c.value === type)?.fields || [];
};
