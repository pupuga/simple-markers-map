import { DataContext, InputContext } from '../../BlockContext';
import { __ } from '@wordpress/i18n';
import { TextField } from '../../../../common/Components/Fields/Fields';
import { useContext, useState } from 'react';

const FieldTitle = ( { marker } ) => {
	const dataContext = useContext( DataContext );
	const inputContext = useContext( InputContext );

	const [ title, setTitle ] = useState( marker?.title ?? '' );
	dataContext.marker.setTitle = ( value ) => setTitle( value );

	return (
		<TextField
			title={ __( 'Marker Title' ) }
			defaultValue={ title }
			onChangeCallback={ ( value ) => {
				inputContext.title = value;
			} }
		/>
	);
};

export default FieldTitle;
