import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Module from '../../store/leaflet/NazoMap';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

import Control from 'react-leaflet-control';
import NazoMapModule from "../../store/leaflet/NazoMap";

/*
 * △△画面の表示
 */
const NazoMap = () => {
    // レンダリングの後に処理を動作させることができます（レンダリングの前はuseLayoutEffect）
    useEffect(() => {
        console.log('hello useEffect');

        //const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
        //return () => clearInterval(timerId);    // returnを使うと、クリーンアップ関数を登録できる
    }, []); // この第2引数にcountをセットすると、count変更時に再びRenderされる

    /*
    // 他に値を送るための入れ物を使う場合は useContext を使用する
    // コストの大きい計算結果をキャッシュする場合は、useMemoを使用する
    const calcResult = useMemo(() => expensiveFunc(), []);
    // 関数をキャッシュする場合はuseCallbackを使う
    const onClick = useCallback(() => alert('Hi!'), []);
    // DOMから値を取りたい場合はuseRefを使用する
    */

    // store に紐付いた dispatch を取得する
    const dispatch = useDispatch();

    // store の state を取得する
    const count = useSelector((state: any) => state.nazoMap.count);

//        require("leaflet-easybutton");
//        require("leaflet-easybutton/src/easy-button.css");

//        //L.easyButton("<div id="tag" class="glyphicon glyphicon - tag" />", function (btn, map) {
//        //    map.setView([42.3748204, -71.1161913], 16);
//        //}, { position: "topleft" }).addTo(this.map);
//        L.easyButton('fa-gbp', function () {
//            alert("aaaa");
//              });

//        // react-fontawesomeというnpmパッケージを使用します。
//        // http://danielmontague.com/projects/easyButton.js/v1/examples/
//              //  L.easyButton( 'fa-gbp', function(){
//              //      zoomTo.setView([55, -2], 4);
//              //}).addTo(zoomTo);

//              //  L.easyButton( 'fa-jpy', function(){
//              //      zoomTo.setView([38, 139], 4);
//              //}).addTo(zoomTo);

//              //  L.easyButton( 'fa-usd', function(){
//              //      zoomTo.setView([37.8, -96], 3);
//              //}).addTo(zoomTo);


    // 本当はこういう風にLに追加していってるのを、タグで囲む形で表現している。
    //let map = L.map('map')
    //let basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');
    //map.addLayer(basemapLayer);
    //map.setView([35.6693863, 139.6012974], 5);

    // TODO: 「react-leaflet control button」でググること。easy-buttonじゃなくて。

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
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                <Control position="topleft" >
                    <button onClick={() => dispatch(NazoMapModule.actions.increment())}>Reset View</button>
                </Control>
            </Map>
        </React.Fragment>
    );
};

export default NazoMap;









