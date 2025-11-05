import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoImagesOutline } from "react-icons/io5";
import HamburgerBtn from '../../Components/HamburgerBtn/HamburgerBtn';
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import logo from "../../Assets/Images/Logo/logo2.png";
import { AiOutlineShop } from 'react-icons/ai';
import './navbar.css';
import { GrDocumentPerformance } from 'react-icons/gr';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest('.navMenu') &&  
        !e.target.closest('.hamburger')  
      ) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${show ? 'navbarShow' : 'navbarHide'}`}>
      <div className="navContainer">
        {/* Logo */}
        <NavLink to="/" className="navLogo">
          <img src={logo} alt="Logo" className="logoImg" />
          <span className="nayalText">
            متجر الستائر
            <br />
            <span className="nayalTextSubtitle">خصوصية اناقة و شياكة</span>
          </span>
        </NavLink>

        {/* Links */}
        <ul className={`navMenu ${isOpen ? 'active' : ''}`}>
          <li className="navItem">
            <NavLink to="/" end className="navLink" onClick={() => setIsOpen(false)}>
              <span className="linkIcn"><IoHomeOutline /></span>
              <span>الرئيسية</span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/GalleryPage" className="navLink" onClick={() => setIsOpen(false)}>
              <span className="linkIcn"><IoImagesOutline /></span>
              <span>منتجاتنا</span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/InventoryPage" className="navLink" onClick={() => setIsOpen(false)}>
              <span className="linkIcn"><AiOutlineShop size={21}/></span>
              <span>المخزون</span>
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/Sales" className="navLink" onClick={() => setIsOpen(false)}>
              <span className="linkIcn">
                <GrDocumentPerformance size={18}/>
              </span>
              <span>المبيعات</span>
            </NavLink>
          </li>
        </ul>

        {/* Right side */}
        <div className="navActions">
          <ThemeToggle />
          <div className="hamburger">
            <HamburgerBtn 
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
              className="hamburger" 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
