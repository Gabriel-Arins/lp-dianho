'use client'
import Image from 'next/image';
import dianho from '../public/dianho.png';
import scrumdown from '../public/1.png';
import { useState } from 'react';
import Modal from '@/components/popup-checkout';


const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className=" text-white ">
      <div className="container mx-auto flex-col flex sm:flex-row items-start pt-4 justify-between">
        <div className="w-full  sm:w-1/2 sm:pr-8 px-3 sm:px-0">
          <h1 className="ml-5 text-4xl font-regular font-mono">
            COMPRE AGORA E GANHE:
          </h1>


          <Image
            src={scrumdown}
            alt="Imagem do Jogo"
            width={500}
            height={500}
            className="sm:w-10/12 sm:-mt-6"
          />

          <div className=" sm:hidden  w-full rounded-md sm:px-5 p-2  ">
            <video width="650" height="500" autoPlay loop muted className="w-full border-4 border-gray-700 rounded-md  sm:h-[80vh]  ">
              <source src="/SOLDADO 360.mp4" type="video/mp4" />
              Desculpe, seu navegador não suporta vídeos incorporados.
            </video>
          </div>
          <div className="text-gray-400 px-2">

            <h1 className="text-2xl  font-mono">
              + UMA ARMA ESPECIAL PERSONALIZADA
            </h1>
            <h1 className="text-2xl  font-mono">
              + 3 PRIMEIROS EPISÓDIOS DO MODO HISTÓRIA GRÁTIS
            </h1>
            <h1 className="text-2xl  font-mono">
              + MODO MULTPLAYER COMPLETO
            </h1>
            <h1 className="text-2xl  font-mono">
              + ACESSO A COMUNIDADE EXCLUSIVA
            </h1>
            <h1 className="text-2xl  font-mono">
              + 60% DE DESCONTO!
            </h1>
          </div>
          <div className="flex flex-col gap-y-1 sm:px-0 px-2 sm:mt-4 mt-8 items-start">

            <h1 className="text-6xl text-red-600 font-extrabold   ">
              DE R$349,99
            </h1>
            <h1 className="text-2xl font-base font-mono font text-green-400 ">
              POR APENAS 12X DE R$14,90
            </h1>
          </div>
          <div className="w-full justify-center">

            <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-yellow-300 hover:bg-yellow-200 hover:border-2 hover:border-yellow-200 font-mono text-black text-3xl font-bold py-4 sm:px-60 w-full rounded">
              COMPRAR AGORA
            </button>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          </div>
        </div>

        <div className="hidden sm:flex sm:w-1/2 w-full rounded-md sm:px-5 p-2 sm:h-[80vh] ">
          <video width="650" height="500" autoPlay loop muted className="w-full border-4 border-gray-700 rounded-md  sm:h-[80vh]  ">
            <source src="/SOLDADO 360.mp4" type="video/mp4" />
            Desculpe, seu navegador não suporta vídeos incorporados.
          </video>
        </div>
      </div>
    </section>
  );
}

export default MainContent;