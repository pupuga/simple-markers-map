<?php

/**
 * Plugin Name:       Simple markers map
 * Description:       The plugin helps you simply create a map with markers
 * Requires at least: 6.6.1
 * Requires PHP:      8.0
 * Version:           1.2.0
 * Author:            Alex Shandor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-markers-map
 *
 * @package CreateBlock
 */


if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
} else {
	add_action('init', function () {
		require_once __DIR__ . "/vendor/autoload.php";
		if (intval(phpversion()[0]) >= 8) {
			SimpleBlocks\Init\Init::app();
		} else {
			SimpleBlocks\Init\RetiredInit::app();
		}
	}, 10000);
}
