import { memo } from '@wordpress/element';

const PreviewCard = memo(({
    index,
    card,
    zOffset,
    xOffset,
    yOffset,
    // Interaction props for last card logic
    isLastCard,
    slideHover,
    slideX,
    slideY,
    slideZ,
    // Style props
    cardFaceColor,
    cardBorderColor,
    depthColor1,
    depthColor2,
    // Logo & Text props
    logoSize,
    logoX,
    logoY,
    titleX,
    titleY,
    subtitleX,
    subtitleY,
    fontSize,
    swapTitleSubtitle,
    glassEnabled,
    glassBlur,
    glassOpacity,
    glassSaturation,
    glassBorderOpacity,
}) => {
    // Helper to convert hex to rgb
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    let faceStyle = {
        background: cardFaceColor,
        boxShadow: `0 0 0 1px ${cardBorderColor}`,
    };

    if (glassEnabled) {
        const rgbFace = hexToRgb(cardFaceColor) || { r: 255, g: 255, b: 255 };
        const rgbBorder = hexToRgb(cardBorderColor) || { r: 228, g: 232, b: 236 };

        faceStyle = {
            background: `rgba(${rgbFace.r}, ${rgbFace.g}, ${rgbFace.b}, ${glassOpacity / 100})`,
            boxShadow: `0 0 0 1px rgba(${rgbBorder.r}, ${rgbBorder.g}, ${rgbBorder.b}, ${glassBorderOpacity / 100})`,
            backdropFilter: `blur(${glassBlur}px) saturate(${glassSaturation}%)`,
            WebkitBackdropFilter: `blur(${glassBlur}px) saturate(${glassSaturation}%)`, // Safari support
        };
    }

    // Swap the text content and styling when toggle is enabled
    const displayTitle = swapTitleSubtitle ? card.subtitle : card.title;
    const displaySubtitle = swapTitleSubtitle ? card.title : card.subtitle;
    const titleFontSize = swapTitleSubtitle ? Math.round(fontSize * 0.7) : fontSize;
    const subtitleFontSize = swapTitleSubtitle ? fontSize : Math.round(fontSize * 0.7);
    const titleColor = swapTitleSubtitle ? '#8892a4' : '#1a2744';
    const subtitleColor = swapTitleSubtitle ? '#1a2744' : '#8892a4';
    const zPos = index * zOffset;
    const xPos = index * xOffset;
    const yPos = index * yOffset;

    let finalTransform = `translateZ(${zPos}px) translateX(${xPos}px) translateY(${yPos}px)`;

    if (slideHover && isLastCard) {
        finalTransform = `translateZ(${zPos + slideZ}px) translateX(${xPos + slideX}px) translateY(${yPos + slideY}px)`;
    }

    return (
        <div
            className="cards3d-card"
            style={{
                transform: finalTransform,
            }}
        >
            <div
                className="cards3d-face"
                style={faceStyle}
            />
            <div
                className="cards3d-edge-bottom"
                style={{
                    background: `linear-gradient(to bottom, ${depthColor1}, ${depthColor2})`,
                }}
            />
            <div
                className="cards3d-edge-right"
                style={{
                    background: `linear-gradient(to right, ${depthColor1}, ${depthColor2})`,
                }}
            />
            <div className="cards3d-content">
                <div
                    className="cards3d-logo"
                    style={{
                        width: `${logoSize}px`,
                        height: `${logoSize}px`,
                        left: `${logoX}%`,
                        top: `${logoY}%`,
                    }}
                    dangerouslySetInnerHTML={{ __html: card.svg }}
                />
                <span
                    className="cards3d-title"
                    style={{
                        bottom: `${titleY}px`,
                        left: `${titleX}px`,
                        fontSize: `${titleFontSize}px`,
                        fontWeight: swapTitleSubtitle ? 400 : 600,
                        color: titleColor,
                    }}
                >
                    {displayTitle}
                </span>
                <span
                    className="cards3d-subtitle"
                    style={{
                        bottom: `${subtitleY}%`,
                        right: `${subtitleX}px`,
                        fontSize: `${subtitleFontSize}px`,
                        fontWeight: swapTitleSubtitle ? 600 : 400,
                        color: subtitleColor,
                    }}
                >
                    {displaySubtitle}
                </span>
            </div>
        </div>
    );
});

export default PreviewCard;
