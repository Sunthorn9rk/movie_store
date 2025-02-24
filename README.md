# 🎬 Movie Store

ร้านภาพยนตร์ ที่สร้างขึ้นด้วย ** next.js 15 **, ** React ** และ ** tailwindcss ** ผู้ใช้สามารถค้นหาภาพยนตร์เพิ่มลงในรถเข็น และใช้ส่วนลดตามปริมาณและจำลองกระบวนการชำระเงิน

## 🚀 Features

- 🔍 Search movies from TheMovieDB API
- 🛒 Add movies to cart with custom prices
- 📉 Quantity-based discounts:
  - 10% off for 4+ items
  - 20% off for 6+ items
- 💾 Cart persistence using `localStorage`
- 🕒 Countdown timer for payment simulation
- 📱 Responsive UI with **TailwindCSS**

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [The Movie Database API](https://www.themoviedb.org/documentation/api)

## 🛠️ Installation & Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Sunthorn9rk/movie_store.git
cd movie-store
```

## 2.Install Dependencies

```bash
npm install
```

## 3. Set Up Environment Variables

Create a .env.local file at the root of the project

```bash
REACT_APP_API_KEY=your_api_key_here
```

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Build for Production

```bash
npm run build
npm start
```

## ✅ Usage Guide

Search for a movie using the search bar.
Enter a custom price for the movie and click "Add to Cart."
Adjust quantities directly in the cart.
Click "Proceed to Checkout" to simulate payment with a countdown timer.
Discounts apply automatically based on the total number of items.

## Project Structure

graphql
Copy
Edit
├── app/
│ ├── page.js # Main entry point for the app
│ ├── MovieSearch.jsx # Main component for movie search and cart
│ ├── api/
│ │ └── getApiKey/ # Secure API route to fetch TMDB API Key
├── public/ # Static files (e.g., images)
├── styles/ # Global styles (Tailwind CSS)
├── .env.local # Environment variables
├── README.md # Project documentation
└── package.json # Project configuration

## Acknowledgements

The Movie Database (TMDB)
Next.js
TailwindCSS
