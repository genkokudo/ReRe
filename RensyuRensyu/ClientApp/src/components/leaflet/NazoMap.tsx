/* ---- NazoMap.tsx 見た目・コンポーネント ---- */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as NazoMapStore from '../../store/leaflet/NazoMap';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

/**
 * 状態と処理の定義です。
 */
type NazoMapProps =
    NazoMapStore.NazoMapState &
    typeof NazoMapStore.actionCreators &
    RouteComponentProps<{}>;    // TODO:URLに引数がある場合は{userId: string}のように書く

/**
 * 表を選択するメニューを定義します。
 */
class NazoMap extends React.PureComponent<NazoMapProps> {
    public render() {
        return (
        );
    }
}

export default connect(
    (state: ApplicationState) => state.nazomap,
    NazoMapStore.actionCreators
)(NazoMap);



