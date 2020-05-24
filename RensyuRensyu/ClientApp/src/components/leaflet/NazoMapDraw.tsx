import React, { useEffect } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import NazoMapModule, { NazoMapState } from '../../store/leaflet/NazoMap';

/*
 * 地図画面の図形描画ツール表示
 */
const NazoMapDraw = (props: any) => {
    const draw = require('react-leaflet-draw');
    const dispatch = useDispatch();
    const currentState = useSelector((state: NazoMapState) => state);

    let edit: any;

    // 作成したときの動作
    function onCreated(e: any) {

        // 描画したものをレイヤーごとクリアする
        // 覚えることが沢山
        //var map = props;
        var eeee = edit;
        //e.layer._leaflet_id   // 描画先レイヤのID
        //var targetLayer = eeee.props.leaflet.map._layers[e.layer._leaflet_id];
        var targetLayer = eeee.leafletElement._map._layers[e.layer._leaflet_id];
        eeee.leafletElement._map.removeLayer(targetLayer);
        //dispatch(NazoMapModule.actions.createLines(1));

    }

    return (
        <FeatureGroup>
            <draw.EditControl ref={(aaaa: any) => { edit = aaaa }}
                position='topright'
                //onEdited={this._onEditPath}
                onCreated={onCreated}
                //onDeleted={this._onDeleted}
                draw={{
                    polyline: true,
                    polygon: false,
                    rectangle: false,
                    circle: false,
                    marker: false,
                    circlemarker: false
                }}
            />
        </FeatureGroup>
    );
};

export default NazoMapDraw;


