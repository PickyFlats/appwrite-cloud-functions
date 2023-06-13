import { Client, Databases, ID } from "appwrite";
import { sendEmailNotification } from "./email";
import { tourRequestConfirmationTemplate } from "./template";

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

    /// fetch user profile
    const userProfile = await databases.getDocument(
      DATABASE_ID,
      "647c063d490ee20fd175",
      requestedTour.userID
    );

    // fetch seller profile
    const sellerProfile = await databases.getDocument(
      DATABASE_ID,
      "647c063d490ee20fd175",
      requestedTour.sellerID
    );

    // fetch listing
    const listing = await databases.getDocument(
      DATABASE_ID,
      "listings",
      requestedTour.listingID
    );

    const tourTemplate = tourRequestConfirmationTemplate(
      sellerProfile,
      userProfile,
      requestedTour,
      listing
    );

    await sendEmailNotification(
      sellerProfile?.email,
      "Tour Request Confirmation - PickyFlats",
      tourTemplate
    );

    // const trigger = req.variables.APPWRITE_FUNCTION_TRIGGER;

    // ! save notification in db
    await databases.createDocument(DATABASE_ID, "notifications", ID.unique(), {
      type: "tour_requested",
      userID: sellerProfile?.$id, // notification receiver
      listingId: requestedTour.listingID,
    });

    res.json({ message: "Tour Notification Created!" });
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

export default createNotification;
