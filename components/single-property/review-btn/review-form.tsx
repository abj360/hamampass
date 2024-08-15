"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { request } from "@/services/axios";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { DrawerClose } from "@/components/ui/drawer";
import ProgressComponent from "./progress";

const formSchema = z.object({
  type: z.number().min(0).max(3),
  product_type: z.number().min(0).max(1),

  rate_location: z.number().min(1).max(10),
  rate_staff: z.number().min(1).max(10),
  rate_atmosphere: z.number().min(1).max(10),
  rate_cleanliness: z.number().min(1).max(10),
  rate_facilities: z.number().min(1).max(10),
  rate_value_for_money: z.number().min(1).max(10),

  comment: z.string().min(1).max(1000),
});

const ReviewFormComponent = ({ id }: { id: string }) => {
  const session = useSession();
  const t = useTranslations("single.review.drawer");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 0,
      product_type: 0,
      rate_location: 0,
      rate_staff: 0,
      rate_atmosphere: 0,
      rate_cleanliness: 0,
      rate_facilities: 0,
      rate_value_for_money: 0,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const req = {
      ...values,
      propertyId: id,
      userId: session?.data?.user.id,
    };

    await request({
      type: "post",
      endpoint: "review",
      payload: req,
    });

    window.location.reload();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">How did you go there</FormLabel>
              <FormControl>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Solo</SelectItem>
                    <SelectItem value="1">Couple</SelectItem>
                    <SelectItem value="2">Family</SelectItem>
                    <SelectItem value="3">Friends</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">
                Which Package did you choose
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Basic</SelectItem>
                    <SelectItem value="1">Regular</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ProgressComponent
          title="Location"
          name="rate_location"
          control={form.control}
          defaultValue={0}
        />
        <ProgressComponent
          title="Staff"
          name="rate_staff"
          control={form.control}
          defaultValue={0}
        />
        <ProgressComponent
          title="Atmosphere"
          name="rate_atmosphere"
          control={form.control}
          defaultValue={0}
        />
        <ProgressComponent
          title="Cleanliness"
          name="rate_cleanliness"
          control={form.control}
          defaultValue={0}
        />
        <ProgressComponent
          title="Facilities"
          name="rate_facilities"
          control={form.control}
          defaultValue={0}
        />
        <ProgressComponent
          title="Value for Money"
          name="rate_value_for_money"
          control={form.control}
          defaultValue={0}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-2">{t("comment")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("comment-placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DrawerClose
          type="submit"
          className="bg-gray-400 px-2 py-1 text-white rounded my-5"
        >
          {t("submit")}
        </DrawerClose>
      </form>
    </Form>
  );
};

export default ReviewFormComponent;
