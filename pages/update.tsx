import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import supabase from "../supabase";

export default function Update() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [title, setTitle] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        router.push("/");
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    getData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Smoothies")
      .update([
        {
          title,
          method,
          rating,
        },
      ])
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      router.push("/");
    }
  };

  return (
    <div>
      <Header />
      <form
        className="flex flex-col mt-10 p-3 bg-gray-100 rounded-md 
        w-2/5 mx-auto gap-y-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method" className="label">
          Method
        </label>
        <textarea
          id="method"
          className="text"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating" className="label">
          Rating
        </label>

        <input
          type="number"
          id="rating"
          className="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button
          className="bg-[#12bca2] text-white font-bold 
          rounded-md px-3 py-2 mx-auto"
        >
          Update recipe
        </button>
      </form>
    </div>
  );
}
