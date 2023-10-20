import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'

const Layout = () => {
    return (
        <div className='min-h-screen flex flex-col bg-slate-100'>
            <Navigation />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout