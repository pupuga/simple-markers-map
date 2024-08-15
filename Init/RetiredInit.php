<?php

namespace SimpleBlocks\Init;

if ( ! defined( 'ABSPATH' ) ) exit;

final class RetiredInit
{
    public static $instance = null;

	private array $blocks = [
	    'simple-markers-map'
	];

    public static function app(): self
    {
        return self::$instance = is_null(self::$instance) ? new self() : self::$instance;
    }

    private function __construct()
    {
        foreach ($this->blocks as $block) {
            $this->blockRegistration($block);
        }
    }

    private function blockRegistration(string $block): void
    {
        register_block_type( plugin_dir_path(__DIR__ ) . '/build/'. $block );
    }
}
