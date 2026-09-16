# ERP Workflow System (PERN Stack)

## Tech Stack
- React.js
- Node.js
- Express.js
- PostgreSQL

## Features
- Create Enquiry
- Generate Quotation
- Backend calculation (GST, Discount)
- Fetch quotation details

## Workflow
Customer Enquiry → Quotation → View Data

## Setup Instructions

### Backend
cd backend  
npm install  
nodemon index.js  

### Frontend
cd frontend  
npm install  
npm run dev  

## API Endpoints
- POST /enquiries
- POST /quotations
- GET /quotations/:id

## Notes
- Backend handles all calculations
- PostgreSQL ensures relational data consistency
