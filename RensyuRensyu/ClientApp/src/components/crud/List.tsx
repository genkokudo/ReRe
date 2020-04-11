import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListCrudModule, ListState } from '../../store/crud/List';
import { Container, Row, Col } from 'reactstrap';
import { useFetch } from '../../store/useFetch';
import { useHistory } from 'react-router';

// TODO:とりあえず一覧と新規追加だけ実装。編集と削除は後回し。
/*
 * ユーザ一覧画面の表示
 */
const ListCrud = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // 画面遷移
    const history = useHistory();

    // fetchでデータ取得する
    const { loading, error, data } = useFetch('/Crud/GetList'); // Getは省略できない

    // stateにデータを反映させる
    dispatch(ListCrudModule.actions.setData(data));
    // ↑reduxは状態変化させたい場合、必ずdispatchメソッドを呼ぶ。

    // state取得
    const currentState: ListState = useSelector((state: any) => state.listCrud);

    // データ一覧表示
    function body() {
        var list = [];

        // 件数分繰り返し
        for (var i in currentState.cruds) {
            list.push(
                <tbody key={`tbody_${i}`}>
                    {/* 1行 */}
                    <tr key={`tr_${i}`}>
                        {/* 各項目 */}
                        <td key={`td_crudId_${i}`}>{currentState.cruds[i].crudId}</td>
                        <td key={`td_name_${i}`}>{currentState.cruds[i].name}</td>
                        <td key={`td_companyName_${i}`}>{currentState.cruds[i].companyName}</td>
                    </tr>
                </tbody>
            );
        }
        return list;
    }

    return (
        <Container>
            {loading && <span>Loading...</span>}
            {error && <span>Failed to fetch</span>}
            {
                data &&
                <React.Fragment>
                    {/* ボタン */}
                    <button onClick={() => history.push('/crud/create')}>新規登録</button>
                    {/* 一覧 */}
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Authority</th>
                            </tr>
                        </thead>
                        {body()}
                    </table>
                </React.Fragment>
            }
        </Container>
    );
};

export default ListCrud;