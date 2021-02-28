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
	/// 世界設定です。
	/// </summary>
	public class WorldEntity : EntityBase
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long WorldId { get; set; }

		/// <summary>
		/// 会社を取得、もしくは、設定します。
		/// </summary>
		public Company Company { get; set; }
		
		/// <summary>
		/// 名前を取得、もしくは、設定します。
		/// </summary>
		public string Name { get; set; }
		
		/// <summary>
		/// 確率を取得、もしくは、設定します。
		/// </summary>
		[Column(TypeName = "decimal(6, 2)")]
		public decimal Probability { get; set; }
		
		/// <summary>
		/// 並び順を取得、もしくは、設定します。
		/// </summary>
		public int Order { get; set; }
		
		public class MappingProfiler : Profile
		{
			public MappingProfiler() => CreateMap<WorldEntity, WorldModel>(MemberList.Source)
				.ForMember(dest => dest.WorldId, opt => opt.MapFrom(src => src.WorldId))
				.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
				.ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
				.ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => TimeZoneInfo.ConvertTimeFromUtc(src.UpdatedDate, TZConvert.GetTimeZoneInfo("Tokyo Standard Time")).ToString("yyyy/MM/dd HH:mm:ss")))
				.ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
				.ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company))
				.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
				.ForMember(dest => dest.Probability, opt => opt.MapFrom(src => src.Probability))
				;
		}
	}
}