import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import NazoMapModule from "../../store/leaflet/NazoMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    // 描画処理
    return (
        <React.Fragment>
            <Map center={[45.4, -75.7]} zoom={13}>
                {/* 地図を提供しているサービスから画像を貰う、どこから貰っているかは右下に表示される */}
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* 見えないけど、クリックしたらメッセージを吹き出し表示するようになる */}
                <Marker position={[45.4, -75.7]}>
                    <Popup>
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
            </Map>
        </React.Fragment>
    );
};

export default NazoMap;


