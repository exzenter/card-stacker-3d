import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Button,
    ButtonGroup,
    ColorPicker,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import CardEditor from './components/CardEditor';

export default function Edit({ attributes, setAttributes }) {
    const {
        cards,
        cardDepth,
        zOffset,
        xOffset,
        yOffset,
        logoSize,
        logoX,
        logoY,
        titleY,
        titleX,
        subtitleY,
        subtitleX,
        fontSize,
        hoverLift,
        globalScale,
        vertPos,
        cameraRotateX,
        orthographic,
        cardFaceColor,
        cardBorderColor,
        depthColor1,
        depthColor2,
        blockHeight,
    } = attributes;

    const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);
    const scaleTransform = globalScale / 100;

    const blockProps = useBlockProps({
        className: 'cards3d-editor-wrapper',
    });

    return (
        <>
            <InspectorControls>
                {/* Card Editor Button */}
                <PanelBody title={__('Karten verwalten', '3d-cards-block')} initialOpen={true}>
                    <VStack spacing={3}>
                        <p>{cards.length} {cards.length === 1 ? 'Karte' : 'Karten'} konfiguriert</p>
                        <Button
                            variant="primary"
                            onClick={() => setIsCardEditorOpen(true)}
                            style={{ width: '100%' }}
                        >
                            {__('Karten bearbeiten', '3d-cards-block')}
                        </Button>
                    </VStack>
                </PanelBody>

                {/* Transform Settings */}
                <PanelBody title={__('3D Einstellungen', '3d-cards-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Kartendicke', '3d-cards-block')}
                        value={cardDepth}
                        onChange={(value) => setAttributes({ cardDepth: value })}
                        min={0}
                        max={30}
                    />
                    <RangeControl
                        label={__('Z-Abstand', '3d-cards-block')}
                        value={zOffset}
                        onChange={(value) => setAttributes({ zOffset: value })}
                        min={20}
                        max={150}
                    />
                    <RangeControl
                        label={__('X-Verschiebung', '3d-cards-block')}
                        value={xOffset}
                        onChange={(value) => setAttributes({ xOffset: value })}
                        min={-100}
                        max={100}
                    />
                    <RangeControl
                        label={__('Y-Verschiebung', '3d-cards-block')}
                        value={yOffset}
                        onChange={(value) => setAttributes({ yOffset: value })}
                        min={-100}
                        max={100}
                    />
                    <RangeControl
                        label={__('Hover Lift', '3d-cards-block')}
                        value={hoverLift}
                        onChange={(value) => setAttributes({ hoverLift: value })}
                        min={20}
                        max={200}
                    />
                </PanelBody>

                {/* View Settings */}
                <PanelBody title={__('Ansicht', '3d-cards-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Gesamt-Skalierung (%)', '3d-cards-block')}
                        value={globalScale}
                        onChange={(value) => setAttributes({ globalScale: value })}
                        min={50}
                        max={350}
                    />
                    <RangeControl
                        label={__('Block-Höhe (px)', '3d-cards-block')}
                        value={blockHeight}
                        onChange={(value) => setAttributes({ blockHeight: value })}
                        min={200}
                        max={1200}
                    />
                    <RangeControl
                        label={__('Vertikale Position', '3d-cards-block')}
                        value={vertPos}
                        onChange={(value) => setAttributes({ vertPos: value })}
                        min={-300}
                        max={300}
                    />
                    <HStack spacing={2} style={{ marginBottom: '16px' }}>
                        <span>{__('Kamera-Neigung:', '3d-cards-block')} {cameraRotateX}°</span>
                    </HStack>
                    <ButtonGroup style={{ marginBottom: '16px' }}>
                        <Button
                            variant="secondary"
                            onClick={() => setAttributes({ cameraRotateX: Math.max(0, cameraRotateX - 5) })}
                        >
                            ▼ -5°
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setAttributes({ cameraRotateX: Math.min(90, cameraRotateX + 5) })}
                        >
                            ▲ +5°
                        </Button>
                    </ButtonGroup>
                    <ToggleControl
                        label={__('Orthografische Ansicht', '3d-cards-block')}
                        checked={orthographic}
                        onChange={(value) => setAttributes({ orthographic: value })}
                    />
                </PanelBody>

                {/* Logo Settings */}
                <PanelBody title={__('Logo Einstellungen', '3d-cards-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Logo-Größe', '3d-cards-block')}
                        value={logoSize}
                        onChange={(value) => setAttributes({ logoSize: value })}
                        min={20}
                        max={300}
                    />
                    <RangeControl
                        label={__('Logo X-Position (%)', '3d-cards-block')}
                        value={logoX}
                        onChange={(value) => setAttributes({ logoX: value })}
                        min={0}
                        max={100}
                    />
                    <RangeControl
                        label={__('Logo Y-Position (%)', '3d-cards-block')}
                        value={logoY}
                        onChange={(value) => setAttributes({ logoY: value })}
                        min={0}
                        max={100}
                    />
                </PanelBody>

                {/* Text Settings */}
                <PanelBody title={__('Text Einstellungen', '3d-cards-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Schriftgröße', '3d-cards-block')}
                        value={fontSize}
                        onChange={(value) => setAttributes({ fontSize: value })}
                        min={8}
                        max={32}
                    />
                    <RangeControl
                        label={__('Titel Y-Position', '3d-cards-block')}
                        value={titleY}
                        onChange={(value) => setAttributes({ titleY: value })}
                        min={8}
                        max={100}
                    />
                    <RangeControl
                        label={__('Titel X-Position', '3d-cards-block')}
                        value={titleX}
                        onChange={(value) => setAttributes({ titleX: value })}
                        min={8}
                        max={200}
                    />
                    <RangeControl
                        label={__('Untertitel Y-Position (%)', '3d-cards-block')}
                        value={subtitleY}
                        onChange={(value) => setAttributes({ subtitleY: value })}
                        min={0}
                        max={200}
                    />
                    <RangeControl
                        label={__('Untertitel X-Position', '3d-cards-block')}
                        value={subtitleX}
                        onChange={(value) => setAttributes({ subtitleX: value })}
                        min={8}
                        max={100}
                    />
                </PanelBody>

                {/* Color Settings */}
                <PanelBody title={__('Farben', '3d-cards-block')} initialOpen={false}>
                    <VStack spacing={4}>
                        <div>
                            <p style={{ marginBottom: '8px', fontWeight: 500 }}>{__('Kartenfarbe', '3d-cards-block')}</p>
                            <ColorPicker
                                color={cardFaceColor}
                                onChange={(value) => setAttributes({ cardFaceColor: value })}
                                enableAlpha={false}
                            />
                        </div>
                        <div>
                            <p style={{ marginBottom: '8px', fontWeight: 500 }}>{__('Randfarbe', '3d-cards-block')}</p>
                            <ColorPicker
                                color={cardBorderColor}
                                onChange={(value) => setAttributes({ cardBorderColor: value })}
                                enableAlpha={false}
                            />
                        </div>
                        <div>
                            <p style={{ marginBottom: '8px', fontWeight: 500 }}>{__('Dicke Gradient Start', '3d-cards-block')}</p>
                            <ColorPicker
                                color={depthColor1}
                                onChange={(value) => setAttributes({ depthColor1: value })}
                                enableAlpha={false}
                            />
                        </div>
                        <div>
                            <p style={{ marginBottom: '8px', fontWeight: 500 }}>{__('Dicke Gradient Ende', '3d-cards-block')}</p>
                            <ColorPicker
                                color={depthColor2}
                                onChange={(value) => setAttributes({ depthColor2: value })}
                                enableAlpha={false}
                            />
                        </div>
                    </VStack>
                </PanelBody>
            </InspectorControls>

            {/* Card Editor Modal */}
            {isCardEditorOpen && (
                <CardEditor
                    cards={cards}
                    onChange={(newCards) => setAttributes({ cards: newCards })}
                    onClose={() => setIsCardEditorOpen(false)}
                />
            )}

            {/* Editor Preview */}
            <div {...blockProps} style={{ minHeight: `${blockHeight}px` }}>
                <div
                    className="cards3d-preview-container"
                    style={{
                        perspective: orthographic ? 'none' : '1000px',
                        minHeight: `${blockHeight}px`,
                    }}
                >
                    <div
                        className="cards3d-container"
                        style={{
                            transform: `rotateX(${cameraRotateX}deg) rotateZ(45deg) scale3d(${scaleTransform}, ${scaleTransform}, ${scaleTransform})`,
                            marginBottom: `${vertPos}px`,
                            '--card-depth': `${cardDepth}px`,
                        }}
                    >
                        {cards.map((card, index) => {
                            const zPos = index * zOffset;
                            const xPos = index * xOffset;
                            const yPos = index * yOffset;

                            return (
                                <div
                                    key={index}
                                    className="cards3d-card"
                                    style={{
                                        transform: `translateZ(${zPos}px) translateX(${xPos}px) translateY(${yPos}px)`,
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
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
