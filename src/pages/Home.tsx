import { useEffect } from "react";
import { getTopStories } from "../services/newsApi";

export function Home() {
  useEffect(() => {
    getTopStories().then((data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    getTopStories().then(async (ids) => {
      console.log("IDs:", ids);

      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json`
      );

      const story = await response.json();

      console.log("Primeira notícia:", story);
    });
  }, []);

  return (
    <div>
      <h1>AI & Tech Dashboard</h1>
    </div>
  );
}