import dotenv from "dotenv";
import twilio from 'twilio';

dotenv.config();

const client=new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to,message) {
    try {
        const response=await client.message.create({
            body:message,
            from:process.env.TWILIO_PHONE_NUMBER,
            to: to,
        })
        console.log('SMS sent',response.sid);
        return {success:true,sid:response.sid};
    } catch (error) {
        console.error('Error sending SMS:', error);
        return { success: false, error: error.message };
    }
};
export default sendSMS;