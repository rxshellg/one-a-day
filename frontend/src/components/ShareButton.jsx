import PropTypes from 'prop-types';
import './ShareButton.css';

const ShareButton = ({ action }) => {
    return (
        <button onClick={action} className="share-button">
        Share
        </button>
    )
}

ShareButton.propTypes = {
    action: PropTypes.func.isRequired,
};

export default ShareButton;