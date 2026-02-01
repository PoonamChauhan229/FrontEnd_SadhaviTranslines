const CreateLRSuccess = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg text-center w-72">
        <h2 className="text-green-600 font-semibold mb-2">
          LR Created
        </h2>

        <button
          onClick={onClose}
          className="mt-3 bg-blue-500 text-white px-5 py-1.5 rounded text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CreateLRSuccess;
