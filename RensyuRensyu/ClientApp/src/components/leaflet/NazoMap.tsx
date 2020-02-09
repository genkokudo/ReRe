import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import * as NazoMapStore from '../../store/leaflet/NazoMap';
//import { connect } from 'react-redux';
//import { ApplicationState } from '../../store';
//import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; 
//import L from 'leaflet';
//import 'leaflet-easybutton/src/easy-button';
///**
// * 状態と処理の定義です。
// */
//type NazoMapProps =
//    NazoMapStore.NazoMapState &
//    typeof NazoMapStore.actionCreators &
//    RouteComponentProps<{}>;    // TODO:URLに引数がある場合は{userId: string}のように書く

///**
// * 地図を定義します。
// * 基本的にここを見ましょう
// * https://react-leaflet.js.org/docs/en/examples
// */
//class NazoMap extends React.PureComponent<NazoMapProps> {
//    public render() {
//        require("leaflet-easybutton");
//        require("leaflet-easybutton/src/easy-button.css");

//        //L.easyButton("<div id="tag" class="glyphicon glyphicon - tag" />", function (btn, map) {
//        //    map.setView([42.3748204, -71.1161913], 16);
//        //}, { position: "topleft" }).addTo(this.map);
//        L.easyButton('fa-gbp', function () {
//            alert("aaaa");
//              });

//        return (
//            <Map center={[45.4, -75.7]} zoom={13}>
//                {/* 地図を提供しているサービスから画像を貰う、どこから貰っているかは右下に表示される */}
//                <TileLayer
//                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                />
//                {/* 見えないけど、クリックしたらメッセージを吹き出し表示するようになる */}
//                <Marker position={[45.4, -75.7]}>
//                    <Popup>
//                        A pretty CSS3 popup. <br /> Easily customizable.
//                    </Popup>
//                </Marker>               
//            </Map>
//        );

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
//    }
//} 

//export default connect(
//    (state: ApplicationState) => state.nazomap,
//    NazoMapStore.actionCreators
//)(NazoMap);



