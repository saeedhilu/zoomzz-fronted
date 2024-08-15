// import React, { useState, useEffect, useRef } from "react";
// import { IoMdClose } from "react-icons/io";

// const GenericModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData = {},
//   title,
//   fields,
//   submitLabel = "Submit",
//   cancelLabel = "Cancel",
// }) => {
//   const [formData, setFormData] = useState(initialData);
//   const [errorMessage, setErrorMessage] = useState("");
//   const modalRef = useRef(null); // Create a ref for the modal
//   console.log('====================================');
//   console.log('fieled',fields);
//   console.log('====================================');

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   // Handle click outside of the modal
//   const handleOutsideClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     } else {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value, type, files, checked } = e.target;
//     console.log('====================================');
//     console.log('name :',name);
//     console.log('value :',value);
//     console.log('type :',type);
//     console.log('files :',files);
//     console.log('checked :',checked);
//     console.log('====================================');

//     if (type === "checkbox") {
//       setFormData((prev) => {
//         console.log('====================================');
//         console.log('pre ',prev);
//         console.log('====================================');
//         console.log('====================================');
//         console.log(prev[name]);
//         console.log('====================================');
//         const selectedOptions = prev[name] || [];
//         console.log('====================================');
//         console.log('selected option is :',selectedOptions);
//         console.log('====================================');
//         if (checked) {
//           console.log('checked')
//           return { ...prev, [name]: [...selectedOptions, value] };
//         } else {
//           return {
//             ...prev,
//             [name]: selectedOptions.filter((item) => item !== name),
//           };
//         }
//       });
//     } else if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       onSubmit(formData);
//       onClose();
//     } catch (error) {
//       setErrorMessage("Error occurred while saving data");
//     }
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div
//         ref={modalRef} // Attach the ref to the modal container
//         className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//         >
//           <IoMdClose size={24} />
//         </button>

//         <h2 className="text-lg font-bold text-gray-900">{title}</h2>
//         <form onSubmit={handleSubmit}>
//           {fields.map((field, index) => (
//             <div key={index} className="mt-4">
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.label}:
//                 {field.type === "textarea" ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ""}
//                     onChange={handleChange}
//                     placeholder={field.placeholder}
//                     className="w-full mt-2 border-gray-300 rounded-md"
//                     required={field.required}
//                   />
//                 ) : field.type === "select" ? (

//                   <div>

//                     <select
//                     name={field.name}
//                     value={formData[field.name ] || ""}
//                     onChange={handleChange}
//                     className="w-full mt-2 border-gray-300 rounded-md"
//                     required={field.required}
//                   >
//                     <option value="">Select {field.label}</option>
//                     {field.options.map((option,id) => (
//                       <option key={id} value={option.value}>
//                         {option.name}
//                       </option>
//                     ))}
//                   </select>
//                   </div>
//                 ) : field.type === "checkbox-group" ? (
//                   field.options.map((option) => (
//                     <div key={option.id} className="flex items-center">
//                       <h1>{formData[field.name]}</h1>
//                       <h1>{formData[field.name]}</h1>
//                       <input
//                         type="checkbox"
//                         name={field.name}
//                         value={option.name}
//                         checked={
//                           formData[field.name]?.includes(option.name) || false
//                         }
//                         onChange={handleChange}
//                         className="mr-2"
//                       />
//                       <label className="text-gray-700">{option.name}</label>
//                     </div>
//                   ))
//                 ) : field.type === "file" ? (
//                   <>
//                     <input
//                       type="file"
//                       name={field.name}
//                       onChange={handleChange}
//                       className="w-full mt-2 border-gray-300 rounded-md"
//                       accept={field.accept}
//                     />
//                     {formData[field.name] && (
//                       <div className="mt-2 text-sm text-gray-600">
//                         {formData[field.name].name}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={
//                       field.type !== "file"
//                         ? formData[field.name] || ""
//                         : undefined
//                     }
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

import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const GenericModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title,
  fields,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef(null); // Create a ref for the modal
  
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Handle click outside of the modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;


    if (type === "checkbox") {
      setFormData((prev) => {
        console.log("====================================");
        console.log("pre ", prev);
        console.log("====================================");
        console.log("====================================");
        console.log(prev[name]);
        console.log("====================================");
        const selectedOptions = prev[name] || [];
        console.log("====================================");
        console.log("selected option is :", selectedOptions);
        console.log("====================================");
        if (checked) {
          console.log("checked");
          return { ...prev, [name]: [...selectedOptions, value] };
        } else {
          return {
            ...prev,
            [name]: selectedOptions.filter((item) => item !== name),
          };
        }
      });
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
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
      setErrorMessage("Error occurred while saving data");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        ref={modalRef} // Attach the ref to the modal container
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.label}:
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full mt-2 border-gray-300 rounded-md"
                    required={field.required}
                  />
                ) : field.type === "select" ? (
                  <div>
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full mt-2 border-gray-300 rounded-md"
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option, id) => (
                        <option key={id} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : field.type === "checkbox-group" ? (
                  field.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <h1>{formData[field.name]}</h1>
                      <h1>{formData[field.name]}</h1>
                      <input
                        type="checkbox"
                        name={field.name}
                        value={option.name}
                        checked={
                          formData[field.name]?.includes(option.name) || false
                        }
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">{option.name}</label>
                    </div>
                  ))
                ) : field.type === "file" ? (
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
                ) : field.type === "radio-group" ? (
                  <div key={index}>
                    <label>{field.label}</label>
                    {Object.entries(field.options).map(([value, label]) => (
                      <div key={value}>
                        {/* <h1>{value}</h1> */}
                        {/* <h1>frm name is :{formData[field.name]}</h1> */}

                        {console.log(
                          "field name from fomr data  is :",
                          formData[field.name]
                        )}
                        {/* {console.log('field name is :',field.name)} */}
                        {/* {console.log('field name from . is :',formData.field.name ? 'und':'illa')} */}

                        {/* <h1> availability : {formData.availability ? 'true ':'false '}</h1>
                      <h1> pet_allowed :{formData.pet_allowed ? 'true ':'false '}</h1> */}
                      {console.log('  1',formData[field.name] === (value === 'yes'))}
                      {console.log('2', value)}
                      {console.log('3',formData[field.name] )}
                        <label>
                          <input
                            type="radio"
                            name={field.name}
                            value={value}
                            checked={formData[field.name] === (value === 'yes')}
                            onChange={handleChange}
                          />
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={
                      field.type !== "file"
                        ? formData[field.name] || ""
                        : undefined
                    }
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
