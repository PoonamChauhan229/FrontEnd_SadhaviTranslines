import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../../utils/constants";
import { useState } from "react";


const input =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";
const label = "block text-sm font-medium text-gray-700";

const EditInvoiceForm = ({ invoice, invoiceId, onSuccess }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);

  const handleAddressFetch = async (query) => {
    if (!query) {
      setShowAddressSuggestions(false);
      return;
    }

    const res = await axios.get(`${url}/clients`, {
      params: { query },
    });

    setAddressSuggestions(res.data);
    setShowAddressSuggestions(true);
  };

  if (!invoice) return null;

  // Format date for input type="date"
  const formattedInvoiceDate = invoice.date_lr
    ? new Date(invoice.date_lr).toISOString().split("T")[0]
    : "";

  return (
    <Formik
      initialValues={{
        date_lr: formattedInvoiceDate,
        bill_no: invoice.bill_no || "",
        lr_no: invoice.lr_no || "",
        vehicle_no: invoice.vehicle_no || "",
        weight: invoice.weight || "",
        rate: invoice.rate || "",
        from: invoice.from || "",
        to: invoice.to || "",
        address: invoice.address || "",
        payment_status: invoice.payment_status || "",
        amt_recvd: invoice.amt_recvd || "",
      }}
      validationSchema={Yup.object({
        date_lr: Yup.date().required("Date LR is required"),
        bill_no: Yup.string().required("Bill No is required"),
        lr_no: Yup.string().required("LR No is required"),
        vehicle_no: Yup.string().required("Vehicle No is required"),
        weight: Yup.number().required("Weight is required"),
        rate: Yup.number().required("Rate is required"),
        from: Yup.string().required("From is required"),
        to: Yup.string().required("To is required"),
        address: Yup.string().required("Address is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await axios.put(`${url}/updateinvoice/${invoiceId}`, values);
          onSuccess();
        } catch (error) {
          console.error("Failed to update invoice:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form id="editInvoiceForm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Text and date inputs */}
            {[
              ["date_lr", "date", "Date LR"],
              ["bill_no", "text", "Bill No"],
              ["lr_no", "text", "LR No"],
              ["vehicle_no", "text", "Vehicle No"],
              ["weight", "number", "Weight"],
              ["rate", "number", "Rate"],
              ["from", "text", "From"],
              ["to", "text", "To"],
              ["amt_recvd", "number", "Amount Received"],
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

            {/* Payment Status Select */}
            <div>
              <label className={label}>Payment Status</label>
              <Field as="select" name="payment_status" className={input}>
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </Field>
              <ErrorMessage
                name="payment_status"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Address */}
            <div className="lg:col-span-3 relative">
            <label className={label}>Address</label>

            <Field name="address">
              {({ field, form }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={input}
                    onChange={(e) => {
                      form.setFieldValue("address", e.target.value);
                      handleAddressFetch(e.target.value);
                    }}
                    onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 150)}
                  />

                  {showAddressSuggestions && (
                    <ul className="absolute z-20 w-full bg-white border rounded shadow max-h-40 overflow-auto">
                      {addressSuggestions.map((a) => (
                        <li
                          key={a._id}
                          className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                          onMouseDown={() => {
                            // ✅ THIS is the fix
                            form.setFieldValue(
                              "address",
                              `${a.name} ${a.address}`
                            );
                            setShowAddressSuggestions(false);
                          }}
                        >
                          {a.name} – {a.address}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </Field>

            <ErrorMessage
              name="address"
              component="p"
              className="text-red-500 text-sm"
            />
</div>



          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditInvoiceForm;
