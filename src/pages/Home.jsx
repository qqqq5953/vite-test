import { useRef } from 'react'

export default function Home() {
    function getImageUrl(dir, name, extenstion = 'png') {
        return new URL(`/src/assets/${dir}/${name}.${extenstion}`, import.meta.url).href
    }

    const imageToShare = useRef(null)
    const output = useRef(null)

    async function share(){
    const imageUrl = imageToShare.current.src;
    console.log('imageUrl',imageUrl);

    // Fetch the image as a Blob
    const imageBlob = await fetch(imageUrl).then((response) => response.blob());

    console.log('imageBlob',imageBlob);

    // Create a File object from the Blob (you can specify a custom file name)
    const imageFile = new File([imageBlob], "test.png", { type: "image/png" });

    console.log('imageFile',imageFile);


    // Check if the browser supports the Web Share API
    if (!navigator.canShare) {
        output.current.textContent = `Your browser doesn't support the Web Share API.`;
        return;
    }

    // Check if sharing files is supported
    if (navigator.canShare({ files: [imageFile] })) {
        try {
        await navigator.share({
            files: [imageFile],
            title: "Image",
            text: "Sharing a beautiful image",
        });
        output.current.textContent = "Shared!";
        } catch (error) {
        output.current.textContent = `Error: ${error.message}`;
        }
    } else {
        output.current.textContent = `Your system doesn't support sharing these files.`;
    }
    }

    // facebook
    const isLocal = window.location.protocol.includes('http')
    const uri = isLocal ? "https://www.gaia.net/tc" : window.location.href
    const resultPageUri = encodeURI(uri)

    return (
    <>
        <img src={getImageUrl('dialog')} alt="" width={100} ref={imageToShare} className='inline-block'/>
        <br />
        <br />
        <button className='border border-slate-700 p-3' onClick={share} type="button">Share this image!</button>
        <br />
        <br />
        output: <output ref={output}></output>
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
