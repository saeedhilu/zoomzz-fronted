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
//   console.log('fields are :', fields);

//   const [formData, setFormData] = useState(initialData);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
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
//     isOpen && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//           <h2 className="text-lg font-bold text-gray-900">{title}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="max-h-[60vh] overflow-y-auto">
//               {fields.map((field, index) => (
//                 <div key={index} className="mt-4">
//                   <label className="block mb-2 text-sm font-medium text-gray-700">
//                     {field.label}:
//                     {field.type === 'textarea' ? (
//                       <textarea
//                         name={field.name}
//                         value={formData[field.name] || ''}
//                         onChange={handleChange}
//                         placeholder={field.placeholder}
//                         className="w-full mt-2 border-gray-300 rounded-md"
//                         required={field.required}
//                       />
//                     ) : field.type === 'select' ? (
//                       <select
//                         name={field.name}
//                         value={formData[field.name] || ''}
//                         onChange={handleChange}
//                         className="w-full mt-2 border-gray-300 rounded-md"
//                         required={field.required}
//                       >
//                         {field.options.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                     ) : field.type === 'checkbox-group' ? (
//                       <div className="mt-2">
//                         {field.options.map((option) => (
//                           <label key={option.value} className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               name={field.name}
//                               value={option.value}
//                               checked={formData[field.name]?.[option.value] || false}
//                               onChange={handleChange}
//                               className="form-checkbox"
//                             />
//                             <span className="text-sm font-medium">{option.label}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : field.type === 'file' ? (
//                       <>
//                         <input
//                           type="file"
//                           name={field.name}
//                           onChange={handleChange}
//                           className="w-full mt-2 border-gray-300 rounded-md"
//                           accept={field.accept}
//                         />
//                         {formData[field.name] && (
//                           <div className="mt-2 text-sm text-gray-600">
//                             {formData[field.name].name}
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name] || ''}
//                         onChange={handleChange}
//                         placeholder={field.placeholder}
//                         className="w-full mt-2 border-gray-300 rounded-md"
//                         required={field.required}
//                       />
//                     )}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-4 mt-4">
//               <button
//                 type="submit"
//                 className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//               >
//                 {submitLabel}
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//               >
//                 {cancelLabel}
//               </button>
//             </div>
//           </form>
//           {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//         </div>
//       </div>
//     )
//   );
// };

// export default GenericModal;



//  For checking multiple amenities 





// import React, { useState, useEffect } from "react";

// const GenericModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   fields,
//   isCreating,
//   initialValues,
//   errorMessage,
// }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (initialValues) {
//       setFormData(initialValues);
//     }
//   }, [initialValues]);

//   const handleChange = (e) => {
//     const { name, value, type, files, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg max-w-md mx-auto relative">
//           <button
//             onClick={onClose}
//             className="absolute top-2 right-2 text-gray-600"
//             aria-label="Close"
//           >
//             <FaTimes />
//           </button>
//           <h2 className="text-xl font-semibold mb-4">{isCreating ? "Add New Room" : "Edit Room"}</h2>
//           {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//           <form onSubmit={handleSubmit}>
//             {fields.map((field) => (
//               <div key={field.name} className="mb-4">
//                 <label className="block mb-2 text-sm font-medium">{field.label}</label>
//                 {field.type === "textarea" ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     placeholder={field.placeholder}
//                   />
//                 ) : field.type === "select" ? (
//                   <select
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                   >
//                     {field.options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 ) : field.type === "checkbox-group" ? (
//                   field.options.map((option) => (
//                     <label key={option.value} className="block">
//                       <input
//                         type="checkbox"
//                         name={field.name}
//                         value={option.value}
//                         checked={formData[field.name]?.includes(option.value) || false}
//                         onChange={handleChange}
//                         className="mr-2"
//                       />
//                       {option.label}
//                     </label>
//                   ))
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     accept={field.accept}
//                     className="w-full p-2 border rounded"
//                     placeholder={field.placeholder}
//                   />
//                 )}
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 text-white rounded"
//             >
//               {isCreating ? "Create" : "Save"}
//             </button>
//           </form>
//         </div>
//       </div>
//     )
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
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const selectedOptions = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...selectedOptions, value] };
        } else {
          return { ...prev, [name]: selectedOptions.filter((item) => item !== value) };
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full mt-2 border-gray-300 rounded-md"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox-group' ? (
                  field.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        name={field.name}
                        value={option.value}
                        checked={formData[field.name]?.includes(option.value) || false}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">{option.name}</label>
                    </div>
                  ))
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={field.type !== 'file' ? formData[field.name] || '' : undefined}
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
