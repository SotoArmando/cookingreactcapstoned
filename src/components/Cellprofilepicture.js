function Cellprofilepicture({size = 40}) {
    let backgroundurl = 'url(https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-768x768.jpg)'
    return <span className={`maskicon_circle iconsize_${size}`} style={{ backgroundImage: backgroundurl }} />
}



export default Cellprofilepicture;