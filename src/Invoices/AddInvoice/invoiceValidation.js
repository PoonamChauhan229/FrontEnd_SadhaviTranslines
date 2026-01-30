import * as Yup from 'yup';

export const invoiceValidationSchema = Yup.object({
  date_lr: Yup.string().required('Date LR is required'),
  bill_no: Yup.string().required('Bill No is required'),
  lr_no: Yup.string().required('LR No is required'),
  vehicle_no: Yup.string().required('Vehicle No is required'),
  description_of_goods: Yup.string().required('Description of goods is required'),
  address: Yup.string().required('Address is required'),
  weight: Yup.number().typeError('Weight must be a number').required('Weight is required'),
  rate: Yup.number().typeError('Rate must be a number').required('Rate is required'),
  from: Yup.string().required('From place is required'),
  to: Yup.string().required('To place is required'),
});
