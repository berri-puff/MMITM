import { useState, useEffect } from 'react';

export const SimpleMap2 = () => {
  let map: google.maps.Map;
  async function initMap(): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    map = new Map(document.getElementById('map2') as HTMLElement, {
      center: { lat: 51.50926259077321, lng: -0.07626504139119791 },
      zoom: 8,
    });
  }

  initMap();

  // Render the map container and placeholders for request and response
  return (
    <div>
      <p>Tower of London</p>
      <div id="map2" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export const AdvancedMarker = () => {
  async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } =
      (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('amap') as HTMLElement, {
      zoom: 12,
      center: { lat: 34.84555, lng: -111.8035 },
      mapId: '4504f8b37365c3d0',
    });

    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.
    const tourStops = [
      {
        position: { lat: 34.8791806, lng: -111.8265049 },
        title: 'Boynton Pass',
      },
      {
        position: { lat: 34.8559195, lng: -111.7988186 },
        title: 'Airport Mesa',
      },
      {
        position: { lat: 34.832149, lng: -111.7695277 },
        title: 'Chapel of the Holy Cross',
      },
      {
        position: { lat: 34.823736, lng: -111.8001857 },
        title: 'Red Rock Crossing',
      },
      {
        position: { lat: 34.800326, lng: -111.7665047 },
        title: 'Bell Rock',
      },
    ];

    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();

    // Create the markers.
    tourStops.forEach(({ position, title }, i) => {
      const pin = new PinElement({
        glyph: `${i + 1}`,
      });

      const marker = new AdvancedMarkerElement({
        position,
        map,
        title: `${i + 1}. ${title}`,
        content: pin.element,
      });

      // Add a click listener for each marker, and set up the info window.
      marker.addListener('click', ({ domEvent, latLng }) => {
        const { target } = domEvent;
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    });
  }

  initMap();

  // Render the map container and placeholders for request and response
  return (
    <div>
      <p>Advanced Marker</p>
      <div id="amap" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export const DistanceMatrix = () => {
  async function initMap() {
    const { DistanceMatrixService } = await google.maps.importLibrary('routes');

    const origin1 = new google.maps.LatLng(55.930385, -3.118425);
    const origin2 = 'Greenwich, England';
    const destinationA = 'Stockholm, Sweden';
    const destinationB = new google.maps.LatLng(50.087692, 14.42115);
    console.log(origin1, 'origin 1');
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          console.log(response);
        } else {
          // handle error
        }
      }
    );
  }

  initMap();

  return (
    <div>
      <p>Distance matrix (see console log)</p>
    </div>
  );
};

/////////////////
export const Places = () => {
  async function initMap(): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { Places } = (await google.maps.importLibrary(
      'places'
    )) as google.maps.MapsLibrary;

    const map = new Map(document.getElementById('map3') as HTMLElement, {
      zoom: 15,
    });

    const request = {
      location: new google.maps.LatLng(51.5194631, -0.10542874882876571),
      type: ['cafe'],
      rankBy: google.maps.places.RankBy.DISTANCE,
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const data = results;
        console.log(data, 'places');
        return data;
      }
    });
  }
  initMap();

  return (
    <>
      <div id="map3" className="hidden"></div>
    </>
  );
};
