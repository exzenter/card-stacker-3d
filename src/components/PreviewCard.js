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
}) => {
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
                style={{
                    background: cardFaceColor,
                    boxShadow: `0 0 0 1px ${cardBorderColor}`,
                }}
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
                        fontSize: `${fontSize}px`,
                    }}
                >
                    {card.title}
                </span>
                <span
                    className="cards3d-subtitle"
                    style={{
                        bottom: `${subtitleY}%`,
                        right: `${subtitleX}px`,
                        fontSize: `${Math.round(fontSize * 0.7)}px`,
                    }}
                >
                    {card.subtitle}
                </span>
            </div>
        </div>
    );
});

export default PreviewCard;
