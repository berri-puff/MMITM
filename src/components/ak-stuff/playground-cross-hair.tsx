
import './App.css'

import { MapComp } from './Components/MapComp';





function App() {
  //DevData
  const johnogroats = {lat: 58.6373, lng: -3.0689}
  const landsend = {lat: 50.0657, lng: -5.7132}
  const edinburgh = {lat: 55.9533, lng: -3.1883}
  const stokeontrent = {lat: 53.0033, lng: -2.1827}
  const bootle = {lat: 53.4433, lng: -2.9989}
  const brunswick = {lat: 53.383399, lng: -2.977230}
  const liverpool = {lat: 53.4084, lng: -2.9916}
  const leeds = {lat: 53.8008, lng: -1.5491}
  const manchester = {lat: 53.4808, lng: -2.2426}
  //DevData

  const pos1 = {lat: 58.6373, lng: -3.0689}
  const pos2 = {lat: 50.0657, lng: -5.7132}
  const midPoint = {lat: 0, lng: 0}
  const posNorth = {lat: 0, lng: 0}
  const posSouth = {lat: 0, lng: 0}
  const posEast = {lat: 0, lng: 0}
  const posWest = {lat: 0, lng: 0}

  //Equation to work out midpoint coordinates from pos1 and pos2
  let latDif = 0
  let halfLatDif = 0
  let lngDif = 0
  let halfLngDif = 0
  if(pos1.lat > pos2.lat){
    latDif = pos1.lat - pos2.lat
    halfLatDif = latDif/2 
    midPoint.lat = pos1.lat - halfLatDif
  } else 
  if(pos1.lat < pos2.lat){
    latDif = pos2.lat - pos1.lat
    halfLatDif = latDif/2 
    midPoint.lat = pos2.lat - halfLatDif
  } 
  if(pos1.lng > pos2.lng){
    lngDif = pos1.lng - pos2.lng
    halfLngDif = lngDif/2 
    midPoint.lng = pos1.lng - halfLngDif
  } else 
  if(pos1.lng < pos2.lng){
    lngDif = pos2.lng - pos1.lng
    halfLngDif = lngDif/2 
    midPoint.lng = pos2.lng - halfLngDif
  } 
 //Equation to work out midpoint coordinates from pos1 and pos2


  // Equation to work out distance(s) to midpoint from one of the points
  let diffLat = midPoint.lat - pos1.lat
  let squareLat = diffLat * diffLat
  let diffLng = pos1.lng - midPoint.lng
  let squareLng = diffLng * diffLng
  let totalOfSquaredLatLng = squareLng + squareLat
  let distanceToMid = Math.sqrt(totalOfSquaredLatLng)
  let twentyPercentDist = distanceToMid / 5
  let fortyPercentDist = twentyPercentDist * 2
  // Equation to work out distance(s) to midpoint from one of the points


 

  // Equation to work out points spread out in the cardinal directions
  posNorth.lat = midPoint.lat + twentyPercentDist
  posNorth.lng = midPoint.lng
  posSouth.lat = midPoint.lat - twentyPercentDist
  posSouth.lng = midPoint.lng
  posEast.lat = midPoint.lat
  posEast.lng = midPoint.lng + fortyPercentDist
  posWest.lat = midPoint.lat
  posWest.lng = midPoint.lng - fortyPercentDist
  // Equation to work out points spread out in the cardinal directions



  return (
  <div style={{height: "100vh"}}>
      <MapComp midPoint={midPoint} mapID={MapID} pos1={pos1} pos2={pos2} posNorth={posNorth} posSouth={posSouth} posEast={posEast} posWest={posWest}/>
  </div>
  )
}

export default App
