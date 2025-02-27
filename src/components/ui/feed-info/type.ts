export type FeedInfoUIProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feed: any;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
