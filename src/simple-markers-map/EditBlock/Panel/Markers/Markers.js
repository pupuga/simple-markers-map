import { BlockContext, DataContext, InputContext } from '../../BlockContext';
import { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import { Flex, FlexBlock, Button } from '@wordpress/components';
import ModalWindow from '../../../../common/Components/Modal/ModalWindow';
import MarkerForm from './MarkerForm';
import Marker from './Marker';

const Markers = () => {
	const blockContext = useContext( BlockContext );
	const dataContext = useContext( DataContext );
	const inputContext = useContext( InputContext );

	return (
		<Flex direction="column" style={ { width: '100%' } }>
			<FlexBlock>
				<ModalWindow
					externalObject={ dataContext.marker }
					title={ __( 'New marker' ) }
					openButton={
						<Button
							variant="primary"
							text={ __( 'Add new marker' ) }
						/>
					}
					submitTitle={ __( 'Add marker' ) }
					submitDisabled={ true }
					submitCallback={ () => {
						const attributes = JSON.parse(
							JSON.stringify( blockContext.attributes )
						);
						blockContext.setAttributes( {
							...attributes,
							markers: [ ...attributes.markers, inputContext ],
						} );
					} }
				>
					<MarkerForm marker={ { id: Date.now() } } />
				</ModalWindow>
			</FlexBlock>
			{ blockContext.attributes.markers.length === 0 ? (
				''
			) : (
				<FlexBlock>
					<hr />
					{ blockContext.attributes?.markers?.map( ( marker ) => (
						<Marker key={ marker.id } marker={ marker } />
					) ) }
				</FlexBlock>
			) }
		</Flex>
	);
};
export default Markers;
