import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../utils/constants';

const ViewLR = () => {
  const [lrs, setLrs] = useState([]);

  useEffect(() => {
    axios.get(`${url}/get-lrs`).then(res => {
      if (res.data.status === 'success') setLrs(res.data.lrs);
    }).catch(err => {
      console.error(err);
      alert('Failed to fetch LR list');
    });
  }, []);

  const downloadLR = async (lrId, color) => {
    try {
      const res = await axios.get(`${url}/download-lr/${lrId}/${color}`, {
        responseType: 'blob' // important for image download
      });

      const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = `${color}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error(err);
      alert('Failed to generate/download LR copy');
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-lg font-semibold mb-4">All LRs</h1>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">LR No</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Vehicle</th>
            <th className="border px-2 py-1">From</th>
            <th className="border px-2 py-1">To</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {lrs.map(lr => (
            <tr key={lr._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{lr.lrNo}</td>
              <td className="border px-2 py-1">{lr.lrDate}</td>
              <td className="border px-2 py-1">{lr.lrVehicleNo}</td>
              <td className="border px-2 py-1">{lr.startPoint}</td>
              <td className="border px-2 py-1">{lr.destination}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button
                  onClick={() => downloadLR(lr._id, 'whitelr')}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  White
                </button>
                <button
                  onClick={() => downloadLR(lr._id, 'pinklr')}
                  className="px-2 py-1 bg-pink-500 text-white rounded text-sm"
                >
                  Pink
                </button>
                <button
                  onClick={() => downloadLR(lr._id, 'bluelr')}
                  className="px-2 py-1 bg-blue-800 text-white rounded text-sm"
                >
                  Blue
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLR;
