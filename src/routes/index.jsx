import { Routes, Route } from "react-router-dom";
import { HomePage, GalleryPage, InventoryPage, SalesPage } from "../Pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/GalleryPage" element={<GalleryPage />} />
      <Route path="/InventoryPage" element={<InventoryPage />} />
      <Route path="/Sales" element={<SalesPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

// You can add more route-related utilities or constants here if needed
