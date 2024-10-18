import { readRecipes, writeRecipes } from "../model/recipeModel.js"
import crypto from 'crypto'
import isInValid from "../utils/isInValid.js"



//okuduğumuz parse ettiğimiz dosyayı buraya çağırıp data dedik
const data = readRecipes()

export const getAllRecipes = (req, res) => {
    // console.log('istenilen parametreler', req.query)
    // aratılan kelimeye sahip bütün tariflerin gelmesi için önce datanın kopyasını oluşturuyoruz
    let recipes = [...data];

    //aratılan kelime
    const search = req.query?.search?.toLowerCase()

    //eğer search parametresi geldiyse filtreleme yap
    if (search) {
        recipes = data.filter((recipe) => recipe.recipeName.toLowerCase().includes(search))
    }
    // eğerki süreye göre artan azalan sıralaması yapmak istersek yani order(sortmethodu) parametresi geldiyse
    if (req.query.order) {
        recipes.sort((a, b) =>
            req.query.order === 'asc'
                ? a.recipeTime - b.recipeTime
                : b.recipeTime - a.recipeTime)
    }
    res.status(200).json({
        status: 'success',
        results: recipes.length,
        recipes: recipes
    })
}

export const createRecipe = (req, res) => {
    // 1)isteğin body bölümünde gelen veriye eriş
    let newRecipe = req.body

    // 2) veri bütünlüğünü kontrol et (bunlar yoksa return cevap döndür)
    // if (!newRecipe.recipeName ||
    //     !newRecipe.category ||
    //     !newRecipe.recipeTime ||
    //     !newRecipe.servingSuggestion ||
    //     newRecipe?.ingredients.length > 0 ||
    //     newRecipe?.instructions.length > 0
    // ) utilsten isvalidi yazdık bunun yerine

    if (isInValid(newRecipe)) {
        return res
            .status(404)
            .json({ message: 'Lütfen bütün değerleri tamamlayın' })

    }
    // 3) veriye id ve foto ekle
    newRecipe = {
        ...newRecipe,
        id: crypto.randomUUID(),
        image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`
    }

    // 4) tarif verisini diziye ekle
    data.push(newRecipe)

    // 5) json dosyasını güncelle
    writeRecipes(data)

    // 6) cevap gönder
    res.status(201).json({ message: 'Yeni tarif oluşturuldu', recipe: newRecipe })
}


//! getRecipe, deleteRecipe ve updateRecipe de id kontrolü yapılacak middleware oluşturulacak 
// foundRecipe middlewaredeki controllerid dosyasından geldi
export const getRecipe = (req, res) => {
    res.status(202).json({ message: 'Aradığınız tarif bulundu', found: req.foundRecipe })
}

export const deleteRecipe = (req, res) => {
    //silinecek elemanı bulmak için önce silinecek elemanın sırasını bulmak lazım (splice kullanabilmek için)
    // const index = data.findIndex((i) => i.id === req.params.id)

    // //elemanı bul
    // data.splice(index, 1)

    // //json dosyasını güncelle
    // writeRecipes(data)

    // //cevap gönder
    // res.status(204).json({})
    //!üstteki splice methoduyla aynı ama ben kendim filterle denemek istedim
    // foundRecipe middlewaredeki controllerid dosyasından geldi
    const filtred = data.filter((i) => i.id !== req.params.id)
    writeRecipes(filtred)
    res.status(204).json({})


}

export const updateRecipe = (req, res) => {
    //eski tarif nesnesini güncelle
    const updated = { ...req.foundRecipe, ...req.body }
    console.log(updated)

    //burada splice lazım olan indexi bulduk
    const index = data.findIndex((i) => i.id === req.params.id)

    //diziyi güncelle
    data.splice(index, 1, updated)

    //json dosyasını güncelledim
    writeRecipes(data)

    // cliente cevap gönder
    return res.status(200).json({
        message: "Tarif başarıyla güncellendi",
        recipe: updated
    })


}
