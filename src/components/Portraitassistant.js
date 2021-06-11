import Cellgrocerylist from "./Cellgrocerylist"
import Cellmeal from "./Cellmeal"
import Celltimer from "./Celltimer"
import Wrappedrowlist from "./Wrappedrowlist"

export default function Portraitassistant() {
    return <div>
        <div className="row wrap">
            <Cellmeal strMeal={"Recipe 1"} />
            <Cellmeal strMeal={"Recipe 2"} />
            <Cellmeal strMeal={"Recipe 3"} />
            <Cellmeal strMeal={"Recipe 4"} />
        </div>
        <Wrappedrowlist list={"0".repeat(10).split("")} item={Celltimer} basis={40} />
        <Wrappedrowlist list={"0".repeat(4).split("")} item={Cellgrocerylist} basis={40} />

        <span>asd</span>
    </div>
}