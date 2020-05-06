namespace RensyuRensyu.Models.Master
{
    /// <summary>
    /// 発生確率の画面モデルです。
    /// </summary>
    public class ReportRefProbabilityModel
    {
        /// <summary>
        /// IDを取得、もしくは、設定します。
        /// </summary>
        public long ReportRefProbabilityId { get; set; }
        
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
        public decimal Probability { get; set; }
        
        /// <summary>
        /// 最終評価日から10年経過後の確率増加値を取得、もしくは、設定します。
        /// </summary>
        public decimal IncreaseProbability { get; set; }
        
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