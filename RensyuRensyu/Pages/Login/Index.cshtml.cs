using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RensyuRensyu.Entities;
using RensyuRensyu.Infrastructure.Database;
using RensyuRensyu.Infrastructure.Services;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RensyuRensyu.Pages.Login
{
    /// <summary>
    /// ログイン画面
    /// </summary>
    public class IndexModel : PageModel
    {
        private ApplicationDbContext _db { get; set; }

        private ILogger<IndexModel> _logger { get; set; }

        private IPasswordService _passwordService { get; set; }

        public IndexModel(ApplicationDbContext db, ILogger<IndexModel> logger, IPasswordService passwordService)
        {
            _db = db;
            _logger = logger;
            _passwordService = passwordService;
        }

        public IActionResult OnGet()
        {
            //if (_db.Users.Count() == 0)
            //{
            //    //var userAuthorities = new List<UserAuthorityEntity> {
            //    //    //new UserAuthorityEntity { Authority = UserAuthority.Administrator3 },
            //    //    //new UserAuthorityEntity { Authority = UserAuthority.Administrator2 },
            //    //    //new UserAuthorityEntity { Authority = UserAuthority.Administrator }
            //    //};

            //    var company = _db.Companies.FirstOrDefault(x => x.Name == "管理者");
            //    var hash = _passwordService.HashPassword("Aaaa");

            //    _db.Users.Add(new UserEntity
            //    {
            //        Name = "Administrator",
            //        PassWord = hash.hashedPassword,
            //        Salt = hash.salt,
            //        Company = company
            //        //UserAuthorities = userAuthorities,
            //        //IsDeleted = false
            //    });

            //    _db.SaveChanges();
            //}

            return Page();
        }

        [BindProperty]
        [Required]
        public string Name { get; set; }

        [BindProperty]
        [Required]
        public string Password { get; set; }

        /// <summary>
        /// ログインボタン
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> OnPostAsync()
        {
            _logger.LogInformation($"Login User: {Name}");
            _logger.LogDebug($"Password: {Password}");

            if (!ModelState.IsValid)
            {
                return Page();
            }

            // DBのユーザ情報と突き合わせる
            var user = new UserEntity();
            //var user = _db.Users.Include(x => x.UserAuthorities).Include(x => x.Company).FirstOrDefault(x => x.Name == Name);

            if (user == null)
            {
                ViewData["Error"] = "ユーザIDまたはパスワードが正しくありません。";
                return Page();
            }

            // ハッシュ化してから突き合わせる
            if (!_passwordService.VerifyPassword(user.PassWord, Password, user.Salt))
            {
                ViewData["Error"] = "ユーザIDまたはパスワードが正しくありません。";
                return Page();
            }

            // 権限設定
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, Name)
            };

            //foreach (var item in user.UserAuthorities)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, item.Authority.ToString()));
            //}
            claims.Add(new Claim("UserId", user.UserId.ToString()));

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            // 認証プロパティ
            var authProperties = new AuthenticationProperties
            {
                // 認証セッションの更新を許可する必要があるか。
                //AllowRefresh = <bool>,

                // 認証チケットの有効期限が切れる時刻。 ここで設定された値は、AddCookieで設定された
                // CookieAuthenticationOptionsのExpireTimeSpanオプションをオーバーライドします。
                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),

                // 認証セッションが複数の要求にわたって保持されるかどうか。 
                // AddCookieで設定されたCookieAuthenticationOptionsのExpireTimeSpanオプションを設定するときに必要です。
                // ExpiresUtcを設定するときにも必要です。
                IsPersistent = true,

                // 認証チケットが発行された時刻。
                //IssuedUtc = <DateTimeOffset>,

                // httpリダイレクト応答値として使用される絶対パスまたは絶対URI。
                //RedirectUri = <string>
            };

            // サインイン処理
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties
            );

            // 成功したらリダイレクトする
            var url = Request.Query["ReturnUrl"];
            if (string.IsNullOrWhiteSpace(url))
            {
                url = "/";
            }
            return Redirect(url);
        }
    }
}