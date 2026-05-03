declare module "midtrans-client" {
  class Snap {
    constructor(config: { isProduction: boolean; serverKey?: string; clientKey?: string });
    createTransaction(payload: unknown): Promise<{ token: string; redirect_url: string }>;
  }

  const midtransClient: {
    Snap: typeof Snap;
  };

  export default midtransClient;
}
