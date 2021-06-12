import { useState } from "react";

function Forminput({ entries, vmargin = 20, handleCapture, id }) {
    let [[state, setState], [status, setStatus]] = [useState({}), useState('')];

    const handlekeyUp = (event) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const isValid = () => {
        return entries.every(([key, { regex }]) => (state[key] || '').match(regex || '.{1,}'))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid()) {
            setStatus("state is valid " + JSON.stringify(state))
            handleCapture(state)
        } else {
            setStatus("state is not valid " + JSON.stringify(state))
        }
    }

    return [<form id={id} onSubmit={handleSubmit} onKeyUpCapture={handlekeyUp} className={`col overflowhidden nmar_b${vmargin} nmar_t${vmargin}`} >
        {
            entries.map(
                ({ 0: key, 1: { holder = false, regex = '.{1,}', type = 'text' } }, required = true) => <input key={'Forminput' + key}
                    name={key} placeholder={holder || key}
                    pattern={regex}
                    type={type}
                    className={`corebox_2 border_0 mar_t${vmargin} mar_b${vmargin}`}
                />)
        }
    </form>,
    <div className='corebox_2 items_center row'>{status}</div>]
}

export default Forminput;