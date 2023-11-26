import csvParser from "csv-parser";
import { GraphQLBoolean } from "graphql";
import { Producer } from "../../models/producer";
import { Product } from "../../models/product";
import * as https from "https";

// interface CSVRowData {
//   vintage: string;
//   productName: string;
//   producer: string;
//   country: string;
//   region: string;
// }

export const processCSV = {
  type: GraphQLBoolean,
  resolve: async () => {
    const BATCH_SIZE = 100;
    const CSV_URL = process.env.CSV_URL || "";
    let batch: any[] = [];

    async function batchInsert(): Promise<void> {
      try {
        // Implement your batch insert logic here
        console.log("Batch insert started with count of: ", batch.length);

        if (batch.length > 0) {
          await Producer.bulkWrite(
            await Promise.all(
              batch.map(async (row) => {
                return {
                  updateOne: {
                    filter: {
                      name: row.producer,
                      country: row.country,
                      region: row.region,
                    },
                    update: { $set: row },
                    upsert: true,
                  },
                };
              })
            )
          );

          await Product.bulkWrite(
            await Promise.all(
              batch.map(async (row) => {
                const producer = await Producer.findOne({
                  name: row.producer,
                });

                return {
                  updateOne: {
                    filter: {
                      vintage: row.vintage,
                      name: row.productName,
                      producerId: producer?._id,
                    },
                    update: { $set: row },
                    upsert: true,
                  },
                };
              })
            )
          );
        }

        console.log("Batch insert completed with count of: ", batch.length);
      } catch (error: any) {
        console.error("Error during batch insert:", error.message);
      } 
    }

    // const batchInsert = async (batch: CSVRowData[]) => {
    //   if (isBatchInserting || batch.length === 0) {
    //     return;
    //   }

    //   isBatchInserting = true;
    //   console.log(`Batch insert started with count of: ${batch.length}`);

    //   if (batch.length > 0) {
    //     await Producer.bulkWrite(
    //       await Promise.all(
    //         batch.map(async (row) => {
    //           return {
    //             updateOne: {
    //               filter: {
    //                 name: row.producer,
    //                 country: row.country,
    //                 region: row.region,
    //               },
    //               update: { $set: row },
    //               upsert: true,
    //             },
    //           };
    //         })
    //       )
    //     );

    //     await Product.bulkWrite(
    //       await Promise.all(
    //         batch.map(async (row) => {
    //           const producer = await Producer.findOne({
    //             name: row.producer,
    //           });

    //           return {
    //             updateOne: {
    //               filter: {
    //                 vintage: row.vintage,
    //                 name: row.productName,
    //                 producerId: producer?._id,
    //               },
    //               update: { $set: row },
    //               upsert: true,
    //             },
    //           };
    //         })
    //       )
    //     );
    //   }

    //   console.log(`Batch insert completed with count of: ${batch.length}`);
    //   batch.length = 0;
    //   isBatchInserting = false;
    // };

    try {
      const req = https.get(CSV_URL, (res) => {
        res
          .pipe(csvParser())
          .on("data", async (row) => {
            batch.push({
              vintage: row["Vintage"],
              productName: row["Product Name"],
              producer: row["Producer"],
              country: row["Country"],
              region: row["Region"],
            });

            if (batch.length === BATCH_SIZE) {
              await new Promise<void>((resolve) => {
                batchInsert().then(() => {
                  // Clear the batch array after batch insert is completed
                  batch.length = 0;
                  resolve();
                });
              });
            }
          })

          .on("end", async () => {
            if (batch.length > 0) {
              await batchInsert();
              console.log("CSV processing completed.");
            }
          })
          .on("error", (error) => {
            console.error("Error during CSV processing:", error.message);
          });
      });

      req.on("error", (error) => {
        console.error("Error fetching CSV from URL:", error.message);
      });

      req.end();

      //   stream
      //     .pipe(csvParser())
      //     .on("data", async (row) => {
      //       batch.push({
      //         vintage: row["Vintage"],
      //         productName: row["Product Name"],
      //         producer: row["Producer"],
      //         country: row["Country"],
      //         region: row["Region"],
      //       });

      //       if (batch.length === batchSize) {
      //         await batchInsert(batch);
      //         batch = [];
      //       }
      //     })
      //     .on("end", async () => {
      //       await batchInsert(batch);
      //       console.log("CSV processing completed.");
      //     })
      //     .on("error", (error) => {
      //       console.error("Error during CSV processing:", error.message);
      //     });

      return true;
    } catch (error) {
      console.error("Error processing CSV:", error);
      return false;
    }
  },
};
