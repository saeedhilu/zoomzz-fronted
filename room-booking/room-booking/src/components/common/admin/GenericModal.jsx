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
  const modalRef = useRef(null);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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
        const selectedOptions = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...selectedOptions, value] };
        } else {
          return {
            ...prev,
            [name]: selectedOptions.filter((item) => item !== value),
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
        ref={modalRef}
        className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.label}
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required={field.required}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, id) => (
                      <option key={id} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox-group" ? (
                  field.options.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name={field.name}
                        value={option.name}
                        checked={
                          formData[field.name]?.includes(option.name) || false
                        }
                        onChange={handleChange}
                        className="mr-2 h-5 w-5 text-gray-600 border-gray-300 rounded"
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
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                      accept={field.accept}
                    />
                    {formData[field.name] && (
                      <div className="mt-2 text-sm text-gray-600">
                        {formData[field.name].name}
                      </div>
                    )}
                  </>
                ) : field.type === "radio-group" ? (
                  <div className="mt-2">
                    {Object.entries(field.options).map(([value, label]) => (
                      <div key={value} className="flex items-center mb-2">
                        <input
                          type="radio"
                          name={field.name}
                          value={value}
                          checked={formData[field.name] === value}
                          onChange={handleChange}
                          className="mr-2 h-5 w-5 text-gray-600 border-gray-300 rounded"
                        />
                        <label className="text-gray-700">{label}</label>
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
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    accept={field.accept}
                    required={field.required}
                  />
                )}
              </label>
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {cancelLabel}
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default GenericModal;
