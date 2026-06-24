"use client";

import { useState } from "react";
import {
  AlertDialog,
  Button,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "@heroui/react";
import { Flag } from "@gravity-ui/icons";
import { reportRecipe } from "@/lib/action/recipe";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const REASONS = [
  { value: "spam", label: "Spam or promotional content" },
  { value: "offensive", label: "Offensive content" },
  { value: "copyright", label: "Copyright issue" },
];

export default function ReportDialog({ recipeId, recipeName }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
   const {
    data: session,
    isPending,
  } = authClient.useSession();
  const user = session?.user;
  const resetForm = () => {
    setReason("");
    setDetails("");
  };

  const handleSubmit = async (close) => {
    if (!reason) return;

    setIsSubmitting(true);
    try {
      const report = {
        recipeId,
        reason,
        details,
        user: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        createdAt: new Date(),
      };
      const result = await reportRecipe(report);
      if(result.insertedId) {
        toast.error("Report submitted successfully!");
        resetForm();
        close();
      }
      // console.log("Report result:", result);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="light"
        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[#9C9388] transition-colors hover:bg-[#FBF1E6] hover:text-[#D64545] dark:hover:bg-[#1A1714]"
      >
        <Flag width={16} height={16} />
        Report
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog
            className="bg-white dark:bg-[#252019]"
            onOpenChange={(isOpen) => {
              // Reset selections whenever the dialog is dismissed
              // without submitting (backdrop click, Escape, Cancel)
              if (!isOpen) resetForm();
            }}
          >
            {({ close }) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon className="bg-[#D64545]/10 text-[#D64545]">
                    <Flag width={20} height={20} />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading className="text-[#2B2420] dark:text-[#F4EDE4]">
                    Report &quot;{recipeName}&quot;
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body className="flex flex-col gap-4">
                  <p className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                    Help us understand what&apos;s wrong with this recipe.
                  </p>

                  <RadioGroup name="report-reason" value={reason} onChange={setReason}>
                    <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                      Reason
                    </Label>
                    {REASONS.map((r) => (
                      <Radio
                        key={r.value}
                        value={r.value}
                        className="flex items-center gap-2.5 rounded-xl border border-[#EAE0D3] p-3 data-[selected=true]:border-[#E85D3D] data-[selected=true]:bg-[#E85D3D]/5 dark:border-[#3A332A]"
                      >
                        <Radio.Control className="border-[#EAE0D3] data-[selected=true]:border-[#E85D3D] data-[selected=true]:bg-[#E85D3D] dark:border-[#3A332A]">
                          <Radio.Indicator className="text-white" />
                        </Radio.Control>
                        <Radio.Content>
                          <Label className="text-sm text-[#2B2420] dark:text-[#F4EDE4]">
                            {r.label}
                          </Label>
                        </Radio.Content>
                      </Radio>
                    ))}
                  </RadioGroup>

                  <TextField className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                      Additional details (optional)
                    </Label>
                    <TextArea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Anything else we should know?"
                      className="bg-[#FFF9F2]"
                    />
                  </TextField>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button
                    slot="close"
                    className="bg-white text-[#2B2420] hover:bg-[#FBF1E6] dark:text-[#F4EDE4] dark:hover:bg-[#1A1714]"
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => handleSubmit(close)}
                    isDisabled={!reason || isSubmitting}
                    className="bg-[#D64545] text-white hover:bg-[#C13838] disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting…" : "Submit Report"}
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}