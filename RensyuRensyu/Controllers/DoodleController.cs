using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RensyuRensyu.Controllers
{
    // asp_controller

    public class AaaaController : ControllerBase
    {
        // ※https://localhost:44301/Aaaa/Aaaa/1 みたいにする場合は別のスニペットを使用

        /// <summary>
        /// https://localhost:44301/Aaaa/Aaaa?id=1
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<string> Aaaa(long id)
        {
            return Enumerable.Range(1, 5).Select(index => $"Data{index}_{id}")
            .ToArray();
        }

        /// <summary>
        /// https://localhost:44301/Aaaa/Bbbb
        /// </summary>
        /// <returns></returns>
        public ActionResult Bbbb()
        {
            // return File(いろいろ);
            // return PhysicalFile(いろいろ);
            // return BadRequest(Object);
            // return RedirectToPage(いろいろ);
            return Ok(new { message = "正常終了" });
        }

        /// <summary>
        /// https://localhost:44301/Aaaa/Cccc
        /// </summary>
        /// <returns></returns>
        public ActionResult Cccc(long id)
        {
            return Ok(new { message = $"正常終了:{id}" });
        }

        /// <summary>
        /// https://localhost:44301/Aaaa/Dddd
        /// </summary>
        /// <returns></returns>
        public ActionResult Dddd([FromBody] Person person)  // [FromBody]が無いとダメ
        {
            return Ok(new { message = $"正常終了:{person.Id}{person.Address}" });
        }

        public class Person
        {
            // longにした場合、JS側を'1'ではなく1にしないと認識しないので注意
            public long Id { get; set; }
            public string Address { get; set; }
        }

        /// <summary>
        /// https://localhost:44301/Aaaa/Eeee
        /// </summary>
        /// <returns></returns>
        public ActionResult Eeee(long[] Ids, string[] Addresses)
        {
            var result = string.Empty;
            for (int i = 0; i < Ids.Length; i++)
            {
                result = $"{result}\nID:{Ids[i]}, Address:{Addresses[i]}";
            }
            return Ok(new { message = $"正常終了:{result}" });
        }

    }

}
