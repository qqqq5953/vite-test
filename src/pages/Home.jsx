import { useRef } from 'react'

export default function Home() {
    function getImageUrl(name) {
        return new URL(`/src/assets/${name}.png`, import.meta.url).href
    }

    function base64ToBlob(base64Data) {
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: "image/png" });
    }

    function imageUrlToBase64(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
        
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
            
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
            
                // Get the base64 data URL
                const base64Data = canvas.toDataURL("image/png"); // You can specify the image format here
            
                // Resolve the Promise with the base64 data URL
                resolve(base64Data);
            };
        
            img.onerror = function () {
                reject(new Error("Failed to load image."));
            };
        
            img.src = imageUrl;
        });
    }
    

    const imageToShare = useRef(null)
    const output = useRef(null)

    async function share(){
        const imageUrl = imageToShare.current.src;

        // Usage:
        const base64Data = await imageUrlToBase64(imageUrl);

        // `base64Data` contains the base64-encoded image data
        const imageBlob = base64ToBlob(base64Data);
        const imageFile = new File([imageBlob], "test.png", { type: "image/png" });

        // Check if the browser supports the Web Share API
        if (!navigator.canShare) return alert("您的瀏覽器不支援分享功能")

        // Check if sharing files is supported
        if (navigator.canShare({ files: [imageFile] })) {
            try {
                navigator.share({
                    files: [imageFile],
                    title: "Image",
                    text: "Sharing a beautiful image",
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

    return (
    <>
        ----------ig test-----------
        <br />
        <br />
        <img src={getImageUrl('dialog')} alt="" width={100} ref={imageToShare} className='inline-block'/>
        <br />
        <br />
        <button className='border border-slate-700 p-3' onClick={share} type="button">Share this image!</button>
        <br />
        <br />
        output: <output ref={output}></output>
        <br />
        <br />
        ----------facebook test-----------
        <br />
        <br />
        isLocal: {isLocal.toString()}
        <br />
        <br />
        window.location.href: {window.location.href}
        <br />
        <br />
        uri: {uri}
        <br />
        <br />
        {/* facebook */}
        <div className="fb-share-button border rounded-lg w-1/2 py-1.5" data-href={resultPageUri} data-layout="" data-size="">
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${resultPageUri}`} className="fb-xfbml-parse-ignore flex items-center justify-center">
                {/* <img src={getImageUrl('result-element', 'fb')} alt="facebook" className='w-8 h-8' /> */}
                <span className='mx-2'>Facebook</span>
            </a>
        </div>
        <br />
        <br />
        <div>NODE_ENV: {process.env.NODE_ENV}</div>
    </>
    )
}
