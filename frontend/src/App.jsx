import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import PreviewCard from "./components/PreviewCard";
import NavigationBar from "./components/NavigationBar";
import Filter from "./components/Filter";
import Home from "./components/Home";

function App() {
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/college/")
      .then((response) => {
        console.log(response);
        setCollegeData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <Router>
      <NavigationBar />
      <main>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/colleges">
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
        </Route>
      </main>
    </Router>
  );
}

export default App;
