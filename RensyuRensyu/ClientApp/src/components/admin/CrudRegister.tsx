import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrudRegisterModule, CrudRegisterState } from '../../store/admin/CrudRegister';
import { Container, Row, Col } from 'reactstrap';
import { useFetch } from '../../store/useFetch';
import { useHistory } from 'react-router';

// TODO:とりあえず一覧と新規追加だけ実装。編集と削除は後回し。
/*
 * ユーザ一覧画面の表示
 */
const CrudRegister = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // 画面遷移
    const history = useHistory();

    // fetchでデータ取得する
    const { loading, error, data } = useFetch('/CrudRegister/Index');

    // stateにデータを反映させる
    dispatch(CrudRegisterModule.actions.setData(data));

    // state取得
    const currentState: CrudRegisterState = useSelector((state: any) => state.CrudRegister);

    // 本体
    function body() {
        var list = [];

        for (var i in currentState.Cruds.values) {
            list.push(
                <tbody key={'tbody' + '_' + i}>
                    <tr key={'tr' + '_' + i}>
                        <td key={'td' + '_' + i}>currentState.Cruds.values[i].name</td>
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
                    <button onClick={() => history.push('/react/Crud-register-create')}>新規登録</button>
                    <table>
                        {body()}
                    </table>
                </React.Fragment>
            }
        </Container>
    );
};

export default CrudRegister;