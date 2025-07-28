import { useEditPost } from "@/hooks/useMutation/useEditPost";
import { z } from "zod";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  body: z.string().min(5, "Body must be at least 5 characters."),
});

type EditPostFormProps = {
  post: Post;
  onFinish: () => void;
};

export const EditPostForm = ({ post, onFinish }: EditPostFormProps) => {
  const { mutate: editPost, status } = useEditPost();
  const isLoading = status === "pending";

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    editPost(
      { id: post.id, ...values },
      {
        onSuccess: () => {
          setSuccessMessage("Post updated successfully!");
        },
        onError: () => {
          setErrorMessage("Failed to update post. Please try again.");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg md:text-2xl">Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Post Title" className="text-lg md:text-xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg md:text-2xl">Body</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Post Content" className="text-lg md:text-xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading} className="cursor-pointer md:text-xl">
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="outline" onClick={onFinish} disabled={isLoading} className="cursor-pointer md:text-xl">
            Cancel
          </Button>
        </div>

        {successMessage && (
          <p className="mt-2 text-green-600 font-semibold">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-2 text-red-600 font-semibold">{errorMessage}</p>
        )}
      </form>
    </Form>
  );
};
