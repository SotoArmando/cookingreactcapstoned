import Cellmeal from "./Cellmeal"
import Cellprofilepicture from "./Cellprofilepicture"

export default function Portraitprofile() {

    return <div className="col">
        <Cellprofilepicture />
        <span>@Yvanella</span>
        <span>Morning lover</span>
        <span>yvanellamorning.com</span>
        <span>44 posts</span>
        <span>3 to 5 Steps. Prepare rice according to package directions.
1 Cups Rice</span>
        <div className="row">
            <Cellmeal strMeal="Recipe 0" />
            <Cellmeal strMeal="Recipe 1" />
            <Cellmeal strMeal="Recipe 2" />
            <Cellmeal strMeal="Recipe 2" />
            <Cellmeal strMeal="Recipe 2" />
        </div>
        <div className="row">
            {[0, 0, 0].map(() => <Cellprofilepicture />)}
        </div>
        <div className="row">
            <Cellmeal strMeal="Recipe 0" />
            <Cellmeal strMeal="Recipe 1" />
            <Cellmeal strMeal="Recipe 2" />
        </div>
    </div>
}