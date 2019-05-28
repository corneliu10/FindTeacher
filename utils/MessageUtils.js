import PropTypes from 'prop-types';

export const MessageShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    key: PropTypes.string,
    type: PropTypes.oneOf(['text', 'image', 'location']),
    sent: PropTypes.bool,
    text: PropTypes.string,
    uri: PropTypes.string,
    coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
});

let messageId = 0;

function getNextId() {
    messageId += 1;
    return messageId;
}

export function createTextMessage(text, sent, key = "") {
    return {
        type: 'text',
        id: getNextId(),
        text,
        sent,
        key
    };
}

export function createImageMessage(uri) {
    return {
        type: 'image',
        id: getNextId(),
        uri,
    };
}

export function createLocationMessage(coordinate) {
    return {
        type: 'location',
        id: getNextId(),
        coordinate,
    };
}