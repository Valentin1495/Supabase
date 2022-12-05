import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import supabase from "../supabase";

export default function SmoothieCard({
  smoothie,
  updateSmoothies,
}: {
  smoothie: Smoothie;
  updateSmoothies: (id: number) => void;
}) {
  const removeSmoothie = async () => {
    const { data, error } = await supabase
      .from("Smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      updateSmoothies(smoothie.id);
    }
  };

  return (
    <article className="flex flex-col space-y-3 bg-gray-100 rounded-md p-3 relative">
      <h3 className="font-bold text-xl">{smoothie.title}</h3>
      <p className="font-light flex-1">{smoothie.method}</p>
      <h4 className="absolute -top-5 -right-3 bg-[#6d15df] text-white font-bold rounded-md w-10 h-10 leading-10 text-center ">
        {smoothie.rating}
      </h4>
      <div className="flex justify-end gap-x-1.5">
        <Link
          href={{
            pathname: "/update",
            query: { id: `${smoothie.id}` },
          }}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
        <button onClick={removeSmoothie}>
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}
