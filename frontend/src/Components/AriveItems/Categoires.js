import React from 'react';
import { Image } from 'react-bootstrap';
// import img1 from '../../assets/images/files/veg.png';

const Categoires = ({categories, filterItems, btnImage}) => {
    // console.log("categories theke ashteche")
    // let image = btnImage.btnImage
    // console.log(image.toString())
    return (
        <div className="btn-container">
            {categories.map((category, index)=>{

                return(
    
                    <div 
                        // type="button"
                        className="d-flex filter-btn"
                        key={index}
                        onClick={() => filterItems(category)}
                        >   {category}
                        <div className="img">
                            {/* <img src={image} alt=""/> */}
                            <Image src={`${btnImage.btnImage}`} alt="src error"/>
                        </div>
                        
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Categoires
