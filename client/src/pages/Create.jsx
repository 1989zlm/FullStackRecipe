import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";
import Form from "../component/Form";

const Create = () => {
  //yeni tarif kaydeildiktensonra anasayfaya yönlendir
  const navigate = useNavigate();

  // api isteği at (burada mutatetion isloading değerini tutuyor yönetmesini sağlamıyor ve fonksiyonu tetikliyor)
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

  return (
    <div>
      <h1 className="text-red-500 text-3xl font-bold">Yeni Tarif Oluştur</h1>
      <Form isLoading={isLoading} mutate={mutate} />
    </div>
  );
};

export default Create;
