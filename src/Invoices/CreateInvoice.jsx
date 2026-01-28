import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { url } from '../utils/constants';
import { useNavigate } from 'react-router-dom';


// Function to convert number to words
const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
    'Eighteen', 'Nineteen'
  ];
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const toWords = (num) => {
    if (num < 20) return a[num];
    if (num < 100) return `${b[Math.floor(num / 10)]} ${a[num % 10]}`.trim();
    if (num < 1000) return `${a[Math.floor(num / 100)]} Hundred ${toWords(num % 100)}`.trim();
    if (num < 100000) return `${toWords(Math.floor(num / 1000))} Thousand ${toWords(num % 1000)}`.trim();
    return num.toString();
  };

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num % 1) * 100);

  let words = `${toWords(integerPart)} Rupees`;

  if (decimalPart > 0) {
    words += ` and ${toWords(decimalPart)} Paise`;
  }

  words += ' Only';
  return words;
};

const CreateInvoice = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const [address_suggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);

  const [goods_suggestions, setGoodsSuggestions] = useState([]);
  const [showGoodsSuggestions, setShowGoodsSuggestions] = useState(false);

  const initialValues = {
    date_lr: '',
    lr_no: '',
    vehicle_no: '',
    description_of_goods: '',
    weight: '',
    rate: '',
    lr_charges: 50.0,
    freight_amount: '',
    igst_amount: '',
    total_amount: '',
    bill_no: '',
    address: '',
    amount_in_word: '',
    from: '',
    to: ''
  };

  const validationSchema = Yup.object().shape({
    date_lr: Yup.date().required('Please provide a valid date LR.'),
    lr_no: Yup.string().required('Please provide the LR number.'),
    vehicle_no: Yup.string().required('Please provide the vehicle number.'),
    description_of_goods: Yup.string().required('Please provide a description of the goods.'),
    weight: Yup.number().required('Please provide the weight of the goods.'),
    rate: Yup.number().required('Please provide the LR rate.'),
    lr_charges: Yup.number().required('Please provide the LR charges.'),
    freight_amount: Yup.number().required('Please provide the freight amount.'),
    igst_amount: Yup.number().required('Please provide the IGST amount.'),
    total_amount: Yup.number().required('Please provide the total amount.'),
    bill_no: Yup.string().required('Please provide the bill number.'),
    address: Yup.string().required('Please provide the address.'),
    amount_in_word: Yup.string().required('Please provide the amount in words.'),
    from: Yup.string().required('Please provide the from location.'),
    to: Yup.string().required('Please provide the to location.')
  });

  const handleRateChange = (setFieldValue, rate) => {
    const rateValue = parseFloat(rate);
    if (!isNaN(rateValue)) {
      const freight_amount = rateValue;
      const lr_charges = 50;
      const igst_amount = ((rateValue + lr_charges) * 0.05).toFixed(2);
      const total_amount = (rateValue + lr_charges + parseFloat(igst_amount)).toFixed(2);
      const amount_in_word = numberToWords(parseFloat(total_amount));

      setFieldValue('freight_amount', freight_amount);
      setFieldValue('igst_amount', igst_amount);
      setFieldValue('total_amount', total_amount);
      setFieldValue('amount_in_word', amount_in_word);
    }
  };

  // Address suggestions
  const handleAddressChange = async (query) => {
    const response = await axios.get(`${url}/clients`, { params: { query } });
    setAddressSuggestions(response.data);
    setShowAddressSuggestions(true);
  };

  const handleSuggestionClick = (suggestion, setFieldValue) => {
    setFieldValue('address', `${suggestion.name} ${suggestion.address}`);
    setShowAddressSuggestions(false);
  };

  // Goods suggestions
  const handleGoodsChange = async (query) => {
    const response = await axios.get(`${url}/goods`, { params: { query } });
    setGoodsSuggestions(response.data);
    setShowGoodsSuggestions(true);
  };

  const handleSuggestionGoodsClick = (suggestion, setFieldValue) => {
    setFieldValue('description_of_goods', suggestion.description_goods);
    setShowGoodsSuggestions(false);
  };

const handleSubmit = async (values, { resetForm }) => {
  try {
    await axios.post(`${url}/addinvoice`, values);

    // show popup
    setShowSuccess(true);

    // clear form
    resetForm();
  } catch (error) {
    console.error(error);
  }
};


  const handleClose = () => {
    navigate('/viewinvoice');
  };

  return (
    <div className="absolute top-10 left-[19%] right-0 px-4">
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                  <Form className="p-5">
                    <div className="flex justify-between mb-5">
                      <h1 className="text-gray-900 text-xl font-semibold">Add Invoice</h1>
                      <button type="button" onClick={handleClose} className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Date LR */}
                      <div>
                        <label htmlFor="date_lr" className="block mb-1 font-medium">Date LR</label>
                        <Field type="date" id="date_lr" name="date_lr" className="w-full border rounded p-2" />
                        <ErrorMessage name="date_lr" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* Bill No */}
                      <div>
                        <label htmlFor="bill_no" className="block mb-1 font-medium">Bill No</label>
                        <Field type="text" id="bill_no" name="bill_no" className="w-full border rounded p-2" />
                        <ErrorMessage name="bill_no" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* LR No */}
                      <div>
                        <label htmlFor="lr_no" className="block mb-1 font-medium">LR No</label>
                        <Field type="text" id="lr_no" name="lr_no" className="w-full border rounded p-2" />
                        <ErrorMessage name="lr_no" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* Vehicle No */}
                      <div>
                        <label htmlFor="vehicle_no" className="block mb-1 font-medium">Vehicle No</label>
                        <Field type="text" id="vehicle_no" name="vehicle_no" className="w-full border rounded p-2" />
                        <ErrorMessage name="vehicle_no" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* Description of Goods */}
                      <div className="relative">
                        <label htmlFor="description_of_goods" className="block mb-1 font-medium">Description of Goods</label>
                        <Field
                          type="text"
                          id="description_of_goods"
                          name="description_of_goods"
                          className="w-full border rounded p-2"
                          onChange={(e) => {
                            const val = e.target.value;
                            setFieldValue('description_of_goods', val);
                            handleGoodsChange(val);
                          }}
                        />
                        <ErrorMessage name="description_of_goods" component="div" className="text-red-500 text-sm" />
                        {showGoodsSuggestions && (
                          <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
                            {goods_suggestions.map((el) => (
                              <li
                                key={el._id}
                                onClick={() => handleSuggestionGoodsClick(el, setFieldValue)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                              >
                                {el.description_goods}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Weight */}
                      <div>
                        <label htmlFor="weight" className="block mb-1 font-medium">Weight</label>
                        <Field type="text" id="weight" name="weight" className="w-full border rounded p-2" />
                        <ErrorMessage name="weight" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* Rate */}
                      <div>
                        <label htmlFor="rate" className="block mb-1 font-medium">Rate</label>
                        <Field
                          type="text"
                          id="rate"
                          name="rate"
                          className="w-full border rounded p-2"
                          onChange={(e) => {
                            const val = e.target.value;
                            setFieldValue('rate', val);
                            handleRateChange(setFieldValue, val);
                          }}
                        />
                        <ErrorMessage name="rate" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* LR Charges */}
                      <div>
                        <label htmlFor="lr_charges" className="block mb-1 font-medium">LR Charges</label>
                        <Field type="text" id="lr_charges" name="lr_charges" className="w-full border rounded p-2 bg-gray-100" disabled />
                      </div>

                      {/* Freight Amount */}
                      <div>
                        <label htmlFor="freight_amount" className="block mb-1 font-medium">Freight Amount</label>
                        <Field type="text" id="freight_amount" name="freight_amount" className="w-full border rounded p-2 bg-gray-100" disabled />
                      </div>

                      {/* IGST Amount */}
                      <div>
                        <label htmlFor="igst_amount" className="block mb-1 font-medium">IGST Amount (5%)</label>
                        <Field type="text" id="igst_amount" name="igst_amount" className="w-full border rounded p-2 bg-gray-100" disabled />
                      </div>

                      {/* Total Amount */}
                      <div>
                        <label htmlFor="total_amount" className="block mb-1 font-medium">Total Amount</label>
                        <Field type="text" id="total_amount" name="total_amount" className="w-full border rounded p-2 bg-gray-100" disabled />
                      </div>

                      {/* Amount in Words */}
                      <div className="col-span-3">
                        <label htmlFor="amount_in_word" className="block mb-1 font-medium">Amount in Words</label>
                        <Field type="text" id="amount_in_word" name="amount_in_word" className="w-full border rounded p-2 bg-gray-100" disabled />
                      </div>

                      {/* Address */}
                      <div className="relative">
                        <label htmlFor="address" className="block mb-1 font-medium">Address</label>
                        <Field
                          type="text"
                          id="address"
                          name="address"
                          className="w-full border rounded p-2"
                          onChange={(e) => {
                            const val = e.target.value;
                            setFieldValue('address', val);
                            handleAddressChange(val);
                          }}
                        />
                        <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                        {showAddressSuggestions && (
                          <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
                            {address_suggestions.map((el) => (
                              <li
                                key={el._id}
                                onClick={() => handleSuggestionClick(el, setFieldValue)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                              >
                                {el.name} {el.address}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* From */}
                      <div>
                        <label htmlFor="from" className="block mb-1 font-medium">From</label>
                        <Field type="text" id="from" name="from" className="w-full border rounded p-2" />
                        <ErrorMessage name="from" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* To */}
                      <div>
                        <label htmlFor="to" className="block mb-1 font-medium">To</label>
                        <Field type="text" id="to" name="to" className="w-full border rounded p-2" />
                        <ErrorMessage name="to" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => navigate('/viewinvoice')}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>

                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
                      >
                        Create Invoice
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center">
      <h2 className="text-xl font-semibold text-green-600 mb-2">
        Invoice Created 🎉
      </h2>
      <p className="text-gray-600 mb-4">
        The invoice has been created successfully.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
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
