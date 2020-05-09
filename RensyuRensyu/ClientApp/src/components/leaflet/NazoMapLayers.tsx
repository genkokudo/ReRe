import React, { useEffect } from 'react';
import { Map, TileLayer, Marker, Popup, Polyline, LayersControl, LayerGroup, FeatureGroup, Circle, Rectangle } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

export interface NazoMapLayersProps {
    center: [number, number];
    rectangle: [number, number][];
}

/*
 * 地図画面のレイヤー表示
 */
const NazoMapLayers = (props: NazoMapLayersProps) => {

    // MarkerにFontawesomeを使用
    const iconMarkup = renderToStaticMarkup(<FontAwesomeIcon icon={['fas', 'minus-circle']} />);
    const customMarkerIcon = divIcon({
        html: iconMarkup,
    });

    // レイヤーを使用した地図の描画
    const { BaseLayer, Overlay } = LayersControl;

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
                <Marker position={props.center} icon={customMarkerIcon}>
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
                    <Circle center={props.center} fillColor="blue" radius={200} />
                    <Circle
                        center={props.center}
                        fillColor="red"
                        radius={100}
                        stroke={false}
                    />
                    <LayerGroup>
                        <Circle
                            center={props.center}
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
                    <Circle center={props.center} radius={200} />
                    <Rectangle bounds={props.rectangle} />
                </FeatureGroup>
            </Overlay>
        );
    }
    return (
        <React.Fragment>
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

        </React.Fragment>
    );
};

export default NazoMapLayers;


