import './ShareButton.css'

const ShareButton = ({ action }) => {
    return (
        <button onClick={action} className="share-button">
        Share
        </button>
    )
}

export default ShareButton;