import { Action, Reducer } from 'redux';

// -----------------
// STATE - Redux�X�g�A�ŕێ������f�[�^�̃^�C�v���`���܂��B

export interface CounterState {
    count: number;
}

// -----------------
// ACTIONS - �����́A��ԑJ�ڂ̃V���A�����\�ȁi���������čĐ��\�ȁj�����ł��B
// �����ɂ͕���p�͂���܂���B�ނ�͋N���邱�Ƃ�������邾���ł��B
// �V���A����/�t�V���A�����̌�ł����삷��^���o�̂��߂�@typeName��isActionType���g�p���܂��B

// ������interface�͓��ɗ]���ŎQ�Ƃ���Ă���킯�ł͂Ȃ��B�P���ȏ��������炩�H
export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// �u���ʉ����ꂽ���p�́v�^��錾���܂��B����ɂ��A�utype�v�v���p�e�B�ւ̂��ׂĂ̎Q�ƂɎ��̂����ꂩ���܂܂�邱�Ƃ��ۏ؂���܂��B
// �錾���ꂽ�^������i���̔C�ӂ̕�����ł͂���܂���j�B
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// �A�N�V�����N���G�[�^�[-�����́A��ԑJ�ڂ��g���K�[����UI�R���|�[�l���g�Ɍ��J�����֐��ł��B
// ��Ԃ𒼐ڕω������邱�Ƃ͂���܂��񂪁A�O���̕���p�i�f�[�^�̓ǂݍ��݂Ȃǁj�������N�����\��������܂��B

export const actionCreators = {
    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
};

// ----------------
// REDUCER - �w�肳�ꂽ��ԂƃA�N�V�����ɑ΂��āA�V������Ԃ�Ԃ��܂��B�^�C���g���x�����T�|�[�g���邽�߂ɁA����͌Â���Ԃ�ω������Ă͂Ȃ�܂���B
// �i�������jreducer��state�͂܂Ƃ߂�index.ts�ŗ񋓂���Ă���A�C���W�F�N�V�����̂悤�Ȏd�g�݂Ŏ��o���Ďg���Ă���H
export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    if (state === undefined) {
        return { count: 0 };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};
