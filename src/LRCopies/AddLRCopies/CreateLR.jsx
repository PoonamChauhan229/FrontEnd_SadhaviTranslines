import { useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { url } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

import CreateLRHeader from './CreateLRHeader';
import CreateLRFormFields from './CreateLRFormFields';
import CreateLRSuccess from './CreateLRSuccess';
import { lrValidationSchema } from './lrValidation';

const CreateLR = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedImages, setGeneratedImages] = useState(null); // base64 images

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(`${url}/create-lr`, values);
      setGeneratedImages(res.data.images); // store base64 images
      setShowSuccess(true);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to create LR');
    }
  };

  return (
    <div className="w-full px-4 py-4 overflow-hidden">
      <div className="max-w-screen-lg mx-auto">
        <div className="bg-white shadow-md rounded-lg px-5 py-4">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnBlur
            validationSchema={lrValidationSchema}
          >
            {({ setFieldValue, errors, submitCount }) => (
              <Form className="space-y-4">
                <CreateLRHeader title="Add LR" />

                <CreateLRFormFields
                  setFieldValue={setFieldValue}
                  errors={errors}
                  submitCount={submitCount}
                />

                <div className="flex justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => navigate('/viewlr')}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded"
                  >
                    Create LR
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Generated LR Images */}
        {generatedImages && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(generatedImages).map(([key, base64]) => (
              <div key={key} className="flex flex-col items-center">
                <img
                  src={base64}
                  alt={key}
                  className="border w-full h-auto mb-2"
                />
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = base64;
                    link.download = `${key}-${Date.now()}.png`;
                    link.click();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Download {key.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateLRSuccess
        show={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate('/viewlr');
        }}
      />
    </div>
  );
};

export default CreateLR;
