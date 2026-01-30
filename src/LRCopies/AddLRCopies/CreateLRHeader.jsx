import { useNavigate } from 'react-router-dom';

const CreateLRHeader = ({ title = 'Create LR' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b">
      <h1 className="text-lg font-semibold text-gray-800">
        {title}
      </h1>

      <button
        type="button"
        onClick={() => navigate('/viewlr')}
        className="w-7 h-7 flex items-center justify-center rounded-full 
                   text-gray-600 hover:bg-gray-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default CreateLRHeader;
