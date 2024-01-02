import PreviewCard from "./components/PreviewCard";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        {/* filter section */}
        <div className="all-cards">
          <PreviewCard
            name="NCIT"
            affilation="Pokhara University"
            excerpt="This is nice college with nice features"
            address="Balkumari, Laltipur"
            phoneNumber="+977 9876583022"
            email="ncollege@ncit.edu.np"
          />
        </div>
      </main>
    </>
  );
}

export default App;
