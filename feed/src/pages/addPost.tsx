import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddPost } from "@/hooks/useMutation/useAddPost";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const postSchema = z.object({
  userId: z.number().min(1, "User ID must be at least 1"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
  id: z.number().min(1, "ID must be at least 1"),
});

type PostFormValues = z.infer<typeof postSchema>;

export const AddPost = () => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      userId: undefined,
      title: "",
      body: "",
      id: undefined,
    },
  });

  const { mutate, isSuccess, isError, status } = useAddPost();
  const isLoading = status === "pending";
  const handleSubmit = (data: PostFormValues) => {
    mutate(data);
  };

  return (
    <div className="h-full flex justify-center items-start pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="p-8 shadow-2xl rounded-md bg-white w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-lg font-semibold">ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    placeholder="Enter Post ID"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-lg font-semibold">User ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    placeholder="Enter User ID"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-lg font-semibold">Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Post Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-lg font-semibold">Body</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post content..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 flex justify-center items-center cursor-pointer w-full"
            disabled={isLoading}
          >
            {isLoading ? (<>
              <Loader className="animate-spin h-5 w-5" /> 
              <p className="text-xl">Adding Post</p></>
            ) : (
              "Add Post"
            )}
          </Button>

          {isSuccess && (
            <p className="mt-3 text-green-600 font-semibold">
              Post added successfully!
            </p>
          )}
          {isError && (
            <p className="mt-3 text-red-600 font-semibold">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};
