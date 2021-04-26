import React from 'react';
import { Link } from 'react-router-dom';

const BottomFooter = () => {
    return (
        <div className="bottomFooter">
            <div className="container footer-content clearfix">
                <div className="copyright">Copyright © 2021 Segan all rights reserved.</div>
                <div className="links">
                    <ul className="list-inline">
                        <li>
                            <Link to="#">Site map</Link>
                        </li>
                        <li>
                            <Link to="#">Site map</Link>
                        </li>
                        <li>
                            <Link to="#">Site map</Link>
                        </li>
                        <li>
                            <Link to="#">Site map</Link>
                        </li>
                        <li>
                            <Link to="#">Site map</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BottomFooter
