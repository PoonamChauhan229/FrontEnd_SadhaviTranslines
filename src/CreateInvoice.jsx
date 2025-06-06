import  { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { url } from './utils/constants';
import { useNavigate } from 'react-router-dom';


// Function to convert number to words
const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
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
  const navigate=useNavigate()
  const [address_suggestions, setaddress_Suggestions] = useState([]);
  const [showaddress_Suggestions, setShowaddress_Suggestions] = useState(false);

  const [goods_suggestions, setgoods_Suggestions] = useState([]);
  const [showgoods_Suggestions, setShowgoods_Suggestions] = useState(false);

  const initialValues = {
    date_lr: '',
    lr_no: '',
    vehicle_no: '',
    description_of_goods: '',
    weight: '',
    rate: '',
    lr_charges: 50.00,
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
      const igst_amount = ((rateValue +lr_charges)* 0.05).toFixed(2);      
      const total_amount = (rateValue + lr_charges + parseFloat(igst_amount)).toFixed(2);
      const amount_in_word = numberToWords(parseFloat(total_amount));

      setFieldValue('freight_amount', freight_amount);
      setFieldValue('igst_amount', igst_amount);
      setFieldValue('total_amount', total_amount);
      setFieldValue('amount_in_word', amount_in_word);
    }
  };

  // address
  const handleAddressChange=async(query)=>{
    console.log(query)
    const response = await axios.get(`${url}/clients`, { params: { query } });
    console.log(response.data)
    setaddress_Suggestions(response.data)
    setShowaddress_Suggestions(true)
  }

  const handleSuggestionClick = (suggestion, setFieldValue) => {
  
    setFieldValue('address', suggestion.name+" "+suggestion.address);
    console.log(suggestion.name)  
    setShowaddress_Suggestions(false);
    };

  // goods
  const handleGoodsChange=async(query)=>{
    console.log(query)
    const response = await axios.get(`${url}/goods`, { params: { query } });
    console.log(response.data)
    setgoods_Suggestions(response.data)
    setShowgoods_Suggestions(true)
  }

  const handleSuggestionGoodsClick = (suggestion, setFieldValue) => {
    setFieldValue('description_of_goods', suggestion.description_goods);
    setShowgoods_Suggestions(false);
  };
  const handleSubmit = (values) => {
    console.log(values);
    postInvoices(values)
  };

  const postInvoices=async(invoice)=>{
    await axios.post(`${url}/addinvoice`,invoice)
  }
  const handleClose=()=>{
    navigate('/viewinvoice')
  }

  return (
    <div className='absolute top-10 left-[19%] right-0 px-4'>
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="p-5 ">
                      <div className='flex justify-between'>
                        <h1 className="text-gray-900 mb-3 text-xl font-semibold">
                          Add Invoice
                        </h1>
                        <button
                        type="button"
                        className=" text-gray-600 hover:text-gray-900"
                        onClick={handleClose}
                        >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="form-group">
                          <label htmlFor="date_lr" className="form-label">Date LR</label>
                          <Field type="date" className="form-control" id="date_lr" name="date_lr" />
                          <ErrorMessage name="date_lr" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="bill_no" className="form-label">Bill No</label>
                          <Field type="text" className="form-control" id="bill_no" name="bill_no" />
                          <ErrorMessage name="bill_no" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lr_no" className="form-label">LR No</label>
                          <Field type="text" className="form-control" id="lr_no" name="lr_no" />
                          <ErrorMessage name="lr_no" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vehicle_no" className="form-label">Vehicle No</label>
                          <Field type="text" className="form-control" id="vehicle_no" name="vehicle_no" />
                          <ErrorMessage name="vehicle_no" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description_of_goods" className="form-label">Description of Goods</label>
                          <Field type="text" className="form-control" id="description_of_goods" name="description_of_goods" 
                          onChange={(e)=>{
                            const description_of_goods=e.target.value;
                            setFieldValue('description_of_goods',description_of_goods)
                            handleGoodsChange(description_of_goods)
                            }
                          }
                          />
                          <ErrorMessage name="description_of_goods" component="div" className="text-red-500 text-sm" />
                          {showgoods_Suggestions && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-[29%] mt-1 max-h-40 overflow-y-auto">
                              {goods_suggestions.map((element) => (
                                <li
                                  key={element._id}
                                  onClick={() => handleSuggestionGoodsClick(element, setFieldValue)}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {element.description_goods}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="weight" className="form-label">Weight</label>
                          <Field type="text" className="form-control" id="weight" name="weight" />
                          <ErrorMessage name="weight" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="rate" className="form-label">Rate</label>
                          <Field type="text" className="form-control" id="rate" name="rate" onChange={(e) => {
                            const rate = e.target.value;
                            setFieldValue('rate', rate);
                            handleRateChange(setFieldValue, rate);
                          }} />
                          <ErrorMessage name="rate" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lr_charges" className="form-label">LR Charges</label>
                          <Field type="text" className="form-control" id="lr_charges" name="lr_charges" value={initialValues.lr_charges} disabled />
                          <ErrorMessage name="lr_charges" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="freight_amount" className="form-label">Freight Amount</label>
                          <Field type="text" className="form-control" id="freight_amount" name="freight_amount" disabled />
                          <ErrorMessage name="freight_amount" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="igst_amount" className="form-label">IGST Amount (5%)</label>
                          <Field type="text" className="form-control" id="igst_amount" name="igst_amount" disabled />
                          <ErrorMessage name="igst_amount" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="total_amount" className="form-label">Total Amount</label>
                          <Field type="text" className="form-control" id="total_amount" name="total_amount" disabled />
                          <ErrorMessage name="total_amount" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="amount_in_word" className="form-label">Amount in Words</label>
                          <Field type="text" className="form-control" id="amount_in_word" name="amount_in_word" disabled />
                          <ErrorMessage name="amount_in_word" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address" className="form-label">Address</label>
                          <Field type="text" className="form-control" id="address" name="address" 
                          onChange={(e)=>{
                            const address=e.target.value;
                            setFieldValue('address',address)
                            handleAddressChange(address)
                          }
                          }
                          />
                          
                          <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                          {showaddress_Suggestions && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-[30%] mt-1 max-h-40 overflow-y-auto">
                              {address_suggestions.map((element) => (
                                <li
                                  key={element._id}
                                  onClick={() => handleSuggestionClick(element, setFieldValue)}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {element.name}{" "}{element.address}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="from" className="form-label">From</label>
                          <Field type="text" className="form-control" id="from" name="from" />
                          <ErrorMessage name="from" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="to" className="form-label">To</label>
                          <Field type="text" className="form-control" id="to" name="to" />
                          <ErrorMessage name="to" component="div" className="text-red-500 text-sm" />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={()=>navigate('/viewinvoice')}
                        >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                          Back
                        </button>

                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                          Create Invoice
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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
