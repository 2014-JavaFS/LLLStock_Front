import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
];

const Home: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white p-3 text-center">
      <img src="../public/LLLMD_Logo.svg" alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />

        <h1>Live Love LiveStock</h1>
      </header>

      {/* Main Content */}
      <main className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">About Us</h2>
                <p>
                  We provide top-notch services to help farmers diagnose their animals and ensure their well-being. Our team of experts is dedicated to delivering the best solutions for your farm.
                </p>
                <p>
                  Explore our services, testimonials, and more to learn how we can assist you in maintaining the health of your livestock.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Contact Us</h3>
                <p>Email: info@farmdiagnosis.com</p>
                <p>Phone: +123 456 7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title text-center">Simple no-tricks pricing</h2>
            <p className="text-center">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
            </p>
            <div className="d-flex justify-content-center">
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="card-title">Lifetime membership</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque amet id perferendis blanditiis repellendus quidem assumenda.
                  </p>
                  <div className="mt-3">
                    <h4>What’s included</h4>
                    <ul className="list-unstyled">
                      {includedFeatures.map((feature) => (
                        <li key={feature} className="d-flex align-items-center">
                          <CheckIcon aria-hidden="true" className="h-6 w-6 text-indigo-600 me-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                  <p className="mt-2">
                    <span className="text-5xl font-bold text-gray-900">$349</span>
                    <span className="text-sm font-semibold text-gray-600">USD</span>
                  </p>
                  <a href="#" className="btn btn-primary mt-3">Get access</a>
                  <p className="mt-3 text-xs text-gray-600">
                    Invoices and receipts available for easy company reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card bg-dark text-white mb-4">
          <div className="card-body">
            <h2 className="card-title text-center">Subscribe to our newsletter</h2>
            <p className="text-center">
              Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.
            </p>
            <div className="d-flex justify-content-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control me-2"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
            <div className="mt-4">
              <dl className="row">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-3">
                    <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white me-2" />
                    <div>
                      <dt className="font-semibold">Weekly articles</dt>
                      <dd className="text-gray-400">Non laboris consequat cupidatat laborum magna...</dd>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-3">
                    <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white me-2" />
                    <div>
                      <dt className="font-semibold">No spam</dt>
                      <dd className="text-gray-400">Officia excepteur ullamco ut sint duis proident non...</dd>
                    </div>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white p-3 text-center mt-4">
        <p>&copy; 2024 Farm Diagnosis. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
