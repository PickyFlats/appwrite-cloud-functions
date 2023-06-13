export const tourRequestConfirmationTemplate = (
  seller,
  user,
  tourRequest,
  listing
) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Tour Request Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
    
        <h2>Tour Request Confirmation</h2>
        <p>Dear ${seller?.name},</p>
        <p>A tour request has been submitted for one of your listings on PickyFlats. Here are the details:</p>
    
        <table>
            <tr>
                <td><strong>Address:</strong></td>
                <td>${listing?.flatStreet1} ${
    listing?.flatStreet2 ? `, ${listing?.flatStreet2}` : ""
  }</td>
            </tr>
            <tr>
                <td><strong>Tour Date:</strong></td>
                <td>${new Date(tourRequest?.pickedDate).toLocaleString(
                  "en-US"
                )}</td>
            </tr>
            <tr>
                <td><strong>User Name:</strong></td>
                <td>${user?.name}</td>
            </tr>
            <tr>
                <td><strong>User Email:</strong></td>
                <td>${user?.email}</td>
            </tr>
            <tr>
                <td><strong>Additional Notes:</strong></td>
                <td>${tourRequest?.note}</td>
            </tr>
        </table>
    
        <p>Please review the tour request and contact the user to confirm the tour details.</p>
    
        <p>Thank you for using PickyFlats!</p>
    
        <p>Best regards,<br>
        The PickyFlats Team</p>
    
    </body>
    </html>
    `;
};
