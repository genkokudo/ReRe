using AutoMapper;
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
	public class User
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long UserId { get; set; }

		/// <summary>
		/// 名称を取得、もしくは、設定します。
		/// </summary>
		[StringLength(50)]
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

		/// <summary>
		/// 現在のログイン成功までにパスワードを誤った回数を取得、もしくは、設定します。
		/// ログイン時に0に設定されます。
		/// </summary>
		public int PasswordIncollectCount { get; set; }

		/// <summary>
		/// 前回のログイン成功までにパスワードを誤った回数を取得、もしくは、設定します。
		/// </summary>
		public int LastPasswordIncollectCount { get; set; }

		/// <summary>
		/// 前回のパスワード変更日時(UTC)（初期パスワード判定にも使用）を取得、もしくは、設定します。
		/// </summary>
		public DateTime LastPasswordCorrection { get; set; }

		/// <summary>
		/// 前回のログイン成功日時(UTC)を取得、もしくは、設定します。
		/// </summary>
		public DateTime LastLogin { get; set; }

		//public class MappingProfiler : Profile
		//{
		//	public MappingProfiler() => CreateMap<User, UserIndexViewModel>(MemberList.Source)
		//		.ForMember(dest => dest.UserCompanyName, opt => opt.MapFrom(src => src.Company.Name))
		//		.ForMember(dest => dest.UserAuthoritiesName, opt => opt.MapFrom(src => src.UserAuthorities.Select(x => x.Authority.ToString()))
		//		);
		//}
	}
}
