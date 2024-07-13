// import styles from './input.module.scss';
// export default function Input({ label,  placeholder, type, value ,onChange, name,required , icon,onIconClick}) {
//     return (
//         <div className={styles.input}>
//             <label>{label}</label>
//             <div className={styles.relative}>
//                 <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} required={required}/>
//                 {
//                     icon && (
//                         <div className={styles.icon}  onClick={onIconClick ? onIconClick : null}>
//                             <img src={icon} alt='icon' />
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }
import { handleEmailKeyPress, handleSpaceKeyPress } from "@/hooks/usehandleSpaceKeyPress";
import styles from "./input.module.scss";
import ShowError from "@/common/ShowError";

export default function Input({ label, placeholder, type, value, onChange, name, required, icon, onIconClick, options, pattern, className, children,labelClassName,errorMessage ,onButtonClick,button }) {
  return (
    <div className={styles.input}>
      <div style={{display: "flex",alignItems: "start", justifyContent: "start", gap: "10px"}} className={labelClassName?labelClassName:""}>
        <label>{label}</label>
        {children}
      </div>
      <div className={styles.relative}>
        {type === "select" ? (
          <select className={className} value={value} onChange={onChange} name={name} required={required}>
            {options &&
              options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ) : type == "email" ? (
          <input onKeyDown={handleEmailKeyPress}  type={type} pattern={pattern} placeholder={placeholder} value={value} onChange={onChange} name={name} required={required} />
        ): <input onKeyDown={handleSpaceKeyPress}  type={type} pattern={pattern} placeholder={placeholder} value={value} onChange={onChange} name={name} required={required} />
      
      }
        {icon && (
          <div className={styles.icon} onClick={onIconClick ? onIconClick : null}>
            <img src={icon} alt="icon" />
          </div>
        )}
        {button && (
          <div className={styles.button} onClick={onButtonClick ? onButtonClick : null}>
            <button>{button}</button>
          </div>
        )}
        {errorMessage ? <ShowError errorMessage={errorMessage} /> : null}
      </div>
    </div>
  );
}