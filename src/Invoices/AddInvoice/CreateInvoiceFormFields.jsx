import { Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../utils/constants';

const numberToWords = (num) => {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const toWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
    if (n < 1000) return `${a[Math.floor(n / 100)]} Hundred ${toWords(n % 100)}`.trim();
    if (n < 100000) return `${toWords(Math.floor(n / 1000))} Thousand ${toWords(n % 1000)}`.trim();
    return n;
  };

  const integer = Math.floor(num);
  const decimal = Math.round((num % 1) * 100);

  let words = `${toWords(integer)} Rupees`;
  if (decimal) words += ` and ${toWords(decimal)} Paise`;
  return `${words} Only`;
};

const CreateInvoiceFormFields = ({ setFieldValue }) => {
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [goodsSuggestions, setGoodsSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [showGoodsSuggestions, setShowGoodsSuggestions] = useState(false);

  const handleRateChange = (rate) => {
    const r = Number(rate);
    if (!r) return;

    const lr = 50;
    const igst = ((r + lr) * 0.05).toFixed(2);
    const total = (r + lr + Number(igst)).toFixed(2);

    setFieldValue('freight_amount', r);
    setFieldValue('igst_amount', igst);
    setFieldValue('total_amount', total);
    setFieldValue('lr_charges', lr);
    setFieldValue('amount_in_word', numberToWords(total));
  };

  const handleFetch = async (path, query, setter, toggle) => {
    if (!query) return toggle(false);
    const res = await axios.get(`${url}/${path}`, { params: { query } });
    setter(res.data);
    toggle(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {[
        ['date_lr', 'date', 'Date LR'],
        ['bill_no', 'text', 'Bill No'],
        ['lr_no', 'text', 'LR No'],
        ['vehicle_no', 'text', 'Vehicle No'],
        ['weight', 'text', 'Weight'],
        ['from', 'text', 'From'],
        ['to', 'text', 'To'],
      ].map(([name, type, label]) => (
        <div key={name}>
          <label className="text-sm font-medium">{label}</label>
          <Field name={name} type={type} className="w-full border rounded px-2 py-1.5 text-sm" />
          <ErrorMessage name={name} component="div" className="text-red-500 text-[11px] min-h-[12px]" />
        </div>
      ))}

      {/* Rate */}
      <div>
        <label className="text-sm font-medium">Rate</label>
        <Field
          name="rate"
          className="w-full border rounded px-2 py-1.5 text-sm"
          onChange={(e) => {
            setFieldValue('rate', e.target.value);
            handleRateChange(e.target.value);
          }}
        />
        <ErrorMessage name="rate" component="div" className="text-red-500 text-[11px] min-h-[12px]" />
      </div>

      {['lr_charges', 'freight_amount', 'igst_amount', 'total_amount'].map((f) => (
        <div key={f}>
          <label className="text-sm font-medium capitalize">{f.replace('_', ' ')}</label>
          <Field disabled name={f} className="w-full border bg-gray-100 rounded px-2 py-1.5 text-sm" />
        </div>
      ))}

      <div className="lg:col-span-3">
        <label className="text-sm font-medium">Amount in Words</label>
        <Field disabled name="amount_in_word" className="w-full border bg-gray-100 rounded px-2 py-1.5 text-sm" />
      </div>

{/* Goods */}
<div className="relative">
  <label className="text-sm font-medium">Description of Goods</label>
  <Field name="description_of_goods">
    {({ field, form }) => (
      <input
        {...field}
        type="text"
        className="w-full border rounded px-2 py-1.5 text-sm"
        onChange={(e) => {
          form.setFieldValue('description_of_goods', e.target.value);
          handleFetch('goods', e.target.value, setGoodsSuggestions, setShowGoodsSuggestions);
        }}
        onBlur={() => setTimeout(() => setShowGoodsSuggestions(false), 150)}
      />
    )}
  </Field>
  <ErrorMessage name="description_of_goods" component="div" className="text-red-500 text-[11px] min-h-[12px]" />

  {showGoodsSuggestions && (
    <ul className="absolute z-20 w-full bg-white border rounded shadow max-h-32 overflow-auto">
      {goodsSuggestions.map((g) => (
        <li
          key={g._id}
          className="px-2 py-1.5 text-sm hover:bg-blue-50 cursor-pointer"
          onMouseDown={() => {   // <-- use onMouseDown here
            setFieldValue('description_of_goods', g.description_goods);
            setShowGoodsSuggestions(false);
          }}
        >
          {g.description_goods}
        </li>
      ))}
    </ul>
  )}
</div>

{/* Address */}
<div className="relative">
  <label className="text-sm font-medium">Address</label>
  <Field name="address">
    {({ field, form }) => (
      <input
        {...field}
        type="text"
        className="w-full border rounded px-2 py-1.5 text-sm"
        onChange={(e) => {
          form.setFieldValue('address', e.target.value);
          handleFetch('clients', e.target.value, setAddressSuggestions, setShowAddressSuggestions);
        }}
        onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 150)}
      />
    )}
  </Field>
  <ErrorMessage name="address" component="div" className="text-red-500 text-[11px] min-h-[12px]" />

  {showAddressSuggestions && (
    <ul className="absolute z-20 w-full bg-white border rounded shadow max-h-32 overflow-auto">
      {addressSuggestions.map((a) => (
        <li
          key={a._id}
          className="px-2 py-1.5 text-sm hover:bg-blue-50 cursor-pointer"
          onMouseDown={() => {  // <-- use onMouseDown here
            setFieldValue('address', `${a.name} ${a.address}`);
            setShowAddressSuggestions(false);
          }}
        >
          {a.name} – {a.address}
        </li>
      ))}
    </ul>
  )}
</div>




    </div>
  );
};

export default CreateInvoiceFormFields;
