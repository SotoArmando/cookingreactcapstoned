export default function Rowsearch({ handleSubmit }) {

    const handleKeyDown = ({ code, target: { value: textsearch } }) => {
        if (code === "Enter") {
            handleSubmit(textsearch)
        }
    }
    return <div>
        <input placeholder="Search " onKeyDownCapture={handleKeyDown} />
    </div>
}
