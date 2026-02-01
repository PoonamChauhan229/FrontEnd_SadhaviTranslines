import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { url } from '../../utils/constants';

/* ---------------- Success Modal ---------------- */
const CreateLRSuccess = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg text-center w-72">
        <h2 className="text-green-600 font-semibold mb-2">
          LR Created 🎉
        </h2>

        <button
          onClick={onClose}
          className="mt-3 bg-blue-500 text-white px-5 py-1.5 rounded text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
};

/* ---------------- Main Component ---------------- */
const CreateLR = () => {
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [showClients, setShowClients] = useState(false);

  const [goodsSuggestions, setGoodsSuggestions] = useState([]);
  const [showGoods, setShowGoods] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const initialValues = {
    lrNo: '',
    lrDate: '',
    lrVehicleNo: '',
    startPoint: '',
    destination: '',
    weight: '',
    consigneeName: '',
    consigneeAddress: '',
    description: '',
  };

  const validationSchema = Yup.object({
    lrNo: Yup.string().required('LR No required'),
    lrDate: Yup.date().required('LR Date required'),
    lrVehicleNo: Yup.string().required('Vehicle No required'),
    startPoint: Yup.string().required('From required'),
    destination: Yup.string().required('To required'),
    weight: Yup.string().required('Weight required'),
    consigneeName: Yup.string().required('Consignee name required'),
    consigneeAddress: Yup.string().required('Consignee address required'),
    description: Yup.string().required('Description required'),
  });

  /* -------- Client auto fetch -------- */
  const handleClientSearch = async (query) => {
    if (!query) return;
    const res = await axios.get(`${url}/clients`, { params: { query } });
    setClientSuggestions(res.data);
    setShowClients(true);
  };

  const selectClient = (client, setFieldValue) => {
    setFieldValue('consigneeName', client.name);
    setFieldValue('consigneeAddress', client.address);
    setShowClients(false);
  };

  /* -------- Goods auto fetch -------- */
  const handleGoodsSearch = async (query) => {
    if (!query) return;
    const res = await axios.get(`${url}/goods`, { params: { query } });
    setGoodsSuggestions(res.data);
    setShowGoods(true);
  };

  const selectGoods = (goods, setFieldValue) => {
    setFieldValue('description', goods.description_goods);
    setShowGoods(false);
  };

  /* -------- Submit -------- */
  const handleSubmit = async (values, { resetForm }) => {
    await axios.post(`${url}/create-lr`, values);
    setShowSuccess(true);
    resetForm();
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Create LR</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {[
                ['lrNo', 'text', 'LR No'],
                ['lrDate', 'date', 'LR Date'],
                ['lrVehicleNo', 'text', 'Vehicle No'],
                ['startPoint', 'text', 'From'],
                ['destination', 'text', 'To'],
                ['weight', 'text', 'Weight'],
              ].map(([name, type, label]) => (
                <div key={name}>
                  <label className="text-sm font-medium">{label}</label>
                  <Field name={name} type={type} className="w-full border rounded px-2 py-1.5 text-sm" />
                  <ErrorMessage name={name} component="div" className="text-red-500 text-xs" />
                </div>
              ))}

              {/* Consignee Name */}
              <div className="relative lg:col-span-2">
                <label className="text-sm font-medium">Consignee Name</label>
                <Field
                  name="consigneeName"
                  type="text"
                  className="w-full border rounded px-2 py-1.5 text-sm"
                  onChange={(e) => {
                    setFieldValue('consigneeName', e.target.value);
                    handleClientSearch(e.target.value);
                  }}
                />

                {showClients && (
                  <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {clientSuggestions.map(c => (
                      <li
                        key={c._id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => selectClient(c, setFieldValue)}
                      >
                        {c.name} – {c.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Address */}
              <div className="lg:col-span-3">
                <label className="text-sm font-medium">Consignee Address</label>
                <Field name="consigneeAddress" className="w-full border rounded px-2 py-1.5 text-sm" />
              </div>

              {/* Description */}
              <div className="relative lg:col-span-3">
                <label className="text-sm font-medium">Description</label>
                <Field
                  name="description"
                  className="w-full border rounded px-2 py-1.5 text-sm"
                  onChange={(e) => {
                    setFieldValue('description', e.target.value);
                    handleGoodsSearch(e.target.value);
                  }}
                />

                {showGoods && (
                  <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {goodsSuggestions.map(g => (
                      <li
                        key={g._id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => selectGoods(g, setFieldValue)}
                      >
                        {g.description_goods}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="lg:col-span-3 text-right mt-3">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                  Create LR
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      <CreateLRSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default CreateLR;
