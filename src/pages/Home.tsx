import { useEffect, useState } from "react";
import { getTopStories, getStory } from "../services/newsApi";

export function Home() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function loadStories() {
      const ids = await getTopStories();

      const top10Ids = ids.slice(0, 10);

      const storiesData = await Promise.all(
        top10Ids.map((id: number) => getStory(id))
      );

      console.log(storiesData);

      setStories(storiesData);
    }

    loadStories();
  }, []);

  return (
    <div>
      <h1>AI & Tech Dashboard</h1>

      {stories.map((story) => (
        <div key={story.id}>
          <h3>{story.title}</h3>
          <p>Autor: {story.by}</p>
          <p>Pontos: {story.score}</p>

          <a
            href={story.url}
            target="_blank"
            rel="noreferrer"
          >
            Ler notícia
          </a>

          <hr />
        </div>
      ))}
    </div>
  );
}