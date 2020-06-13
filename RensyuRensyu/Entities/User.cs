using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RensyuRensyu.Entities
{

	/// <summary>
	/// ユーザーです。
	/// Basic認証にも使用します。
	/// </summary>
	public class UserEntity
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long UserId { get; set; }

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

		//public class MappingProfiler : Profile
		//{
		//	public MappingProfiler() => CreateMap<UserEntity, UserIndexViewModel>(MemberList.Source)
		//		.ForMember(dest => dest.UserCompanyName, opt => opt.MapFrom(src => src.Company.Name))
		//		.ForMember(dest => dest.UserAuthoritiesName, opt => opt.MapFrom(src => src.UserAuthorities.Select(x => x.Authority.ToString()))
		//		);
		//}
	}
}
