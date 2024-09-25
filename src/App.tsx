import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    imageUrl: string;
    position: { x: number; y: number };
    rotation: number;
  }>({
    visible: false,
    imageUrl: "",
    position: { x: 0, y: 0 },
    rotation: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (tooltip.visible) {
        setTooltip((prev) => ({
          ...prev,
          position: { x: event.clientX + 10, y: event.clientY + 10 },
        }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tooltip.visible]);

  const handleMouseEnter = (
    imageUrl: string,
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    setTooltip({
      visible: true,
      imageUrl,
      position: { x: event.clientX + 10, y: event.clientY + 10 },
      rotation: Math.random() * 20 + 5,
    });
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setTooltip({ ...tooltip, visible: false });
    }, 10);
  };

  return (
    <div className="bg-gray-950 text-white flex justify-center items-center min-h-screen relative">
      <div>
        <h1 className="ml-1 mb-5">Work</h1>
        <div className="flex h-full">
          <span className="w-[2px] bg-white mx-2"></span>
          <div className="flex flex-col gap-1">
            <p
              className="cursor-pointer p-3 hover:cursor-pointer w-fit "
              onMouseEnter={(e) =>
                handleMouseEnter(
                  "https://framerusercontent.com/images/ehEX2nbVFGtixrXSDlodiQOxE.png",
                  e
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              a love letter to SVGs
            </p>
            <p
              className="cursor-pointer p-3 hover:cursor-pointer w-fit"
              onMouseEnter={(e) =>
                handleMouseEnter(
                  "https://framerusercontent.com/images/yF5g94FO1Q5qdk5fMP3TxkSJGA.jpg",
                  e
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              in a year
            </p>
            <p
              className="cursor-pointer p-3 hover:cursor-pointer w-fit"
              onMouseEnter={(e) =>
                handleMouseEnter(
                  "https://framerusercontent.com/images/mMfQUgDA3H7Z89QViDOKT4mRcA.jpg",
                  e
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              you might as well enjoy it
            </p>
          </div>
        </div>
      </div>

      {tooltip.visible && (
        <div
          className="absolute bg-gray-800 rounded transition-transform duration-500 scale-up"
          style={{
            top: tooltip.position.y,
            left: tooltip.position.x,
            transform: `rotate(${tooltip.rotation}deg) translate(10%, 10%)`,
            transformOrigin: "top left", // Scale from top left
          }}
        >
          <img
            src={tooltip.imageUrl}
            alt="Tooltip"
            className=" w-48 h-28 object-cover rounded-lg shadow-[0px_7px_30px_5px_#4848488e]"
          />
        </div>
      )}
    </div>
  );
};

export default App;
