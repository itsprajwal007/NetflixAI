export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%]  px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="p-6 text-lg w-1/2 ">{overview}</p>
      <div>
        <button className="bg-white text-xl text-black p-4 px-12 rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="bg-gray-500 mx-2 text-xl text-white p-4 px-12 bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
