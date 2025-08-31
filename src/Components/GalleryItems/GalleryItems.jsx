import { Link } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';
import './GalleryItems.css';


const GalleryItems = ({ items, shuffle = false, slice = false, sliceCount = "auto" }) => {
    let displayedItems = [...items];

    // ✅ Shuffle
    if (shuffle) {
        displayedItems = displayedItems
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    }

    // ✅ Slice
    if (slice) {
        if (sliceCount === "auto") {
            displayedItems = displayedItems.slice(0, displayedItems.length); // يعرض الكل
        } else {
            displayedItems = displayedItems.slice(0, sliceCount); // يعرض العدد اللي تحدده
        }
    }

    useEffect(() => {
        AOS.refresh();
    }, [items]); // ✅ بدل masonryItems
    

    return (
        <div className="GalleryItemsContainerChild" >
            {displayedItems.map((item) => (
                <Link key={item.id} to={item.url} className="imgWrapper">
                    <img
                        src={item.img}
                        alt={`Item ${item.id}`}
                        height={item.height}
                        loading="lazy"
                        draggable={false}
                    />
                    <div className="imgTitle">
                        {item.title || `Item ${item.id}`}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default GalleryItems;
