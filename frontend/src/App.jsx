import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookmarkPage from "./components/BookmarkPage";
import Cookies from "js-cookie";
import PreviewCard from "./components/PreviewCard";
import NavigationBar from "./components/NavigationBar";
import Filter from "./components/Filter";
import Home from "./components/Home";
import Compare from "./components/compare";

function App() {
  const [collegeData, setCollegeData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [filterValues, setFilterValues] = useState({
    sliderValue: 3000000,
    engineering: false,
    commerce: false,
    medical: false,
    all: true,
  });
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    const getBookmarkedItems = async () => {
      const csrfToken = Cookies.get("csrftoken");
      try {
        const response = await axios.get(
          "http://localhost:8000/get_bookmarked_items/",
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": csrfToken,
            },
          }
        );
        const bookmarkedItems = response.data["bookmarked_items"];
        setBookmarkedItems(bookmarkedItems);
      } catch (error) {
        console.error("Error fetching bookmarked items:", error);
      }
    };

    getBookmarkedItems();
  }, []);

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
      .get("http://localhost:8000/college/", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
        }
        setCollegeData(response.data);
        applyFilter(response.data); // Apply filter initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to apply filter and update state
  const applyFilter = (data) => {
    const filtered = data.filter((college) => {
      // Check if college price is within the range
      if (college.fee <= filterValues.sliderValue) {
        console.log(filterValues);
        console.log("faculty is", college.faculty);
        if (
          filterValues.all ||
          (filterValues.engineering && college.faculty === 1) ||
          (filterValues.commerce && college.faculty === 3) ||
          (filterValues.medical && college.faculty === 2)
        ) {
          return true; // Include the college in the filtered list
        }
      }
      return false; // Exclude the college from the filtered list
    });
    setFilteredColleges(filtered);
  };

  // Update filtered colleges when filter values change
  useEffect(() => {
    applyFilter(collegeData);
  }, [filterValues, collegeData]);

  const handleFilterChange = (newFilterValues) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      ...newFilterValues,
    }));
  };

  const bookmarkedColleges = filteredColleges.filter((college) =>
    bookmarkedItems.includes(college.id)
  );

  return (
    <Router>
      <NavigationBar
        isLogged={authenticated}
        setIsLogged={(bool) => {
          setAuthenticated(bool);
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/colleges"
          element={
            <main>
              <Filter
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
              />
              <div className="all-cards">
                {filteredColleges.map((college) => (
                  <PreviewCard
                    key={college.id}
                    id={college.id}
                    college_name={college.college_name}
                    affiliation={college.affiliation}
                    excerpt={college.excerpt}
                    address={college.address}
                    phone_no={college.phone_no}
                    email={college.email}
                    college_image={college.college_image}
                    isLogged={authenticated}
                    authed={(bool) => {
                      setAuthenticated(bool);
                    }}
                    detailsPath={`/colleges/${college.id}`}
                  />
                ))}
              </div>
            </main>
          }
        />
        <Route path="/compare" element={<Compare />} />
        <Route
          path="/bookmarks"
          element={<BookmarkPage bookmarkedColleges={bookmarkedColleges} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
