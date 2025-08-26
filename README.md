# Stock Ticker Application

This is a robust stock ticker application built with **Next.js**, **React**, **Redux Toolkit**, **Axios**, **Chart.js**, and **Tailwind CSS**. It allows users to search for stocks, view their historical price data, and provides a smooth user experience.

## Features

- **Stock Search with Autocomplete:** Efficient search functionality with debouncing to optimize API calls and clear "No results found" feedback.
- **Dynamic Stock Details Page:** Dedicated pages for individual stocks displaying comprehensive information.
- **Responsive Stock Price Chart:** Interactive charts powered by Chart.js, showing historical price movements.
- **Global State Management with Redux Toolkit:** Centralized state management for search results, stock details, loading states, and errors.
- **Server-Side Data Fetching (SSR) for SEO & Robust 404 Handling:** Initial stock data is fetched on the server, ensuring good SEO and proper redirection to a 404 page for unavailable stock symbols.
- **Loading Indicators:** Seamless loading UI during page transitions to stock detail pages.
- **Rupee (Rs.) Currency Formatting:** All prices are displayed with the "Rs." prefix for clear financial representation.
- **SEO-friendly Meta Tags:** Properly configured META tags for page title, description, and keywords on stock detail pages.

## Usage Walkthrough

1.  **Start the Application:**

    - Ensure the application is running in development mode (`npm run dev`) or production mode (`npm run start` after `npm run build`).
    - Open your web browser and navigate to `http://localhost:3000`.

2.  **Search for a Stock:**

    - On the homepage, you will see a search bar.
    - Start typing the name or symbol of a stock (e.g., "TCS", "Reliance", "AAPL").
    - The application will automatically suggest matching stocks as you type, with a short delay to optimize API calls.
    - If no matching stocks are found, a "No results found." message will appear.

3.  **View Stock Details:**

    - From the search suggestions, click on the stock you wish to view.
    - You will be navigated to a dedicated stock details page.
    - During the transition, a loading indicator will be displayed.
    - On the stock details page, you will see:
      - The company name and stock symbol.
      - The latest stock price, formatted in Rupees (Rs.).
      - A historical price chart showing the stock's movement over the last 30 days.

4.  **Explore Other Stocks:**
    - You can use your browser's back button to return to the search page and look up other stocks.

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd stock-ticker-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

To run the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## API Endpoints Used

- **Stock Search:** `https://portal.tradebrains.in/api/assignment/search?keyword=<KEYWORD>&length=10`
- **Stock Prices:** `https://portal.tradebrains.in/api/assignment/stock/<SYMBOL>/prices?days=<DAYS>&type=INTRADAY&limit=<LIMIT>`

## Project Structure

- `src/app/page.js`: Main landing page with stock search.
- `src/app/stock/[symbol]/page.js`: Dynamic page to display individual stock details and chart (Server Component).
- `src/app/stock/[symbol]/loading.js`: Loading UI for stock detail page transitions.
- `src/components/StockSearch.jsx`: React component for stock search and autocomplete.
- `src/components/StockDetails.jsx`: React component for displaying individual stock details (Client Component).
- `src/components/StockChart.jsx`: React component for rendering stock price charts.
- `src/hooks/`: Custom React hooks (e.g., `useDebounce`).
- `src/lib/redux/`: Redux store configuration, slices, and thunks.
- `src/app/globals.css`: Global styles, including Tailwind CSS imports.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd stock-ticker-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

To run the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## API Endpoints Used

- **Stock Search:** `https://portal.tradebrains.in/api/assignment/search?keyword=<KEYWORD>&length=10`
- **Stock Prices:** `https://portal.tradebrains.in/api/assignment/stock/<SYMBOL>/prices?days=<DAYS>&type=INTRADAY&limit=<LIMIT>`

## Project Structure

- `src/app/page.js`: Main landing page with stock search.
- `src/app/stock/[symbol]/page.js`: Dynamic page to display individual stock details and chart (Server Component).
- `src/app/stock/[symbol]/loading.js`: Loading UI for stock detail page transitions.
- `src/components/StockSearch.jsx`: React component for stock search and autocomplete.
- `src/components/StockDetails.jsx`: React component for displaying individual stock details (Client Component).
- `src/components/StockChart.jsx`: React component for rendering stock price charts.
- `src/hooks/`: Custom React hooks (e.g., `useDebounce`).
- `src/lib/redux/`: Redux store configuration, slices, and thunks.
- `src/app/globals.css`: Global styles, including Tailwind CSS imports.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.
