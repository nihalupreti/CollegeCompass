import Bookmark from "./Bookmark";

export default function BookmarkPage({ bookmarkedColleges }) {
  return (
    <div
      style={{
        marginTop: "100px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        padding: "20px",
        margin: "auto",
        maxWidth: "1200px",
      }}
    >
      <Bookmark bookmarks={bookmarkedColleges} />
      <Bookmark />
      <Bookmark />

      <div style={{ paddingTop: "70px", textAlign: "center" }}>
        <h1>There are no bookmarks yet!!!</h1>
      </div>
    </div>
  );
}
