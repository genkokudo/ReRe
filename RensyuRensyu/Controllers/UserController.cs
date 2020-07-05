using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using RensyuRensyu.Entities;
using RensyuRensyu.Infrastructure.Database;
using RensyuRensyu.Infrastructure.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RensyuRensyu.Controllers
{
    /// <summary>
    /// ユーザ情報登録コントローラ
    /// </summary>
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IMediator _mediator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ApplicationDbContext _db;

        public UserController(ILogger<UserController> logger, IMediator mediator, IHttpContextAccessor httpContextAccessor, ApplicationDbContext db)
        {
            _logger = logger;
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
            _db = db;
        }

        #region ユーザ一覧・登録画面
        /// <summary>
        /// User/Index
        /// ユーザ一覧を取得します。
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<UserIndexResult> IndexAsync()
        {
            var result = await _mediator.Send(new UserIndexQuery { });
            foreach (var item in result.Users)
            {
                var aName = string.Join(", ", item.UserAuthoritiesName);
                item.UserAuthoritiesName.Clear();
                item.UserAuthoritiesName.Add(aName);
            }
            return result;
        }

        /// <summary>
        /// 新規作成・編集画面で使用
        /// 選択肢を取得する
        /// </summary>
        /// <returns></returns>
        private UserResource GetUserResource()
        {
            // DB検索
            var companyDatas = _db.Companies.AsNoTracking().ToArray();

            // 所属会社の選択
            var companySelectList = new List<SelectListItem>();
            foreach (var companyData in companyDatas)
            {
                companySelectList.Add(new SelectListItem(companyData.Name, companyData.CompanyId.ToString()));
            }

            // 権限リストの取得
            var authorities = UserAuthorityTypes.Administrator.GetSelectList(typeof(UserAuthorityTypes));

            // 検索結果の格納
            return new UserResource
            {
                Companies = companySelectList,
                Authorities = authorities
            };
        }

        #region Create
        /// <summary>
        /// ユーザ作成画面のデータを取得します。
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<GetUserCreateResult> GetUserCreate()
        {
            return await _mediator.Send(new GetUserCreateQuery { Resource = GetUserResource() });
        }

        /// <summary>
        /// ユーザを作成します。
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> PostUserCreate(string name, string password, string companyId, List<string> authorities)
        {
            _logger.LogInformation($"新規ユーザ登録 name:{name} password:{password} companyId:{companyId}");
            try
            {
                var userAuthorities = new List<UserAuthorityTypes>();
                foreach (var item in authorities)
                {
                    userAuthorities.Add((UserAuthorityTypes)Enum.Parse(typeof(UserAuthorityTypes), item));
                }
                var result = await _mediator.Send(new UserCreateQuery { Name = name, Password = password, CompanyId = long.Parse(companyId), Authorities = userAuthorities });

                return Ok(new { result.Message, result.Error });
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException.Message.Contains("duplicate"))
                {
                    return Ok(new { Message = $"既に他のユーザが更新したため、処理がキャンセルされました。前の画面からやり直してください。" });
                }
                else if (e.InnerException.Message.Contains("conflicted"))
                {
                    return Ok(new { Error = $"このユーザが作成したデータが使用中であるため削除できません。" });
                }
                else if (e.InnerException.Message.Contains("would be truncated"))
                {
                    return Ok(new { Error = $"文字数が多すぎたため更新できませんでした。" });
                }
                else
                {
                    return Ok(new { Error = $"想定されていないエラーが発生しました:{e}" });
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ユーザ登録で想定外のエラーが発生。");
                _logger.LogError(e.ToString());
                return Ok(new { Error = $"想定されていないエラーが発生しました:{e}" });
            }
        }
        #endregion

        #region Edit
        /// <summary>
        /// ユーザ編集画面のデータを取得します。
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<GetUserEditResult> GetUserEdit(long userId)
        {
            return await _mediator.Send(new GetUserEditQuery { Resource = GetUserResource(), UserId = userId });
        }

        /// <summary>
        /// ユーザを編集します。
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> PostUserEdit(long userId, string name, string password, string companyId, List<string> authorities, bool isEditPassword)
        {
            _logger.LogInformation($"ユーザ編集 userId:{userId} name:{name} password:{password} companyId:{companyId} isEditPassword:{isEditPassword}");
            try
            {
                var userAuthorities = new List<UserAuthorityTypes>();
                foreach (var item in authorities)
                {
                    userAuthorities.Add((UserAuthorityTypes)Enum.Parse(typeof(UserAuthorityTypes), item));
                }
                var result = await _mediator.Send(new UserEditQuery { UserId = userId, Name = name, Password = password, CompanyId = long.Parse(companyId), Authorities = userAuthorities, IsEditPassword = isEditPassword });

                return Ok(new { result.Message, result.Error });
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException.Message.Contains("duplicate"))
                {
                    return Ok(new { Message = $"既に他のユーザが更新したため、処理がキャンセルされました。前の画面からやり直してください。" });
                }
                else if (e.InnerException.Message.Contains("conflicted"))
                {
                    return Ok(new { Error = $"このユーザが作成したデータが使用中であるため削除できません。" });
                }
                else if (e.InnerException.Message.Contains("would be truncated"))
                {
                    return Ok(new { Error = $"文字数が多すぎたため更新できませんでした。" });
                }
                else
                {
                    return Ok(new { Error = $"想定されていないエラーが発生しました:{e}" });
                }
            }
            catch (Exception e)
            {
                _logger.LogError("ユーザ編集で想定外のエラーが発生。");
                _logger.LogError(e.ToString());
                return Ok(new { Error = $"想定されていないエラーが発生しました:{e}" });
            }
        }
        #endregion

        #region Delete
        /// <summary>
        /// Company/PostDelete
        /// 削除します。
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = "Administrator")]
        public async Task<UserIndexResult> PostDeleteAsync(long id)
        {
            _logger.LogInformation($"PostDelete");
            var userId = long.Parse(User.FindFirst("UserId").Value);
            string message;

            if (id == userId)
            {
                message = $"現在のユーザを削除することはできません。";
            }
            else
            {
                var res = await _mediator.Send(new PostDeleteUserQuery
                {
                    UserId = id
                });
                message = string.Join(",", res.Messages);
            }

            UserIndexResult result = await IndexAsync();
            return result;
        }
        #endregion


        #endregion

        #region パスワード変更画面
        // ユーザ名を表示（取得）
        // 現在のパスワードを入力
        // 変更後のパスワードを入力
        // 確認入力

        // 表示時
        // ユーザ情報取得

        // 登録時
        // パスワード認証
        // 合ってたら更新して、メッセージ表示。
        // 間違ってたらメッセージ表示と再入力

        /// <summary>
        /// パスワードを取得します。
        /// </summary>
        /// <returns></returns>
        public async Task<GetCurrentUserResult> GetCurrentUserAsync()
        {
            try
            {
                var userId = long.Parse(_httpContextAccessor.HttpContext.User.FindFirst("UserId").Value);
                var result = await _mediator.Send(new GetCurrentUserQuery { Id = userId });
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError($"パスワード変更画面でユーザの取得に失敗しました。\n{e}");
                return new GetCurrentUserResult { ErrMessage = $"予期せぬエラーが発生しました。エラーログを確認してください。" };
            }
        }

        // TODO:未実装
        /// <summary>
        /// パスワードを更新します。
        /// 入力したパスワードが誤っていた場合、エラーメッセージを返します。
        /// </summary>
        /// <returns></returns>
        public async Task<GetCurrentUserResult> UpdatePasswordAsync(long userId, string currentPassword, string newPassword)
        {
            try
            {
                var result = await _mediator.Send(new UpdatePasswordQuery { Id = userId });
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError($"パスワード変更画面でユーザの取得に失敗しました。\n{e}");
                return new GetCurrentUserResult { ErrMessage = $"予期せぬエラーが発生しました。エラーログを確認してください。" };
            }
        }
        #endregion
    }

    /// <summary>共通の処理結果</summary>
    public class PostUserResult
    {
        /// <summary>結果</summary> 
        public bool IsSuccess { get; set; } = true;

        /// <summary>メッセージ</summary> 
        public List<string> Messages { get; set; } = new List<string>();
    }

    #region Index
    public class UserIndexViewModel
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public string UserCompanyName { get; set; }
        public List<string> UserAuthoritiesName { get; set; }
        public bool IsDeleted { get; set; }
    }
    /// <summary>検索条件</summary>
    public class UserIndexQuery : IRequest<UserIndexResult>
    {
        // 何もなし
    }

    /// <summary>検索結果</summary>
    public class UserIndexResult
    {
        /// <summary>検索した情報</summary> 
        public UserIndexViewModel[] Users { get; set; }
    }

    /// <summary> 
    /// ユーザ一覧検索ハンドラ
    /// </summary> 
    public class UserIndexQueryHandler : IRequestHandler<UserIndexQuery, UserIndexResult>
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public UserIndexQueryHandler(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        /// <summary>
        /// 検索の方法を定義する
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<UserIndexResult> Handle(UserIndexQuery query, CancellationToken token)
        {
            // DB検索
            var users = _db.Users.AsNoTracking().Include(x => x.Company).Include(x => x.UserAuthorities).ToArray();

            // 検索結果の格納
            var User = _mapper.Map<User[], UserIndexViewModel[]>(users);

            var result = new UserIndexResult
            {
                Users = User
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    /// <summary>
    /// 新規作成・編集で共通で使用する
    /// 選択肢データ
    /// </summary>
    public class UserResource
    {
        /// <summary>所属会社の入力</summary> 
        public List<SelectListItem> Companies { get; set; }

        /// <summary>権限の種類</summary> 
        public List<SelectListItem> Authorities { get; set; }
    }

    #region Create

    #region Get
    /// <summary>検索条件</summary>
    public class GetUserCreateQuery : IRequest<GetUserCreateResult>
    {
        /// <summary>各種選択肢データ</summary> 
        public UserResource Resource { get; set; }
    }

    /// <summary>検索結果</summary>
    public class GetUserCreateResult
    {
        /// <summary>各種選択肢データ</summary> 
        public UserResource Resource { get; set; }

        /// <summary>画面に表示する処理結果</summary> 
        public string Message { get; set; }
    }
    /// <summary> 
    /// 検索ハンドラ 
    /// UserCreateQueryをSendすると動作し、UserCreateResultを返す 
    /// </summary> 
    public class GetUserCreateQueryHandler : IRequestHandler<GetUserCreateQuery, GetUserCreateResult>
    {
        /// <summary>
        /// 検索の方法を定義する
        /// IRequestHandlerで実装することになっている
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<GetUserCreateResult> Handle(GetUserCreateQuery query, CancellationToken token)
        {
            // 検索結果の格納
            var result = new GetUserCreateResult
            {
                Resource = query.Resource
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    /// <summary>検索条件</summary>
    public class UserCreateQuery : IRequest<UserCreateResult>
    {
        /// <summary>
        /// ユーザ名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 平文パスワード
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 会社ID
        /// </summary>
        public long CompanyId { get; set; }
        /// <summary>
        /// 権限
        /// </summary>
        public List<UserAuthorityTypes> Authorities { get; set; }
    }
    /// <summary>検索結果</summary>
    public class UserCreateResult
    {
        /// <summary>結果メッセージ</summary> 
        public string Message { get; set; }
        /// <summary>エラーメッセージ</summary> 
        public string Error { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// UserCreateQueryをSendすると動作し、UserCreateResultを返す 
    /// </summary> 
    public class UserCreateQueryHandler : IRequestHandler<UserCreateQuery, UserCreateResult>
    {
        private readonly ApplicationDbContext _db;

        /// <summary>
        /// パスワードのハッシュ化を行う
        /// </summary>
        private readonly IPasswordService _passwordService;

        public UserCreateQueryHandler(ApplicationDbContext db, IPasswordService passwordService)
        {
            _db = db;
            _passwordService = passwordService;
        }

        /// <summary>
        /// 検索の方法を定義する
        /// IRequestHandlerで実装することになっている
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<UserCreateResult> Handle(UserCreateQuery query, CancellationToken token)
        {
            try
            {
                // DB検索
                var data = _db.Users.AsNoTracking().FirstOrDefault(x => x.Name == query.Name);
                if (data == null)
                {
                    // ユーザ登録
                    var (hashed, salt) = _passwordService.HashPassword(query.Password);
                    var company = _db.Companies.FirstOrDefault(x => x.CompanyId == query.CompanyId);
                    if (company == null)
                    {
                        company = _db.Companies.FirstOrDefault();
                        if (company == null)
                        {
                            return new UserCreateResult { Error = "会社が1件も登録されていないため、登録できませんでした。" };
                        }
                    }
                    var userAuthorities = new List<UserAuthority>();
                    foreach (var item in query.Authorities)
                    {
                        userAuthorities.Add(new UserAuthority { Authority = item });
                    }
                    try
                    {
                        var user = new User
                        {
                            Name = query.Name,
                            PassWord = hashed,
                            Salt = salt,
                            Company = company,
                            UserAuthorities = userAuthorities
                        };
                        _db.Add(user);
                        await _db.SaveChangesAsync();
                        return new UserCreateResult { Message = "登録が完了しました。" };
                    }
                    catch (Exception)
                    {
                        return new UserCreateResult { Error = "登録に失敗しました。" };
                    }
                }
                else
                {
                    return new UserCreateResult { Error = "このユーザ名は既に存在しています。" };
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
    #endregion

    #region Edit

    #region Get
    /// <summary>検索条件</summary>
    public class GetUserEditQuery : IRequest<GetUserEditResult>
    {
        /// <summary>編集対象のユーザID</summary>
        public long UserId { get; set; }

        /// <summary>各種選択肢データ</summary> 
        public UserResource Resource { get; set; }
    }

    /// <summary>検索結果</summary>
    public class GetUserEditResult
    {
        /// <summary>編集対象のユーザID</summary>
        public long UserId { get; set; }

        /// <summary>各種選択肢データ</summary> 
        public UserResource Resource { get; set; }

        /// <summary>画面に表示する処理結果</summary> 
        public string Message { get; set; }

        // ユーザー情報
        /// <summary>名前</summary>
		public string Name { get; set; }
        /// <summary>会社ID</summary>
        public long CompanyId { get; set; }
        /// <summary>権限リスト</summary>
        public List<string> Authority { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// UserEditQueryをSendすると動作し、UserEditResultを返す 
    /// </summary> 
    public class GetUserEditQueryHandler : IRequestHandler<GetUserEditQuery, GetUserEditResult>
    {
        private readonly ApplicationDbContext _db;

        public GetUserEditQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 検索の方法を定義する
        /// IRequestHandlerで実装することになっている
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<GetUserEditResult> Handle(GetUserEditQuery query, CancellationToken token)
        {
            // DB検索
            var target = _db.Users.Include(x => x.Company).Include(x => x.UserAuthorities).First(x => x.UserId == query.UserId);

            // 検索結果の格納
            var result = new GetUserEditResult
            {
                Resource = query.Resource,
                UserId = query.UserId,
                Name = target.Name,
                CompanyId = target.Company.CompanyId,
                Authority = target.UserAuthorities.Select(x => x.Authority.ToString()).ToList()
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    /// <summary>検索条件</summary>
    public class UserEditQuery : IRequest<UserEditResult>
    {
        /// <summary>
        /// ユーザID
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// ユーザ名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 平文パスワード
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 会社ID
        /// </summary>
        public long CompanyId { get; set; }
        /// <summary>
        /// 権限
        /// </summary>
        public List<UserAuthorityTypes> Authorities { get; set; }
        /// <summary>
        /// パスワードを変更するか
        /// </summary>
        public bool IsEditPassword { get; set; }

    }
    /// <summary>検索結果</summary>
    public class UserEditResult
    {
        /// <summary>結果メッセージ</summary> 
        public string Message { get; set; }
        /// <summary>エラーメッセージ</summary> 
        public string Error { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// UserEditQueryをSendすると動作し、UserEditResultを返す 
    /// </summary> 
    public class UserEditQueryHandler : IRequestHandler<UserEditQuery, UserEditResult>
    {
        private readonly ApplicationDbContext _db;

        /// <summary>
        /// パスワードのハッシュ化を行う
        /// </summary>
        private readonly IPasswordService _passwordService;

        public UserEditQueryHandler(ApplicationDbContext db, IPasswordService passwordService)
        {
            _db = db;
            _passwordService = passwordService;
        }

        /// <summary>
        /// 検索の方法を定義する
        /// IRequestHandlerで実装することになっている
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<UserEditResult> Handle(UserEditQuery query, CancellationToken token)
        {
            try
            {
                // 同じ名前がないか確認
                var data = _db.Users.AsNoTracking().FirstOrDefault(x => x.Name == query.Name && x.UserId != query.UserId);
                if (data == null)
                {
                    // ユーザ取得
                    var current = _db.Users.Include(x => x.UserAuthorities).First(x => x.UserId == query.UserId);

                    // 権限を全て削除
                    _db.UserAuthorities.RemoveRange(current.UserAuthorities);

                    var company = _db.Companies.FirstOrDefault(x => x.CompanyId == query.CompanyId);
                    var userAuthorities = new List<UserAuthority>();
                    foreach (var item in query.Authorities)
                    {
                        userAuthorities.Add(new UserAuthority { Authority = item });
                    }

                    try
                    {
                        current.Name = query.Name;
                        current.Company = company;
                        current.UserAuthorities = userAuthorities;

                        if (query.IsEditPassword)
                        {
                            var (hashed, salt) = _passwordService.HashPassword(query.Password);
                            current.PassWord = hashed;
                            current.Salt = salt;
                        }

                        await _db.SaveChangesAsync();
                        return new UserEditResult { Message = "更新が完了しました。\n対象ユーザが次回ログインした時に反映されます。" };
                    }
                    catch (Exception)
                    {
                        return new UserEditResult { Error = "更新に失敗しました。" };
                    }
                }
                else
                {
                    return new UserEditResult { Error = "このユーザ名は既に存在しています。" };
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
    #endregion

    #region Delete
    /// <summary>検索条件</summary>
    public class PostDeleteUserQuery : IRequest<PostUserResult>
    {
        public long UserId { get; set; }
    }

    /// <summary> 
    /// ハンドラ 
    /// PostDeleteUserQueryをSendすると動作し、PostDeleteUserResultを返す 
    /// </summary> 
    public class PostDeleteUserQueryHandler : IRequestHandler<PostDeleteUserQuery, PostUserResult>
    {
        private readonly ApplicationDbContext _db;

        public PostDeleteUserQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 処理の方法を定義する
        /// IRequestHandlerで実装することになっている
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<PostUserResult> Handle(PostDeleteUserQuery query, CancellationToken token)
        {
            var result = new PostUserResult();
            try
            {
                var target = _db.Users.Include(x => x.UserAuthorities).FirstOrDefault(x => x.UserId == query.UserId);
                if (target == null)
                {
                    result.IsSuccess = false;
                    result.Messages.Add($"既に他のユーザが更新したため、処理がキャンセルされました。\n画面をリロードしてやり直してください。");
                    return await Task.FromResult(result);
                }

                // ユーザ権限削除
                foreach (var userAuthority in target.UserAuthorities)
                {
                    _db.UserAuthorities.Remove(userAuthority);
                }
                await _db.SaveChangesAsync();

                // ユーザ削除
                _db.Users.Remove(target);
                await _db.SaveChangesAsync();

                result.Messages.Add($"[名称：{target.Name}]");

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

    #endregion

    #region CurrentUser
    /// <summary>ユーザ検索処理結果</summary>
    public class GetCurrentUserResult
    {
        /// <summary>ユーザID</summary> 
        public long Id { get; set; }

        /// <summary>ユーザ名</summary> 
        public string Name { get; set; }

        /// <summary>画面に表示する通常メッセージ</summary> 
        public string InfoMessage { get; set; }

        /// <summary>画面に表示する警告メッセージ</summary> 
        public string WarnMessage { get; set; }

        /// <summary>画面に表示するエラーメッセージ</summary> 
        public string ErrMessage { get; set; }
    }

    /// <summary>検索条件</summary>
    public class GetCurrentUserQuery : IRequest<GetCurrentUserResult>
    {
        /// <summary>
        /// ユーザID
        /// </summary>
        public long Id { get; set; }
    }

    /// <summary> 
    /// ハンドラ 
    /// GetCurrentUserQueryをSendすると動作し、GetCurrentUserResultを返す 
    /// </summary> 
    public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, GetCurrentUserResult>
    {
        private readonly ApplicationDbContext _db;

        public GetCurrentUserQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 処理の方法を定義する
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<GetCurrentUserResult> Handle(GetCurrentUserQuery query, CancellationToken token)
        {
            var result = new GetCurrentUserResult();
            try
            {
                var target = _db.Users.Include(x => x.UserAuthorities).First(x => x.UserId == query.Id);
                result.Id = target.UserId;
                result.Name = target.Name;
                result.InfoMessage = string.Empty;
                result.WarnMessage = string.Empty;
                result.ErrMessage = string.Empty;

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

    #endregion

    #region UpdatePassword（未実装）

    /// <summary>検索条件</summary>
    public class UpdatePasswordQuery : IRequest<GetCurrentUserResult>
    {
        /// <summary>
        /// ユーザID
        /// </summary>
        public long Id { get; set; }
    }

    /// <summary> 
    /// ハンドラ 
    /// UpdatePasswordQueryをSendすると動作し、GetCurrentUserResultを返す 
    /// </summary> 
    public class UpdatePasswordQueryHandler : IRequestHandler<UpdatePasswordQuery, GetCurrentUserResult>
    {
        private readonly ApplicationDbContext _db;

        public UpdatePasswordQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 処理の方法を定義する
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<GetCurrentUserResult> Handle(UpdatePasswordQuery query, CancellationToken token)
        {
            var result = new GetCurrentUserResult();
            try
            {
                var target = _db.Users.Include(x => x.UserAuthorities).First(x => x.UserId == query.Id);
                result.Id = target.UserId;
                result.Name = target.Name;
                result.InfoMessage = string.Empty;
                result.WarnMessage = string.Empty;
                result.ErrMessage = string.Empty;

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
    #endregion
}