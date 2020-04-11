using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using RensyuRensyu.Models;
using RensyuRensyu.Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RensyuRensyu.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using RensyuRensyu.ViewModels;

// TODO:必須入力はなるべくクライアント側で判定
// TODO:ユニーク制約つけなきゃいかん
// TODO:CompanyIdなどの検索条件がある場合は？→クッキーから取ってくる

// AutomapperとMediatorが必要
namespace RensyuRensyu.Controllers
{
    /// <summary>
    /// コントローラの場合はこのクラスを使用する
    /// </summary>
    //[Authorize(Roles = "Administrator")]  // TODO:管理者ユーザを作ったらこっちに切り替え
    //[Authorize]
    public class CrudController : ControllerBase
    {
        private readonly ILogger<CrudController> _logger;
        private readonly IMediator _mediator;

        public CrudController(ILogger<CrudController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        #region List
        /// <summary>
        /// Crud/GetList
        /// △△一覧を取得します。
        /// </summary>
        /// <returns></returns>
        public async Task<GetCrudListResult> GetListAsync()
        {
            _logger.LogInformation("GetList");

            return await _mediator.Send(new GetCrudListQuery());
        }
        #endregion

        #region Create
        /// <summary>
        /// △△を作成します。
        /// </summary>
        /// <returns></returns>
        public async Task<GetCrudCreateResult> GetCreateAsync()
        {
            _logger.LogInformation("GetCreate");
            return await _mediator.Send(new GetCrudCreateQuery());
        }

        /// <summary>
        /// △△を作成します。
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> PostCreateAsync(string id, string password, long companyId, List<string> authorities)
        {
            _logger.LogInformation($"PostCreate");

            var result = await _mediator.Send(new PostCrudCreateQuery
            {
                Id = id,
                Password = password,
                CompanyId = companyId,
                Authorities = authorities
            });
            if (!result.IsSuccess)
            {
                return BadRequest(new { Message = $"登録に失敗しました。{string.Join(',', result.Messages) }" });
            }
            return Ok(new { Message = $"登録が完了しました。" });
        }
        #endregion

        /// <summary>
        /// Crud/GetDetail
        /// 詳細を取得します。
        /// </summary>
        /// <returns></returns>
        public async Task<CrudDetailResult> GetDetailAsync(long id)
        {
            return await _mediator.Send(new CrudDetailQuery { Id = id });
        }

        // POST: Crud/Edit/5
        public async Task<ActionResult> Edit(long id/* パラメータ */)
        {
            try
            {
                // TODO:更新
                await _mediator.Send(new GetCrudUpdateQuery { Id = id });
                return Ok(new { Message = $"更新が完了しました。" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = $"更新に失敗しました。{e.Message}" });
            }
        }

        // IFormCollection collectionって何だろう？

        // POST: Crud/Delete/5
        public async Task<ActionResult> Delete(long id)
        {
            try
            {
                // TODO:更新
                await _mediator.Send(new GetCrudUpdateQuery { Id = id });
                return Ok(new { Message = $"更新が完了しました。" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = $"更新に失敗しました。{e.Message}" });
            }
        }
    }

    #region List

    /// <summary>検索条件</summary>
    public class GetCrudListQuery : IRequest<GetCrudListResult>
    {
    }

    /// <summary>検索結果</summary>
    public class GetCrudListResult
    {
        /// <summary>検索した情報</summary> 
        public CrudListViewModel[] Cruds { get; set; }
    }

    /// <summary> 
    /// ユーザ一覧検索ハンドラ
    /// </summary> 
    public class GetCrudListQueryHandler : IRequestHandler<GetCrudListQuery, GetCrudListResult>
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public GetCrudListQueryHandler(ApplicationDbContext db, IMapper mapper)
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
        public async Task<GetCrudListResult> Handle(GetCrudListQuery query, CancellationToken token)
        {
            // DB検索
            var cruds = _db.Cruds.Include(x => x.Company).Include(x => x.UserAuthorities).AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new GetCrudListResult
            {
                Cruds = _mapper.Map<Crud[], CrudListViewModel[]>(cruds)
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #region Detail（単純版では不要）
    /// <summary>検索条件</summary>
    public class CrudDetailQuery : IRequest<CrudDetailResult>
    {
        public long Id { get; set; }
    }

    /// <summary>検索結果</summary>
    public class CrudDetailResult
    {
        /// <summary>検索した情報</summary> 
        public Crud Data { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// CrudDetailQueryをSendすると動作し、CrudDetailResultを返す 
    /// </summary> 
    public class CrudDetailQueryHandler : IRequestHandler<CrudDetailQuery, CrudDetailResult>
    {
        private readonly ApplicationDbContext _db;

        public CrudDetailQueryHandler(ApplicationDbContext db)
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
        public async Task<CrudDetailResult> Handle(CrudDetailQuery query, CancellationToken token)
        {
            // DB検索
            var data = _db.Cruds.FirstOrDefault(x => x.Id == query.Id);

            // 検索結果の格納
            var result = new CrudDetailResult
            {
                Data = data
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #region Create

    #region Get
    /// <summary>検索条件</summary>
    public class GetCrudCreateQuery : IRequest<GetCrudCreateResult>
    {
        // 何もなし
    }

    /// <summary>検索結果</summary>
    public class GetCrudCreateResult
    {
        /// <summary>会社の入力</summary> 
        public List<SelectListItem> Companies { get; set; }

        /// <summary>権限の種類</summary> 
        public List<SelectListItem> Authorities { get; set; }
    }
    /// <summary> 
    /// 検索ハンドラ 
    /// CrudCreateQueryをSendすると動作し、CrudCreateResultを返す 
    /// </summary> 
    public class GetCrudCreateQueryHandler : IRequestHandler<GetCrudCreateQuery, GetCrudCreateResult>
    {
        private readonly ApplicationDbContext _db;

        public GetCrudCreateQueryHandler(ApplicationDbContext db)
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
        public async Task<GetCrudCreateResult> Handle(GetCrudCreateQuery query, CancellationToken token)
        {
            // DB検索
            var companies = _db.Companies.AsNoTracking().ToArray();

            // リストボックス選択肢
            var companySelectList = new List<SelectListItem>();
            foreach (var company in companies)
            {
                companySelectList.Add(new SelectListItem(company.Name, company.Id.ToString()));
            }

            // 権限リストの取得
            var authorities = UserAuthorityTypes.Administrator.GetSelectList(typeof(UserAuthorityTypes));

            // 検索結果の格納
            var result = new GetCrudCreateResult
            {
                Companies = companySelectList,
                Authorities = authorities
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #region Post
    /// <summary>処理条件</summary>
    public class PostCrudCreateQuery : IRequest<PostCrudCreateResult>
    {
        public string Id { get; set; }
        public string Password { get; set; }
        public long CompanyId { get; set; }
        public List<string> Authorities { get; set; }
    }

    /// <summary>処理結果</summary>
    public class PostCrudCreateResult
    {
        /// <summary>結果</summary> 
        public bool IsSuccess { get; set; } = true;

        /// <summary>メッセージ</summary> 
        public List<string> Messages { get; set; } = new List<string>();
    }

    /// <summary> 
    /// ハンドラ 
    /// PostCrudCreateQueryをSendすると動作し、CrudCreateResultを返す 
    /// </summary> 
    public class PostCrudCreateQueryHandler : IRequestHandler<PostCrudCreateQuery, PostCrudCreateResult>
    {
        private readonly ApplicationDbContext _db;
        private readonly IPasswordService _passwordService;

        public PostCrudCreateQueryHandler(ApplicationDbContext db, IPasswordService passwordService)
        {
            _db = db;
            _passwordService = passwordService;
        }

        /// <summary>
        /// 処理を定義する
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<PostCrudCreateResult> Handle(PostCrudCreateQuery query, CancellationToken token)
        {
            var result = new PostCrudCreateResult();

            try
            {
                // データ作成
                var userAuthorities = new List<UserAuthority>();
                foreach (var authority in query.Authorities)
                {
                    userAuthorities.Add(new UserAuthority { Authority = Enum.Parse<UserAuthorityTypes>(authority) });
                }

                var (hashedPassword, salt) = _passwordService.HashPassword(query.Password);

                // 登録
                _db.Cruds.Add(new Crud
                {
                    Name = query.Id,
                    PassWord = hashedPassword,
                    Salt = salt,
                    Company = _db.Companies.First(x => x.Id == query.CompanyId),
                    UserAuthorities = userAuthorities
                });
                await _db.SaveChangesAsync();

                result.Messages.Add("登録が完了しました。");

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                result.IsSuccess = false;
                result.Messages.Add(e.ToString());
                return await Task.FromResult(result);
            }
        }
    }
    #endregion

    #endregion

    #region Update

    // 他のGetと使いまわししたら？
    #region Get
    /// <summary>検索条件</summary>
    public class GetCrudUpdateQuery : IRequest<GetCrudUpdateResult>
    {
        public long Id { get; set; }
    }

    /// <summary>検索結果</summary>
    public class GetCrudUpdateResult
    {
        /// <summary>検索した情報</summary> 
        public Crud[] Cruds { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// CrudUpdateQueryをSendすると動作し、CrudUpdateResultを返す 
    /// </summary> 
    public class GetCrudUpdateQueryHandler : IRequestHandler<GetCrudUpdateQuery, GetCrudUpdateResult>
    {
        private readonly ApplicationDbContext _db;

        public GetCrudUpdateQueryHandler(ApplicationDbContext db)
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
        public async Task<GetCrudUpdateResult> Handle(GetCrudUpdateQuery query, CancellationToken token)
        {
            // DB検索
            var cruds = _db.Cruds.AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new GetCrudUpdateResult
            {
                Cruds = cruds
            };
            return await Task.FromResult(result);
        }
    }

    #endregion

    #endregion
}