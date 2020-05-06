using RensyuRensyu.Entities;
using System.Linq;

namespace RensyuRensyu.Infrastructure.Database
{
	/// <summary>
	/// DBのマスタデータを初期化します。
	/// </summary>
	public class DbInitializer
	{
		public static void Initialize(ApplicationDbContext context)
		{
			if (context.Companies.Any())
			{
				// マスタデータ作成済ならば何もしない
				return;
			}
			
			// 会社名の初期化
			context.Companies.AddRange(Company.InitialData);
			context.SaveChanges();
			
		}
	}
}