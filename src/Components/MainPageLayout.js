import React from 'react';
import Navbar from './Navbar';
import Title from './Title';

function MainPageLayout({childern}) {
    return (
        <div>
            <Title title="Box Office"  subtitle="Are you looking for movie or an actor ?"/>
            <Navbar/>
            {childern}
        </div>
    )
}

export default MainPageLayout
