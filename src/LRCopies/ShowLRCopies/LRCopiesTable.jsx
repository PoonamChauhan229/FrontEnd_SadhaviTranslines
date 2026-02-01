import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/constants";

const LRCopiesTable = ({
  paginatedData,
  currentPage,
  onDeleteSuccess,
  onDownload,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this LR?")) return;
    await axios.delete(`${url}/deletelr/${id}`);
    onDeleteSuccess(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-blue-50 text-xs uppercase">
          <tr>
            <th>Actions</th>
            <th>Sr</th>
            <th>LR No</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>From</th>
            <th>To</th>
            <th>Weight</th>
            <th>Consignee</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((el, index) => (
            <tr key={el._id} className="hover:bg-blue-50 text-sm">
              <td className="flex gap-2 justify-center py-1">
                <MdEdit
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/editlr/${el._id}`)}
                />
                <MdDeleteForever
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDelete(el._id)}
                />
              </td>

              <td className="text-center">
                {(currentPage - 1) * 5 + index + 1}
              </td>
              <td className="text-center">{el.lrNo}</td>
              <td className="text-center">
                {new Date(el.lrDate).toLocaleDateString("en-GB")}
              </td>
              <td className="text-center">{el.lrVehicleNo}</td>
              <td className="text-center">{el.startPoint}</td>
              <td className="text-center">{el.destination}</td>
              <td className="text-center">{el.weight}</td>
              <td className="text-center">{el.consigneeName}</td>

              <td className="flex gap-1 justify-center py-1">
                <button
                  onClick={() => onDownload(el._id, "whitelr")}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  White
                </button>
                <button
                  onClick={() => onDownload(el._id, "pinklr")}
                  className="px-2 py-1 bg-pink-500 text-white rounded text-xs"
                >
                  Pink
                </button>
                <button
                  onClick={() => onDownload(el._id, "bluelr")}
                  className="px-2 py-1 bg-blue-800 text-white rounded text-xs"
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

export default LRCopiesTable;
