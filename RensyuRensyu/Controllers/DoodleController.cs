using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RensyuRensyu.Controllers
{
    // ApiController属性は、こういうのを省略できるようになる。
    //if (!ModelState.IsValid)
    //{
    //    return BadRequest(ModelState);
    //}
    // また、以下が使用できる
    //[FromBody] は複合型パラメーターに対して推論されます。 [FromBody] 推論規則に対する例外は、IFormCollection や CancellationToken など、特殊な意味を持つ組み込みの複合型です。 バインディング ソース推論コードでは、そのような特殊な型は無視されます。
    //[FromForm] は IFormFile および IFormFileCollection 型のアクション パラメーターに対して推論されます。 簡易型またはユーザー定義型に対しては推論されません。
    //[FromRoute] は、ルート テンプレート内のパラメーターと一致する任意のアクション パラメーター名に対して推論されます。 複数のルートがアクション パラメーターと一致する場合、ルート値はいずれも[FromRoute] と見なされます。
    //[FromQuery] は他の任意のアクション パラメーターに対して推論されます。

    //[ApiController] // API に固有の動作を有効にする、無くても動く、ある場合は[Route]を書かないとダメ
    //[Route("[controller]")] // ルーティング設定
    public class DoodleController : Controller  // WebPage処理も行う場合はControllerを使用する、MVC時代のやり方でActionResultとしてViewを返す感じ。
    {
        // 基本的にもうこの方法は使わないはず。
        //public IActionResult Index()
        //{
        //    return View();
        //}

        //[HttpGet]
        public string Get() // [Route]書いてない場合はダメ
        {
            return "aaaa";
        }

        // https://localhost:44301/Doodle/Aaaa で処理できる
        //[HttpGet] // 無くてもOK
        public string Aaaa()
        {
            return "aaaa";  // OK
        }

    }

    //[ApiController]
    //[Route("[controller]")] // これが無いとルーティングされない。前は要らなかったのに何で？
    public class AaaaController : ControllerBase    // Web APIの処理だけの場合はControllerBaseを使用する
    {
        // これは、[Route]書いてない場合はダメ
        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast   // 5件作成
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = "aaaa"
            })
            .ToArray();
        }

        // https://localhost:44301/Aaaa/Aaaa でできる。
        public IEnumerable<WeatherForecast> Aaaa()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast   // 5件作成
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = "aaaa"
            })
            .ToArray();
        }

        // TODO:JSONを返す方法

        //Ok(Object)
        //File(いろいろ)
        //PhysicalFile(いろいろ)
        //BadRequest(Object)
        //RedirectToPage(いろいろ)
    }
}
