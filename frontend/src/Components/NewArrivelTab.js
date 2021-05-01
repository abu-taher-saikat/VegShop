import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import items from '../assets/data';
import img6 from '../assets/images/files/bread.png';
import img5 from '../assets/images/files/drinks.png';
import img2 from '../assets/images/files/fruit.png';
import img3 from '../assets/images/files/meat.png';
import img4 from '../assets/images/files/salad.png';
import img1 from '../assets/images/files/veg.png';


const NewArrivelTab = () => {
    const [selected, setSelected] = useState("vegetable");
    


    const buttons = [
        {
          name: "vegetable",
          image:
            `${img1}`
        },
        {
          name: "fruits",
          image: img2
        },
        {
          name: "fish&meats",
          image: img3
        },
        {
          name: "salad",
          image: img4
        },
        {
          name: "drink",
          image: img5
        },
        {
          name: "bread",
          image: img6
        },
      ];

    const filteredItems = items.filter(
        (item) => item.category === selected
      );

      
    return (
        <div className="newArriavleTab">
            <div className="content">
                <ul className>
                    {buttons.map((button) => (
                        <li
                            onClick={() => {
                            setSelected(button.name);
                            console.log(button);
                            }}
                        >   <Link to="">
                                <Image src={button.image} alt="" />
                                <span className="buttonName">{button.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>




                <div className="container">
                    {filteredItems.map((item) => (
                    <div className="row mb-5 container">
                        <div className="col-6 project-description" data-aos="fade-left">
                            <div className="description-div  p-4">
                                <h5>
                                <b>{item.title}</b>
                                </h5>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                </div>
                </div>
            </div>        
    )
}

export default NewArrivelTab
