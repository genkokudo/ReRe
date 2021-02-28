using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RensyuRensyu.Entities;
using RensyuRensyu.Infrastructure.Database;
using RensyuRensyu.Infrastructure.Services;

namespace RensyuRensyu.Controllers
{
	public class LoginController : Controller
	{
		private readonly ApplicationDbContext _db;

		private IPasswordService _passwordService { get; set; }

		private ILogger<LoginController> _logger { get; set; }

		public LoginController(ApplicationDbContext db, ILogger<LoginController> logger, IPasswordService passwordService)
		{
			_db = db;
			_logger = logger;
			_passwordService = passwordService;
		}

		//TODO:未実装
		/// <summary>
		/// ログイン画面アクセス時、ユーザがなければ作成する
		/// </summary>
		[AllowAnonymous]
		public void OnGetLogin()
		{
			if (_db.Users.Count() == 0)
			{
				var userAuthorities = new List<UserAuthority> {
					new UserAuthority { Authority = UserAuthorityTypes.Administrator },
					new UserAuthority { Authority = UserAuthorityTypes.Ginpay }
				};
				var company = _db.Companies.FirstOrDefault(x => x.Name == "管理者");
				var hash = _passwordService.HashPassword("Password");
				_db.Users.Add(new User
				{
					Name = "Ginpay",
					PassWord = hash.hashedPassword,
					Salt = hash.salt,
					Company = company,
					UserAuthorities = userAuthorities
				});
				_db.SaveChanges();
			}

			//return Redirect("/");
		}

		/// <summary>
		/// ログインボタン
		/// </summary>
		/// <returns></returns>
		[AllowAnonymous]
		public async Task<IActionResult> OnLoginAsync(string name, string password, string returnUrl)
		{
			_logger.LogInformation($"Login User: {name}");
			_logger.LogDebug($"Password: {password}");

			if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(password))
			{
				return Ok(new { error = "ユーザIDまたはパスワードが入力されていません。" });
			}

			// DBのユーザ情報と突き合わせる
			var user = _db.Users.Include(x => x.UserAuthorities).Include(x => x.Company).FirstOrDefault(x => x.Name == name);
			if (user == null)
			{
				return Ok(new { error = "ユーザIDまたはパスワードが正しくありません。" });
			}

			// ハッシュ化してから突き合わせる
			if (!_passwordService.VerifyPassword(user.PassWord, password, user.Salt))
			{
				_db.SaveChanges();

				return Ok(new { error = "ユーザIDまたはパスワードが正しくありません。" });
			}

			// 権限設定
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, name)
			};
			foreach (var item in user.UserAuthorities)
			{
				claims.Add(new Claim(ClaimTypes.Role, item.Authority.ToString()));
			}
			claims.Add(new Claim("CompanyId", user.Company.CompanyId.ToString()));
			claims.Add(new Claim("UserId", user.UserId.ToString()));
			claims.Add(new Claim("UserName", user.Name.ToString()));

			var claimsIdentity = new ClaimsIdentity(
				claims, CookieAuthenticationDefaults.AuthenticationScheme);

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
				authProperties);

			// 認証に成功したらアカウント情報を更新する
			_db.SaveChanges();

			// リダイレクトする
			var url = returnUrl;
			if (string.IsNullOrWhiteSpace(url))
			{
				url = "/";
			}

			return Ok(new { error = "", url });
		}
	}
}
