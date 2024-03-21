import React, { useState } from 'react';
import { errorToast, warnToast } from '../../components/Toast';
import { setTokenHeader, uploadPdf } from '../../Services/api';
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
    // console.log('setfile',e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      warnToast('Please select a file to upload.');
      return;
    }
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
      <h1 className="text-3xl sm:text-4xl font-bold text-black text-center mb-20 mt-10">Extract PDF Pages</h1>
      <p className='text-center mb-10 text-lg font-semibold'>Select pdf file to extract pages</p>

      <div className="text-center  m-auto ">
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
          className="cursor-pointer bg-[rgb(119,2,7)] text-white font-bold py-3 sm:py-7 px-5 sm:px-20 text-xl  focus:outline-none focus:shadow-outline"
        >
          Select PDF
        </label>
        {file && <p className="mt-10">{file.name}</p>}
      </div>

      <div className='w-fit m-auto'>
      <button
        onClick={handleSubmit}
        className="mt-16 bg-[whitesmoke] border border-black hover:bg-[rgb(119,2,7)] hover:text-white  font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        style={{transition: 'background-color 0.3s ease-in'}}
      >
        Upload
      </button>
      </div>

      <PdfViewer pdfUploaded={pdfUploaded} refresh={refresh} setPdfUploaded={setPdfUploaded} file={file} />

    </div>
  );
};


export default Home;