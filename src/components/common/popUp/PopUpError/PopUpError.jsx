import React from "react";
import style from "./PopUpError.module.css"

const PopUpError = (props) => {
  document.body.classList.add(`${style.notScroll}`)

  const unShow = () => {
    props['unShowMessage']();
    document.body.classList.remove(`${style.notScroll}`)
  }

  return (
    <div className={style.containerGlobalError}>
      <div className={style.globalError}>
        <div className={style.messageError}>{props.message}</div>
        <button onClick={unShow} className={style.buttonError}>Close message</button>
      </div>
    </div>
  )
}
export default PopUpError
