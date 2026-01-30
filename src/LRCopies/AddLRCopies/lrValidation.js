import * as Yup from 'yup';

export const lrValidationSchema = Yup.object({
  lrNo: Yup.string().required('LR number is required'),
  lrDate: Yup.string().required('LR date is required'),
  lrVehicleNo: Yup.string().required('Vehicle number is required'),
  startPoint: Yup.string().required('From location is required'),
  destination: Yup.string().required('To location is required'),
  weight: Yup.number()
    .typeError('Weight must be a number')
    .required('Weight is required'),
  consigneeName: Yup.string().required('Consignee name is required'),
  consigneeAddress: Yup.string().required('Consignee address is required'),
  description: Yup.string().required('Goods description is required'),
});
