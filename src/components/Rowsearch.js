export default function Rowsearch({ handleSubmit }) {

    const handleKeyDown = ({ code, target: { value: textsearch } }) => {
        if (code === "Enter") {
            handleSubmit(textsearch)
        }
    }
    return <div>
        <input placeholder="Search " onKeyDownCapture={handleKeyDown} className="corebox_2 border_0 mar_b22 mar_t22" />
    </div>
}
