import { DataContext, InputContext } from '../../BlockContext';
import { useContext, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Flex, FlexBlock } from '@wordpress/components';

let timer;
function FieldSelectMarker( { marker } ) {
	const dataContext = useContext( DataContext );
	const inputContext = useContext( InputContext );

	const [ position, setPosition ] = useState( marker?.position );

	useEffect( () => {
		inputContext.position = position;
	}, [] );

	const loadOptions = ( value, callback ) => {
		value = encodeURIComponent( value.trim() );
		fetch(
			`https://nominatim.openstreetmap.org/search?q=${ value }&format=json`
		)
			.then( ( response ) => response.json() )
			.then( ( data ) =>
				callback(
					data.map( ( result ) => ( {
						label: result.display_name,
						lat: result.lat,
						lon: result.lon,
					} ) )
				)
			);
	};

	const getOptions = ( value, callback ) => {
		clearTimeout( timer );
		timer = setTimeout( () => {
			loadOptions( value, callback );
		}, 500 );
	};

	const onChange = ( value ) => {
		const position = [ value.lat, value.lon ];
		setPosition( position );
		inputContext.position = position;
		if ( dataContext?.marker?.setDisabledSubmit !== undefined ) {
			dataContext.marker.setDisabledSubmit( false );
		}
		dataContext.marker.setTitle( value.label );
	};

	return (
		<div className="select-autocomplete">
			<AsyncSelect
				placeholder="Type a location..."
				cacheOptions={ false }
				defaultOptions={ true }
				loadOptions={ getOptions }
				onChange={ onChange }
			/>
			<Flex style={ { margin: '0.5rem 0' } }>
				<FlexBlock>
					<strong>Latitude</strong>:&nbsp;
					{ position ? position[ 0 ] : '' }
				</FlexBlock>
				<FlexBlock>
					<strong>Longitude</strong>:&nbsp;
					{ position ? position[ 1 ] : '' }
				</FlexBlock>
			</Flex>
			<hr />
		</div>
	);
}
export default FieldSelectMarker;
