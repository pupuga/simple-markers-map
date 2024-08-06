<?php  if ( ! defined( 'ABSPATH' ) ) exit; ?>

<div <?php echo wp_kses_post(get_block_wrapper_attributes()); ?>>
	<div id="<?php echo esc_attr(uniqid('simple-marker-map_')) ?>" style="height: <?php echo esc_attr($attributes['height']); ?>px"
         data-layer="<?php echo esc_attr($attributes['layer']); ?>"
         data-markers="<?php echo wp_kses_data(htmlspecialchars(wp_json_encode($attributes['markers']), ENT_QUOTES, 'UTF-8')); ?>"
         data-markerscolor="<?php echo esc_attr($attributes['markersColor']); ?>"
         data-zoom="<?php echo esc_attr($attributes['zoom']); ?>">
    </div>
</div>