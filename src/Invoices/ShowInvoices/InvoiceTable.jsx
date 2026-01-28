import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { GiDistraction } from "react-icons/gi";



const InvoiceTable = ({ currentPage,paginatedData }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto">
  <div className="max-w-full">
    <table className="min-w-max w-full border border-gray-200 text-sm">


          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-sm"><GiDistraction /></th>
              <th className="py-2 px-4 border-b text-sm">Sr.No</th>
              <th className="py-2 px-4 border-b text-sm">Bill No</th>
              <th className="py-2 px-4 border-b text-sm">LR Date</th>
              <th className="py-2 px-4 border-b text-sm">LR NO</th>
              <th className="py-2 px-4 border-b text-sm">Vehicle No</th>
              <th className="py-2 px-4 border-b text-sm">Weight</th>
              <th className="py-2 px-4 border-b text-sm">Rate</th>
              <th className="py-2 px-4 border-b text-sm">Freight</th>
              <th className="py-2 px-4 border-b text-sm">IGST Amount (5%)</th>
              <th className="py-2 px-4 border-b text-sm">LR Charges</th>
              <th className="py-2 px-4 border-b text-sm">Total Amount</th>
              <th className="py-2 px-4 border-b text-sm">Address</th>
              <th className="py-2 px-4 border-b text-sm">Description of Goods</th>
              <th className="py-2 px-4 border-b text-sm">From</th>
              <th className="py-2 px-4 border-b text-sm">To</th>
              <th className="py-2 px-4 border-b text-sm">Status</th>
              <th className="py-2 px-4 border-b text-sm">Payment Recvd Date</th>
              <th className="py-2 px-4 border-b text-sm">Amount Recvd</th>
              <th className="py-2 px-4 border-b text-sm">Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((element, index) => {
              const { _id, vehicle_no, address, bill_no, date_lr, description_of_goods, freight_amount, from, to, igst_amount, lr_charges, lr_no, rate, total_amount, weight, fileName, payment_status, clientName, date_payment, amt_recvd, balance_payment } = element;
              const formattedLRDate = new Date(date_lr).toLocaleDateString('en-GB');
              const paymentdate=new Date(date_payment).toLocaleDateString('en-GB');
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-sm">
                    <div className="gap-2">
                      <MdEdit
                        className='text-blue-600 text-lg cursor-pointer'
                        title="Edit Invoice"
                        onClick={() => navigate(`/editInvoice/${_id}`)}
                      />
                      <FaDownload
                        className='text-green-600 text-lg cursor-pointer'
                        title="Download Invoice"
                        onClick={() => downloadInvoice(_id, fileName)}
                      />
                      <MdDeleteForever
                        className='text-red-600 text-lg cursor-pointer'
                        title="Delete Invoice"
                        onClick={() => navigate(`/deleteInvoice/${_id}`)}
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-sm">{(currentPage - 1) * 5 + index + 1}</td>
                  <td className="py-2 px-4 border-b text-sm">{bill_no}</td>
                  <td className="py-2 px-4 border-b text-sm">{formattedLRDate}</td>
                  <td className="py-2 px-4 border-b text-sm">{lr_no}</td>
                  <td className="py-2 px-4 border-b text-sm">{vehicle_no}</td>
                  <td className="py-2 px-4 border-b text-sm">{weight}</td>
                  <td className="py-2 px-4 border-b text-sm">{rate}</td>
                  <td className="py-2 px-4 border-b text-sm">{freight_amount}</td>
                  <td className="py-2 px-4 border-b text-sm">{igst_amount}</td>
                  <td className="py-2 px-4 border-b text-sm">{lr_charges}</td>
                  <td className="py-2 px-4 border-b text-sm">{total_amount}</td>
                  <td className="py-2 px-4 border-b text-sm">{clientName}</td>
                  <td className="py-2 px-4 border-b text-sm">{description_of_goods}</td>
                  <td className="py-2 px-4 border-b text-sm">{from}</td>
                  <td className="py-2 px-4 border-b text-sm">{to}</td>
                  <td className="py-2 px-4 border-b text-sm">{payment_status}</td>
                  <td className="py-2 px-4 border-b text-sm">{paymentdate=="Invalid Date"?null:paymentdate}</td>
                  <td className="py-2 px-4 border-b text-sm">{amt_recvd}</td>
                  <td className="py-2 px-4 border-b text-sm">{balance_payment}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
