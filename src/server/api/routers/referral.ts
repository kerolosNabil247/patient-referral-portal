import { router, publicProcedure } from "@/server/api/trpc";
import { referralSchema } from "@/lib/validations/referral.schema";
import { referrals } from "@/server/db/schema";

export const referralRouter = router({
  submitReferral: publicProcedure
    .input(referralSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Insert the referral into the database
        const [insertedReferral] = await ctx.db
          .insert(referrals)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            dateOfBirth: input.dateOfBirth,
            phoneNumber: input.phoneNumber,
            email: input.email || null,
            lawFirmName: input.lawFirmName,
            attorneyName: input.attorneyName,
            attorneyEmail: input.attorneyEmail,
            attorneyPhone: input.attorneyPhone,
            primaryComplaint: input.primaryComplaint,
            preferredLocation: input.preferredLocation,
            appointmentType: input.appointmentType,
          })
          .returning();

        // Calculate estimated follow-up date (24 hours from now)
        const followUpDate = new Date();
        followUpDate.setHours(followUpDate.getHours() + 24);

        const formattedFollowUpDate = followUpDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return {
          success: true,
          referralId: insertedReferral.id,
          message: "Referral submitted successfully!",
          estimatedFollowUp: `Our team will contact the patient within 24 hours (by ${formattedFollowUpDate})`,
        };
      } catch (error) {
        console.error("Error submitting referral:", error);
        throw new Error("Failed to submit referral. Please try again.");
      }
    }),
});
