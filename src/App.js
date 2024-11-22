import React, { useState, useEffect } from "react";

// Components:
function Person({ person }) {
  return (
    <div>
      <h2>{person.name}</h2>
      <h2>{person.known_for_department}</h2>
    </div>
  );
}

function KnownFor({ knownFor }) {
  return (
    <div>
      <h3>Know For Movies:</h3>
      <uL>
        {knownFor.map((thing) => (
          <li>
            <p>
              Title: {thing.title}
            </p>
            <p>
              Release Date: {thing.release_date}
            </p>
            <p>
              Overview: {thing.overview}
            </p>
          </li>
        ))}
      </uL>
    </div>
  );
}

function RenderImage({ renderImage }) {
  const API_KEY = "759f4a4a9823521eedf72642b5564db8";
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${renderImage}/images?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setImages(data.profiles));
  }, [renderImage])


  return (
    <div>
      <h3>Images:</h3>
      {images.map((image, index) => (
        <img key = {index}
        src={`https://image.tmdb.org/t/p/w185${image.file_path}`}
        />
      ))}
    </div>
  );
}



function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const QUERY = "spielberg";
  const API_KEY = "759f4a4a9823521eedf72642b5564db8";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/person?query=${QUERY}&api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  }, []);

  // Handling functions for button onClick events
  const handleBack = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, users.length - 1));
  };



  return (
    <div>
      <h1>Fetch People:</h1>
      {users.length > 0 ? (
        <div>
          <Person person={users[currentIndex]} />
          <KnownFor knownFor={users[currentIndex].known_for} />
          <RenderImage renderImage={users[currentIndex].id} />
          <div style={{ marginBottom: "50px" }}>
            <button onClick = {(event) => handleBack()}
              disabled = { currentIndex === 0 }
              style={{ fontSize: "20px", padding: "10px 20px" }}  
            >
              Back
            </button>
            <button onClick = {(event) => handleNext()}
              disabled = { currentIndex === users.length - 1 }
              style={{ fontSize: "20px", padding: "10px 20px" }}  
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;
