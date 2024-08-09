// import React, { useState, useEffect } from 'react';

// const GenericModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData = {},
//   title,
//   fields,
//   submitLabel = 'Submit',
//   cancelLabel = 'Cancel',
// }) => {
//   console.log('field are :',fields);
  
    
//   const [formData, setFormData] = useState(initialData);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : value,
//     }));
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       onSubmit(formData);
//       onClose();
//     } catch (error) {
//       setErrorMessage('Error occurred while saving data');
//     }
//   };


//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-900/50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-lg font-bold text-gray-900">{title}</h2>
//         <form onSubmit={handleSubmit}>
//           {fields.map((field, index) => (
//             <div key={index} className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.label}:
//                 {field.type === 'textarea' ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleChange}
//                     placeholder={field.placeholder}
//                     className="w-full mt-2 border-gray-300 rounded-md"
//                     required={field.required}
//                   />
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     onChange={handleChange}
//                     placeholder={field.placeholder}
//                     className="w-full mt-2 border-gray-300 rounded-md"
//                     accept={field.accept}
//                     required={field.required}
//                   />
//                 )}
//               </label>
//             </div>
//           ))}
//           <div className="flex gap-4 mt-4">
//             <button
//               type="submit"
//               className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//             >
//               {submitLabel}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//             >
//               {cancelLabel}
//             </button>
//           </div>
//         </form>
//         {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default GenericModal;



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
  console.log('fields are :', fields);

  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

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
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="max-h-[60vh] overflow-y-auto">
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
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full mt-2 border-gray-300 rounded-md"
                        required={field.required}
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox-group' ? (
                      <div className="mt-2">
                        {field.options.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name={field.name}
                              value={option.value}
                              checked={formData[field.name]?.[option.value] || false}
                              onChange={handleChange}
                              className="form-checkbox"
                            />
                            <span className="text-sm font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : field.type === 'file' ? (
                      <>
                        <input
                          type="file"
                          name={field.name}
                          onChange={handleChange}
                          className="w-full mt-2 border-gray-300 rounded-md"
                          accept={field.accept}
                        />
                        {formData[field.name] && (
                          <div className="mt-2 text-sm text-gray-600">
                            {formData[field.name].name}
                          </div>
                        )}
                      </>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full mt-2 border-gray-300 rounded-md"
                        required={field.required}
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600"
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
    )
  );
};

export default GenericModal;
