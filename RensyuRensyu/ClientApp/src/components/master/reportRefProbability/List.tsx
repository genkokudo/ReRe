import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListReportRefProbabilityModule, ListState } from '../../../store/master/reportRefProbability/List';
import { Container, Row } from 'reactstrap';
import Utils from "../../../Utils";

/*
 * 発生確率一覧画面の表示
 */
const ListReportRefProbability = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // state取得
    const currentState: ListState = useSelector((state: any) => state.listReportRefProbability);

    // 初回および、サーバ送信データ作成時に実行
    useEffect(() => {
        // ここでfetchする
        fetch('/ReportRefProbability/PostListTable', {
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
                dispatch(ListReportRefProbabilityModule.actions.setData(data));
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
        for (var i in currentState.reportRefProbabilities) {
            const reportRefProbability = currentState.reportRefProbabilities[i];
            const isDel = currentState.reportRefProbabilities[i].isDeleted;
            const isEdit = currentState.reportRefProbabilities[i].isEditMode;
            const isEdited = currentState.reportRefProbabilities[i].isEdited;
            const isNg = currentState.reportRefProbabilities[i].isNgInput;
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
                            {!isEdit && <p className={'input-number'}>{reportRefProbability.order}</p>}
                            {isEdit && <input type="number" className={'input-number'} value={reportRefProbability.order} onChange={(e) => dispatch(ListReportRefProbabilityModule.actions.editOrder({ id: index, order: Number(e.currentTarget.value) }))} />}
                        </td>
                        <td key={`td_category_${i}`}>
                            {!isEdit && <p>{reportRefProbability.category}</p>}
                            {isEdit && <input type="text" value={reportRefProbability.category} onChange={(e) => dispatch(ListReportRefProbabilityModule.actions.editCategory({ id: index, text: e.currentTarget.value }))} />}
                        </td>
                        <td key={`td_condition_${i}`}>
                            {!isEdit && <p>{reportRefProbability.condition}</p>}
                            {isEdit && <input type="text" value={reportRefProbability.condition} onChange={(e) => dispatch(ListReportRefProbabilityModule.actions.editCondition({ id: index, text: e.currentTarget.value }))} />}
                        </td>
                        <td key={`td_probability_${i}`}>
                            {!isEdit && <p>{reportRefProbability.probability}</p>}
                            {isEdit && <input type="number" max="9999.99" min="-9999.99" step="0.01" value={reportRefProbability.probability} onChange={(e) => dispatch(ListReportRefProbabilityModule.actions.editProbability({ id: index, text: Number(e.currentTarget.value) }))} />}
                        </td>
                        <td key={`td_increase_probability_${i}`}>
                            {!isEdit && <p>{reportRefProbability.increaseProbability}</p>}
                            {isEdit && <input type="number" max="9999.99" min="-9999.99" step="0.01" value={reportRefProbability.increaseProbability} onChange={(e) => dispatch(ListReportRefProbabilityModule.actions.editIncreaseProbability({ id: index, text: Number(e.currentTarget.value) }))} />}
                        </td>
                        <td key={`td_updated_by_${i}`}>
                            <p>{reportRefProbability.updatedBy}</p>
                        </td>
                        <td key={`td_updated_date_${i}`}>
                            <p>{reportRefProbability.updatedDate}</p>
                        </td>
                        {/* ボタン */}
                        <td key={`td_edit_${i}`}>
                            {!isEdit && <button className={'btn btn-sm btn-primary'} value={i.toString()} onClick={() => dispatch(ListReportRefProbabilityModule.actions.editLine(index))} disabled={isDel}>編集</button>}
                            {isEdit && <button className={'btn btn-sm btn-primary'} value={i.toString()} onClick={() => dispatch(ListReportRefProbabilityModule.actions.editLine(index))} disabled={ isDel || isNg }>完了</button>}
                        </td>
                        <td key={`td_delete_${i}`}>
                            {!isDel && <button className={'btn btn-sm btn-danger'} onClick={() => dispatch(ListReportRefProbabilityModule.actions.removeLine(index))}>削除</button>}
                            {isDel && <button className={'btn btn-sm btn-primary'} onClick={() => dispatch(ListReportRefProbabilityModule.actions.removeLine(index))}>取消</button>}
                        </td>
                        <td key={`td_error_${i}`}>
                            {!isDel && <p className={'text-danger'}>{currentState.reportRefProbabilities[i].errorMessage}</p>}
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
                    <Row><span className={'text-return'}>確率は {Utils.calcMinValue(6, 2)} ～ {Utils.calcMaxValue(6, 2)} で入力してください。</span></Row>
                    <Row><span className={'text-return'}>最終評価日から10年経過後の確率増加値は {Utils.calcMinValue(6, 2)} ～ {Utils.calcMaxValue(6, 2)} で入力してください。</span></Row>
                    {/* ボタン */}
                    <button className={'btn btn-primary mt-2'} onClick={() => dispatch(ListReportRefProbabilityModule.actions.addLine())}>新規追加</button>
                    {/* 一覧 */}
                    <table className={'table table-striped table-hover table-responsive'}>
                        <thead>
                            <tr>
                                <th>表示順</th>
                                <th>カテゴリ</th>
                                <th>コンディション</th>
                                <th>確率</th>
                                <th>最終評価日から10年経過後の確率増加値</th>
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
                            dispatch(ListReportRefProbabilityModule.actions.makeFormData());
                        }
                    }}>確定</button>
                </React.Fragment>
            }
        </Container>
    );
};

export default ListReportRefProbability;