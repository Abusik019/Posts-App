import styles from "./style.module.css"
import ava from "../../assets/github_ava.jfif";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <div className={styles.header}>
          <img src={ava} className={styles.profileAva}/>
          <ul className={styles.nav}>
              <NavLink to="/"><li>Главная</li></NavLink>
              <NavLink to="/posts"><li>Посты</li></NavLink>
              <NavLink to="/about_project"><li>О проекте</li></NavLink>   
          </ul>   
      </div>
      <div className={styles.line}></div>
    </>
  )
}
