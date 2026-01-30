import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/constants";

const LRCopiesTable = ({ paginatedData, currentPage, onDeleteSuccess }) => {
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
            <th>LR Date</th>
            <th>Vehicle No</th>
            <th>From</th>
            <th>To</th>
            <th>Weight</th>
            <th>Consignee</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((el, index) => (
            <tr key={el._id} className="hover:bg-blue-50">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LRCopiesTable;
