import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";

import EditInvoiceHeader from "./EditInvoiceHeader";
import EditInvoiceForm from "./EditInvoiceForm";
import SuccessPopup from "./SuccessPopup";

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  console.log("newinvoice",invoice)
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios.get(`${url}/editinvoice/${id}`).then((res) => {
      setInvoice(res.data?.[0] || null);
    });
  }, [id]);

  if (!invoice) return null; 

  return (
    /*  DO NOT REMOVE — prevents scrollbar */
    <div className="relative flex-1 overflow-x-hidden">
      <div className="pt-16 px-6 max-w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">

          <EditInvoiceHeader onBack={() => navigate("/viewinvoice")} />

          <EditInvoiceForm
            invoice={invoice}
            invoiceId={id}
            onSuccess={() => setShowSuccess(true)}
          />

        </div>
      </div>

      {showSuccess && (
        <SuccessPopup
          title="Invoice Updated"
          message="The invoice has been updated successfully."
          onClose={() => {
            setShowSuccess(false);
            navigate("/viewinvoice");
          }}
        />
      )}
    </div>
  );
};

export default EditInvoice;
