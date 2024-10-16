//! model dosyaları okuma ve yazma işlemini yapan dosyalardır.
//?BURADAN recipeController.js'e geçiyoruz.
import fs from 'fs';

//! elde ettiğimiz cevabı döndüreceğimiz için asenkron olan readfilesync sistemı kullandık.burada utf-8 yazılır ama controllerda datayı göndeririken utf-8 yazmamıza gerek yok

//json dosyanın içeriğini okur döndürür
export const readRecipes = () => {
    try {
        const text = fs.readFileSync('./data.json', 'utf-8') //dosyayı okuduk
        const data = JSON.parse(text) // json formatındaki veriyi js for.na cevirdik 

        return data; //fonksiyonu çağrıldığı yere döndürdük(controllerdeli get all' a vs.)
    } catch (error) {
        console.log(error)
    }

};


//? write neyi yazar? datayı // burada datayı bi yere göndermediğimiz için async awaite gerek yok
//param olarak aldığı veriyi json dosyasına yazar
export const writeRecipes = (data) => {
    try {
        fs.writeFileSync('./data.json', JSON.stringify(data)) // async await kullanabiliriz ama bunu yazdıktan sonra başka işleme gerek olmadığı için yazmadık.
    } catch (error) {
        console.log(error)
    }


};