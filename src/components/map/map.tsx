import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer, Location } from '../../types/offer';
import { useMap } from "../../hooks/use-map";

type MapProps = {
  city: Location;
  points: Offer[];
  selectedPoint?: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

function Map({city, points, selectedPoint}: MapProps): JSX.Element {
  const location = useLocation();
  const pathNames =location.pathname.split('/');
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={pathNames.includes('offer') ? 'offer__map map' : 'cities__map map'}
    ref={mapRef} >

    </section>
  );
}

export { Map };
