using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RensyuRensyu.Models
{
    public class Company
	{
		/// <summary>
		/// ID
		/// </summary>
		[Key]
		public long Id { get; set; }

		/// <summary>
		/// 名称
		/// </summary>
		[StringLength(100)]
		public string Name { get; set; }

		/// <summary>
		/// 初期値
		/// </summary>
		public static Company[] InitialData
		{
			get
			{
				var names = new[] { "管理者", "銀兵堂" };
				var result = new List<Company>();
				foreach (var name in names)
				{
					result.Add(new Company() { Name = name });
				}
				return result.ToArray();
			}
		}
	}
}
