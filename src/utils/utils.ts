
import { Coordinates, CrosshairProps } from "../types";

export const sortPlaces = (places) => {
  const reviewedPlaces = places.filter((place) => {
    return place.user_ratings_total >= 5;
  });
  const sortedPlaces = reviewedPlaces.sort((a, b) => {
    return b.rating - a.rating;
  });
  const uniquePlaces = sortedPlaces.reduce((accumulator, current) => {
    if(!accumulator.find((item) => item.place_id === current.place_id)) {
      accumulator.push(current)
    }
    return accumulator
  }, [])
  return uniquePlaces.slice(0, 25)
};

export const convertToNumberCoord = (coordInString: string): Coordinates => {
  const latitude = coordInString.split(", ");
  const longitude = coordInString.split(", ");
  const coordNums: Coordinates = {
    lat: Number(latitude[0]),
    lng: Number(longitude[1]),
  };

  return coordNums;
};

export const convertCoordsToCrosshair = (props: CrosshairProps) => {
  const midPoint = { lat: 0, lng: 0 };
  const posNorth = { lat: 0, lng: 0 };
  const posSouth = { lat: 0, lng: 0 };
  const posEast = { lat: 0, lng: 0 };
  const posWest = { lat: 0, lng: 0 };

  //Equation to work out midpoint coordinates from props.userCoord and props.friendCoord
  let latDif = 0;
  let halfLatDif = 0;
  let lngDif = 0;
  let halfLngDif = 0;
  if (props.userCoord.lat > props.friendCoord.lat) {
    latDif = props.userCoord.lat - props.friendCoord.lat;
    halfLatDif = latDif / 2;
    midPoint.lat = props.userCoord.lat - halfLatDif;
  } else if (props.userCoord.lat < props.friendCoord.lat) {
    latDif = props.friendCoord.lat - props.userCoord.lat;
    halfLatDif = latDif / 2;
    midPoint.lat = props.friendCoord.lat - halfLatDif;
  }
  if (props.userCoord.lng > props.friendCoord.lng) {
    lngDif = props.userCoord.lng - props.friendCoord.lng;
    halfLngDif = lngDif / 2;
    midPoint.lng = props.userCoord.lng - halfLngDif;
  } else if (props.userCoord.lng < props.friendCoord.lng) {
    lngDif = props.friendCoord.lng - props.userCoord.lng;
    halfLngDif = lngDif / 2;
    midPoint.lng = props.friendCoord.lng - halfLngDif;
  }
  //Equation to work out midpoint coordinates from props.userCoord and props.friendCoord

  // Equation to work out distance(s) to midpoint from one of the points
  let diffLat = midPoint.lat - props.userCoord.lat;
  let squareLat = diffLat * diffLat;
  let diffLng = props.userCoord.lng - midPoint.lng;
  let squareLng = diffLng * diffLng;
  let totalOfSquaredLatLng = squareLng + squareLat;
  let distanceToMid = Math.sqrt(totalOfSquaredLatLng);
  let twentyPercentDist = distanceToMid / 5;
  let fortyPercentDist = twentyPercentDist * 2;
  // Equation to work out distance(s) to midpoint from one of the points

  // Equation to work out points spread out in the cardinal directions
  posNorth.lat = midPoint.lat + twentyPercentDist;
  posNorth.lng = midPoint.lng;
  posSouth.lat = midPoint.lat - twentyPercentDist;
  posSouth.lng = midPoint.lng;
  posEast.lat = midPoint.lat;
  posEast.lng = midPoint.lng + fortyPercentDist;
  posWest.lat = midPoint.lat;
  posWest.lng = midPoint.lng - fortyPercentDist;

  return {
    midpoint: midPoint,
    posNorth: posNorth,
    posEast: posEast,
    posSouth: posSouth,
    posWest: posWest,
  };
};

export const convertCrosshairToArray = (crosshair) => {
  const coordinates = [];
  let string = "";
  string = crosshair.midpoint.lat + ", " + crosshair.midpoint.lng;
  coordinates.push(string);
  string = crosshair.posNorth.lat + ", " + crosshair.posNorth.lng;
  coordinates.push(string);
  string = crosshair.posEast.lat + ", " + crosshair.posEast.lng;
  coordinates.push(string);
  string = crosshair.posSouth.lat + ", " + crosshair.posSouth.lng;
  coordinates.push(string);
  string = crosshair.posWest.lat + ", " + crosshair.posWest.lng;
  coordinates.push(string);
  return coordinates;
};

export const convertDateToDay = (date) => {
  const dayObj = {weekdayTextIndex: 0, periodsDayIndex: 0, dayIndex: 0, dayName: ""}
  const dateToConvert = new Date (date)
  let weekdayTextIndex = dateToConvert.getDay() - 1
  const periodsDayIndex = dateToConvert.getDay()
  let dayIndex = dateToConvert.getDay()
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  if(weekdayTextIndex === -1) {
    weekdayTextIndex = 6
  }
  if(weekdayTextIndex === 5){
    weekdayTextIndex = 0 
  }
  if(dayIndex === 0) {
    dayIndex = 7
  }
  dayObj.dayIndex = dayIndex
  dayObj.periodsDayIndex = periodsDayIndex
  dayObj.weekdayTextIndex = weekdayTextIndex
  dayObj.dayName = dayNames[weekdayTextIndex]
  return dayObj
}
export const convertTime = (time) => {
  const firstHalf = time.slice(0,2)
  const secondHalf = time.slice(2)
  return firstHalf + ':' + secondHalf
}
export const areTheyOpen = (details, timeStamp) => {

  const finalDetails = []
  details.forEach((detail) => {

    const openingHours = detail.data.result.current_opening_hours
    if(openingHours) {
      
      if (openingHours.weekday_text[timeStamp.day.weekdayTextIndex] !== "Closed") {
        
        const splitInfo = openingHours.weekday_text[timeStamp.day.weekdayTextIndex].split(':')
        if(splitInfo[1] !== 'Closed') {
          
          let convertedOpenTime
          let convertedCloseTime 
          let openDate
          let closeDate
          openingHours.periods.forEach((period) => {
            if (period.open.day === timeStamp.day.dayIndex) {
              convertedOpenTime = convertTime(period.open.time)
              convertedCloseTime = convertTime(period.close.time)
              openDate = period.open.date
              closeDate = period.close.date
            }
          })
          
        // console.log(timeStamp, 'timestamp')
        // console.log(convertedOpenTime, 'open time')
        // console.log(convertedCloseTime, 'close time')
        // console.log(openDate, 'open date')
        // console.log(closeDate, 'close date ')
        

          const openTime = new Date(`${openDate}` + ` ${convertedOpenTime}`)
          const closeTime = new Date(`${closeDate}` + ` ${convertedCloseTime}`)
          const meetingTime = new Date(`${timeStamp.date}` + ` ${timeStamp.time}`)

     
          if(openTime <= meetingTime && closeTime > meetingTime){
            finalDetails.push(detail)
      
          } 

      
        }
      }
    }

})
console.log(finalDetails, 'FINAL DETAILS')
return finalDetails
}