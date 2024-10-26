# Weather-App

A web application to get weather updates using Flask for the backend and React Vite for the frontend.

## Prerequisites

### For Backend (Flask):
- Python 3.x
- virtualenv

### For Frontend (React Vite):
- Node.js (>=14.x)
- npm or yarn

## Installation

### Backend (Flask):
1. Clone the repository:
   ```sh
   git clone https://github.com/Rtarun3606k/Weather-App.git
   cd Weather-App
   cd backend
   ```

2. Setup Virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   # On Windows use `
   venv\Scripts\activate`
   ```
3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Run migrations:
    ```sh
    flask db init
    ```
    to migrate files or changes in db :
    ```sh
    flask db migrate  -m"<Your comments>"
    ```
    to upgrade db:
   ```sh
   flask db upgrade
   ```

5. Create .env file and add these contents
    ```txt
    GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
    GMAIL_ID=<Your gmail id to send alerts email this is the senders gmail id >
    PORT=3000 #default
    SMTP_SERVER=smtp.gmail.com
    EMAIL_PORT=465 #default for gmail
    OPEN_WEATHER_API_KEY=<your open weather api key>
    ```

6. Setting up for docker env variables:
  ```txt
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=development
      - DATABASE_URI=sqlite:///app.db #default 
      - GMAIL_PASSWORD=Your_Password
      - GMAIL_ID=your_gmail
      - PORT=3000 #default
      - EMAIL_PORT=465 #default
      - OPEN_WEATHER_API_KEY=YourAPIKEY
    volumes:
      - .:/app

  ````

8. To run an development severver :
    ```sh
    flask run
    ```
    or
   ```sh
   python3 wsgi.py
   ```

    for deveployment server run guicorn:

   ```sh
   gunicorn -c gunicorn_config.py wsgi:app
   ```

   If Docker insatlled  run development server:

   ```sh
   sudo systemctl enable docker --now  
   sudo docker-compose down
   sudo docker system prune -f
   sudo docker volume prune -f
   sudo docker-compose up --build
   ```

  ## Frontend (React Vite): 

  1. Navigate to the frontend directory:
     ```sh
     cd frontend
     ```
  2. install dependences:
     ```sh
     npm install
     ```
  3. run Frontend
    ```sh
    npm run dev
    ```
# reminder run backend first and then frontend to avoid confusion or errors

## Project Structure
    backend/: Contains the Flask backend code.
    frontend/: Contains the React Vite frontend code.
    backend/requirements.txt: Python dependencies.
    frontend/package.json: Node dependencies and scripts.

    
# Navigation
    backend/app.py: Main entry point for the Flask app.
    frontend/src/: Source files for the React app.
    Additional Information

    
    Refer to Setting up a Python project for GitHub Codespaces for configuring virtual environments.
    Refer to Setting up a Node.js project for GitHub Codespaces for Node.js and npm setup.




