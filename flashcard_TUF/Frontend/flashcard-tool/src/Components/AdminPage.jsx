// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { URL } from "../utilities/Constant";

// const MAX_LENGTH = 255; 

// const AdminPage = () => {
//   const [flashcards, setFlashcards] = useState([]);
//   const [newCard, setNewCard] = useState({ question: "", answer: "" });
//   const [editCard, setEditCard] = useState(null);
//   const [darkMode, setDarkMode] = useState(true); 

//   useEffect(() => {
//     fetchFlashcards();
//   }, []);

//   const fetchFlashcards = async () => {
//     try {
//       const response = await fetch(URL + "flashcards");
//       const data = await response.json();
//       setFlashcards(data);
//     } catch (error) {
//       console.error("Error fetching flashcards:", error);
//     }
//   };

//   const handleAddFlashcard = async () => {
//     if (newCard.question.trim() === "" || newCard.answer.trim() === "") {
//       alert("Both question and answer are required!");
//       return;
//     }

  
//     const trimmedCard = {
//       question: newCard.question.slice(0, MAX_LENGTH),
//       answer: newCard.answer.slice(0, MAX_LENGTH),
//     };

//     try {
//       const response = await fetch(URL + "flashcards", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(trimmedCard),
//       });
//       const data = await response.json();
//       setFlashcards([...flashcards, data]);
//       setNewCard({ question: "", answer: "" });
//     } catch (error) {
//       console.error("Error adding flashcard:", error);
//     }
//   };

 
//   const handleEditFlashcard = async (id) => {
//     if (editCard.question.trim() === "" || editCard.answer.trim() === "") {
//       alert("Both question and answer are required!");
//       return;
//     }

   
//     const trimmedCard = {
//       question: editCard.question.slice(0, MAX_LENGTH),
//       answer: editCard.answer.slice(0, MAX_LENGTH),
//     };

//     try {
//       await fetch(URL + `flashcards/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(trimmedCard),
//       });
//       setFlashcards(
//         flashcards.map((card) =>
//           card.id === id ? { ...card, ...trimmedCard } : card
//         )
//       );
//       setEditCard(null);
//     } catch (error) {
//       console.error("Error editing flashcard:", error);
//     }
//   };

 
//   const handleDeleteFlashcard = async (id) => {
//     try {
//       await fetch(URL + `flashcards/${id}`, {
//         method: "DELETE",
//       });
//       setFlashcards(flashcards.filter((card) => card.id !== id));
//     } catch (error) {
//       console.error("Error deleting flashcard:", error);
//     }
//   };


//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div
//       className={
//         darkMode
//           ? "bg-gray-800 text-white min-h-screen"
//           : "bg-white text-black min-h-screen"
//       }
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center p-2">
//           <Link to="/">
//             <button className="bg-green-600 rounded-md px-2 py-1 m-2 text-white">
//               Home
//             </button>
//           </Link>
//           <button
//             className="bg-gray-600 rounded-md px-2 py-1 m-2 text-white"
//             onClick={toggleDarkMode}
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//         <div className="flex justify-center">
//           <div className="w-[600px]">
//             <h1 className="text-3xl font-bold text-center mb-8">
//               Flashcard Admin Dashboard
//             </h1>

//             <div
//               className={
//                 darkMode
//                   ? "bg-gray-700 text-black shadow-lg rounded-lg p-6 mb-8"
//                   : "bg-gray-300 shadow-lg rounded-lg p-6 mb-8"
//               }
//             >
//               <h2
//                 className={
//                   darkMode
//                     ? "text-2xl text-white text-center font-semibold mb-4"
//                     : "text-2xl text-center font-semibold mb-4"
//                 }
//               >
//                 Add New Flashcard
//               </h2>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Question"
//                   value={newCard.question}
//                   onChange={(e) =>
//                     setNewCard({
//                       ...newCard,
//                       question: e.target.value.slice(0, MAX_LENGTH),
//                     })
//                   }
//                   maxLength={MAX_LENGTH}
//                   className="w-full p-2 border border-gray-300 rounded-lg mb-2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Answer"
//                   value={newCard.answer}
//                   onChange={(e) =>
//                     setNewCard({
//                       ...newCard,
//                       answer: e.target.value.slice(0, MAX_LENGTH),
//                     })
//                   }
//                   maxLength={MAX_LENGTH}
//                   className="w-full p-2 border border-gray-300 rounded-lg mb-2"
//                 />
//                 <button
//                   onClick={handleAddFlashcard}
//                   className="text-white p-2 rounded-lg bg-green-600"
//                 >
//                   Add Flashcard
//                 </button>
//               </div>
//             </div>

//             <div
//               className={
//                 darkMode
//                   ? "bg-gray-700 shadow-lg rounded-lg p-6"
//                   : "bg-gray-300 shadow-lg rounded-lg p-6"
//               }
//             >
//               <h2 className="text-2xl font-semibold text-center mb-4">
//                 Manage Flashcards
//               </h2>
//               {flashcards.map((card) => (
//                 <div key={card.id} className="mb-4">
//                   {editCard && editCard.id === card.id ? (
//                     <div className="flex flex-col mb-4 text-black">
//                       <input
//                         type="text"
//                         value={editCard.question}
//                         onChange={(e) =>
//                           setEditCard({
//                             ...editCard,
//                             question: e.target.value.slice(0, MAX_LENGTH),
//                           })
//                         }
//                         maxLength={MAX_LENGTH}
//                         className="w-full p-2 border border-gray-300 rounded-lg mb-2"
//                       />
//                       <input
//                         type="text"
//                         value={editCard.answer}
//                         onChange={(e) =>
//                           setEditCard({
//                             ...editCard,
//                             answer: e.target.value.slice(0, MAX_LENGTH),
//                           })
//                         }
//                         maxLength={MAX_LENGTH}
//                         className="w-full p-2 border border-gray-300 rounded-lg mb-2"
//                       />
//                       <div className="flex justify-between">
//                         <button
//                           onClick={() => handleEditFlashcard(card.id)}
//                           className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => setEditCard(null)}
//                           className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center mb-4">
//                       <div>
//                         <p className="text-lg">
//                           <strong>Q:</strong> {card.question}
//                         </p>
//                         <p className="text-lg">
//                           <strong>A:</strong> {card.answer}
//                         </p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => setEditCard(card)}
//                           className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteFlashcard(card.id)}
//                           className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "../utilities/Constant";

const MAX_LENGTH = 255;

const AdminPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [editCard, setEditCard] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch(URL + "flashcards");
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleAddFlashcard = async () => {
    if (newCard.question.trim() === "" || newCard.answer.trim() === "") {
      alert("Both question and answer are required!");
      return;
    }

    const trimmedCard = {
      question: newCard.question.slice(0, MAX_LENGTH),
      answer: newCard.answer.slice(0, MAX_LENGTH),
    };

    try {
      const response = await fetch(URL + "flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedCard),
      });
      const data = await response.json();
      setFlashcards([...flashcards, data]);
      setNewCard({ question: "", answer: "" });
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const handleEditFlashcard = async (id) => {
    if (editCard.question.trim() === "" || editCard.answer.trim() === "") {
      alert("Both question and answer are required!");
      return;
    }

    const trimmedCard = {
      question: editCard.question.slice(0, MAX_LENGTH),
      answer: editCard.answer.slice(0, MAX_LENGTH),
    };

    try {
      await fetch(URL + `flashcards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedCard),
      });
      setFlashcards(
        flashcards.map((card) =>
          card.id === id ? { ...card, ...trimmedCard } : card
        )
      );
      setEditCard(null);
    } catch (error) {
      console.error("Error editing flashcard:", error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await fetch(URL + `flashcards/${id}`, {
        method: "DELETE",
      });
      setFlashcards(flashcards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#F9F8F3] text-[#333]" : "bg-[#A28B55] text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <button className="bg-[#A28B55] rounded-md px-4 py-2 text-white shadow-lg hover:bg-[#8C6A50] transition-colors">
              Home
            </button>
          </Link>
          <button
            className="bg-gray-600 rounded-md px-4 py-2 text-white shadow-lg hover:bg-gray-700 transition-colors"
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl font-bold text-center mb-8">
              Flashcard Admin Dashboard
            </h1>

            <div
              className={`rounded-lg shadow-lg p-6 mb-8 ${
                darkMode ? "bg-[#DAD6CF] text-[#333]" : "bg-[#8C6A50] text-white"
              }`}
            >
              <h2 className="text-3xl font-semibold text-center mb-6">
                Add New Flashcard
              </h2>
              <div className="mb-6 space-y-4">
                <input
                  type="text"
                  placeholder="Question"
                  value={newCard.question}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      question: e.target.value.slice(0, MAX_LENGTH),
                    })
                  }
                  maxLength={MAX_LENGTH}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A28B55] transition"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={newCard.answer}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      answer: e.target.value.slice(0, MAX_LENGTH),
                    })
                  }
                  maxLength={MAX_LENGTH}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A28B55] transition"
                />
                <button
                  onClick={handleAddFlashcard}
                  className="w-full bg-[#A28B55] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#8C6A50] transition-colors"
                >
                  Add Flashcard
                </button>
              </div>
            </div>

            <div
              className={`rounded-lg shadow-lg p-6 ${
                darkMode ? "bg-[#DAD6CF] text-[#333]" : "bg-[#8C6A50] text-white"
              }`}
            >
              <h2 className="text-3xl font-semibold text-center mb-6">
                Manage Flashcards
              </h2>
              <div className="space-y-6">
                {flashcards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 rounded-lg border border-gray-200 bg-white shadow-md flex flex-col space-y-4"
                  >
                    {editCard && editCard.id === card.id ? (
                      <div className="flex flex-col space-y-4">
                        <input
                          type="text"
                          value={editCard.question}
                          onChange={(e) =>
                            setEditCard({
                              ...editCard,
                              question: e.target.value.slice(0, MAX_LENGTH),
                            })
                          }
                          maxLength={MAX_LENGTH}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A28B55] transition"
                        />
                        <input
                          type="text"
                          value={editCard.answer}
                          onChange={(e) =>
                            setEditCard({
                              ...editCard,
                              answer: e.target.value.slice(0, MAX_LENGTH),
                            })
                          }
                          maxLength={MAX_LENGTH}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A28B55] transition"
                        />
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEditFlashcard(card.id)}
                            className="bg-[#A28B55] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#8C6A50] transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditCard(null)}
                            className="bg-[#e113ae] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#c7df0da0] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg mb-2">
                          <strong>Q:</strong> {card.question}
                        </p>
                        <p className="text-lg mb-4">
                          <strong>A:</strong> {card.answer}
                        </p>
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setEditCard(card)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFlashcard(card.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
