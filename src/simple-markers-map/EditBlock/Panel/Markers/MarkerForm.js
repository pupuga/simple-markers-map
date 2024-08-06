import { InputContext } from '../../BlockContext';
import { useContext } from 'react';
import { Flex, FlexBlock } from '@wordpress/components';
import FieldSelectMarker from './FieldSelectMarker';
import FieldTitle from './FieldTitle';
import FieldDescription from './FieldDescription';

let newMarker = null;
const MarkerForm = ( { marker } ) => {
	const inputContext = useContext( InputContext );
	inputContext.id = marker.id;

	return (
		<Flex className="blocks-form" direction="column">
			<FlexBlock>
				<FieldSelectMarker marker={ marker } />
			</FlexBlock>
			<FlexBlock>
				<FieldTitle marker={ marker } />
			</FlexBlock>
			<FlexBlock>
				<FieldDescription marker={ marker } />
			</FlexBlock>
		</Flex>
	);
};
export default MarkerForm;
