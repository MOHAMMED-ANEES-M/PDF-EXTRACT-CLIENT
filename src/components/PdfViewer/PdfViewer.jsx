import React, { useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { BASE_URL, extractPdf, fetchPdf, setTokenHeader } from '../../Services/api';
import { errorToast, successToast, warnToast } from '../Toast';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const PdfViewer = ({ pdfUploaded, refresh, setPdfUploaded, file }) => {

  const [pdf, setPdf] = useState('');
  const [extractedPdf, setExtractedPdf] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);

  const extractBtnRef = useRef(null);

  const token = localStorage.getItem('token')

  const PdfURL = `${BASE_URL}/uploads/${pdf.pdf}`

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const togglePageSelection = (page) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const pages = [];
  if (numPages !== null) { 
      for (let i = 1; i <= numPages; i++) {
        pages.push(
            <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
              <Page className='border-2' width={200} pageNumber={i} renderAnnotationLayer={false} renderTextLayer={false} />
              <input
                type='checkbox'
                checked={selectedPages.includes(pageNumber)}
                onChange={() => togglePageSelection(pageNumber)}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
            </div>
        );
      }
  }

  const handleExtractPdf = async () => {
    try {
      if (!selectedPages || selectedPages.length<1) {
        return warnToast('At least select a page to extract pdf')
      }
      let pages = selectedPages.sort()
      console.log('selectedPages',pages);
      const data = { pdfFilePath: pdf.pdf, pages }
      setTokenHeader(token)
      const response = await extractPdf(data);
      console.log('pdfExtract res:', response);
      const url = URL.createObjectURL(response.data);
      setExtractedPdf(url)
      setPdfUploaded(false)
      successToast('Pdf extracted successfully')
    } catch (err) {
      errorToast(err && err.response && err.response.data.message)
    }
  }

  const handleDownloadExtractedPdf = () => {
    const a = document.createElement('a');
    a.href = extractedPdf;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    if (token && pdfUploaded) {
      fetchData()
    }
    setSelectedPages('')
    if (pdfUploaded) {
      setExtractedPdf('')
    }
  },[refresh])

  if (pdfUploaded && extractBtnRef.current) {
    setTimeout(() => {
      extractBtnRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }


  return (
    <div className='mt-20'>
      {pdfUploaded &&
        <>
          <h1 className='text-black text-lg text-center mb-5 font-semibold'>Select pages to extract</h1>
          <Document className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center m-auto gap-5 w-fit' file={PdfURL} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => {
              const pageNumber = index + 1;
              return (
                <div key={pageNumber} style={{ marginBottom: '20px', position: 'relative' }} className='hover:scale-105'>
                  <Page
                    className='border-2 '
                    width={200}
                    pageNumber={pageNumber}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                  <input
                    type='checkbox'
                    checked={selectedPages.includes(pageNumber)}
                    onChange={() => togglePageSelection(pageNumber)}
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    className='w-5 h-5 rounded-full hover:opacity-100'
                  />
                </div>
              );
            })}
          </Document>

          <div className='w-fit m-auto mt-5 ' >
              <button className='bg-[rgb(119,2,7)] font-bold p-3 text-white mb-20' onClick={handleExtractPdf}>Extract Pages</button>
          </div>
          <div className='mt-10' ref={extractBtnRef}></div>
        </>
      }

      {extractedPdf && (
        <div className='w-fit m-auto mt-5 text-center'>
          <button className='bg-[rgb(119,2,7)] font-bold p-3 text-white' onClick={handleDownloadExtractedPdf}>Download</button>
          <p className='text-sm text-black mt-3 mb-10'>Click here to download extracted pdf</p>
        </div>
      )}

    </div>
  )
}


export default PdfViewer