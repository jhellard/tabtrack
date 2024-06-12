import VideoCard from "@/components/VideoCard";

// This will be pulled from the users account, just using for testing purposes
// TODO: Integrate user lists using Firebase
const urlList = [
  "https://www.youtube.com/watch?v=xfxHeZV8BEY",
  "https://www.youtube.com/watch?v=ZQuGxDdkL1Q",
  "https://www.youtube.com/watch?v=v4OGjoOuRFo",
];

const Dashboard = () => {
  return (
    <section className="p-4">
      <h1 className="mb-2">Your Tabs:</h1>
      <ul className="flex gap-4">
        {urlList.map((url, key) => {
          console.log(url);
          return <VideoCard url={url} key={key} />;
        })}
      </ul>
    </section>
  );
};

export default Dashboard;
