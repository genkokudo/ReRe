import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

// CounterStore.CounterState��CounterStore.actionCreators�����̂����Ă�݂���
// CounterState��interface�AactionCreators�͂Ȃ񂩃��\�b�h�̏W�܂�
type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators &
    RouteComponentProps<{}>;
// CounterState�͏�Ԃ�\���Ă���A�����ł̓N���b�N�����񐔂ƂȂ�B��������̂���actionCreators�ŃJ�E���g�A�b�v�B
// Redux�͏�Ԃ��X�V����ꍇ�A��ɐV������Ԃ�Ԃ��B�㏑���ł͂Ȃ��B

// ��ō쐬����CounterProps���g�p���ăN���X���`
class Counter extends React.PureComponent<CounterProps> {
    // �ǂ����import��ŏ����Ȃ��Ă��N���X��export�����ꍇ��render()���ĂԂ��ƂɂȂ��Ă�炵���B
    // this.props�ɂ�CounterProps�������Ă�̂ŁA���̒���CounterStore.actionCreators�Ƃ��ɒ�`���ꂽ���̂��Ăׂ�
    // this.props.count��CounterStore.CounterState�ɓ����Ă��邼
    public render() {
        return (
            <React.Fragment>
                <h1>Counter</h1>

                <p>����́AReact�R���|�[�l���g�̊ȒP�ȗ�ł��B</p>

                <p aria-live="polite">���݂̃J�E���g: <strong>{this.props.count}</strong></p>

                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => { this.props.increment(); }}>
                    ���₷
                </button>
            </React.Fragment>
        );
    }
};

// HOME�ƈ���āAComponent���p�������N���X��Ԃ�
// ��ʕ\������l����Ԃɑ�����鏊�������ɐݒ肷��
export default connect( // �ǂ����index.ts�Ŋo���Ă���ApplicationState�̒l��n���炵���B�����Ɍ��݂̃J�E���^���������Ă���B
    (state: ApplicationState) => state.counter, // �ǂ̏�ԃv���p�e�B���R���|�[�l���g�̏�����Ƀ}�[�W���邩��I�����܂�
    CounterStore.actionCreators // �R���|�[�l���g�̏�����Ƀ}�[�W����A�N�V�����쐬�҂�I�����܂�
)(Counter);
