PDF Extract App
Welcome to PDF Extract App, a user-friendly platform designed to extract specific pages from PDF files effortlessly. With PDF Extract App, you can upload your PDF files and customize your new PDFs by specifying the pages you need. This project leverages a modern technology stack that includes React.js, Node.js, Express, MongoDB, and Tailwind CSS, ensuring a seamless user experience and efficient performance.

Live Link of the application
PDF Extract App
GitHub Repo
Server - https://github.com/MOHAMMED-ANEES-M/Pdf-Extract-Server.git
Client - https://github.com/MOHAMMED-ANEES-M/Pdf-Extract-Client.git

How to Use PDF Extract App
1.	Select a PDF File
•	Click the "Select PDF" button to choose the PDF file you want to extract pages from.
•	After selected pdf click upload.












2.	Select pages to extract
•	Tick the check boxes to specify page number.
 

3.	Extract and Download
•	Click the "Extract Pages" button to process the extraction.
•	Once the extraction is complete, you will be able to download the newly created PDF with the selected pages.











APIs
User
APIs for user operations:
•	POST /api/users/register – Api for user registration
•	POST /api/users/login – Api for user login
•	GET /api/users/current – Api to fetch current user
PDF
APIs for pdf operations:
•	POST /api/pdf/upload – Api for uploading pdf file to the server
•	GET /api/pdf/ – Api to fetch uploaded pdf file
•	POST /api/pdf/extract – Api to extract new pdf from the original pdf by selecting specific pages.

Technologies
The project utilizes the following technologies:
•	Node.js
•	Express.js
•	MongoDB
•	Tailwind CSS
•	JavaScript
•	React.js
Authentication
JSON Web Token (JWT) is used for secure authentication and authorization.

Key Features
•	User registration and login.
•	Select specific pages from pdf files to create new customized pdfs.
•	Download option for newly created pdfs.
