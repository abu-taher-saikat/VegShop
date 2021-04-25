import React from 'react';
import NewArrivelTab from './NewArrivelTab';

const NewArraivle = () => {


    return (
        <div className="NewArraivle">
            <div className="text__section">
                <h1 className="heading">New Arrivals Products</h1>
                <p className="description">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
                </p>
            </div>

            {/* Tab started here */}
            <div className="tab__section">
                <NewArrivelTab></NewArrivelTab>
            </div>
        </div>
    )
}

export default NewArraivle
