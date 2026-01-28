import { FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InvoiceHeader = ({ exportToExcel }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-gray-100 px-4 py-2">
      <div className="flex items-center text-lg font-bold text-blue-600">
        <FaDownload onClick={exportToExcel} className="mr-2 cursor-pointer" />
        View All Invoices
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/createinvoices")}
      >
        Add Invoice <FaArrowRight className="inline ml-1" />
      </button>
    </div>
  );
};

export default InvoiceHeader;
