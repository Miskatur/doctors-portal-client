import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png'
const Footer = () => {
    return (
        <div className='bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${footer})` }}>
            <footer className="footer lg:flex justify-between px-10 pt-12 pb-6">
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Emergency Checkup</Link>
                    <Link className="link link-hover">Monthly Checkup</Link>
                    <Link className="link link-hover">Weekly Checkup</Link>
                    <Link className="link link-hover">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">ORAL HEALTH</span>
                    <Link className="link link-hover">Fluoride Treatment</Link>
                    <Link className="link link-hover">Cavity Filling</Link>
                    <Link className="link link-hover">Teath Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">OUR ADDRESS</span>
                    <Link className="link link-hover">New York - 101010 Hudson</Link>
                </div>
            </footer>
            <p className='text-center my-10'>Copyright 2022 All Rights Reserved</p>
        </div>
    );
};

export default Footer;