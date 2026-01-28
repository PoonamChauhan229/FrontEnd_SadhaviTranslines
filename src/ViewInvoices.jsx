import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from './utils/constants';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { GiDistraction } from "react-icons/gi";
import fileDownload from 'react-file-download';
import * as XLSX from 'xlsx';
import usePagination from './utils/usePagination';

const ViewInvoices = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [newfilteredInvoices, setNewFilteredInvoices] = useState([]);
    const [client, setClient] = useState('');
    const [status, setStatus] = useState(''); // paid or unpaid
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        invoicesData();
    }, []);

    const invoicesData = async () => {
        const res = await axios.get(`${url}/viewinvoices`);
        setInvoices(res.data);
        setNewFilteredInvoices(res.data);
    };

    const downloadInvoice = async (_id, fileName) => {
        try {
            const res = await axios.get(`${url}/download/${_id}`, {
                responseType: 'blob' // Important for handling binary data
            });
            fileDownload(res.data, fileName || 'invoice.pdf');
        } catch (error) {
            console.error('Error downloading invoice:', error.response?.data?.message || error.message);
            alert('Error downloading invoice. Please check the console for more details.');
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(newfilteredInvoices.map((invoice, index) => ({
            'Sr.No': index + 1,
            'Bill No': invoice.bill_no,
            'LR Date': new Date(invoice.date_lr).toLocaleDateString('en-US'),
            'LR NO': invoice.lr_no,
            'Vehicle No': invoice.vehicle_no,
            'Weight': invoice.weight,
            'Rate': invoice.rate,
            'Freight': invoice.freight_amount,
            'IGST Amount (5%)': invoice.igst_amount,
            'LR Charges': invoice.lr_charges,
            'Total Amount': invoice.total_amount,
            'Address': invoice.address,
            'Description of Goods': invoice.description_of_goods,
            'From': invoice.from,
            'To': invoice.to,
        })));
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
        XLSX.writeFile(workbook, 'invoices.xlsx');
    };

    const applyFilters = (e) => {
        e.preventDefault();
        let filteredInvoices = invoices;

        if (client) {
            filteredInvoices = filteredInvoices.filter(invoice => 
                invoice.address.toLowerCase().includes(client.toLowerCase())
            );
        }

        if (status) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.status === status);
        }

        if (fromDate) {
            filteredInvoices = filteredInvoices.filter(invoice => 
                new Date(invoice.date_lr) >= new Date(fromDate)
            );
        }

        if (toDate) {
            filteredInvoices = filteredInvoices.filter(invoice => 
                new Date(invoice.date_lr) <= new Date(toDate)
            );
        }

        setNewFilteredInvoices(filteredInvoices);
    };
    const perPage=5;
    const { paginatedData, currentPage, totalPages, goToPage } = usePagination(newfilteredInvoices, perPage);

    return (
      <>
        <div className='absolute top-10 left-[19%] right-0 px-4'>
            <div className="container mx-auto p-4">
                <div className="shadow-lg rounded-lg overflow-hidden">
                    <div className="py-1 px-4 flex justify-between bg-gray-100">
                        <div className="text-lg font-bold text-blue-600 py-1 flex">
                            <div className='mx-2 my-2'><FaDownload onClick={exportToExcel} /></div>
                            <div>View All Invoices</div>
                        </div>
                        <button
                            className="btn btn-primary inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            onClick={() => navigate('/createinvoices')}
                        >
                            <span className="mr-1">Add Invoice</span>
                            <FaArrowRight className='pt-1' />
                        </button>
                    </div>

                    <div className="my-4">
                        <form onSubmit={applyFilters} className="flex flex-wrap gap-4">
                            <input 
                                type="text" 
                                placeholder="Client" 
                                value={client} 
                                onChange={(e) => setClient(e.target.value)} 
                                className="border rounded px-3 py-2"
                            />
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)} 
                                className="border rounded px-3 py-2"
                            >
                                <option value="">Select Status</option>
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                            </select>
                            <input 
                                type="date" 
                                value={fromDate} 
                                onChange={(e) => setFromDate(e.target.value)} 
                                className="border rounded px-3 py-2"
                            />
                            <input 
                                type="date" 
                                value={toDate} 
                                onChange={(e) => setToDate(e.target.value)} 
                                className="border rounded px-3 py-2"
                            />
                            <button 
                                type="submit" 
                                className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </div>

                    <div className="mt-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
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
                                        const { _id, vehicle_no, address, bill_no, date_lr, description_of_goods, freight_amount, from, to, igst_amount, lr_charges, lr_no, rate, total_amount, weight, fileName, payment_status,clientName,date_payment,amt_recvd,balance_payment } = element;
                                        const formattedLRDate = new Date(date_lr).toLocaleDateString('en-GB');
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
                                                <td className="py-2 px-4 border-b text-sm">{date_payment}</td>
                                                <td className="py-2 px-4 border-b text-sm">{amt_recvd}</td>
                                                <td className="py-2 px-4 border-b text-sm">{balance_payment}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='flex justify-center mt-4'>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i + 1)}
                                className={`btn ${i + 1 === currentPage ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
};

export default ViewInvoices;