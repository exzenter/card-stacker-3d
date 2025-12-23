<?php
/**
 * Plugin Name: 3D Cards Block
 * Description: A Gutenberg block that displays interactive 3D stacked cards with customizable settings.
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL-2.0-or-later
 * Text Domain: 3d-cards-block
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the block
 */
function cards3d_register_block() {
    register_block_type(__DIR__ . '/build', array(
        'render_callback' => 'cards3d_render_block'
    ));
}
add_action('init', 'cards3d_register_block');

/**
 * Render the block on the frontend
 */
function cards3d_render_block($attributes) {
    // Default values
    $defaults = array(
        'cards' => array(
            array(
                'svg' => '<svg viewBox="0 0 80 80" fill="none"><ellipse cx="32" cy="40" rx="10" ry="14" fill="url(#grad-uxui-1)" transform="rotate(-20 32 40)" style="mix-blend-mode: multiply;"></ellipse><ellipse cx="48" cy="40" rx="10" ry="14" fill="url(#grad-uxui-2)" transform="rotate(20 48 40)" style="mix-blend-mode: multiply;"></ellipse><defs><linearGradient id="grad-uxui-1" x1="22" y1="26" x2="42" y2="54"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#06b6d4"/></linearGradient><linearGradient id="grad-uxui-2" x1="38" y1="26" x2="58" y2="54"><stop stop-color="#f97316"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs></svg>',
                'title' => 'UX/UI',
                'subtitle' => 'Creative Work'
            ),
            array(
                'svg' => '<svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="18" fill="url(#grad-wp)"/><path d="M28 40c0-6.6 5.4-12 12-12s12 5.4 12 12-5.4 12-12 12-12-5.4-12-12z" stroke="#fff" stroke-width="2" fill="none"/><text x="40" y="45" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">W</text><defs><linearGradient id="grad-wp" x1="22" y1="22" x2="58" y2="58"><stop stop-color="#0073aa"/><stop offset="1" stop-color="#00a0d2"/></linearGradient></defs></svg>',
                'title' => 'WordPress',
                'subtitle' => 'CMS Solutions'
            ),
            array(
                'svg' => '<svg viewBox="0 0 80 80" fill="none"><rect x="24" y="28" width="32" height="24" rx="2" fill="url(#grad-web)"/><circle cx="40" cy="56" r="4" fill="#64748b"/><rect x="36" y="52" width="8" height="4" fill="#64748b"/><defs><linearGradient id="grad-web" x1="24" y1="28" x2="56" y2="52"><stop stop-color="#8b5cf6"/><stop offset="1" stop-color="#d946ef"/></linearGradient></defs></svg>',
                'title' => 'Webdesign',
                'subtitle' => 'Creative Agency'
            )
        ),
        'cardDepth' => 12,
        'zOffset' => 60,
        'xOffset' => 0,
        'yOffset' => 0,
        'logoSize' => 100,
        'logoX' => 50,
        'logoY' => 50,
        'titleY' => 16,
        'titleX' => 16,
        'subtitleY' => 100,
        'subtitleX' => 16,
        'fontSize' => 16,
        'hoverLift' => 80,
        'globalScale' => 180,
        'vertPos' => 0,
        'cameraRotateX' => 55,
        'orthographic' => true,
        'cardFaceColor' => '#ffffff',
        'cardBorderColor' => '#e4e8ec',
        'depthColor1' => '#e8eaee',
        'depthColor2' => '#dcdfe3',
        'blockHeight' => 600,
        'horPos' => 0,
        // Tablet defaults (null)
        'globalScaleTablet' => null,
        'vertPosTablet' => null,
        'horPosTablet' => null,
        'cameraRotateXTablet' => null,
        'orthographicTablet' => null,
        // Mobile defaults (null)
        'globalScaleMobile' => null,
        'vertPosMobile' => null,
        'horPosMobile' => null,
        'cameraRotateXMobile' => null,
        'orthographicMobile' => null
    );

    $atts = wp_parse_args($attributes, $defaults);
    $cards = $atts['cards'];
    $cardCount = count($cards);
    
    // Generate unique ID for this block instance
    $block_id = 'cards3d-' . uniqid();
    
    // Helper to resolve value logic: Desktop -> Tablet -> Mobile inheritance is handled via CSS cascade if we output variables for each breakpoint?
    // Actually, simplest is to output the variables in media queries if the value is set.
    
    // Prepare values
    $scaleD = $atts['globalScale'] / 100;
    $rotXD = $atts['cameraRotateX'];
    $vertD = $atts['vertPos'];
    $horD = $atts['horPos'];
    $perspD = $atts['orthographic'] ? 'none' : '1000px';

    ob_start();
    ?>
    <style>
        #<?php echo $block_id; ?> {
            --c3d-scale: <?php echo $scaleD; ?>;
            --c3d-rot-x: <?php echo $rotXD; ?>deg;
            --c3d-vert: <?php echo $vertD; ?>px;
            --c3d-hor: <?php echo $horD; ?>px;
            --c3d-persp: <?php echo $perspD; ?>;
        }
        
        <?php if (
            !is_null($atts['globalScaleTablet']) || 
            !is_null($atts['cameraRotateXTablet']) || 
            !is_null($atts['vertPosTablet']) || 
            !is_null($atts['horPosTablet']) || 
            !is_null($atts['orthographicTablet'])
        ) : ?>
        @media (max-width: 1024px) {
            #<?php echo $block_id; ?> {
                <?php if (!is_null($atts['globalScaleTablet'])) echo '--c3d-scale: ' . ($atts['globalScaleTablet'] / 100) . ';'; ?>
                <?php if (!is_null($atts['cameraRotateXTablet'])) echo '--c3d-rot-x: ' . $atts['cameraRotateXTablet'] . 'deg;'; ?>
                <?php if (!is_null($atts['vertPosTablet'])) echo '--c3d-vert: ' . $atts['vertPosTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['horPosTablet'])) echo '--c3d-hor: ' . $atts['horPosTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['orthographicTablet'])) echo '--c3d-persp: ' . ($atts['orthographicTablet'] ? 'none' : '1000px') . ';'; ?>
            }
        }
        <?php endif; ?>

        <?php if (
            !is_null($atts['globalScaleMobile']) || 
            !is_null($atts['cameraRotateXMobile']) || 
            !is_null($atts['vertPosMobile']) || 
            !is_null($atts['horPosMobile']) || 
            !is_null($atts['orthographicMobile'])
        ) : ?>
        @media (max-width: 767px) {
            #<?php echo $block_id; ?> {
                <?php if (!is_null($atts['globalScaleMobile'])) echo '--c3d-scale: ' . ($atts['globalScaleMobile'] / 100) . ';'; ?>
                <?php if (!is_null($atts['cameraRotateXMobile'])) echo '--c3d-rot-x: ' . $atts['cameraRotateXMobile'] . 'deg;'; ?>
                <?php if (!is_null($atts['vertPosMobile'])) echo '--c3d-vert: ' . $atts['vertPosMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['horPosMobile'])) echo '--c3d-hor: ' . $atts['horPosMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['orthographicMobile'])) echo '--c3d-persp: ' . ($atts['orthographicMobile'] ? 'none' : '1000px') . ';'; ?>
            }
        }
        <?php endif; ?>
    </style>

    <div id="<?php echo esc_attr($block_id); ?>" class="cards3d-wrapper" style="perspective: var(--c3d-persp); min-height: <?php echo esc_attr($atts['blockHeight']); ?>px;">
        <div class="cards3d-container" style="
            transform: translateX(var(--c3d-hor)) rotateX(var(--c3d-rot-x)) rotateZ(45deg) scale3d(var(--c3d-scale), var(--c3d-scale), var(--c3d-scale));
            margin-bottom: var(--c3d-vert);
            --card-depth: <?php echo esc_attr($atts['cardDepth']); ?>px;
        ">
            <?php foreach ($cards as $index => $card) : 
                $zPos = $index * $atts['zOffset'];
                $xPos = $index * $atts['xOffset'];
                $yPos = $index * $atts['yOffset'];
            ?>
            <div class="cards3d-card cards3d-card-<?php echo $index; ?>" style="
                transform: translateZ(<?php echo $zPos; ?>px) translateX(<?php echo $xPos; ?>px) translateY(<?php echo $yPos; ?>px);
            " data-index="<?php echo $index; ?>" data-hover-lift="<?php echo esc_attr($atts['hoverLift']); ?>">
                <div class="cards3d-face" style="
                    background: <?php echo esc_attr($atts['cardFaceColor']); ?>;
                    box-shadow: 0 0 0 1px <?php echo esc_attr($atts['cardBorderColor']); ?>;
                "></div>
                <div class="cards3d-edge-bottom" style="
                    background: linear-gradient(to bottom, <?php echo esc_attr($atts['depthColor1']); ?>, <?php echo esc_attr($atts['depthColor2']); ?>);
                "></div>
                <div class="cards3d-edge-right" style="
                    background: linear-gradient(to right, <?php echo esc_attr($atts['depthColor1']); ?>, <?php echo esc_attr($atts['depthColor2']); ?>);
                "></div>
                <div class="cards3d-content">
                    <div class="cards3d-logo" style="
                        width: <?php echo esc_attr($atts['logoSize']); ?>px;
                        height: <?php echo esc_attr($atts['logoSize']); ?>px;
                        left: <?php echo esc_attr($atts['logoX']); ?>%;
                        top: <?php echo esc_attr($atts['logoY']); ?>%;
                    ">
                        <?php echo $card['svg']; ?>
                    </div>
                    <span class="cards3d-title" style="
                        bottom: <?php echo esc_attr($atts['titleY']); ?>px;
                        left: <?php echo esc_attr($atts['titleX']); ?>px;
                        font-size: <?php echo esc_attr($atts['fontSize']); ?>px;
                    "><?php echo esc_html($card['title']); ?></span>
                    <span class="cards3d-subtitle" style="
                        bottom: <?php echo esc_attr($atts['subtitleY']); ?>%;
                        right: <?php echo esc_attr($atts['subtitleX']); ?>px;
                        font-size: <?php echo round($atts['fontSize'] * 0.7); ?>px;
                    "><?php echo esc_html($card['subtitle']); ?></span>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <script>
    (function() {
        const wrapper = document.getElementById('<?php echo esc_js($block_id); ?>');
        const cards = wrapper.querySelectorAll('.cards3d-card');
        const hoverLift = <?php echo intval($atts['hoverLift']); ?>;
        const zOffset = <?php echo intval($atts['zOffset']); ?>;
        const xOffset = <?php echo intval($atts['xOffset']); ?>;
        const yOffset = <?php echo intval($atts['yOffset']); ?>;
        
        cards.forEach((card, index) => {
            if (index < cards.length - 1) {
                card.addEventListener('mouseenter', () => {
                    for (let i = index + 1; i < cards.length; i++) {
                        const targetCard = cards[i];
                        const baseZ = i * zOffset;
                        const xPos = i * xOffset;
                        const yPos = i * yOffset;
                        targetCard.style.transform = `translateZ(${baseZ + hoverLift}px) translateX(${xPos}px) translateY(${yPos}px)`;
                    }
                });
                card.addEventListener('mouseleave', () => {
                    for (let i = index + 1; i < cards.length; i++) {
                        const targetCard = cards[i];
                        const baseZ = i * zOffset;
                        const xPos = i * xOffset;
                        const yPos = i * yOffset;
                        targetCard.style.transform = `translateZ(${baseZ}px) translateX(${xPos}px) translateY(${yPos}px)`;
                    }
                });
            }
        });
    })();
    </script>
    <?php
    return ob_get_clean();
}
