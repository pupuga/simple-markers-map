import { BlockContext, InputContext } from '../../BlockContext';
import { Button, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import ModalWindow from '../../../../common/Components/Modal/ModalWindow';
import { __ } from '@wordpress/i18n';
import MarkerForm from './MarkerForm';
import { useContext } from 'react';

const Marker = ( { marker } ) => {
	const blockContext = useContext( BlockContext );
	const inputContext = useContext( InputContext );

	return (
		<Flex style={ { width: '100%' } }>
			<FlexBlock>{ marker.title }</FlexBlock>
			<FlexItem style={ { maxWidth: '70px' } }>
				<Flex gap={ 0 }>
					<FlexItem>
						<ModalWindow
							title={ __( 'Edit marker' ) }
							openButton={ <Button icon="edit" /> }
							submitTitle={ __( 'Save changes' ) }
							submitCallback={ () => {
								const attributes = JSON.parse(
									JSON.stringify( blockContext.attributes )
								);
								attributes.markers = attributes.markers.filter(
									( el ) => el.id !== marker.id
								);
								blockContext.setAttributes( {
									...attributes,
									markers: [
										...attributes.markers,
										inputContext,
									],
								} );
							} }
						>
							<MarkerForm marker={ marker } />
						</ModalWindow>
					</FlexItem>
					<FlexItem>
						<ModalWindow
							title={ __( 'Delete marker' ) }
							openButton={
								<Button
									style={ { color: 'red' } }
									icon="dismiss"
								/>
							}
							submitTitle={ __( 'Delete marker' ) }
							submitCallback={ () => {
								const attributes = JSON.parse(
									JSON.stringify( blockContext.attributes )
								);
								attributes.markers = attributes.markers.filter(
									( el ) => el.id !== marker.id
								);
								blockContext.setAttributes( attributes );
							} }
						>
							<h1>Do you want to delete the marker?</h1>
						</ModalWindow>
					</FlexItem>
				</Flex>
			</FlexItem>
		</Flex>
	);
};

export default Marker;
