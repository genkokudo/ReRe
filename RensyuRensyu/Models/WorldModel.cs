using RensyuRensyu.Entities;

namespace RensyuRensyu.Models.Master
{
    /// <summary>
    /// 世界設定の画面モデルです。
    /// </summary>
    public class WorldModel
    {
        /// <summary>
        /// IDを取得、もしくは、設定します。
        /// </summary>
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
        public decimal Probability { get; set; }
        
        /// <summary>
        /// 並び順を取得、もしくは、設定します。
        /// </summary>
        public int Order { get; set; }
        
        /// <summary>
        /// 更新回数を取得、もしくは、設定します。
        /// </summary>
        public long Version { get; set; }
        
        /// <summary>
        /// 更新日を取得、もしくは、設定します。
        /// </summary>
        public string UpdatedDate { get; set; }
        
        /// <summary>
        /// 更新者を取得、もしくは、設定します。
        /// </summary>
        public string UpdatedBy { get; set; }
    }
}