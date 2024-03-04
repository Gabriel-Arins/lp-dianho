'use client'
import React, { useState, useEffect } from 'react';

const Header = () => {
    const [time, setTime] = useState(5 * 60); // tempo inicial em segundos

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // limpar o intervalo quando o componente for desmontado
    }, []);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className=" font-mono font-extrabold text-3x items-center text-center py-4">
            <h1 className="hidden sm:flex sm:justify-center text-white sm:text-2xl">
              PROMOÇÃO EXCLUSIVA SCRUMDOWN & DIANHO - POR TEMPO LIMITADO!
              </h1>
            <h1 className="text-white text-xl sm:hidden ">
              PROMOÇÃO EXCLUSIVA SCRUMDOWN & DIANHO 
              </h1>
            <h1 className="text-white text-lg sm:hidden ">
             POR TEMPO LIMITADO!
              </h1>
            <div>
              <h1 className="text-yellow-300 text-4xl sm:text-5xl">

              {minutes}mins e {seconds < 10 ? '0' + seconds : seconds}segs
              </h1>
              </div>
        </div>
    );
}

export default Header;