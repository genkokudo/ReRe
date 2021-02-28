import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListWorldModule, ListState } from '../../../store/master/world/List';
import { Container, Row } from 'reactstrap';
import Utils from "../../../Utils";

/*
 * 発生確率一覧画面の表示
 */
const ListWorld = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // state取得
    const currentState: ListState = useSelector((state: any) => state.listWorld);

    // 初回および、サーバ送信データ作成時に実行
    useEffect(() => {
        // ここでfetchする
        fetch('/World/PostListTable', {
            method: 'post',
            body: currentState.formData,
            credentials: 'include'
        }).then(function (response) {
            if (response.status !== 200) {
                alert(`サーバ処理で何か失敗したようです`);
            }
            // JSONメッセージを取り出す
            response.json().then(function (data) {
                // コールバック結果を画面に反映させる
                dispatch(ListWorldModule.actions.setData(data));
            }).catch(function (err) {
                alert(`レスポンスはありませんでした: ${err}`);
            });
        }).catch(function (err) {
            alert(`error: ${err}`);
        });
    }, [currentState.postTrigger]); // 第2引数の値が変化すると実行

    // データ一覧表示
    function body() {
        var list = [];

        // 件数分繰り返し
        for (var i in currentState.worlds) {
            const world = currentState.worlds[i];
            const isDel = currentState.worlds[i].isDeleted;
            const isEdit = currentState.worlds[i].isEditMode;
            const isEdited = currentState.worlds[i].isEdited;
            const isNg = currentState.worlds[i].isNgInput;
            const index = i;
            let tbodyClass = isEdited ? 'table-success' : '';
            tbodyClass = isEdit ? 'table-warning' : tbodyClass;
            tbodyClass = isDel ? 'table-danger' : tbodyClass;
            list.push(
                <tbody key={`tbody_${i}`} className={tbodyClass}>
                    {/* 1行 */}
                    <tr key={`tr_${i}`}>
                        {/* 編集項目（必須入力） */}
                        <td key={`td_order_${i}`}>
                            {!isEdit && <p className={'input-number'}>{world.order}</p>}
                            {isEdit && <input type="number" className={'input-number'} value={world.order} onChange={(e) => dispatch(ListWorldModule.actions.editOrder({ id: index, order: Number(e.currentTarget.value) }))} />}
                        </td>
                        <td key={`td_name_${i}`}>
                            {!isEdit && <p>{world.name}</p>}
                            {isEdit && <input type="text" value={world.name} onChange={(e) => dispatch(ListWorldModule.actions.editName({ id: index, text: e.currentTarget.value }))} />}
                        </td>
                        <td key={`td_probability_${i}`}>
                            {!isEdit && <p>{world.probability}</p>}
                            {isEdit && <input type="number" max="9999.99" min="0" step="0.01" value={world.probability} onChange={(e) => dispatch(ListWorldModule.actions.editProbability({ id: index, text: Number(e.currentTarget.value) }))} />}
                        </td>
                        <td key={`td_updated_by_${i}`}>
                            <p>{world.updatedBy}</p>
                        </td>
                        <td key={`td_updated_date_${i}`}>
                            <p>{world.updatedDate}</p>
                        </td>
                        {/* ボタン */}
                        <td key={`td_edit_${i}`}>
                            {!isEdit && <button className={'btn btn-sm btn-primary'} value={i.toString()} onClick={() => dispatch(ListWorldModule.actions.editLine(index))} disabled={isDel}>編集</button>}
                            {isEdit && <button className={'btn btn-sm btn-primary'} value={i.toString()} onClick={() => dispatch(ListWorldModule.actions.editLine(index))} disabled={isDel || isNg}>完了</button>}
                        </td>
                        <td key={`td_delete_${i}`}>
                            {!isDel && <button className={'btn btn-sm btn-danger'} onClick={() => dispatch(ListWorldModule.actions.removeLine(index))}>削除</button>}
                            {isDel && <button className={'btn btn-sm btn-primary'} onClick={() => dispatch(ListWorldModule.actions.removeLine(index))}>取消</button>}
                        </td>
                        <td key={`td_error_${i}`}>
                            {!isDel && <p className={'text-danger'}>{currentState.worlds[i].errorMessage}</p>}
                        </td>
                    </tr>
                </tbody>
            );
        }
        return list;
    }

    return (
        <Container>
            {
                <React.Fragment>
                    {/* メッセージ */}
                    <Row><span className={'text-return'}>{currentState.message}</span></Row>
                    <Row><span className={'text-danger text-return'}>{currentState.error}</span></Row>
                    <Row><span className={'text-return'}>確率は {0} ～ {Utils.calcMaxValue(6, 2)} で入力してください。</span></Row>
                    <Row><span className={'text-return'}>確率は%ではなく小数で入力してください。（例：20%の場合"0.2", 5%の場合"0.05"）</span></Row>
                    {/* ボタン */}
                    <button className={'btn btn-primary mt-2'} onClick={() => dispatch(ListWorldModule.actions.addLine())}>新規追加</button>
                    {/* 一覧 */}
                    <table className={'table table-striped table-hover table-responsive'}>
                        <thead>
                            <tr>
                                <th>表示順</th>
                                <th>名前</th>
                                <th>確率</th>
                                <th>更新者</th>
                                <th>更新日時</th>
                                <th>編集</th>
                                <th>削除</th>
                            </tr>
                        </thead>
                        {body()}
                    </table>
                    <button className={'btn btn-warning'} disabled={!currentState.isEdited} onClick={() => {
                        if (window.confirm('以上の内容で更新します。よろしいですか？')) {
                            // formdata作ってstateに持たせる、formdataが変化するとuseEffectが反応してPostする。
                            dispatch(ListWorldModule.actions.makeFormData());
                        }
                    }}>確定</button>
                </React.Fragment>
            }
        </Container>
    );
};

export default ListWorld;