import { Routes, Route } from "react-router-dom";
import { HomePage, AboutUsPage, GalleryPage, ContactPage, InventoryPage, SalesPage } from "../Pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AboutPage" element={<AboutUsPage />} />
      <Route path="/GalleryPage" element={<GalleryPage />} />
      <Route path="/InventoryPage" element={<InventoryPage />} />
      <Route path="/Sales" element={<SalesPage />} />
      <Route path="/ContactPage" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

// You can add more route-related utilities or constants here if needed
