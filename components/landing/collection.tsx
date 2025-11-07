import React from "react";
import Image from "next/image";

const Collection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white border-t-2 border-b-2 border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen gap-px">
        {/* Left Section - Collection 1 */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/collection-1.jpeg"
            alt="Collection 1"
            fill
            className="object-cover object-center"
            quality={100}
          />
          {/* Dark overlay to reduce image brightness */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* Right Section - Collection 2 */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/collection-2.jpeg"
            alt="Collection 2"
            fill
            className="object-cover object-center"
            quality={100}
          />
          {/* Dark overlay to reduce image brightness */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
