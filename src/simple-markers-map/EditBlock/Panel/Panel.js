import { BlockContext, DataContext, InputContext } from '../BlockContext';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	ColorPicker,
	RangeControl,
} from '@wordpress/components';
import Markers from './Markers/Markers';

const Panel = ( props ) => {
	const data = { marker: {} };
	const input = {};

	return (
		<BlockContext.Provider value={ props }>
			<DataContext.Provider value={ data }>
				<InputContext.Provider value={ input }>
					<PanelBody title={ __( 'Markers' ) }>
						<PanelRow>
							<Markers />
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( 'Layer' ) }>
						<PanelRow>
							<RadioControl
								selected={ props?.attributes?.layer }
								options={ LAYERS.map( ( el ) => ( {
									label: el.name,
									value: el.layer,
								} ) ) }
								onChange={ ( value ) => {
									props.setAttributes( {
										...props?.attributes,
										layer: value,
									} );
								} }
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title={ __( 'Map height' ) }>
						<PanelRow>
							<RangeControl
								value={ props?.attributes?.height }
								onChange={ ( value ) => {
									props.setAttributes( {
										...props?.attributes,
										height: value,
									} );
								} }
								step={ 10 }
								min={ 300 }
								max={ 2000 }
							/>
						</PanelRow>
					</PanelBody>
					{ props?.attributes?.markers.length > 1 ? (
						''
					) : (
						<PanelBody title={ __( 'Map zoom' ) }>
							<PanelRow>
								<RangeControl
									value={ props?.attributes?.zoom }
									onChange={ ( value ) => {
										props.setAttributes( {
											...props?.attributes,
											zoom: value,
										} );
									} }
									step={ 1 }
									min={ 2 }
									max={ 18 }
								/>
							</PanelRow>
						</PanelBody>
					) }
					<PanelBody title={ __( 'Color markers' ) }>
						<PanelRow>
							<ColorPicker
								color={ props?.attributes?.markersColor }
								onChange={ ( value ) => {
									props.setAttributes( {
										...props?.attributes,
										markersColor: value,
									} );
								} }
								enableAlpha={ false }
								defaultValue={
									props?.attributes?.markersColor ?? '#006ba1'
								}
							/>
						</PanelRow>
					</PanelBody>
				</InputContext.Provider>
			</DataContext.Provider>
		</BlockContext.Provider>
	);
};

export default Panel;
