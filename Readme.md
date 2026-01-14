
## 🚀 Live Preview
**Site Url:** [https://mern-harshsharma-assignment-8.onrender.com](https://mern-harshsharma-assignment-8.onrender.com)

---

## 🚀 Getting Started


### Prerequisites
- Node.js (version specified in package.json)
- pnpm 
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh091234/Mern_HarshSharma_Assignment_8.git .

   ```

2. **Backend Setup**
   ```bash
   cd server
   pnpm install
   ```

3. **Frontend Setup**
   ```bash
   cd client
   pnpm install
   ```

###  Environment Variables Setup

#### Server (.env)
```bash
PORT=5000
NODE_ENV=dev
MONGO_URI=xxxxxxxxxxxxxxxxxxxxx
ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxx
REFRESH_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_google_app_password
CLIENT_URL=http://localhost:5173
```

#### Client (.env)
Create a `.env` file in the `client` directory:
```env
MODE=development
```

### 🚀 Running the Application

#### Development Mode (Live Preview)

1. **Start the Backend Server**
   ```bash
   cd server
   pnpm run dev
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd client
   pnpm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
