/** upMove  返回给父级的类型  */
type MiColResizeUpMoveType = {
  originPosition: {
    pageX: number;
    pageY: number;
  };
  currentPosition: {
    pageX: number;
    pageY: number;
  };
  difference: number[];
};

export { MiColResizeUpMoveType };
