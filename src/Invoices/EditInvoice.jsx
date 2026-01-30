import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { url } from "../utils/constants";
import { useParams, useNavigate } from "react-router-dom";

/* -------------------- Number to Words -------------------- */
const numberToWords = (num) => {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const toWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
    if (n < 1000) return `${a[Math.floor(n / 100)]} Hundred ${toWords(n % 100)}`.trim();
    if (n < 100000) return `${toWords(Math.floor(n / 1000))} Thousand ${toWords(n % 1000)}`.trim();
    return n.toString();
  };

  const integer = Math.floor(num);
  const decimal = Math.round((num % 1) * 100);
  let words = `${toWords(integer)} Rupees`;
  if (decimal > 0) words += ` and ${toWords(decimal)} Paise`;
  return words + " Only";
};

/* -------------------- Tailwind Styles -------------------- */
const input =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";
const label = "block text-sm font-medium text-gray-700";

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ popup state

  /* -------------------- Fetch Invoice -------------------- */
  useEffect(() => {
    axios.get(`${url}/editinvoice/${id}`).then((res) => {
      setInvoice(res.data[0]);
    });
  }, [id]);

  if (!invoice) return null;

  return (
    /* ROOT WRAPPER — fixes sidebar + navbar + scrollbar */
    <div className="relative flex-1 overflow-x-hidden">
      {/* Navbar offset */}
      <div className="pt-16 px-6 max-w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">

          {/* -------------------- Header -------------------- */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Edit Invoice
            </h1>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/viewinvoice")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                form="editInvoiceForm"
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update & Save
              </button>
            </div>
          </div>

          {/* -------------------- Form -------------------- */}
          <Formik
            enableReinitialize
            initialValues={{
              date_lr: invoice.date_lr,
              bill_no: invoice.bill_no,
              lr_no: invoice.lr_no,
              vehicle_no: invoice.vehicle_no,
              description_of_goods: invoice.description_of_goods,
              weight: invoice.weight,
              rate: invoice.rate,
              lr_charges: invoice.lr_charges,
              freight_amount: invoice.freight_amount,
              igst_amount: invoice.igst_amount,
              total_amount: invoice.total_amount,
              amount_in_word: invoice.amount_in_word,
              address: invoice.address,
              from: invoice.from,
              to: invoice.to,
              status: invoice.status || "",
              amt_recvd: invoice.amt_recvd || ""
            }}
            validationSchema={Yup.object({
              date_lr: Yup.date().required(),
              bill_no: Yup.string().required(),
              lr_no: Yup.string().required(),
              vehicle_no: Yup.string().required(),
              description_of_goods: Yup.string().required(),
              weight: Yup.number().required(),
              rate: Yup.number().required(),
              address: Yup.string().required(),
              from: Yup.string().required(),
              to: Yup.string().required()
            })}
            onSubmit={async (values) => {
              try {
                await axios.put(`${url}/updateinvoice/${id}`, values);
                setShowSuccess(true); // ✅ show popup instead of navigate
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ setFieldValue }) => (
              <Form id="editInvoiceForm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                  {[["date_lr", "date", "Date LR"],
                    ["bill_no", "text", "Bill No"],
                    ["lr_no", "text", "LR No"],
                    ["vehicle_no", "text", "Vehicle No"],
                    ["weight", "text", "Weight"],
                    ["rate", "text", "Rate"],
                    ["from", "text", "From"],
                    ["to", "text", "To"],
                    ["amt_recvd", "text", "Amount Received"]].map(([name, type, title]) => (
                      <div key={name}>
                        <label className={label}>{title}</label>
                        <Field
                          type={type}
                          name={name}
                          className={input}
                          onChange={(e) => {
                            if (name === "rate") {
                              const rate = parseFloat(e.target.value);
                              if (!isNaN(rate)) {
                                const igst = ((rate + 50) * 0.05).toFixed(2);
                                const total = (rate + 50 + parseFloat(igst)).toFixed(2);
                                setFieldValue("freight_amount", rate);
                                setFieldValue("igst_amount", igst);
                                setFieldValue("total_amount", total);
                                setFieldValue("amount_in_word", numberToWords(total));
                              }
                            }
                            setFieldValue(name, e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name={name}
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ))}

                  {/* Payment Status */}
                  <div>
                    <label className={label}>Payment Status</label>
                    <Field as="select" name="status" className={input}>
                      <option value="">Select</option>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </Field>
                  </div>

                  {/* Address */}
                  <div className="lg:col-span-3">
                    <label className={label}>Address</label>
                    <Field name="address" className={input} />
                  </div>

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* -------------------- Success Popup -------------------- */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-xl text-center max-h-[90vh] overflow-auto">
            <h2 className="text-green-600 font-semibold text-lg mb-2">
              Invoice Updated 🎉
            </h2>
            <p className="text-gray-700 mb-4">
              The invoice has been updated successfully.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/viewinvoice"); // navigate only after clicking OK
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInvoice;
