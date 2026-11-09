import { escapeHtml, validateContact } from "../config/contactValidation.js";
import transporter from "../config/email.js";
import logger from "../config/logger.js";



export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

  
    if (website) {
      return res.status(200).json({
        success: true,
        message: "Message received successfully",
      });
    }

  
    const fields = [name, email, subject, message];

    if (!fields.every((field) => typeof field === "string")) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
      });
    }

  
    const errors = validateContact({  name,  email,  subject,  message, });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please check your form details",
        errors,
      });
    }

    await transporter.sendMail({
      from: `"Turn Support" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email.trim(),

      subject: `📩 New Contact Message: ${subject.trim()}`,

      text: `
      New Contact Message - Turn

      Name: ${name}
      Email: ${email}
      Subject: ${subject}

      Message:
      ${message}
        `,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body style="margin:0; padding:30px 10px; background:#f3f6fb; font-family:Arial,Helvetica,sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                  style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden;">

                  <!-- HEADER -->
                  <tr>
                    <td style="background:#173454; padding:35px 30px; text-align:center;">

                      <h1 style="margin:0; color:#ffffff; font-size:30px; letter-spacing:1px;">
                        TURN
                      </h1>

                      <p style="margin:10px 0 0; color:#cbdcf0; font-size:14px;">
                        Customer Support
                      </p>

                    </td>
                  </tr>

                  <!-- TITLE -->
                  <tr>
                    <td style="padding:30px 30px 15px;">

                      <div style="display:inline-block; padding:8px 14px; background:#eaf2ff; color:#245b9b; border-radius:20px; font-size:12px; font-weight:bold;">
                        NEW CONTACT MESSAGE
                      </div>

                      <h2 style="color:#173454; font-size:24px; margin:20px 0 10px;">
                        You've received a new message!
                      </h2>

                      <p style="color:#64748b; font-size:14px; line-height:1.7; margin:0;">
                        Someone has contacted your Turn website.
                        Here are the details of their enquiry.
                      </p>

                    </td>
                  </tr>

                  <!-- USER DETAILS -->
                  <tr>
                    <td style="padding:15px 30px;">

                      <table width="100%" cellpadding="0" cellspacing="0" border="0"
                        style="background:#f8fafc; border:1px solid #e5eaf1; border-radius:12px;">

                        <tr>
                          <td style="padding:18px;">

                            <p style="margin:0 0 6px; color:#94a3b8; font-size:11px; font-weight:bold;">
                              FULL NAME
                            </p>

                            <p style="margin:0; color:#173454; font-size:15px; font-weight:bold;">
                              ${escapeHtml(name)}
                            </p>

                            <hr style="border:0; border-top:1px solid #e2e8f0; margin:16px 0;">

                            <p style="margin:0 0 6px; color:#94a3b8; font-size:11px; font-weight:bold;">
                              EMAIL ADDRESS
                            </p>

                            <p style="margin:0; color:#2563eb; font-size:15px;">
                              <a href="mailto:${encodeURIComponent(email.trim())}" style="color:#2563eb; text-decoration:none;">
                                ${escapeHtml(email)}
                              </a>
                            </p>

                            <hr style="border:0; border-top:1px solid #e2e8f0; margin:16px 0;">

                            <p style="margin:0 0 6px; color:#94a3b8; font-size:11px; font-weight:bold;">
                              SUBJECT
                            </p>

                            <p style="margin:0; color:#173454; font-size:15px; font-weight:bold;">
                              ${escapeHtml(subject)}
                            </p>

                          </td>
                        </tr>

                      </table>

                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td style="padding:15px 30px 30px;">

                      <h3 style="margin:0 0 12px; color:#173454; font-size:17px;">
                        Message Details
                      </h3>

                      <div style="background:#f8fafc; border-left:4px solid #2563eb; border-radius:8px; padding:20px;">

                        <p style="margin:0; color:#475569; font-size:14px; line-height:1.8; white-space:pre-wrap; overflow-wrap:anywhere;">
                          ${escapeHtml(message)}
                        </p>

                      </div>

                      <div style="text-align:center; margin-top:28px;">

                        <a href="mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(`Re: ${subject.trim()}`)}"
                          style="display:inline-block; background:#173454; color:#ffffff; padding:14px 28px; border-radius:8px; font-size:14px; font-weight:bold; text-decoration:none;">
                          Reply to Customer →
                        </a>

                      </div>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#f1f5f9; padding:24px; text-align:center;">

                      <p style="margin:0; color:#173454; font-size:16px; font-weight:bold;">
                        TURN
                      </p>

                      <p style="margin:8px 0; color:#64748b; font-size:12px;">
                        Making your experience better, one interaction at a time.
                      </p>

                      <p style="margin:0; color:#94a3b8; font-size:11px;">
                        This email was automatically generated from your website contact form.
                      </p>

                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
        `,
    });

    logger.info("Contact message sent successfully");

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });

  } catch (error) {
    logger.error("Contact email sending failed", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to send message. Please try again later.",
    });
  }
};