import React from "react";
import { vendorSignupConfig } from "../../components/layout/admin/FromConfig";
import Form from "../../components/layout/admin/Form";


const SignupPage = () => {
    const handleVendorSubmit = (values) => {
      alert(JSON.stringify(values, null, 2));
    };
  
    return (
      <main className="bg-gray-100 flex justify-between h-screen   items-center p-10 ">
        <aside className="bg-yellow-600 w-full p-20 h-full">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Vendor Signup</h1>
          <p className="text-lg mb-6">
            Join our platform and start offering your services to a wide audience. Our vendor
            registration process is simple and straightforward. Fill in the form on the right to get started.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Why Join Us?</h2>
          <ul className="list-disc list-inside">
            <li className="text-lg mb-2">Access to a large customer base</li>
            <li className="text-lg mb-2">Easy management of your services</li>
            <li className="text-lg mb-2">Regular notifications and updates</li>
          </ul>
        </aside>
        <section className="w-full p-10 bg-white shadow-lg rounded-lg">
          <Form
            initialValues={vendorSignupConfig.initialValues}
            validationSchema={vendorSignupConfig.validationSchema}
            fields={vendorSignupConfig.fields}
            onSubmit={handleVendorSubmit}
          />
        </section>
      </main>
    );
  };
  
export default SignupPage;
