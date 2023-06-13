export const tourAcceptedTemplate = (receiverName, tourRequest, listing) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Request Accepted</title>
  </head>
  
  <body style="font-family: Arial, sans-serif;">
  
    <div style="background-color: #f2f2f2; padding: 20px;">
      <h2 style="color: #333;">Tour Request Accepted</h2>
      <p style="color: #333;">Dear ${receiverName},</p>
      <p style="color: #333;">Your tour request for the flat at ${
        listing?.flatStreet1
      } has been accepted by the seller.</p>
      <p style="color: #333;">Here are the details of your tour:</p>
      <ul style="color: #333;">
        <li>Date: ${new Date(tourRequest?.pickedDate).toLocaleString(
          "en-US"
        )}</li>
        <li>Location: ${listing?.flatStreet1} ${
    listing?.flatStreet2 ? `, ${listing?.flatStreet2}` : ""
  } </li>
        <li>Contact No: ${listing?.sellerContact}</li>
      </ul>
      
      <p style="color: #333;">Thank you for using our platform.</p>
      <p style="color: #333;">Best regards,<br>
        The PickyFlats Team</p>
    </div>
  
  </body>
  </html>
    `;
};
