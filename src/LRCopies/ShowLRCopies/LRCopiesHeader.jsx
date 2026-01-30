import { FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LRCopiesHeader = ({ exportToExcel }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-gray-100 px-4 py-2">
      <div className="flex items-center text-lg font-bold text-blue-600">
        <FaDownload onClick={exportToExcel} className="mr-2 cursor-pointer" />
        View All LR Copies
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/createlr")}
      >
        Add LR <FaArrowRight className="inline ml-1" />
      </button>
    </div>
  );
};

export default LRCopiesHeader;
