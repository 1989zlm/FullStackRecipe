import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt, FaClock } from "react-icons/fa";
import Loader from "../component/Loader";
import Error from "../component/Error";
import { PiForkKnifeFill } from "react-icons/pi";
import DeleteButton from "../component/DeleteButton";
import { MdEdit } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();

  //idsini bildiğimiz elemanı apiden alıcaz
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  console.log(data);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Link to={-1} className="btn flex items-center gap-2 py-1 ">
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/düzenle/${data?.id}`}
            className="btn flex items-center gap-2 bg-blue-500 hover:bg-blue-600 py-1 min-w-[80px] justify-center"
          >
            <MdEdit />
            Düzenle
          </Link>

          {/* data yoksa silme butounu inaktif olsun ki id değeri yokkken kull. basıp basıp istek atmasın  */}
          <DeleteButton disabled={!data?.id} productId={data?.id} />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data && (
          <div className="">
            <h1 className="title text-3xl">{data.recipeName}</h1>
            <div className="flex gap-4 my-5">
              <span className="badge">
                <PiForkKnifeFill />
                {data.category}
              </span>
              <span className="badge">
                <FaClock />
                {data.recipeTime} dak.
              </span>
            </div>
            <img
              className="rounded-lg max-h-[350px] w-full object-cover"
              src={data.image}
              alt={data.recipeName}
            />

            <div className="my-5">
              <h2 className="title">Malzemeler</h2>

              <ul>
                {data.ingredients.map((i, key) => (
                  <li key={key} className="font-semibold text-lg">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-5">
              <h2 className="title">Tarif</h2>

              <ol className="list-decimal ps-5">
                {data.instructions.map((i, key) => (
                  <li key={key} className="font-semibold text-lg">
                    {i}
                  </li>
                ))}
              </ol>
            </div>

            {data.servingSuggestion && (
              <div className="my-5">
                <h2 className="title">Sunum Önerisi</h2>

                <p className="font-semibold text-lg">
                  {data.servingSuggestion}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
