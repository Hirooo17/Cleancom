import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, User } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const FormalComplaintGenerator = () => {
  const [formData, setFormData] = useState({
    complainantName: '',
    complainantAddress: '',
    respondentName: '',
    respondentAddress: '',
    complaintDetails: '',
    date: new Date().toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const element = document.createElement('div');
    
    element.innerHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Formal Complaint - Barangay 633 Manila</title>
        <style>
          @page {
            size: A4;
            margin: 1in;
          }
          
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            position: relative;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-size='24' fill='%23ddd' opacity='0.3' transform='rotate(-45 200 200)'%3eNOT OFFICIAL DOCUMENT%3c/text%3e%3c/svg%3e");
            background-repeat: repeat;
            background-size: 300px 300px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          
          .title {
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
          }
          
          .subtitle {
            font-size: 14px;
            margin: 5px 0;
          }
          
          .content {
            margin-top: 30px;
          }
          
          .field {
            margin-bottom: 20px;
          }
          
          .field-label {
            font-weight: bold;
            display: inline-block;
            min-width: 150px;
          }
          
          .field-value {
            border-bottom: 1px solid #333;
            display: inline-block;
            min-width: 300px;
            padding-bottom: 2px;
          }
          
          .complaint-box {
            border: 1px solid #333;
            padding: 15px;
            margin: 20px 0;
            min-height: 200px;
            white-space: pre-wrap;
          }
          
          .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          
          .signature-box {
            text-align: center;
            width: 200px;
          }
          
          .signature-line {
            border-bottom: 1px solid #333;
            margin-bottom: 5px;
            height: 50px;
          }
          
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            color: rgba(200, 200, 200, 0.3);
            z-index: -1;
            pointer-events: none;
            font-weight: bold;
            white-space: nowrap;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="watermark">NOT OFFICIAL DOCUMENT</div>
        
        <div class="header">
          <div class="title">REPUBLIC OF THE PHILIPPINES</div>
          <div class="subtitle">CITY OF MANILA</div>
          <div class="subtitle">BARANGAY 633</div>
          <div style="margin-top: 20px; font-size: 16px; font-weight: bold;">
            FORMAL COMPLAINT
          </div>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="field-label">Date:</span>
            <span class="field-value">${formData.date}</span>
          </div>
          
          <div class="field">
            <span class="field-label">TO:</span>
            <span class="field-value">The Honorable Barangay Captain, Barangay 633, Manila</span>
          </div>
          
          <div style="margin: 30px 0;">
            <strong>COMPLAINANT:</strong><br>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${formData.complainantName || '_'.repeat(40)}</span>
            </div>
            <div class="field">
              <span class="field-label">Address:</span>
              <span class="field-value">${formData.complainantAddress || '_'.repeat(40)}</span>
            </div>
          </div>
          
          <div style="margin: 30px 0;">
            <strong>RESPONDENT:</strong><br>
            <div class="field">
              <span class="field-label">Name:</span>
              <span class="field-value">${formData.respondentName || '_'.repeat(40)}</span>
            </div>
            <div class="field">
              <span class="field-label">Address:</span>
              <span class="field-value">${formData.respondentAddress || '_'.repeat(40)}</span>
            </div>
          </div>
          
          <div style="margin: 30px 0;">
            <strong>NATURE OF COMPLAINT:</strong>
            <div class="complaint-box">
${formData.complaintDetails || 'Please state the details of your complaint here...\n\n\n\n\n\n\n\n'}
            </div>
          </div>
          
          <div style="margin: 30px 0;">
            <p>I hereby request that appropriate action be taken on this matter in accordance with the applicable laws and barangay ordinances.</p>
          </div>
          
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div><strong>Complainant's Signature</strong></div>
              <div style="margin-top: 10px;">Date: _______________</div>
            </div>
            
            <div class="signature-box">
              <div class="signature-line"></div>
              <div><strong>Received by</strong></div>
              <div style="margin-top: 10px;">Date: _______________</div>
            </div>
          </div>
          
          <div style="margin-top: 50px; font-size: 12px; text-align: center; color: #666;">
            <em>This is a template document generated for Barangay 633, Manila</em>
          </div>
        </div>
      </body>
      </html>
    `;

    const opt = {
      margin: 10,
      filename: `Complaint_${formData.complainantName || 'Anonymous'}_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf().set(opt).from(element).save();
  };

  // Auto-download when component mounts (optional)
  useEffect(() => {
    // You can trigger the download automatically when the component mounts
    // or keep the button and remove this useEffect
    // generatePDF();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Formal Complaint</h1>
                <p className="text-gray-600">Barangay 633, Manila</p>
              </div>
            </div>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Template Only, This Document is only approved when signed by the officials
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Fill out the complaint details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complainant Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Complainant Details
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="complainantName"
                  value={formData.complainantName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="complainantAddress"
                  value={formData.complainantAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your complete address"
                />
              </div>
            </div>

            {/* Respondent Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Respondent Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="respondentName"
                  value={formData.respondentName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter respondent's full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="respondentAddress"
                  value={formData.respondentAddress}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter respondent's complete address"
                />
              </div>
            </div>
          </div>

          {/* Date Display */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 text-gray-700">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Date:</span>
              <span className="bg-gray-100 px-3 py-1 rounded">{formData.date}</span>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nature of Complaint *
            </label>
            <textarea
              name="complaintDetails"
              value={formData.complaintDetails}
              onChange={handleInputChange}
              rows="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please provide detailed information about your complaint. Include dates, times, witnesses, and any relevant circumstances..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Be as specific as possible. Include all relevant details to help process your complaint.
            </p>
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
            >
              <Download className="h-5 w-5" />
              <span>Download Complaint Form</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Instructions:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fill out all required fields marked with (*)</li>
              <li>• Review your information carefully before downloading</li>
              <li>• Print the document and sign before submitting</li>
              <li>• Submit the signed document to Barangay 633 office</li>
              <li>• This is a template only - official processing requires submission to barangay officials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormalComplaintGenerator;