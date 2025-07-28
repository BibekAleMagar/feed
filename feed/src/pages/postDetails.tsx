import { useState } from "react";
import { useOnePost } from "@/hooks/useQuery/useSinglePost";
import { useParams, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EditPostForm } from "./editPost";
import { useDeletePost } from "@/hooks/useMutation/useDeletePost";
import { ConfirmDialog } from "@/components/dialog";
import { Trash2, Pencil } from 'lucide-react';

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id!);

  const { data, isLoading, error } = useOnePost(postId);
  const deletePost = useDeletePost();

  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost.mutateAsync(postId);
      setShowDialog(false);
      navigate("/home");
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-center">Something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="flex justify-center items-center h-screen">
          <p>No data found!</p>
        </div>
      ) : (
        <div className={cn("h-screen flex justify-center items-start p-5 ")}>
          <div className="shadow-2xl p-5 flex flex-col gap-2 md:max-w-2xl w-full">
            {isEditing ? (
              <EditPostForm post={data} onFinish={() => setIsEditing(false)} />
            ) : (
              <>
                <p className="bg-gray-700 text-white p-1 font-semibold rounded-lg md:text-xl mb-2 w-fit text-sm">
                  UserId : {data.id}
                </p>
                <p className="md:text-4xl text-xl font-bold mb-4 first-letter:capitalize lowercase">{data.title}</p>
                <p className="md:text-2xl text-lg text-justify mb-4 first-letter:capitalize lowercase">{data.body}</p>
                <div className="flex gap-3">
                  <Button
                    className="cursor-pointer md:text-xl"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit <Pencil />
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer md:text-xl"
                    onClick={() => setShowDialog(true)}
                  >
                    Delete <Trash2 />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

     <ConfirmDialog
  open={showDialog}
  onOpenChange={setShowDialog}
  onConfirm={handleDelete}
  isLoading={isDeleting}
  title="Delete Post?"
  confirmText="Delete"
  cancelText="Cancel"
  description= "This will delete the current post"
/>

    </>
  );
};
