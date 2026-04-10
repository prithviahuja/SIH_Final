# Jalmitra

A full-stack application for analyzing and visualizing groundwater data in India, featuring AI-powered chat assistance and interactive maps.

## Project Overview

This project consists of:
- **Backend**: Python-based Streamlit application with AI agents for natural language queries on groundwater data
- **Frontend**: React/TypeScript application with interactive visualizations and chatbot interface

## Features

### Backend (Streamlit)
- Multi-language support (English, Hindi, Telugu, Tamil, Kannada, Bengali, Marathi, Gujarati, Punjabi)
- AI-powered intent recognition and SQL query generation
- Data visualization with Plotly
- SQLite database for groundwater data storage
- Translation capabilities using Groq AI

### Frontend (React/Vite)
- Interactive map visualization
- Analytics dashboard
- Chatbot interface
- Data panels and components
- Responsive design with Tailwind CSS

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure data files:
   - Update `configuration/config.py` with correct paths to Excel data files
   - Ensure GROQ_API_KEY is set (currently hardcoded for demo)

5. Run the application:
   ```bash
   streamlit run main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/Ingres-main
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## Project Structure

```
.
├── backend/
│   ├── main.py                 # Main Streamlit application
│   ├── backend.py              # Additional backend logic
│   ├── requirements.txt        # Python dependencies
│   ├── venv/                   # Virtual environment
│   ├── agents/
│   │   ├── agent.py            # AI agent components
│   ├── configuration/
│   │   ├── config.py           # Configuration settings
│   ├── Database/
│   │   ├── setup.py            # Database initialization
│   └── visualizer/
│       └── visualize.py        # Data visualization logic
├── frontend/
│   └── Ingres-main/
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── pages/          # Application pages
│       │   ├── DATA/           # Static data files
│       │   └── types/          # TypeScript types
│       └── package.json        # Node dependencies
└── README.md
```

## Usage

1. Start the backend server (Streamlit app)
2. Start the frontend development server
3. Access the application through the frontend interface
4. Use the chatbot to query groundwater data in multiple languages
5. Explore interactive maps and analytics

## Data Sources

The application uses groundwater assessment data from Indian districts, including:
- Recharge from rainfall and other sources
- Extraction for irrigation, industrial, and domestic use
- Categorization of groundwater status (safe, semi-critical, critical, over-exploited)

## Technologies Used

### Backend
- Python
- Streamlit
- LangChain
- Groq AI
- SQLAlchemy
- Pandas
- Plotly

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.