import { useRef } from 'react'
import './App.css'

function App() {
  function getImageUrl(name) {
    return new URL(`/src/assets/${name}.png`, import.meta.url).href
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

  return (
    <>
      <div>
        <img src={getImageUrl('dialog')} alt="" width={100} ref={imageToShare}/>
      </div>
      <button onClick={share} type="button">Share this image!</button>
      <br />
      <output ref={output}></output>

      <div>Vite + React: {process.env.NODE_ENV}</div>
    </>
  )
}

export default App
