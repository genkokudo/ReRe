﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RensyuRensyu.Entities
{
    /// <summary>
    /// マスタメンテ用エンティティの共通項目です。
    /// </summary>
    public class EntityBase
    {
        /// <summary>
        /// 更新ユーザIDを取得、もしくは、設定します。
        /// </summary>
        public long UpdatedUserId { get; set; }

        /// <summary>
        /// 更新ユーザ名を取得、もしくは、設定します。
        /// </summary>
        public string UpdatedBy { get; set; }

        /// <summary>
        /// 更新日時を取得、もしくは、設定します。
        /// </summary>
        public DateTime UpdatedDate { get; set; }

        /// <summary>
        /// 楽観的排他制御を取得、もしくは、設定します。
        /// 手動更新
        /// </summary>
        public long Version { get; set; }

        /// <summary>
        /// 論理削除を取得、もしくは、設定します。
        /// </summary>
        public bool IsDeleted { get; set; }

    }
}