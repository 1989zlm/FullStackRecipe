import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select/creatable";

const Form = ({ isLoading, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);

  console.log(ingredients);

  // recipeData?.ingredients?.map((i) => ({
  //   label: i,
  //   value: i,
  // })) || beklesin
  //? REACT-SELECT SELACT KISMINDA VALUE VE LABEL SEKLİNDE TUTUYOR O YUZDEN AŞĞIDA MAPLADIK İTEM I VALUE VE LABEL ŞEKLİNDE ALSIN DİYE
  //!NOT: BİZİM ELİMZDEKİ DATADA MALZEMELER['mal1', 'mal2'] ŞEKLİNDE BİZE LAZIM OLAN ({LABEL:'mal1', value:'malz1}, {label:'mal2', value:'malz2}) budur o yuzden ingredientsi mapladik yukarıda

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

    //eğerki düzenleme modundaysak newRecipe içerisine id değerinide ekle
    if (recipeData) {
      newRecipe.id = recipeData.id;
    }

    //api isteği at
    mutate(newRecipe);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
    >
      <Field label="Başlık">
        <input
          className="inp"
          name="recipeName"
          required
          defaultValue={recipeData?.recipeName}
        />
      </Field>

      <Field label="Kategori">
        <input
          className="inp"
          name="category"
          required
          defaultValue={recipeData?.category}
        />
      </Field>

      <Field label="Süre">
        <input
          type="number"
          className="inp"
          name="recipeTime"
          required
          defaultValue={recipeData?.recipeTime}
        />
      </Field>

      <Field label="Malzemeler">
        <Select
          isMulti
          //select alanı buradaki value yi bizden isterken string dizisi değilde nesnelerden oluşan bir dizi istediği için nesnelerinde label ve value değerlerinin olması gerektiği için elimizdeki string dizisini nesnelerden oluşan bir diziye çevirdik (select kütüphanesi default value tanımlamamış o yuzden doğrudan valuyu değiştirdik )
          value={ingredients.map((i) => ({ value: i, label: i }))}
          //malzemeler label value şeklinde geliyodu, biz onu mapledik ve dizi şekilde yaptık
          onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))
          }
          required
        />
      </Field>

      <Field label="Tarif Adımları (, ile ayırınız)">
        <textarea
          name="instructions"
          className="inp min-h-[80px] max-h-[200px]"
          required
          defaultValue={recipeData?.instructions}
        ></textarea>
      </Field>

      <Field label="Sunum Önerisi">
        <textarea
          name="servingSuggestion"
          className="inp min-h-[80px] max-h-[300px]"
          defaultValue={recipeData?.servingSuggestion}
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
          {recipeData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
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

export default Form;

//! BU FORM BİLEŞENİ ÖNCE CREATE.JSXTE YAPILDI VE COMPONENT HALİNE GETİRİLEREK BURAYA ALINDI GELEN PROPLAR CREAT.JSX'TEN
