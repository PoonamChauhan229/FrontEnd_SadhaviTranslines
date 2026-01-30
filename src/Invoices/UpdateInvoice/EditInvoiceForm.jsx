import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../../utils/constants";

const input =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";
const label = "block text-sm font-medium text-gray-700";

const EditInvoiceForm = ({ invoice, invoiceId, onSuccess }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        date_lr: invoice.date_lr || "",
        bill_no: invoice.bill_no || "",
        lr_no: invoice.lr_no || "",
        vehicle_no: invoice.vehicle_no || "",
        weight: invoice.weight || "",
        rate: invoice.rate || "",
        from: invoice.from || "",
        to: invoice.to || "",
        address: invoice.address || "",
        status: invoice.status || "",
        amt_recvd: invoice.amt_recvd || "",
      }}
      validationSchema={Yup.object({
        date_lr: Yup.date().required(),
        bill_no: Yup.string().required(),
        lr_no: Yup.string().required(),
        vehicle_no: Yup.string().required(),
        weight: Yup.number().required(),
        rate: Yup.number().required(),
        from: Yup.string().required(),
        to: Yup.string().required(),
        address: Yup.string().required(),
      })}
      onSubmit={async (values) => {
        await axios.put(`${url}/updateinvoice/${invoiceId}`, values);
        onSuccess();
      }}
    >
      <Form id="editInvoiceForm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {[
            ["date_lr", "date", "Date LR"],
            ["bill_no", "text", "Bill No"],
            ["lr_no", "text", "LR No"],
            ["vehicle_no", "text", "Vehicle No"],
            ["weight", "text", "Weight"],
            ["rate", "text", "Rate"],
            ["from", "text", "From"],
            ["to", "text", "To"],
            ["amt_recvd", "text", "Amount Received"],
          ].map(([name, type, labelText]) => (
            <div key={name}>
              <label className={label}>{labelText}</label>
              <Field name={name} type={type} className={input} />
              <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          ))}

          <div>
            <label className={label}>Payment Status</label>
            <Field as="select" name="status" className={input}>
              <option value="">Select</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </Field>
          </div>

          <div className="lg:col-span-3">
            <label className={label}>Address</label>
            <Field name="address" className={input} />
          </div>

        </div>
      </Form>
    </Formik>
  );
};

export default EditInvoiceForm;
