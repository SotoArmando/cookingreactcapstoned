export default function Rowsearch({ handleSubmit }) {

    const handleKeyDown = ({ code, target: { value: textsearch } }) => {
        if (code === "Enter") {
            handleSubmit(textsearch)
        }
    }
    return <div className="col center corebox_15 back_22">
        <input placeholder="Search" className="back_0 corebox_0 maxedcorebox_x18  pad_24 " onKeyDownCapture={handleKeyDown} />
        <span className="back_0 corebox_0 maxedcorebox_x18  pad_l24 fore_4">
            E.g Rice, Soup, Fish
        </span>
    </div>
}
