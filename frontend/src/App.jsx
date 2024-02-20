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
    sliderValue: 1000000,
    engineering: false,
    commerce: false,
    medical: false,
    all: true,
  });
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    // Fetch bookmarked items from the cookie and set the state
    const getBookmarkedItemsFromCookie = () => {
      const bookmarkedItemsString = Cookies.get("bookmarked_items");
      if (bookmarkedItemsString) {
        const parsedItems = JSON.parse(bookmarkedItemsString);
        setBookmarkedItems(parsedItems);
      }
    };

    getBookmarkedItemsFromCookie();
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (newFilterValues) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      ...newFilterValues,
    }));
  };

  const bookmarkedColleges = collegeData.filter((college) =>
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
                {collegeData
                  .filter((college) => {
                    // Apply filtering based on filterValues here
                    // Example:
                    // return college.price <= filterValues.sliderValue && ...
                    return true; // Temporary placeholder
                  })
                  .map((college) => (
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
