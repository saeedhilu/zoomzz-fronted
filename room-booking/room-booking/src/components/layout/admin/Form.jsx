// src/components/layout/admin/Form.js

import React from 'react';
import { useFormik } from 'formik';

const Form = ({ initialValues, validationSchema, fields, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className=" p-6  rounded-lg">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-gray-700 font-medium mb-2">
            {field.label}
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none  focus:border-gray-800 ${
              formik.touched[field.name] && formik.errors[field.name] ? 'border-red-500' : 'border-gray-300 '
            }`}
            id={field.name}
            name={field.name}
            type={field.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
          />
          {formik.touched[field.name] && formik.errors[field.name] ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors[field.name]}</p>
          ) : null}
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
