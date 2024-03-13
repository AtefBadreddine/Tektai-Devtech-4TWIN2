import React from 'react';
import { EvervaultCard } from './hovercard';

function FeaturesBlocks() {
  return (
      <section className="relative bg-white">

        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h2 className="h2 mb-4">How <span className="px-2 text-white bg-blue-600 rounded ">TektAI</span> works</h2>
              <p className="text-xl text-gray-600"><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">TektAI</span> simplifies the process of participating in data science competitions, accessing datasets, and collaborating with peers through its user-friendly platform</p>
            </div>

            {/* Items */}
            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            <EvervaultCard  text="Explore and download datasets"className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>
            <EvervaultCard  text="interactive data analysis"className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>
            <EvervaultCard  text="Showcase your projects"className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>
            <EvervaultCard  text="Community"className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>
            <EvervaultCard  text="gain knowledge and hone your data science expertise."className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>
            <EvervaultCard  text="Participate in competitions"className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full w-75"></EvervaultCard>

            </div>

          </div>
        </div>
      </section>
  );
}

export default FeaturesBlocks;
