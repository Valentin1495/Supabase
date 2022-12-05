import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SmoothieCard from "../components/SmoothieCard";
import supabase from "../supabase";

export default function Page() {
  const [smoothies, setSmoothies] = useState<Smoothie[]>();
  const [orderBy, setOrderBy] = useState("created_at");

  const updateSmoothies = (id: number) => {
    setSmoothies((prev) => {
      return prev?.filter((smoothie) => smoothie.id != id);
    });
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("Smoothies")
        .select()
        .order(orderBy);
      if (error) {
        console.log(error);
      }

      setSmoothies(data!);
    };

    getData();
  }, [orderBy]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>
      <main className="p-5 space-y-5">
        <section className="space-y-2">
          <h3 className="text-lg">Filters</h3>
          <div className="space-x-2">
            <button
              className={`${orderBy === "rating" && "opacity-60"} btn`}
              onClick={() => setOrderBy("created_at")}
            >
              Time created
            </button>
            <button
              className={`${orderBy === "created_at" && "opacity-60"}  btn`}
              onClick={() => setOrderBy("rating")}
            >
              Rating
            </button>
          </div>
        </section>
        <section className="grid grid-cols-3 gap-10">
          {smoothies?.map((smoothie) => (
            <SmoothieCard
              key={smoothie.id}
              smoothie={smoothie}
              updateSmoothies={updateSmoothies}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
