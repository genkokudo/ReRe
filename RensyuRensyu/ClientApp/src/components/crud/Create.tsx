import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCrudModule, CreateState } from '../../store/crud/Create';
import { Container, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import { useFetch } from '../../store/useFetch';
import { useHistory } from 'react-router';

/*
 * ユーザ作成画面の表示
 */
const CreateCrud = () => {
    // hooksセットアップ
    const dispatch = useDispatch();

    // 画面遷移
    const history = useHistory();

    // fetchでデータ取得する
    const { loading, error, data } = useFetch('/Crud/GetCreate');

    // stateにデータを反映させる
    dispatch(CreateCrudModule.actions.setData(data));

    // state取得
    const currentState: CreateState = useSelector((state: any) => state.createCrud);

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
                <Label for="selectCompany">会社</Label>
                <Input type="select" name="select" id="selectCompany" value={currentState.companyId} onChange={(e) => { dispatch(CreateCrudModule.actions.changeCompanyId(e.target.value)) }}>
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
                    onChange={(e) => { dispatch(CreateCrudModule.actions.changeAuthority({ checked: e.target.checked, value: e.target.value })) }} />
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
                            <Label for="CrudId">ユーザ名</Label>
                            <Input type="text" name="name" id="CrudId" placeholder="" value={currentState.name} onChange={(e) => { dispatch(CreateCrudModule.actions.changeName(e.target.value)) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="CrudPassword">Password</Label>
                            <Input type="password" name="password" id="CrudPassword" placeholder="" value={currentState.password} onChange={(e) => { dispatch(CreateCrudModule.actions.changePassword(e.target.value)) }} />
                        </FormGroup>
                        {renderCompany()}
                        {renderAuthority()}
                        <Button className="mt-3 btn btn-warning" onClick={() => dispatch(CreateCrudModule.actions.postData())}>Submit</Button>
                    </Form>
                    <button className={'mt-3 btn btn-primary'} onClick={() => history.push('/crud')}>一覧に戻る</button>
                </div>
            }
        </Container>
    );
};

export default CreateCrud;