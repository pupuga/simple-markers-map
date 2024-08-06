import Markers from './Markers';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const Redactor = ( { attributes } ) => {
	const mapRef = useRef( null );

	const handleMouseUp = () => {
		mapRef.current.dragging.disable();
		if ( mapRef.current.dragging._enabled === false ) {
			mapRef.current.dragging.enable();
		}
	};

	useEffect( () => {
		mapRef?.current?.addEventListener( 'mouseup', handleMouseUp );

		return () => {
			mapRef?.current?.removeEventListener( 'mouseup', handleMouseUp );
		};
	}, [ mapRef?.current?.dragging ] );

	useEffect( () => {
		if ( attributes.markers.length <= 1 ) {
			mapRef?.current?.setView(
				attributes.markers[ 0 ].position,
				attributes?.zoom
			);
		}
		mapRef?.current?.invalidateSize();
	}, [ attributes ] );

	return (
		<div style={ { width: '100%', height: `${ attributes.height }px` } }>
			<MapContainer
				ref={ mapRef }
				center={
					attributes?.markers[ 0 ]?.position === undefined
						? [ 50.4500336, 30.5241361 ]
						: attributes.markers[ 0 ].position
				}
				zoom={ attributes?.zoom }
				scrollWheelZoom={ false }
				style={ { width: '100%', height: '100%' } }
			>
				<TileLayer
					url={
						LAYERS.filter(
							( el ) => el.layer === attributes.layer
						)[ 0 ].url
					}
					attribution={
						LAYERS.filter(
							( el ) => el.layer === attributes.layer
						)[ 0 ].name
					}
				/>
				{ attributes.markers.length === 0 ? (
					''
				) : (
					<Markers attributes={ attributes } mapRef={ mapRef } />
				) }
			</MapContainer>
		</div>
	);
};

export default Redactor;
