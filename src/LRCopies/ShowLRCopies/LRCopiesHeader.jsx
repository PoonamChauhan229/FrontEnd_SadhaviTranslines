import { FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LRCopiesHeader = ({ exportToExcel }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-gray-100 px-4 py-2 mb-4">
      <div
        className="flex items-center text-lg font-bold text-blue-600 cursor-pointer"
        onClick={exportToExcel}
      >
        <FaDownload className="mr-2" />
        View All LR Copies
      </div>

      <button
        onClick={() => navigate("/createlr")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add LR <FaArrowRight className="inline ml-1" />
      </button>
    </div>
  );
};

export default LRCopiesHeader;
