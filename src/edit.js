import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Button,
    ButtonGroup,
    ColorPicker,
    TabPanel,
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
        horPos,
        // Tablet attributes
        globalScaleTablet,
        vertPosTablet,
        horPosTablet,
        cameraRotateXTablet,
        orthographicTablet,
        // Mobile attributes
        globalScaleMobile,
        vertPosMobile,
        horPosMobile,
        cameraRotateXMobile,
        orthographicMobile,
        stayHover,
        slideHover,
        slideHoverX,
        slideHoverY,
        slideHoverZ,
        shadowColor,
        shadowOpacity,
        shadowX,
        shadowY,
        shadowBlur,
        // Responsive Interaction
        stayHoverTablet, stayHoverMobile,
        slideHoverTablet, slideHoverMobile,
        slideHoverXTablet, slideHoverXMobile,
        slideHoverYTablet, slideHoverYMobile,
        slideHoverZTablet, slideHoverZMobile,
        hoverLiftTablet, hoverLiftMobile,
    } = attributes;

    const [isCardEditorOpen, setIsCardEditorOpen] = useState(false);

    // View mode state for the inspector
    const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile

    // Calculate current values based on view mode for PREVIEW
    let currentScale = globalScale;
    let currentVertPos = vertPos;
    let currentHorPos = horPos;
    let currentRotateX = cameraRotateX;
    let currentOrthographic = orthographic;
    // Interaction preview
    let currentStayHover = stayHover;
    let currentSlideHover = slideHover;
    let currentSlideX = slideHoverX;
    let currentSlideY = slideHoverY;
    let currentSlideZ = slideHoverZ;
    let currentHoverLift = hoverLift;

    if (viewMode === 'tablet') {
        if (globalScaleTablet !== null && globalScaleTablet !== undefined) currentScale = globalScaleTablet;
        if (vertPosTablet !== null && vertPosTablet !== undefined) currentVertPos = vertPosTablet;
        if (horPosTablet !== null && horPosTablet !== undefined) currentHorPos = horPosTablet;
        if (cameraRotateXTablet !== null && cameraRotateXTablet !== undefined) currentRotateX = cameraRotateXTablet;
        if (orthographicTablet !== null && orthographicTablet !== undefined) currentOrthographic = orthographicTablet;

        if (stayHoverTablet !== null && stayHoverTablet !== undefined) currentStayHover = stayHoverTablet;
        if (slideHoverTablet !== null && slideHoverTablet !== undefined) currentSlideHover = slideHoverTablet;
        if (slideHoverXTablet !== null && slideHoverXTablet !== undefined) currentSlideX = slideHoverXTablet;
        if (slideHoverYTablet !== null && slideHoverYTablet !== undefined) currentSlideY = slideHoverYTablet;
        if (slideHoverZTablet !== null && slideHoverZTablet !== undefined) currentSlideZ = slideHoverZTablet;
        if (hoverLiftTablet !== null && hoverLiftTablet !== undefined) currentHoverLift = hoverLiftTablet;
    } else if (viewMode === 'mobile') {
        // Mobile inherits Tablet -> Desktop
        let baseScale = (globalScaleTablet !== null && globalScaleTablet !== undefined) ? globalScaleTablet : globalScale;
        let baseVert = (vertPosTablet !== null && vertPosTablet !== undefined) ? vertPosTablet : vertPos;
        let baseHor = (horPosTablet !== null && horPosTablet !== undefined) ? horPosTablet : horPos;
        let baseRot = (cameraRotateXTablet !== null && cameraRotateXTablet !== undefined) ? cameraRotateXTablet : cameraRotateX;
        let baseOrtho = (orthographicTablet !== null && orthographicTablet !== undefined) ? orthographicTablet : orthographic;

        let baseStayHover = (stayHoverTablet !== null && stayHoverTablet !== undefined) ? stayHoverTablet : stayHover;
        let baseSlideHover = (slideHoverTablet !== null && slideHoverTablet !== undefined) ? slideHoverTablet : slideHover;
        let baseSlideX = (slideHoverXTablet !== null && slideHoverXTablet !== undefined) ? slideHoverXTablet : slideHoverX;
        let baseSlideY = (slideHoverYTablet !== null && slideHoverYTablet !== undefined) ? slideHoverYTablet : slideHoverY;
        let baseSlideZ = (slideHoverZTablet !== null && slideHoverZTablet !== undefined) ? slideHoverZTablet : slideHoverZ;
        let baseHoverLift = (hoverLiftTablet !== null && hoverLiftTablet !== undefined) ? hoverLiftTablet : hoverLift;

        if (globalScaleMobile !== null && globalScaleMobile !== undefined) currentScale = globalScaleMobile; else currentScale = baseScale;
        if (vertPosMobile !== null && vertPosMobile !== undefined) currentVertPos = vertPosMobile; else currentVertPos = baseVert;
        if (horPosMobile !== null && horPosMobile !== undefined) currentHorPos = horPosMobile; else currentHorPos = baseHor;
        if (cameraRotateXMobile !== null && cameraRotateXMobile !== undefined) currentRotateX = cameraRotateXMobile; else currentRotateX = baseRot;
        if (orthographicMobile !== null && orthographicMobile !== undefined) currentOrthographic = orthographicMobile; else currentOrthographic = baseOrtho;

        if (stayHoverMobile !== null && stayHoverMobile !== undefined) currentStayHover = stayHoverMobile; else currentStayHover = baseStayHover;
        if (slideHoverMobile !== null && slideHoverMobile !== undefined) currentSlideHover = slideHoverMobile; else currentSlideHover = baseSlideHover;
        if (slideHoverXMobile !== null && slideHoverXMobile !== undefined) currentSlideX = slideHoverXMobile; else currentSlideX = baseSlideX;
        if (slideHoverYMobile !== null && slideHoverYMobile !== undefined) currentSlideY = slideHoverYMobile; else currentSlideY = baseSlideY;
        if (slideHoverZMobile !== null && slideHoverZMobile !== undefined) currentSlideZ = slideHoverZMobile; else currentSlideZ = baseSlideZ;
        if (hoverLiftMobile !== null && hoverLiftMobile !== undefined) currentHoverLift = hoverLiftMobile; else currentHoverLift = baseHoverLift;
    }

    const scaleTransform = currentScale / 100;

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

                {/* Interaction Settings */}
                <PanelBody title={__('Interaktion', '3d-cards-block')} initialOpen={false}>
                    <TabPanel
                        className="cards3d-interaction-tabs"
                        activeClass="is-active"
                        onSelect={(tabName) => setViewMode(tabName)}
                        tabs={[
                            { name: 'desktop', title: 'Desktop', className: 'cards3d-tab-desktop' },
                            { name: 'tablet', title: 'Tablet', className: 'cards3d-tab-tablet' },
                            { name: 'mobile', title: 'Mobile', className: 'cards3d-tab-mobile' },
                        ]}
                        initialTabName={viewMode}
                    >
                        {(tab) => {
                            const isDesktop = tab.name === 'desktop';
                            const isTablet = tab.name === 'tablet';
                            const isMobile = tab.name === 'mobile';

                            const getAttr = (baseName) => {
                                if (isDesktop) return attributes[baseName];
                                if (isTablet) return attributes[baseName + 'Tablet'];
                                if (isMobile) return attributes[baseName + 'Mobile'];
                            };

                            const setAttr = (baseName, value) => {
                                if (isDesktop) setAttributes({ [baseName]: value });
                                if (isTablet) setAttributes({ [baseName + 'Tablet']: value });
                                if (isMobile) setAttributes({ [baseName + 'Mobile']: value });
                            };

                            const getInheritedValue = (baseName) => {
                                if (isDesktop) return null;
                                if (isTablet) return attributes[baseName];
                                if (isMobile) return attributes[baseName + 'Tablet'] ?? attributes[baseName];
                            };

                            // Values
                            const valStayHover = getAttr('stayHover');
                            const valSlideHover = getAttr('slideHover');
                            const valSlideX = getAttr('slideHoverX');
                            const valSlideY = getAttr('slideHoverY');
                            const valSlideZ = getAttr('slideHoverZ');
                            const valHoverLift = getAttr('hoverLift');

                            // Effective boolean for display (inherit if null)
                            const effStayHover = valStayHover ?? getInheritedValue('stayHover') ?? false;
                            const effSlideHover = valSlideHover ?? getInheritedValue('slideHover') ?? false;

                            return (
                                <VStack spacing={4} style={{ marginTop: '16px' }}>
                                    {!isDesktop && (
                                        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', margin: 0 }}>
                                            {__('Werte leer lassen um Einstellungen zu erben.', '3d-cards-block')}
                                        </p>
                                    )}

                                    {/* Stay Hover */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <ToggleControl
                                            label={__('Stay Hover', '3d-cards-block')}
                                            checked={effStayHover}
                                            onChange={(value) => setAttr('stayHover', value)}
                                            help={__('Zuletzt gehoverte Karte bleibt angehoben.', '3d-cards-block')}
                                            style={{ marginBottom: 0 }}
                                        />
                                        {!isDesktop && valStayHover !== null && (
                                            <Button isSmall variant="tertiary" onClick={() => setAttr('stayHover', null)}>
                                                Reset
                                            </Button>
                                        )}
                                    </div>

                                    {/* Slide Hover */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <ToggleControl
                                            label={__('Slide Hover', '3d-cards-block')}
                                            checked={effSlideHover}
                                            onChange={(value) => setAttr('slideHover', value)}
                                            help={__('Karten sliden zur Seite.', '3d-cards-block')}
                                            style={{ marginBottom: 0 }}
                                        />
                                        {!isDesktop && valSlideHover !== null && (
                                            <Button isSmall variant="tertiary" onClick={() => setAttr('slideHover', null)}>
                                                Reset
                                            </Button>
                                        )}
                                    </div>

                                    {/* Slide Hover Details */}
                                    {effSlideHover && (
                                        <VStack spacing={3} style={{ marginLeft: '16px', borderLeft: '2px solid #ddd', paddingLeft: '12px' }}>
                                            <RangeControl
                                                label={__('Horizontaler Slide (X)', '3d-cards-block')}
                                                value={valSlideX}
                                                onChange={(value) => setAttr('slideHoverX', value)}
                                                min={-500}
                                                max={500}
                                                allowReset={!isDesktop}
                                                resetFallbackValue={null}
                                                placeholder={!isDesktop && getInheritedValue('slideHoverX')}
                                            />
                                            <RangeControl
                                                label={__('Vertikaler Slide (Y)', '3d-cards-block')}
                                                value={valSlideY}
                                                onChange={(value) => setAttr('slideHoverY', value)}
                                                min={-500}
                                                max={500}
                                                allowReset={!isDesktop}
                                                resetFallbackValue={null}
                                                placeholder={!isDesktop && getInheritedValue('slideHoverY')}
                                            />
                                            <RangeControl
                                                label={__('Z Override', '3d-cards-block')}
                                                value={valSlideZ}
                                                onChange={(value) => setAttr('slideHoverZ', value)}
                                                min={0}
                                                max={200}
                                                allowReset={!isDesktop}
                                                resetFallbackValue={null}
                                                placeholder={!isDesktop && getInheritedValue('slideHoverZ')}
                                            />
                                        </VStack>
                                    )}

                                    {/* Hover Lift (Standard) */}
                                    <RangeControl
                                        label={__('Hover Lift (Standard)', '3d-cards-block')}
                                        value={valHoverLift}
                                        onChange={(value) => setAttr('hoverLift', value)}
                                        min={20}
                                        max={300}
                                        allowReset={!isDesktop}
                                        resetFallbackValue={null}
                                        placeholder={!isDesktop && getInheritedValue('hoverLift')}
                                        help={__('Anhebung bei Hover (wenn Slide aus)', '3d-cards-block')}
                                    />
                                </VStack>
                            );
                        }}
                    </TabPanel>
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
                        min={-100}
                        max={100}
                    />
                </PanelBody>

                {/* View Settings */}
                <PanelBody title={__('Ansicht', '3d-cards-block')} initialOpen={false}>
                    <TabPanel
                        className="cards3d-view-tabs"
                        activeClass="is-active"
                        onSelect={(tabName) => setViewMode(tabName)}
                        tabs={[
                            {
                                name: 'desktop',
                                title: 'Desktop',
                                className: 'cards3d-tab-desktop',
                            },
                            {
                                name: 'tablet',
                                title: 'Tablet',
                                className: 'cards3d-tab-tablet',
                            },
                            {
                                name: 'mobile',
                                title: 'Mobile',
                                className: 'cards3d-tab-mobile',
                            },
                        ]}
                    >
                        {(tab) => {
                            const isDesktop = tab.name === 'desktop';
                            const isTablet = tab.name === 'tablet';
                            const isMobile = tab.name === 'mobile';

                            // Helper to get/set attributes dynamically
                            const getAttr = (baseName) => {
                                if (isDesktop) return attributes[baseName];
                                if (isTablet) return attributes[baseName + 'Tablet'];
                                if (isMobile) return attributes[baseName + 'Mobile'];
                            };

                            const setAttr = (baseName, value) => {
                                if (isDesktop) setAttributes({ [baseName]: value });
                                if (isTablet) setAttributes({ [baseName + 'Tablet']: value });
                                if (isMobile) setAttributes({ [baseName + 'Mobile']: value });
                            };

                            // Check inheritance for placeholder/visual feedback
                            const getInheritedValue = (baseName) => {
                                if (isDesktop) return null;
                                // Tablet inherits Desktop
                                if (isTablet) return attributes[baseName];
                                // Mobile inherits Tablet or Desktop
                                if (isMobile) {
                                    return (attributes[baseName + 'Tablet'] !== null && attributes[baseName + 'Tablet'] !== undefined)
                                        ? attributes[baseName + 'Tablet']
                                        : attributes[baseName];
                                }
                            };

                            // Values for controls (allow null for overrides)
                            const valScale = getAttr('globalScale');
                            const valVert = getAttr('vertPos');
                            const valHor = getAttr('horPos');
                            const valRot = getAttr('cameraRotateX');
                            const valOrtho = getAttr('orthographic');

                            return (
                                <VStack spacing={4} style={{ marginTop: '16px' }}>
                                    {!isDesktop && (
                                        <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', margin: 0 }}>
                                            {__('Werte leer lassen um Einstellungen vom größeren Gerät zu übernehmen.', '3d-cards-block')}
                                        </p>
                                    )}

                                    <RangeControl
                                        label={__('Gesamt-Skalierung (%)', '3d-cards-block')}
                                        value={valScale}
                                        onChange={(value) => setAttr('globalScale', value)}
                                        min={50}
                                        max={350}
                                        allowReset={!isDesktop}
                                        resetFallbackValue={null}
                                        placeholder={!isDesktop && getInheritedValue('globalScale')}
                                    />

                                    {isDesktop && (
                                        <RangeControl
                                            label={__('Block-Höhe (px)', '3d-cards-block')}
                                            value={blockHeight}
                                            onChange={(value) => setAttributes({ blockHeight: value })}
                                            min={200}
                                            max={1200}
                                            help={__('Nur Desktop Einstellung', '3d-cards-block')}
                                        />
                                    )}

                                    <RangeControl
                                        label={__('Vertikale Position', '3d-cards-block')}
                                        value={valVert}
                                        onChange={(value) => setAttr('vertPos', value)}
                                        min={-300}
                                        max={300}
                                        allowReset={!isDesktop}
                                        resetFallbackValue={null}
                                    />

                                    <RangeControl
                                        label={__('Horizontale Position', '3d-cards-block')}
                                        value={valHor}
                                        onChange={(value) => setAttr('horPos', value)}
                                        min={-300}
                                        max={300}
                                        allowReset={!isDesktop}
                                        resetFallbackValue={null}
                                    />

                                    <HStack spacing={2}>
                                        <span>{__('Kamera-Neigung:', '3d-cards-block')} {valRot ?? getInheritedValue('cameraRotateX')}°</span>
                                    </HStack>
                                    <ButtonGroup>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                const current = valRot ?? getInheritedValue('cameraRotateX');
                                                setAttr('cameraRotateX', Math.max(0, current - 5));
                                            }}
                                        >
                                            ▼ -5°
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                const current = valRot ?? getInheritedValue('cameraRotateX');
                                                setAttr('cameraRotateX', Math.min(90, current + 5));
                                            }}
                                        >
                                            ▲ +5°
                                        </Button>
                                        {!isDesktop && (
                                            <Button
                                                variant="tertiary"
                                                onClick={() => setAttr('cameraRotateX', null)}
                                                disabled={valRot === null}
                                                label="Reset"
                                                icon="image-rotate"
                                            >
                                                ✕
                                            </Button>
                                        )}
                                    </ButtonGroup>

                                    <ToggleControl
                                        label={__('Orthografische Ansicht', '3d-cards-block')}
                                        checked={valOrtho ?? getInheritedValue('orthographic')}
                                        onChange={(value) => setAttr('orthographic', value)}
                                    />
                                </VStack>
                            );
                        }}
                    </TabPanel>
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

                <PanelColorSettings
                    title={__('Farben', '3d-cards-block')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: cardFaceColor,
                            onChange: (value) => setAttributes({ cardFaceColor: value }),
                            label: __('Kartenfarbe', '3d-cards-block'),
                        },
                        {
                            value: cardBorderColor,
                            onChange: (value) => setAttributes({ cardBorderColor: value }),
                            label: __('Randfarbe', '3d-cards-block'),
                        },
                        {
                            value: depthColor1,
                            onChange: (value) => setAttributes({ depthColor1: value }),
                            label: __('Dicke Gradient Start', '3d-cards-block'),
                        },
                        {
                            value: depthColor2,
                            onChange: (value) => setAttributes({ depthColor2: value }),
                            label: __('Dicke Gradient Ende', '3d-cards-block'),
                        },
                        {
                            value: shadowColor,
                            onChange: (value) => setAttributes({ shadowColor: value }),
                            label: __('Schattenfarbe', '3d-cards-block'),
                        },
                    ]}
                />

                {/* Shadow Settings */}
                <PanelBody title={__('Schattendetails', '3d-cards-block')} initialOpen={false}>
                    <RangeControl
                        label={__('Deckkraft (%)', '3d-cards-block')}
                        value={shadowOpacity}
                        onChange={(value) => setAttributes({ shadowOpacity: value })}
                        min={0}
                        max={100}
                    />
                    <RangeControl
                        label={__('Verschiebung X', '3d-cards-block')}
                        value={shadowX}
                        onChange={(value) => setAttributes({ shadowX: value })}
                        min={-100}
                        max={100}
                    />
                    <RangeControl
                        label={__('Verschiebung Y', '3d-cards-block')}
                        value={shadowY}
                        onChange={(value) => setAttributes({ shadowY: value })}
                        min={-100}
                        max={100}
                    />
                    <RangeControl
                        label={__('Weichzeichner (Blur)', '3d-cards-block')}
                        value={shadowBlur}
                        onChange={(value) => setAttributes({ shadowBlur: value })}
                        min={0}
                        max={100}
                    />
                </PanelBody>
            </InspectorControls >

            {/* Card Editor Modal */}
            {
                isCardEditorOpen && (
                    <CardEditor
                        cards={cards}
                        onChange={(newCards) => setAttributes({ cards: newCards })}
                        onClose={() => setIsCardEditorOpen(false)}
                    />
                )
            }

            {/* Editor Preview */}
            <div {...blockProps} style={{ minHeight: `${blockHeight}px` }}>
                <div
                    className="cards3d-preview-container"
                    style={{
                        perspective: currentOrthographic ? 'none' : '1000px',
                        minHeight: `${blockHeight}px`,
                        border: viewMode !== 'desktop' ? '2px dashed #e4e8ec' : 'none',
                        position: 'relative',
                    }}
                >
                    {viewMode !== 'desktop' && (
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            background: '#eee',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            zIndex: 10
                        }}>
                            {viewMode} Preview
                        </div>
                    )}
                    <div
                        className="cards3d-container"
                        style={{
                            transform: `translateX(${currentHorPos}px) rotateX(${currentRotateX}deg) rotateZ(45deg) scale3d(${scaleTransform}, ${scaleTransform}, ${scaleTransform})`,
                            marginBottom: `${currentVertPos}px`,
                            '--card-depth': `${cardDepth}px`,
                            '--shadow-color': shadowColor,
                            '--shadow-opacity': shadowOpacity,
                            '--shadow-x': shadowX,
                            '--shadow-y': shadowY,
                            '--shadow-blur': shadowBlur,
                        }}
                    >
                        {cards.map((card, index) => {
                            const zPos = index * zOffset;
                            const xPos = index * xOffset;
                            const yPos = index * yOffset;

                            // Visualize slide hover on the last card if active
                            let finalTransform = `translateZ(${zPos}px) translateX(${xPos}px) translateY(${yPos}px)`;
                            if (currentSlideHover && index === cards.length - 1) {
                                // "Visualize slide hover state" -> emulate the hover effect on this card
                                // The effect: translateZ(baseZ + slideHoverZ) translateX(baseX + slideHoverX) translateY(baseY + slideHoverY)
                                finalTransform = `translateZ(${zPos + currentSlideZ}px) translateX(${xPos + currentSlideX}px) translateY(${yPos + currentSlideY}px)`;
                            }

                            return (
                                <div
                                    key={index}
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
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
