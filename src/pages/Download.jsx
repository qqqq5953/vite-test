import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    let { result } = location.state;
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    // if (result == null) {
    // navigate("/")
    // return null
    // }

    result = 0

    let role = ""

    if (result >= 0 && result <= 5) {
        role = "knight_download"
    } else if (result >= 6 && result <= 10) {
        role = "wizard_download"
    } else if (result >= 11 && result <= 15) {
        role = "archer_download"
    } else if (result >= 16 && result <= 20) {
        role = "assassin_download"
    } else if (result >= 21 && result <= 30) {
        role = "trainer_download"
    }

    const imagePath = "../src/assets/result-element/" + role + ".png"
    /* relative h-screen
    style={{
        backgroundImage: 'url("../src/assets/result-element/1200-bg.png")',
    }}
    */
    return (
        <div className='px-5 pt-24 pb-36' style={{
            backgroundImage: 'url("../src/assets/result-element/375-bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat"
        }}>
            <img src={imagePath} alt={role} />
            <button className='rounded-full bg-white w-full py-4 mt-6'>取得結果圖</button>
            <img src="../src/assets/result-element/divide.png" alt="divide" className='my-16' />
            <div className='text-center text-white'>
                <p className='py-1.5'>蓋亞資訊</p>
                <p>雲端服務整合專家</p>
                <p className='py-4 text-xl'>GAIA INFORMATION TECHNOLOGY</p>
                <img src="../src/assets/result-element/gaia_logo_white.svg" alt={role} className='w-48 text-center inline-block pb-4' />
                <div className='text-xl'>
                    <p>提供企業一站式雲端整合顧問服務</p>
                    <p>24hr 中英雙語線上維運服務，</p>
                    <p>快速解決客戶問題及需求。</p>
                </div>
            </div>
            <a href="https://www.gaia.net/tc" target='blank' className='block text-center rounded-full bg-white w-full py-4 mt-6'>立即登入GAIA 新世界</a>
            <img src="../src/assets/result-element/divide.png" alt="divide" className='my-16' />
            <div className='text-center text-white text-xl'>
                <p className=''>攜手 GAIA</p>
                <p>打造未來雲端趨勢</p>
            </div>
            <img src="../src/assets/result-element/clouds.png" alt="divide" className='my-16' />
            <a href="https://www.gaia.net/tc/services/2/cloudcomputing" target='blank' className='block text-center rounded-full bg-white w-full py-4 mt-6'>了解更多上雲資訊</a>
        </div >
    )
}
