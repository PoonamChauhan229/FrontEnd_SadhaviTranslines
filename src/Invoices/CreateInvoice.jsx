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
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

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
  if (decimalPart > 0) words += ` and ${toWords(decimalPart)} Paise`;
  words += ' Only';
  return words;
};

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [goodsSuggestions, setGoodsSuggestions] = useState([]);
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

  const handleAddressChange = async (query) => {
    const response = await axios.get(`${url}/clients`, { params: { query } });
    setAddressSuggestions(response.data);
    setShowAddressSuggestions(true);
  };

  const handleSuggestionClick = (suggestion, setFieldValue) => {
    setFieldValue('address', `${suggestion.name} ${suggestion.address}`);
    setShowAddressSuggestions(false);
  };

  const handleGoodsChange = async (query) => {
    const response = await axios.get(`${url}/goods`, { params: { query } });
    setGoodsSuggestions(response.data);
    setShowGoodsSuggestions(true);
  };

  const handleSuggestionGoodsClick = (suggestion, setFieldValue) => {
    setFieldValue('description_of_goods', suggestion.description_goods);
    setShowGoodsSuggestions(false);
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${url}/addinvoice`, values);
      navigate('/viewinvoice');
    } catch (err) {
      console.error('Error creating invoice:', err);
    }
  };

  const handleClose = () => navigate('/viewinvoice');

  return (
    <div className="absolute top-10 left-[19%] right-0 px-4">
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <div className="p-5">
                      <div className="flex justify-between">
                        <h1 className="text-gray-900 mb-3 text-xl font-semibold">Add Invoice</h1>
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-900"
                          onClick={handleClose}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Date LR */}
                        <div className="form-group">
                          <label htmlFor="date_lr" className="form-label">
                            Date LR
                          </label>
                          <Field type="date" className="form-control" id="date_lr" name="date_lr" />
                          <ErrorMessage
                            name="date_lr"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Bill No */}
                        <div className="form-group">
                          <label htmlFor="bill_no" className="form-label">
                            Bill No
                          </label>
                          <Field type="text" className="form-control" id="bill_no" name="bill_no" />
                          <ErrorMessage
                            name="bill_no"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* LR No */}
                        <div className="form-group">
                          <label htmlFor="lr_no" className="form-label">
                            LR No
                          </label>
                          <Field type="text" className="form-control" id="lr_no" name="lr_no" />
                          <ErrorMessage
                            name="lr_no"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Vehicle No */}
                        <div className="form-group">
                          <label htmlFor="vehicle_no" className="form-label">
                            Vehicle No
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="vehicle_no"
                            name="vehicle_no"
                          />
                          <ErrorMessage
                            name="vehicle_no"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Description of Goods */}
                        <div className="form-group relative">
                          <label htmlFor="description_of_goods" className="form-label">
                            Description of Goods
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="description_of_goods"
                            name="description_of_goods"
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue('description_of_goods', value);
                              handleGoodsChange(value);
                            }}
                          />
                          <ErrorMessage
                            name="description_of_goods"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                          {showGoodsSuggestions && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
                              {goodsSuggestions.map((g) => (
                                <li
                                  key={g._id}
                                  onClick={() => handleSuggestionGoodsClick(g, setFieldValue)}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {g.description_goods}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Weight */}
                        <div className="form-group">
                          <label htmlFor="weight" className="form-label">
                            Weight
                          </label>
                          <Field type="text" className="form-control" id="weight" name="weight" />
                          <ErrorMessage
                            name="weight"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* Rate */}
                        <div className="form-group">
                          <label htmlFor="rate" className="form-label">
                            Rate
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="rate"
                            name="rate"
                            onChange={(e) => {
                              const rate = e.target.value;
                              setFieldValue('rate', rate);
                              handleRateChange(setFieldValue, rate);
                            }}
                          />
                          <ErrorMessage
                            name="rate"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        {/* LR Charges */}
                        <div className="form-group">
                          <label htmlFor="lr_charges" className="form-label">
                            LR Charges
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="lr_charges"
                            name="lr_charges"
                            value={values.lr_charges}
                            disabled
                          />
                        </div>

                        {/* Freight Amount */}
                        <div className="form-group">
                          <label htmlFor="freight_amount" className="form-label">
                            Freight Amount
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="freight_amount"
                            name="freight_amount"
                            disabled
                          />
                        </div>

                        {/* IGST Amount */}
                        <div className="form-group">
                          <label htmlFor="igst_amount" className="form-label">
                            IGST Amount (5%)
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="igst_amount"
                            name="igst_amount"
                            disabled
                          />
                        </div>

                        {/* Total Amount */}
                        <div className="form-group">
                          <label htmlFor="total_amount" className="form-label">
                            Total Amount
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="total_amount"
                            name="total_amount"
                            disabled
                          />
                        </div>

                        {/* Amount in Words */}
                        <div className="form-group">
                          <label htmlFor="amount_in_word" className="form-label">
                            Amount in Words
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="amount_in_word"
                            name="amount_in_word"
                            disabled
                          />
                        </div>

                        {/* Address */}
                        <div className="form-group relative">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue('address', value);
                              handleAddressChange(value);
                            }}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                          {showAddressSuggestions && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
                              {addressSuggestions.map((a) => (
                                <li
                                  key={a._id}
                                  onClick={() => handleSuggestionClick(a, setFieldValue)}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {a.name} {a.address}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* From */}
                        <div className="form-group">
                          <label htmlFor="from" className="form-label">
                            From
                          </label>
                          <Field type="text" className="form-control" id="from" name="from" />
                        </div>

                        {/* To */}
                        <div className="form-group">
                          <label htmlFor="to" className="form-label">
                            To
                          </label>
                          <Field type="text" className="form-control" id="to" name="to" />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={handleClose}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            ></path>
                          </svg>
                          Back
                        </button>

                        <button
                          type="submit"
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          Create Invoice
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
