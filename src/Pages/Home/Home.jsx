import React, { useEffect, useState } from 'react';
import { errorToast, successToast, warnToast } from '../../components/Toast';
import { fetchPdf, setTokenHeader, uploadPdf } from '../../Services/api';

const Home = () => {
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('setfile',e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      warnToast('Please select a file to upload.');
      return;
    }
    console.log('file',file);

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId);
    
    try {
      console.log('formData',formData);
      setTokenHeader(token)
      const response = await uploadPdf(formData);
      console.log('pdfUpload res:', response);
      if (response.success) { 
        // successToast(response.message)
        setUploadStatus('Loading...');
      }
    } catch (err) {
      // console.log(err);
      errorToast(err && err.response && err.response.data.message)
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setTokenHeader(token); 
        const pdf = await fetchPdf();
        if (pdf.success) { 
          console.log('pdf:', pdf);
          setPdf(pdf.fetchedPdf)
        }
      } catch (err) {
        errorToast(err && err.response && err.response.data.message)
        console.error('Error fetching data:', err);
      }
    };
    fetchData()
  },[])

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Upload PDF Document</h1>
      <div className="flex items-center justify-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
          required
        />
        <label
          htmlFor="pdf-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select PDF
        </label>
        {file && <p className="ml-3">{file.name}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
      {uploadStatus && (
        <div className="mt-4">
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
