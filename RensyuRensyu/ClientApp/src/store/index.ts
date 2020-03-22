import NazoMap from '../store/leaflet/NazoMap';
import { SpecialModule } from './Special';

// アクションがディスパッチされるたびに、Reduxは、名前が一致するREDUCERを使用して各トップレベルのアプリケーション状態プロパティを更新します。
// 名前が正確に一致すること、およびREDUCERが重要です。
export const reducers = {
    special: SpecialModule.reducer,   // △△画面の処理
    nazoMap: NazoMap.reducer   // △△画面の処理
};