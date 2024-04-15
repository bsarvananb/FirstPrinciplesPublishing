import "@testing-library/jest-dom";

if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}

global.HTMLCanvasElement.prototype.getContext = () => {
  // Mock implementation
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => {},
    putImageData: () => {},
    createImageData: () => {},
    setTransform: () => {},
    resetTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => {
      return { width: 0 };
    },
    transform: () => {},
    rect: () => {},
    clip: () => {},
  };
};
