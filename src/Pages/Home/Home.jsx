import React, { useEffect, useState } from 'react';
import { errorToast, successToast, warnToast } from '../../components/Toast';
import { BASE_URL, fetchPdf, setTokenHeader, uploadPdf } from '../../Services/api';
import { Document, Page } from '@react-pdf/renderer';
import PdfViewer from '../../components/PdfViewer/PdfViewer';

const Home = () => {
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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
        setRefresh(!refresh)
        setPdfUploaded(true)
      }
    } catch (err) {
      // console.log(err);
      errorToast(err && err.response && err.response.data.message)
    }
  };


  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-black text-center mb-10">Upload PDF Document</h1>
      <div className="flex items-center justify-center border-2 p-10 w-[50%] m-auto border-black">
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
      <div className='w-fit m-auto'>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
      </div>

        <PdfViewer pdfUploaded={pdfUploaded} refresh={refresh} />

    </div>
  );
};

export default Home;
