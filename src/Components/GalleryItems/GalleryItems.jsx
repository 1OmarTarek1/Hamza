import { useState } from 'react';
import AOS from 'aos';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './GalleryItems.css';

const GalleryItems = ({ items, shuffle = false, slice = false, sliceCount = "auto" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    let displayedItems = [...items];

    // Shuffle
    if (shuffle) {
        displayedItems = displayedItems
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    }

    // Slice
    if (slice) {
        displayedItems = sliceCount === "auto" 
            ? displayedItems 
            : displayedItems.slice(0, sliceCount);
    }

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <div className="GalleryItemsContainerChild">
                {displayedItems.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="imgWrapper"
                        onClick={() => openLightbox(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={item.img}
                            alt={item.title || `Item ${item.id}`}
                            height={item.height}
                            loading="lazy"
                            draggable={false}
                        />
                        <div className="imgTitle">
                            {item.title || `Item ${item.id}`}
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                slides={displayedItems.map(item => ({ src: item.img }))}
                index={currentIndex}
                controller={{ closeOnBackdropClick: true }}   // ✅ هنا
                carousel={{ imageFit: "contain" }}            // يخلي الصورة ما تغطيش الشاشة كلها
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.79)" },
                    image: { maxWidth: "90%", maxHeight: "90%" } // يسيب مساحة للباك دروب
                }}
            />


        </>
    );
};

export default GalleryItems;