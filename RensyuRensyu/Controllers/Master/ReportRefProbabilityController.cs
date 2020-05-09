using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using RensyuRensyu.Entities;
using RensyuRensyu.Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using RensyuRensyu.Models.Master;

namespace RensyuRensyu.Controllers.Master
{
    /// <summary>
    /// 発生確率マスタメンテ
    /// </summary>
    //[Authorize(Roles = "Administrator")]
    public class ReportRefProbabilityController : ControllerBase
    {
        private readonly ILogger<ReportRefProbabilityController> _logger;
        private readonly IMediator _mediator;
        private readonly ApplicationDbContext _db;

        public ReportRefProbabilityController(ILogger<ReportRefProbabilityController> logger, IMediator mediator, ApplicationDbContext db)
        {
            _logger = logger;
            _mediator = mediator;
            _db = db;
        }

        #region List
        /// <summary>
        /// ReportRefProbability/GetList
        /// 発生確率一覧を取得します。
        /// （PostListTableAsyncが兼ねるので、直接画面から呼ぶ必要がなくなった）
        /// </summary>
        /// <returns></returns>
        public async Task<GetReportRefProbabilityListResult> GetListAsync()
        {
            _logger.LogInformation("GetList");
            var companyId = long.Parse(User.FindFirst("CompanyId").Value);
            return await _mediator.Send(new GetReportRefProbabilityListQuery { CompanyId = companyId });
        }

        /// <summary>
        /// ReportRefProbability/PostListTable
        /// 発生確率一覧をDBに反映します。
        /// また、最新の状態を検索して結果を画面に返します。
        /// </summary>
        /// <param name="ids">0:追加</param>
        /// <returns></returns>
        public async Task<GetReportRefProbabilityListResult> PostListTableAsync(List<long> ids, List<string> categories, List<string> conditions, List<decimal> probabilities, List<decimal> increaseProbabilities, List<int> isEdited, List<int> orders, List<long> versions)
        {
            _logger.LogInformation("PostList");
            var userId = long.Parse(User.FindFirst("UserId").Value);
            var userName = User.FindFirst("UserName").Value;

            // トランザクション
            await _db.BeginTransactionAsync();

            var results = new List<string>();
            var errors = new List<string>();
            for (int i = 0; i < ids.Count; i++)
            {
                try
                {
                    if (isEdited[i] == 0 || ids[i] == 0 && isEdited[i] == 1)
                    {
                        // 編集していない
                        // 追加したけど削除
                        continue;
                    }

                    ObjectResult tempResult;

                    if (isEdited[i] == 1)
                    {
                        // 削除
                        tempResult = await PostDeleteAsync(ids[i], versions[i]) as ObjectResult;
                    }
                    else if (ids[i] == 0)
                    {
                        // 追加
                        tempResult = await PostCreateAsync(orders[i], categories[i], conditions[i], probabilities[i], increaseProbabilities[i], userId, userName) as ObjectResult;
                    }
                    else
                    {
                        // 更新
                        tempResult = await PostUpdateAsync(ids[i], categories[i], conditions[i], probabilities[i], increaseProbabilities[i], orders[i], versions[i], userId, userName) as ObjectResult;
                    }
                    // 実行結果
                    if (tempResult.StatusCode == 200)
                    {
                        results.Add((tempResult.Value as dynamic).Message);
                    }
                    else
                    {
                        errors.Add((tempResult.Value as dynamic).Message);
                    }
                }
                catch (DbUpdateException e)
                {
                    if (e.InnerException.Message.Contains("duplicate"))
                    {
                        errors.Add($"既に他のユーザが更新したか、値が重複したため処理がキャンセルされました。\n画面をリロードしてやり直してください。");
                    }
                    else if (e.InnerException.Message.Contains("conflicted"))
                    {
                        errors.Add($"このマスタを使用しているスタンプがあるため削除できません。");
                    }
                    else if (e.InnerException.Message.Contains("would be truncated"))
                    {
                        errors.Add($"文字数が多すぎたため更新できませんでした。");
                    }
                    else
                    {
                        errors.Add($"想定されていないエラーが発生しました:{e}");
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError("ReportRefProbabilityマスタメンテで想定外のエラーが発生。");
                    _logger.LogError(e.ToString());
                    errors.Add($"想定されていないエラーが発生しました:{e}");
                }
            }

            if (errors.Count == 0)
            {
                // エラーなし
                await _db.CommitTransactionAsync();

                var result = await GetListAsync();
                result.Message = string.Join('\n', results);
                _logger.LogInformation(result.Message);
                return result;
            }
            else
            {
                // エラーあり
                _db.RollbackTransaction();

                var result = await GetListAsync();
                result.Error = string.Join('\n', errors);
                _logger.LogInformation(result.Error);
                return result;
            }
        }
        #endregion

        #region Create
        /// <summary>
        /// 発生確率を作成します。
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> PostCreateAsync(int order, string category, string condition, decimal probability, decimal increaseProbability, long userId, string userName)
        {
            _logger.LogInformation($"PostCreate");
            var companyId = long.Parse(User.FindFirst("CompanyId").Value);
            if (probability < 0)
            {
                return BadRequest(new { Message = $"登録に失敗しました。確率は0以上で入力してください。" });
            }
            if (increaseProbability < 0)
            {
                return BadRequest(new { Message = $"登録に失敗しました。10年後の確率増加値は0以上で入力してください。" });
            }

            var result = await _mediator.Send(new PostReportRefProbabilityCreateQuery
            {
                Category = category,
                Condition = condition,
                Probability = probability,
                IncreaseProbability = increaseProbability,
                CompanyId = companyId,
                Order = order,
                UserId = userId,
                UserName = userName
            });
            if (!result.IsSuccess)
            {
                return BadRequest(new { Message = $"登録に失敗しました。{string.Join(',', result.Messages) }" });
            }
            return Ok(new { Message = $"登録が完了しました。{string.Join(',', result.Messages) }" });
        }
        #endregion

        #region Edit

        #region Post
        /// <summary>
        /// 発生確率を更新します。
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> PostUpdateAsync(long id, string category, string condition, decimal probability, decimal increaseProbability, int order, long version, long userId, string userName)
        {
            _logger.LogInformation($"PostEdit");

            // 対象レコード以外の並び順の修正に必要
            var companyId = long.Parse(User.FindFirst("CompanyId").Value);
            if (probability < 0)
            {
                return BadRequest(new { Message = $"登録に失敗しました。確率は0以上で入力してください。" });
            }
            if (increaseProbability < 0)
            {
                return BadRequest(new { Message = $"登録に失敗しました。10年後の確率増加値は0以上で入力してください。" });
            }

            var result = await _mediator.Send(new PostReportRefProbabilityUpdateQuery
            {
                Id = id,
                Category = category,
                Condition = condition,
                Probability = probability,
                IncreaseProbability = increaseProbability,
                CompanyId = companyId,
                Order = order,
                Version = version,
                UserId = userId,
                UserName = userName
            });
            if (!result.IsSuccess)
            {
                return BadRequest(new { Message = $"更新に失敗しました。{string.Join(',', result.Messages) }" });
            }
            return Ok(new { Message = $"更新が完了しました。{string.Join(',', result.Messages) }" });
        }
        #endregion

        #endregion

        #region Delete
        /// <summary>
        /// ReportRefProbability/PostDelete
        /// 削除します。
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ActionResult> PostDeleteAsync(long id, long version)
        {
            _logger.LogInformation($"PostDelete");

            var result = await _mediator.Send(new PostDeleteReportRefProbabilityQuery
            {
                Id = id,
                Version = version
            });
            if (!result.IsSuccess)
            {
                return BadRequest(new { Message = $"削除に失敗しました。{string.Join(',', result.Messages) }" });
            }
            return Ok(new { Message = $"削除が完了しました。{string.Join(',', result.Messages) }" });
        }
        #endregion

    }

    #region List
    /// <summary>共通の処理結果</summary>
    public class PostReportRefProbabilityResult
    {
        /// <summary>結果</summary> 
        public bool IsSuccess { get; set; } = true;

        /// <summary>メッセージ</summary> 
        public List<string> Messages { get; set; } = new List<string>();
    }

    #region Get
    /// <summary>検索条件</summary>
    public class GetReportRefProbabilityListQuery : IRequest<GetReportRefProbabilityListResult>
    {
        public long CompanyId { get; set; }
    }

    /// <summary>検索結果</summary>
    public class GetReportRefProbabilityListResult
    {
        /// <summary>検索した情報</summary> 
        public ReportRefProbabilityModel[] ReportRefProbabilities { get; set; }
        /// <summary>画面に表示する処理結果</summary> 
        public string Message { get; set; }
        /// <summary>画面に表示するエラー</summary> 
        public string Error { get; set; }
    }

    /// <summary> 
    /// 発生確率一覧検索ハンドラ
    /// </summary> 
    public class GetReportRefProbabilityListQueryHandler : IRequestHandler<GetReportRefProbabilityListQuery, GetReportRefProbabilityListResult>
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public GetReportRefProbabilityListQueryHandler(ApplicationDbContext db, IMapper mapper)
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
        public async Task<GetReportRefProbabilityListResult> Handle(GetReportRefProbabilityListQuery query, CancellationToken token)
        {
            // DB検索
            var reportRefProbabilities = _db.ReportRefProbabilities.Where(x => x.CompanyId == query.CompanyId).OrderBy(x => x.Order).AsNoTracking().ToArray();

            // 検索結果の格納
            var result = new GetReportRefProbabilityListResult
            {
                ReportRefProbabilities = _mapper.Map<ReportRefProbabilityEntity[], ReportRefProbabilityModel[]>(reportRefProbabilities)
            };
            return await Task.FromResult(result);
        }
    }
    #endregion

    #endregion

    #region Create

    #region Post
    /// <summary>処理条件</summary>
    public class PostReportRefProbabilityCreateQuery : IRequest<PostReportRefProbabilityResult>
    {
        public string Category { get; set; }
        public string Condition { get; set; }
        public decimal Probability { get; set; }
        public decimal IncreaseProbability { get; set; }
        public int Order { get; set; }
        public long CompanyId { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
    }

    /// <summary> 
    /// ハンドラ 
    /// PostReportRefProbabilityCreateQueryをSendすると動作し、ReportRefProbabilityCreateResultを返す 
    /// </summary> 
    public class PostReportRefProbabilityCreateQueryHandler : IRequestHandler<PostReportRefProbabilityCreateQuery, PostReportRefProbabilityResult>
    {
        private readonly ApplicationDbContext _db;

        public PostReportRefProbabilityCreateQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 処理を定義する
        /// </summary>
        /// <param name="query">処理条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<PostReportRefProbabilityResult> Handle(PostReportRefProbabilityCreateQuery query, CancellationToken token)
        {
            var result = new PostReportRefProbabilityResult();

            try
            {
                // 登録
                _db.ReportRefProbabilities.Add(new ReportRefProbabilityEntity
                {
                    Category = query.Category,
                    Condition = query.Condition,
                    Probability = query.Probability,
                    IncreaseProbability = query.IncreaseProbability,
                    CompanyId = query.CompanyId,
                    Order = query.Order,
                    UpdatedUserId = query.UserId,
                    UpdatedBy = query.UserName,
                    UpdatedDate = DateTime.UtcNow
                });
                await _db.SaveChangesAsync();

                result.Messages.Add($"[表示順：{query.Order}, カテゴリ：{query.Category}, コンディション：{query.Condition}, 確率：{query.Probability}, 10年後の確率増加値：{query.IncreaseProbability}]");

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
    #endregion

    #endregion

    #region Update

    #region Post
    /// <summary>検索条件</summary>
    public class PostReportRefProbabilityUpdateQuery : IRequest<PostReportRefProbabilityResult>
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public string Condition { get; set; }
        public decimal Probability { get; set; }
        public decimal IncreaseProbability { get; set; }
        public int Order { get; set; }
        public long CompanyId { get; set; }
        public long Version { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
    }

    /// <summary> 
    /// ハンドラ
    /// </summary> 
    public class PostReportRefProbabilityUpdateQueryHandler : IRequestHandler<PostReportRefProbabilityUpdateQuery, PostReportRefProbabilityResult>
    {
        private readonly ApplicationDbContext _db;

        public PostReportRefProbabilityUpdateQueryHandler(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 処理の方法を定義する
        /// </summary>
        /// <param name="query">検索条件</param>
        /// <param name="token"></param>
        /// <returns></returns>
        public async Task<PostReportRefProbabilityResult> Handle(PostReportRefProbabilityUpdateQuery query, CancellationToken token)
        {

            var result = new PostReportRefProbabilityResult();

            try
            {
                // データ作成
                var target = _db.ReportRefProbabilities.FirstOrDefault(x => x.ReportRefProbabilityId == query.Id && x.Version == query.Version);
                if (target == null)
                {
                    result.IsSuccess = false;
                    result.Messages.Add($"既に他のユーザが更新したため、処理がキャンセルされました。\n画面をリロードしてやり直してください。");
                    return await Task.FromResult(result);
                }

                var message = $"更新前[表示順：{target.Order}, カテゴリ：{target.Category}, コンディション：{target.Condition}, 確率：{target.Probability}, 10年後の確率増加値：{target.IncreaseProbability}]";

                // 更新
                target.Category = query.Category;
                target.Condition = query.Condition;
                target.Probability = query.Probability;
                target.IncreaseProbability = query.IncreaseProbability;
                target.UpdatedDate = DateTime.UtcNow;
                target.UpdatedUserId = query.UserId;
                target.UpdatedBy = query.UserName;
                target.Order = query.Order;
                target.Version++;

                await _db.SaveChangesAsync();

                result.Messages.Add($"{message} 更新後[表示順：{query.Order}, カテゴリ：{query.Category}, コンディション：{query.Condition}, 確率：{query.Probability}, 10年後の確率増加値：{query.IncreaseProbability}]");

                return await Task.FromResult(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

    #endregion

    #endregion

    #region Delete
    /// <summary>検索条件</summary>
    public class PostDeleteReportRefProbabilityQuery : IRequest<PostReportRefProbabilityResult>
    {
        public long Id { get; set; }
        public long Version { get; set; }
    }

    /// <summary> 
    /// ハンドラ 
    /// PostDeleteReportRefProbabilityQueryをSendすると動作し、PostDeleteReportRefProbabilityResultを返す 
    /// </summary> 
    public class PostDeleteReportRefProbabilityQueryHandler : IRequestHandler<PostDeleteReportRefProbabilityQuery, PostReportRefProbabilityResult>
    {
        private readonly ApplicationDbContext _db;

        public PostDeleteReportRefProbabilityQueryHandler(ApplicationDbContext db)
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
        public async Task<PostReportRefProbabilityResult> Handle(PostDeleteReportRefProbabilityQuery query, CancellationToken token)
        {
            var result = new PostReportRefProbabilityResult();
            try
            {
                // 削除
                var target = _db.ReportRefProbabilities.FirstOrDefault(x => x.ReportRefProbabilityId == query.Id && x.Version == query.Version);
                if (target == null)
                {
                    result.IsSuccess = false;
                    result.Messages.Add($"既に他のユーザが更新したため、処理がキャンセルされました。\n画面をリロードしてやり直してください。");
                    return await Task.FromResult(result);
                }
                _db.ReportRefProbabilities.Remove(target);
                await _db.SaveChangesAsync();

                result.Messages.Add($"[表示順：{target.Order}, カテゴリ：{target.Category}, コンディション：{target.Condition}, 確率：{target.Probability}, 10年後の確率増加値：{target.IncreaseProbability}]");

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
