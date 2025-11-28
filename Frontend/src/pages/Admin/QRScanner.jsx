import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { QrCode, CheckCircle, XCircle, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const QRScanner = () => {
  const [qrData, setQrData] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const verifyQRMutation = useMutation(
    (data) => axios.post(`${API_BASE_URL}/admin/verify-qr`, data),
    {
      onSuccess: (response) => {
        setVerificationResult({ 
          success: true, 
          data: response.data,
          message: response.data.message 
        });
        toast.success('QR code verified successfully!');
      },
      onError: (error) => {
        setVerificationResult({ 
          success: false, 
          message: error.response?.data?.message || 'Verification failed' 
        });
        toast.error(error.response?.data?.message || 'Verification failed');
      }
    }
  );

  const handleVerify = (e) => {
    e.preventDefault();
    setVerificationResult(null);
    
    if (!qrData.trim()) {
      toast.error('Please enter QR code data');
      return;
    }

    verifyQRMutation.mutate({ qrData });
  };

  const clearResult = () => {
    setVerificationResult(null);
    setQrData('');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">QR Code Scanner</h1>
          <p className="mt-2 text-gray-600">
            Verify booking QR codes for event attendance
          </p>
        </div>

        {/* QR Verification Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter QR Code Data
              </label>
              <textarea
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                rows="4"
                className="input-field font-mono text-sm"
                placeholder='Paste QR code data here (e.g., {"bookingId":"MB123456","userId":"...","eventId":"...","valid":true})'
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={verifyQRMutation.isLoading}
              className="w-full btn-primary disabled:bg-gray-400 flex items-center justify-center"
            >
              {verifyQRMutation.isLoading ? (
                'Verifying...'
              ) : (
                <>
                  <QrCode className="w-5 h-5 mr-2" />
                  Verify QR Code
                </>
              )}
            </button>
          </form>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-lg p-6 ${
            verificationResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center mb-4">
              {verificationResult.success ? (
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500 mr-3" />
              )}
              <h3 className={`text-lg font-semibold ${
                verificationResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {verificationResult.success ? 'Verification Successful' : 'Verification Failed'}
              </h3>
            </div>
            
            <div className={`text-sm ${
              verificationResult.success ? 'text-green-700' : 'text-red-700'
            }`}>
              <p className="mb-3">{verificationResult.message}</p>
              
              {verificationResult.success && verificationResult.data.booking && (
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-900 mb-2">Booking Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Booking ID:</span>
                      <p>{verificationResult.data.booking.bookingId}</p>
                    </div>
                    <div>
                      <span className="font-medium">User:</span>
                      <p>{verificationResult.data.booking.user}</p>
                    </div>
                    <div>
                      <span className="font-medium">Event:</span>
                      <p>{verificationResult.data.booking.event}</p>
                    </div>
                    <div>
                      <span className="font-medium">Participants:</span>
                      <p>{verificationResult.data.booking.participants}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={clearResult}
              className={`mt-4 text-sm font-medium ${
                verificationResult.success 
                  ? 'text-green-700 hover:text-green-800' 
                  : 'text-red-700 hover:text-red-800'
              }`}
            >
              Scan Another QR Code
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <div className="flex items-start">
            <Camera className="h-6 w-6 text-blue-500 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-2">How to use the QR Scanner</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Use a QR scanner app on your phone to scan the tourist's QR code</li>
                <li>• Copy the scanned data and paste it into the text area above</li>
                <li>• Click "Verify QR Code" to check the booking validity</li>
                <li>• The system will automatically mark attendance for valid QR codes</li>
                <li>• Expired or invalid QR codes will be rejected</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample QR Data for Testing */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sample QR Data for Testing</h3>
          <p className="text-sm text-gray-600 mb-3">
            Use this sample data to test the QR verification:
          </p>
          <div className="bg-gray-100 p-3 rounded font-mono text-sm">
            {`{"bookingId":"MB123456","userId":"507f1f77bcf86cd799439011","eventId":"507f1f77bcf86cd799439012","valid":true}`}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRScanner;