import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import Control from 'react-leaflet-control';
import NazoMapModule from "../../store/leaflet/NazoMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import '../../leaflet.css'
//import L from 'leaflet'

/*
 * △△画面の表示
 */
const NazoMap = () => {
    //useEffect(() => {
    //    console.log('hello useEffect');
    //}, []);

    // store に紐付いた dispatch を取得する
    const dispatch = useDispatch();

    //// store の state を取得する
    //const count = useSelector((state: any) => state.nazoMap.count);

    // MarkerにFontawesomeを使用
    const iconMarkup = renderToStaticMarkup(<FontAwesomeIcon icon={['fas', 'minus-circle']} />);
    const customMarkerIcon = divIcon({
        html: iconMarkup,
    });

    // 描画処理
    return (
        <React.Fragment>
            <Map center={[34.96841, 136.62732]} zoom={13}>
                {/* 地図を提供しているサービスから画像を貰う、どこから貰っているかは右下に表示される */}
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* クリックしたらメッセージを吹き出し表示するようになる */}
                {/* TODO:白い四角形消したい → 無理なので、ライブラリ使わずに普通にCDNして描画する方法を使う。 */}
                <Marker position={[34.96841, 136.62732]} onClick={() => alert('マーカーのクリック')} icon={customMarkerIcon}>
                    <Popup>
                        <FontAwesomeIcon icon={['fas', 'minus-circle']} />
                        ポップアップができるよ！ <br /> 改行もできるよ！
                    </Popup>
                </Marker>

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


