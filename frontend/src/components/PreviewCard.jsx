import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";

export default function PreviewCard({
  id,
  college_name,
  affiliation,
  excerpt,
  address,
  phone_no,
  email,
  college_image,
  isLogged,
  authed,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
        // Check if the current item's ID is present in the bookmarked items list
        console.log(response.data["bookmarked_items"]);
        const isItemBookmarked = response.data["bookmarked_items"].includes(id);
        setIsBookmarked(isItemBookmarked);
      } catch (error) {
        console.error("Error fetching bookmarked items:", error);
      }
    };

    if (isLogged) {
      getBookmarkedItems();
    }
  }, [id, isLogged]);

  const toggleBookmark = async () => {
    const updatedIsBookmarked = !isBookmarked;
    setIsBookmarked(updatedIsBookmarked);

    // Send the item to the Django backend when bookmarked
    if (!updatedIsBookmarked && isLogged) {
      const csrfToken = Cookies.get("csrftoken");
      try {
        await axios.post(
          "http://localhost:8000/bookmark/",
          { id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          }
        );
      } catch (error) {
        console.error("Error bookmarking:", error);
      }
    } else if (!isLogged) {
      setIsLoginModalOpen(true);
    }
  };

  const imagePath = `http://localhost:8000${college_image}`;
  return (
    <div className="feature-card">
      <div className="card-container">
        <div className="profile-image__container">
          <img src={imagePath} alt="College-image" />
        </div>
        <div className="detail-container">
          <h3>{college_name}</h3>
          <h5>{affiliation}</h5>
          <p>{excerpt}</p>
          <div className="des">
            <div className="des-button des-special">Scholarship Available</div>
            <button className="des__bookmark" onClick={toggleBookmark}>
              <i
                className={`bi ${
                  isBookmarked && isLogged ? "bi-check" : "bi-bookmark"
                }`}
              ></i>
              <h4>{isBookmarked ? "Bookmarked" : "Bookmark"}</h4>
            </button>
            <LoginModal
              isOpen={isLoginModalOpen}
              onRequestClose={() => setIsLoginModalOpen(false)}
              onLoginSuccess={() => {
                authed(true);
              }}
            />
          </div>
        </div>
        <div className="contact-card">
          <div className="location-info info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <h5 className="contact-card__detail">{address}</h5>
          </div>
          <div className="phone-info info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
            </svg>
            <h5 className="contact-card__detail">{phone_no}</h5>
          </div>
          <div className="email-info info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            <h5 className="contact-card__detail">{email}</h5>
          </div>
          <div className="more-info__buttons">
            <button>Details</button>
            <button>Inquery</button>
          </div>
        </div>
      </div>
    </div>
  );
}
