import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import api from "../api";
import Card from "../component/Card";
import Search from "../component/Search";
import Sort from "../component/Sort";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "../component/Loader";
import Error from "../component/Error";

const Home = () => {
  //aratılan kelimenin state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);
  // sıralama state
  const [order, setOrder] = useState(null);

  // api'ye gönderilecek order parametreleri
  const params = {
    order,
    // search: searchTerm, //buradaki search terimi backendde getall kısmından geldi search parametresi eklendiyse filtreleme yap demiştik debounce ekleninde aşağıdaki gibi yazdık
    search: debouncedTerm,
  };

  //console.log("search:", searchTerm, "debounced:", debouncedTerm);
  //apiden tarif verilerini alalım
  const { isLoading, error, data, refetch } = useQuery({
    //verinin ismi (order ve searchTerm herdeğiştiğinde querykey ile api isteği at ama biraz bekleyince istek at herk harf için arama yapma demek için searchtermi kaldırıp yerine deboucedterm yazdık)
    queryKey: ["recipes", order, debouncedTerm],
    //queryfonk.da apiye get isteği at, cevap gelirse buradaki recipe verisine eriş
    queryFn: () =>
      api.get("/api/v1/recipes", { params }).then((res) => res.data.recipes),
  });
  //console.log("aratılan kelime state", searchTerm);

  // console.log(data);
  // console.log("sırala", order);
  //order parametresi herdeğiştiğinde yeniden api isteği atsın ve istediğimiz artan veya azalan statüsüne göre sıralama yapması için querykey yanındaki 'recipes' in yanına order ekledik sonra parametre olarak params yazdık
  return (
    <main className="overflow-y-auto">
      <Search setSearchTerm={setSearchTerm} />
      <section>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error.message} refetch={refetch} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.length} tarif bulundu</h1>
              <Sort setOrder={setOrder} />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((i) => (
                <Card key={i.id} recipe={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
