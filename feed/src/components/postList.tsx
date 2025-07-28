import { usePost } from "@/hooks/useQuery/usePost";
import { LoaderCircle} from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
  const { data, isLoading, error } = usePost();
  const navigate = useNavigate()

  const handleReadmore = (id: number) => {
    navigate(`posts/${id}`)
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoaderCircle className="animate-spin text-center" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p>Failed to load data</p>
        </div>
      ) : data && data.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
             {
                data.map((post) => (
                    <div key={post.id} className="border rounded-xl p-4 shadow-md" >
                        <p className=" text-gray-500 text-md ">User ID: {post.userId}</p>
                        <h2 className="font-semibold text-primary mb-1 text-3xl first-letter:capitalize lowercase">{post.title.length > 20 ? post.title.slice(0,20) : 
                          post.title}</h2>
                        <p className="text-lg text-muted-foreground mb-2 text-justify first-letter:capitalize lowercase">{post.body.length > 100 ? post.body.slice(0,100) + "..." : 
                          post.body
                          }</p>
                        <Button onClick={() => handleReadmore(post.id)} className="text-md p-2 cursor-pointer">Readmore</Button>
                    </div>
                ))
            }
           </div>
      ):
      (
        <div className="flex justify-center items-center">
            <p>No data found</p>
        </div>
      )
    
    }
    </>
  );
};
