import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

// Function to convert number to words
const numberToWords = (num) => {
  // ... (same as your existing numberToWords function)
};

const InvoiceForm = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get('/api/clients', { params: { query } });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleAddressChange = (e, setFieldValue) => {
    const query = e.target.value;
    setFieldValue('address', query);
    if (query.length > 2) {
      fetchSuggestions(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion, setFieldValue) => {
    setFieldValue('address', suggestion.address);
    setShowSuggestions(false);
  };

  const initialValues = {
    // ... (same as your existing initialValues)
  };

  const validationSchema = Yup.object().shape({
    // ... (same as your existing validationSchema)
  });

  const handleRateChange = (setFieldValue, rate) => {
    // ... (same as your existing handleRateChange function)
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='absolute top-10 left-[19%] right-0 px-4'>
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="p-5">
                      <h1 className="text-gray-900 mb-3 text-xl font-semibold">Add Invoice</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* ... (other form fields) */}
                        <div className="form-group relative">
                          <label htmlFor="address" className="form-label">Address</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            onChange={(e) => handleAddressChange(e, setFieldValue)}
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                          {showSuggestions && (
                            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
                              {suggestions.map((suggestion) => (
                                <li
                                  key={suggestion._id}
                                  onClick={() => handleSuggestionClick(suggestion, setFieldValue)}
                                  className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {suggestion.address}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {/* ... (other form fields) */}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                          Create Invoice
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

export default InvoiceForm;
