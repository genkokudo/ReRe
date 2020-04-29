using AutoMapper;
using RensyuRensyu.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RensyuRensyu.Models
{
	// TODO:ユニーク制約が必要
	// TODO:IsDeletedと、UpdatedDateが必要

	public class Crud
    {
        [Key]
        public long Id { get; set; }

		/// <summary>
		/// 名称を取得、もしくは、設定します。
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// 暗号化したパスワードを取得、もしくは、設定します。
		/// </summary>
		public string PassWord { get; set; }

		/// <summary>
		/// パスワードソルトを取得、もしくは、設定します。
		/// </summary>
		public byte[] Salt { get; set; }

		/// <summary>
		/// 所属会社を取得、もしくは、設定します。
		/// </summary>
		public Company Company { get; set; }

		/// <summary>
		/// ユーザ権限を取得、もしくは、設定します。
		/// </summary>
		public List<UserAuthority> UserAuthorities { get; set; }

		public class MappingProfiler : Profile
		{
			public MappingProfiler() => CreateMap<Crud, CrudListViewModel>(MemberList.Source)
				.ForMember(dest => dest.CrudId, opt => opt.MapFrom(src => src.Id))
				.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
				.ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
				.ForMember(dest => dest.UserAuthorities, opt => opt.MapFrom(src => src.UserAuthorities.Select(x => x.Authority.ToString()))
				);
		}

		///// <summary>
		///// 排他制御
		///// </summary>
		//[Timestamp]
		//public byte[] Version { get; set; }

		///// <summary>
		///// 更新日時
		///// </summary>
		//public DateTime UpdatedDate { get; set; }

		//public override int SaveChanges()
		//{
		//	var now = DateTime.Now;
		//	SetCreateDateTime(now);
		//	SetUpdateDateTime(now);
		//	return base.SaveChanges();
		//}

		//private void SetUpdateDateTime(DateTime now)
		//{
		//	var entities = this.ChangeTracker.Entries()
		//		.Where(e => (e.State == EntityState.Added || e.State == EntityState.Modified) && e.CurrentValues.PropertyNames.Contains("UpdateDateTime"))
		//		.Select(e => e.Entity);

		//	foreach (dynamic entity in entities)
		//	{
		//		entity.UpdateDateTime = now;
		//	}
		//}
	}
}
