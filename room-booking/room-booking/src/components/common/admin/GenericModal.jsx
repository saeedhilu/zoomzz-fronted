import React, { useState, useEffect } from 'react';

const GenericModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title,
  fields,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
}) => {
    
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  console.log('====================================');
  console.log('fropm data is L',formData);
  console.log('====================================');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onSubmit(formData);
      onClose();
    } catch (error) {
      setErrorMessage('Error occurred while saving data');
    }
  };


  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-900/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.label}:
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full mt-2 border-gray-300 rounded-md"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full mt-2 border-gray-300 rounded-md"
                    accept={field.accept}
                    required={field.required}
                  />
                )}
              </label>
            </div>
          ))}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              {cancelLabel}
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default GenericModal;
