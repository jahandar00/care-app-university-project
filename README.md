--this is a university project 

Datenbanken und Web-Techniken 
Project Task Summer Semester 2024


Name: Jahandar Hakhiyev
Study course: Web Engineering 
Matriculation number: 768924
//
---------------------------------------
Before running the app:
 - You have to download node modules for both backend and frontend folder // 
 - You have to connect your mongoDb database to the server, paste your connection string inside the .env file write your database name and password inside the .env file,
 - You Have to write your localhost inside the following line on app.js file:
   - app.use(cors({ origin: 'http://localhost:{your port number}', credentials: true }));
 - You have to install the following dependencies:
   - for frontend:  
        "axios": "^1.7.2",
        "leaflet": "^1.9.4",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-leaflet": "^4.2.1",
        "react-router-dom": "^6.23.1",
        "sass": "^1.77.2"
    -for backend:
        "@prisma/client": "^5.15.0",
        "axios": "^1.7.2",
        "bcrypt": "^5.1.1",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "nodemon": "^3.1.0",
        "prisma": "^5.15.0",
        "util": "^0.12.5"

How to run the app
 - to run backend server, you need to type "nodemon app.js"
 - to run the frontend, you need to type "npm run dev"