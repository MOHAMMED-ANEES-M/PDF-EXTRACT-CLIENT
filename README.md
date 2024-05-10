
## PDF Extract App

Welcome to PDF Extract App, a user-friendly platform designed to extract specific pages from PDF files effortlessly. With PDF Extract App, you can upload your PDF files and customize your new PDFs by specifying the pages you need. This project leverages a modern technology stack that includes React.js, Node.js, Express, MongoDB, and Tailwind CSS, ensuring a seamless user experience and efficient performance.

## Live Application URL

https://pdf-extractor-jet.vercel.app/

## How to use PDF Extarct App

1.**Select a PDF file:**
- Click the "Select PDF" button to choose the PDF file you want to extract pages from.
- After selected pdf click upload.

![Screenshot 2024-03-22 020622](https://github.com/MOHAMMED-ANEES-M/Pdf-Extract-Client/assets/121078623/7eaea530-b2f7-4b4d-aa72-dbf6f41375cf)

2.**Select pages to extract:**
- Tick the check boxes to specify page number.

![Screenshot 2024-03-22 021717](https://github.com/MOHAMMED-ANEES-M/Pdf-Extract-Client/assets/121078623/105eaa3c-d42a-4fd3-b625-36c73d9c8e8b)

3.**Extract and Download:**
- Click the "Extract Pages" button to process the extraction.
- Once the extraction is complete, you will be able to download the newly created PDF 
with the selected pages.

![Screenshot 2024-03-22 022143](https://github.com/MOHAMMED-ANEES-M/Pdf-Extract-Client/assets/121078623/f77eff36-428c-4b47-b352-fbae2d4fc031)

## APIs

**User:**
APIs for user operations
- POST /api/users/register – Api for user registration
- POST /api/users/login – Api for user login
- GET /api/users/current – Api to fetch current user

**PDF:**
APIs for PDF operations
- POST /api/pdf/upload – Api for uploading pdf file to the server
- GET /api/pdf/ – Api to fetch uploaded pdf file
- POST /api/pdf/extract – Api to extract new pdf from the original pdf by selecting 
specific pages.

## Authentication

JSON Web Token (JWT) is used for secure authentication and authorization.

To access the PDF Extract App, you can use the following login credentials:
- Username: guest1
- Password: 12345

## Key Features

- User registration and login.
- Select specific pages from pdf files to create new customized pdfs.
- Download option for newly created pdfs.

## Technologies

The project utilizes the following technologies:
- Node.js
- Express.js
- MongoDB
- React.js
- Tailwind CSS
- JavaScript
