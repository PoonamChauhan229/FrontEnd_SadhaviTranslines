import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fileDownload from "react-file-download";
import { url } from "../../utils/constants";

const InvoiceTable = ({ currentPage, paginatedData, onDeleteSuccess }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await axios.delete(`${url}/deleteInvoice/${id}`);
      onDeleteSuccess(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete invoice");
    }
  };

  const downloadInvoice = async (_id, fileName) => {
    try {
      const res = await axios.get(`${url}/download/${_id}`, {
        responseType: "blob",
      });
      fileDownload(res.data, fileName || "invoice.pdf");
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download invoice");
    }
  };




  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[2000px] bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-50 text-gray-700 uppercase text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2 text-center">Actions</th>
              <th className="px-2 py-2">Sr.No</th>
              <th className="px-2 py-2">Bill No</th>
              <th className="px-2 py-2">LR Date</th>
              <th className="px-2 py-2">LR No</th>
              <th className="px-2 py-2">Vehicle No</th>
              <th className="px-2 py-2">Weight</th>
              <th className="px-2 py-2">Rate</th>
              <th className="px-2 py-2">Freight</th>
              <th className="px-2 py-2">IGST (5%)</th>
              <th className="px-2 py-2">LR Charges</th>
              <th className="px-2 py-2">Total</th>
              <th className="px-2 py-2">Client</th>
              <th className="px-2 py-2">Description</th>
              <th className="px-2 py-2">From</th>
              <th className="px-2 py-2">To</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Payment Date</th>
              <th className="px-2 py-2">Amount Recvd</th>
              <th className="px-2 py-2">Balance</th>
              <th className="px-2 py-2">Created At</th>
              <th className="px-2 py-2">Updated At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedData.map((el, index) => {
              const lrDate = new Date(el.date_lr).toLocaleDateString("en-GB");
              const paymentDate =
                new Date(el.date_payment).toLocaleDateString("en-GB") ===
                  "Invalid Date"
                  ? "-"
                  : new Date(el.date_payment).toLocaleDateString("en-GB");

              return (
                <tr
                  key={el._id}
                  className="hover:bg-blue-50 transition duration-150"
                >
                  {/* Actions */}
                  <td className="px-2 py-1 sticky left-0 bg-white z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition">
                      <div className="flex flex-col items-center justify-center gap-1">
                        {/* Edit */}
                        <MdEdit
                          size={12}
                          className="text-blue-600 cursor-pointer hover:text-blue-800"
                          title="Edit Invoice"
                          onClick={() => navigate(`/editInvoice/${el._id}`)}
                        />
                        {/* Download */}
                        <FaDownload
                          size={12}
                          className="text-green-600 cursor-pointer hover:text-green-800"
                          title="Download Invoice"
                          onClick={() => downloadInvoice(el._id, el.fileName)}
                        />
                        {/* Delete */}
                        <MdDeleteForever
                          size={12}
                          className="text-red-600 cursor-pointer hover:text-red-800"
                          title="Delete Invoice"
                          onClick={() => handleDelete(el._id)}
                        />
                      </div>
                    </div>
                  </td>




                  {/* Data */}
                  <td className="px-2 py-1 text-center">{(currentPage - 1) * 5 + index + 1}</td>
                  <td className="px-2 py-1 text-center">{el.bill_no}</td>
                  <td className="px-2 py-1 text-center">{lrDate}</td>
                  <td className="px-2 py-1 text-center">{el.lr_no}</td>
                  <td className="px-2 py-1 text-center">{el.vehicle_no}</td>
                  <td className="px-2 py-1 text-center">{el.weight}</td>
                  <td className="px-2 py-1 text-center">{el.rate}</td>
                  <td className="px-2 py-1 text-center">{el.freight_amount}</td>
                  <td className="px-2 py-1 text-center">{el.igst_amount}</td>
                  <td className="px-2 py-1 text-center">{el.lr_charges}</td>
                  <td className="px-2 py-1 text-center font-medium">{el.total_amount}</td>
                  <td className="px-2 py-1 text-center">{el.clientName}</td>
                  <td className="px-2 py-1 text-center">{el.description_of_goods}</td>
                  <td className="px-2 py-1 text-center">{el.from}</td>
                  <td className="px-2 py-1 text-center">{el.to}</td>

                  {/* Status badge */}
                  <td className="px-2 py-1 text-center">
                    <span
                      className={`px-2 py-1 text-center rounded-full text-xs font-medium ${el.payment_status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : el.payment_status === "Unpaid"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {el.payment_status || "-"}
                    </span>
                  </td>

                  <td className="px-2 py-1 text-center">{paymentDate}</td>
                  <td className="px-2 py-1 text-center">{el.amt_recvd}</td>
                  <td className="px-2 py-1 text-center">{el.balance_payment}</td>
                   <td className="px-2 py-1 text-center">{el.createdAt?"-":"--"}</td>
                  <td className="px-2 py-1 text-center">{el.updatedAt?"-":"--"}</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
