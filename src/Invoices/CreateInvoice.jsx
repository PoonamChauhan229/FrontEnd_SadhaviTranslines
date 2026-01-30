import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { url } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

/* ---------- Number to words ---------- */
const numberToWords = (num) => {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const toWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
    if (n < 1000) return `${a[Math.floor(n / 100)]} Hundred ${toWords(n % 100)}`.trim();
    if (n < 100000) return `${toWords(Math.floor(n / 1000))} Thousand ${toWords(n % 1000)}`.trim();
    return n;
  };

  const integer = Math.floor(num);
  const decimal = Math.round((num % 1) * 100);

  let words = `${toWords(integer)} Rupees`;
  if (decimal) words += ` and ${toWords(decimal)} Paise`;
  return `${words} Only`;
};

/* ---------- Component ---------- */
const CreateInvoice = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [goodsSuggestions, setGoodsSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [showGoodsSuggestions, setShowGoodsSuggestions] = useState(false);

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

  const validationSchema = Yup.object({
    date_lr: Yup.string().required(),
    bill_no: Yup.string().required(),
    lr_no: Yup.string().required(),
    vehicle_no: Yup.string().required(),
    description_of_goods: Yup.string().required(),
    weight: Yup.number().required(),
    rate: Yup.number().required(),
    address: Yup.string().required(),
    from: Yup.string().required(),
    to: Yup.string().required()
  });

  const handleRateChange = (setFieldValue, rate) => {
    const r = Number(rate);
    if (!r) return;

    const igst = ((r + 50) * 0.05).toFixed(2);
    const total = (r + 50 + Number(igst)).toFixed(2);

    setFieldValue('freight_amount', r);
    setFieldValue('igst_amount', igst);
    setFieldValue('total_amount', total);
    setFieldValue('amount_in_word', numberToWords(Number(total)));
  };

  const handleSubmit = async (values, { resetForm }) => {
    await axios.post(`${url}/addinvoice`, values);
    setShowSuccess(true);
    resetForm();
  };

  /* ---------- FIXED LAYOUT HERE ---------- */
  return (
    <div className="w-full px-6 py-6"> {/* ❌ no absolute */}
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-5">

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="flex justify-between mb-6">
                  <h1 className="text-xl font-semibold">Add Invoice</h1>
                  <button type="button" onClick={() => navigate('/viewinvoice')}>
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    ['date_lr', 'date', 'Date LR'],
                    ['bill_no', 'text', 'Bill No'],
                    ['lr_no', 'text', 'LR No'],
                    ['vehicle_no', 'text', 'Vehicle No'],
                    ['weight', 'text', 'Weight'],
                    ['from', 'text', 'From'],
                    ['to', 'text', 'To'],
                  ].map(([name, type, label]) => (
                    <div key={name}>
                      <label className="font-medium">{label}</label>
                      <Field name={name} type={type} className="w-full border p-2 rounded" />
                      <ErrorMessage name={name} className="text-red-500 text-sm" component="div" />
                    </div>
                  ))}

                  <div>
                    <label className="font-medium">Rate</label>
                    <Field
                      name="rate"
                      className="w-full border p-2 rounded"
                      onChange={(e) => {
                        setFieldValue('rate', e.target.value);
                        handleRateChange(setFieldValue, e.target.value);
                      }}
                    />
                  </div>

                  {['lr_charges', 'freight_amount', 'igst_amount', 'total_amount'].map((f) => (
                    <div key={f}>
                      <label className="font-medium capitalize">{f.replace('_', ' ')}</label>
                      <Field name={f} disabled className="w-full border p-2 rounded bg-gray-100" />
                    </div>
                  ))}

                  <div className="lg:col-span-3">
                    <label className="font-medium">Amount in Words</label>
                    <Field disabled name="amount_in_word" className="w-full border p-2 rounded bg-gray-100" />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => navigate('/viewinvoice')} className="px-4 py-2 bg-gray-200 rounded">
                    Back
                  </button>
                  <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
                    Create Invoice
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* ---------- POPUP ---------- */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center w-80">
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              Invoice Created 🎉
            </h2>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
