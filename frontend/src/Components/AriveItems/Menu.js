import React from 'react';

const Menu = ({items}) => {
    return (
        <div className="section-center">
            {items.map((menuItem) => {
                const {id, title, desc, price} = menuItem;
                return(
                    <article key={id}>
                        <div className="item-info">
                            <header>
                                <h4>{title}</h4>
                                <h4 className="price">${price}</h4>
                            </header>
                            <p className="item-text">{desc}</p>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Menu
