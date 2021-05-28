import { connect } from "react-redux"
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer"

function Portraitmeal() {
    return <div>
        
    </div>
}


const mapStatetoProps = ({appstate: focus}) => ({appstate})
const mapDispatchtoProps = createMapDispatchtoProps()

export default connect(mapStatetoProps,mapDispatchtoProps)(Portraitmeal)