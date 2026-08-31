import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Home() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) nav("/");

  // Sample movies list
const movies = [
  {
    id: 1,
    name: "Avengers: Endgame",
    desc: "Superheroes unite to save the world.",
    location: "Pune",
    theatre: "PVR ICON, Phoenix Mall",
    timings: ["10:00 AM", "1:00 PM", "6:00 PM"],
  },
  {
    id: 2,
    name: "Inception",
    desc: "A mind-bending thriller about dreams.",
    location: "Pune",
    theatre: "INOX, Bund Garden",
    timings: ["11:00 AM", "3:00 PM", "9:00 PM"],
  },
  {
    id: 3,
    name: "The Lion King",
    desc: "A young lion's journey to become king.",
    location: "Pune",
    theatre: "Cinepolis, Seasons Mall",
    timings: ["9:00 AM", "12:00 PM", "5:00 PM"],
  },
  {
    id: 4,
    name: "Interstellar",
    desc: "A team of explorers travels through a wormhole in space.",
    location: "Pune",
    theatre: "PVR Cinemas, Pavilion Mall",
    timings: ["10:30 AM", "2:30 PM", "7:30 PM"],
  },
  {
    id: 5,
    name: "Oppenheimer",
    desc: "The story of the scientist behind the development of the atomic bomb.",
    location: "Pune",
    theatre: "INOX, Amanora Mall",
    timings: ["11:30 AM", "4:00 PM", "8:30 PM"],
  },
  {
    id: 6,
    name: "Avatar: The Way of Water",
    desc: "The Sully family explores the beautiful underwater world of Pandora.",
    location: "Pune",
    theatre: "Cinepolis, Westend Mall",
    timings: ["10:00 AM", "2:00 PM", "6:30 PM"],
  },
  {
    id: 7,
    name: "Spider-Man: No Way Home",
    desc: "Spider-Man faces unexpected villains from different universes.",
    location: "Pune",
    theatre: "PVR ICON, Pavilion Mall",
    timings: ["9:30 AM", "1:30 PM", "5:30 PM"],
  },
  {
    id: 8,
    name: "The Batman",
    desc: "Batman investigates a series of mysterious crimes in Gotham City.",
    location: "Pune",
    theatre: "INOX, Phoenix Marketcity",
    timings: ["11:00 AM", "3:30 PM", "8:00 PM"],
  },
  {
    id: 9,
    name: "Jurassic World",
    desc: "A dinosaur theme park becomes a fight for survival.",
    location: "Pune",
    theatre: "Cinepolis, Seasons Mall",
    timings: ["10:15 AM", "2:45 PM", "7:00 PM"],
  },
  {
    id: 10,
    name: "Dune: Part Two",
    desc: "Paul Atreides joins the Fremen on a journey for revenge and destiny.",
    location: "Pune",
    theatre: "PVR Cinemas, Kumar Pacific",
    timings: ["12:00 PM", "4:30 PM", "9:00 PM"],
  },
    {
    id: 11,
    name: "Iron Man",
    desc: "A billionaire engineer builds a powerful suit and becomes a superhero.",
    location: "Pune",
    theatre: "PVR ICON, Phoenix Mall",
    timings: ["10:30 AM", "2:00 PM", "6:30 PM"],
  },
  {
    id: 12,
    name: "Guardians of the Galaxy",
    desc: "A group of unlikely heroes joins forces to protect the galaxy.",
    location: "Pune",
    theatre: "INOX, Bund Garden",
    timings: ["11:00 AM", "3:30 PM", "8:00 PM"],
  },
  {
    id: 13,
    name: "Black Panther",
    desc: "The king of Wakanda must protect his kingdom from a powerful enemy.",
    location: "Pune",
    theatre: "Cinepolis, Seasons Mall",
    timings: ["9:30 AM", "1:30 PM", "5:30 PM"],
  },
  {
    id: 14,
    name: "Doctor Strange",
    desc: "A brilliant surgeon discovers the mystical arts and learns to protect the world.",
    location: "Pune",
    theatre: "PVR Cinemas, Pavilion Mall",
    timings: ["10:00 AM", "2:30 PM", "7:30 PM"],
  },
  {
    id: 15,
    name: "Top Gun: Maverick",
    desc: "A legendary pilot returns to train a new generation of elite aviators.",
    location: "Pune",
    theatre: "INOX, Amanora Mall",
    timings: ["11:30 AM", "4:00 PM", "9:00 PM"],
  },
];
 const [selected, setSelected] = useState({
  movie: "",
  timing: "",
  location: "",
  theatre: "",
});

const [seatCounts, setSeatCounts] = useState({});

const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().split("T")[0]
);

// Payment popup state
const [showPayment, setShowPayment] = useState(false);
const [paymentMovie, setPaymentMovie] = useState(null);
const [paymentAmount, setPaymentAmount] = useState(0);

const getAvailableDates = () => {
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const availableDates = getAvailableDates();

const getMoviesForDate = () => {
  if (!selectedDate) return movies;

  // Create a number from the selected date
  const dateNumber = selectedDate
    .split("-")
    .join("")
    .split("")
    .reduce((sum, num) => sum + Number(num), 0);

  // Shuffle movies based on the date
  const shuffledMovies = [...movies].sort((a, b) => {
    const valueA = (a.id * dateNumber) % 17;
    const valueB = (b.id * dateNumber) % 17;

    return valueA - valueB;
  });

  // Different number of movies for different dates
  const movieCount = 8 + (dateNumber % 5);

  return shuffledMovies.slice(0, movieCount);
};

const displayedMovies = getMoviesForDate();

 const bookTicket = (movie) => {
  const seats = seatCounts[movie.id] || 1;

  // Ticket price
  const ticketPrice = 200;
  const totalAmount = seats * ticketPrice;

  // Store selected movie/payment information
  setPaymentMovie(movie);
  setPaymentAmount(totalAmount);

  // Open QR payment popup
  setShowPayment(true);
};

const completePayment = async () => {
  try {
    const bookingData = {
      movie: paymentMovie.name,
      location: paymentMovie.location,
      theatre: paymentMovie.theatre,
      timing: selected.timing,
      date: selectedDate,
      seats: seatCounts[paymentMovie.id] || 1,
    };

    console.log("BOOKING DATA:", bookingData);

    await axios.post(
      "http://localhost:5000/tickets/book",
      bookingData,
      { headers: { token } }
    );

    // Close QR popup
    setShowPayment(false);

    // Payment success message
    alert("🎉 Payment Successful!\nYour movie ticket has been booked.");

  } catch (err) {
    console.log(err);
    alert("Payment completed, but ticket booking failed.");
  }
};

  return (
   
 <div
  className="min-h-screen bg-cover bg-center bg-fixed"
  style={{
    backgroundImage:
      "linear-gradient(rgba(15, 23, 80, 0.65), rgba(0, 0, 0, 0.72)), url('https://wallpaperaccess.com/full/4839516.jpg')"
  }}
>
  {/* TOP NAVIGATION BAR */}
  <nav className="bg-slate-950/95 text-white px-8 py-4 flex items-center justify-between shadow-xl">

   {/* WEBSITE TITLE */}
<div>
  <div className="text-3xl font-black uppercase tracking-[0.2em]">
    CINEBOOK 
  </div>

  <p className="text-sm text-blue-200 mt-1 italic">
    Book Your Next Big Screen Experience.
  </p>
</div>

    {/* NAVIGATION OPTIONS */}
    <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-wider">

      <a
        href="/home"
        className="hover:text-blue-400 transition duration-300"
      >
        Home
      </a>

      <a
        href="/profile"
        className="hover:text-blue-400 transition duration-300"
      >
        Profile
      </a>

      <a
        href="/"
        className="hover:text-red-400 transition duration-300"
      >
        Logout
      </a>

    </div>



  </nav>

{/* DATE SELECTION */}
<div className="max-w-6xl mx-auto px-6 pt-8">

  <h2 className="text-2xl font-bold text-white text-center mb-4">
    Select Date
  </h2>

  <div className="flex gap-3 overflow-x-auto pb-4 justify-center">

    {availableDates.map((date) => {
      const dateValue = date.toISOString().split("T")[0];

      const today = new Date().toISOString().split("T")[0];

      return (
        <button
          key={dateValue}
          onClick={() => setSelectedDate(dateValue)}
          className={`min-w-[100px] px-4 py-3 rounded-xl font-semibold transition duration-300 ${
            selectedDate === dateValue
              ? "bg-orange-500 text-white shadow-lg scale-105"
              : "bg-white/90 text-slate-800 hover:bg-blue-100"
          }`}
        >

          <div className="text-sm">
            {date.toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </div>

          <div className="text-lg font-bold">
            {date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </div>

          {dateValue === today && (
            <div className="text-xs mt-1">
              TODAY
            </div>
          )}

        </button>
      );
    })}

  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {displayedMovies.map((movie) => (
          <div key={movie.id} className="bg-blue-50 rounded-xl shadow-lg p-4 hover:shadow-2xl transition">
            
<h2 className="text-xl font-semibold">{movie.name}</h2>

<p className="text-gray-600 mb-2">
  {movie.desc}
</p>

<div className="mb-3">
  <p className="text-gray-700 font-semibold">
    📍 Location:{" "}
    <span className="font-normal">{movie.location}</span>
  </p>

  <p className="text-gray-700 font-semibold">
    🎭 Theatre:{" "}
    <span className="font-normal">{movie.theatre}</span>
  </p>
</div>

<p className="font-semibold mb-2">
  Show Timings:
</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {movie.timings.map((time) => (
                <button
                  key={time}
                  className={`px-3 py-1 rounded border ${
                    selected.timing === time && selected.movie === movie.name
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => 
                    setSelected({ 
                      ...selected,
                       movie: movie.name,
                        timing: time,
                        location: movie.location,
                        theatre: movie.theatre
                    })
                  }
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-3">
  <label>Seats:</label>

  <input
    type="number"
    min="1"
    value={seatCounts[movie.id] || 1}
    onChange={(e) =>
      setSeatCounts({
        ...seatCounts,
        [movie.id]: Number(e.target.value),
      })
    }
    className="w-16 border rounded px-2 py-1"
  />
</div>


  <button
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
  onClick={() => bookTicket(movie)}
  disabled={selected.movie !== movie.name}
>
  Book Ticket
</button>
          </div>
        ))}
      </div>

            <div className="mt-6 text-center">
        <Link
          to="/profile"
          className="text-white font-semibold underline"
        >
          Go to Profile
        </Link>
  {/* FOOTER */}
<footer className="mt-16 bg-slate-950 text-white">

  {/* Main Footer */}
  <div className="max-w-7xl mx-auto px-8 py-12">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* CINEBOOK */}
      <div>
        <h2 className="text-2xl font-black tracking-widest">
          CINEBOOK 
        </h2>

        <p className="text-gray-400 mt-3 text-sm leading-6">
          Book Your Next Big Screen Experience.
          Discover movies, choose your show,
          select your seats and enjoy the movie.
        </p>
      </div>

  
{/* QUICK LINKS */}
<div>
  <h3 className="text-lg font-bold mb-4">
    Quick Links
  </h3>

  <div className="space-y-3 text-sm">

    <Link
      to="/home"
      className="block text-gray-400 hover:text-blue-400 transition duration-300"
    >
       Home
    </Link>

    
   
    <Link
      to="/profile"
      className="block text-gray-400 hover:text-blue-400 transition duration-300"
    >
       My Account
    </Link>

  </div>
</div>



      {/* PROJECT */}
      <div>
        <h3 className="text-lg font-bold mb-4">
          Project
        </h3>

        <div className="space-y-2 text-sm text-gray-400">
          <p>Movie Ticket Booking System</p>
          <p>Full Stack Web Application</p>
          <p>MongoDB Database</p>
          <p>React + Node.js</p>
        </div>
      </div>

      {/* DEVELOPER */}
      <div>
        <h3 className="text-lg font-bold mb-4">
          Developed By
        </h3>

        <div className="text-sm text-gray-400 space-y-2">
          <p className="text-white font-semibold text-base">
            Mrunal Nikalje
          </p>

          <p>
            Vishwakarma Institute of Technology
          </p>

          <p>
            Computer Science & Engineering (AI)
          </p>

        
          <p>
            Pune, Maharashtra
          </p>
        </div>
      </div>

    </div>

    {/* Divider */}
    <div className="border-t border-slate-800 mt-10 pt-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        <p className="text-gray-500 text-sm">
          © 2024 CINEBOOK. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm">
          Academic Project • Developed by Mrunal Nikalje
        </p>

      </div>

    </div>

  </div>

</footer>

      </div>

      {/* PAYMENT POPUP */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 text-center">

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              🎟️ Complete Payment
            </h2>

            <p className="text-gray-600 mb-2">
              {paymentMovie?.name}
            </p>

            <p className="text-gray-500 text-sm mb-3">
              {paymentMovie?.theatre}
            </p>

            <p className="text-lg font-semibold text-purple-600 mb-4">
              Amount: ₹{paymentAmount}
            </p>

            {/* Dummy QR Code */}
            <div className="flex justify-center mb-5">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=CINEBOOK-DUMMY-PAYMENT"
                alt="Dummy Payment QR"
                className="w-52 h-52 border-4 border-slate-200 rounded-lg"
              />
            </div>

            <p className="text-sm text-gray-500 mb-5">
              Scan the QR code to make payment
            </p>

            <button
              onClick={completePayment}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Done
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;




// Developed by MRUNAL NIKALJE