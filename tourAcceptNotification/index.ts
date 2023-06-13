import { Client, Databases, ID, Query } from "appwrite";
import { sendEmailNotification } from "./email";
import { tourAcceptedTemplate } from "./template";

const appwrite = new Client();

export const databases = new Databases(appwrite);

const DATABASE_ID = "pickyflats_web";

appwrite
  .setEndpoint("https://cloud.appwrite.io/v1")
  // .setEndpoint("https://localhost/v1") // !not work on localhost
  .setProject("pickyflats-dev");

async function createNotification(req, res) {
  try {
    const payload =
      req.payload ||
      "No payload provided. Add custom data when executing function.";
    const { tourID } = JSON.parse(payload);

    const requestedTour = await databases.getDocument(
      DATABASE_ID,
      "tourRequests",
      tourID
    );
    if (!requestedTour) {
      return res.status(400).json({ message: "Tour validation failed" });
    }

    /// fetch profile
    const userProfile = await databases.getDocument(
      DATABASE_ID,
      "647c063d490ee20fd175",
      requestedTour.userID
    );

    // fetch listing
    const listing = await databases.getDocument(
      DATABASE_ID,
      "listings",
      requestedTour.listingID
    );

    // prepare email template
    const tourTemplate = tourAcceptedTemplate(
      userProfile?.name,
      requestedTour,
      listing
    );

    await sendEmailNotification(
      userProfile?.email, //!replace // demo// "its0coder@gmail.com",
      "Tour Request Confirmed - PickyFlats",
      tourTemplate
    );

    // ! save notification in db
    await databases.createDocument(DATABASE_ID, "notifications", ID.unique(), {
      type: "tour_accepted",
      userID: userProfile?.$id, // notification receiver
      listingId: requestedTour.listingID,
    });

    res.json({ message: "Tour Notification Created!" });
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

export default createNotification;
