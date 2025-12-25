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
        'scrollAnimationEnabled' => false,
        'scrollAnimationStagger' => 200,
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
        'orthographicMobile' => null,
        'swapTitleSubtitle' => false,
        'glassEnabled' => false,
        'glassBlur' => 12,
        'glassOpacity' => 20,
        'glassSaturation' => 110,
        'glassBorderOpacity' => 30
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
            --c3d-hor: <?php echo $horD; ?>px;
            --c3d-persp: <?php echo $perspD; ?>;

            /* Interaction Defaults (Desktop) - Base Styles */
            --c3d-hover-lift: <?php echo intval($atts['hoverLift']); ?>px;
            --c3d-stay-hover: <?php echo $atts['stayHover'] ? 1 : 0; ?>;
            --c3d-slide-hover: <?php echo $atts['slideHover'] ? 1 : 0; ?>;
            --c3d-slide-x: <?php echo intval($atts['slideHoverX']); ?>px;
            --c3d-slide-y: <?php echo intval($atts['slideHoverY']); ?>px;
            --c3d-slide-z: <?php echo intval($atts['slideHoverZ']); ?>px;
            --c3d-scroll-animation-enabled: <?php echo $atts['scrollAnimationEnabled'] ? 1 : 0; ?>;
            --c3d-scroll-animation-stagger: <?php echo intval($atts['scrollAnimationStagger']); ?>;
        }
        
        <?php if (
            !is_null($atts['globalScaleTablet']) || 
            !is_null($atts['cameraRotateXTablet']) || 
            !is_null($atts['vertPosTablet']) || 
            !is_null($atts['horPosTablet']) || 
            !is_null($atts['orthographicTablet']) ||
            !is_null($atts['hoverLiftTablet']) ||
            !is_null($atts['stayHoverTablet']) ||
            !is_null($atts['slideHoverTablet']) ||
            !is_null($atts['slideHoverXTablet']) ||
            !is_null($atts['slideHoverYTablet']) ||
            !is_null($atts['slideHoverZTablet'])
        ) : ?>
        @media (max-width: 1024px) {
            #<?php echo $block_id; ?> {
                <?php if (!is_null($atts['globalScaleTablet'])) echo '--c3d-scale: ' . ($atts['globalScaleTablet'] / 100) . ';'; ?>
                <?php if (!is_null($atts['cameraRotateXTablet'])) echo '--c3d-rot-x: ' . $atts['cameraRotateXTablet'] . 'deg;'; ?>
                <?php if (!is_null($atts['vertPosTablet'])) echo '--c3d-vert: ' . $atts['vertPosTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['horPosTablet'])) echo '--c3d-hor: ' . $atts['horPosTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['orthographicTablet'])) echo '--c3d-persp: ' . ($atts['orthographicTablet'] ? 'none' : '1000px') . ';'; ?>
                
                <?php if (!is_null($atts['hoverLiftTablet'])) echo '--c3d-hover-lift: ' . $atts['hoverLiftTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['stayHoverTablet'])) echo '--c3d-stay-hover: ' . ($atts['stayHoverTablet'] ? 1 : 0) . ';'; ?>
                <?php if (!is_null($atts['slideHoverTablet'])) echo '--c3d-slide-hover: ' . ($atts['slideHoverTablet'] ? 1 : 0) . ';'; ?>
                <?php if (!is_null($atts['slideHoverXTablet'])) echo '--c3d-slide-x: ' . $atts['slideHoverXTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['slideHoverYTablet'])) echo '--c3d-slide-y: ' . $atts['slideHoverYTablet'] . 'px;'; ?>
                <?php if (!is_null($atts['slideHoverZTablet'])) echo '--c3d-slide-z: ' . $atts['slideHoverZTablet'] . 'px;'; ?>
            }
        }
        <?php endif; ?>

        <?php if (
            !is_null($atts['globalScaleMobile']) || 
            !is_null($atts['cameraRotateXMobile']) || 
            !is_null($atts['vertPosMobile']) || 
            !is_null($atts['horPosMobile']) || 
            !is_null($atts['orthographicMobile']) ||
            !is_null($atts['hoverLiftMobile']) ||
            !is_null($atts['stayHoverMobile']) ||
            !is_null($atts['slideHoverMobile']) ||
            !is_null($atts['slideHoverXMobile']) ||
            !is_null($atts['slideHoverYMobile']) ||
            !is_null($atts['slideHoverZMobile'])
        ) : ?>
        @media (max-width: 767px) {
            #<?php echo $block_id; ?> {
                <?php if (!is_null($atts['globalScaleMobile'])) echo '--c3d-scale: ' . ($atts['globalScaleMobile'] / 100) . ';'; ?>
                <?php if (!is_null($atts['cameraRotateXMobile'])) echo '--c3d-rot-x: ' . $atts['cameraRotateXMobile'] . 'deg;'; ?>
                <?php if (!is_null($atts['vertPosMobile'])) echo '--c3d-vert: ' . $atts['vertPosMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['horPosMobile'])) echo '--c3d-hor: ' . $atts['horPosMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['orthographicMobile'])) echo '--c3d-persp: ' . ($atts['orthographicMobile'] ? 'none' : '1000px') . ';'; ?>

                <?php if (!is_null($atts['hoverLiftMobile'])) echo '--c3d-hover-lift: ' . $atts['hoverLiftMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['stayHoverMobile'])) echo '--c3d-stay-hover: ' . ($atts['stayHoverMobile'] ? 1 : 0) . ';'; ?>
                <?php if (!is_null($atts['slideHoverMobile'])) echo '--c3d-slide-hover: ' . ($atts['slideHoverMobile'] ? 1 : 0) . ';'; ?>
                <?php if (!is_null($atts['slideHoverXMobile'])) echo '--c3d-slide-x: ' . $atts['slideHoverXMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['slideHoverYMobile'])) echo '--c3d-slide-y: ' . $atts['slideHoverYMobile'] . 'px;'; ?>
                <?php if (!is_null($atts['slideHoverZMobile'])) echo '--c3d-slide-z: ' . $atts['slideHoverZMobile'] . 'px;'; ?>
            }
        }
        <?php endif; ?>
    </style>

    <div id="<?php echo esc_attr($block_id); ?>" class="cards3d-wrapper" style="perspective: var(--c3d-persp); min-height: <?php echo esc_attr($atts['blockHeight']); ?>px;">
        <div class="cards3d-container" style="
            transform: translateX(var(--c3d-hor)) rotateX(var(--c3d-rot-x)) rotateZ(45deg) scale3d(var(--c3d-scale), var(--c3d-scale), var(--c3d-scale));
            margin-bottom: var(--c3d-vert);
            --card-depth: <?php echo esc_attr($atts['cardDepth']); ?>px;
            --shadow-color: <?php echo esc_attr($atts['shadowColor']); ?>;
            --shadow-opacity: <?php echo intval($atts['shadowOpacity']); ?>;
            --shadow-x: <?php echo intval($atts['shadowX']); ?>;
            --shadow-y: <?php echo intval($atts['shadowY']); ?>;
            --shadow-blur: <?php echo intval($atts['shadowBlur']); ?>;
        ">
            <?php foreach ($cards as $index => $card) : 
                $zPos = $index * $atts['zOffset'];
                $xPos = $index * $atts['xOffset'];
                $yPos = $index * $atts['yOffset'];
                
                // Swap title/subtitle text and styling when toggle is enabled
                $displayTitle = $atts['swapTitleSubtitle'] ? $card['subtitle'] : $card['title'];
                $displaySubtitle = $atts['swapTitleSubtitle'] ? $card['title'] : $card['subtitle'];
                $titleFontSize = $atts['swapTitleSubtitle'] ? round($atts['fontSize'] * 0.7) : $atts['fontSize'];
                $subtitleFontSize = $atts['swapTitleSubtitle'] ? $atts['fontSize'] : round($atts['fontSize'] * 0.7);
                $titleFontWeight = $atts['swapTitleSubtitle'] ? 400 : 600;
                $subtitleFontWeight = $atts['swapTitleSubtitle'] ? 600 : 400;
                $titleColor = $atts['swapTitleSubtitle'] ? '#8892a4' : '#1a2744';
                $subtitleColor = $atts['swapTitleSubtitle'] ? '#1a2744' : '#8892a4';
                
                // Determine tag and attributes
                $tagName = 'div';
                $cardAttrs = '';
                
                if (!empty($card['linkUrl'])) {
                    $tagName = 'a';
                    $cardAttrs .= ' href="' . esc_url($card['linkUrl']) . '"';
                    // Open in new tab? Maybe valid to add target blank if external? 
                    // Let's keep simple for now or assume same tab.
                }
                
                if (!empty($card['customEvent'])) {
                    // Dispatch custom event on click
                    $eventName = esc_js($card['customEvent']);
                    $cardAttrs .= ' onclick="window.dispatchEvent(new CustomEvent(\'' . $eventName . '\', { detail: { cardIndex: ' . $index . ' } }));"';
                }

                // Glassmorphism Logic
                $faceStyle = "background: " . esc_attr($atts['cardFaceColor']) . "; box-shadow: 0 0 0 1px " . esc_attr($atts['cardBorderColor']) . ";";
                
                if ($atts['glassEnabled']) {
                    // Helper function for hex to rgb
                    $hex2rgb = function($hex) {
                        $hex = str_replace('#', '', $hex);
                        // Sanitize: allow only hex chars
                        $hex = preg_replace('/[^0-9a-fA-F]/', '', $hex);
                        
                        if (strlen($hex) == 3) {
                            $r = hexdec(substr($hex,0,1).substr($hex,0,1));
                            $g = hexdec(substr($hex,1,1).substr($hex,1,1));
                            $b = hexdec(substr($hex,2,1).substr($hex,2,1));
                        } elseif (strlen($hex) == 6) {
                            $r = hexdec(substr($hex,0,2));
                            $g = hexdec(substr($hex,2,2));
                            $b = hexdec(substr($hex,4,2));
                        } else {
                            // Fallback to white if invalid
                            return array(255, 255, 255);
                        }
                        return array($r, $g, $b);
                    };

                    $rgbFace = $hex2rgb($atts['cardFaceColor']);
                    $rgbBorder = $hex2rgb($atts['cardBorderColor']);
                    $glassOpacity = intval($atts['glassOpacity']) / 100;
                    $glassBorderOpacity = intval($atts['glassBorderOpacity']) / 100;
                    $glassBlur = intval($atts['glassBlur']);
                    $glassSaturation = intval($atts['glassSaturation']);

                    $faceStyle = "background: rgba({$rgbFace[0]}, {$rgbFace[1]}, {$rgbFace[2]}, {$glassOpacity});";
                    $faceStyle .= "box-shadow: 0 0 0 1px rgba({$rgbBorder[0]}, {$rgbBorder[1]}, {$rgbBorder[2]}, {$glassBorderOpacity});";
                    $faceStyle .= "backdrop-filter: blur({$glassBlur}px) saturate({$glassSaturation}%);";
                    $faceStyle .= "-webkit-backdrop-filter: blur({$glassBlur}px) saturate({$glassSaturation}%);"; // Safari support
                }
            ?>
            <<?php echo $tagName; ?> class="cards3d-card cards3d-card-<?php echo $index; ?>" style="
                transform: translateZ(<?php echo $zPos; ?>px) translateX(<?php echo $xPos; ?>px) translateY(<?php echo $yPos; ?>px);
            " data-index="<?php echo $index; ?>" data-hover-lift="<?php echo esc_attr($atts['hoverLift']); ?>"<?php echo $cardAttrs; ?>>
                <div class="cards3d-face" style="<?php echo $faceStyle; ?>"></div>
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
                        font-size: <?php echo esc_attr($titleFontSize); ?>px;
                        font-weight: <?php echo esc_attr($titleFontWeight); ?>;
                        color: <?php echo esc_attr($titleColor); ?>;
                    "><?php echo esc_html($displayTitle); ?></span>
                    <span class="cards3d-subtitle" style="
                        bottom: <?php echo esc_attr($atts['subtitleY']); ?>%;
                        right: <?php echo esc_attr($atts['subtitleX']); ?>px;
                        font-size: <?php echo esc_attr($subtitleFontSize); ?>px;
                        font-weight: <?php echo esc_attr($subtitleFontWeight); ?>;
                        color: <?php echo esc_attr($subtitleColor); ?>;
                    "><?php echo esc_html($displaySubtitle); ?></span>
                </div>
            </<?php echo $tagName; ?>>
            <?php endforeach; ?>
        </div>
    </div>
    
    <script>
    (function() {
        const wrapper = document.getElementById('<?php echo esc_js($block_id); ?>');
        if (!wrapper) return;
        const cards = wrapper.querySelectorAll('.cards3d-card');
        const zOffset = <?php echo intval($atts['zOffset']); ?>;
        const xOffset = <?php echo intval($atts['xOffset']); ?>;
        const yOffset = <?php echo intval($atts['yOffset']); ?>;
        
        // Helper to get computed CSS var value from wrapper
        const getVar = (name) => {
            const val = getComputedStyle(wrapper).getPropertyValue(name).trim();
            // Handle pixels if present (though parseInt handles it)
            return val ? parseInt(val, 10) : 0;
        };
        const getBool = (name) => {
             const val = getComputedStyle(wrapper).getPropertyValue(name).trim();
             return val === '1';
        };

        const scrollAnimationEnabled = getBool('--c3d-scroll-animation-enabled');
        const scrollAnimationStagger = Math.max(0, getVar('--c3d-scroll-animation-stagger'));
        const initialHoverLift = getVar('--c3d-hover-lift');
        const slideHover = getBool('--c3d-slide-hover');
        const slideX = getVar('--c3d-slide-x');
        const slideY = getVar('--c3d-slide-y');
        const slideZ = getVar('--c3d-slide-z');

        cards.forEach((card, index) => {
            const baseZ = index * zOffset;
            const baseX = index * xOffset;
            const baseY = index * yOffset;
            const baseTransform = `translateZ(${baseZ}px) translateX(${baseX}px) translateY(${baseY}px)`;
            
            // Determine active transform based on slideHover setting
            let activeTransform;
            if (slideHover) {
                // Slide effect: use slideZ and add X/Y slide
                activeTransform = `translateZ(${baseZ + slideZ}px) translateX(${baseX + slideX}px) translateY(${baseY + slideY}px)`;
            } else {
                // Standard lift effect
                activeTransform = `translateZ(${baseZ + initialHoverLift}px) translateX(${baseX}px) translateY(${baseY}px)`;
            }
            
            card.dataset.baseTransform = baseTransform;
            card.dataset.activeTransform = activeTransform;
            if (scrollAnimationEnabled) {
                card.style.transform = activeTransform;
            }
        });

        const resetCardsToActive = () => {
            cards.forEach((card) => {
                card.style.transform = card.dataset.activeTransform;
            });
        };

        const animateCardsToBase = () => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = card.dataset.baseTransform;
                }, index * scrollAnimationStagger);
            });
        };

        const observerOptions = { threshold: [0, 1] };
        let intersectionObserver;
        const setupScrollAnimation = () => {
            if (!scrollAnimationEnabled || !cards.length) {
                return;
            }

            intersectionObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                        // Fully in viewport - animate to base
                        animateCardsToBase();
                    } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
                        // Completely out of viewport - reset to active state
                        resetCardsToActive();
                    }
                });
            }, observerOptions);

            intersectionObserver.observe(wrapper);
        };

        setupScrollAnimation();

        // Helper to update all card positions based on active index
        function updatePositions(activeIndex) {
            // Read current responsive values at the moment of interaction
            const hoverLift = getVar('--c3d-hover-lift');
            const slideHover = getBool('--c3d-slide-hover');
            const slideX = getVar('--c3d-slide-x');
            const slideY = getVar('--c3d-slide-y');
            const slideZ = getVar('--c3d-slide-z');

            cards.forEach((card, i) => {
                const baseZ = i * zOffset;
                const baseX = i * xOffset;
                const baseY = i * yOffset;
                
                // If this card is ABOVE the active index, lift it
                if (activeIndex !== -1 && i > activeIndex) {
                    if (slideHover) {
                        // Slide effect: override lift with slideZ and add X/Y slide
                        card.style.transform = `translateZ(${baseZ + slideZ}px) translateX(${baseX + slideX}px) translateY(${baseY + slideY}px)`;
                    } else {
                        // Standard lift effect
                        card.style.transform = `translateZ(${baseZ + hoverLift}px) translateX(${baseX}px) translateY(${baseY}px)`;
                    }
                } else {
                    // Reset to base position
                    card.style.transform = `translateZ(${baseZ}px) translateX(${baseX}px) translateY(${baseY}px)`;
                }
            });
        }

        // Event Delegation: Attach listeners to wrapper instead of each card
        wrapper.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.cards3d-card');
            if (!card) return;
            
            // Get index from the card we entered
            const index = parseInt(card.dataset.index, 10);
            updatePositions(index);
        });

        wrapper.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.cards3d-card');
            if (!card) return;
            
            // Ignore if moving inside the same card
            if (card.contains(e.relatedTarget)) return;

            // Check if stayHover is active for current breakpoint
            const stayHover = getBool('--c3d-stay-hover');
            if (!stayHover) {
                updatePositions(-1); // Reset all
            }
        });
        
    })();
    </script>
    <?php
    return ob_get_clean();
}
