import React from 'react';

const Popup = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className={`text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          <h3 className="text-lg font-semibold mb-3">
            {type === 'success' ? '✅ Success!' : '❌ Error!'}
          </h3>
          <p className="mb-4">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;