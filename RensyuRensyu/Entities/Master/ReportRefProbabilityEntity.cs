using AutoMapper;
using RensyuRensyu.Models.Master;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using TimeZoneConverter;

namespace RensyuRensyu.Entities
{
	/// <summary>
	/// 発生確率です。
	/// </summary>
	public class ReportRefProbabilityEntity : EntityBase
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long ReportRefProbabilityId { get; set; }

		/// <summary>
		/// 会社IDを取得、もしくは、設定します。
		/// </summary>
		public long CompanyId { get; set; }
		
		/// <summary>
		/// カテゴリを取得、もしくは、設定します。
		/// </summary>
		public string Category { get; set; }
		
		/// <summary>
		/// コンディションを取得、もしくは、設定します。
		/// </summary>
		public string Condition { get; set; }
		
		/// <summary>
		/// 確率を取得、もしくは、設定します。
		/// </summary>
		[Column(TypeName = "decimal(6, 2)")]
		public decimal Probability { get; set; }
		
		/// <summary>
		/// 最終評価日から10年経過後の確率増加値を取得、もしくは、設定します。
		/// </summary>
		[Column(TypeName = "decimal(6, 2)")]
		public decimal IncreaseProbability { get; set; }
		
		/// <summary>
		/// 並び順を取得、もしくは、設定します。
		/// </summary>
		public int Order { get; set; }
		
		public class MappingProfiler : Profile
		{
			public MappingProfiler() => CreateMap<ReportRefProbabilityEntity, ReportRefProbabilityModel>(MemberList.Source)
				.ForMember(dest => dest.ReportRefProbabilityId, opt => opt.MapFrom(src => src.ReportRefProbabilityId))
				.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
				.ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
				.ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => TimeZoneInfo.ConvertTimeFromUtc(src.UpdatedDate, TZConvert.GetTimeZoneInfo("Tokyo Standard Time")).ToString("yyyy/MM/dd HH:mm:ss")))
				.ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
				.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
				.ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
				.ForMember(dest => dest.Probability, opt => opt.MapFrom(src => src.Probability))
				.ForMember(dest => dest.IncreaseProbability, opt => opt.MapFrom(src => src.IncreaseProbability))
				;
		}
	}
}