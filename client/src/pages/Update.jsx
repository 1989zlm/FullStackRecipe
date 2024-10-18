import { useNavigate, useParams } from "react-router-dom";
import Form from "../component/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api";

const Update = () => {
  //düzenlecek olan ürünün id sini al
  const { id } = useParams();

  // //sayfayı yenilemeye gerek duymadan güncellemeyi ekranda görmek için
  // const queryClient = useQueryClient();buna gerek yokmuş

  const navigate = useNavigate();

  //düzenleme sayfasına girdiğimiz gibi apiden bilgileri alması için useQuery kullandık
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });
  // console.log(data);

  //apiye güncelleme isteği atıcak mutasyonu hazırla(düzenlemeyi kaydet butonuna basınca gerçekleşecek)
  const { isLoading, mutate } = useMutation({
    mutationFn: (updatedData) =>
      api.patch(`/api/v1/recipes/${id}`, updatedData),

    onSuccess: () => {
      toast.success("Güncelleme Başarılı");
      navigate(`/`);
    },

    onError: () => {
      toast.error("Bir hata oluştu");
    },
  });

  return (
    <div>
      <h1 className="text-red-500 text-3xl font-bold">Tarifi Düzenle</h1>
      <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
    </div>
  );
};

export default Update;
