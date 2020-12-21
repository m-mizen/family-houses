import { FunctionComponent, useState, useRef, useEffect, useContext } from "react";
import { GoogleMapsContext, LocationsFilteredContext } from "../../context";
import { ActiveLocationContext } from "../../context";

import { MapContainer } from './Map.styles';

export const Map: FunctionComponent<{}> = () => {

    const googleMapsContext = useContext(GoogleMapsContext);
    const { filteredLocations } = useContext(LocationsFilteredContext) || {};
    const { activeLocation, setActiveLocation } = useContext(ActiveLocationContext) || {};

    const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
    const [markers, setMarkers] = useState<google.maps.Marker[] | undefined>(undefined);

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current || !googleMapsContext?.loaded) {
            return;
        }
        setMap(new google.maps.Map(mapRef.current, {
            mapId: process.env.REACT_APP_MAP_ID,
            center: { lat: -33, lng: 151 },
            zoom: 8,
            zoomControl: false,
        } as google.maps.MapOptions));
    }, [googleMapsContext, mapRef, setMap])

    useEffect(() => {
        if (!map) {
            return;
        }
        if (markers && filteredLocations && markers.length === filteredLocations.length) {
            return;
        }

        markers?.forEach(marker => {
            marker.setMap(null);
        });

        const newMarkers = filteredLocations?.map((location) => {
            const { lat, lng } = location;
            return new google.maps.Marker({
                position: {
                    lat, lng
                },
                map,
            });
        });

        setMarkers(newMarkers);
    }, [map, filteredLocations, setMarkers, markers]);


    useEffect(() => {
        if (!markers || !map || !setActiveLocation || !filteredLocations) {
            return
        }

        const bounds = new google.maps.LatLngBounds();

        if (markers?.length > 0) {
            markers.forEach(marker => {
                const position = marker.getPosition();
                if (!position) {
                    return;
                }
                bounds.extend(position);
            });
            map.fitBounds(bounds);
            map.setZoom(Math.min(map.getZoom() - 1, 15));
        } else {
            map.setZoom(8);
            map.panTo({
                lat: 51.51403184993422,
                lng: -0.1270110922311092
            });
        }

        markers.forEach((marker, index) => {
            marker.addListener('click', (e) => {
                if (filteredLocations) {
                    console.log(filteredLocations[index]);
                };
                setActiveLocation && setActiveLocation(filteredLocations[index].id);
            })
        });

        return () => {
            markers?.forEach((marker) => {
                google.maps.event.clearInstanceListeners(marker);
            });
        };
    }, [map, markers, filteredLocations, setActiveLocation]);


    useEffect(() => {
        if (!filteredLocations || !map || typeof activeLocation === 'undefined' || !markers) {
            return;
        }

        const index = filteredLocations.findIndex(location => location.id === activeLocation);

        if (typeof index === 'undefined') {
            return;
        }

        const marker = markers[index];
        const position = marker.getPosition() as google.maps.LatLng;

        if (position) {
            map.panTo(position);
            if (map.getZoom() < 12) {
                map.setZoom(12)
            }
        }

    }, [map, activeLocation, markers, filteredLocations]);

    return <MapContainer ref={mapRef} />;
}

