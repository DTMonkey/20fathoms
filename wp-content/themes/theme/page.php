<?php

// /**
//  * The template for displaying all pages.
//  *
//  * This is the template that displays all pages by default.
//  * Please note that this is the WordPress construct of pages
//  * and that other 'pages' on your WordPress site will use a
//  * different template.
//  *
//  * To generate specific templates for your pages you can use:
//  * /mytheme/views/page-mypage.twig
//  * (which will still route through this PHP file)
//  * OR
//  * /mytheme/page-mypage.php
//  * (in which case you'll want to duplicate this file and save to the above path)
//  *
//  * Methods for TimberHelper can be found in the /lib sub-directory
//  *
//  * @package  WordPress
//  * @subpackage  Timber
//  * @since    Timber 0.1
//  */
// $context = Timber::get_context();
// $post = new TimberPost();
// $context['post'] = $post;
// $context['header_class'] = $post->post_name;
//
// //Some conditionals override this var to set a new render array
// $render = array( 'page-' . $post->post_name . '.twig', 'page.twig' );
//
// if($post->post_name == 'history') {
// 	$render = array( 'timeline.twig' );
// }
//
// Timber::render($render, $context );
$context = Timber::get_context();
$post = new TimberPost();

if($post->post_name == 'cart' || $post->post_name == 'my-account' || $post->post_name == 'checkout') {
  
  $context['post'] = $post;
  $context['header_class'] = $post->post_name;
  
  Timber::render( array( 'woocommerce/shortcode-page.twig' ), $context );
} else {
  Timber::render( array( 'pages/page-builder.twig', 'pages/page.twig' ), $context );
}

