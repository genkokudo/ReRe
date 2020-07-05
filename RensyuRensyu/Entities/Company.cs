using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RensyuRensyu.Entities
{
    public class Company
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long CompanyId { get; set; }

		/// <summary>
		/// 名称を取得、もしくは、設定します。
		/// </summary>
		[StringLength(100)]
		public string Name { get; set; }

		/// <summary>
		/// 並び順を取得、もしくは、設定します。
		/// </summary>
		public int Order { get; set; }

		/// <summary>
		/// 初期値を作成します。
		/// </summary>
		public static Company[] InitialData
		{
			get
			{
				var names = new[] { "管理者", "銀兵堂" };
				var result = new List<Company>();
				for (int i = 0; i < names.Length; i++)
				{
					result.Add(new Company() { Name = names[i] });
				}
				return result.ToArray();
			}
		}

		//public class MappingProfiler : Profile
		//{
		//	public MappingProfiler() => CreateMap<Company, CompanyModel>(MemberList.Source)
		//		.ForMember(dest => dest.CompanyId, opt => opt.MapFrom(src => src.CompanyId))
		//		.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
		//		.ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
		//		.ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => TimeZoneInfo.ConvertTimeFromUtc(src.UpdatedDate, TZConvert.GetTimeZoneInfo("Tokyo Standard Time")).ToString("yyyy/MM/dd HH:mm:ss")))
		//		.ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
		//		.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
		//		.ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
		//		;
		//}

	}
}
