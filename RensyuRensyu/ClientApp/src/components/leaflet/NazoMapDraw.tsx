import React, { useEffect } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import NazoMapModule, { NazoMapState } from '../../store/leaflet/NazoMap';

/*
 * 地図画面の図形描画ツール表示
 */
const NazoMapDraw = () => {
    const draw = require('react-leaflet-draw');
    const dispatch = useDispatch();
    const currentState = useSelector((state: NazoMapState) => state);

    // 作成したときの動作
    function onCreated(e: any) {
        //e.layer._latlngs.foreach

        //dispatch(NazoMapModule.actions.createLines(1));
    }

    return (
        <FeatureGroup>
            <draw.EditControl
                position='topright'
                //onEdited={this._onEditPath}
                onCreated={onCreated}
                //onDeleted={this._onDeleted}
                draw={{
                    polyline: true,
                    polygon: false,
                    rectangle: false,      // 反応するわけではないらしい
                    circle: false,
                    marker: false,
                    circlemarker: false
                }}
            />
        </FeatureGroup>
    );
};

export default NazoMapDraw;


