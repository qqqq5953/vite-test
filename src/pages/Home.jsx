import { useRef, useEffect, useState } from 'react'

const lg = window.matchMedia("(min-width: 1200px)")
const md = window.matchMedia("(min-width: 768px) and (max-width: 1199px)")
const sm = window.matchMedia("(min-width: 375px) and (max-width: 767px)")

export default function Home() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [lgSize, setLgSize] = useState(lg.matches)
    const [mdSize, setMdSize] = useState(md.matches)
    const [smSize, setSmSize] = useState(sm.matches)

    function handleLg(e) {
        if (e.matches) return
        if (sm.matches) setSmSize(true)
        if (md.matches) setMdSize(true)
    }

    function handleMd(e) {
        if (e.matches) return
        if (sm.matches) setSmSize(true)
        if (lg.matches) setLgSize(true)
    }

    function handleSm(e) {
        if (e.matches) return
        if (md.matches) setMdSize(true)
        if (lg.matches) setLgSize(true)
    }

    useEffect(() => {
        lg.addEventListener("change", handleLg)
        md.addEventListener("change", handleMd)
        sm.addEventListener("change", handleSm)

        return () => {
            lg.removeEventListener("change", handleLg)
            md.removeEventListener("change", handleMd)
            sm.removeEventListener("change", handleSm)
        }
    }, [])

    function getImageUrl(name) {
        return new URL(`/src/assets/${name}.png`, import.meta.url).href
    }
    
    const imageToShare = useRef(null)
    const output = useRef(null)

    async function shareFromAPI(){
        const imageUrl = imageToShare.current.src;
        const imageBlob = await fetch(imageUrl).then((response) => response.blob());
        const imageFile = new File([imageBlob], "test.png", { type: "image/png" });

        // Check if the browser supports the Web Share API
        if (!navigator.canShare) return alert("您的瀏覽器不支援分享功能")

        // Check if sharing files is supported
        if (navigator.canShare({ files: [imageFile] })) {
            try {
                navigator.share({
                    files: [imageFile],
                    // title: "Image",
                    // text: "Sharing a beautiful image",
                }).then(()=>{
                    output.current.textContent = "Shared!";
                });
            } catch (error) {
                alert(`Error: ${error.message}`)
            }
        } else {
            alert("您的瀏覽器不支援分享功能")
        }
    }

    // facebook
    const isLocal = process.env.NODE_ENV !== 'production'
    const uri = isLocal ? "https://www.gaia.net/tc" : window.location.href
    const resultPageUri = encodeURI(uri)

    function shareit(){
        var img = imageToShare.current.src; //Set Desired Image here
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(img)}`, 'facebook_share', 'width=600,height=400');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(img)}`, 'sharer','toolbar=0,status=0,width=1200,height=630', '_blank');
    }

    function test(){

    }

    return (
    <div className='mx-auto max-w-[400px] text-center px-2'>
        <img src={getImageUrl('knight_download')} alt="" width={100} ref={imageToShare} className='inline-block'/>

        <br />
        <br />
        <button className='border border-slate-700 p-3' onClick={test} type="button">FB only image</button>
        <br />
        <br />

        {/* ig share api */}
        <h2 className='text-xl text-blue-900 font-bold'>ig share api</h2>
        <br />
        <button className='border border-slate-700 p-3' onClick={shareFromAPI} type="button">IG share api</button>
        <br />

        {/* facebook share api */}
        <br />
        <h2 className='text-xl text-blue-900 font-bold'>facebook share api</h2>
        <br />
        <button onClick={shareFromAPI} className='border border-slate-700 p-3'>FB share api</button>
        <br />
        <br />
        output: <output ref={output}></output>
        <br />
        <br />
        <div>------------------------------------</div>

        {/* facebook from sdk */}
        <br />
        <h2 className='text-xl text-blue-900 font-bold'>facebook from sdk</h2>
        <br />
        <div className="fb-share-button border rounded-lg w-auto py-3" data-href={resultPageUri} data-layout="" data-size="">
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${resultPageUri}`} className="fb-xfbml-parse-ignore flex items-center justify-center">
            FB from SDK
            </a>
        </div>

        {/* facebook from window open */}
        <br />
        <h2 className='text-xl text-blue-900 font-bold'>facebook from window open</h2>
        <br />
        <button onClick={shareit} className='border border-slate-700 p-3'>FB window open</button>
        <br />
        <br />
        window.location.href: {window.location.href}
        <br />
        <br />
        uri: {uri}
        <br />
        <br />
        <div>NODE_ENV: {process.env.NODE_ENV}</div>
    </div>
    )
}
