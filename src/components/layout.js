import * as React from "react"
import {Link} from "gatsby"
import {StaticImage} from "gatsby-plugin-image";

const Header = (props)=>{
    return  <div className="main-heading">
        <Link to="/" className="header-title">{props.title}</Link>
        <ul className="header-nav">
            <li><StaticImage
                className="bio-avatar"
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/profile-pic.png"
                width={35}
                height={35}
                quality={95}
                alt="Profile picture"
            /></li>
        </ul>
    </div>
}
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{<Header title={title}/>}</header>
      <main className="global-content">{children}</main>
    </div>
  )
}

export default Layout
