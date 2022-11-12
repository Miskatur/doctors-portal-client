import React from 'react';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import ContactUs from '../ContactUs/ContactUs';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import SecondBanner from '../SecondBannerr/SecondBanner';
import Services from '../Services/Services';
import Testomonial from '../Testomonial/Testomonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Contact></Contact>
            <Services></Services>
            <SecondBanner></SecondBanner>
            <MakeAppointment></MakeAppointment>
            <Testomonial></Testomonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;