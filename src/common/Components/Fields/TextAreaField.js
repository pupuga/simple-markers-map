import { TextareaControl } from '@wordpress/components';
import { useEffect, useState } from 'react';

export const TextAreaField = ( { title, defaultValue, onChangeCallback } ) => {
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
			<TextareaControl
				style={ { marginTop: '2px' } }
				className="blocks-form-text"
				value={ value }
				onChange={ ( value ) => {
					setValue( value );
					if ( onChangeCallback !== undefined ) {
						onChange( value );
					}
				} }
			/>
		</>
	);
};
