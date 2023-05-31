import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

// Parent Component Element
const Layout = () => {
    return (
        <>
            <Nav />
            {/* // Outlet allows for all children components to be rendered */}
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout