import image from './404.png'

export default function PageNotFound() {

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-3" style={{height: '100vh', letterSpacing: '1px'}}>
            <div className='h2 fw-bold'>Oops!</div>
            <img src={image} alt="..." className='w-50' />
            <div className='h3 fw-bold'>PAGE NOT FOUND</div>
            <div className=''>Sorry, the page you're looking for doesn't exist.</div>
            <a href='/' className="btn rounded p-2 px-5 fw-bold shadow-sm" style={{background: '#2874A6'}}>Go Home</a>
        </div>
    );
}