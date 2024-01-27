import React, { useState, useEffect } from 'react';
import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.mjs`;

function PdfToImageConverter({ pdfUrl, imageRender, onImageClick, fallback }) {
    const [pageImages, setPageImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const convertToImages = async () => {
            try {

                const pdf = await getDocument(pdfUrl).promise;

                const images = [];
                for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                    const page = await pdf.getPage(pageNumber);
                    const scale = 1.5; // You can adjust the scale as needed for image quality.

                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderContext = {
                        canvasContext: context,
                        viewport,
                    };

                    await page.render(renderContext).promise;
                    const image = canvas.toDataURL('image/jpeg'); // You can use other formats like 'image/png'

                    images.push(image);
                }

                setPageImages(images);
                setLoading(false);
            } catch (e) {
                fallback();
                setLoading(false);
            }

        };

        convertToImages();
    }, [pdfUrl]);

    return (
        <div>
            {
                loading ? <div>Loading...</div> : null
            }
            {pageImages.map((image, index) => (
                <> {imageRender({ src: image, key: index, alt: `Page ${index + 1}`, onClick: (e) => onImageClick(index + 1, e) })} </>
                // <imageRender src={image} key={index} alt={`Page ${index + 1}`} />
                // <img key={index} src={image} alt={`Page ${index + 1}`} />
            ))}
        </div>
    );
}

export default PdfToImageConverter;