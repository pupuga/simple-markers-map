import { InputContext } from '../../BlockContext';
import { useContext } from 'react';
import { TextAreaField } from '../../../../common/Components/Fields/TextAreaField';
import { __ } from '@wordpress/i18n';

const FieldDescription = ( { marker } ) => {
	const inputContext = useContext( InputContext );

	return (
		<TextAreaField
			title={ __( 'Description' ) }
			defaultValue={ marker?.description ?? '' }
			onChangeCallback={ ( value ) => {
				inputContext.description = value;
			} }
		/>
	);
};

export default FieldDescription;
