
import { PostList } from "@/components/postList";


export const HomePage = () => {
  return (
   <div>
      <h1 className="font-bold text-2xl md:text-4xl mb-4 text-center">Welcome to Feed</h1>
      <PostList />
    </div>
  );
};
