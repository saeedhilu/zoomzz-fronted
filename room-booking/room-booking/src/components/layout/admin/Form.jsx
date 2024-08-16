import React from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';

const Form = ({ initialValues, validationSchema, fields, onSubmit, errors }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <Field
                name={field.name}
                type={field.type}
                id={field.name}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-600 text-sm mt-1"
              />
              {/* Display backend errors */}
              {errors[field.name] && (
                <div className="text-red-600 text-sm mt-1">
                  {errors[field.name].join(', ')}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-full"
          >
            Sign Up
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
