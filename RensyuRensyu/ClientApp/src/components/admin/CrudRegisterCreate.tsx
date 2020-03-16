import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrudRegisterCreateModule, CrudRegisterCreateState } from '../../store/admin/CrudRegisterCreate';
import { Container, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import { useFetch } from '../../store/useFetch';   // react_export_usefetch
import { useHistory } from 'react-router';

/*
 * ユーザ作成画面の表示
 */
const CrudRegisterCreate = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // 画面遷移
    const history = useHistory();

    // fetchでデータ取得する
    const { loading, error, data } = useFetch('/CrudRegister/GetCrudRegisterCreate');

    // stateにデータを反映させる
    dispatch(CrudRegisterCreateModule.actions.setData(data));

    // state取得
    const currentState: CrudRegisterCreateState = useSelector((state: any) => state.CrudRegisterCreate);
    const id: string = useSelector((state: any) => state.CrudRegisterCreate.id);
    const password: string = useSelector((state: any) => state.CrudRegisterCreate.password);
    const companyId: string = useSelector((state: any) => state.CrudRegisterCreate.companyId);

    // 所属会社
    function renderCompany() {
        var list = [];

        for (var i in currentState.companies) {
            list.push(
                <option key={'companies' + '_' + i} value={currentState.companies[i].value}>{currentState.companies[i].text}</option>
            );
        }
        return (
            <FormGroup>
                <Label for="selectCompany">所属会社</Label>
                <Input type="select" name="select" id="selectCompany" value={companyId} onChange={(e) => { dispatch(CrudRegisterCreateModule.actions.changeCompanyId(e.target.value)) }}>
                    {list}
                </Input>
            </FormGroup>
        );
    }

    // 権限
    function renderAuthority() {
        var list = [];

        for (var i in currentState.authorities) {
            list.push(
                <CustomInput
                    id={'authorities' + '_' + i}
                    key={'authorities' + '_' + i}
                    value={currentState.authorities[i].value}
                    type="checkbox"
                    label={currentState.authorities[i].text}
                    onChange={(e) => { dispatch(CrudRegisterCreateModule.actions.changeAuthority({ checked: e.target.checked, value: e.target.value })) }} />
            );
        }
        return (
            <FormGroup check>
                <Label check>
                    <div>
                        {list}
                    </div>
                </Label>
            </FormGroup>
        );
    }

    return (
        <Container>
            {loading && <span>Loading...</span>}
            {error && <span>Failed to fetch </span>}
            {
                data &&
                <div>
                    <Form>
                        <FormGroup>
                            <Label for="CrudId">ユーザID</Label>
                            <Input type="text" name="id" id="CrudId" placeholder="" value={id} onChange={(e) => { dispatch(CrudRegisterCreateModule.actions.changeId(e.target.value)) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="CrudPassword">Password</Label>
                            <Input type="password" name="password" id="CrudPassword" placeholder="" value={password} onChange={(e) => { dispatch(CrudRegisterCreateModule.actions.changePassword(e.target.value)) }} />
                        </FormGroup>
                        {renderCompany()}
                        {renderAuthority()}
                        <Button className="mt-3" onClick={() => dispatch(CrudRegisterCreateModule.actions.postData())}>Submit</Button>
                    </Form>
                    <button className="mt-3" onClick={() => history.push('/react/Crud-register-index')}>一覧に戻る</button>
                </div>
            }
        </Container>
    );
};

export default CrudRegisterCreate;