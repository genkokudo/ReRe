import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpecialState, SpecialModule } from '../store/Special';
import { Container, Row, Col } from 'reactstrap';
import { useFetch } from '../store/useFetch';   // react_export_usefetch

// 引数の定義
interface SpecialProps {
    aaaa: number;
    bbbb?: string;  // 必須でない場合は?を付ける
}

/*
 * △△画面の表示
 * ↓呼び方
 * <Route path='/special' render={props => <Special aaaa={34} {...props} />}/>
 * ↓こっちで呼んだ場合でもpropsはnullにならず、aaaaとかがnullになってるので判定するとき注意
 * <Route path='/special' component={Special} />
 */
const Special = (props: Partial<SpecialProps>) => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // fetchでデータ取得する
    const { loading, error, data } = useFetch('/Special/Special');

    // stateにデータを反映させる
    dispatch(SpecialModule.actions.setData(data));

    // state取得
    const currentState: SpecialState = useSelector((state: any) => state.special);

    useEffect(() => {
    });

    return (
        <Container>
            {loading && <span>Loading...</span>}
            {error && <span>Failed to fetch</span>}
            {
                data &&
                <div>
                    {currentState.label}
                    {currentState.cost}
                    {currentState.month}
                </div>
            }
            <Row>
                <Col className={'d-flex justify-content-center'}>
                </Col>
            </Row>
        </Container>
    );
};

export default Special;

// -------------------- サーバ側 --------------------
//    /// <summary>検索結果</summary>
//    public class SpecialResult
//    {
//        /// <summary>
//        /// 軸ラベル
//        /// </summary>
//        public string Label { get; set; } = "タイトル";
//
//        /// <summary>
//        /// 金額
//        /// </summary>
//        public List<int> Cost { get; set; }
//
//        /// <summary>
//        /// 年月
//        /// </summary>
//        public List<string> Month { get; set; }
//    }
