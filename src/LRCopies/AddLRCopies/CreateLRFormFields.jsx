import { Field, ErrorMessage } from 'formik';

const CreateLRFormFields = ({ setFieldValue, errors, submitCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <Field
            name={name}
            type={type}
            className="w-full border rounded px-2 py-1.5 text-sm"
          />
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 text-[11px] min-h-[12px]"
          />
        </div>
      ))}

      <div className="lg:col-span-2">
        <label className="text-sm font-medium">Consignee Name</label>
        <Field
          name="consigneeName"
          type="text"
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
        <ErrorMessage
          name="consigneeName"
          component="div"
          className="text-red-500 text-[11px] min-h-[12px]"
        />
      </div>

      <div className="lg:col-span-3">
        <label className="text-sm font-medium">Consignee Address</label>
        <Field
          name="consigneeAddress"
          type="text"
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
        <ErrorMessage
          name="consigneeAddress"
          component="div"
          className="text-red-500 text-[11px] min-h-[12px]"
        />
      </div>

      <div className="lg:col-span-3">
        <label className="text-sm font-medium">Description</label>
        <Field
          name="description"
          as="textarea"
          rows={3}
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-[11px] min-h-[12px]"
        />
      </div>
    </div>
  );
};

export default CreateLRFormFields;
