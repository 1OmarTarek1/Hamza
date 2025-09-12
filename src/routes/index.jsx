import { Routes, Route } from "react-router-dom";
import { HomePage, AboutUsPage, GalleryPage, ContactPage, InventoryPage } from "../Pages";
import CustomersPage from "../Pages/CustomersPage/CustomersPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AboutPage" element={<AboutUsPage />} />
      <Route path="/GalleryPage" element={<GalleryPage />} />
      <Route path="/InventoryPage" element={<InventoryPage />} />
      <Route path="/Customers" element={<CustomersPage />} />
      <Route path="/ContactPage" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

// You can add more route-related utilities or constants here if needed
