"use client";

import React from 'react';
import { BiPrinter } from 'react-icons/bi';


const PrintArticle = () => {
    return (
        <button className='flex items-center gap-2 text-red-700' onClick={() => window.print()}>
            <BiPrinter className="text-xl" /> Print
        </button>
    );
};

export default PrintArticle;