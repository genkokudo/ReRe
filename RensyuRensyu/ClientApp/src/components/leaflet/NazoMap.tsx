import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, Marker, Popup, Polyline, LayersControl, LayerGroup, FeatureGroup, Circle, Rectangle } from 'react-leaflet';
import Control from 'react-leaflet-control';
import NazoMapModule from "../../store/leaflet/NazoMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NazoMapLayers, { NazoMapLayersProps } from './NazoMapLayers';
import NazoMapDraw from './NazoMapDraw';

/*
 * 地図画面の表示
 */
const NazoMap = () => {
    //useEffect(() => {
    //    console.log('hello useEffect');
    //}, []);

    // store に紐付いた dispatch を取得する
    const dispatch = useDispatch();

    //// store の state を取得する
    //const count = useSelector((state: any) => state.nazoMap.count);

    // レイヤーを使用した地図の描画
    const { BaseLayer, Overlay } = LayersControl;

    // とりあえず使用する適当な座標
    const center: [number, number] = [34.96841, 136.62732];
    const rectangle: [number, number][] = [[51.49, -0.08], [51.5, -0.06]];
    const nazoMapLayersProps: NazoMapLayersProps = { center: center, rectangle: rectangle };

    // 描画処理
    return (
        <React.Fragment>
            <Map center={center} zoom={13}>

                {/* 右上にレイヤー選択を作成 */}
                <NazoMapLayers {...nazoMapLayersProps} />

                {/* 描画ツールを作成 */}
                <NazoMapDraw />

                {/* ボタン追加 */}
                <Control position="topleft" >
                    <button onClick={() => dispatch(NazoMapModule.actions.increment())}>
                        <div><FontAwesomeIcon icon={['fas', 'minus-circle']} /></div>
                    </button>
                    <button onClick={() => alert('alert')}>
                        <div><FontAwesomeIcon icon={['fab', 'github']} />アラート</div>
                    </button>
                </Control>
                <Control position="topleft" >
                    <button onClick={() => alert('alert')}>
                        <div><FontAwesomeIcon icon={['fab', 'github']} />アラート</div>
                    </button>
                </Control>
                <Control position="topright" >
                    <button onClick={() => alert('alert')}>
                        <div><FontAwesomeIcon icon={['fab', 'github']} />アラート</div>
                    </button>
                </Control>

                {/* 線を引く */}
                <Polyline positions={[
                    [35.007904, 136.597519],
                    [35.02664, 136.622259],
                    [34.982158, 136.631795],
                    [34.965716, 136.614922],
                    [34.970725, 136.555688],
                    [34.99368, 136.542041],
                    [35.032062, 136.562559],
                    [35.009322, 136.577461],
                    [35.007904, 136.597519]
                ]}>
                </Polyline>
                <Polyline positions={[[34.997932, 136.600816], [34.991654, 136.599221]]} />
                <Polyline positions={[[34.999107, 136.572963], [34.991705, 136.569218]]} />
            </Map>
        </React.Fragment>
    );
};

export default NazoMap;


