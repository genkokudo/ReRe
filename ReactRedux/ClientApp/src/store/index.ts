import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';

// �ŏ�ʂ̏�ԃI�u�W�F�N�g
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
}

// �A�N�V�������f�B�X�p�b�`����邽�тɁARedux�́A���O����v���郊�f���[�T�[���g�p���Ċe�g�b�v���x���̃A�v���P�[�V������ԃv���p�e�B���X�V���܂��B
// ���O�����m�Ɉ�v���邱�ƁA����у��f���[�T�[���d�v�ł��B
// �Ή�����ApplicationState�v���p�e�B�^�C�v�ɍ�p���܂��B
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};

// ���̃^�C�v�́A�A�N�V�����N���G�[�^�[�̃q���g�Ƃ��Ďg�p�ł��邽�߁A
// �udispatch�v����сugetState�v�p�����[�^�[���X�g�A�Ɉ�v����悤�ɐ��������͂���܂��B
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
