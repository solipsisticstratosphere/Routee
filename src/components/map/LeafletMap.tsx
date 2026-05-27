import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import WebView from 'react-native-webview'

export interface Region {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

export interface MapMarker {
  id: string
  coordinate: { latitude: number; longitude: number }
  color?: string
}

export interface LeafletMapProps {
  style?: StyleProp<ViewStyle>
  initialRegion: Region
  markers?: MapMarker[]
  polyline?: { latitude: number; longitude: number }[]
  polylineColor?: string
  userLocation?: { latitude: number; longitude: number }
  scrollEnabled?: boolean
  zoomEnabled?: boolean
}

export interface LeafletMapRef {
  animateToRegion: (region: Region) => void
  updateMarker: (id: string, coord: { latitude: number; longitude: number }) => void
  setUserLocation: (coord: { latitude: number; longitude: number }) => void
}

function deltaToZoom(delta: number): number {
  return Math.round(Math.log2(360 / delta))
}

function inject(webView: WebView | null, js: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(webView as any)?.injectJavaScript(`${js}; true;`)
}

export const LeafletMap = forwardRef<LeafletMapRef, LeafletMapProps>((props, ref) => {
  const {
    initialRegion, markers, polyline, polylineColor,
    userLocation, scrollEnabled = true, zoomEnabled = true, style,
  } = props
  const webRef = useRef<WebView>(null)

  useImperativeHandle(ref, () => ({
    animateToRegion: (r) => {
      const z = deltaToZoom(r.latitudeDelta ?? 0.04)
      inject(webRef.current, `window.ma.pan(${r.latitude},${r.longitude},${z})`)
    },
    updateMarker: (id, coord) => {
      inject(webRef.current, `window.ma.move('${id}',${coord.latitude},${coord.longitude})`)
    },
    setUserLocation: (coord) => {
      inject(webRef.current, `window.ma.user(${coord.latitude},${coord.longitude})`)
    },
  }))

  const html = useMemo(() => buildHtml({
    lat: initialRegion.latitude,
    lng: initialRegion.longitude,
    zoom: deltaToZoom(initialRegion.latitudeDelta ?? 0.04),
    scroll: scrollEnabled,
    zoom2: zoomEnabled,
    markers: markers?.map(m => ({ id: m.id, lat: m.coordinate.latitude, lng: m.coordinate.longitude, color: m.color ?? '#00E5A0' })) ?? [],
    polyline: polyline?.map(p => ({ lat: p.latitude, lng: p.longitude })) ?? [],
    polylineColor: polylineColor ?? '#00E5A0',
    userLat: userLocation?.latitude ?? null,
    userLng: userLocation?.longitude ?? null,
  }), [])

  return (
    <WebView
      ref={webRef}
      source={{ html }}
      style={[styles.map, style]}
      scrollEnabled={false}
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
      mixedContentMode="always"
      androidLayerType="hardware"
    />
  )
})

function buildHtml(c: {
  lat: number; lng: number; zoom: number
  scroll: boolean; zoom2: boolean
  markers: { id: string; lat: number; lng: number; color: string }[]
  polyline: { lat: number; lng: number }[]
  polylineColor: string
  userLat: number | null; userLng: number | null
}): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;background:#f0eeeb}
#m{height:100%;width:100%}
.leaflet-control-attribution,.leaflet-control-zoom{display:none}
.pin{width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.udot{width:14px;height:14px;border-radius:50%;background:#4A9EFF;border:3px solid #fff;box-shadow:0 0 0 5px rgba(74,158,255,.25)}
</style>
</head>
<body>
<div id="m"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var D=${JSON.stringify(c)};
var map=L.map('m',{zoomControl:false,attributionControl:false,dragging:D.scroll,touchZoom:D.zoom2,scrollWheelZoom:false,doubleClickZoom:false})
  .setView([D.lat,D.lng],D.zoom);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd'}).addTo(map);
var pins={},upin=null;
function mk(c){return L.divIcon({className:'',html:'<div class="pin" style="background:'+c+'"></div>',iconSize:[18,18],iconAnchor:[9,9]})}
function uk(){return L.divIcon({className:'',html:'<div class="udot"></div>',iconSize:[14,14],iconAnchor:[7,7]})}
D.markers.forEach(function(m){pins[m.id]=L.marker([m.lat,m.lng],{icon:mk(m.color)}).addTo(map)});
if(D.polyline.length>1)L.polyline(D.polyline.map(function(p){return[p.lat,p.lng]}),{color:D.polylineColor,weight:4,opacity:.9,lineJoin:'round',lineCap:'round'}).addTo(map);
if(D.userLat!==null)upin=L.marker([D.userLat,D.userLng],{icon:uk()}).addTo(map);
window.ma={
  pan:function(lat,lng,z){map.setView([lat,lng],z||map.getZoom(),{animate:true})},
  move:function(id,lat,lng){if(pins[id])pins[id].setLatLng([lat,lng])},
  user:function(lat,lng){if(!upin){upin=L.marker([lat,lng],{icon:uk()}).addTo(map)}else{upin.setLatLng([lat,lng])}}
};
</script>
</body>
</html>`
}

const styles = StyleSheet.create({
  map: { backgroundColor: '#f0eeeb' },
})
