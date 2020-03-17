using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RensyuRensyu.Models
{
	public enum UserAuthorityTypes
	{
		/// <summary>
		/// システム管理者用の機能を使用できます。
		/// </summary>
		Administrator,
		/// <summary>
		/// VrrからCmmpに送信できます。
		/// この権限があるユーザのIDとパスワードはVRR送信時のBasic認証にも使用します。
		/// </summary>
		Vrr,
		/// <summary>
		/// Cmmpの画面表示ができます。
		/// </summary>
		Cmmp
	}

	/// <summary>
	/// Enumに拡張メソッドを作成できないのでここに作成
	/// </summary>
	public static class UserAuthorityExtensions
	{
		/// <summary>
		/// SelectListを作成します。
		/// </summary>
		/// <param name="value"></param>
		/// <param name="enumType">typeofで取得する型</param>
		/// <param name="defaultText">未選択値を作成する場合は書く</param>
		/// <returns></returns>
		public static List<SelectListItem> GetSelectList(this Enum value, Type enumType, string defaultText = "")
		{
			value.GetType();
			var values = Enum.GetValues(enumType);

			List<SelectListItem> selectList = new List<SelectListItem>();
			if (!string.IsNullOrWhiteSpace(defaultText))
			{
				selectList.Add(new SelectListItem { Text = defaultText, Value = "-1", });
			}

			foreach (var val in values)
			{
				string eName = Enum.GetName(enumType, val);
				selectList.Add(new SelectListItem { Text = eName, Value = val.ToString(), });
			}

			return selectList;
		}
	}

	/// <summary>
	/// ユーザに権限を付与する
	/// </summary>
	public class UserAuthority
	{
		/// <summary>
		/// IDを取得、もしくは、設定します。
		/// </summary>
		[Key]
		public long Id { get; set; }

		/// <summary>
		/// 権限を取得、もしくは、設定します。
		/// </summary>
		public UserAuthorityTypes Authority { get; set; }
	}
}
