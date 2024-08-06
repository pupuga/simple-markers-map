import { Suspense, lazy } from 'react';
let Component = null;
const Panel = ( props ) => {
	if ( Component === null ) {
		Component = lazy( () =>
			import( `../../../${ props.blockName }/EditBlock/Panel/Panel` )
		);
	}

	return (
		<div className="blocks-panel">
			{ Component === null ? (
				''
			) : (
				<Suspense fallback={ <div>Loading...</div> }>
					<Component { ...props } />
				</Suspense>
			) }
		</div>
	);
};

export default Panel;