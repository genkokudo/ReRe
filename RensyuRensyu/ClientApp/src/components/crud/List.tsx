import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListCrudModule, ListState } from '../../store/crud/List';
import { Container, Row, Col, Input } from 'reactstrap';
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
                        <td key={`td_userAuthorities_${i}`}>{currentState.cruds[i].userAuthorities.join(', ')}</td>
                        <td key={`td_edit_${i}`}><button className={'btn btn-sm btn-primary'} onClick={() => alert('編集')}>編集</button></td>
                        <td key={`td_delete_${i}`}><button className={'btn btn-sm btn-danger'} value={i.toString()} onClick={(e) => dispatch(ListCrudModule.actions.removeLine(e.currentTarget.value))}>削除</button>
                            <Input type="text" value={currentState.cruds[i].isDeleted.toString()} /></td>
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
                    <button className={'btn btn-primary'} onClick={() => history.push('/crud/create')}>新規登録</button>
                    <button className={'float-right'} onClick={() => history.push('/crud/create')}>新規登録（遷移）</button>
                    {/* 一覧 */}
                    <table className={'table table-striped table-hover table-responsive'}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名前</th>
                                <th>所属</th>
                                <th>権限</th>
                                <th>編集</th>
                                <th>削除</th>
                            </tr>
                        </thead>
                        {body()}
                    </table>
                    {/* <button className={'btn btn-warning disabled'} onClick={() => dispatch(ListCrudModule.actions.submitData(currentState))} disabled>確定</button> */}
                    <button className={'btn btn-warning disabled'} onClick={() => dispatch(ListCrudModule.actions.submitData(currentState))}>確定</button>
                </React.Fragment>
            }
        </Container>
    );
};

export default ListCrud;