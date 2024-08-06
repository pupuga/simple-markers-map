document.addEventListener("DOMContentLoaded", function () {

    const maps = document.querySelectorAll('[id^="simple-marker-map_"]');

    if (maps.length > 0) {

        maps.forEach(mapData => {

            const layer = LAYERS.filter(layer => layer.layer === mapData.dataset.layer)[0];

            const markers = JSON.parse(mapData.dataset.markers);

            const map = L.map(mapData.id, {
				fullscreenControl: true,
				fullscreenControlOptions: {
					position: 'topleft'
				}
			})
			.setView(
				markers[0]?.position === undefined ? [50.4500336, 30.5241361] : markers[0].position,
				mapData.dataset.zoom
			);

            L.tileLayer(layer.url, {
                attribution: `&copy; ${layer.name}`
            }).addTo(map);

            if (markers.length > 1) {
                map.fitBounds(markers.map(marker => marker.position), {padding: [50, 50]});
            }

            const mapIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                    <path
                        fill="${mapData.dataset.markerscolor}"
                        d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                    />
                </svg>
            `;
            const markerIcon = L.icon({
                iconUrl: 'data:image/svg+xml;base64,' + btoa(mapIcon),
                iconSize: [44, 44],
                shadowSize: [0, 0],
                iconAnchor: [15, 28],
                popupAnchor: [0, -24]
            });

            if (markers.length > 0) {
                markers.map(marker => {
                    L.marker(marker.position, {icon: markerIcon})
                        .addTo(map)
                        .bindPopup(`<div><strong>${marker?.title}</strong></div><div>${marker?.description}</div>`)
                })
            }
        });
    }
});
