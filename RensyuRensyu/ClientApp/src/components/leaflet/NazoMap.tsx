import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, Marker, Popup, Polyline, LayersControl, LayerGroup, FeatureGroup, Circle, Rectangle } from 'react-leaflet';
import Control from 'react-leaflet-control';
import NazoMapModule from "../../store/leaflet/NazoMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { EditControl } from 'react-leaflet-draw';
// レイヤーとか他のコンポーネントに分けれるかなと思ったけど、無駄。
// 関数に分けるぐらいが良い。

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

    // MarkerにFontawesomeを使用
    const iconMarkup = renderToStaticMarkup(<FontAwesomeIcon icon={['fas', 'minus-circle']} />);
    const customMarkerIcon = divIcon({
        html: iconMarkup,
    });

    // レイヤーを使用した地図の描画
    const { BaseLayer, Overlay } = LayersControl;

    // とりあえず使用する適当な座標
    const center: [number, number] = [34.96841, 136.62732];
    const rectangle: [number, number][] = [[51.49, -0.08], [51.5, -0.06]];

    // 切替式レイヤー1
    function toggleLayer1() {
        // 地図を提供しているサービスから画像を貰う、どこから貰っているかは右下に表示される
        return (
            <BaseLayer checked name='OpenStreetMap.Mapnik'>
                <TileLayer
                    attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </BaseLayer>
            );
    }

    // 切替式レイヤー2
    function toggleLayer2() {
        return (
            <BaseLayer name='OpenStreetMap.BlackAndWhite'>
                <TileLayer
                    attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                    url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
                />
            </BaseLayer>
        );
    }

    // 切替式レイヤー3
    function toggleLayer3() {
        return (
            <BaseLayer name='Gsi.Cyberjapandata'>
                <TileLayer
                    attribution="<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
                    url='http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
                />
            </BaseLayer>
        );
    }

    // 選択式レイヤー1
    function selectLayer1() {
        return (
            <Overlay checked name="Marker with popup">
                <Marker position={center} icon={customMarkerIcon}>
                    <Popup>
                        <FontAwesomeIcon icon={['fas', 'minus-circle']} />
                        ポップアップができるよ！ <br /> 改行もできるよ！
                            </Popup>
                </Marker>
            </Overlay>
        );
    }

    // 選択式レイヤー2
    function selectLayer2() {
        return (
            <Overlay checked name="Layer group with circles">
                <LayerGroup>
                    <Circle center={center} fillColor="blue" radius={200} />
                    <Circle
                        center={center}
                        fillColor="red"
                        radius={100}
                        stroke={false}
                    />
                    <LayerGroup>
                        <Circle
                            center={center}
                            color="green"
                            fillColor="green"
                            radius={100}
                        />
                    </LayerGroup>
                </LayerGroup>
            </Overlay>
        );
    }

    // 選択式レイヤー3
    function selectLayer3() {
        return (
            <Overlay name="Feature group">
                <FeatureGroup color="purple">
                    <Popup>
                        <span>Popup in FeatureGroup</span>
                    </Popup>
                    <Circle center={center} radius={200} />
                    <Rectangle bounds={rectangle} />
                </FeatureGroup>
            </Overlay>
        );
    }

    // 描画処理
    return (
        <React.Fragment>
            <Map center={center} zoom={13}>

                {/* 右上にレイヤー選択を作成 */}
                <LayersControl position="topright">
                    {/* 切替式レイヤー */}
                    {toggleLayer1()}
                    {toggleLayer2()}
                    {toggleLayer3()}
                    {/* 選択式レイヤー */}
                    {selectLayer1()}
                    {selectLayer2()}
                    {selectLayer3()}
                </LayersControl>

                <FeatureGroup>
                    <EditControl
                        position='topright'
                        //onEdited={this._onEditPath}
                        //onCreated={this._onCreate}
                        //onDeleted={this._onDeleted}
                        draw={{
                            //rectangle: false
                        }}
                    />
                </FeatureGroup>

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


