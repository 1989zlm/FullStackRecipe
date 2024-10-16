//? burada createrecipedeki değerleri kontrol etmek için yazdık etmeseydikte olurdu..

const reqFields = [
    'recipeName',
    'category',
    'recipeTime',
    'servingSuggestion',
    'ingredients',
    'instructions',]


//nesnedeki değişkenlerin en az 1'i bile eksikse true
//hepsi tamamsa false döndürür
const isInValid = (data) => {
    return reqFields.some((field) => !data[field])
}

export default isInValid;

//!some mthodu js dizi methodudur. görevi dizieki bütün elemanlar verilen koşullara uyuyormu some onu kontrol eder.(buradaki seneryoda eger datada biri bile yoksa true döndürüyor.)