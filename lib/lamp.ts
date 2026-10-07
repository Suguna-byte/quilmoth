// Shared, mutable lamp position. Lives outside React on purpose:
// the pointer moves ~60 times a second and nothing needs to re-render when it does.
// <Lamp/> writes to it; <MothCanvas/> reads it every animation frame.
export const lamp = {
  x: -9999,
  y: -9999,
  lastMove: 0,
};
