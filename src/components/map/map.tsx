import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Marker, layerGroup } from 'leaflet';
import { DEFAULT_CUSTOM_ICON, CURRENT_CUSTOM_ICON } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../types/offer';
import { useMap } from '../../hooks/use-map';
import { OfferApi } from '../../mocks/offers-api';

type MapProps = {
  city: Location;
  points: OfferApi[];
  selectedPoint?: OfferApi | undefined;
};

function Map({city, points, selectedPoint}: MapProps): JSX.Element {
  const location = useLocation();
  const pathNames = location.pathname.split('/');
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.scrollWheelZoom.disable();
      map.on('click', (): void => {
        if (map.scrollWheelZoom.disable()) {
          map.scrollWheelZoom.enable();
        }
      });
      map.on('mouseout', (): void => {
        map.scrollWheelZoom.disable();
      });
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? CURRENT_CUSTOM_ICON
              : DEFAULT_CUSTOM_ICON
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  useEffect(() => {
    const {latitude, longitude, zoom} = city;
    map?.setView([latitude, longitude], zoom);
  }, [city, map]);

  return (
    <section className={pathNames.includes('offer') ? 'offer__map map' : 'cities__map map'}
      ref={mapRef}
    >
    </section>
  );
}

export { Map };
