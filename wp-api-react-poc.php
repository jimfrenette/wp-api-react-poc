<?php
/**
 * Plugin Name: WP API React Proof of Concept
 * Plugin URL: http://jimfrenette.com/wordpress
 * Description: WordPress plugin to edit posts from the front end using the new REST API and React
 * Version: 1.0
 * Author: Jim Frenette
 * Author URI: http://jimfrenette.com
 * Text Domain: wp-api-react-poc
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

if ( ! class_exists( 'WP_API_React_PoC' ) ) :

/**
 * Main WP_API_React_PoC Class.
 *
 * @class WP_API_React_PoC
 * @version    1.0
 * @dependencies page slug, e.g., "api-test"
 */
final class WP_API_React_PoC {

    /**
     * The single instance of the class.
     *
     * @var WP_API_React_PoC
     * @since 1.0
     */
    protected static $_instance = null;

    /**
     * Main WP_API_React_PoC Instance.
     *
     * Ensures only one instance of WP_API_React_PoC is loaded or can be loaded.
     *
     * @since 1.0
     * @static
     * @see WARP()
     * @return WP_API_React_PoC - Main instance.
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Cloning is forbidden.
     * @since 1.0
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'forbidden', 'wp-api-react-poc' ), '1.0' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     * @since 1.0
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'forbidden', 'wp-api-react-poc' ), '1.0' );
    }

    /**
     * WP_API_React_PoC Constructor.
     */
    public function __construct() {
        $this->define_constants();
        $this->includes();

        do_action( 'wp-api-react-poc_loaded' );
    }

    /**
     * Define WARP Constants.
     */
    private function define_constants() {
        $this->define( 'WARP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
        $this->define( 'WARP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
    }

    /**
     * Define constant if not already set.
     *
     * @param  string $name
     * @param  string|bool $value
     */
    private function define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();
            case 'ajax' :
                return defined( 'DOING_AJAX' );
            case 'cron' :
                return defined( 'DOING_CRON' );
            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

    public function includes() {
        if ( $this->is_request( 'frontend' ) ) {
            include( WARP_PLUGIN_PATH . 'class-api-rpoc-page.php' );
        }
    }

}

endif;

/**
 * Main instance of WP_API_React_PoC.
 *
 * Returns the main instance of WARP to prevent the need to use globals.
 *
 * @since  1.0
 * @return WP_API_React_PoC
 */
function WARP() {
    return WP_API_React_PoC::instance();
}

// Global for backwards compatibility.
$GLOBALS['wp-api-react-poc'] = WARP();
