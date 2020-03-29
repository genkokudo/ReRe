
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

// TODO:編集と削除は後回し
namespace RensyuRensyu.Controllers
{
    /// <summary>
    /// コントローラの場合はこのクラスを使用する
    /// </summary>
    //[Authorize(Roles = "Administrator")]  // TODO:管理者ユーザを作ったらこっちに切り替え
    public class CrudController : ControllerBase
    {
        /// <summary>
        /// パスワードのハッシュ化を行う
        /// </summary>
        private readonly IPasswordService _passwordService;

        private readonly ILogger<CrudController> _logger;
        private readonly IMediator _mediator;

        public CrudController(ILogger<CrudController> logger, IMediator mediator, IPasswordService passwordService)
        {
            _logger = logger;
            _mediator = mediator;
            _passwordService = passwordService;
        }

        /// <summary>
        /// Crud/Index
        /// ユーザ一覧を取得します。
        /// </summary>
        /// <returns></returns>
        public async Task<CrudIndexResult> IndexAsync()
        {
            return await _mediator.Send(new CrudIndexQuery { });
        }

        /// <summary>
        /// Crud/Detail
        /// </summary>
        /// <returns></returns>
        public async Task<CrudDetailResult> DetailAsync(long id)
        {
            return await _mediator.Send(new CrudDetailQuery { Id = id });
        }

        /// <summary>
        /// ユーザを作成します。
        /// </summary>
        /// <returns></returns>
        public async Task<CrudCreateResult> GetCreate()
        {
            return await _mediator.Send(new GetCrudCreateQuery { });
        }

        // POST: Crud/Create
        /// <summary>
        /// ユーザを作成します。
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> PostCreate(string id, string password, string companyId, List<string> authorities)
        {
            return Ok(new { Message = $"更新が完了しました。" });
            //try
            //{
            //    // TODO:更新
            //    await _mediator.Send(new CrudCreateQuery {  });
            //    return Ok(new { Message = $"更新が完了しました。" });
            //}
            //catch(Exception e)
            //{
            //    return BadRequest(new { Message = $"登録に失敗しました。{e.Message}" });
            //}
        }

        // POST: Crud/Edit/5
        public async Task<ActionResult> Edit(long id/* パラメータ */)
        {
            try
            {
                // TODO:更新
                await _mediator.Send(new CrudUpdateQuery { Id = id });
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
                await _mediator.Send(new CrudUpdateQuery { Id = id });
                return Ok(new { Message = $"更新が完了しました。" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = $"更新に失敗しました。{e.Message}" });
            }
        }
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
    public class CrudIndexQuery : IRequest<CrudIndexResult>
    {
    }

    /// <summary>検索結果</summary>
    public class CrudIndexResult
    {
        /// <summary>検索した情報</summary> 
        public UserIndexViewModel[] Cruds { get; set; }
    }

    /// <summary> 
    /// ユーザ一覧検索ハンドラ
    /// </summary> 
    public class CrudIndexQueryHandler : IRequestHandler<CrudIndexQuery, CrudIndexResult>
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public CrudIndexQueryHandler(ApplicationDbContext db, IMapper mapper)
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
        public async Task<CrudIndexResult> Handle(CrudIndexQuery query, CancellationToken token)
        {
            // DB検索
            var cruds = _db.Cruds.AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new CrudIndexResult
            {
                Cruds = _mapper.Map<Crud[], UserIndexViewModel[]>(cruds)
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #region Detail
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
    public class GetCrudCreateQuery : IRequest<CrudCreateResult>
    {
        // 何もなし
    }

    /// <summary>検索結果</summary>
    public class CrudCreateResult
    {
        // Get情報 //
        /// <summary>所属会社の入力</summary> 
        public List<SelectListItem> Companies { get; set; }

        /// <summary>権限の種類</summary> 
        public List<SelectListItem> Authorities { get; set; }
    }
    /// <summary> 
    /// 検索ハンドラ 
    /// CrudCreateQueryをSendすると動作し、CrudCreateResultを返す 
    /// </summary> 
    public class GetCrudCreateQueryHandler : IRequestHandler<GetCrudCreateQuery, CrudCreateResult>
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
        public async Task<CrudCreateResult> Handle(GetCrudCreateQuery query, CancellationToken token)
        {
            // DB検索
            var companies = _db.Companies.AsNoTracking().ToArray();

            // 所属会社の選択
            var companySelectList = new List<SelectListItem>();
            foreach (var company in companies)
            {
                companySelectList.Add(new SelectListItem(company.Name, company.Id.ToString()));
            }

            // 権限リストの取得
            var authorities = UserAuthorityTypes.Administrator.GetSelectList(typeof(UserAuthority));

            // 検索結果の格納
            var result = new CrudCreateResult
            {
                Companies = companySelectList,
                Authorities = authorities
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    /// <summary>検索条件</summary>
    public class CrudCreateQuery : IRequest<CrudCreateResult>
    {
        public long Id { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// CrudCreateQueryをSendすると動作し、CrudCreateResultを返す 
    /// </summary> 
    public class CrudCreateQueryHandler : IRequestHandler<CrudCreateQuery, CrudCreateResult>
    {
        private readonly ApplicationDbContext _db;

        public CrudCreateQueryHandler(ApplicationDbContext db)
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
        public async Task<CrudCreateResult> Handle(CrudCreateQuery query, CancellationToken token)
        {
            // DB検索
            var datas = _db.Cruds.AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new CrudCreateResult
            {
                //Datas = datas
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #region Update
    /// <summary>検索条件</summary>
    public class CrudUpdateQuery : IRequest<CrudUpdateResult>
    {
        public long Id { get; set; }
    }

    /// <summary>検索結果</summary>
    public class CrudUpdateResult
    {
        /// <summary>検索した情報</summary> 
        public Crud[] Cruds { get; set; }
    }

    /// <summary> 
    /// 検索ハンドラ 
    /// CrudUpdateQueryをSendすると動作し、CrudUpdateResultを返す 
    /// </summary> 
    public class CrudUpdateQueryHandler : IRequestHandler<CrudUpdateQuery, CrudUpdateResult>
    {
        private readonly ApplicationDbContext _db;

        public CrudUpdateQueryHandler(ApplicationDbContext db)
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
        public async Task<CrudUpdateResult> Handle(CrudUpdateQuery query, CancellationToken token)
        {
            // DB検索
            var cruds = _db.Cruds.AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new CrudUpdateResult
            {
                Cruds = cruds
            };
            return await Task.FromResult(result);
        }
    }
    #endregion
}