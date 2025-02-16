# ✈️ SkySearch - Flight Finder Pro [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern flight search engine inspired by Google Flights, built with React and Material UI. Find the best flight deals with real-time pricing and intuitive filters.

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.14-blueviolet)](https://mui.com/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22-2C8EBB)](https://yarnpkg.com/)

## 🖥️ Live Demo

Check out the live demo: [Netlify deployment](https://air-scraper.netlify.app)

## 📸 Screenshots

### 🏠 Home Page - Flight Search

![Home Page](./public/screenshots/step-1-home-screen.png)

### 🔎 Search Results

![Results Page](./public/screenshots/step-2-flight-options.png)

### ✈️ Flight Details

![Details Page](./public/screenshots/step-3-flight-details.png)

### ✈️ View Booking Options

![Booking Options](./public/screenshots/step-4-show-booking-options.png)

## 🚀 Features

- 🌍 Multi-city flight search capabilities
- 📅 Flexible date picker with price calendar
- ⚡ Real-time price comparisons
- 🔍 Advanced filters (stops, airlines, price range)
- 📱 Fully responsive design
- ✨ Interactive flight path visualization

## 🛠️ Tech Stack

- **Frontend**:
  - ⚛️ React 18
  - 🎨 Material UI 5
  - 🛣️ React Router 6
- **Backend**:
  - 🔄 TanStack Query v4
  - 📡 Axios
- **Tooling**:
  - ⚡ Vite
  - 🧶 Yarn
  - 🔑 Environment Configuration

## 🚨 Getting Started

### Prerequisites

- Node.js ≥16.0
- Yarn

### Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/sky-search.git

2. Install dependencies:

```bash
yarn install
```

3. 🔑 Set Up Environment Variables

   **Get Your API Key:**

   - Visit [Sky Scrapper API on RapidAPI](https://rapidapi.com/apiheya/api/sky-scrapper).
   - Sign in or create a RapidAPI account.
   - Subscribe to the API and retrieve your **API Key** from the **Dashboard**.

     **onfigure the `.env` File:**

   - Open the `.env` file and paste your API key:

     ```env
     VITE_SKY_SCRAPPER_KEY=your_api_key_here
     ```

     **Save the file** and you're good to go! 🚀

4. Start development server:

```bash
yarn dev
```
