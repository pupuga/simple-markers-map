import { useState } from 'react';
import { Button, Flex, FlexItem, Modal } from '@wordpress/components';
import SubmitButton from './SubmitButton';
import { __ } from '@wordpress/i18n';

const ModalWindow = ( {
	externalObject,
	title,
	openButton,
	openCallback,
	submitTitle,
	submitCallback,
	submitDisabled,
	...props
} ) => {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => {
		if ( openCallback !== undefined ) {
			openCallback();
		}
		setOpen( true );
	};

	const closeModal = () => {
		setOpen( false );
	};

	const onSubmit = () => {
		if ( submitCallback() !== undefined ) {
			submitCallback();
		}
		setOpen( false );
	};

	return (
		<>
			{ {
				...openButton,
				props: { ...openButton.props, onClick: openModal },
			} }
			{ isOpen && (
				<Modal
					size="medium"
					title={ title }
					onRequestClose={ closeModal }
				>
					{ props.children }
					<Flex style={ { marginTop: '3rem' } }>
						<FlexItem>
							<Button
								variant="secondary"
								text={ __( 'Cancel' ) }
								onClick={ closeModal }
							/>
						</FlexItem>
						<FlexItem>
							<SubmitButton
								externalObject={ externalObject }
								submitTitle={ submitTitle }
								submitDisabled={ submitDisabled ?? false }
								onSubmit={ onSubmit }
							/>
						</FlexItem>
					</Flex>
				</Modal>
			) }
		</>
	);
};
export default ModalWindow;
