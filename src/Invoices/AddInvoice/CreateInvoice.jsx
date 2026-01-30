import { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { url } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { invoiceValidationSchema } from './invoiceValidation';

import CreateInvoiceHeader from './CreateInvoiceHeader';
import CreateInvoiceFormFields from './CreateInvoiceFormFields';
import CreateInvoiceSuccess from './CreateInvoiceSuccess';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const initialValues = {
    date_lr: '',
    bill_no: '',
    lr_no: '',
    vehicle_no: '',
    description_of_goods: '',
    weight: '',
    rate: '',
    lr_charges: 50,
    freight_amount: '',
    igst_amount: '',
    total_amount: '',
    amount_in_word: '',
    address: '',
    from: '',
    to: ''
  };

  const handleSubmit = async (values, { resetForm }) => {
    await axios.post(`${url}/addinvoice`, values);
    setShowSuccess(true);
    resetForm();
  };

  return (
    <div className="w-full px-4 py-4 overflow-hidden">
      <div className="max-w-screen-lg mx-auto">
        <div className="bg-white shadow-md rounded-lg px-5 py-4">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={invoiceValidationSchema}
          >
            {({ setFieldValue, errors, submitCount }) => (
              <Form className="space-y-4">
                <CreateInvoiceHeader title="Add Invoice" />

                <CreateInvoiceFormFields
                  setFieldValue={setFieldValue}
                  errors={errors}
                  submitCount={submitCount}
                />

                <div className="flex justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => navigate('/viewinvoice')}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded"
                  >
                    Create Invoice
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <CreateInvoiceSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default CreateInvoice;
