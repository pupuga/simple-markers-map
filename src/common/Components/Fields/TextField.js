import { TextControl } from '@wordpress/components';
import { useEffect, useState } from 'react';

export const TextField = ( { title, defaultValue, onChangeCallback } ) => {
	const [ value, setValue ] = useState( defaultValue );

	const onChange = ( value ) => {
		if ( onChangeCallback !== undefined ) {
			onChangeCallback( value );
		}
		setValue( value );
	};

	useEffect( () => {
		onChange( defaultValue );
	}, [ defaultValue ] );

	return (
		<>
			{ title === undefined ? '' : <strong>{ title }</strong> }
			<TextControl
				style={ { marginTop: '2px' } }
				className="blocks-form-text"
				value={ value }
				onChange={ ( value ) => {
					onChange( value );
				} }
			/>
		</>
	);
};

export default TextField;
