<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * WP_API_React_PoC_Page class.
 */
class WP_API_React_PoC_Page {

    /**
     * Access
     */
    private static $user_can = 'edit_posts';
    private static $page_slug = 'api-react';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'page_scripts' ) );
        add_filter( 'the_content', array( $this, 'page_content' ) );
    }

    public function page_scripts() {
        if ( is_page( self::$page_slug ) ) {
            // load the React app w/ wp-element React dependency
            wp_enqueue_script( 'wp-api-react-poc', WARP_PLUGIN_URL . 'build/index.js', ['wp-element'], false, true );

            // localize data for script
            wp_localize_script( 'wp-api-react-poc', 'wp_api_react_poc', array(
                'rest_url' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'success' => __( 'Post submitted', 'wp-api-react-poc' ),
                'failure' => __( 'Post could not be processed.', 'wp-api-react-poc' ),
                'current_user_id' => get_current_user_id()
                )
            );
        }
    }

    public function page_content($content) {
        if ( is_page( self::$page_slug ) ) {
            // output only to logged in users who can edit posts
            if ( is_user_logged_in() && current_user_can( self::$user_can ) ) {
                ob_start();?>
                <div id="react-app"></div>
                <?php
                $content .= ob_get_clean();
            }else{
                $content .=  sprintf( '<a href="%1s">%2s</a>', esc_url( wp_login_url() ), __( 'Log in', 'wp-api-react-poc' ) );
            }
        }

        return $content;
    }

}

return new WP_API_React_PoC_Page();
