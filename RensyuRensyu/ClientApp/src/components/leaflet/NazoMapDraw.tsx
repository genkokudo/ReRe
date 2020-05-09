import React, { useEffect } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useSelector, useDispatch } from 'react-redux';
import NazoMapModule, { NazoMapState } from '../../store/leaflet/NazoMap';

/*
 * 地図画面の図形描画ツール表示
 */
const NazoMapDraw = () => {

    const dispatch = useDispatch();
    const currentState = useSelector((state: NazoMapState) => state);

    // 作成したときの動作
    function onCreated() {
        alert('作成しました。');
        dispatch(NazoMapModule.actions.createLines(1));
    }

    return (
        <FeatureGroup>
            <EditControl
                position='topright'
                //onEdited={this._onEditPath}
                onCreated={onCreated}
                //onDeleted={this._onDeleted}
                draw={{
                    polyline: true,
                    polygon: false,
                    rectangle: currentState.is,      // 反応するわけではないらしい
                    circle: false,
                    marker: false,
                    circlemarker: false
                }}
            />
        </FeatureGroup>
    );
};

export default NazoMapDraw;


