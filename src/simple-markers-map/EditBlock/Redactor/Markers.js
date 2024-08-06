import { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

const getIcon = ( color ) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="${ color }" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>`;
	return L.icon( {
		iconUrl: 'data:image/svg+xml;base64,' + btoa( svg ),
		iconSize: [ 44, 44 ],
		shadowSize: [ 0, 0 ],
		iconAnchor: [ 15, 28 ],
		popupAnchor: [ -18, -24 ],
	} );
};

const Markers = ( { attributes } ) => {
	const map = useMap();

	useEffect( () => {
		if ( map && attributes.markers.length > 1 ) {
			const bounds = attributes.markers.map(
				( marker ) => marker.position
			);
			map.fitBounds( bounds, { padding: [ 50, 50 ] } );
		}
	}, [ map, attributes ] );

	return (
		<>
			{ attributes.markers.map( ( marker, index ) => (
				<Marker
					key={ index }
					position={ marker.position }
					icon={ getIcon( attributes.markersColor ) }
				>
					<Popup>
						{ marker?.title ? (
							<div>
								<strong>{ marker.title }</strong>
							</div>
						) : (
							''
						) }
						{ marker?.description ? (
							<div>{ marker.description }</div>
						) : (
							''
						) }
					</Popup>
				</Marker>
			) ) }
		</>
	);
};

export default Markers;
