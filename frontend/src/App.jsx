import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import PreviewCard from "./components/PreviewCard";
import NavigationBar from "./components/NavigationBar";
import Filter from "./components/Filter";
import Home from "./components/Home";

function App() {
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".top-bar__section");
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/college/")
      .then((response) => {
        console.log(response);
        setCollegeData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/colleges"
          element={
            <main>
              <Filter />
              <div className="all-cards">
                {collegeData.map((college) => (
                  <PreviewCard
                    key={college.id}
                    college_name={college.college_name}
                    affiliation={college.affiliation}
                    excerpt={college.excerpt}
                    address={college.address}
                    phone_no={college.phone_no}
                    email={college.email}
                    college_image={college.college_image}
                  />
                ))}
              </div>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
