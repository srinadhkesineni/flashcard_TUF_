import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../utilities/Constant";

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(URL + "flashcards");
      const data = await response.json();
      console.log(data);
      setFlashcards(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
//     <div
//       className={
//         darkMode
//           ? "bg-gray-800 text-white h-[100vh]"
//           : "bg-white text-black h-[100vh]"
//       }
//     >
//       <div className="flex justify-between items-center px-4 py-2">
//         <Link to="/admin">
//           <button className="bg-green-600 rounded-md px-2 py-1 m-2 text-white">
//             Admin
//           </button>
//         </Link>
//         <button
//           className="bg-gray-600 rounded-md px-2 py-1 m-2 text-white"
//           onClick={toggleDarkMode}
//         >
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>
//       </div>
//       <div className="flex justify-center items-center h-[90vh] flex-col no-select">
//         {flashcards.length > 0 &&
//           (!flipped ? (
//             <div
//               className={
//                 darkMode
//                   ? "bg-gray-700 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
//                   : "bg-gray-300 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
//               }
//               onClick={handleFlip}
//             >
//               <div>
//                 <h2 className="text-center font-bold p-4 text-xl">Question</h2>
//                 <div className="bg-black h-[2px]"></div>
//               </div>
//               <div className="w-full h-[70%] flex justify-center items-center">
//                 <p className="text-center justify-center font-semibold px-2">
//                   {flashcards[currentCard].question}
//                 </p>
//               </div>
//               <div>
//                 <div className="bg-black h-[2px]"></div>
//                 <p className="text-center p-2 text-sm">Click to flip</p>
//               </div>
//             </div>
//           ) : (
//             <div
//               className={
//                 darkMode
//                   ? "bg-gray-700 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
//                   : "bg-gray-300 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
//               }
//               onClick={handleFlip}
//             >
//               <div>
//                 <h2 className="text-center font-bold p-4 text-xl">Answer</h2>
//                 <div className="bg-black h-[2px]"></div>
//               </div>
//               <div className="w-full h-[70%] flex justify-center items-center">
//                 <p className="text-center justify-center font-semibold px-2">
//                   {flashcards[currentCard].answer}
//                 </p>
//               </div>
//               <div>
//                 <div className="bg-black h-[2px]"></div>
//                 <p className="text-center p-2 text-sm">Click to flip</p>
//               </div>
//             </div>
//           ))}

//         <div className="flex justify-between w-[300px] mt-2">
//           <div>
//             <button
//               className="rounded-md bg-green-600 text-white px-2 py-1"
//               onClick={handlePrevious}
//               disabled={flashcards.length === 0}
//             >
//               Previous
//             </button>
//           </div>
//           <div>
//             <button
//               className="rounded-md bg-green-600 text-white px-2 py-1"
//               onClick={handleNext}
//               disabled={flashcards.length === 0}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
<div
className={`${
  darkMode ? "bg-[#A28B55] text-blue-100" : "bg-blue-50 text-[#86AB89]"
} min-h-screen flex flex-col`}
>
<header className="flex justify-between items-center px-6 py-4 shadow-md bg-[#e1ddd3] text-white">
  <Link to="/admin">
    <button className="bg-yellow-500 hover:bg-yellow-600 rounded-lg px-4 py-2 text-blue-900 transition font-semibold">
      Admin
    </button>
  </Link>
  <button
    className="bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 text-blue-900 transition font-semibold"
    onClick={toggleDarkMode}
  >
    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  </button>
</header>

<main className="flex-grow flex justify-center items-center">
  <div className="w-full max-w-md">
    {flashcards.length > 0 && (
      <div
        className={`relative ${
          darkMode ? "bg-[#d39b17]" : "bg-blue-100"
        } w-full rounded-lg shadow-lg p-6 flex flex-col transition-all duration-500 ease-in-out transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          minHeight: '200px',
          maxHeight: '500px',
        }}
      >
        <div className={`absolute inset-0 backface-hidden flex flex-col ${flipped ? 'hidden' : ''}`}>
          <h2 className="text-center font-bold text-2xl mb-4">Question</h2>
          <div className="bg-purple-500 h-[2px] mb-4"></div>
          <p className="text-center font-semibold text-lg px-4">
            {flashcards[currentCard].question}
          </p>
          <div className="mt-auto flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-white transition font-semibold mt-4"
              onClick={handleFlip}
            >
              Reveal Answer
            </button>
          </div>
        </div>

        <div className={`absolute inset-0 backface-hidden flex flex-col ${!flipped ? 'hidden' : ''}`}>
          <h2 className="text-center font-bold text-2xl mb-4">Answer</h2>
          <div className="bg-purple-500 h-[2px] mb-4"></div>
          <p className="text-center font-semibold text-lg px-4">
            {flashcards[currentCard].answer}
          </p>
          <div className="mt-auto flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-white transition font-semibold mt-4"
              onClick={handleFlip}
            >
              Reveal Question
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="flex justify-between mt-6">
      <button
        className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 transition font-semibold"
        onClick={handlePrevious}
        disabled={flashcards.length === 0}
      >
        Previous
      </button>
      <button
        className="rounded-lg bg-yellow-500 hover:bg-yellow-600 #A28B55 px-4 py-2 transition font-semibold"
        onClick={handleNext}
        disabled={flashcards.length === 0}
      >
        Next
      </button>
    </div>
  </div>
</main>
</div>

  )
};
export default Flashcard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { URL } from "../utilities/Constant";

// const Flashcard = () => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [flipped, setFlipped] = useState(false);
//   const [currentCard, setCurrentCard] = useState(0);
//   const [darkMode, setDarkMode] = useState(true); // State for dark mode

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(URL + "flashcards");
//       const data = await response.json();
//       console.log(data);
//       setFlashcards(data);
//     } catch (error) {
//       console.error("Error fetching flashcards:", error);
//     }
//   };

//   const handleFlip = () => {
//     setFlipped(!flipped);
//   };

//   const handlePrevious = () => {
//     setFlipped(false);
//     setCurrentCard((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setFlipped(false);
//     setCurrentCard((prev) => (prev + 1) % flashcards.length);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div
//       className={`${
//         darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-50 text-blue-900"
//       } min-h-screen flex flex-col`}
//     >
//       <header className="flex justify-between items-center px-6 py-4 shadow-md bg-blue-700 text-white">
//         <Link to="/admin">
//           <button className="bg-yellow-500 hover:bg-yellow-600 rounded-lg px-4 py-2 text-blue-900 transition font-semibold">
//             Admin
//           </button>
//         </Link>
//         <button
//           className="bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 text-blue-900 transition font-semibold"
//           onClick={toggleDarkMode}
//         >
//           {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//         </button>
//       </header>

//       <main className="flex-grow flex justify-center items-center">
//         <div className="w-full max-w-md">
//           {flashcards.length > 0 && (
//             <div className="relative perspective">
//               <div
//                 className={`relative w-full h-full preserve-3d transition-transform duration-500 ease-in-out ${
//                   flipped ? "rotate-y-180" : ""
//                 }`}
//               >
//                 {/* Front Side - Question */}
//                 <div
//                   className={`${
//                     darkMode ? "bg-blue-800" : "bg-blue-100"
//                   } w-full rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] max-h-[500px] backface-hidden`}
//                 >
//                   <h2 className="text-center font-bold text-2xl mb-4">Question</h2>
//                   <div className="bg-purple-500 h-[2px] mb-4"></div>
//                   <p className="text-center font-semibold text-lg px-4">
//                     {flashcards[currentCard].question}
//                   </p>
//                   <div className="flex justify-center mt-auto">
//                     <button
//                       className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-white transition font-semibold"
//                       onClick={handleFlip}
//                     >
//                       {flipped ? "Reveal Question" : "Reveal Answer"}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Back Side - Answer */}
//                 <div
//                   className={`${
//                     darkMode ? "bg-blue-800" : "bg-blue-100"
//                   } w-full rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] max-h-[500px] backface-hidden absolute top-0 left-0 rotate-y-180`}
//                 >
//                   <h2 className="text-center font-bold text-2xl mb-4">Answer</h2>
//                   <div className="bg-purple-500 h-[2px] mb-4"></div>
//                   <p className="text-center font-semibold text-lg px-4">
//                     {flashcards[currentCard].answer}
//                   </p>
//                   <div className="flex justify-center mt-auto">
//                     <button
//                       className="bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-white transition font-semibold"
//                       onClick={handleFlip}
//                     >
//                       {flipped ? "Reveal Question" : "Reveal Answer"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between mt-6">
//             <button
//               className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 transition font-semibold"
//               onClick={handlePrevious}
//               disabled={flashcards.length === 0}
//             >
//               Previous
//             </button>
//             <button
//               className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 transition font-semibold"
//               onClick={handleNext}
//               disabled={flashcards.length === 0}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Flashcard;

