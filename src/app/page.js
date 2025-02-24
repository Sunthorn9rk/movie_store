//Components
import MovieSearch from "@/components/MovieSearch";
import Todolist from "@/components/Todolist";
import Wrapper from "@/components/Wrapper";
console.log(process.env.REACT_APP_API_KEY);

export default function Home() {
  return (
    <main>
      <Wrapper>
        <Todolist />
        <MovieSearch />
      </Wrapper>
    </main>
  );
}
