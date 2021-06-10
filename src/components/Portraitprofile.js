import Cellmeal from "./Cellmeal"

export default function Portraitprofile() {
    let backgroundurl = 'url(https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture-768x768.jpg)'
    return <div className="col">

        <span className="maskicon_circle iconsize_40 " style={{ background: backgroundurl }}></span>
        <span>@Yvanella</span>
        <span>Morning lover</span>
        <span>yvanellamorning.com</span>
        <span>44 posts</span>
        <span>3 to 5 Steps. Prepare rice according to package directions.
1 Cups Rice</span>

        <div className="row">
            <span className="maskicon_circle iconsize_40 " style={{ background: backgroundurl }}></span>
            <span className="maskicon_circle iconsize_40 " style={{ background: backgroundurl }}></span>
            <span className="maskicon_circle iconsize_40 " style={{ background: backgroundurl }}></span>
        </div>
        <div className="row">
            <Cellmeal strMeal="Recipe 0" />
            <Cellmeal strMeal="Recipe 1" />
            <Cellmeal strMeal="Recipe 2"/>
        </div>
    </div>
}