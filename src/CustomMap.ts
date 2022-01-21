export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    const mapDiv = document.getElementById(divId);
    const mapOptions = {
      backgroundColor: '#AADAFF',
      zoom: 3,
      center: {
        lat: 0,
        lng: 0,
      },
    };

    this.googleMap = new google.maps.Map(mapDiv, mapOptions);
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lng: mappable.location.lng,
        lat: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
        maxWidth: 500,
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
