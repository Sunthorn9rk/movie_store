"use client";
import {useState, useEffect} from "react";
import {MdLocalMovies} from "react-icons/md";
import {IoTrashBinOutline} from "react-icons/io5";
import {IoBagCheckOutline} from "react-icons/io5";

// ดึงค่า API Key ผ่าน API ฝั่ง Server
const useApiKey = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const res = await fetch("/api/getApiKey");
        const data = await res.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error("Failed to fetch API Key:", error);
      }
    };

    fetchApiKey();
  }, []);

  return apiKey;
};

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const apiKey = useApiKey();

  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(60); // 1 minute countdown

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      )
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.error("Error fetching movie data:", error));
    }
  }, [query, apiKey]);

  useEffect(() => {
    // Check if there's any cart data stored in localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie, price) => {
    setCart((prevCart) => [...prevCart, {...movie, price, quantity: 1}]);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const startPurchase = () => {
    setShowPopup(true);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setShowPopup(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateDiscount = () => {
    const totalQuantity = getTotalQuantity();
    if (totalQuantity > 5) {
      return 0.2; // 20% discount
    } else if (totalQuantity > 3) {
      return 0.1; // 10% discount
    }
    return 0;
  };

  const calculateTotal = () => {
    const discount = calculateDiscount();
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total * (1 - discount);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-10">
      <h1 className="flex text-4xl font-bold mb-6 text-gray-800">
        <MdLocalMovies />
        Movie Store
      </h1>

      {/* Search bar */}
      <div className="w-full max-w-xl p-4 bg-gray-100 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
          className="w-full p-4 text-xl rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {movie.title}
              </h3>
              <p className="text-gray-600 mt-2">{movie.release_date}</p>
              <input
                type="number"
                placeholder="Enter price"
                className="mt-4 p-2 rounded-lg bg-gray-100 text-black"
                onChange={(e) => (movie.price = e.target.value)}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2"
                onClick={() => addToCart(movie, movie.price)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="w-full max-w-3xl mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="bg-gray-200 p-2 rounded"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="bg-gray-200 p-2 rounded"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="w-32 text-center">
                  <div className="font-semibold">
                    ฿{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 font-semibold text-lg text-gray-800">
              Total: ฿{calculateTotal().toFixed(2)}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {/* Show discount information */}
              {getTotalQuantity() > 5 && <p>You've earned a 20% discount!</p>}
              {getTotalQuantity() > 3 && getTotalQuantity() <= 5 && (
                <p>You've earned a 10% discount!</p>
              )}
            </div>
          </div>
        )}
        <div className="flex mt-4">
          <button
            className="flex bg-red-500 text-white p-2 rounded m-2"
            onClick={clearCart}
          >
            <IoTrashBinOutline className="text-xl" />
            Clear Cart
          </button>
          <button
            className="flex bg-green-500 text-white p-2 rounded m-2"
            onClick={startPurchase}
          >
            <IoBagCheckOutline className="text-xl" />
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Popup for Purchase */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Order Confirmation
            </h3>
            <p className="mb-4">Please pay to account: 123-456-7890</p>
            <p className="mb-4">Total: ฿{calculateTotal().toFixed(2)}</p>
            <p>Time remaining: {timer}s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
