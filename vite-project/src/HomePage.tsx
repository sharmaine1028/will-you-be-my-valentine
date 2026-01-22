import firstImage from "./assets/1.png";

const HomePage: React.FC = () => {
  return (
    <div className="bg-pink-200 min-h-screen min-w-screen flex flex-col items-center justify-center space-y-8">
      <h1>Will you be my Valentines?</h1>
      <img className="h-64" src={firstImage} alt="Valentine" />
      <div className="mx-2 space-x-4">
        <button>Accept</button>
        <button>Decline</button>
      </div>
    </div>
  );
};

export default HomePage;
