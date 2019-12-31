import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - Redux�X�g�A�ŕێ������f�[�^�̃^�C�v���`���܂��B

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

// -----------------
// ACTIONS - �����́A��ԑJ�ڂ̃V���A�����\�ȁi���������čĐ��\�ȁj�����ł��B
// �����ɂ͕���p�͂���܂���B�ނ�͋N���邱�Ƃ�������邾���ł��B

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

// ���ʉ����ꂽ�g���v�^��錾���܂��B ����ɂ��A�utype�v�v���p�e�B�ւ̂��ׂĂ̎Q�ƂɁA
// �錾���ꂽ�^�C�v������̂����ꂩ���܂܂�邱�Ƃ��ۏ؂���܂��i���̔C�ӂ̕�����͊܂܂�܂���j�B
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;

// ----------------
// ACTION CREATORS - �����́A��ԑJ�ڂ��g���K�[����UI�R���|�[�l���g�Ɍ��J�����֐��ł��B
// ��Ԃ𒼐ڕω������邱�Ƃ͂���܂��񂪁A�O���̕���p�i�f�[�^�̓ǂݍ��݂Ȃǁj�������N�����\��������܂��B

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // �܂������Ă��Ȃ��i�����Ă܂��ǂݍ��܂�Ă��Ȃ��j�f�[�^�݂̂�ǂݍ��݂܂�
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - �w�肳�ꂽ��ԂƃA�N�V�����ɑ΂��āA�V������Ԃ�Ԃ��܂��B
// �^�C���g���x�����T�|�[�g���邽�߂ɁA����͌Â���Ԃ�ω������Ă͂Ȃ�܂���B

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState | undefined, incomingAction: Action): WeatherForecastsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // �ŐV�̃��N�G�X�g�Ɉ�v����ꍇ�ɂ̂݁A���M�f�[�^���󂯓���܂��B
            // ����ɂ��A���s���̉����𐳂��������ł��܂��B
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
