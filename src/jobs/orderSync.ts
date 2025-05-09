import cron from "node-cron";
import { getWalmartToken } from "../helpers/utils";
import { syncOrders } from "../services/walmart.service";

export const startOrderSyncJob = () => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("Syncing Walmart orders...");

    const token = await getWalmartToken();
    await syncOrders(token)
      .then(() => {
        console.log("Walmart orders synced successfully.");
      })
      .catch((error) => {
        console.error("Error syncing Walmart orders:", error);
      });
  });
};
