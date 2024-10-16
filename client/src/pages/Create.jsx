import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  //yeni tarif kaydeildiktensonra anasayfaya yönlendir
  const navigate = useNavigate();

  // api isteği at (burada mutatetion isloading değerini tutuyor yönetmesini sağlamıyor)
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),

    onSuccess: () => {
      toast.success("yeni tarif oluşturuldu");
      navigate("/");
    },

    onError: () => {
      toast.error("Bir sorun oluştu");
    },
  });

  //form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();
    //malzemeler inputunu objeye aktarbunun için malzemelerin stateini tutacağız

    //bütün inputlardaki verileri formData.entries ile diziye çevir sonra object.fromEntries ile de objeye çevir.. çünkü biz js'te formdaki verileri direk obje olarak alamıyoruz.
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    console.log(newRecipe);

    //adımları virgüle göre ayır
    newRecipe.instructions = newRecipe.instructions.split(",");

    //malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    //api'e post isteği atalım
    mutate(newRecipe);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
      >
        <h1 className="text-red-500 text-3xl font-bold">Yeni Tarif Oluştur</h1>
        <Field label="Başlık">
          <input className="inp" name="recipeName" />
        </Field>

        <Field label="Kategori">
          <input className="inp" name="category" />
        </Field>

        <Field label="Süre">
          <input className="inp" name="recipeTime" />
        </Field>

        <Field label="Malzemeler">
          <Select //malzemeler label value şeklinde geliyodu, biz onumapledik ve dizi şekilde yaptık
            isMulti
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
          />
        </Field>

        <Field label="Tarif Adımları (, ile ayırınız)">
          <textarea
            name="instructions"
            className="inp min-h-[80px] max-h-[200px]"
          ></textarea>
        </Field>

        <Field label="Sunum Önerisi">
          <textarea
            name="servingSuggetion"
            className="inp min-h-[80px] max-h-[300px]"
          ></textarea>
        </Field>

        <div className="flex justify-end gap-6">
          <Link to="/" className="btn">
            Geri
          </Link>

          <button
            disabled={isLoading} // cevap gelene kadar buton inaktif olsun
            type="submit"
            className="btn bg-red-400 hover:bg-red-500"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

//HOC- Higher Order Component
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
};

export default Create;
