import { Button } from '@wordpress/components';
import { useState } from 'react';

const SubmitButton = ( {
	externalObject,
	submitTitle,
	submitDisabled,
	onSubmit,
} ) => {
	const [ disabledSubmit, setDisabledSubmit ] = useState(
		submitDisabled ?? false
	);
	if ( externalObject !== undefined ) {
		externalObject.setDisabledSubmit = ( value ) =>
			setDisabledSubmit( value );
	}

	const onclick = () => {
		if ( onSubmit !== undefined ) {
			onSubmit();
		}
	};

	return (
		<Button
			disabled={ disabledSubmit }
			variant={ disabledSubmit ? '' : 'primary' }
			text={ submitTitle }
			onClick={ onclick }
		/>
	);
};

export default SubmitButton;
