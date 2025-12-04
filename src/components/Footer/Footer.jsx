import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <section className="relative overflow-hidden py-3 bg-gray-400 border-t-2 border-t-blac flex justify-evenly items-center">
            <div className="mb-1 inline-flex items-center">
                <Logo widht='50px' className='rounded-xl' />
            </div>
            <div>
                <p className="text-sm text-gray-600">
                    &copy; Copyright 2023. All Rights Reserved by POST.IO
                </p>
            </div>
        </section>
    )
}

export default Footer
