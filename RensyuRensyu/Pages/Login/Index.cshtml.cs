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
    /// ���O�C�����
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

            //    var company = _db.Companies.FirstOrDefault(x => x.Name == "�Ǘ���");
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
        /// ���O�C���{�^��
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

            // DB�̃��[�U���Ɠ˂����킹��
            var user = new UserEntity();
            //var user = _db.Users.Include(x => x.UserAuthorities).Include(x => x.Company).FirstOrDefault(x => x.Name == Name);

            if (user == null)
            {
                ViewData["Error"] = "���[�UID�܂��̓p�X���[�h������������܂���B";
                return Page();
            }

            // �n�b�V�������Ă���˂����킹��
            if (!_passwordService.VerifyPassword(user.PassWord, Password, user.Salt))
            {
                ViewData["Error"] = "���[�UID�܂��̓p�X���[�h������������܂���B";
                return Page();
            }

            // �����ݒ�
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

            // �F�؃v���p�e�B
            var authProperties = new AuthenticationProperties
            {
                // �F�؃Z�b�V�����̍X�V��������K�v�����邩�B
                //AllowRefresh = <bool>,

                // �F�؃`�P�b�g�̗L���������؂�鎞���B �����Őݒ肳�ꂽ�l�́AAddCookie�Őݒ肳�ꂽ
                // CookieAuthenticationOptions��ExpireTimeSpan�I�v�V�������I�[�o�[���C�h���܂��B
                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),

                // �F�؃Z�b�V�����������̗v���ɂ킽���ĕێ�����邩�ǂ����B 
                // AddCookie�Őݒ肳�ꂽCookieAuthenticationOptions��ExpireTimeSpan�I�v�V������ݒ肷��Ƃ��ɕK�v�ł��B
                // ExpiresUtc��ݒ肷��Ƃ��ɂ��K�v�ł��B
                IsPersistent = true,

                // �F�؃`�P�b�g�����s���ꂽ�����B
                //IssuedUtc = <DateTimeOffset>,

                // http���_�C���N�g�����l�Ƃ��Ďg�p������΃p�X�܂��͐��URI�B
                //RedirectUri = <string>
            };

            // �T�C���C������
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties
            );

            // ���������烊�_�C���N�g����
            var url = Request.Query["ReturnUrl"];
            if (string.IsNullOrWhiteSpace(url))
            {
                url = "/";
            }
            return Redirect(url);
        }
    }
}