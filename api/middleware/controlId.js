
import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {

    // json dosyasındaki veriler arasında parametreyle gelen id'li eleman varmı ?
    const found = data.find((i) => i.id === req.params.id)

    //eleman bulunamazsa hata gönder
    if (!found) {
        return res
            .status(404)
            .json({ message: 'Aradığınız id eleman bulunamadı' })

    }

    //middleware'de elde edilen nesneyi bir sonraki adımda kullanabilmek için örneğin recipeController'da kullanabilmek için iki adımda da ortak kullanılan request nesnesi içerisine bulunan elemanı(found'u) ekle(bunu recipe controller da kullanabilmek için böyle yazdık)
    req.foundRecipe = found;

    //sorun yoksa sonraki adıma devam et
    next();
}
export default controlId;
//!NOT: Bu fonksiyonu yazdıktan sonra recipeController.js gidip tek tek yazmıyoruz. onun yerine recipeRoutes.js'e gidip update, delete ve getRecipe nin önüne yazıyoruz. böylece bu fonksiyon önce çalışır id kontrolü yapar ve sonra next dediğimiz için ardından delete update ve get recipe çalışır.