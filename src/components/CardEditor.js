import { __ } from '@wordpress/i18n';
import {
    Modal,
    Button,
    TextControl,
    TextareaControl,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function CardEditor({ cards, onChange, onClose }) {
    const [editedCards, setEditedCards] = useState([...cards]);

    const updateCard = (index, field, value) => {
        const newCards = [...editedCards];
        newCards[index] = { ...newCards[index], [field]: value };
        setEditedCards(newCards);
    };

    const addCard = () => {
        if (editedCards.length >= 36) {
            return;
        }
        const newCard = {
            svg: '<svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="20" fill="#6366f1"/></svg>',
            title: 'Neue Karte',
            subtitle: 'Beschreibung',
        };
        setEditedCards([...editedCards, newCard]);
    };

    const removeCard = (index) => {
        if (editedCards.length <= 1) {
            return;
        }
        const newCards = editedCards.filter((_, i) => i !== index);
        setEditedCards(newCards);
    };

    const moveCard = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= editedCards.length) {
            return;
        }
        const newCards = [...editedCards];
        [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
        setEditedCards(newCards);
    };

    const handleSave = () => {
        onChange(editedCards);
        onClose();
    };

    return (
        <Modal
            title={__('Karten bearbeiten', '3d-cards-block')}
            onRequestClose={onClose}
            size="large"
            style={{ maxWidth: '800px', width: '100%' }}
        >
            <VStack spacing={4}>
                <p style={{ color: '#666', margin: 0 }}>
                    {editedCards.length} von 36 Karten verwendet
                </p>

                <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
                    {editedCards.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '16px',
                                marginBottom: '12px',
                                border: '1px solid #e4e8ec',
                                borderRadius: '8px',
                                background: '#fafafa',
                            }}
                        >
                            <HStack alignment="top" spacing={3}>
                                <div style={{ flex: 1 }}>
                                    <HStack spacing={2} style={{ marginBottom: '12px' }}>
                                        <span style={{
                                            background: '#6366f1',
                                            color: '#fff',
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                        }}>
                                            Karte {index + 1}
                                        </span>
                                        <div style={{ flex: 1 }} />
                                        <Button
                                            onClick={() => moveCard(index, -1)}
                                            disabled={index === 0}
                                            size="small"
                                            variant="secondary"
                                        >
                                            ▲
                                        </Button>
                                        <Button
                                            onClick={() => moveCard(index, 1)}
                                            disabled={index === editedCards.length - 1}
                                            size="small"
                                            variant="secondary"
                                        >
                                            ▼
                                        </Button>
                                        <Button
                                            onClick={() => removeCard(index)}
                                            disabled={editedCards.length <= 1}
                                            isDestructive
                                            size="small"
                                        >
                                            ✕
                                        </Button>
                                    </HStack>

                                    <HStack spacing={3} alignment="top">
                                        <div style={{ flex: 1 }}>
                                            <TextControl
                                                label={__('Titel', '3d-cards-block')}
                                                value={card.title}
                                                onChange={(value) => updateCard(index, 'title', value)}
                                            />
                                            <TextControl
                                                label={__('Untertitel', '3d-cards-block')}
                                                value={card.subtitle}
                                                onChange={(value) => updateCard(index, 'subtitle', value)}
                                            />
                                        </div>
                                        <div style={{ flex: 2 }}>
                                            <TextareaControl
                                                label={__('SVG Code', '3d-cards-block')}
                                                value={card.svg}
                                                onChange={(value) => updateCard(index, 'svg', value)}
                                                rows={5}
                                                style={{ fontFamily: 'monospace', fontSize: '11px' }}
                                            />
                                        </div>
                                    </HStack>

                                    <HStack spacing={3} style={{ marginTop: '12px' }}>
                                        <TextControl
                                            label={__('Link URL (optional)', '3d-cards-block')}
                                            value={card.linkUrl || ''}
                                            onChange={(value) => updateCard(index, 'linkUrl', value)}
                                            placeholder="https://..."
                                            help={__('Fügt einen Link zur Karte hinzu.', '3d-cards-block')}
                                        />
                                        <TextControl
                                            label={__('JS Event Name (optional)', '3d-cards-block')}
                                            value={card.customEvent || ''}
                                            onChange={(value) => updateCard(index, 'customEvent', value)}
                                            placeholder="my-custom-event"
                                            help={__('Feuert ein CustomEvent beim Klick.', '3d-cards-block')}
                                        />
                                    </HStack>
                                </div>

                                {/* SVG Preview */}
                                <div
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        background: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                    dangerouslySetInnerHTML={{ __html: card.svg }}
                                />
                            </HStack>
                        </div>
                    ))}
                </div>

                <HStack spacing={3}>
                    <Button
                        variant="secondary"
                        onClick={addCard}
                        disabled={editedCards.length >= 36}
                    >
                        + {__('Karte hinzufügen', '3d-cards-block')}
                    </Button>
                    <div style={{ flex: 1 }} />
                    <Button variant="tertiary" onClick={onClose}>
                        {__('Abbrechen', '3d-cards-block')}
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {__('Speichern', '3d-cards-block')}
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
}

