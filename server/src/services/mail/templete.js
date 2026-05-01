export const emailVerificationTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
      </head>

      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
        <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:30px; text-align:center; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
          
          <h2 style="color:#333;">Email Verification</h2>

          <p style="font-size:16px; color:#555;">
            Your verification code is:
          </p>

          <div style="display:inline-block; padding:12px 24px; background-color:#007BFF; color:#fff; font-size:28px; font-weight:bold; border-radius:6px; letter-spacing:2px;">
            ${otp}
          </div>

          <p style="font-size:14px; color:#999; margin-top:20px;">
            This code will expire in 10 minutes.
          </p>

        </div>
      </body>
    </html>
  `;
};

export const sendforgotPasswordLinkEmailTemplate = (link) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
      </head>

      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
        <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:30px; text-align:center; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">

          <h2 style="color:#333;">Password Reset Request</h2>

          <p style="font-size:16px; color:#555;">
            We received a request to reset your password. Click the button below to reset it.
          </p>

          <a 
            href="${link}" 
            style="display:inline-block; padding:12px 24px; background-color:#28a745; color:#fff; font-size:16px; font-weight:bold; border-radius:6px; text-decoration:none;"
          >
            Reset Password
          </a>

          <p style="font-size:14px; color:#999; margin-top:20px;">
            ${link}
          </p>
          <p style="font-size:14px; color:#999; margin-top:20px;">
            If you did not request a password reset, please ignore this email.
          </p>

        </div>
      </body>
    </html>
  `;
};