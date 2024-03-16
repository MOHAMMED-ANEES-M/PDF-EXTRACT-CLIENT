import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf';
// import pdf from '../../assets/resumegpt.pdf'
import { pdfjs } from 'react-pdf';
import { fetchPdf, setTokenHeader } from '../../Services/api';
import { errorToast } from '../Toast';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const PdfViewer = ({ pdfUploaded, refresh }) => {

    const [pdf, setPdf] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const token = localStorage.getItem('token')
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }

    const pages = [];
    if (numPages !== null) { 
        for (let i = 1; i <= numPages; i++) {
        pages.push(
            <div key={i} style={{ marginBottom: '20px' }}>
            <Page className='border-2' width={400} pageNumber={i} renderAnnotationLayer={false} renderTextLayer={false} />
            </div>
        );
        }
    }

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
      },[refresh])


  return (
    <div className='mt-10'>
        {pdfUploaded && 
        <>
            <Document className='grid grid-cols-3 m-auto gap-5 w-fit' file={`http://localhost:5000/uploads/${pdf.pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
                {pages}
            </Document>

            <div className='w-fit m-auto mt-5'>
                <button className='bg-green-600 p-3'>Extract PDF</button>
            </div>
        </>
        }
    </div>
  )
}

export default PdfViewer
